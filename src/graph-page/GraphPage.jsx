import React, { useState, useEffect } from 'react';
import KnowledgeGraph from './components/KnowledgeGraph';
import NodeDetails from './components/NodeDetails';
import InsightPanel from './components/InsightPanel';
import SettingsPanel from './components/SettingsPanel';
import ChatQuery from './components/ChatQuery';
import SearchBar from './components/SearchBar';
import ArticlesList from './components/ArticlesList';
import ArticleEntitiesPanel from './components/ArticleEntitiesPanel';
import WelcomeScreen from './components/WelcomeScreen';
import TimelineSlider from './components/TimelineSlider';
import './styles.css';

function GraphPage() {
  const [activeTab, setActiveTab] = useState('graph'); // graph, insights, settings
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [fullGraphData, setFullGraphData] = useState({ nodes: [], links: [] });
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState({ entities: 0, connections: 0, articles: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showArticlesList, setShowArticlesList] = useState(true);
  const [highlightedEntities, setHighlightedEntities] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [timelineFocusedArticle, setTimelineFocusedArticle] = useState(null);

  useEffect(() => {
    loadGraphData();

    // Check URL params for tab
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }

    // Listen for graph updates from service worker
    const messageListener = (message) => {
      if (message.type === 'GRAPH_UPDATED') {
        loadGraphData();
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);

    // Cleanup
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);


  async function loadGraphData() {
    try {
      // Request graph data from service worker (IndexedDB)
      const response = await chrome.runtime.sendMessage({ type: 'GET_GRAPH_DATA' });

      if (response.success && response.data) {
        const fullData = {
          nodes: response.data.nodes || [],
          links: response.data.links || []
        };
        setFullGraphData(fullData);

        // Preserve article selection if exists
        if (selectedArticle) {
          const entityIdsFromArticle = new Set(selectedArticle.entities || []);
          const filteredNodes = fullData.nodes.filter(node =>
            entityIdsFromArticle.has(node.id)
          );
          const filteredLinks = fullData.links.filter(link =>
            entityIdsFromArticle.has(link.source) && entityIdsFromArticle.has(link.target)
          );
          setGraphData({
            nodes: filteredNodes,
            links: filteredLinks
          });
        } else {
          setGraphData(fullData);
        }
      } else {
        setFullGraphData({ nodes: [], links: [] });
        setGraphData({ nodes: [], links: [] });
      }

      // Get articles
      const articlesResponse = await chrome.runtime.sendMessage({ type: 'GET_ALL_ARTICLES' });
      if (articlesResponse.success) {
        setArticles(articlesResponse.articles || []);
      }

      // Get statistics
      const statsResponse = await chrome.runtime.sendMessage({ type: 'GET_STATISTICS' });
      if (statsResponse.success) {
        setStats({
          entities: statsResponse.statistics.totalEntities || 0,
          connections: statsResponse.statistics.totalRelationships || 0,
          articles: statsResponse.statistics.totalArticles || 0
        });

        // Show welcome screen if no artifacts exist
        if (statsResponse.statistics.totalArticles === 0) {
          setShowWelcome(true);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading graph data:', error);
      setGraphData({ nodes: [], links: [] });
      setLoading(false);
    }
  }

  function handleNodeClick(node) {
    setSelectedNode(node);
  }

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function handleArticleClick(article) {
    console.log('[DEBUG] Article clicked:', article?.title);

    // Clear node selection immediately
    setSelectedNode(null);

    // Set selected article
    setSelectedArticle(article);

    // Update other states
    setTimelineFocusedArticle(article);
    setHighlightedEntities(article.entities || []);

    // Show article's entities + their connections to broader knowledge
    if (article) {
      const articleEntityIds = new Set(article.entities || []);

      // Find all entities connected to this article's entities
      const connectedEntityIds = new Set();
      fullGraphData.links.forEach(link => {
        if (articleEntityIds.has(link.source)) {
          connectedEntityIds.add(link.target);
        }
        if (articleEntityIds.has(link.target)) {
          connectedEntityIds.add(link.source);
        }
      });

      // Include article entities + connected entities
      const allRelevantIds = new Set([...articleEntityIds, ...connectedEntityIds]);

      const filteredNodes = fullGraphData.nodes.filter(node =>
        allRelevantIds.has(node.id)
      ).map(node => ({
        ...node,
        isFromSelectedArticle: articleEntityIds.has(node.id)
      }));

      const filteredLinks = fullGraphData.links.filter(link =>
        allRelevantIds.has(link.source) && allRelevantIds.has(link.target)
      );

      setGraphData({
        nodes: filteredNodes,
        links: filteredLinks
      });
    }

    console.log('[DEBUG] Selected article after click:', article?.id);
  }

  function handleEntityClick(entity) {
    setSelectedNode(entity);
  }


  function handleStartFresh() {
    setShowWelcome(false);
    setActiveTab('settings');
  }

  function handleTimelineArticleSelect(article) {
    setTimelineFocusedArticle(article);
    setSelectedArticle(article);
    setSelectedNode(null);

    if (!article) {
      setGraphData(fullGraphData);
      setHighlightedEntities([]);
      return;
    }

    const entityIdsFromArticle = new Set(article.entities || []);
    setHighlightedEntities(article.entities || []);

    const filteredNodes = fullGraphData.nodes.filter(node =>
      entityIdsFromArticle.has(node.id)
    );

    const filteredLinks = fullGraphData.links.filter(link =>
      entityIdsFromArticle.has(link.source) && entityIdsFromArticle.has(link.target)
    );

    setGraphData({
      nodes: filteredNodes,
      links: filteredLinks
    });
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading your knowledge graph...</p>
      </div>
    );
  }

  // Show welcome screen on first run
  if (showWelcome && stats.articles === 0) {
    return <WelcomeScreen onStartFresh={handleStartFresh} />;
  }

  if (graphData.nodes.length === 0 && activeTab === 'graph') {
    return (
      <div className="graph-page">
        <header className="header">
          <div className="header-left">
            <div className="logo-container">
              <h1 className="logo">Glyph</h1>
              <p className="tagline">Ambient Intelligence. 100% Private.</p>
            </div>
          </div>
          <div className="header-right">
            <nav className="tabs">
              <button className="active">Knowledge</button>
              <button onClick={() => setActiveTab('insights')}>Insights</button>
              <button onClick={() => setActiveTab('settings')}>Settings</button>
            </nav>
          </div>
        </header>
        <div className="empty-state">
          <div className="empty-content">
            <h1>Your Knowledge Graph is Empty</h1>
            <p>Start capturing insights to build your personal knowledge graph</p>
            <div className="empty-actions">
              <button
                className="empty-btn"
                onClick={() => setActiveTab('settings')}
              >
                Configure Settings
              </button>
            </div>
            <p style={{ marginTop: '30px', fontSize: '16px', opacity: 0.8 }}>
              Browse to any artifact and click the Glyph icon to capture insights
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="graph-page">
      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <h1 className="logo">Glyph</h1>
            <p className="tagline">Your Chrome-powered AI. 100% Local & Private</p>
          </div>
          {activeTab === 'graph' && (
            <div className="stats-mini">
              <span>{stats.entities} entities</span>
              <span>{stats.connections} connections</span>
              <span>{stats.articles} artifacts</span>
            </div>
          )}
        </div>

        {activeTab === 'graph' && (
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search entities..."
          />
        )}

        <div className="header-right">
          {activeTab === 'graph' && (
            <button
              className="articles-button"
              onClick={() => setShowArticlesList(true)}
              title="View all artifacts"
            >
              📄 Artifacts ({stats.articles})
            </button>
          )}
          <nav className="tabs">
            <button
              className={activeTab === 'graph' ? 'active' : ''}
              onClick={() => setActiveTab('graph')}
            >
              Knowledge
            </button>
            <button
              className={activeTab === 'insights' ? 'active' : ''}
              onClick={() => setActiveTab('insights')}
            >
              Insights
            </button>
            <button
              className={activeTab === 'settings' ? 'active' : ''}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </nav>
        </div>
      </header>

      <div className="main-content">
        {activeTab === 'graph' && (
          <>
            {showArticlesList && (
              <aside className="sidebar-left">
                <ArticlesList
                  onClose={() => {
                    setShowArticlesList(false);
                    setHighlightedEntities([]);
                    setSelectedArticle(null);
                    setTimelineFocusedArticle(null);
                    setGraphData(fullGraphData); // Reset to full graph
                  }}
                  onArticleClick={handleArticleClick}
                  selectedArticle={selectedArticle}
                  onHighlightEntities={setHighlightedEntities}
                />
              </aside>
            )}

            <div className="graph-container with-timeline">
              <KnowledgeGraph
                data={graphData}
                onNodeClick={handleNodeClick}
                searchQuery={searchQuery}
                highlightedEntities={highlightedEntities}
              />

              <TimelineSlider
                articles={articles}
                focusedArticle={timelineFocusedArticle}
                onArticleSelect={handleTimelineArticleSelect}
              />
            </div>

            {(selectedArticle || selectedNode) && (
              <aside className="sidebar-right" key={selectedArticle?.id || selectedNode?.id || 'empty'}>
                {selectedArticle ? (
                  <ArticleEntitiesPanel
                    key={`article-${selectedArticle.id}`}
                    article={selectedArticle}
                    graphData={fullGraphData}
                    onEntityClick={handleEntityClick}
                    onClose={() => {
                      setSelectedArticle(null);
                      setTimelineFocusedArticle(null);
                      setGraphData(fullGraphData);
                    }}
                  />
                ) : selectedNode ? (
                  <NodeDetails
                    key={`node-${selectedNode.id}`}
                    node={selectedNode}
                    onClose={() => {
                      setSelectedNode(null);
                    }}
                  />
                ) : null}
              </aside>
            )}

            <div className="chat-container">
              <ChatQuery
                selectedEntity={selectedNode}
                graphData={fullGraphData}
              />
            </div>
          </>
        )}

        {activeTab === 'insights' && (
          <div className="insights-container">
            <InsightPanel
              graphData={fullGraphData}
              stats={stats}
              onEntityClick={(entity) => {
                setActiveTab('graph');
                setSelectedNode(entity);
              }}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-container">
            <SettingsPanel />
          </div>
        )}
      </div>

    </div>
  );
}

export default GraphPage;
