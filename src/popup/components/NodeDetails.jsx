import React from 'react';

function NodeDetails({ node, graphEngine, onClose, onNodeNavigate }) {
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

  const handleGoogleSearch = () => {
    const searchQuery = encodeURIComponent(node.name);
    const googleUrl = `https://www.google.com/search?q=${searchQuery}`;
    chrome.tabs.create({ url: googleUrl });
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

        {/* Online Search Section */}
        <div className="detail-section">
          <h4>Search Online</h4>
          <div className="online-search-section">
            <div className="online-disclaimer">
              <div className="online-indicator">
                <span className="online-dot"></span>
                <span className="online-text">External search (requires internet)</span>
              </div>
            </div>
            <button
              onClick={handleGoogleSearch}
              className="google-search-button"
              title={`Search "${node.name}" on Google`}
            >
              <span className="search-icon">🔍</span>
              <span>Search "{node.name}" on Google</span>
              <span className="external-icon">↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NodeDetails;
