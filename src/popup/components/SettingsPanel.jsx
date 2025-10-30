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

        <div className="topics-list">
          {topics.map((topic, index) => (
            <div key={index} className="topic-input-group">
              <label>Topic {index + 1}</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => handleTopicChange(index, e.target.value)}
                placeholder={`Enter topic ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button className="save-button" onClick={handleSave}>
          Save Settings
        </button>
      </div>

      <div className="settings-section">
        <h3>Privacy</h3>
        <p className="section-description">
          All data is stored locally on your device. Nothing is sent to external servers.
        </p>
      </div>

      <div className="settings-section dev-section">
        <h3>Development</h3>
        <p className="section-description">
          Load mock data for testing and development
        </p>
        <button className="mock-data-button" onClick={handleLoadMockData}>
          Load Mock Data (50 entities)
        </button>
      </div>
    </div>
  );
}

export default SettingsPanel;
