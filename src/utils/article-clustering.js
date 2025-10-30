// Article clustering utilities for grouping related articles

/**
 * Calculate shared entities between two articles
 * @param {Object} article1 - First article
 * @param {Object} article2 - Second article
 * @returns {Array<string>} Array of shared entity names
 */
export function findSharedEntities(article1, article2) {
  const entities1 = new Set(article1.entities || []);
  const entities2 = new Set(article2.entities || []);

  return Array.from(entities1).filter(e => entities2.has(e));
}

/**
 * Calculate connection strength between two articles
 * @param {Object} article1 - First article
 * @param {Object} article2 - Second article
 * @returns {number} Number of shared entities
 */
export function calculateConnectionStrength(article1, article2) {
  return findSharedEntities(article1, article2).length;
}

/**
 * Get connection strength category for color coding
 * @param {number} strength - Number of shared entities
 * @returns {string} Category: 'strong', 'moderate', 'weak', 'minimal'
 */
export function getConnectionCategory(strength) {
  if (strength >= 8) return 'strong';
  if (strength >= 4) return 'moderate';
  if (strength >= 2) return 'weak';
  return 'minimal';
}

/**
 * Build connection map for all articles
 * @param {Array<Object>} articles - All articles
 * @returns {Map} Map of article ID to array of connections
 */
export function buildConnectionMap(articles) {
  const connectionMap = new Map();

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const connections = [];

    for (let j = 0; j < articles.length; j++) {
      if (i !== j) {
        const other = articles[j];
        const strength = calculateConnectionStrength(article, other);

        if (strength > 0) {
          connections.push({
            articleId: other.id,
            strength,
            category: getConnectionCategory(strength),
            sharedEntities: findSharedEntities(article, other)
          });
        }
      }
    }

    // Sort connections by strength (strongest first)
    connections.sort((a, b) => b.strength - a.strength);
    connectionMap.set(article.id, connections);
  }

  return connectionMap;
}

/**
 * Cluster articles using simple greedy algorithm with topic awareness
 * @param {Array<Object>} articles - All articles
 * @param {number} minSharedEntities - Minimum shared entities to form cluster
 * @param {Map} entityMap - Map of entity ID to entity name
 * @param {Array<string>} userTopics - User's topics of interest for enhanced clustering
 * @returns {Array<Object>} Array of clusters
 */

export function clusterArticles(articles, minSharedEntities = 2, entityMap = new Map(), userTopics = []) {
  if (articles.length === 0) return [];

  const clusters = [];
  const clustered = new Set();
  const connectionMap = buildConnectionMap(articles);

  // Sort articles by total connection strength (most connected first)
  const sortedArticles = [...articles].sort((a, b) => {
    const aConnections = connectionMap.get(a.id) || [];
    const bConnections = connectionMap.get(b.id) || [];
    const aStrength = aConnections.reduce((sum, c) => sum + c.strength, 0);
    const bStrength = bConnections.reduce((sum, c) => sum + c.strength, 0);
    return bStrength - aStrength;
  });

  // Build clusters using greedy approach with topic consideration
  for (const article of sortedArticles) {
    if (clustered.has(article.id)) continue;

    const connections = connectionMap.get(article.id) || [];

    // Find articles with shared entities (minimum threshold)
    const sharedEntityConnections = connections.filter(c => c.strength >= minSharedEntities);

    // Also find articles with single strong entity match (like "Rivian")
    // but only if the shared entity is mentioned in both article titles
    const strongSingleEntityConnections = connections.filter(c => {
      if (c.strength === 1) {
        const sharedEntityId = c.sharedEntities[0];
        const sharedEntity = entityMap.get(sharedEntityId);
        const sharedEntityName = sharedEntity?.name || sharedEntityId;
        const otherArticle = articles.find(a => a.id === c.articleId);

        if (otherArticle &&
            article.title.toLowerCase().includes(sharedEntityName.toLowerCase()) &&
            otherArticle.title.toLowerCase().includes(sharedEntityName.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    // Use only natural entity-based connections (no topic forcing)
    const strongConnections = [...sharedEntityConnections, ...strongSingleEntityConnections];

    if (strongConnections.length > 0) {
      // Create new cluster
      const clusterArticles = [article];
      const clusterEntityCounts = new Map();

      // Count entity frequencies in this cluster (convert IDs to names)
      for (const entityId of article.entities || []) {
        const entityObject = entityMap.get(entityId);
        const entityName = entityObject?.name || entityId;
        clusterEntityCounts.set(entityName, 1);
      }

      // Add strongly connected articles
      for (const conn of strongConnections) {
        if (!clustered.has(conn.articleId)) {
          const connectedArticle = articles.find(a => a.id === conn.articleId);
          if (connectedArticle) {
            clusterArticles.push(connectedArticle);
            clustered.add(conn.articleId);

            // Update entity counts (convert IDs to names)
            for (const entityId of connectedArticle.entities || []) {
              const entityObject = entityMap.get(entityId);
              const entityName = entityObject?.name || entityId;
              clusterEntityCounts.set(
                entityName,
                (clusterEntityCounts.get(entityName) || 0) + 1
              );
            }
          }
        }
      }

      // Find dominant entities (appear in multiple articles)
      const dominantEntities = Array.from(clusterEntityCounts.entries())
        .filter(([_, count]) => count > 1)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, _]) => name);

      // No forced topic detection - let entities naturally cluster
      let clusterTopic = null;

      clustered.add(article.id);

      // Sort articles within cluster by timestamp (most recent first)
      clusterArticles.sort((a, b) => b.capturedAt - a.capturedAt);

      clusters.push({
        id: `cluster-${clusters.length}`,
        articles: clusterArticles,
        dominantEntities,
        totalSharedEntities: dominantEntities.length,
        strength: strongConnections.reduce((sum, c) => sum + c.strength, 0),
        topic: clusterTopic // Add topic information
      });
    }
  }

  // Add remaining unclustered articles as standalone
  const standalone = articles
    .filter(a => !clustered.has(a.id))
    .sort((a, b) => b.capturedAt - a.capturedAt);

  if (standalone.length > 0) {
    clusters.push({
      id: 'cluster-standalone',
      articles: standalone,
      dominantEntities: [],
      totalSharedEntities: 0,
      strength: 0,
      isStandalone: true
    });
  }

  // Sort clusters by strength (strongest first), standalone always last
  clusters.sort((a, b) => {
    if (a.isStandalone) return 1;
    if (b.isStandalone) return -1;
    return b.strength - a.strength;
  });

  return clusters;
}

/**
 * Generate cluster name from dominant entities and topic
 * @param {Array<string>} entities - Dominant entity names
 * @param {string|null} topic - Optional topic name
 * @returns {string} Generated cluster name
 */
export function generateClusterName(entities, topic = null) {
  // Prioritize topic name if available
  if (topic) {
    if (entities.length === 0) return `${topic} Articles`;
    if (entities.length === 1) return `${topic}: ${entities[0]}`;
    return `${topic}: ${entities[0]} & ${entities[1]}`;
  }

  // Fallback to entity-based names
  if (entities.length === 0) return 'Standalone Articles';
  if (entities.length === 1) return entities[0];
  if (entities.length === 2) return `${entities[0]} & ${entities[1]}`;
  return `${entities[0]}, ${entities[1]} & more`;
}

export default {
  findSharedEntities,
  calculateConnectionStrength,
  getConnectionCategory,
  buildConnectionMap,
  clusterArticles,
  generateClusterName
};
