// Mock data generator for development and testing
import { ENTITY_TYPES, RELATIONSHIP_TYPES } from './constants.js';

/**
 * Generate realistic mock entities for testing
 * @param {number} count - Number of entities to generate
 * @returns {Array<Object>} Array of mock entities
 */
export function generateMockEntities(count = 50) {
  const mockData = {
    person: [
      { name: 'Sundar Pichai', topic: 'Chrome AI' },
      { name: 'Demis Hassabis', topic: 'Chrome AI' },
      { name: 'Jeff Dean', topic: 'Chrome AI' },
      { name: 'Parisa Tabriz', topic: 'Chrome Security' },
      { name: 'Alex Russell', topic: 'Web Platform' },
      { name: 'Jake Archibald', topic: 'Web Performance' },
      { name: 'Addy Osmani', topic: 'Chrome DevTools' },
      { name: 'Paul Irish', topic: 'Chrome DevTools' }
    ],
    company: [
      { name: 'Google', topic: 'Chrome AI' },
      { name: 'Google DeepMind', topic: 'Chrome AI' },
      { name: 'Anthropic', topic: 'AI Safety' },
      { name: 'Google Chrome Team', topic: 'Browser Development' },
      { name: 'Mozilla', topic: 'Browser Privacy' }
    ],
    technology: [
      { name: 'Gemini Nano', topic: 'Chrome AI' },
      { name: 'Chrome Prompt API', topic: 'Chrome AI' },
      { name: 'Chrome Summarizer API', topic: 'Chrome AI' },
      { name: 'Chrome Rewriter API', topic: 'Chrome AI' },
      { name: 'Chrome Language Detector', topic: 'Chrome AI' },
      { name: 'Chrome Writer API', topic: 'Chrome AI' },
      { name: 'On-device AI', topic: 'Chrome AI' },
      { name: 'Chrome Extensions', topic: 'Browser Development' },
      { name: 'Manifest V3', topic: 'Browser Development' },
      { name: 'Service Workers', topic: 'Web Platform' },
      { name: 'IndexedDB', topic: 'Web Platform' },
      { name: 'WebAssembly', topic: 'Web Performance' },
      { name: 'React', topic: 'Frontend' },
      { name: 'D3.js', topic: 'Data Visualization' }
    ],
    concept: [
      { name: 'Privacy-first AI', topic: 'Chrome AI' },
      { name: 'Local-first Software', topic: 'Privacy' },
      { name: 'On-device Inference', topic: 'Chrome AI' },
      { name: 'Browser-level Intelligence', topic: 'Chrome AI' },
      { name: 'Zero-latency AI', topic: 'Performance' },
      { name: 'Offline-first Applications', topic: 'Web Platform' },
      { name: 'Edge AI', topic: 'Chrome AI' },
      { name: 'Knowledge Graphs', topic: 'Data Structures' },
      { name: 'Entity Extraction', topic: 'NLP' },
      { name: 'Relationship Discovery', topic: 'Graph Theory' },
      { name: 'Browser Extensions Security', topic: 'Chrome Security' },
      { name: 'GDPR Compliance', topic: 'Privacy' }
    ]
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
          relevance: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
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
export function generateMockRelationships(entities, relationshipDensity = 2) {
  const relationships = [];
  const relationshipMap = new Map(); // Track existing relationships

  // Predefined relationship patterns for realism
  const patterns = [
    // Person → Company (works at, founded, leads)
    { sourceType: 'person', targetType: 'company', relType: 'direct', descriptions: ['founded', 'leads', 'works at'] },

    // Person → Technology (created, developed)
    { sourceType: 'person', targetType: 'technology', relType: 'direct', descriptions: ['created', 'developed', 'pioneered'] },

    // Company → Technology (develops, uses)
    { sourceType: 'company', targetType: 'technology', relType: 'direct', descriptions: ['develops', 'uses', 'maintains'] },

    // Technology → Concept (implements, enables)
    { sourceType: 'technology', targetType: 'concept', relType: 'conceptual', descriptions: ['implements', 'enables', 'demonstrates'] },

    // Person → Concept (researches, advocates)
    { sourceType: 'person', targetType: 'concept', relType: 'conceptual', descriptions: ['researches', 'advocates for', 'specializes in'] },

    // Company → Concept (focuses on, advances)
    { sourceType: 'company', targetType: 'concept', relType: 'conceptual', descriptions: ['focuses on', 'advances', 'invests in'] }
  ];

  let relationshipId = 1;
  const targetRelationshipCount = entities.length * relationshipDensity;

  // Create relationships based on patterns
  entities.forEach(source => {
    const applicablePatterns = patterns.filter(p => p.sourceType === source.type);

    applicablePatterns.forEach(pattern => {
      const targets = entities.filter(e =>
        e.type === pattern.targetType &&
        e.id !== source.id &&
        e.topic === source.topic // Same topic for higher relevance
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
              strength: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
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
          strength: Math.random() * 0.3 + 0.3, // Lower strength for cross-topic
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
export async function populateMockData(store, entityCount = 50) {
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
export function generateMockArticles(count = 5) {
  const articles = [
    {
      title: 'Chrome Built-in AI: Gemini Nano Powers On-Device Intelligence',
      url: 'https://developer.chrome.com/docs/ai/built-in-apis',
      content: 'Google Chrome introduces Gemini Nano for on-device AI processing. The Chrome Prompt API, Summarizer API, and Rewriter API enable privacy-first intelligence directly in the browser. Sundar Pichai emphasizes zero-latency inference and GDPR compliance through local-first architecture.',
      timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000
    },
    {
      title: 'Building Privacy-First Chrome Extensions with Manifest V3',
      url: 'https://developer.chrome.com/docs/extensions/mv3',
      content: 'Google Chrome Team releases Manifest V3 specifications for browser extensions. The new service worker architecture and IndexedDB integration enable powerful offline-first applications while maintaining browser extensions security. Key benefits include enhanced privacy and performance.',
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000
    },
    {
      title: 'Local-First Software: Seven Ideals for Distributed Systems',
      url: 'https://example.com/local-first-software',
      content: 'Research paper explores local-first software principles, emphasizing on-device inference and offline-first applications. The paper discusses how IndexedDB and Service Workers enable edge AI without cloud dependencies, making browser-level intelligence a reality.',
      timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000
    },
    {
      title: 'WebAssembly Performance Benchmarks for AI Workloads',
      url: 'https://example.com/wasm-ai-performance',
      content: 'New benchmarks show WebAssembly achieving near-native performance for on-device AI inference. The integration with Chrome Extensions and React frontends enables sophisticated knowledge graph applications with D3.js visualizations running at 60fps.',
      timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000
    },
    {
      title: 'Chrome AI Challenge 2025: Building the Future of Intelligent Browsers',
      url: 'https://googlechromeai2025.devpost.com',
      content: 'Google announces the Chrome AI Challenge 2025, inviting developers to build intelligent browser extensions using Gemini Nano. The competition showcases browser-level intelligence, entity extraction, and knowledge graph applications powered by the Chrome Prompt API and on-device AI.',
      timestamp: Date.now() - 9 * 24 * 60 * 60 * 1000
    }
  ];

  return articles.slice(0, count);
}

export default {
  generateMockEntities,
  generateMockRelationships,
  populateMockData,
  generateMockArticles
};
