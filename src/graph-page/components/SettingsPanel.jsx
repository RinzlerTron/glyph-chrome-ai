import React, { useState, useEffect } from 'react';

function SettingsPanel() {
  const [settings, setSettings] = useState(null);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'GET_SETTINGS'
      });

      if (response.success) {
        setSettings(response.settings);
        setTopics(response.settings.topics || []);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const handleToggleAutoSave = (enabled) => {
    setSettings({ ...settings, autoCapture: enabled });
  };

  const handleSave = async () => {
    try {
      const newSettings = {
        ...settings,
        topics: topics
      };

      const response = await chrome.runtime.sendMessage({
        type: 'UPDATE_SETTINGS',
        data: newSettings
      });

      if (response.success) {
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    }
  };

  const handleLoadMockData = async () => {
    if (!confirm('This will replace all existing data with mock data. Continue?')) {
      return;
    }

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'LOAD_MOCK_DATA',
        entityCount: 50
      });

      if (response.success) {
        alert(`Mock data loaded: ${response.stats.entitiesAdded} entities, ${response.stats.relationshipsAdded} relationships`);
      }
    } catch (error) {
      console.error('Failed to load mock data:', error);
      alert('Failed to load mock data');
    }
  };

  const handleClearAllData = async () => {
    if (!confirm('This will permanently delete ALL your knowledge graph data, including articles, entities, and relationships. This cannot be undone. Are you sure?')) {
      return;
    }

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'CLEAR_ALL_DATA'
      });

      if (response.success) {
        alert('All data has been cleared successfully.');
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to clear data:', error);
      alert('Failed to clear data');
    }
  };

  if (!settings) {
    return <div className="settings-panel">Loading...</div>;
  }

  return (
    <div className="settings-panel">
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Topics of Interest</h3>
        <p className="section-description">
          Configure 5 topics to help Glyph focus on what matters to you
        </p>

        <div className="topics-horizontal">
          {topics.map((topic, index) => (
            <input
              key={index}
              type="text"
              className="topic-input-horizontal"
              value={topic}
              onChange={(e) => handleTopicChange(index, e.target.value)}
              placeholder={`Topic ${index + 1}`}
            />
          ))}
        </div>

        <button className="save-button" onClick={handleSave}>
          Save Settings
        </button>
      </div>

      <div className="settings-section">
        <h3>Options</h3>

        <div className="settings-row">
          <div className="setting-item">
            <label className="setting-label">Auto-Save</label>
            <p className="setting-description">Automatically capture articles while browsing</p>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.autoCapture || false}
                onChange={(e) => handleToggleAutoSave(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <label className="setting-label">Relationship Discovery</label>
            <p className="setting-description">How AI finds entity connections</p>
            <select
              className="setting-select"
              value={settings.topicOnlyRelationships ? 'topics' : 'all'}
              onChange={(e) => setSettings({ ...settings, topicOnlyRelationships: e.target.value === 'topics' })}
            >
              <option value="all">All Entities</option>
              <option value="topics">Topics Only</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <button className="danger-button" onClick={handleClearAllData}>
          Clear All Data
        </button>
        <span style={{ marginLeft: '15px', fontSize: '13px', color: '#9ca3af' }}>
          100% private - All data stored locally
        </span>
      </div>
    </div>
  );
}

export default SettingsPanel;
