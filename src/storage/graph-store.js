// Graph-specific storage operations (optimized with relationship index)
import { getDB } from './db.js';

class GraphStore {
  constructor() {
    this.db = getDB();
    this.relationshipIndex = new Map();  // "source-target" → relationship (O(1) lookups)
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

    const updated = { ...existing, ...updates };
    await this.db.update('articles', updated);
    return updated;
  }

  async getRecentArticles(limit = 10) {
    const all = await this.db.getAll('articles');
    return all
      .sort((a, b) => b.capturedAt - a.capturedAt)
      .slice(0, limit);
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

export async function getGraphStore() {
  if (!graphStoreInstance) {
    graphStoreInstance = new GraphStore();
    await graphStoreInstance.init();
  }
  return graphStoreInstance;
}

export default GraphStore;
