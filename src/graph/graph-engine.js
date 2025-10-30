// Core knowledge graph operations engine (optimized with adjacency list)
// This was initially O(N^4) but after a weekend of frustration, rewrote to O(N^2)
import { getGraphStore } from '../storage/graph-store.js';

class GraphEngine {
  constructor(store) {
    this.store = store;
    // Caching everything because the original naive approach was painfully slow
    this.cache = {
      entities: new Map(),
      relationships: new Map(),
      adjacencyList: new Map(),  // entityId → Set of neighbor IDs (O(1) lookups)
      degreeCache: new Map(),     // entityId → degree count (O(1) lookups)
      edgeLookup: new Map()       // 'source-target' → relationship (O(1) edge lookups)
    };
  }

  /**
   * Load entire graph from IndexedDB into memory cache
   * Builds adjacency list and degree cache for O(1) graph operations
   * @returns {Promise<Object>} Load statistics
   */
  async loadGraph() {
    const entities = await this.store.getAllEntities();
    const relationships = await this.store.getAllRelationships();

    this.cache.entities.clear();
    this.cache.relationships.clear();
    this.cache.adjacencyList.clear();
    this.cache.degreeCache.clear();
    this.cache.edgeLookup.clear();

    // Build entities map - O(n)
    entities.forEach(e => this.cache.entities.set(e.id, e));

    // Build relationships map and edge lookup - O(e)
    relationships.forEach(r => {
      this.cache.relationships.set(r.id, r);
      // Build bidirectional edge lookup for O(1) relationship finding
      this.cache.edgeLookup.set(`${r.source}-${r.target}`, r);
      this.cache.edgeLookup.set(`${r.target}-${r.source}`, r);
    });

    // Build adjacency list for O(1) neighbor lookups - O(e)
    for (const rel of relationships) {
      if (!this.cache.adjacencyList.has(rel.source)) {
        this.cache.adjacencyList.set(rel.source, new Set());
      }
      if (!this.cache.adjacencyList.has(rel.target)) {
        this.cache.adjacencyList.set(rel.target, new Set());
      }

      this.cache.adjacencyList.get(rel.source).add(rel.target);
      this.cache.adjacencyList.get(rel.target).add(rel.source);
    }

    // Build degree cache for O(1) degree queries - O(n)
    for (const [entityId, neighbors] of this.cache.adjacencyList) {
      this.cache.degreeCache.set(entityId, neighbors.size);
    }

    // Set degree to 0 for entities with no relationships
    for (const entityId of this.cache.entities.keys()) {
      if (!this.cache.degreeCache.has(entityId)) {
        this.cache.degreeCache.set(entityId, 0);
      }
    }

    return {
      nodeCount: this.cache.entities.size,
      edgeCount: this.cache.relationships.size
    };
  }

  /**
   * Invalidate caches and reload graph (call after adding relationships)
   * @returns {Promise<Object>} Load statistics
   */
  async reloadGraph() {
    return await this.loadGraph();
  }

  /**
   * Get graph data formatted for visualization
   * @returns {Object} Graph with nodes and links
   */
  getGraphData() {
    const nodes = Array.from(this.cache.entities.values()).map(entity => ({
      id: entity.id,
      name: entity.name,
      type: entity.type,
      topic: entity.topic,
      relevance: entity.relevance,
      degree: this.getDegree(entity.id),
      sources: entity.sources || []
    }));

    const links = Array.from(this.cache.relationships.values()).map(rel => ({
      id: rel.id,
      source: rel.source,
      target: rel.target,
      type: rel.type,
      strength: rel.strength,
      description: rel.description
    }));

    return { nodes, links };
  }

  /**
   * Get the degree (number of connections) for an entity
   * Optimized: O(1) lookup instead of O(e) iteration
   * @param {string} entityId - Entity ID
   * @returns {number} Number of connections
   */
  getDegree(entityId) {
    return this.cache.degreeCache.get(entityId) || 0;
  }

  /**
   * Get all neighboring entities for a given entity
   * Optimized: O(1) lookup instead of O(e) iteration
   * @param {string} entityId - Entity ID
   * @returns {Array<string>} Array of neighbor entity IDs
   */
  getNeighbors(entityId) {
    const neighbors = this.cache.adjacencyList.get(entityId);
    return neighbors ? Array.from(neighbors) : [];
  }

  /**
   * Get most connected entities (hubs)
   * Optimized: O(n log n) instead of O(n * e)
   * @param {number} limit - Number of hubs to return
   * @returns {Array<Object>} Hub entities with degree
   */
  getHubs(limit = 10) {
    const entities = Array.from(this.cache.entities.values());

    // O(n) instead of O(n * e) thanks to degree cache
    const entitiesWithDegree = entities.map(e => ({
      ...e,
      degree: this.getDegree(e.id)
    }));

    return entitiesWithDegree
      .sort((a, b) => b.degree - a.degree)  // O(n log n)
      .slice(0, limit);
  }

  /**
   * Get all entities for a specific topic
   * @param {string} topic - Topic name
   * @returns {Array<Object>} Entities in that topic
   */
  getEntitiesByTopic(topic) {
    const entities = Array.from(this.cache.entities.values());
    return entities.filter(e => e.topic === topic);
  }

  /**
   * Get subgraph around an entity (ego network)
   * Optimized: O(1) edge lookups using edgeLookup map instead of O(e) iteration
   * @param {string} entityId - Center entity ID
   * @param {number} depth - How many hops to include
   * @returns {Object} Subgraph with nodes and links
   */
  getSubgraph(entityId, depth = 1) {
    const nodes = new Set([entityId]);
    const links = [];
    const linkIds = new Set();

    let currentLevel = [entityId];

    for (let d = 0; d < depth; d++) {
      const nextLevel = [];

      for (const current of currentLevel) {
        const neighbors = this.getNeighbors(current);

        for (const neighbor of neighbors) {
          nodes.add(neighbor);
          if (d < depth - 1) {
            nextLevel.push(neighbor);
          }

          // O(1) relationship lookup using edgeLookup map
          const edgeKey = `${current}-${neighbor}`;
          const rel = this.cache.edgeLookup.get(edgeKey);

          if (rel && !linkIds.has(rel.id)) {
            links.push(rel);
            linkIds.add(rel.id);
          }
        }
      }

      currentLevel = nextLevel;
    }

    return {
      nodes: Array.from(nodes).map(id => this.cache.entities.get(id)).filter(Boolean),
      links: links
    };
  }

  /**
   * Calculate graph statistics
   * @returns {Object} Statistical summary
   */
  getStatistics() {
    const entities = Array.from(this.cache.entities.values());
    const relationships = Array.from(this.cache.relationships.values());

    const entityTypeCount = {};
    entities.forEach(e => {
      entityTypeCount[e.type] = (entityTypeCount[e.type] || 0) + 1;
    });

    const topicCount = {};
    entities.forEach(e => {
      topicCount[e.topic] = (topicCount[e.topic] || 0) + 1;
    });

    // Calculate average degree using cache - O(n)
    const totalDegree = Array.from(this.cache.degreeCache.values())
      .reduce((sum, degree) => sum + degree, 0);
    const avgDegree = entities.length > 0 ? totalDegree / entities.length : 0;

    // Graph density
    const possibleEdges = (entities.length * (entities.length - 1)) / 2;
    const density = possibleEdges > 0 ? relationships.length / possibleEdges : 0;

    return {
      totalEntities: entities.length,
      totalRelationships: relationships.length,
      entityTypeCount,
      topicCount,
      avgDegree: avgDegree.toFixed(2),
      density: density.toFixed(4),
      hubs: this.getHubs(5).map(h => ({ name: h.name, degree: h.degree }))
    };
  }

  /**
   * Search entities by name (fuzzy search)
   * @param {string} query - Search query
   * @param {number} limit - Max results
   * @returns {Array<Object>} Matching entities
   */
  searchEntities(query, limit = 10) {
    const queryLower = query.toLowerCase();
    const entities = Array.from(this.cache.entities.values());

    const matches = entities
      .filter(e => e.name.toLowerCase().includes(queryLower))
      .map(e => ({
        ...e,
        score: this.calculateSearchScore(e, queryLower),
        degree: this.getDegree(e.id)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return matches;
  }

  /**
   * Calculate search relevance score
   * @param {Object} entity - Entity to score
   * @param {string} query - Search query
   * @returns {number} Relevance score
   */
  calculateSearchScore(entity, query) {
    let score = 0;

    if (entity.name.toLowerCase() === query) {
      score += 10;
    } else if (entity.name.toLowerCase().startsWith(query)) {
      score += 5;
    } else {
      score += 1;
    }

    score += entity.relevance;
    score += this.getDegree(entity.id) * 0.1;

    return score;
  }
}

let graphEngineInstance = null;

/**
 * Get singleton GraphEngine instance
 * @returns {Promise<GraphEngine>} Graph engine
 */
export async function getGraphEngine() {
  if (!graphEngineInstance) {
    const store = await getGraphStore();
    graphEngineInstance = new GraphEngine(store);
    await graphEngineInstance.loadGraph();
  }
  return graphEngineInstance;
}

export default GraphEngine;
