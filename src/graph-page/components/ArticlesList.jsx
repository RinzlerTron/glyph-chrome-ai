import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  clusterArticles,
  buildConnectionMap,
  findSharedEntities,
  generateClusterName,
  getConnectionCategory
} from '../../utils/article-clustering';

function ArticlesList({ onClose, onArticleClick, selectedArticle, onHighlightEntities }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('recent'); // 'recent' or 'connected'
  const [clusters, setClusters] = useState([]);
  const [connectionMap, setConnectionMap] = useState(new Map());
  const [expandedClusters, setExpandedClusters] = useState(new Set());
  const [showingConnectionFor, setShowingConnectionFor] = useState(null);
  const [entityMap, setEntityMap] = useState(new Map());
  const [processingArticles, setProcessingArticles] = useState(new Map());
  const [userTopics, setUserTopics] = useState([]);

  useEffect(() => {
    loadArticles();

    // Listen for real-time article updates
    const messageListener = (message) => {
      if (message.type === 'ARTICLE_PROCESSING_STARTED') {
        setProcessingArticles(prev => new Map(prev.set(message.article.url, {
          ...message.article,
          id: `processing-${Date.now()}`,
          entities: []
        })));
      } else if (message.type === 'ARTICLE_PROCESSING_UPDATED') {
        setProcessingArticles(prev => new Map(prev.set(message.article.url, {
          ...message.article,
          id: `processing-${Date.now()}`,
          entities: []
        })));
      } else if (message.type === 'ARTICLE_PROCESSING_COMPLETE') {
        setProcessingArticles(prev => {
          const newMap = new Map(prev);
          newMap.delete(message.article.url);
          return newMap;
        });
        loadArticles(); // Reload to get the actual saved article
      } else if (message.type === 'GRAPH_UPDATED') {
        loadArticles();
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  async function loadArticles() {
    try {
      const articlesResponse = await chrome.runtime.sendMessage({ type: 'GET_ALL_ARTICLES' });
      const graphResponse = await chrome.runtime.sendMessage({ type: 'GET_GRAPH_DATA' });
      const settingsResponse = await chrome.runtime.sendMessage({ type: 'GET_SETTINGS' });

      if (articlesResponse.success) {
        const articlesList = articlesResponse.articles;
        const entityMap = new Map();

        // Build entity ID -> entity object map (includes topic info)
        if (graphResponse.success && graphResponse.data?.nodes) {
          graphResponse.data.nodes.forEach(node => {
            entityMap.set(node.id, node);
          });
        }

        // Get user topics from settings
        const topics = settingsResponse.success && settingsResponse.settings?.topics
          ? settingsResponse.settings.topics.filter(t => t && t.trim())
          : [];

        setArticles(articlesList);
        setEntityMap(entityMap);
        setUserTopics(topics);

        // Compute clusters and connections with topic awareness
        const clusteredData = clusterArticles(articlesList, 2, entityMap, topics);
        setClusters(clusteredData);

        // Expand all clusters by default
        const allClusterIds = new Set(clusteredData.map(c => c.id));
        setExpandedClusters(allClusterIds);

        // Build connection map
        const connMap = buildConnectionMap(articlesList);
        setConnectionMap(connMap);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to load articles:', error);
      setLoading(false);
    }
  }

  async function handleDeleteArticle(articleId, e) {
    e.stopPropagation();
    if (!confirm('Delete this article and its entities? This cannot be undone.')) {
      return;
    }

    try {
      await chrome.runtime.sendMessage({
        type: 'DELETE_ARTICLE',
        articleId
      });
      const updatedArticles = articles.filter(a => a.id !== articleId);
      setArticles(updatedArticles);

      // Recompute clusters with topic awareness
      const clusteredData = clusterArticles(updatedArticles, 2, entityMap, userTopics);
      setClusters(clusteredData);
      const connMap = buildConnectionMap(updatedArticles);
      setConnectionMap(connMap);

      if (selectedArticle?.id === articleId) {
        onArticleClick(null);
      }
    } catch (error) {
      console.error('Failed to delete article:', error);
      alert('Failed to delete article');
    }
  }

  function toggleCluster(clusterId) {
    const newExpanded = new Set(expandedClusters);
    if (newExpanded.has(clusterId)) {
      newExpanded.delete(clusterId);
    } else {
      newExpanded.add(clusterId);
    }
    setExpandedClusters(newExpanded);
  }

  function handleConnectionClick(article1, article2, e) {
    e.stopPropagation();
    const sharedEntityIds = findSharedEntities(article1, article2);

    // Convert entity IDs to readable names
    const sharedEntityNames = sharedEntityIds.map(entityId => {
      const entityObject = entityMap.get(entityId);
      return entityObject?.name || entityId; // Fallback to ID if name not found
    });

    // Highlight shared entities in graph
    if (onHighlightEntities) {
      onHighlightEntities(sharedEntityIds);
    }

    // Show connection details
    setShowingConnectionFor({
      article1,
      article2,
      sharedEntities: sharedEntityNames // Now using readable names
    });
  }

  function closeConnectionModal() {
    setShowingConnectionFor(null);
    if (onHighlightEntities) {
      onHighlightEntities([]);
    }
  }

  if (loading) {
    return (
      <div className="articles-list-panel">
        <div className="articles-header">
          <h3>Your Artifacts</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="articles-body">
          <p>Loading artifacts...</p>
        </div>
      </div>
    );
  }

  function renderProcessingArticleCard(article) {
    return (
      <div key={article.id} className="article-card article-card-processing">
        <div className="article-timeline-dot timeline-dot-processing">
          <div className="processing-spinner"></div>
        </div>
        <div className="article-content">
          <div className="article-header">
            <h3 className="article-title">
              {article.title}
            </h3>
          </div>
          <div className="article-meta">
            <span className="article-date">Processing...</span>
            <span className="article-entities">Extracting entities...</span>
          </div>
        </div>
      </div>
    );
  }

  function renderArticleCard(article, nextArticle = null, isLast = false, showConnections = true) {
    const connections = connectionMap.get(article.id) || [];
    const nextConnection = nextArticle ? connections.find(c => c.articleId === nextArticle.id) : null;
    const hasConnection = showConnections && nextConnection && nextConnection.strength > 0;

    // Fun processing messages
    const getProcessingMessage = () => {
      const messages = [
        "Brewing insights...",
        "Connecting the dots...",
        "Finding patterns...",
        "Extracting wisdom...",
        "Mapping knowledge...",
        "Discovering entities...",
        "Weaving connections...",
        "Crystallizing ideas...",
        "Parsing brilliance...",
        "Distilling insights..."
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    };

    return (
      <div
        key={article.id}
        className="article-timeline-item"
        onClick={() => onArticleClick(article)}
        style={{ cursor: 'pointer' }}
      >
        <div className="timeline-indicator">
          <div
            className={`timeline-dot ${article.isProcessing ? 'timeline-dot-processing' : hasConnection ? 'timeline-dot-connected' : ''}`}
            onClick={hasConnection && !article.isProcessing ? (e) => {
              e.stopPropagation();
              handleConnectionClick(article, nextArticle, e);
            } : undefined}
            title={article.isProcessing ? 'Processing...' : hasConnection ? `${nextConnection.strength} entities in common - Click to view` : ''}
          >
            {article.isProcessing ? (
              <div className="processing-spinner"></div>
            ) : hasConnection && (
              <span className="timeline-dot-badge">{nextConnection.strength}</span>
            )}
          </div>
          {!isLast && showConnections && (
            <div className={`timeline-line ${hasConnection ? `timeline-line-${nextConnection.category}` : ''}`}></div>
          )}
        </div>
        <div
          className={`article-card ${article.isProcessing ? 'article-card-processing' : ''} ${selectedArticle?.id === article.id ? 'selected' : ''}`}
        >
          <div className="article-title">{article.title}</div>
          {article.isProcessing ? (
            <div className="processing-status">
              <div className="processing-message">
                {article.processingStatus || getProcessingMessage()}
              </div>
              <div className="processing-indicator">
                <div className="pulse-dot"></div>
              </div>
            </div>
          ) : (
            <div className="article-meta">
              <span className="article-date">
                {new Date(article.capturedAt).toLocaleDateString()}
              </span>
              <span className="article-entities">
                {article.entities?.length || 0} entities
              </span>
            </div>
          )}
          {!article.isProcessing && (
            <div className="article-actions">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-link"
              onClick={(e) => e.stopPropagation()}
            >
              Open original →
            </a>
              <button
                className="article-delete"
                onClick={(e) => handleDeleteArticle(article.id, e)}
                title="Delete article"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderRecentView() {
    const sortedArticles = [...articles].sort((a, b) => b.capturedAt - a.capturedAt);
    const processingList = Array.from(processingArticles.values());

    return (
      <div className="articles-timeline">
        {/* Show processing articles first */}
        {processingList.map((article) =>
          renderProcessingArticleCard(article)
        )}

        {/* Then show completed articles */}
        {sortedArticles.map((article, index) =>
          renderArticleCard(
            article,
            sortedArticles[index + 1],
            index === sortedArticles.length - 1,
            false // Don't show connections in Recent view
          )
        )}
      </div>
    );
  }

  function renderConnectedView() {
    const nonStandaloneClusters = clusters.filter(c => !c.isStandalone);
    const standaloneArticles = clusters.find(c => c.isStandalone)?.articles || [];

    return (
      <div className="articles-clusters">
        {nonStandaloneClusters.map(cluster => (
          <div key={cluster.id} className="article-cluster">
            <div
              className="cluster-header"
              onClick={() => toggleCluster(cluster.id)}
            >
              <span className="cluster-toggle">
                {expandedClusters.has(cluster.id) ? '▼' : '▶'}
              </span>
              <span className="cluster-name">
                {generateClusterName(cluster.dominantEntities, cluster.topic)} ({cluster.articles.length})
              </span>
              <span
                className="cluster-strength"
                onClick={(e) => {
                  e.stopPropagation();
                  if (cluster.articles.length >= 2) {
                    handleConnectionClick(cluster.articles[0], cluster.articles[1], e);
                  }
                }}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                title="Click to see shared entities"
              >
                {cluster.totalSharedEntities}+ shared
              </span>
            </div>
            {expandedClusters.has(cluster.id) && (
              <div className="cluster-articles">
                {cluster.articles.map((article, index) =>
                  renderArticleCard(
                    article,
                    cluster.articles[index + 1],
                    index === cluster.articles.length - 1,
                    true // Show connections in Connected view
                  )
                )}
              </div>
            )}
          </div>
        ))}
        {standaloneArticles.length > 0 && nonStandaloneClusters.length > 0 && (
          <div className="cluster-divider"></div>
        )}
        {standaloneArticles.map((article, index) =>
          renderArticleCard(
            article,
            standaloneArticles[index + 1],
            index === standaloneArticles.length - 1,
            false // Standalone articles don't have connections
          )
        )}
      </div>
    );
  }

  return (
    <div className="articles-list-panel">
      <div className="articles-header">
        <h3>Your Artifacts ({articles.length})</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="articles-view-toggle">
        <button
          className={viewMode === 'recent' ? 'active' : ''}
          onClick={() => setViewMode('recent')}
        >
          Recent
        </button>
        <button
          className={viewMode === 'connected' ? 'active' : ''}
          onClick={() => setViewMode('connected')}
        >
          Connected
        </button>
      </div>

      <div className="articles-body">
        {articles.length === 0 ? (
          <p className="no-articles">No articles yet</p>
        ) : (
          <>
            {viewMode === 'recent' ? renderRecentView() : renderConnectedView()}
          </>
        )}
      </div>

      {showingConnectionFor && (
        <div className="connection-modal-overlay" onClick={closeConnectionModal}>
          <div className="connection-modal" onClick={(e) => e.stopPropagation()}>
            <div className="connection-modal-header">
              <h4>Shared Entities</h4>
              <button className="close-btn" onClick={closeConnectionModal}>✕</button>
            </div>
            <div className="connection-modal-body">
              <div className="connection-articles">
                <div className="connection-article-name">
                  {showingConnectionFor.article1.title}
                </div>
                <div className="connection-arrow">↔</div>
                <div className="connection-article-name">
                  {showingConnectionFor.article2.title}
                </div>
              </div>
              <div className="shared-entities-list">
                {showingConnectionFor.sharedEntities.map((entity, idx) => (
                  <div key={idx} className="shared-entity-item">
                    ✓ {typeof entity === 'string' ? entity : entity?.name || 'Unknown entity'}
                  </div>
                ))}
              </div>
            </div>
            <div className="connection-modal-footer">
              <button className="btn-secondary" onClick={closeConnectionModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ArticlesList.propTypes = {
  onClose: PropTypes.func.isRequired,
  onArticleClick: PropTypes.func.isRequired,
  selectedArticle: PropTypes.object,
  onHighlightEntities: PropTypes.func
};

export default ArticlesList;
