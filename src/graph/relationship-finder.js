// Relationship discovery using PMI (Pointwise Mutual Information) + AI semantic labeling
import { getGraphStore } from '../storage/graph-store.js';
import { createRelationship } from '../utils/helpers.js';

/**
 * Find relationships between entities using PMI algorithm
 * PMI measures how much the co-occurrence of two entities exceeds random chance
 * @param {Array<Object>} entities - Entities to analyze
 * @param {Object} options - Configuration options
 * @returns {Promise<Array<Object>>} Discovered relationships
 */
export async function findRelationships(entities, options = {}) {
  const {
    minStrength = 0.3,      // Minimum PMI strength to create relationship
    useSemanticLabeling = true,  // Use AI to label relationship types
    maxRelationships = 50   // Max relationships to return
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

        const pmiScore = calculatePMI(
          entity1.id,
          entity2.id,
          coOccurrences,
          allArticles.length
        );

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
  const maxPMI = 10;  // Theoretical maximum is log2(N), use 10 as practical max
  const normalizedPMI = Math.max(0, Math.min(pmi / maxPMI, 1));

  // Boost score based on co-occurrence frequency
  // More co-occurrences = more confident relationship
  const frequencyBoost = Math.min(coCount / 5, 0.2);  // Max 0.2 boost

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
    const pairs = batch.map((rel, idx) =>
      `${idx + 1}. ${rel.source.name} (${rel.source.type}) ↔ ${rel.target.name} (${rel.target.type})`
    ).join('\n');

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
export async function storeRelationships(relationships, allArticles = []) {
  try {
    const store = await getGraphStore();
    let storedCount = 0;

    for (const rel of relationships) {
      const relationship = createRelationship(
        rel.source.id,
        rel.target.id,
        rel.type || 'related_to',
        rel.description || '',
        rel.strength
      );

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
export async function discoverAllRelationships() {
  try {
    // console.log('Starting relationship discovery...');

    const store = await getGraphStore();
    const settings = await store.getSettings();
    const allEntities = await store.getAllEntities();
    const allArticles = await store.getAllArticles();

    if (allEntities.length < 2) {
      return { success: true, relationshipsFound: 0, message: 'Not enough entities' };
    }

    // Performance optimization: Scale relationship discovery based on data size
    let entitiesToAnalyze = allEntities;
    let maxRelationships = 100;

    // Strategy 1: For >50 articles, only analyze entities in user's topics of interest
    if (allArticles.length > 50 && settings.topics && settings.topics.length > 0) {
      const userTopics = settings.topics.filter(t => t && t.trim());
      if (userTopics.length > 0) {
        entitiesToAnalyze = allEntities.filter(e =>
          userTopics.some(topic =>
            e.topic && e.topic.toLowerCase().includes(topic.toLowerCase())
          )
        );
        maxRelationships = 50;
        // console.log(`Large dataset (${allArticles.length} articles): Analyzing ${entitiesToAnalyze.length} topic-related entities`);
      }
    }

    // Strategy 2: For >20 articles, limit to entities from recent 15 articles
    else if (allArticles.length > 20) {
      const recentArticles = allArticles
        .sort((a, b) => b.capturedAt - a.capturedAt)
        .slice(0, 15);

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
      entitiesToAnalyze = entitiesToAnalyze
        .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
        .slice(0, 200);
      // console.log(`Limited to top 200 entities by relevance to prevent performance issues`);
    }

    // Find relationships with PMI + AI labeling (co-occurring entities)
    const relationships = await findRelationships(entitiesToAnalyze, {
      minStrength: 0.3,
      useSemanticLabeling: false, // Disable AI labeling for performance - use default types
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
    return { success: false, error: error.message };
  }
}
