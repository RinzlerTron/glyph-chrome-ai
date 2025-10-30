import React from 'react';

function StatusIndicator({ status, isProcessing }) {
  return (
    <div className="status-indicator">
      {isProcessing && (
        <div className="spinner"></div>
      )}
      <span className="status-text">{status}</span>
    </div>
  );
}

export default StatusIndicator;
