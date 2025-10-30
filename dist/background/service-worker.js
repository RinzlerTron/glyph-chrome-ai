/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/storage/db.js
// IndexedDB wrapper for Glyph knowledge graph storage
const DB_NAME = 'GlyphDB';
const DB_VERSION = 2;
class Database {
  constructor() {
    this.db = null;
  }
  async init() {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => {
        console.error('IndexedDB failed to open:', request.error);
        reject(request.error);
      };
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onupgradeneeded = event => {
        const db = event.target.result;

        // Object Store: entities (knowledge graph nodes)
        if (!db.objectStoreNames.contains('entities')) {
          const entityStore = db.createObjectStore('entities', {
            keyPath: 'id'
          });
          entityStore.createIndex('name', 'name', {
            unique: false
          });
          entityStore.createIndex('type', 'type', {
            unique: false
          });
          entityStore.createIndex('topic', 'topic', {
            unique: false
          });
          entityStore.createIndex('firstSeen', 'firstSeen', {
            unique: false
          });
        }

        // Object Store: relationships (knowledge graph edges)
        if (!db.objectStoreNames.contains('relationships')) {
          const relStore = db.createObjectStore('relationships', {
            keyPath: 'id'
          });
          relStore.createIndex('source', 'source', {
            unique: false
          });
          relStore.createIndex('target', 'target', {
            unique: false
          });
          relStore.createIndex('created', 'created', {
            unique: false
          });
        }

        // Object Store: articles (captured content)
        if (!db.objectStoreNames.contains('articles')) {
          const articleStore = db.createObjectStore('articles', {
            keyPath: 'id'
          });
          articleStore.createIndex('url', 'url', {
            unique: false
          });
          articleStore.createIndex('capturedAt', 'capturedAt', {
            unique: false
          });
        }

        // Object Store: settings (user preferences)
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', {
            keyPath: 'id'
          });
        }

        // Object Store: syntheses (weekly learning summaries)
        if (!db.objectStoreNames.contains('syntheses')) {
          const synthesisStore = db.createObjectStore('syntheses', {
            keyPath: 'id'
          });
          synthesisStore.createIndex('createdAt', 'createdAt', {
            unique: false
          });
          synthesisStore.createIndex('weekStart', 'weekStart', {
            unique: false
          });
        }
      };
    });
  }
  async get(storeName, id) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readonly');
      const request = tx.objectStore(storeName).get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async add(storeName, item) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readwrite');
      const request = tx.objectStore(storeName).add(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async update(storeName, item) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readwrite');
      const request = tx.objectStore(storeName).put(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async delete(storeName, id) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readwrite');
      const request = tx.objectStore(storeName).delete(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async getAll(storeName) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readonly');
      const request = tx.objectStore(storeName).getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async queryByIndex(storeName, indexName, value) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readonly');
      const index = tx.objectStore(storeName).index(indexName);
      const request = index.getAll(value);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async clear(storeName) {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readwrite');
      const request = tx.objectStore(storeName).clear();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// Singleton instance
let dbInstance = null;
function getDB() {
  if (!dbInstance) {
    dbInstance = new Database();
  }
  return dbInstance;
}
/* harmony default export */ const db = ((/* unused pure expression or super */ null && (Database)));
;// ./src/storage/graph-store.js
// Graph-specific storage operations (optimized with relationship index)

class GraphStore {
  constructor() {
    this.db = getDB();
    this.relationshipIndex = new Map(); // "source-target" → relationship (O(1) lookups)
  }
  async init() {
    await this.db.init();
    await this.buildRelationshipIndex();
  }

  /**
   * Build in-memory index of relationships for O(1) duplicate detection
   * Called on initialization and after bulk operations
   */
  async buildRelationshipIndex() {
    const all = await this.db.getAll('relationships');
    this.relationshipIndex.clear();
    for (const rel of all) {
      const key1 = `${rel.source}-${rel.target}`;
      const key2 = `${rel.target}-${rel.source}`;
      this.relationshipIndex.set(key1, rel);
      this.relationshipIndex.set(key2, rel);
    }
  }

  // Entity operations
  async addEntity(entity) {
    // Check if entity with same name already exists
    const existing = await this.db.queryByIndex('entities', 'name', entity.name);
    if (existing.length > 0) {
      // Update existing entity
      const existingEntity = existing[0];
      existingEntity.lastSeen = Date.now();
      existingEntity.sources = [...new Set([...existingEntity.sources, ...entity.sources])];
      existingEntity.metadata.frequency += 1;
      await this.db.update('entities', existingEntity);
      return existingEntity.id;
    } else {
      // Add new entity
      return await this.db.add('entities', entity);
    }
  }
  async getEntity(id) {
    return await this.db.get('entities', id);
  }
  async getAllEntities() {
    return await this.db.getAll('entities');
  }
  async getEntitiesByTopic(topic) {
    return await this.db.queryByIndex('entities', 'topic', topic);
  }
  async getEntitiesByType(type) {
    return await this.db.queryByIndex('entities', 'type', type);
  }

  // Relationship operations (optimized with O(1) index lookup)
  async addRelationship(relationship) {
    // Use index for O(1) duplicate detection instead of O(e) getAll
    const key = `${relationship.source}-${relationship.target}`;
    const duplicate = this.relationshipIndex.get(key);
    if (duplicate) {
      // Update existing relationship
      if (relationship.strength > duplicate.strength) {
        duplicate.strength = relationship.strength;
        duplicate.description = relationship.description;
      }
      duplicate.metadata.coOccurrences += 1;
      duplicate.metadata.contexts.push(...relationship.metadata.contexts);
      await this.db.update('relationships', duplicate);

      // Update index with modified relationship
      const key1 = `${duplicate.source}-${duplicate.target}`;
      const key2 = `${duplicate.target}-${duplicate.source}`;
      this.relationshipIndex.set(key1, duplicate);
      this.relationshipIndex.set(key2, duplicate);
      return duplicate.id;
    } else {
      // Add new relationship
      const id = await this.db.add('relationships', relationship);
      relationship.id = id;

      // Update index with new relationship
      const key1 = `${relationship.source}-${relationship.target}`;
      const key2 = `${relationship.target}-${relationship.source}`;
      this.relationshipIndex.set(key1, relationship);
      this.relationshipIndex.set(key2, relationship);
      return id;
    }
  }
  async getRelationship(id) {
    return await this.db.get('relationships', id);
  }
  async getAllRelationships() {
    return await this.db.getAll('relationships');
  }
  async getRelationshipsForEntity(entityId) {
    const all = await this.db.getAll('relationships');
    return all.filter(r => r.source === entityId || r.target === entityId);
  }

  // Article operations
  async addArticle(article) {
    const existing = await this.db.queryByIndex('articles', 'url', article.url);
    if (existing.length > 0) {
      console.warn(`Article already exists: ${article.url}. Updating instead.`);
      article.id = existing[0].id;
      await this.db.update('articles', article);
      return existing[0].id;
    }
    return await this.db.add('articles', article);
  }
  async getArticle(id) {
    return await this.db.get('articles', id);
  }
  async getAllArticles() {
    return await this.db.getAll('articles');
  }
  async updateArticle(id, updates) {
    const existing = await this.db.get('articles', id);
    if (!existing) {
      throw new Error(`Article with id ${id} not found`);
    }
    const updated = {
      ...existing,
      ...updates
    };
    await this.db.update('articles', updated);
    return updated;
  }
  async getRecentArticles(limit = 10) {
    const all = await this.db.getAll('articles');
    return all.sort((a, b) => b.capturedAt - a.capturedAt).slice(0, limit);
  }

  // Settings operations
  async getSettings() {
    const settings = await this.db.get('settings', 'user_settings');
    if (!settings) {
      // Return defaults
      return {
        id: 'user_settings',
        topics: ['AI', 'Technology', 'Science', 'Business', 'Innovation'],
        autoCapture: false,
        graphLayout: 'force',
        insightFrequency: 'weekly',
        theme: 'light',
        privacy: {
          storeFullText: false,
          syncEnabled: false
        }
      };
    }
    return settings;
  }
  async updateSettings(settings) {
    settings.id = 'user_settings';
    return await this.db.update('settings', settings);
  }

  // Utility operations
  async clearAllData() {
    await this.db.clear('entities');
    await this.db.clear('relationships');
    await this.db.clear('articles');
  }
  async getStatistics() {
    const entities = await this.db.getAll('entities');
    const relationships = await this.db.getAll('relationships');
    const articles = await this.db.getAll('articles');
    return {
      totalEntities: entities.length,
      totalRelationships: relationships.length,
      totalArticles: articles.length
    };
  }
}

// Singleton instance
let graphStoreInstance = null;
async function getGraphStore() {
  if (!graphStoreInstance) {
    graphStoreInstance = new GraphStore();
    await graphStoreInstance.init();
  }
  return graphStoreInstance;
}
/* harmony default export */ const graph_store = ((/* unused pure expression or super */ null && (GraphStore)));
;// ./src/graph/graph-engine.js
// Core knowledge graph operations engine (optimized with adjacency list)
// This was initially O(N^4) but after a weekend of frustration, rewrote to O(N^2)

class GraphEngine {
  constructor(store) {
    this.store = store;
    // Caching everything because the original naive approach was painfully slow
    this.cache = {
      entities: new Map(),
      relationships: new Map(),
      adjacencyList: new Map(),
      // entityId → Set of neighbor IDs (O(1) lookups)
      degreeCache: new Map(),
      // entityId → degree count (O(1) lookups)
      edgeLookup: new Map() // 'source-target' → relationship (O(1) edge lookups)
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
    return {
      nodes,
      links
    };
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
    return entitiesWithDegree.sort((a, b) => b.degree - a.degree) // O(n log n)
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
    const totalDegree = Array.from(this.cache.degreeCache.values()).reduce((sum, degree) => sum + degree, 0);
    const avgDegree = entities.length > 0 ? totalDegree / entities.length : 0;

    // Graph density
    const possibleEdges = entities.length * (entities.length - 1) / 2;
    const density = possibleEdges > 0 ? relationships.length / possibleEdges : 0;
    return {
      totalEntities: entities.length,
      totalRelationships: relationships.length,
      entityTypeCount,
      topicCount,
      avgDegree: avgDegree.toFixed(2),
      density: density.toFixed(4),
      hubs: this.getHubs(5).map(h => ({
        name: h.name,
        degree: h.degree
      }))
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
    const matches = entities.filter(e => e.name.toLowerCase().includes(queryLower)).map(e => ({
      ...e,
      score: this.calculateSearchScore(e, queryLower),
      degree: this.getDegree(e.id)
    })).sort((a, b) => b.score - a.score).slice(0, limit);
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
async function getGraphEngine() {
  if (!graphEngineInstance) {
    const store = await getGraphStore();
    graphEngineInstance = new GraphEngine(store);
    await graphEngineInstance.loadGraph();
  }
  return graphEngineInstance;
}
/* harmony default export */ const graph_engine = ((/* unused pure expression or super */ null && (GraphEngine)));
;// ./src/utils/availability.js
// AI API availability checking for Chrome's built-in AI

/**
 * Check if Chrome's Prompt API is available and ready
 * @returns {Promise<Object>} Availability status object
 */
async function checkPromptAPIAvailability() {
  try {
    if (typeof LanguageModel === 'undefined') {
      return {
        available: false,
        status: 'not_supported',
        reason: 'Prompt API not available in this Chrome version',
        action: 'Update to Chrome 128+ or enable chrome://flags/#prompt-api-for-gemini-nano'
      };
    }
    const status = await LanguageModel.availability();
    return {
      available: status === 'readily' || status === 'available',
      status: status,
      needsDownload: status === 'after-download' || status === 'downloadable',
      downloading: status === 'downloading',
      reason: status === 'readily' || status === 'available' ? 'Prompt API ready' : `Model status: ${status}`,
      action: status === 'after-download' || status === 'downloadable' ? 'Model needs to be downloaded. Visit chrome://on-device-internals' : null
    };
  } catch (error) {
    console.error('Error checking Prompt API availability:', error);
    return {
      available: false,
      status: 'error',
      reason: error.message,
      action: 'Check browser console for details'
    };
  }
}

/**
 * Check if Chrome's Summarizer API is available and ready
 * @returns {Promise<Object>} Availability status object
 */
async function checkSummarizerAvailability() {
  try {
    if (typeof Summarizer === 'undefined') {
      return {
        available: false,
        status: 'not_supported',
        reason: 'Summarizer API not available in this Chrome version',
        action: 'Update to Chrome 128+'
      };
    }
    const status = await Summarizer.availability();
    return {
      available: status === 'readily' || status === 'available',
      status: status,
      needsDownload: status === 'after-download' || status === 'downloadable',
      downloading: status === 'downloading',
      reason: status === 'readily' || status === 'available' ? 'Summarizer API ready' : `Model status: ${status}`,
      action: status === 'after-download' || status === 'downloadable' ? 'Model needs to be downloaded' : null
    };
  } catch (error) {
    console.error('Error checking Summarizer API availability:', error);
    return {
      available: false,
      status: 'error',
      reason: error.message,
      action: 'Check browser console for details'
    };
  }
}

/**
 * Check if Chrome's Language Detector API is available
 * @returns {Promise<Object>} Availability status object
 */
async function checkLanguageDetectorAvailability() {
  try {
    if (typeof LanguageDetector === 'undefined') {
      return {
        available: false,
        status: 'not_supported',
        reason: 'Language Detector API not available',
        action: 'Update to Chrome 128+'
      };
    }
    const status = await LanguageDetector.availability();
    return {
      available: status === 'readily' || status === 'available',
      status: status,
      reason: status === 'readily' || status === 'available' ? 'Language Detector ready' : `Status: ${status}`,
      languagesSupported: []
    };
  } catch (error) {
    console.error('Error checking Language Detector availability:', error);
    return {
      available: false,
      status: 'error',
      reason: error.message,
      action: 'Language detection may not work'
    };
  }
}

/**
 * Check availability of all AI APIs
 * @returns {Promise<Object>} Combined availability status
 */
async function checkAllAIAvailability() {
  const [prompt, summarizer, languageDetector] = await Promise.all([checkPromptAPIAvailability(), checkSummarizerAvailability(), checkLanguageDetectorAvailability()]);
  const allReady = prompt.available && summarizer.available && languageDetector.available;
  return {
    allReady,
    prompt,
    summarizer,
    languageDetector,
    message: allReady ? 'All AI APIs are ready' : 'Some AI APIs are not available. Extension will use fallback methods.'
  };
}

/**
 * Wait for AI model to become available (with timeout)
 * @param {Function} checkFunction - Availability check function
 * @param {number} timeoutMs - Maximum wait time in milliseconds
 * @param {number} pollIntervalMs - Check interval in milliseconds
 * @returns {Promise<boolean>} True if became available, false if timeout
 */
async function waitForAIAvailability(checkFunction, timeoutMs = 30000, pollIntervalMs = 1000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    const status = await checkFunction();
    if (status.available) {
      return true;
    }
    if (status.status === 'not_supported' || status.status === 'error') {
      return false;
    }
    await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
  }
  return false;
}
/* harmony default export */ const availability = ({
  checkPromptAPIAvailability,
  checkSummarizerAvailability,
  checkLanguageDetectorAvailability,
  checkAllAIAvailability,
  waitForAIAvailability
});
;// ./src/utils/constants.js
// Application constants and configuration

// Entity types
const ENTITY_TYPES = {
  PERSON: 'person',
  COMPANY: 'company',
  TECHNOLOGY: 'technology',
  CONCEPT: 'concept'
};

// Relationship types
const RELATIONSHIP_TYPES = {
  DIRECT: 'direct',
  CONCEPTUAL: 'conceptual',
  TEMPORAL: 'temporal',
  CAUSAL: 'causal'
};

// AI API configuration
const AI_CONFIG = {
  MAX_ARTICLE_CHARS: 6000,
  // Reduced for faster processing
  MAX_ENTITIES_PER_ARTICLE: 8,
  // Reduced for faster processing
  MAX_RELATIONSHIP_CANDIDATES: 8,
  // Reduced for faster processing
  ENTITY_EXTRACTION_TEMPERATURE: 0.3,
  RELATIONSHIP_INFERENCE_TEMPERATURE: 0.3,
  SUMMARIZER_LENGTH: 'short',
  // Changed to 'short' for faster processing
  SUMMARIZER_TYPE: 'key-points',
  SUMMARIZER_FORMAT: 'markdown'
};

// Graph visualization configuration
const GRAPH_CONFIG = {
  CANVAS_THRESHOLD: 200,
  FORCE_STRENGTH: -30,
  FORCE_DISTANCE: 100,
  COLLISION_RADIUS: 20,
  DEFAULT_NODE_SIZE: 8,
  SELECTED_NODE_SIZE: 12,
  LINK_WIDTH: 1.5
};

// UI configuration
const UI_CONFIG = {
  POPUP_WIDTH: 800,
  POPUP_HEIGHT: 600,
  INSIGHTS_LIMIT: 5,
  RECENT_ARTICLES_LIMIT: 10
};

// Default user topics
const DEFAULT_TOPICS = ['AI', 'Technology', 'Science', 'Business', 'Innovation'];

// Storage keys
const STORAGE_KEYS = {
  USER_SETTINGS: 'user_settings'
};
/* harmony default export */ const constants = ({
  ENTITY_TYPES,
  RELATIONSHIP_TYPES,
  AI_CONFIG,
  GRAPH_CONFIG,
  UI_CONFIG,
  DEFAULT_TOPICS,
  STORAGE_KEYS
});
;// ./src/utils/ai-helpers.js
// Chrome AI API wrappers for Prompt API and Summarizer API
// Had to add queuing because Chrome AI gets cranky with too many concurrent requests



// AI Request Queue to prevent overwhelming Chrome AI with concurrent requests
// Learned this the hard way - 6 simultaneous requests = timeouts and sadness
class AIRequestQueue {
  constructor(maxConcurrent = 2) {
    this.maxConcurrent = maxConcurrent; // Sweet spot seems to be 2
    this.running = 0;
    this.queue = [];
  }
  async add(requestFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        requestFunction,
        resolve,
        reject
      });
      this.processQueue();
    });
  }
  async processQueue() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }
    this.running++;
    const {
      requestFunction,
      resolve,
      reject
    } = this.queue.shift();
    console.log(`[AI QUEUE] Starting request (${this.running}/${this.maxConcurrent} running, ${this.queue.length} queued)`);
    try {
      const result = await requestFunction();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      console.log(`[AI QUEUE] Request completed (${this.running}/${this.maxConcurrent} running, ${this.queue.length} queued)`);
      // Process next item in queue
      setTimeout(() => this.processQueue(), 0);
    }
  }
}

// Global AI request queue instance
const aiQueue = new AIRequestQueue(2); // Limit to 2 concurrent AI requests

/**
 * Create a Prompt API session
 * @param {string} systemPrompt - System instructions for the AI
 * @param {Object} options - Session options
 * @returns {Promise<Object>} AI session object
 */
async function createPromptSession(systemPrompt, options = {}) {
  const availability = await checkPromptAPIAvailability();
  if (!availability.available) {
    throw new Error(`Prompt API not available: ${availability.reason}`);
  }
  try {
    const session = await LanguageModel.create({
      systemPrompt: systemPrompt,
      temperature: options.temperature || 0.7,
      topK: options.topK || 40
    });
    return session;
  } catch (error) {
    console.error('Failed to create Prompt API session:', error);
    throw new Error(`Session creation failed: ${error.message}`);
  }
}

/**
 * Send a single prompt and get response (auto-cleanup session)
 * @param {string} systemPrompt - System instructions
 * @param {string} userPrompt - User query
 * @param {Object} options - Session options
 * @returns {Promise<string>} AI response
 */
async function promptOnce(systemPrompt, userPrompt, options = {}) {
  // Queue the AI request to prevent overwhelming Chrome AI
  return aiQueue.add(async () => {
    let session = null;
    try {
      session = await createPromptSession(systemPrompt, options);

      // Increased timeout from 20s to 30s for better success rate
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('AI request timed out after 30 seconds')), 30000));
      const response = await Promise.race([session.prompt(userPrompt), timeoutPromise]);
      return response;
    } catch (error) {
      console.error('Prompt failed:', error);
      throw error;
    } finally {
      if (session) {
        session.destroy();
      }
    }
  });
}

/**
 * Send a prompt and get streaming response
 * @param {string} systemPrompt - System instructions
 * @param {string} userPrompt - User query
 * @param {Object} options - Session options
 * @returns {AsyncGenerator<string>} Streaming response chunks
 */
async function* promptStreaming(systemPrompt, userPrompt, options = {}) {
  let session = null;
  try {
    session = await createPromptSession(systemPrompt, options);
    const stream = await session.promptStreaming(userPrompt);
    for await (const chunk of stream) {
      yield chunk;
    }
  } catch (error) {
    console.error('Streaming prompt failed:', error);
    throw error;
  } finally {
    if (session) {
      session.destroy();
    }
  }
}

/**
 * Summarize text using Chrome's Summarizer API
 * @param {string} text - Text to summarize
 * @param {Object} options - Summarizer options
 * @returns {Promise<string>} Summary text
 */
async function summarizeText(text, options = {}) {
  const availability = await checkSummarizerAvailability();
  if (!availability.available) {
    console.warn('Summarizer not available, returning truncated text');
    return text.slice(0, 1000) + '...';
  }

  // Queue the summarizer request to prevent overwhelming Chrome AI
  return aiQueue.add(async () => {
    let summarizer = null;
    try {
      summarizer = await Summarizer.create({
        type: options.type || AI_CONFIG.SUMMARIZER_TYPE,
        format: options.format || AI_CONFIG.SUMMARIZER_FORMAT,
        length: options.length || AI_CONFIG.SUMMARIZER_LENGTH
      });
      const summary = await summarizer.summarize(text);
      return summary;
    } catch (error) {
      console.error('Summarization failed:', error);
      return text.slice(0, 1000) + '...';
    } finally {
      if (summarizer) {
        summarizer.destroy();
      }
    }
  });
}

/**
 * Detect language of text using Chrome's Language Detector API
 * @param {string} text - Text to analyze
 * @returns {Promise<Object>} Language detection result
 */
async function detectLanguage(text) {
  try {
    if (typeof LanguageDetector === 'undefined') {
      return {
        language: 'en',
        confidence: 0.5
      };
    }
    const detector = await LanguageDetector.create();
    const results = await detector.detect(text);
    detector.destroy();
    if (results && results.length > 0) {
      return {
        language: results[0].detectedLanguage,
        confidence: results[0].confidence
      };
    }
    return {
      language: 'en',
      confidence: 0.5
    };
  } catch (error) {
    console.error('Language detection failed:', error);
    return {
      language: 'en',
      confidence: 0.5
    };
  }
}

/**
 * Parse JSON from AI response (handles markdown wrapping)
 * @param {string} response - AI response text
 * @returns {Object} Parsed JSON object
 */
function parseAIJSON(response) {
  try {
    const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Failed to parse AI JSON response:', error);
    // console.log('Raw response:', response);
    throw new Error('Invalid JSON in AI response');
  }
}

/**
 * Custom error class for AI-related errors
 */
class AIError extends Error {
  constructor(message, type, originalError) {
    super(message);
    this.name = 'AIError';
    this.type = type;
    this.originalError = originalError;
  }
}

/**
 * Wrap AI API calls with error handling and fallback
 * @param {Function} apiCall - Function that makes the AI API call
 * @param {Function} fallback - Fallback function if API fails
 * @returns {Promise<any>} Result from API or fallback
 */
async function withAIErrorHandling(apiCall, fallback) {
  try {
    return await apiCall();
  } catch (error) {
    console.error('AI API call failed:', error);
    if (error.message.includes('not available')) {
      throw new AIError('AI model not available. Please download it from chrome://on-device-internals', 'unavailable', error);
    } else if (error.message.includes('rate limit')) {
      throw new AIError('Too many requests. Please wait a moment.', 'rate_limit', error);
    } else if (error.message.includes('timeout')) {
      throw new AIError('Request timed out. Try again.', 'timeout', error);
    } else {
      if (fallback) {
        console.warn('Using fallback method due to AI error');
        return await fallback();
      }
      throw error;
    }
  }
}
/* harmony default export */ const ai_helpers = ({
  createPromptSession,
  promptOnce,
  promptStreaming,
  summarizeText,
  detectLanguage,
  parseAIJSON,
  AIError,
  withAIErrorHandling
});
;// ./src/utils/text-processing.js
// Text processing utilities for article content

function cleanText(text) {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}
function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
function extractArticleText() {
  // Try to find article content using common selectors
  const selectors = ['article', '[role="main"]', '.article-content', '.post-content', '.entry-content', 'main'];
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent.length > 500) {
      return cleanText(element.textContent);
    }
  }

  // Fallback to body text
  return cleanText(document.body.textContent);
}
function countWords(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter(word => word.length > 0).length;
}
function extractDomain(url) {
  try {
    return new URL(url).hostname;
  } catch (error) {
    return '';
  }
}
function sanitizeForJSON(text) {
  if (!text) return '';
  return text.replace(/[\n\r]/g, ' ').replace(/"/g, '\\"').trim();
}
function extractKeywords(text, limit = 10) {
  // Simple keyword extraction based on frequency
  const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 3);
  const wordCounts = {};
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  return Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([word]) => word);
}
/* harmony default export */ const text_processing = ({
  cleanText,
  truncateText,
  extractArticleText,
  countWords,
  extractDomain,
  sanitizeForJSON,
  extractKeywords
});
;// ./src/graph/entity-extractor.js
// Entity extraction from article text using Chrome's Prompt API




// System prompt for entity extraction
const ENTITY_EXTRACTION_SYSTEM_PROMPT = `You are an expert at extracting key entities from articles.
Extract the most important entities mentioned in the text.

Entity types:
- person: Individual people (e.g., "Elon Musk", "Marie Curie")
- company: Organizations and companies (e.g., "Google", "NASA")
- technology: Technologies, tools, frameworks (e.g., "Gemini", "React", "Quantum Computing")
- concept: Ideas, theories, methodologies (e.g., "Machine Learning", "Climate Change")

IMPORTANT - Do NOT extract:
- Pronouns, demonstratives, or grammar words (this, that, these, those, it, he, she, they)
- Generic nouns (thing, stuff, way, type, kind, people, person)
- Time references (year, day, week, month, time)
- Vague descriptors (new, old, good, bad, great, small, large)
- Common verbs or adjectives used alone
- Single-letter entities or numbers
- Generic processes (system, method, process, approach)

Only extract SPECIFIC, NAMED entities that are meaningful and relevant.

Return ONLY valid JSON, no markdown formatting, no explanation.
Focus on entities relevant to the user's interests.`;

/**
 * Extract entities from article text using AI
 * @param {string} articleText - Full article text
 * @param {Array<string>} userTopics - User's topics of interest
 * @returns {Promise<Array<Object>>} Extracted entities
 */
async function extractEntities(articleText, userTopics = []) {
  const truncatedText = truncateText(articleText, AI_CONFIG.MAX_ARTICLE_CHARS);
  const userPrompt = buildExtractionPrompt(truncatedText, userTopics);
  try {
    return await withAIErrorHandling(async () => {
      const response = await promptOnce(ENTITY_EXTRACTION_SYSTEM_PROMPT, userPrompt, {
        temperature: AI_CONFIG.ENTITY_EXTRACTION_TEMPERATURE
      });
      const entities = parseAIJSON(response);
      return validateAndFilterEntities(entities, userTopics);
    }, async () => {
      console.warn('AI extraction failed, using fallback keyword extraction');
      return fallbackKeywordExtraction(articleText, userTopics);
    });
  } catch (error) {
    console.error('Entity extraction completely failed:', error);
    return fallbackKeywordExtraction(articleText, userTopics);
  }
}

/**
 * Extract entities from article with summarization for long texts
 * @param {string} articleText - Full article text
 * @param {Array<string>} userTopics - User's topics of interest
 * @returns {Promise<Array<Object>>} Extracted entities
 */
async function extractEntitiesWithSummarization(articleText, userTopics = []) {
  let textToProcess = articleText;
  if (articleText.length > AI_CONFIG.MAX_ARTICLE_CHARS) {
    // console.log('Article is long, summarizing first...');
    try {
      const summary = await summarizeText(articleText, {
        type: 'key-points',
        length: 'medium'
      });
      textToProcess = summary;
    } catch (error) {
      console.error('Summarization failed, using truncated text:', error);
      textToProcess = truncateText(articleText, AI_CONFIG.MAX_ARTICLE_CHARS);
    }
  }
  return extractEntities(textToProcess, userTopics);
}

/**
 * Build the user prompt for entity extraction
 * @param {string} text - Article text
 * @param {Array<string>} topics - User topics
 * @returns {string} Formatted prompt
 */
function buildExtractionPrompt(text, topics) {
  const topicsText = topics.length > 0 ? topics.join(', ') : 'general knowledge';
  return `Article text:
${text}

User interests: ${topicsText}

Extract up to ${AI_CONFIG.MAX_ENTITIES_PER_ARTICLE} most relevant entities.

Return JSON array in this exact format:
[
  {
    "name": "Entity Name",
    "type": "person|company|technology|concept",
    "relevance": 0.8,
    "context": "Brief context from article (one sentence)"
  }
]

Focus on entities related to: ${topicsText}`;
}

/**
 * Validate and filter extracted entities
 * @param {Array<Object>} entities - Raw entities from AI
 * @param {Array<string>} userTopics - User topics for relevance
 * @returns {Array<Object>} Validated entities
 */
function validateAndFilterEntities(entities, userTopics) {
  if (!Array.isArray(entities)) {
    throw new Error('Entity extraction did not return an array');
  }
  const validEntityTypes = Object.values(ENTITY_TYPES);
  const stopwords = new Set([
  // Pronouns
  'i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves', 'they', 'them', 'their', 'theirs', 'themselves',
  // Demonstratives
  'this', 'that', 'these', 'those',
  // Interrogatives
  'which', 'what', 'who', 'whom', 'whose', 'when', 'where', 'why', 'how',
  // Quantifiers
  'some', 'any', 'many', 'few', 'several', 'most', 'all', 'each', 'every', 'much', 'more', 'less', 'little', 'lot', 'none', 'both', 'either', 'neither',
  // Common generics
  'other', 'another', 'such', 'same', 'different', 'various', 'certain', 'example', 'examples', 'thing', 'things', 'stuff', 'item', 'items', 'way', 'ways', 'type', 'types', 'kind', 'kinds', 'sort', 'sorts', 'people', 'person', 'someone', 'anyone', 'everyone', 'no one', 'nobody', 'something', 'anything', 'everything', 'nothing', 'time', 'times', 'year', 'years', 'day', 'days', 'week', 'weeks', 'month', 'months', 'part', 'parts', 'piece', 'pieces', 'portion', 'section', 'segment', 'place', 'places', 'area', 'areas', 'location', 'locations', 'number', 'numbers', 'amount', 'amounts', 'quantity', 'quantities',
  // Articles and determiners
  'the', 'a', 'an', 'some', 'any',
  // Common verbs (often extracted by mistake)
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'done', 'can', 'could', 'will', 'would', 'should', 'may', 'might', 'must', 'get', 'gets', 'got', 'getting', 'make', 'makes', 'made', 'making', 'go', 'goes', 'went', 'going', 'come', 'comes', 'came', 'coming', 'take', 'takes', 'took', 'taking', 'use', 'uses', 'used', 'using', 'find', 'finds', 'found', 'finding', 'give', 'gives', 'gave', 'giving', 'tell', 'tells', 'told', 'telling', 'work', 'works', 'worked', 'working', 'call', 'calls', 'called', 'calling', 'try', 'tries', 'tried', 'trying', 'ask', 'asks', 'asked', 'asking', 'need', 'needs', 'needed', 'needing', 'feel', 'feels', 'felt', 'feeling', 'become', 'becomes', 'became', 'becoming', 'leave', 'leaves', 'left', 'leaving', 'put', 'puts', 'putting',
  // Common adjectives (too vague alone)
  'new', 'old', 'good', 'bad', 'great', 'small', 'large', 'big', 'little', 'high', 'low', 'long', 'short', 'early', 'late', 'young', 'old', 'important', 'possible', 'available', 'likely', 'able', 'free', 'sure', 'certain', 'clear', 'whole', 'full', 'real', 'true', 'false', 'better', 'best', 'worse', 'worst', 'less', 'more', 'least', 'most',
  // Generic nouns (too broad)
  'system', 'systems', 'process', 'processes', 'method', 'methods', 'issue', 'issues', 'problem', 'problems', 'solution', 'solutions', 'information', 'data', 'result', 'results', 'fact', 'facts', 'idea', 'ideas', 'thought', 'thoughts', 'view', 'views', 'point', 'points', 'case', 'cases', 'question', 'questions', 'answer', 'answers', 'reason', 'reasons', 'cause', 'causes', 'effect', 'effects', 'change', 'changes', 'difference', 'differences', 'group', 'groups', 'level', 'levels', 'order', 'orders', 'form', 'forms', 'state', 'states', 'line', 'lines', 'side', 'sides', 'end', 'ends', 'beginning', 'start', 'matter', 'matters', 'sense', 'senses', 'purpose', 'purposes',
  // Adverbs
  'very', 'really', 'quite', 'too', 'so', 'just', 'only', 'even', 'well', 'also', 'still', 'never', 'always', 'often', 'sometimes', 'here', 'there', 'now', 'then', 'today', 'yesterday', 'tomorrow', 'up', 'down', 'out', 'in', 'off', 'on', 'over', 'under',
  // Prepositions and conjunctions
  'of', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'about', 'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among', 'against', 'without', 'within', 'and', 'or', 'but', 'if', 'because', 'while', 'although', 'unless',
  // Common filler words
  'etc', 'et cetera', 'versus', 'via', 'per', 'ie', 'eg', 'aka',
  // Vague business/tech terms
  'approach', 'strategy', 'model', 'framework', 'concept', 'theory', 'practice', 'technique', 'tool', 'feature', 'option', 'aspect', 'factor', 'element', 'component', 'detail', 'details', 'overview', 'summary', 'introduction', 'conclusion',
  // Single letters and digits
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
  const MIN_RELEVANCE_THRESHOLD = 0.3;
  return entities.filter(entity => {
    if (!entity.name || typeof entity.name !== 'string') return false;
    if (!entity.type || !validEntityTypes.includes(entity.type)) return false;
    if (entity.name.length < 2 || entity.name.length > 100) return false;
    const nameLower = entity.name.toLowerCase().trim();
    if (stopwords.has(nameLower)) return false;
    const words = nameLower.split(/\s+/);
    if (words.every(word => stopwords.has(word))) return false;
    if (!/[a-zA-Z]/.test(entity.name)) return false;
    const relevance = entity.relevance || 0.5;
    if (relevance < MIN_RELEVANCE_THRESHOLD) return false;
    return true;
  }).map(entity => ({
    name: entity.name.trim(),
    type: entity.type,
    relevance: Math.max(0, Math.min(1, entity.relevance || 0.5)),
    context: entity.context || '',
    topic: assignTopic(entity, userTopics)
  })).sort((a, b) => b.relevance - a.relevance).slice(0, AI_CONFIG.MAX_ENTITIES_PER_ARTICLE);
}

/**
 * Assign a topic to an entity based on user interests
 * @param {Object} entity - Entity object
 * @param {Array<string>} userTopics - User's topics
 * @returns {string} Assigned topic
 */
function assignTopic(entity, userTopics) {
  if (userTopics.length === 0) return 'General';
  const entityText = `${entity.name} ${entity.context}`.toLowerCase();
  for (const topic of userTopics) {
    if (entityText.includes(topic.toLowerCase())) {
      return topic;
    }
  }
  return userTopics[0];
}

/**
 * Fallback keyword extraction when AI is unavailable
 * @param {string} text - Article text
 * @param {Array<string>} userTopics - User topics
 * @returns {Array<Object>} Extracted entities
 */
function fallbackKeywordExtraction(text, userTopics) {
  const keywords = extractKeywords(text, AI_CONFIG.MAX_ENTITIES_PER_ARTICLE);
  return keywords.map(keyword => ({
    name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
    type: ENTITY_TYPES.CONCEPT,
    relevance: 0.5,
    context: 'Extracted by keyword frequency',
    topic: userTopics[0] || 'General'
  }));
}

/**
 * Batch extract entities from multiple articles
 * @param {Array<Object>} articles - Array of article objects
 * @param {Array<string>} userTopics - User topics
 * @returns {Promise<Array<Object>>} Results for each article
 */
async function batchExtractEntities(articles, userTopics) {
  const results = [];
  for (const article of articles) {
    try {
      const entities = await extractEntitiesWithSummarization(article.text, userTopics);
      results.push({
        articleId: article.id,
        success: true,
        entities: entities,
        count: entities.length
      });
    } catch (error) {
      console.error(`Failed to extract entities from article ${article.id}:`, error);
      results.push({
        articleId: article.id,
        success: false,
        error: error.message,
        entities: []
      });
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return results;
}
/* harmony default export */ const entity_extractor = ({
  extractEntities,
  extractEntitiesWithSummarization,
  batchExtractEntities
});
;// ./node_modules/uuid/dist/esm-browser/native.js
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const esm_browser_native = ({
  randomUUID
});
;// ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = ((/* unused pure expression or super */ null && (stringify)));
;// ./node_modules/uuid/dist/esm-browser/v4.js




function v4(options, buf, offset) {
  if (esm_browser_native.randomUUID && !buf && !options) {
    return esm_browser_native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

/* harmony default export */ const esm_browser_v4 = (v4);
;// ./src/utils/helpers.js
// General helper utilities

function generateUUID() {
  return esm_browser_v4();
}
function createEntity(name, type, topic, context) {
  return {
    id: generateUUID(),
    name: name.trim(),
    type: type,
    topic: topic,
    relevance: 0.5,
    firstSeen: Date.now(),
    lastSeen: Date.now(),
    sources: [],
    metadata: {
      context: context || '',
      aliases: [],
      frequency: 1
    }
  };
}
function createRelationship(sourceId, targetId, type, description, strength) {
  return {
    id: generateUUID(),
    source: sourceId,
    target: targetId,
    type: type,
    strength: Math.max(0, Math.min(1, strength)),
    description: description,
    inferredBy: 'ai',
    created: Date.now(),
    sources: [],
    metadata: {
      coOccurrences: 1,
      contexts: []
    }
  };
}
function createArticle(url, title, text, summary, language, entityIds) {
  const wordCount = text.split(/\s+/).length;
  return {
    id: generateUUID(),
    url: url,
    title: title,
    summary: summary,
    fullText: text.length > 10000 ? null : text,
    language: language,
    capturedAt: Date.now(),
    wordCount: wordCount,
    entities: entityIds,
    metadata: {
      domain: helpers_extractDomain(url),
      author: null,
      publishedDate: null
    }
  };
}
function helpers_extractDomain(url) {
  try {
    return new URL(url).hostname;
  } catch (error) {
    return '';
  }
}
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
/* harmony default export */ const helpers = ({
  generateUUID,
  createEntity,
  createRelationship,
  createArticle,
  debounce,
  throttle
});
;// ./src/graph/relationship-finder.js
// Relationship discovery using PMI (Pointwise Mutual Information) + AI semantic labeling



/**
 * Find relationships between entities using PMI algorithm
 * PMI measures how much the co-occurrence of two entities exceeds random chance
 * @param {Array<Object>} entities - Entities to analyze
 * @param {Object} options - Configuration options
 * @returns {Promise<Array<Object>>} Discovered relationships
 */
async function findRelationships(entities, options = {}) {
  const {
    minStrength = 0.3,
    // Minimum PMI strength to create relationship
    useSemanticLabeling = true,
    // Use AI to label relationship types
    maxRelationships = 50 // Max relationships to return
  } = options;
  if (entities.length < 2) {
    return [];
  }
  try {
    const store = await getGraphStore();

    // Get all articles to analyze co-occurrence patterns
    const allArticles = await store.getAllArticles();
    if (allArticles.length === 0) {
      return [];
    }

    // Build co-occurrence matrix
    const coOccurrences = buildCoOccurrenceMatrix(entities, allArticles);

    // Calculate PMI scores for all entity pairs
    const relationships = [];
    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        const entity1 = entities[i];
        const entity2 = entities[j];
        const pmiScore = calculatePMI(entity1.id, entity2.id, coOccurrences, allArticles.length);

        // Only create relationships above threshold
        if (pmiScore >= minStrength) {
          relationships.push({
            source: entity1,
            target: entity2,
            strength: pmiScore,
            coOccurrences: coOccurrences.get(`${entity1.id}-${entity2.id}`) || 0
          });
        }
      }
    }

    // Sort by strength and limit
    relationships.sort((a, b) => b.strength - a.strength);
    const topRelationships = relationships.slice(0, maxRelationships);

    // Use AI to semantically label relationships
    if (useSemanticLabeling && topRelationships.length > 0) {
      await labelRelationshipsWithAI(topRelationships);
    }
    return topRelationships;
  } catch (error) {
    console.error('Relationship discovery failed:', error);
    return [];
  }
}

/**
 * Build co-occurrence matrix from articles
 * Optimized: O(articles × entities²) using Set lookup instead of O(articles × entities³)
 * @param {Array<Object>} entities - All entities
 * @param {Array<Object>} articles - All articles
 * @returns {Map} Co-occurrence counts
 */
function buildCoOccurrenceMatrix(entities, articles) {
  const coOccurrences = new Map();
  const entityOccurrences = new Map();

  // Create Set of entity IDs for O(1) lookup instead of O(n) .some()
  const targetEntityIds = new Set(entities.map(e => e.id));

  // Initialize entity occurrence counts
  entities.forEach(e => entityOccurrences.set(e.id, 0));

  // Count co-occurrences in articles
  for (const article of articles) {
    const articleEntities = article.entities || [];

    // Count individual occurrences
    articleEntities.forEach(entityId => {
      if (entityOccurrences.has(entityId)) {
        entityOccurrences.set(entityId, entityOccurrences.get(entityId) + 1);
      }
    });

    // Count co-occurrences (pairs) - O(entities²) per article
    for (let i = 0; i < articleEntities.length; i++) {
      for (let j = i + 1; j < articleEntities.length; j++) {
        const id1 = articleEntities[i];
        const id2 = articleEntities[j];

        // O(1) Set lookup instead of O(n) .some() - Critical optimization
        if (targetEntityIds.has(id1) && targetEntityIds.has(id2)) {
          const key1 = `${id1}-${id2}`;
          const key2 = `${id2}-${id1}`;
          const currentCount = coOccurrences.get(key1) || 0;
          coOccurrences.set(key1, currentCount + 1);
          coOccurrences.set(key2, currentCount + 1);
        }
      }
    }
  }

  // Store individual occurrence counts for PMI calculation
  coOccurrences.set('__occurrences__', entityOccurrences);
  return coOccurrences;
}

/**
 * Calculate PMI (Pointwise Mutual Information) score
 * PMI(x,y) = log(P(x,y) / (P(x) * P(y)))
 * Normalized to [0, 1] range
 * @param {string} entityId1 - First entity ID
 * @param {string} entityId2 - Second entity ID
 * @param {Map} coOccurrences - Co-occurrence data
 * @param {number} totalArticles - Total number of articles
 * @returns {number} PMI score between 0 and 1
 */
function calculatePMI(entityId1, entityId2, coOccurrences, totalArticles) {
  const occurrences = coOccurrences.get('__occurrences__');
  const count1 = occurrences.get(entityId1) || 0;
  const count2 = occurrences.get(entityId2) || 0;
  const coCount = coOccurrences.get(`${entityId1}-${entityId2}`) || 0;

  // Avoid division by zero
  if (count1 === 0 || count2 === 0 || coCount === 0 || totalArticles === 0) {
    return 0;
  }

  // Calculate probabilities
  const pX = count1 / totalArticles;
  const pY = count2 / totalArticles;
  const pXY = coCount / totalArticles;

  // PMI formula: log(P(x,y) / (P(x) * P(y)))
  const pmi = Math.log2(pXY / (pX * pY));

  // Normalize PMI to [0, 1] range
  // PMI can be negative (entities occur together less than by chance)
  // We only care about positive associations, so clip to [0, max]
  const maxPMI = 10; // Theoretical maximum is log2(N), use 10 as practical max
  const normalizedPMI = Math.max(0, Math.min(pmi / maxPMI, 1));

  // Boost score based on co-occurrence frequency
  // More co-occurrences = more confident relationship
  const frequencyBoost = Math.min(coCount / 5, 0.2); // Max 0.2 boost

  return Math.min(normalizedPMI + frequencyBoost, 1);
}

/**
 * Use AI to semantically label relationships
 * Determines relationship type (e.g., "founded by", "competes with", "uses")
 * @param {Array<Object>} relationships - Relationships to label
 */
async function labelRelationshipsWithAI(relationships) {
  try {
    // Check if Prompt API is available
    if (typeof LanguageModel === 'undefined') {
      // console.log('Prompt API not available, using default labels');
      labelWithDefaultTypes(relationships);
      return;
    }

    // Check availability (LanguageModel.capabilities doesn't exist, use availability)
    try {
      const availability = await LanguageModel.availability();
      if (availability !== 'readily' && availability !== 'available') {
        labelWithDefaultTypes(relationships);
        return;
      }
    } catch (error) {
      // If availability check fails, try to proceed anyway
      console.warn('LanguageModel availability check failed, attempting to use anyway');
    }

    // Process in batches of 5 to avoid overwhelming the API
    const batchSize = 5;
    for (let i = 0; i < relationships.length; i += batchSize) {
      const batch = relationships.slice(i, i + batchSize);
      await labelBatchWithAI(batch);

      // Small delay between batches
      if (i + batchSize < relationships.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  } catch (error) {
    console.error('AI labeling failed, using defaults:', error);
    labelWithDefaultTypes(relationships);
  }
}

/**
 * Label a batch of relationships using AI
 * @param {Array<Object>} batch - Batch of relationships
 */
async function labelBatchWithAI(batch) {
  try {
    const session = await LanguageModel.create({
      systemPrompt: 'You classify relationships between entities. Return only JSON.',
      temperature: 0.3,
      topK: 40
    });

    // Build prompt with entity pairs
    const pairs = batch.map((rel, idx) => `${idx + 1}. ${rel.source.name} (${rel.source.type}) ↔ ${rel.target.name} (${rel.target.type})`).join('\n');
    const prompt = `Classify the relationship type for these entity pairs. Choose from: founded, acquired, invested_in, partnered_with, competes_with, uses, works_at, member_of, related_to.

Entity pairs:
${pairs}

Return JSON array with format: [{"index": 1, "type": "founded", "description": "brief description"}]`;
    const response = await session.prompt(prompt);
    session.destroy();

    // Parse AI response
    const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const labels = JSON.parse(cleaned);

    // Apply labels to relationships
    labels.forEach(label => {
      const idx = label.index - 1;
      if (idx >= 0 && idx < batch.length) {
        batch[idx].type = label.type || 'related_to';
        batch[idx].description = label.description || '';
      }
    });
  } catch (error) {
    console.error('Batch AI labeling failed:', error);
    labelWithDefaultTypes(batch);
  }
}

/**
 * Apply default relationship types based on entity types
 * @param {Array<Object>} relationships - Relationships to label
 */
function labelWithDefaultTypes(relationships) {
  for (const rel of relationships) {
    const type1 = rel.source.type;
    const type2 = rel.target.type;

    // Infer type from entity types
    if (type1 === 'person' && type2 === 'company') {
      rel.type = 'works_at';
      rel.description = `${rel.source.name} works at ${rel.target.name}`;
    } else if (type1 === 'company' && type2 === 'company') {
      rel.type = 'competes_with';
      rel.description = `${rel.source.name} and ${rel.target.name} are related companies`;
    } else if (type1 === 'company' && type2 === 'technology') {
      rel.type = 'uses';
      rel.description = `${rel.source.name} uses ${rel.target.name}`;
    } else if (type1 === 'person' && type2 === 'person') {
      rel.type = 'related_to';
      rel.description = `${rel.source.name} and ${rel.target.name} are related`;
    } else {
      rel.type = 'related_to';
      rel.description = `Related entities`;
    }
  }
}

/**
 * Store discovered relationships in the database
 * @param {Array<Object>} relationships - Relationships to store
 * @param {Array<string>} sourceArticles - Article IDs where relationships were found
 * @returns {Promise<number>} Number of relationships stored
 */
async function storeRelationships(relationships, allArticles = []) {
  try {
    const store = await getGraphStore();
    let storedCount = 0;
    for (const rel of relationships) {
      const relationship = createRelationship(rel.source.id, rel.target.id, rel.type || 'related_to', rel.description || '', rel.strength);

      // Find articles where BOTH entities appear together
      const coOccurringArticles = [];
      if (Array.isArray(allArticles)) {
        for (const article of allArticles) {
          const articleEntities = article.entities || [];
          if (articleEntities.includes(rel.source.id) && articleEntities.includes(rel.target.id)) {
            coOccurringArticles.push(article.id);
          }
        }
      }
      relationship.sources = coOccurringArticles;
      relationship.metadata.coOccurrences = rel.coOccurrences || 1;
      relationship.metadata.contexts = [];
      await store.addRelationship(relationship);
      storedCount++;
    }

    // console.log(`Stored ${storedCount} relationships`);
    return storedCount;
  } catch (error) {
    console.error('Failed to store relationships:', error);
    return 0;
  }
}

/**
 * Discover and store relationships for all entities in the graph
 * Called periodically or after capturing multiple articles
 * @returns {Promise<Object>} Discovery results
 */
async function discoverAllRelationships() {
  try {
    // console.log('Starting relationship discovery...');

    const store = await getGraphStore();
    const settings = await store.getSettings();
    const allEntities = await store.getAllEntities();
    const allArticles = await store.getAllArticles();
    if (allEntities.length < 2) {
      return {
        success: true,
        relationshipsFound: 0,
        message: 'Not enough entities'
      };
    }

    // Performance optimization: Scale relationship discovery based on data size
    let entitiesToAnalyze = allEntities;
    let maxRelationships = 100;

    // Strategy 1: For >50 articles, only analyze entities in user's topics of interest
    if (allArticles.length > 50 && settings.topics && settings.topics.length > 0) {
      const userTopics = settings.topics.filter(t => t && t.trim());
      if (userTopics.length > 0) {
        entitiesToAnalyze = allEntities.filter(e => userTopics.some(topic => e.topic && e.topic.toLowerCase().includes(topic.toLowerCase())));
        maxRelationships = 50;
        // console.log(`Large dataset (${allArticles.length} articles): Analyzing ${entitiesToAnalyze.length} topic-related entities`);
      }
    }

    // Strategy 2: For >20 articles, limit to entities from recent 15 articles
    else if (allArticles.length > 20) {
      const recentArticles = allArticles.sort((a, b) => b.capturedAt - a.capturedAt).slice(0, 15);
      const recentEntityIds = new Set();
      recentArticles.forEach(article => {
        (article.entities || []).forEach(id => recentEntityIds.add(id));
      });
      entitiesToAnalyze = allEntities.filter(e => recentEntityIds.has(e.id));
      maxRelationships = 75;
      // console.log(`Medium dataset (${allArticles.length} articles): Analyzing ${entitiesToAnalyze.length} entities from recent 15 articles`);
    }

    // Ensure we don't analyze too many entities at once (prevent crash)
    if (entitiesToAnalyze.length > 200) {
      entitiesToAnalyze = entitiesToAnalyze.sort((a, b) => (b.relevance || 0) - (a.relevance || 0)).slice(0, 200);
      // console.log(`Limited to top 200 entities by relevance to prevent performance issues`);
    }

    // Find relationships with PMI + AI labeling (co-occurring entities)
    const relationships = await findRelationships(entitiesToAnalyze, {
      minStrength: 0.3,
      useSemanticLabeling: false,
      // Disable AI labeling for performance - use default types
      maxRelationships: maxRelationships
    });

    // Store relationships with actual articles for proper source attribution
    const storedCount = await storeRelationships(relationships, allArticles);

    // console.log(`Relationship discovery complete: ${storedCount} relationships found`);

    return {
      success: true,
      relationshipsFound: storedCount,
      totalEntities: allEntities.length,
      analyzedEntities: entitiesToAnalyze.length,
      totalArticles: allArticles.length
    };
  } catch (error) {
    console.error('Relationship discovery failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
;// ./src/utils/mock-data.js
// Mock data generator for development and testing


/**
 * Generate realistic mock entities for testing
 * @param {number} count - Number of entities to generate
 * @returns {Array<Object>} Array of mock entities
 */
function generateMockEntities(count = 50) {
  const mockData = {
    person: [{
      name: 'Sundar Pichai',
      topic: 'Chrome AI'
    }, {
      name: 'Demis Hassabis',
      topic: 'Chrome AI'
    }, {
      name: 'Jeff Dean',
      topic: 'Chrome AI'
    }, {
      name: 'Parisa Tabriz',
      topic: 'Chrome Security'
    }, {
      name: 'Alex Russell',
      topic: 'Web Platform'
    }, {
      name: 'Jake Archibald',
      topic: 'Web Performance'
    }, {
      name: 'Addy Osmani',
      topic: 'Chrome DevTools'
    }, {
      name: 'Paul Irish',
      topic: 'Chrome DevTools'
    }],
    company: [{
      name: 'Google',
      topic: 'Chrome AI'
    }, {
      name: 'Google DeepMind',
      topic: 'Chrome AI'
    }, {
      name: 'Anthropic',
      topic: 'AI Safety'
    }, {
      name: 'Google Chrome Team',
      topic: 'Browser Development'
    }, {
      name: 'Mozilla',
      topic: 'Browser Privacy'
    }],
    technology: [{
      name: 'Gemini Nano',
      topic: 'Chrome AI'
    }, {
      name: 'Chrome Prompt API',
      topic: 'Chrome AI'
    }, {
      name: 'Chrome Summarizer API',
      topic: 'Chrome AI'
    }, {
      name: 'Chrome Rewriter API',
      topic: 'Chrome AI'
    }, {
      name: 'Chrome Language Detector',
      topic: 'Chrome AI'
    }, {
      name: 'Chrome Writer API',
      topic: 'Chrome AI'
    }, {
      name: 'On-device AI',
      topic: 'Chrome AI'
    }, {
      name: 'Chrome Extensions',
      topic: 'Browser Development'
    }, {
      name: 'Manifest V3',
      topic: 'Browser Development'
    }, {
      name: 'Service Workers',
      topic: 'Web Platform'
    }, {
      name: 'IndexedDB',
      topic: 'Web Platform'
    }, {
      name: 'WebAssembly',
      topic: 'Web Performance'
    }, {
      name: 'React',
      topic: 'Frontend'
    }, {
      name: 'D3.js',
      topic: 'Data Visualization'
    }],
    concept: [{
      name: 'Privacy-first AI',
      topic: 'Chrome AI'
    }, {
      name: 'Local-first Software',
      topic: 'Privacy'
    }, {
      name: 'On-device Inference',
      topic: 'Chrome AI'
    }, {
      name: 'Browser-level Intelligence',
      topic: 'Chrome AI'
    }, {
      name: 'Zero-latency AI',
      topic: 'Performance'
    }, {
      name: 'Offline-first Applications',
      topic: 'Web Platform'
    }, {
      name: 'Edge AI',
      topic: 'Chrome AI'
    }, {
      name: 'Knowledge Graphs',
      topic: 'Data Structures'
    }, {
      name: 'Entity Extraction',
      topic: 'NLP'
    }, {
      name: 'Relationship Discovery',
      topic: 'Graph Theory'
    }, {
      name: 'Browser Extensions Security',
      topic: 'Chrome Security'
    }, {
      name: 'GDPR Compliance',
      topic: 'Privacy'
    }]
  };
  const entities = [];
  const types = Object.keys(mockData);
  let id = 1;

  // Generate entities from mock data
  types.forEach(type => {
    mockData[type].forEach(item => {
      if (entities.length < count) {
        entities.push({
          id: `entity-${id++}`,
          name: item.name,
          type,
          topic: item.topic,
          relevance: Math.random() * 0.5 + 0.5,
          // 0.5 to 1.0
          timestamp: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000 // last 30 days
        });
      }
    });
  });
  return entities.slice(0, count);
}

/**
 * Generate realistic relationships between entities
 * @param {Array<Object>} entities - Entities to create relationships for
 * @param {number} relationshipDensity - Average relationships per entity (default 2)
 * @returns {Array<Object>} Array of mock relationships
 */
function generateMockRelationships(entities, relationshipDensity = 2) {
  const relationships = [];
  const relationshipMap = new Map(); // Track existing relationships

  // Predefined relationship patterns for realism
  const patterns = [
  // Person → Company (works at, founded, leads)
  {
    sourceType: 'person',
    targetType: 'company',
    relType: 'direct',
    descriptions: ['founded', 'leads', 'works at']
  },
  // Person → Technology (created, developed)
  {
    sourceType: 'person',
    targetType: 'technology',
    relType: 'direct',
    descriptions: ['created', 'developed', 'pioneered']
  },
  // Company → Technology (develops, uses)
  {
    sourceType: 'company',
    targetType: 'technology',
    relType: 'direct',
    descriptions: ['develops', 'uses', 'maintains']
  },
  // Technology → Concept (implements, enables)
  {
    sourceType: 'technology',
    targetType: 'concept',
    relType: 'conceptual',
    descriptions: ['implements', 'enables', 'demonstrates']
  },
  // Person → Concept (researches, advocates)
  {
    sourceType: 'person',
    targetType: 'concept',
    relType: 'conceptual',
    descriptions: ['researches', 'advocates for', 'specializes in']
  },
  // Company → Concept (focuses on, advances)
  {
    sourceType: 'company',
    targetType: 'concept',
    relType: 'conceptual',
    descriptions: ['focuses on', 'advances', 'invests in']
  }];
  let relationshipId = 1;
  const targetRelationshipCount = entities.length * relationshipDensity;

  // Create relationships based on patterns
  entities.forEach(source => {
    const applicablePatterns = patterns.filter(p => p.sourceType === source.type);
    applicablePatterns.forEach(pattern => {
      const targets = entities.filter(e => e.type === pattern.targetType && e.id !== source.id && e.topic === source.topic // Same topic for higher relevance
      );
      if (targets.length > 0 && relationships.length < targetRelationshipCount) {
        // Create 1-2 relationships per applicable pattern
        const numRels = Math.random() > 0.5 ? 1 : 2;
        for (let i = 0; i < numRels && relationships.length < targetRelationshipCount; i++) {
          const target = targets[Math.floor(Math.random() * targets.length)];
          const relKey = `${source.id}-${target.id}`;
          const reverseKey = `${target.id}-${source.id}`;

          // Avoid duplicate relationships
          if (!relationshipMap.has(relKey) && !relationshipMap.has(reverseKey)) {
            const description = pattern.descriptions[Math.floor(Math.random() * pattern.descriptions.length)];
            relationships.push({
              id: `rel-${relationshipId++}`,
              source: source.id,
              target: target.id,
              type: pattern.relType,
              strength: Math.random() * 0.5 + 0.5,
              // 0.5 to 1.0
              description: `${source.name} ${description} ${target.name}`,
              timestamp: Date.now()
            });
            relationshipMap.set(relKey, true);
          }
        }
      }
    });
  });

  // Add some cross-topic relationships for interesting connections
  const crossTopicCount = Math.floor(entities.length * 0.3);
  for (let i = 0; i < crossTopicCount && relationships.length < targetRelationshipCount * 1.2; i++) {
    const source = entities[Math.floor(Math.random() * entities.length)];
    const target = entities[Math.floor(Math.random() * entities.length)];
    if (source.id !== target.id && source.topic !== target.topic) {
      const relKey = `${source.id}-${target.id}`;
      const reverseKey = `${target.id}-${source.id}`;
      if (!relationshipMap.has(relKey) && !relationshipMap.has(reverseKey)) {
        relationships.push({
          id: `rel-${relationshipId++}`,
          source: source.id,
          target: target.id,
          type: RELATIONSHIP_TYPES.CONCEPTUAL,
          strength: Math.random() * 0.3 + 0.3,
          // Lower strength for cross-topic
          description: `${source.name} relates to ${target.name}`,
          timestamp: Date.now()
        });
        relationshipMap.set(relKey, true);
      }
    }
  }
  return relationships;
}

/**
 * Populate IndexedDB with mock data for testing
 * @param {Object} store - Graph store instance
 * @param {number} entityCount - Number of entities to generate
 * @returns {Promise<Object>} Stats about generated data
 */
async function populateMockData(store, entityCount = 50) {
  const entities = generateMockEntities(entityCount);
  const relationships = generateMockRelationships(entities, 2);

  // Clear existing data
  await store.clearAll();

  // Add entities
  for (const entity of entities) {
    await store.addEntity(entity);
  }

  // Add relationships
  for (const relationship of relationships) {
    await store.addRelationship(relationship);
  }
  return {
    entitiesAdded: entities.length,
    relationshipsAdded: relationships.length,
    avgDegree: (relationships.length * 2 / entities.length).toFixed(2)
  };
}

/**
 * Generate mock articles for testing article capture
 * @param {number} count - Number of articles
 * @returns {Array<Object>} Mock articles
 */
function generateMockArticles(count = 5) {
  const articles = [{
    title: 'Chrome Built-in AI: Gemini Nano Powers On-Device Intelligence',
    url: 'https://developer.chrome.com/docs/ai/built-in-apis',
    content: 'Google Chrome introduces Gemini Nano for on-device AI processing. The Chrome Prompt API, Summarizer API, and Rewriter API enable privacy-first intelligence directly in the browser. Sundar Pichai emphasizes zero-latency inference and GDPR compliance through local-first architecture.',
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000
  }, {
    title: 'Building Privacy-First Chrome Extensions with Manifest V3',
    url: 'https://developer.chrome.com/docs/extensions/mv3',
    content: 'Google Chrome Team releases Manifest V3 specifications for browser extensions. The new service worker architecture and IndexedDB integration enable powerful offline-first applications while maintaining browser extensions security. Key benefits include enhanced privacy and performance.',
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000
  }, {
    title: 'Local-First Software: Seven Ideals for Distributed Systems',
    url: 'https://example.com/local-first-software',
    content: 'Research paper explores local-first software principles, emphasizing on-device inference and offline-first applications. The paper discusses how IndexedDB and Service Workers enable edge AI without cloud dependencies, making browser-level intelligence a reality.',
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000
  }, {
    title: 'WebAssembly Performance Benchmarks for AI Workloads',
    url: 'https://example.com/wasm-ai-performance',
    content: 'New benchmarks show WebAssembly achieving near-native performance for on-device AI inference. The integration with Chrome Extensions and React frontends enables sophisticated knowledge graph applications with D3.js visualizations running at 60fps.',
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000
  }, {
    title: 'Chrome AI Challenge 2025: Building the Future of Intelligent Browsers',
    url: 'https://googlechromeai2025.devpost.com',
    content: 'Google announces the Chrome AI Challenge 2025, inviting developers to build intelligent browser extensions using Gemini Nano. The competition showcases browser-level intelligence, entity extraction, and knowledge graph applications powered by the Chrome Prompt API and on-device AI.',
    timestamp: Date.now() - 9 * 24 * 60 * 60 * 1000
  }];
  return articles.slice(0, count);
}
/* harmony default export */ const mock_data = ({
  generateMockEntities,
  generateMockRelationships,
  populateMockData,
  generateMockArticles
});
;// ./src/utils/writer-test.js
/**
 * Test script for Chrome Writer API quality assessment
 *
 * This tests whether the Writer API can generate genuinely insightful
 * weekly learning summaries, or if it produces generic output.
 *
 * Decision criteria: Output must be "I would personally want this" quality.
 */

/**
 * Test the Writer API with sample article data
 * @param {Array} articles - Sample articles from last 7 days
 * @param {Array} topEntities - Top 15 most frequent entities
 * @returns {Promise<{quality: string, output: string, recommendation: string}>}
 */
async function testWriterQuality(articles, topEntities) {
  try {
    // Check if Writer API is available
    if (!window.ai || !window.ai.writer) {
      return {
        quality: 'unavailable',
        output: null,
        recommendation: 'Skip - API not available'
      };
    }
    const {
      available
    } = await window.ai.writer.capabilities();
    if (available === 'no') {
      return {
        quality: 'unavailable',
        output: null,
        recommendation: 'Skip - API not ready'
      };
    }

    // Create writer session
    const writer = await window.ai.writer.create({
      sharedContext: `You are a world-class research analyst. Your job is to synthesize a user's reading history into a concise, insightful narrative. Identify the 2-3 main themes and show how they connect. Do not just list the articles. Focus on emerging patterns, connections between concepts, and intellectual trajectory.`
    });

    // Build prompt from sample data
    const articleTitles = articles.map(a => `- ${a.title}`).join('\n');
    const entityList = topEntities.map(e => e.name).join(', ');
    const prompt = `Synthesize this week's learning into a narrative paragraph (150-200 words).

Articles captured:
${articleTitles}

Key concepts explored: ${entityList}

Write a synthesis that:
1. Identifies the 2-3 main themes
2. Shows how concepts connect across articles
3. Reveals the intellectual trajectory
4. Sounds insightful, not generic`;
    const output = await writer.write(prompt);

    // Quality assessment heuristics
    const quality = assessOutputQuality(output, articles, topEntities);
    return {
      quality,
      output,
      recommendation: quality === 'exceptional' || quality === 'good' ? 'Build it - output is valuable' : 'Skip - output too generic'
    };
  } catch (error) {
    console.error('Writer API test failed:', error);
    return {
      quality: 'error',
      output: null,
      recommendation: 'Skip - API unstable'
    };
  }
}

/**
 * Assess quality of Writer API output
 * @param {string} output - Generated text
 * @param {Array} articles - Input articles
 * @param {Array} entities - Input entities
 * @returns {string} - 'exceptional', 'good', 'mediocre', 'poor'
 */
function assessOutputQuality(output, articles, entities) {
  // Red flags (generic/poor output)
  const genericPhrases = ['you read about', 'you explored', 'this week you focused on', 'various topics', 'different aspects'];
  const hasGenericLanguage = genericPhrases.some(phrase => output.toLowerCase().includes(phrase));

  // Good signs (insightful output)
  const connectiveWords = ['connects', 'relationship', 'trade-off', 'bridge', 'thread', 'tension', 'emerges'];
  const hasConnectiveLanguage = connectiveWords.some(word => output.toLowerCase().includes(word));

  // Check if it just lists entities
  const entityCount = entities.filter(e => output.includes(e.name)).length;
  const justListingEntities = entityCount > entities.length * 0.7;

  // Check for narrative depth (compound sentences)
  const sentences = output.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = output.split(/\s+/).length / sentences.length;
  const hasDepth = avgWordsPerSentence > 15; // Longer sentences = more complex ideas

  // Scoring
  if (hasConnectiveLanguage && hasDepth && !hasGenericLanguage && !justListingEntities) {
    return 'exceptional';
  } else if (hasConnectiveLanguage && !hasGenericLanguage) {
    return 'good';
  } else if (hasGenericLanguage || justListingEntities) {
    return 'poor';
  } else {
    return 'mediocre';
  }
}

/**
 * Generate sample data for testing
 * @returns {Object} - {articles, topEntities}
 */
function generateSampleData() {
  return {
    articles: [{
      title: 'Chrome Built-in AI: Gemini Nano Performance Benchmarks',
      capturedAt: Date.now() - 86400000 * 1
    }, {
      title: 'Privacy Implications of On-Device Machine Learning',
      capturedAt: Date.now() - 86400000 * 2
    }, {
      title: 'WebAssembly for High-Performance Browser Extensions',
      capturedAt: Date.now() - 86400000 * 3
    }, {
      title: 'Local-First Software: Seven Ideals for Distributed Systems',
      capturedAt: Date.now() - 86400000 * 4
    }, {
      title: 'The Future of Browser APIs: AI Integration Patterns',
      capturedAt: Date.now() - 86400000 * 5
    }],
    topEntities: [{
      name: 'Gemini Nano',
      frequency: 12
    }, {
      name: 'Chrome Extensions',
      frequency: 10
    }, {
      name: 'On-device AI',
      frequency: 9
    }, {
      name: 'Privacy',
      frequency: 8
    }, {
      name: 'WebAssembly',
      frequency: 7
    }, {
      name: 'Performance',
      frequency: 6
    }, {
      name: 'Local-first',
      frequency: 5
    }, {
      name: 'Browser APIs',
      frequency: 5
    }, {
      name: 'Machine Learning',
      frequency: 4
    }, {
      name: 'Distributed Systems',
      frequency: 4
    }]
  };
}
;// ./src/background/service-worker.js
// Background service worker for coordinating AI operations










// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  initializeExtension();
  setupContextMenus();
});

// Removed complex icon indicators - keeping it simple

async function initializeExtension() {
  try {
    // Initialize database
    const store = await getGraphStore();

    // Set default settings if not exists
    const settings = await store.getSettings();
    if (!settings.id) {
      await store.updateSettings(settings);
    }

    // Initialize badge

    // Check AI availability
    await checkAllAIAvailability();
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}

// Setup context menus for right-click capture
function setupContextMenus() {
  chrome.contextMenus.create({
    id: 'captureArticle',
    title: 'Capture Insights with Glyph',
    contexts: ['page']
  });
  chrome.contextMenus.create({
    id: 'captureImage',
    title: 'Extract from Image',
    contexts: ['image']
  });
  chrome.contextMenus.create({
    id: 'captureAllTabs',
    title: 'Capture All Tabs',
    contexts: ['page']
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'captureArticle') {
    captureCurrentTab(tab);
  } else if (info.menuItemId === 'captureImage') {
    captureImage(info.srcUrl, tab);
  } else if (info.menuItemId === 'captureAllTabs') {
    captureAllOpenTabs();
  }
});

// Badge removed - ambient intelligence, not notifications

// Message handler for communication with popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender).then(response => sendResponse(response)).catch(error => {
    console.error('Message handler error:', error);
    sendResponse({
      success: false,
      error: error.message
    });
  });
  return true; // Keep channel open for async
});
async function handleMessage(message, sender) {
  switch (message.type) {
    case 'GET_GRAPH_DATA':
      return await getGraphData();
    case 'CHECK_DUPLICATE':
      return await checkForDuplicate(message.data);
    case 'CAPTURE_ARTICLE':
      return await captureArticle(message.data);
    case 'GET_SETTINGS':
      return await getSettings();
    case 'UPDATE_SETTINGS':
      return await updateSettings(message.data);
    case 'CHECK_AI_STATUS':
      return await checkAIAvailability();
    case 'GET_STATISTICS':
      return await getStatistics();
    case 'LOAD_MOCK_DATA':
      return await loadMockData(message.entityCount);
    case 'QUERY_GRAPH':
      return await queryGraph(message.query, message.graphData);
    case 'QUERY_KNOWLEDGE':
      return await queryKnowledge(message.query);
    case 'ANSWER_ENTITY_QUESTION':
      return await answerEntityQuestion(message.entityId, message.questionType);
    case 'CAPTURE_CURRENT_TAB':
      return await captureCurrentTab(message.tab);
    case 'CAPTURE_IMAGE':
      return await captureImage(message.imageUrl, message.tab);
    case 'CAPTURE_ALL_TABS':
      return await captureAllOpenTabs();
    case 'DISCOVER_RELATIONSHIPS':
      return await discoverAllRelationships();
    case 'GET_ALL_ARTICLES':
      return await getAllArticles();
    case 'DELETE_ARTICLE':
      return await deleteArticle(message.articleId);
    case 'CLEAR_ALL_DATA':
      return await clearAllData();
    case 'TEST_WRITER_API':
      return await testWriterAPI();
    case 'SYNTHESIZE_WEEK':
      synthesizeWeekBackground();
      return {
        success: true,
        message: 'Synthesis started in background. Check back in a few moments.'
      };
    case 'GET_ALL_SYNTHESES':
      return await getAllSyntheses();
    case 'GET_LATEST_SYNTHESIS':
      return await getLatestSynthesis();
    case 'ANALYZE_PAGE_FOR_INSIGHTS':
      return await analyzePageForInsights(message.data);
    case 'OPEN_GRAPH_PAGE':
      return await openGraphPage(message.articleId);
    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
}
async function getGraphData() {
  try {
    const store = await getGraphStore();
    const entities = await store.getAllEntities();
    const relationships = await store.getAllRelationships();
    const nodes = entities.map(entity => ({
      id: entity.id,
      name: entity.name,
      type: entity.type,
      topic: entity.topic,
      relevance: entity.relevance
    }));
    const links = relationships.map(rel => ({
      id: rel.id,
      source: rel.source,
      target: rel.target,
      type: rel.type,
      strength: rel.strength,
      description: rel.description
    }));
    return {
      success: true,
      data: {
        nodes,
        links
      }
    };
  } catch (error) {
    console.error('Failed to get graph data:', error);
    throw error;
  }
}

// URL-specific capture locks to prevent duplicate processing while allowing parallel captures
const captureQueue = new Set();
async function captureArticle(data) {
  try {
    // Check if this specific URL is already being processed
    if (captureQueue.has(data.url)) {
      console.log(`[DEBUG] 🚫 CAPTURE BLOCKED - This URL is already being processed: ${data.url}`);
      return {
        success: false,
        error: 'This article is already being processed'
      };
    }

    // Add URL to processing queue (allows parallel processing of different URLs)
    captureQueue.add(data.url);
    console.log(`[DEBUG] 🔒 CAPTURE STARTED for: ${data.url} (${captureQueue.size} total captures running)`);
    const store = await getGraphStore();
    const settings = await store.getSettings();
    const userTopics = settings.topics || [];

    // Skip duplicate checking here - popup already handled it with user confirmation
    console.log(`[DEBUG] Processing article (duplicate check handled by popup): ${data.url}`);
    notifyProcessingStatus('Analyzing article...', true);

    // Extract entities with AI
    notifyProcessingStatus('Extracting entities with AI...', true);
    const extractedEntities = await extractEntitiesWithSummarization(data.text, userTopics);
    console.log(`[DEBUG] 🤖 AI extracted ${extractedEntities.length} entities from article`);

    // Create article record
    const articleId = generateTempUUID();
    const article = createArticle(data.url, data.title, data.text, '',
    // Summary will be added later if needed
    data.language || 'en', []);
    article.id = articleId;

    // console.log(`Extracted ${extractedEntities.length} entities:`, extractedEntities);

    // Store entities and link to article
    notifyProcessingStatus('Storing entities...', true);
    const entityIds = [];
    for (const entityData of extractedEntities) {
      const entity = createEntity(entityData.name, entityData.type, entityData.topic || userTopics[0] || 'General', entityData.context);
      entity.sources = [articleId];
      entity.relevance = entityData.relevance || 0.5;
      try {
        const storedId = await store.addEntity(entity);
        entityIds.push(storedId || entity.id);
      } catch (error) {
        console.error('Failed to store entity:', entity.name, error);
      }
    }

    // Update article with entity references
    article.entities = entityIds;
    await store.addArticle(article);

    // Reload graph engine cache
    notifyProcessingStatus('Updating knowledge graph...', true);
    const engine = await getGraphEngine();
    await engine.loadGraph();

    // Discover relationships automatically every 5 articles (less frequent for performance)
    const allArticles = await store.getAllArticles();
    if (allArticles.length % 5 === 0 && allArticles.length > 0) {
      // Run relationship discovery in background after capture completes to not block
      setTimeout(async () => {
        try {
          await discoverAllRelationships();
          await engine.reloadGraph();
          chrome.runtime.sendMessage({
            type: 'GRAPH_UPDATED'
          }).catch(() => {});
        } catch (error) {
          console.error('Background relationship discovery failed:', error);
        }
      }, 1000); // 1 second delay
    }

    // Notify popup to refresh
    chrome.runtime.sendMessage({
      type: 'GRAPH_UPDATED'
    });
    notifyProcessingStatus('Article captured successfully!', false);

    // Cleanup: remove URL from processing queue
    captureQueue.delete(data.url);
    console.log(`[DEBUG] 🔓 CAPTURE COMPLETED for: ${data.url} (${captureQueue.size} captures still running)`);
    return {
      success: true,
      articleId: article.id,
      entityCount: extractedEntities.length,
      entities: extractedEntities.map(e => e.name)
    };
  } catch (error) {
    console.error('Article capture failed:', error);
    notifyProcessingStatus(`Error: ${error.message}`, false);

    // Cleanup: remove URL from processing queue even on error
    captureQueue.delete(data.url);
    console.log(`[DEBUG] 🔓 CAPTURE FAILED for: ${data.url} - ${error.message} (${captureQueue.size} captures still running)`);
    throw error;
  }
}
async function getSettings() {
  try {
    const store = await getGraphStore();
    const settings = await store.getSettings();
    return {
      success: true,
      settings
    };
  } catch (error) {
    console.error('Failed to get settings:', error);
    throw error;
  }
}
async function updateSettings(newSettings) {
  try {
    const store = await getGraphStore();
    await store.updateSettings(newSettings);
    return {
      success: true
    };
  } catch (error) {
    console.error('Failed to update settings:', error);
    throw error;
  }
}
async function checkAIAvailability() {
  try {
    const status = await checkAllAIAvailability();
    return {
      success: true,
      status
    };
  } catch (error) {
    console.error('Error checking AI availability:', error);
    return {
      success: false,
      error: error.message,
      status: {
        prompt: {
          available: false,
          status: 'error'
        },
        summarizer: {
          available: false,
          status: 'error'
        },
        languageDetector: {
          available: false,
          status: 'error'
        }
      }
    };
  }
}
async function getStatistics() {
  try {
    const store = await getGraphStore();
    const stats = await store.getStatistics();
    return {
      success: true,
      statistics: stats
    };
  } catch (error) {
    console.error('Failed to get statistics:', error);
    throw error;
  }
}
async function getAllArticles() {
  try {
    const store = await getGraphStore();
    const articles = await store.getAllArticles();
    return {
      success: true,
      articles
    };
  } catch (error) {
    console.error('Failed to get articles:', error);
    throw error;
  }
}
async function deleteArticle(articleId) {
  try {
    const store = await getGraphStore();

    // Get article to find its entities
    const article = await store.getArticle(articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    // Delete the article
    await store.db.delete('articles', articleId);

    // Clean up orphaned entities (entities only linked to this article)
    const allArticles = await store.getAllArticles();
    for (const entityId of article.entities || []) {
      const entity = await store.getEntity(entityId);
      if (entity && entity.sources.length === 1 && entity.sources[0] === articleId) {
        // This entity is only linked to the deleted article
        await store.db.delete('entities', entityId);

        // Clean up relationships involving this entity
        const relationships = await store.getAllRelationships();
        for (const rel of relationships) {
          if (rel.source === entityId || rel.target === entityId) {
            await store.db.delete('relationships', rel.id);
          }
        }
      }
    }

    // Reload graph engine
    const engine = await getGraphEngine();
    await engine.reloadGraph();

    // Update badge
    await
    // Notify UI
    chrome.runtime.sendMessage({
      type: 'GRAPH_UPDATED'
    }).catch(() => {});
    return {
      success: true
    };
  } catch (error) {
    console.error('Failed to delete article:', error);
    throw error;
  }
}
async function clearAllData() {
  try {
    const store = await getGraphStore();
    await store.clearAllData();

    // Reload graph engine
    const engine = await getGraphEngine();
    await engine.reloadGraph();

    // Update badge
    await
    // Notify UI
    chrome.runtime.sendMessage({
      type: 'GRAPH_UPDATED'
    }).catch(() => {});
    return {
      success: true
    };
  } catch (error) {
    console.error('Failed to clear data:', error);
    throw error;
  }
}
function notifyProcessingStatus(status, processing) {
  chrome.runtime.sendMessage({
    type: 'PROCESSING_STATUS',
    status: status,
    processing: processing
  }).catch(() => {
    // Popup might not be open, ignore error
  });
}
function generateTempUUID() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
async function loadMockData(entityCount = 50) {
  try {
    notifyProcessingStatus('Loading mock data...', true);
    const store = await getGraphStore();
    const stats = await populateMockData(store, entityCount);

    // Reload graph engine
    const engine = await getGraphEngine();
    await engine.reloadGraph();

    // Notify popup to refresh
    chrome.runtime.sendMessage({
      type: 'GRAPH_UPDATED'
    });
    notifyProcessingStatus('Mock data loaded successfully!', false);
    return {
      success: true,
      stats
    };
  } catch (error) {
    console.error('Failed to load mock data:', error);
    notifyProcessingStatus(`Error loading mock data: ${error.message}`, false);
    throw error;
  }
}
// Additional service worker functions for new features
// This will be appended to service-worker.js

// Capture current tab (context menu or icon click)
async function captureCurrentTab(tab) {
  try {
    // Simple processing indicator - just show something is happening
    chrome.action.setBadgeText({
      text: '...'
    });
    chrome.action.setBadgeBackgroundColor({
      color: '#FFA500'
    }); // Orange

    // Update capture status for popup
    await chrome.storage.local.set({
      capturingStatus: {
        active: true,
        progress: 'Extracting article content...'
      }
    });

    // Notify popup that processing started
    chrome.runtime.sendMessage({
      type: 'PROCESSING_STATUS',
      status: 'Extracting article content...',
      processing: true
    }).catch(() => {});

    // Notify extension page that article processing started
    chrome.runtime.sendMessage({
      type: 'ARTICLE_PROCESSING_STARTED',
      article: {
        url: tab.url,
        title: 'Processing...',
        processing: true,
        timestamp: Date.now()
      }
    }).catch(() => {});

    // Inject content script if needed and get article content
    const results = await chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      func: extractArticleContent
    });
    const articleData = results[0]?.result;
    if (!articleData || !articleData.text) {
      throw new Error('No article content found on this page');
    }

    // Update popup status
    chrome.runtime.sendMessage({
      type: 'PROCESSING_STATUS',
      status: `Extracting entities... (${articleData.text.length} characters)`,
      processing: true
    }).catch(() => {});

    // Update processing status with actual article title
    chrome.runtime.sendMessage({
      type: 'ARTICLE_PROCESSING_UPDATED',
      article: {
        url: tab.url,
        title: articleData.title,
        processing: true,
        timestamp: Date.now()
      }
    }).catch(() => {});

    // Update progress
    await chrome.storage.local.set({
      capturingStatus: {
        active: true,
        progress: `Extracting entities... (${articleData.text.length} characters)`
      }
    });

    // Capture article (this will run in background)
    const result = await captureArticle(articleData);

    // Reset badge to normal (clear processing indicator)
    chrome.action.setBadgeText({
      text: ''
    });

    // Clear capturing status
    await chrome.storage.local.set({
      capturingStatus: {
        active: false
      }
    });

    // Notify popup that processing completed
    chrome.runtime.sendMessage({
      type: 'PROCESSING_STATUS',
      status: `Complete! Extracted ${result.entityCount} entities`,
      processing: false
    }).catch(() => {});

    // Notify extension page that processing completed
    chrome.runtime.sendMessage({
      type: 'ARTICLE_PROCESSING_COMPLETE',
      article: {
        url: tab.url,
        title: articleData.title,
        processing: false,
        entities: result.entityCount
      }
    }).catch(() => {});

    // Notify popup of completion
    chrome.runtime.sendMessage({
      type: 'CAPTURE_COMPLETE',
      entities: result.entityCount,
      total: (await getStatistics()).statistics.totalEntities
    }).catch(() => {});

    // Notify extension page to refresh
    chrome.runtime.sendMessage({
      type: 'GRAPH_UPDATED'
    }).catch(() => {});
    return result;
  } catch (error) {
    console.error('Capture failed:', error);

    // Reset badge to normal (clear processing indicator)
    chrome.action.setBadgeText({
      text: ''
    });

    // Notify popup of error
    chrome.runtime.sendMessage({
      type: 'PROCESSING_STATUS',
      status: `Failed: ${error.message}`,
      processing: false
    }).catch(() => {});

    // Clear capturing status
    await chrome.storage.local.set({
      capturingStatus: {
        active: false
      }
    });
    throw error;
  }
}

// Function injected into page to extract article content
function extractArticleContent() {
  // Try to find article content
  const selectors = ['article', '[role="article"]', 'main article', '.article-content', '.post-content', '.entry-content'];
  let article = null;
  for (const selector of selectors) {
    article = document.querySelector(selector);
    if (article) break;
  }

  // Fallback to body if no article found
  const content = article || document.body;

  // Extract text
  const title = document.title;
  const text = content.innerText || content.textContent;
  return {
    url: window.location.href,
    title: title,
    text: text.trim(),
    language: document.documentElement.lang || 'en'
  };
}

// Removed complex icon indicator logic - keeping it simple

// Get current active tab
async function getCurrentTab() {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  return tabs[0];
}

// Capture image with multimodal AI
async function captureImage(imageUrl, tab) {
  try {
    // console.log('Capturing image:', imageUrl);

    // Download image
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Convert to File
    const file = new File([blob], 'image.jpg', {
      type: blob.type
    });

    // Extract entities from image using multimodal Prompt API
    const entities = await extractEntitiesFromImage(file, tab.url);
    if (entities.length > 0) {
      // Store entities
      const store = await getGraphStore();
      for (const entityData of entities) {
        const entity = createEntity(entityData.name, entityData.type, entityData.topic || 'General', `From image: ${imageUrl}`);
        entity.sources = [tab.url];
        entity.metadata.imageSource = imageUrl;
        await store.addEntity(entity);
      }

      // Update badge
      await
      // Notify
      chrome.notifications.create({
        type: 'basic',
        iconUrl: '/icons/icon128.ico',
        title: 'Image Saved',
        message: `Found ${entities.length} entities in image`
      });
    }
    return {
      success: true,
      entityCount: entities.length
    };
  } catch (error) {
    console.error('Image capture failed:', error);
    throw error;
  }
}

// Extract entities from image using multimodal Prompt API
async function extractEntitiesFromImage(imageFile, sourceUrl) {
  try {
    // Check if multimodal is available
    if (typeof LanguageModel === 'undefined') {
      throw new Error('Prompt API not available');
    }

    // Create session with multimodal support
    const session = await LanguageModel.create({
      systemPrompt: 'You extract entities from images. Return JSON only.',
      expectedInputs: [{
        type: 'image'
      }, {
        type: 'text'
      }]
    });

    // Append image
    await session.append([{
      role: 'user',
      content: [{
        type: 'image',
        value: imageFile
      }, {
        type: 'text',
        value: `Extract key entities from this image.
Return JSON array: [{"name": "Entity Name", "type": "person|company|technology|concept", "relevance": 0.8}]`
      }]
    }]);

    // Get response
    const response = await session.prompt('List the entities as JSON.');

    // Parse
    const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const entities = JSON.parse(cleaned);
    session.destroy();
    return entities;
  } catch (error) {
    console.error('Image entity extraction failed:', error);
    return []; // Fallback to empty
  }
}

// Capture all open tabs
async function captureAllOpenTabs() {
  try {
    const tabs = await chrome.tabs.query({
      currentWindow: true
    });
    let successCount = 0;
    let totalEntities = 0;
    for (const tab of tabs) {
      try {
        // Skip chrome:// and extension pages
        if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
          continue;
        }
        const result = await captureCurrentTab(tab);
        successCount++;
        totalEntities += result.entityCount;

        // Small delay between captures
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Failed to capture tab ${tab.url}:`, error);
      }
    }
    chrome.notifications.create({
      type: 'basic',
      iconUrl: '/icons/icon128.ico',
      title: 'Bulk Capture Complete',
      message: `Captured ${successCount} tabs, extracted ${totalEntities} entities`
    });
    return {
      success: true,
      tabCount: successCount,
      entityCount: totalEntities
    };
  } catch (error) {
    console.error('Bulk capture failed:', error);
    throw error;
  }
}

// Handle graph queries for chat feature
async function queryGraph(query, graphData) {
  try {
    // Build context from graph
    const context = buildQueryContext(query, graphData);

    // Use Prompt API to answer
    if (typeof LanguageModel === 'undefined') {
      throw new Error('Prompt API not available');
    }
    const session = await LanguageModel.create({
      systemPrompt: 'You answer questions about a knowledge graph. Be concise and factual.',
      temperature: 0.5,
      topK: 40
    });
    const prompt = `Knowledge graph context:
${context}

Question: ${query}

Answer in 2-3 sentences based only on the context provided.`;
    const answer = await session.prompt(prompt);
    session.destroy();

    // Polish with Rewriter if available
    let polished = answer;
    if (typeof Rewriter !== 'undefined') {
      try {
        const rewriter = await Rewriter.create({
          tone: 'neutral',
          length: 'as-is'
        });
        polished = await rewriter.rewrite(answer);
        rewriter.destroy();
      } catch (error) {
        // console.log('Rewriter not available, using raw response');
      }
    }
    return {
      success: true,
      answer: polished
    };
  } catch (error) {
    console.error('Query failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Query knowledge base with full database access
async function queryKnowledge(query) {
  try {
    const store = await getGraphStore();
    const entities = await store.getAllEntities();
    const relationships = await store.getAllRelationships();
    const articles = await store.getAllArticles();

    // Build comprehensive context
    const queryLower = query.toLowerCase();
    const relevantEntities = entities.filter(e => queryLower.includes(e.name.toLowerCase()) || e.name.toLowerCase().includes(queryLower) || e.context?.toLowerCase().includes(queryLower));
    let context = `Knowledge Base Summary:\n`;
    context += `Total: ${entities.length} entities, ${relationships.length} relationships, ${articles.length} articles\n\n`;
    if (relevantEntities.length > 0) {
      context += `Relevant Entities:\n`;
      for (const entity of relevantEntities.slice(0, 10)) {
        context += `- ${entity.name} (${entity.type})\n`;
        if (entity.context) context += `  Context: ${entity.context.slice(0, 100)}\n`;

        // Find relationships
        const rels = relationships.filter(r => r.source === entity.id || r.target === entity.id);
        if (rels.length > 0) {
          const connectedNames = rels.slice(0, 3).map(r => {
            const otherId = r.source === entity.id ? r.target : r.source;
            const other = entities.find(e => e.id === otherId);
            return other ? other.name : null;
          }).filter(Boolean);
          if (connectedNames.length > 0) {
            context += `  Connected to: ${connectedNames.join(', ')}\n`;
          }
        }
      }
    } else {
      // If no direct matches, provide general info about all entities
      const entitySummary = entities.slice(0, 20).map(e => e.name).join(', ');
      context += `\nAvailable entities: ${entitySummary}`;
    }

    // Use Prompt API to answer
    if (typeof LanguageModel === 'undefined') {
      throw new Error('Prompt API not available');
    }
    const session = await LanguageModel.create({
      systemPrompt: 'You answer questions about a knowledge graph. Be concise and helpful.',
      temperature: 0.5,
      topK: 40
    });
    const prompt = `${context}\n\nQuestion: ${query}\n\nAnswer based on the knowledge base:`;
    const answer = await session.prompt(prompt);
    session.destroy();
    return {
      success: true,
      answer
    };
  } catch (error) {
    console.error('Knowledge query failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Answer entity-specific questions (no AI needed)
async function answerEntityQuestion(entityId, questionType) {
  try {
    const store = await getGraphStore();
    const entity = await store.getEntity(entityId);
    if (!entity) {
      return {
        success: false,
        error: 'Entity not found'
      };
    }
    const [type, id] = questionType.split(':');
    if (type === 'SOURCES') {
      // Get articles that mention this entity
      const articles = await store.getAllArticles();
      const sourceArticles = articles.filter(a => a.entities && a.entities.includes(entityId));
      if (sourceArticles.length === 0) {
        return {
          success: true,
          answer: `${entity.name} hasn't been mentioned in any captured articles yet.`
        };
      }
      const articleList = sourceArticles.map(a => `• ${a.title}`).join('\n');
      return {
        success: true,
        answer: `${entity.name} is mentioned in ${sourceArticles.length} article${sourceArticles.length !== 1 ? 's' : ''}:\n\n${articleList}`
      };
    }
    if (type === 'CONNECTIONS') {
      // Get connected entities
      const relationships = await store.getAllRelationships();
      const allEntities = await store.getAllEntities();
      const connectedRels = relationships.filter(r => r.source === entityId || r.target === entityId);
      if (connectedRels.length === 0) {
        return {
          success: true,
          answer: `${entity.name} doesn't have any connections yet. Capture more articles to discover relationships.`
        };
      }
      const connections = connectedRels.map(r => {
        const otherId = r.source === entityId ? r.target : r.source;
        const other = allEntities.find(e => e.id === otherId);
        if (!other) return null;
        const relType = r.type || 'related to';
        return `• ${other.name} (${relType})`;
      }).filter(Boolean);
      return {
        success: true,
        answer: `${entity.name} is connected to ${connections.length} ent${connections.length !== 1 ? 'ities' : 'ity'}:\n\n${connections.join('\n')}`
      };
    }
    if (type === 'CONTEXT') {
      // Get entity context
      let answer = `${entity.name} is a ${entity.type}.`;
      if (entity.context) {
        answer += `\n\n${entity.context}`;
      }
      const sourceCount = entity.sources?.length || 0;
      if (sourceCount > 0) {
        answer += `\n\nMentioned in ${sourceCount} article${sourceCount !== 1 ? 's' : ''}.`;
      }
      return {
        success: true,
        answer
      };
    }
    return {
      success: false,
      error: 'Unknown question type'
    };
  } catch (error) {
    console.error('Answer entity question failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Build context for query
function buildQueryContext(query, graphData) {
  const queryLower = query.toLowerCase();

  // Find relevant nodes
  const relevantNodes = graphData.nodes.filter(node => queryLower.includes(node.name.toLowerCase()) || node.name.toLowerCase().includes(queryLower));
  if (relevantNodes.length === 0) {
    return 'No directly relevant entities found.';
  }

  // Build context string
  let context = 'Entities:\n';
  for (const node of relevantNodes.slice(0, 5)) {
    context += `- ${node.name} (${node.type})\n`;

    // Find connections
    const connections = graphData.edges?.filter(edge => edge.source === node.id || edge.target === node.id) || [];
    if (connections.length > 0) {
      context += `  Connected to: ${connections.slice(0, 3).map(e => {
        const otherId = e.source === node.id ? e.target : e.source;
        const other = graphData.nodes.find(n => n.id === otherId);
        return other ? `${other.name} (${e.type || 'related'})` : '';
      }).filter(Boolean).join(', ')}\n`;
    }
  }
  return context;
}

// Check for duplicate articles before capturing
async function checkForDuplicate(data) {
  try {
    const {
      title,
      text,
      url
    } = data;
    const store = await getGraphStore();
    const allArticles = await store.getAllArticles();
    if (allArticles.length === 0) {
      return {
        success: true,
        isDuplicate: false,
        duplicates: []
      };
    }

    // First pass: Check URL similarity (exact match or very similar)
    const urlDuplicates = allArticles.filter(article => {
      if (article.url === url) return true;

      // Check if URLs are very similar (same domain + path)
      try {
        const url1 = new URL(url);
        const url2 = new URL(article.url);
        return url1.hostname === url2.hostname && url1.pathname === url2.pathname;
      } catch {
        return false;
      }
    });
    if (urlDuplicates.length > 0) {
      return {
        success: true,
        isDuplicate: true,
        confidence: 100,
        duplicates: urlDuplicates.map(a => ({
          id: a.id,
          title: a.title,
          url: a.url,
          capturedAt: a.capturedAt,
          overlap: 100
        }))
      };
    }

    // Second pass: Title similarity
    const titleDuplicates = allArticles.filter(article => {
      const similarity = calculateTitleSimilarity(title, article.title);
      return similarity > 0.8;
    });
    if (titleDuplicates.length > 0) {
      return {
        success: true,
        isDuplicate: true,
        confidence: 90,
        duplicates: titleDuplicates.map(a => ({
          id: a.id,
          title: a.title,
          url: a.url,
          capturedAt: a.capturedAt,
          overlap: Math.round(calculateTitleSimilarity(title, a.title) * 100)
        }))
      };
    }

    // Third pass: Content similarity using summaries (most expensive)
    const contentDuplicates = await findContentDuplicates(text, allArticles);
    if (contentDuplicates.length > 0) {
      return {
        success: true,
        isDuplicate: true,
        confidence: 75,
        duplicates: contentDuplicates
      };
    }
    return {
      success: true,
      isDuplicate: false,
      duplicates: []
    };
  } catch (error) {
    console.error('Duplicate check failed:', error);
    // Don't block capture if check fails
    return {
      success: true,
      isDuplicate: false,
      duplicates: []
    };
  }
}

// Calculate title similarity using word overlap
function calculateTitleSimilarity(title1, title2) {
  const words1 = new Set(title1.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  const words2 = new Set(title2.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  if (words1.size === 0 || words2.size === 0) return 0;
  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);
  return intersection.size / union.size;
}

// Find content duplicates using entity overlap
async function findContentDuplicates(text, allArticles) {
  try {
    // Extract entities from new article quickly
    const newEntities = await extractEntitiesQuick(text);
    if (newEntities.length < 3) {
      return [];
    }

    // Get all entities from database
    const store = await getGraphStore();
    const dbEntities = await store.getAllEntities();
    const entityNameToId = new Map();
    dbEntities.forEach(e => entityNameToId.set(e.name.toLowerCase(), e.id));

    // Match new entities to database
    const newEntityIds = newEntities.map(name => entityNameToId.get(name.toLowerCase())).filter(Boolean);
    if (newEntityIds.length < 3) {
      return [];
    }

    // Find articles with high entity overlap
    const duplicates = [];
    for (const article of allArticles) {
      const articleEntityIds = article.entities || [];
      const overlap = articleEntityIds.filter(id => newEntityIds.includes(id)).length;
      const totalEntities = Math.max(articleEntityIds.length, newEntityIds.length);
      const overlapPercent = totalEntities > 0 ? overlap / totalEntities * 100 : 0;
      if (overlapPercent > 70) {
        duplicates.push({
          id: article.id,
          title: article.title,
          url: article.url,
          capturedAt: article.capturedAt,
          overlap: Math.round(overlapPercent)
        });
      }
    }
    return duplicates;
  } catch (error) {
    console.error('Content duplicate detection failed:', error);
    return [];
  }
}

// Analyze page for Glyph Insights (Live Reading Assistant)
async function analyzePageForInsights(data) {
  try {
    const {
      content,
      url,
      title
    } = data;

    // Quick entity extraction (simplified for speed)
    const entities = await extractEntitiesQuick(content);
    if (entities.length === 0) {
      return {
        success: true,
        matches: [],
        entities: []
      };
    }

    // Find matching articles in database
    const store = await getGraphStore();
    const allArticles = await store.getAllArticles();
    const allEntities = await store.getAllEntities();

    // Build entity name to ID map
    const entityNameToId = new Map();
    allEntities.forEach(e => {
      entityNameToId.set(e.name.toLowerCase(), e.id);
    });

    // Match extracted entities to database entities
    const matchedEntityIds = [];
    const matchedEntityNames = [];
    for (const entityName of entities) {
      const entityId = entityNameToId.get(entityName.toLowerCase());
      if (entityId) {
        matchedEntityIds.push(entityId);
        matchedEntityNames.push(entityName);
      }
    }
    if (matchedEntityIds.length < 2) {
      return {
        success: true,
        matches: [],
        entities: matchedEntityNames
      };
    }

    // Find articles that contain these entities
    const articleMatches = [];
    for (const article of allArticles) {
      const articleEntityIds = article.entities || [];
      const sharedEntities = articleEntityIds.filter(id => matchedEntityIds.includes(id)).length;
      if (sharedEntities >= 2) {
        articleMatches.push({
          id: article.id,
          title: article.title,
          url: article.url,
          capturedAt: article.capturedAt,
          sharedEntities
        });
      }
    }

    // Sort by shared entities (most relevant first)
    articleMatches.sort((a, b) => b.sharedEntities - a.sharedEntities);

    // Check for duplicates
    const duplicateCheck = await checkForDuplicate({
      url,
      title,
      text: content
    });
    const duplicate = duplicateCheck.isDuplicate && duplicateCheck.duplicates.length > 0 ? duplicateCheck.duplicates[0] : null;

    // Return top 5 matches + duplicate warning
    return {
      success: true,
      matches: articleMatches.slice(0, 5),
      entities: matchedEntityNames.slice(0, 5),
      duplicate: duplicate
    };
  } catch (error) {
    console.error('Page analysis for insights failed:', error);
    return {
      success: false,
      matches: [],
      entities: [],
      error: error.message,
      duplicate: null
    };
  }
}

// Quick entity extraction for live pages (DISABLED FOR TESTING)
async function extractEntitiesQuick(text) {
  console.log('[DEBUG] 🚀 EXTRACTENTITIESQUICK DISABLED - Using fallback');
  // Skip AI entirely for testing
  return extractKeywordsSimple(text);
}

// Simple keyword extraction fallback
function extractKeywordsSimple(text) {
  // Extract capitalized phrases (potential entities)
  const words = text.split(/\s+/);
  const entities = new Set();
  for (let i = 0; i < words.length && entities.size < 8; i++) {
    const word = words[i];
    // Check if starts with capital letter and is not common word
    if (/^[A-Z][a-z]+/.test(word) && word.length > 3) {
      entities.add(word);
    }
    // Check for multi-word capitalized phrases
    if (i < words.length - 1) {
      const nextWord = words[i + 1];
      if (/^[A-Z][a-z]+/.test(word) && /^[A-Z][a-z]+/.test(nextWord)) {
        entities.add(`${word} ${nextWord}`);
      }
    }
  }
  return Array.from(entities).slice(0, 8);
}

// Open graph page with article selected
async function openGraphPage(articleId) {
  try {
    const url = chrome.runtime.getURL('graph-page/index.html');
    const fullUrl = articleId ? `${url}?article=${articleId}` : url;
    await chrome.tabs.create({
      url: fullUrl
    });
    return {
      success: true
    };
  } catch (error) {
    console.error('Failed to open graph page:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Test Writer API quality with sample or real data
async function testWriterAPI() {
  try {
    const store = await getGraphStore();

    // Try to get real articles from last 7 days
    const allArticles = await store.getAllArticles();
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentArticles = allArticles.filter(a => a.capturedAt > sevenDaysAgo);
    let testData;
    if (recentArticles.length >= 3) {
      // Use real data
      const allEntities = await store.getAllEntities();

      // Count entity frequencies from recent articles
      const entityFrequency = new Map();
      for (const article of recentArticles) {
        for (const entityId of article.entities || []) {
          entityFrequency.set(entityId, (entityFrequency.get(entityId) || 0) + 1);
        }
      }

      // Get top 15 entities
      const topEntities = Array.from(entityFrequency.entries()).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([id, freq]) => {
        const entity = allEntities.find(e => e.id === id);
        return entity ? {
          name: entity.name,
          frequency: freq
        } : null;
      }).filter(Boolean);
      testData = {
        articles: recentArticles.map(a => ({
          title: a.title,
          capturedAt: a.capturedAt
        })),
        topEntities
      };
    } else {
      // Use sample data
      testData = generateSampleData();
    }

    // Test Writer API
    const result = await testWriterQuality(testData.articles, testData.topEntities);
    return {
      success: true,
      ...result,
      dataSource: recentArticles.length >= 3 ? 'real' : 'sample',
      articlesCount: testData.articles.length
    };
  } catch (error) {
    console.error('Writer API test failed:', error);
    return {
      success: false,
      quality: 'error',
      error: error.message,
      recommendation: 'Skip - API test failed'
    };
  }
}

// Synthesize weekly learning using Writer API
async function synthesizeWeek() {
  try {
    // Check Writer API availability
    if (typeof Writer === 'undefined' || typeof Writer.create !== 'function') {
      return {
        success: false,
        error: 'Writer API not available in this Chrome version. Update to Chrome 142+ or enable experimental flags.'
      };
    }
    try {
      const availability = await Writer.availability();
      if (availability !== 'readily' && availability !== 'available') {
        return {
          success: false,
          error: `Writer API not ready. Status: ${availability}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Writer API check failed: ${error.message}`
      };
    }
    const store = await getGraphStore();

    // Get articles from last 7 days
    const allArticles = await store.getAllArticles();
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentArticles = allArticles.filter(a => a.capturedAt >= oneWeekAgo);
    if (recentArticles.length === 0) {
      return {
        success: false,
        error: 'No articles captured in the last 7 days'
      };
    }

    // Get all entities
    const allEntities = await store.getAllEntities();

    // Count entity frequencies from recent articles
    const entityFrequency = new Map();
    for (const article of recentArticles) {
      for (const entityId of article.entities || []) {
        entityFrequency.set(entityId, (entityFrequency.get(entityId) || 0) + 1);
      }
    }

    // Get top 15 entities
    const topEntities = Array.from(entityFrequency.entries()).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([id, freq]) => {
      const entity = allEntities.find(e => e.id === id);
      return entity ? {
        name: entity.name,
        type: entity.type,
        frequency: freq
      } : null;
    }).filter(Boolean);
    if (topEntities.length === 0) {
      return {
        success: false,
        error: 'No entities found in recent articles'
      };
    }

    // Create Writer session with specific context
    const writer = await Writer.create({
      sharedContext: `You are a world-class learning analyst who crafts insightful narratives about people's learning journeys. You synthesize information into compelling, coherent stories that reveal patterns and connections.`
    });

    // Build prompt with article and entity data
    const entityList = topEntities.map(e => `- ${e.name} (${e.type}, appeared ${e.frequency} times)`).join('\n');
    const articleTitles = recentArticles.slice(0, 10).map(a => `- "${a.title}"`).join('\n');
    const prompt = `Based on the following learning data from the past week, write a 150-200 word narrative synthesis that tells the story of this person's intellectual journey. Focus on themes, connections, and insights rather than just listing topics.

Articles Read (${recentArticles.length} total):
${articleTitles}

Most Frequent Entities:
${entityList}

Write a narrative that:
1. Identifies 2-3 major themes or topics
2. Highlights interesting connections between entities
3. Suggests what the person is learning about or interested in
4. Uses a warm, insightful tone

Synthesis:`;
    const synthesis = await writer.write(prompt, {
      context: 'This is a personal learning summary for educational purposes.'
    });
    writer.destroy();

    // Store synthesis in database with timestamp
    const now = Date.now();
    const weekStart = oneWeekAgo;
    const synthesisId = `synthesis_${now}`;
    const synthesisRecord = {
      id: synthesisId,
      synthesis: synthesis.trim(),
      createdAt: now,
      weekStart: weekStart,
      weekEnd: now,
      articlesAnalyzed: recentArticles.length,
      topEntities: topEntities.slice(0, 5).map(e => e.name)
    };
    await store.db.add('syntheses', synthesisRecord);
    return {
      success: true,
      synthesis: synthesis.trim(),
      articlesAnalyzed: recentArticles.length,
      topEntities: topEntities.slice(0, 5).map(e => e.name),
      createdAt: now,
      weekStart: weekStart
    };
  } catch (error) {
    console.error('Weekly synthesis failed:', error);
    return {
      success: false,
      error: error.message || 'Unknown error during synthesis'
    };
  }
}
async function synthesizeWeekBackground() {
  try {
    const result = await synthesizeWeek();
    if (result.success) {
      console.log('Weekly synthesis completed in background');
      chrome.runtime.sendMessage({
        type: 'SYNTHESIS_COMPLETE',
        data: result
      }).catch(() => {});
    }
  } catch (error) {
    console.error('Background synthesis failed:', error);
  }
}
async function getAllSyntheses() {
  try {
    const store = await getGraphStore();
    const allSyntheses = await store.db.getAll('syntheses');
    allSyntheses.sort((a, b) => b.createdAt - a.createdAt);
    return {
      success: true,
      syntheses: allSyntheses
    };
  } catch (error) {
    console.error('Failed to get syntheses:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
async function getLatestSynthesis() {
  try {
    const result = await getAllSyntheses();
    if (result.success && result.syntheses.length > 0) {
      return {
        success: true,
        synthesis: result.syntheses[0]
      };
    }
    return {
      success: false,
      error: 'No syntheses found'
    };
  } catch (error) {
    console.error('Failed to get latest synthesis:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Add these to the message handler
// Update handleMessage function to include these new cases:
/*
case 'QUERY_GRAPH':
  return await queryGraph(message.query, message.graphData);


case 'CAPTURE_ALL_TABS':
  return await captureAllOpenTabs();
*/
/******/ })()
;
//# sourceMappingURL=service-worker.js.map