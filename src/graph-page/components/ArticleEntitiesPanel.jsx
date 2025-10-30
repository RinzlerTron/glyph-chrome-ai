import React from 'react';
import PropTypes from 'prop-types';

function ArticleEntitiesPanel({ article, graphData, onEntityClick, onClose }) {
  if (!article) return null;

  // Get entity details from graph data
  const articleEntities = graphData.nodes.filter(node =>
    article.entities && article.entities.includes(node.id)
  );

  // Group by type
  const entitiesByType = {
    person: articleEntities.filter(e => e.type === 'person'),
    company: articleEntities.filter(e => e.type === 'company'),
    technology: articleEntities.filter(e => e.type === 'technology'),
    concept: articleEntities.filter(e => e.type === 'concept')
  };

  const typeLabels = {
    person: 'People',
    company: 'Companies',
    technology: 'Technologies',
    concept: 'Concepts'
  };

  const typeColors = {
    person: '#60a5fa',
    company: '#a78bfa',
    technology: '#34d399',
    concept: '#fbbf24'
  };

  return (
    <aside className="article-entities-panel">
      <div className="article-entities-header">
        <h3>Article Entities</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="article-entities-title">
        {article.title}
      </div>

      <div className="article-entities-count">
        {articleEntities.length} entities found
      </div>

      <div className="article-entities-body">
        {Object.entries(entitiesByType).map(([type, entities]) => {
          if (entities.length === 0) return null;

          return (
            <div key={type} className="entity-type-group">
              <div className="entity-type-header">
                <span
                  className="entity-type-dot"
                  style={{ backgroundColor: typeColors[type] }}
                ></span>
                <span className="entity-type-label">
                  {typeLabels[type]} ({entities.length})
                </span>
              </div>
              <div className="entity-type-list">
                {entities.map(entity => (
                  <div
                    key={entity.id}
                    className="entity-list-item-clickable"
                    onClick={() => onEntityClick(entity)}
                    title={`Click to view ${entity.name} in graph`}
                  >
                    <span className="entity-name">{entity.name}</span>
                    {entity.degree > 0 && (
                      <span className="entity-connections">
                        {entity.degree} connection{entity.degree !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

ArticleEntitiesPanel.propTypes = {
  article: PropTypes.object,
  graphData: PropTypes.object.isRequired,
  onEntityClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ArticleEntitiesPanel;
