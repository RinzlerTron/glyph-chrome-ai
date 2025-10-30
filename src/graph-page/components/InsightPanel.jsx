import React, { useState, useEffect } from 'react';

function InsightPanel({ graphData, onEntityClick }) {
  const [discovering, setDiscovering] = useState(false);
  const [synthesizing, setSynthesizing] = useState(false);
  const [syntheses, setSyntheses] = useState([]);
  const [selectedSynthesis, setSelectedSynthesis] = useState(null);

  useEffect(() => {
    loadSyntheses();

    const messageListener = (message) => {
      if (message.type === 'SYNTHESIS_COMPLETE') {
        loadSyntheses();
        setSynthesizing(false);

        // Show brief success notification
        const notification = document.createElement('div');
        notification.textContent = '✨ Weekly synthesis complete!';
        notification.style.cssText = `
          position: fixed;
          top: 80px;
          right: 20px;
          padding: 15px 20px;
          background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%);
          color: white;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          z-index: 10000;
          animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.style.animation = 'slideOut 0.3s ease-out';
          setTimeout(() => notification.remove(), 300);
        }, 3000);
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  async function loadSyntheses() {
    try {
      const result = await chrome.runtime.sendMessage({
        type: 'GET_ALL_SYNTHESES'
      });

      if (result.success) {
        setSyntheses(result.syntheses || []);
        if (result.syntheses.length > 0 && !selectedSynthesis) {
          setSelectedSynthesis(result.syntheses[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load syntheses:', error);
    }
  }

  async function handleSynthesizeWeek() {
    if (synthesizing) return;

    setSynthesizing(true);
    try {
      const result = await chrome.runtime.sendMessage({
        type: 'SYNTHESIZE_WEEK'
      });

      if (!result.success) {
        alert('Synthesis failed: ' + (result.error || 'Unknown error'));
        setSynthesizing(false);
      }
      // On success, keep synthesizing=true until SYNTHESIS_COMPLETE message arrives
    } catch (error) {
      console.error('Synthesis failed:', error);
      alert('Synthesis failed. Writer API may not be available.');
      setSynthesizing(false);
    }
  }

  async function handleManualDiscovery() {
    if (discovering) return;

    setDiscovering(true);
    try {
      const result = await chrome.runtime.sendMessage({
        type: 'DISCOVER_RELATIONSHIPS'
      });

      if (result.success && result.relationshipsFound > 0) {
        alert(`Found ${result.relationshipsFound} new relationships!`);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        alert('No new relationships found.');
      }
    } catch (error) {
      console.error('Manual discovery failed:', error);
      alert('Discovery failed. Please try again.');
    } finally {
      setDiscovering(false);
    }
  }

  if (!graphData || graphData.nodes.length === 0) {
    return (
      <div className="insight-panel">
        <div className="panel-placeholder">
          <h3>No insights yet</h3>
          <p>Capture articles to see insights about your reading patterns</p>
        </div>
      </div>
    );
  }

  const entityTypes = graphData.nodes.reduce((acc, node) => {
    acc[node.type] = (acc[node.type] || 0) + 1;
    return acc;
  }, {});

  const totalEntities = graphData.nodes.length;
  const entityTypeBreakdown = Object.entries(entityTypes)
    .map(([type, count]) => ({
      type,
      count,
      percentage: ((count / totalEntities) * 100).toFixed(1)
    }))
    .sort((a, b) => b.count - a.count);

  // Calculate actual degrees from links
  const entityDegrees = new Map();
  graphData.links.forEach(link => {
    entityDegrees.set(link.source, (entityDegrees.get(link.source) || 0) + 1);
    entityDegrees.set(link.target, (entityDegrees.get(link.target) || 0) + 1);
  });

  const topEntities = [...graphData.nodes]
    .map(node => ({
      ...node,
      actualDegree: entityDegrees.get(node.id) || 0
    }))
    .filter(e => e.actualDegree > 0)
    .sort((a, b) => b.actualDegree - a.actualDegree)
    .slice(0, 5);

  const avgConnections = graphData.nodes.length > 0
    ? (graphData.links.length * 2 / graphData.nodes.length).toFixed(1)
    : 0;

  return (
    <div className="insight-panel">
      <h2>Insights</h2>
      <div className="insights-list">
        <div className="insight-card">
          <h3>Knowledge Overview</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{graphData.nodes.length}</div>
              <div className="stat-label">Total Entities</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{graphData.links.length}</div>
              <div className="stat-label">Connections</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{avgConnections}</div>
              <div className="stat-label">Avg Connections/Entity</div>
            </div>
          </div>
        </div>

        <div className="insight-card">
          <h3>Entity Distribution</h3>
          <p style={{ fontSize: '13px', color: '#888', marginBottom: '15px' }}>
            Breakdown of your knowledge graph by entity type
          </p>
          <div className="entity-types">
            {entityTypeBreakdown.map(({ type, count, percentage }) => (
              <div key={type} className="type-row">
                <div className="type-info">
                  <span className="type-name">{type}</span>
                  <span className="type-count">{count} ({percentage}%)</span>
                </div>
                <div className="type-bar">
                  <div
                    className="type-bar-fill"
                    style={{
                      width: `${percentage}%`,
                      background: type === 'person' ? '#60a5fa' :
                                  type === 'company' ? '#a78bfa' :
                                  type === 'technology' ? '#34d399' : '#fbbf24'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="insight-card">
          <h3>Most Connected Entities</h3>
          {topEntities.length > 0 ? (
            <div className="top-entities">
              {topEntities.map(entity => (
                <div
                  key={entity.id}
                  className="entity-row clickable-entity"
                  onClick={() => onEntityClick && onEntityClick(entity)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="entity-name">{entity.name}</span>
                  <span className="entity-connections">{entity.actualDegree} connections</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#888', fontSize: '14px' }}>No connections yet. Capture more articles to discover relationships!</p>
          )}
        </div>

        <div className="insight-card">
          <h3>Weekly Learning Synthesis</h3>
          <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', marginBottom: '12px' }}>
            Generate an AI narrative summary of your learning journey this week
          </p>

          <button
            onClick={handleSynthesizeWeek}
            disabled={synthesizing || graphData.nodes.length < 5}
            style={{
              padding: '12px 24px',
              background: synthesizing ? '#888' : 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: synthesizing || graphData.nodes.length < 5 ? 'not-allowed' : 'pointer',
              width: '100%',
              marginBottom: syntheses.length > 0 ? '16px' : '0'
            }}
          >
            {synthesizing ? 'Synthesizing (background)...' : '✨ Synthesize My Week'}
          </button>

          {syntheses.length > 0 && (
            <>
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '16px',
                marginBottom: '12px',
                flexWrap: 'wrap'
              }}>
                {syntheses.map((syn, idx) => {
                  const date = new Date(syn.createdAt);
                  const weekStart = new Date(syn.weekStart);
                  const label = idx === 0 ? 'Latest' : weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                  return (
                    <button
                      key={syn.id}
                      onClick={() => setSelectedSynthesis(syn)}
                      style={{
                        padding: '8px 12px',
                        background: selectedSynthesis?.id === syn.id ? 'rgba(167, 139, 250, 0.3)' : 'rgba(167, 139, 250, 0.1)',
                        border: `1px solid ${selectedSynthesis?.id === syn.id ? 'rgba(167, 139, 250, 0.5)' : 'rgba(167, 139, 250, 0.2)'}`,
                        borderRadius: '6px',
                        color: '#a78bfa',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {selectedSynthesis && (
                <div style={{
                  padding: '16px',
                  background: 'rgba(167, 139, 250, 0.1)',
                  border: '1px solid rgba(167, 139, 250, 0.3)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#e0e0e0',
                  lineHeight: '1.6',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px', color: '#a78bfa' }}>
                    📚 Week of {new Date(selectedSynthesis.weekStart).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>
                    {selectedSynthesis.articlesAnalyzed} articles analyzed
                  </div>
                  {selectedSynthesis.synthesis}
                </div>
              )}
            </>
          )}
        </div>

        <div className="insight-card">
          <h3>Relationship Discovery</h3>
          <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', marginBottom: '12px' }}>
            Glyph automatically discovers connections between entities using AI every 3 articles.
            You can also discover relationships manually anytime.
          </p>

          <button
            onClick={handleManualDiscovery}
            disabled={discovering || graphData.nodes.length < 2}
            style={{
              padding: '12px 24px',
              background: discovering ? '#888' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: discovering || graphData.nodes.length < 2 ? 'not-allowed' : 'pointer',
              width: '100%'
            }}
          >
            {discovering ? 'Discovering...' : 'Discover Relationships Now'}
          </button>

          <div style={{
            marginTop: '12px',
            padding: '10px',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#a5b4fc'
          }}>
            ✓ Auto-discovery enabled (every 3 articles)
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightPanel;
