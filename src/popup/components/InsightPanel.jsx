import React from 'react';

function InsightPanel({ graphData }) {
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

  return (
    <div className="insight-panel">
      <h2>Insights</h2>
      <div className="insights-list">
        <div className="insight-card">
          <h3>Knowledge Summary</h3>
          <p>You have {graphData.nodes.length} entities in your graph</p>
          <p>{graphData.links.length} connections discovered</p>
        </div>

        <div className="insight-card">
          <h3>Coming Soon</h3>
          <p>Insights about your knowledge patterns</p>
          <ul>
            <li>Topic trends over time</li>
            <li>Unexpected connections</li>
            <li>Knowledge gaps</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InsightPanel;
