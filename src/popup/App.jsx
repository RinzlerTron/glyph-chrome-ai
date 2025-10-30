import React, { useState, useEffect } from 'react';
import KnowledgeGraph from './components/KnowledgeGraph';
import InsightPanel from './components/InsightPanel';
import ArticlesPanel from './components/ArticlesPanel';
import SettingsPanel from './components/SettingsPanel';
import StatusIndicator from './components/StatusIndicator';
import CaptureButton from './components/CaptureButton';
import NodeDetails from './components/NodeDetails';
import { getGraphEngine } from '../graph/graph-engine.js';

function App() {
  const [view, setView] = useState('articles');
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('Ready');
  const [statistics, setStatistics] = useState(null);
  const [graphEngine, setGraphEngine] = useState(null);

  useEffect(() => {
    loadGraphData();
    loadStatistics();

    // Listen for updates from background script
    const messageListener = (message) => {
      if (message.type === 'GRAPH_UPDATED') {
        loadGraphData();
        loadStatistics();
      } else if (message.type === 'PROCESSING_STATUS') {
        setStatus(message.status);
        setIsProcessing(message.processing);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const loadGraphData = async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GET_GRAPH_DATA'
      });

      if (response.success) {
        setGraphData(response.data);

        // Load graph engine instance
        const engine = await getGraphEngine();
        setGraphEngine(engine);
      }
    } catch (error) {
      console.error('Failed to load graph data:', error);
      setStatus('Failed to load graph data');
    }
  };

  const loadStatistics = async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GET_STATISTICS'
      });

      if (response.success) {
        setStatistics(response.statistics);
      }
    } catch (error) {
      console.error('Failed to load statistics:', error);
    }
  };

  const handleCapture = async () => {
    setIsProcessing(true);
    setStatus('Capturing article...');

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // Send to background service worker instead of content script
      await chrome.runtime.sendMessage({
        type: 'CAPTURE_CURRENT_TAB',
        tab: tab
      });
    } catch (error) {
      console.error('Capture failed:', error);
      setStatus(`Capture failed: ${error.message}`);
      setIsProcessing(false);
    }
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Glyph</h1>
          <StatusIndicator status={status} isProcessing={isProcessing} />
        </div>
        {statistics && (
          <div className="stats-bar">
            <span>{statistics.totalEntities} entities</span>
            <span>{statistics.totalRelationships} connections</span>
            <span>{statistics.totalArticles} artifacts</span>
          </div>
        )}
      </header>

      <nav className="app-nav">
        <button
          className={`nav-button ${view === 'articles' ? 'active' : ''}`}
          onClick={() => setView('articles')}
        >
          Artifacts
        </button>
        <button
          className={`nav-button ${view === 'graph' ? 'active' : ''}`}
          onClick={() => setView('graph')}
        >
          Graph
        </button>
        <button
          className={`nav-button ${view === 'insights' ? 'active' : ''}`}
          onClick={() => setView('insights')}
        >
          Insights
        </button>
        <button
          className={`nav-button ${view === 'settings' ? 'active' : ''}`}
          onClick={() => setView('settings')}
        >
          Settings
        </button>
      </nav>

      <main className="app-main">
        {view === 'articles' && (
          <ArticlesPanel selectedNode={selectedNode} />
        )}

        {view === 'graph' && (
          <div className="graph-view">
            <div className="graph-container">
              <KnowledgeGraph
                data={graphData}
                selectedNode={selectedNode}
                onNodeClick={handleNodeClick}
              />
            </div>
            {selectedNode && (
              <div className="details-panel">
                <NodeDetails
                  node={selectedNode}
                  graphEngine={graphEngine}
                  onClose={() => setSelectedNode(null)}
                  onNodeNavigate={(node) => setSelectedNode(node)}
                />
              </div>
            )}
          </div>
        )}

        {view === 'insights' && (
          <InsightPanel graphData={graphData} />
        )}

        {view === 'settings' && (
          <SettingsPanel />
        )}
      </main>

      <footer className="app-footer">
        <CaptureButton
          onClick={handleCapture}
          disabled={isProcessing}
        />
      </footer>
    </div>
  );
}

export default App;
