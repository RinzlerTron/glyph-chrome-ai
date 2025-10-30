import React, { useState, useEffect } from 'react';

function NodeDetails({ node, graphEngine, onClose, onNodeNavigate }) {
  const [sourceArticles, setSourceArticles] = useState([]);
  const [relationships, setRelationships] = useState([]);

  useEffect(() => {
    if (node) {
      loadArticlesSources();
      loadRelationships();
    }
  }, [node]);

  async function loadArticlesSources() {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GET_ALL_ARTICLES'
      });

      if (response.success) {
        const articles = response.articles.filter(article =>
          article.entities && article.entities.includes(node.id)
        );
        setSourceArticles(articles);
      }
    } catch (error) {
      console.error('Failed to load article sources:', error);
    }
  }

  async function loadRelationships() {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GET_GRAPH_DATA'
      });

      if (response.success && response.data) {
        const nodeRelationships = response.data.links
          .filter(link => link.source === node.id || link.target === node.id)
          .map(link => {
            const otherEntityId = link.source === node.id ? link.target : link.source;
            const otherEntity = response.data.nodes.find(n => n.id === otherEntityId);
            return {
              ...link,
              otherEntity: otherEntity || { name: 'Unknown', id: otherEntityId }
            };
          });
        setRelationships(nodeRelationships);
      }
    } catch (error) {
      console.error('Failed to load relationships:', error);
    }
  }

  if (!node) {
    return (
      <div className="node-details empty">
        <div className="empty-state">
          <p>Click a node to see details</p>
        </div>
      </div>
    );
  }

  const neighbors = graphEngine ? graphEngine.getNeighbors(node.id) : [];
  const neighborEntities = neighbors
    .map(id => {
      const neighborData = graphEngine.cache.entities.get(id);
      return neighborData ? {
        ...neighborData,
        degree: graphEngine.getDegree(id)
      } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.degree - a.degree);

  const typeLabel = node.type.charAt(0).toUpperCase() + node.type.slice(1);
  const relevancePercentage = Math.round((node.relevance || 0) * 100);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleNeighborClick = (neighbor) => {
    if (onNodeNavigate) {
      onNodeNavigate(neighbor);
    }
  };

  return (
    <div className="node-details">
      <div className="node-details-header">
        <div className="node-title">
          <h3>{node.name}</h3>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close details"
          >
            ×
          </button>
        </div>

        <div className="node-meta">
          <span className={`badge badge-${node.type}`}>{typeLabel}</span>
          {node.topic && (
            <span className="badge badge-topic">{node.topic}</span>
          )}
        </div>
      </div>

      <div className="node-details-content">
        {node.context && (
          <div className="detail-section">
            <h4>Context</h4>
            <p className="node-context">{node.context}</p>
          </div>
        )}

        <div className="detail-section">
          <h4>Properties</h4>
          <div className="property-grid">
            <div className="property">
              <span className="property-label">Type</span>
              <span className="property-value">{typeLabel}</span>
            </div>
            <div className="property">
              <span className="property-label">Topic</span>
              <span className="property-value">{node.topic || 'None'}</span>
            </div>
            <div className="property">
              <span className="property-label">Relevance</span>
              <span className="property-value">{relevancePercentage}%</span>
            </div>
            <div className="property">
              <span className="property-label">Connections</span>
              <span className="property-value">{node.degree || 0}</span>
            </div>
            <div className="property">
              <span className="property-label">Added</span>
              <span className="property-value">{formatDate(node.timestamp)}</span>
            </div>
          </div>
        </div>

        {sourceArticles.length > 0 && (
          <div className="detail-section">
            <h4>Found in Articles ({sourceArticles.length})</h4>
            <div className="source-articles-list">
              {sourceArticles.slice(0, 5).map(article => (
                <div key={article.id} className="source-article-item">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-article-link"
                  >
                    {article.title}
                  </a>
                  <span className="source-article-date">
                    {new Date(article.capturedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
              {sourceArticles.length > 5 && (
                <div className="source-articles-more">
                  +{sourceArticles.length - 5} more articles
                </div>
              )}
            </div>
          </div>
        )}

        {relationships.length > 0 && (
          <div className="detail-section">
            <h4>Relationships ({relationships.length})</h4>
            <div className="relationships-list">
              {relationships.slice(0, 8).map((rel, idx) => (
                <div key={idx} className="relationship-item">
                  <div className="relationship-info">
                    <span className="relationship-type">{rel.type || 'related_to'}</span>
                    <span className="relationship-entity">{rel.otherEntity.name}</span>
                  </div>
                  <span className="relationship-strength">
                    {Math.round((rel.strength || 0) * 100)}%
                  </span>
                </div>
              ))}
              {relationships.length > 8 && (
                <div className="relationships-more">
                  +{relationships.length - 8} more relationships
                </div>
              )}
            </div>
          </div>
        )}

        {neighborEntities.length > 0 && (
          <div className="detail-section">
            <h4>Connected Entities ({neighborEntities.length})</h4>
            <div className="neighbors-list">
              {neighborEntities.slice(0, 10).map(neighbor => (
                <div
                  key={neighbor.id}
                  className="neighbor-item"
                  onClick={() => handleNeighborClick(neighbor)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleNeighborClick(neighbor);
                  }}
                >
                  <div className="neighbor-info">
                    <span className="neighbor-name">{neighbor.name}</span>
                    <span className={`neighbor-type type-${neighbor.type}`}>
                      {neighbor.type}
                    </span>
                  </div>
                  <div className="neighbor-meta">
                    <span className="neighbor-degree">{neighbor.degree} connections</span>
                  </div>
                </div>
              ))}
              {neighborEntities.length > 10 && (
                <div className="neighbors-more">
                  +{neighborEntities.length - 10} more connections
                </div>
              )}
            </div>
          </div>
        )}

        {(!neighborEntities || neighborEntities.length === 0) && (
          <div className="detail-section">
            <h4>Connected Entities</h4>
            <div className="empty-state-small">
              <p>No connections yet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NodeDetails;
