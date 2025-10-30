import React, { useState, useEffect } from 'react';

function ArticlesPanel({ selectedNode }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles();

    // Listen for updates when new articles are added
    const messageListener = (message) => {
      if (message.type === 'GRAPH_UPDATED' ||
          message.type === 'ARTICLE_PROCESSING' ||
          message.type === 'ARTICLE_UPDATED') {
        loadArticles();
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const loadArticles = async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GET_ALL_ARTICLES'
      });

      if (response.success) {
        // Sort by captured date, newest first
        const sortedArticles = response.articles.sort((a, b) => b.capturedAt - a.capturedAt);
        setArticles(sortedArticles);
      } else {
        setError('Failed to load artifacts');
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
        setError('Failed to load artifacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    if (!confirm('Delete this article? This will also remove any orphaned entities.')) {
      return;
    }

    try {
      await chrome.runtime.sendMessage({
        type: 'DELETE_ARTICLE',
        articleId: articleId
      });
      // Articles will reload automatically via message listener
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;

    return date.toLocaleDateString();
  };

  const getProcessingMessage = (status) => {
    const messages = [
      "Brewing insights...",
      "Connecting the dots...",
      "Finding patterns...",
      "Extracting wisdom...",
      "Mapping knowledge...",
      "Discovering entities...",
      "Weaving connections...",
      "Crystallizing ideas..."
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  };

  const articleContainsSelectedEntity = (article) => {
    if (!selectedNode || !article.entities) return false;
    return article.entities.includes(selectedNode.id);
  };

  if (loading) {
    return (
      <div className="articles-panel">
        <div className="panel-placeholder">
          <div className="loading-spinner"></div>
          <p>Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-panel">
        <div className="panel-placeholder">
          <p className="error-text">{error}</p>
          <button onClick={loadArticles} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="articles-panel">
        <div className="panel-placeholder">
          <h3>No articles yet</h3>
          <p>Visit any webpage and click "Capture Insights" to get started</p>
        </div>
      </div>
    );
  }

  const highlightedCount = selectedNode ?
    articles.filter(article => articleContainsSelectedEntity(article)).length : 0;

  return (
    <div className="articles-panel">
      <div className="articles-header">
        <h2>
          Artifacts ({articles.length})
          {selectedNode && highlightedCount > 0 && (
            <span className="entity-filter-indicator">
              · {highlightedCount} contain "{selectedNode.name}"
            </span>
          )}
        </h2>
        <button
          onClick={loadArticles}
          className="refresh-button"
          title="Refresh artifacts"
        >
          ↻
        </button>
      </div>

      <div className="articles-list">
        {articles.map((article) => {
          const containsSelected = articleContainsSelectedEntity(article);
          return (
            <div
              key={article.id}
              className={`article-card ${article.isProcessing ? 'processing' : ''} ${containsSelected ? 'contains-selected-entity' : ''}`}
            >
            <div className="article-header">
              <h3 className="article-title">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={article.isProcessing ? 'processing-link' : ''}
                >
                  {article.title}
                </a>
                {containsSelected && (
                  <span className="selected-entity-badge" title={`Contains "${selectedNode.name}"`}>
                    <span className="entity-icon">●</span>
                    {selectedNode.name}
                  </span>
                )}
              </h3>
              <div className="article-meta">
                <span className="article-date">{formatDate(article.capturedAt)}</span>
                {!article.isProcessing && (
                  <button
                    onClick={() => handleDeleteArticle(article.id)}
                    className="delete-button"
                    title="Delete article"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {article.isProcessing ? (
              <div className="processing-status">
                <div className="processing-indicator">
                  <div className="pulse-dot"></div>
                  <span className="processing-text">
                    {getProcessingMessage()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="article-info">
                <div className="article-stats">
                  <span className="entity-count">
                    {article.entities ? article.entities.length : 0} entities
                  </span>
                  <span className="word-count">
                    {Math.round((article.text || '').split(' ').length / 100) * 100} words
                  </span>
                </div>
                {article.summary && (
                  <p className="article-summary">{article.summary}</p>
                )}
              </div>
            )}

            <div className="article-url">
              {new URL(article.url).hostname}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArticlesPanel;