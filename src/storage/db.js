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

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Object Store: entities (knowledge graph nodes)
        if (!db.objectStoreNames.contains('entities')) {
          const entityStore = db.createObjectStore('entities', { keyPath: 'id' });
          entityStore.createIndex('name', 'name', { unique: false });
          entityStore.createIndex('type', 'type', { unique: false });
          entityStore.createIndex('topic', 'topic', { unique: false });
          entityStore.createIndex('firstSeen', 'firstSeen', { unique: false });
        }

        // Object Store: relationships (knowledge graph edges)
        if (!db.objectStoreNames.contains('relationships')) {
          const relStore = db.createObjectStore('relationships', { keyPath: 'id' });
          relStore.createIndex('source', 'source', { unique: false });
          relStore.createIndex('target', 'target', { unique: false });
          relStore.createIndex('created', 'created', { unique: false });
        }

        // Object Store: articles (captured content)
        if (!db.objectStoreNames.contains('articles')) {
          const articleStore = db.createObjectStore('articles', { keyPath: 'id' });
          articleStore.createIndex('url', 'url', { unique: false });
          articleStore.createIndex('capturedAt', 'capturedAt', { unique: false });
        }

        // Object Store: settings (user preferences)
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'id' });
        }

        // Object Store: syntheses (weekly learning summaries)
        if (!db.objectStoreNames.contains('syntheses')) {
          const synthesisStore = db.createObjectStore('syntheses', { keyPath: 'id' });
          synthesisStore.createIndex('createdAt', 'createdAt', { unique: false });
          synthesisStore.createIndex('weekStart', 'weekStart', { unique: false });
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

export function getDB() {
  if (!dbInstance) {
    dbInstance = new Database();
  }
  return dbInstance;
}

export default Database;
