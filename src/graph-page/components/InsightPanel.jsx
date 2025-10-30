import React, { useState, useEffect } from 'react';

function InsightPanel({ graphData, onEntityClick }) {
  const [discovering, setDiscovering] = useState(false);
  const [synthesizing, setSynthesizing] = useState(false);
  const [syntheses, setSyntheses] = useState([]);
  const [selectedSynthesis, setSelectedSynthesis] = useState(null);

  // Weekly timeline states
  const [showWeekPicker, setShowWeekPicker] = useState(false);
  const [selectedWeekDate, setSelectedWeekDate] = useState(new Date());
  const [weeklySyntheses, setWeeklySyntheses] = useState(new Map());

  useEffect(() => {
    loadSyntheses();

    const messageListener = (message) => {
      if (message.type === 'SYNTHESIS_COMPLETE') {
        console.log('Synthesis complete message received, reloading syntheses...');

        // Clear any cached synthesis state first
        setWeeklySyntheses(new Map());

        // Reload syntheses from service worker
        loadSyntheses();
        setSynthesizing(false);

        // Ensure we're viewing the current week to see the results
        setSelectedWeekDate(new Date());

        console.log('Switched to current week view to show new synthesis');

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

    // Click outside to close week picker
    const handleClickOutside = (event) => {
      if (showWeekPicker && !event.target.closest('.week-picker-container')) {
        setShowWeekPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWeekPicker]);

  async function loadSyntheses() {
    try {
      const result = await chrome.runtime.sendMessage({
        type: 'GET_ALL_SYNTHESES'
      });

      if (result.success) {
        console.log('Raw syntheses from service worker:', result.syntheses);
        setSyntheses(result.syntheses || []);
        if (result.syntheses.length > 0 && !selectedSynthesis) {
          setSelectedSynthesis(result.syntheses[0]);
        }

        // Also populate weeklySyntheses Map for the weekly synthesis display
        const weeklyMap = new Map();
        (result.syntheses || []).forEach(synthesis => {
          if (synthesis.weekStart) {
            const weekStart = new Date(synthesis.weekStart);
            const weekKey = formatWeekRange(weekStart);
            console.log('Storing synthesis with key:', weekKey, 'from weekStart:', synthesis.weekStart);
            console.log('weekStart as Date:', new Date(synthesis.weekStart));
            console.log('Calculated weekStart:', weekStart);
            console.log('Calculated weekEnd:', getWeekEnd(weekStart));
            weeklyMap.set(weekKey, synthesis);
          }
        });
        setWeeklySyntheses(weeklyMap);
        console.log('Loaded weekly syntheses:', Array.from(weeklyMap.keys()));
      }
    } catch (error) {
      console.error('Failed to load syntheses:', error);
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

  // Calendar Week Picker Functions
  function getWeekStart(date) {
    // Create a fresh date object to avoid mutations
    const d = new Date(date.getTime());
    const day = d.getDay(); // 0 = Sunday, 1 = Monday, etc.
    // Go back 'day' number of days to reach Sunday
    d.setDate(d.getDate() - day);
    // Reset time to start of day for consistency
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function getWeekEnd(weekStart) {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return weekEnd;
  }

  function getSelectedWeekRange() {
    const weekStart = getWeekStart(selectedWeekDate);
    console.log('getSelectedWeekRange - selectedWeekDate:', selectedWeekDate);
    console.log('getSelectedWeekRange - calculated weekStart:', weekStart);
    const range = formatWeekRange(weekStart);
    console.log('getSelectedWeekRange - final range:', range);
    return range;
  }

  function getWeekInputValue() {
    const weekStart = getWeekStart(selectedWeekDate);
    const year = weekStart.getFullYear();
    const weekNumber = getWeekNumber(weekStart);
    return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
  }

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  }

  function getPastWeekOptions() {
    const weeks = [];
    const today = new Date();
    const currentWeekStart = getWeekStart(today);

    // Generate last 4 weeks
    for (let i = 0; i < 4; i++) {
      const weekDate = new Date(currentWeekStart);
      weekDate.setDate(weekDate.getDate() - (i * 7));

      const weekStart = getWeekStart(weekDate);
      const weekRange = formatWeekRange(weekStart);
      const isSelected = weekStart.getTime() === getWeekStart(selectedWeekDate).getTime();
      const isCurrent = i === 0;
      const hasSynthesis = weeklySyntheses.has(weekRange);

      weeks.push({
        date: weekDate,
        label: isCurrent ? `This Week (${weekRange})` : weekRange,
        isSelected,
        isCurrent,
        hasSynthesis
      });
    }

    return weeks;
  }

  function handleCustomWeekSelect(week) {
    setSelectedWeekDate(week.date);
    setShowWeekPicker(false);
  }

  function formatWeekRange(weekStart) {
    const weekEnd = getWeekEnd(weekStart);
    const startMonth = weekStart.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = weekEnd.toLocaleDateString('en-US', { month: 'short' });
    const year = weekStart.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth} ${weekStart.getDate()} – ${weekEnd.getDate()}, ${year}`;
    } else {
      return `${startMonth} ${weekStart.getDate()} – ${endMonth} ${weekEnd.getDate()}, ${year}`;
    }
  }

  function isCurrentWeek() {
    const now = new Date();
    const selected = selectedWeekDate || now;

    // Get week start for both dates
    const currentWeekStart = getWeekStart(new Date(now));
    const selectedWeekStart = getWeekStart(new Date(selected));

    // Compare just the dates (year, month, day) to avoid time zone issues
    const currentStr = currentWeekStart.toDateString();
    const selectedStr = selectedWeekStart.toDateString();

    return currentStr === selectedStr;
  }

  function hasWeeklyActivity() {
    // Only allow generation for current week
    return isCurrentWeek();
  }

  function getWeeklySynthesis() {
    // If we're viewing the current week, get the most recent synthesis
    if (isCurrentWeek()) {
      const availableKeys = Array.from(weeklySyntheses.keys());
      console.log('Looking for current week synthesis in:', availableKeys);

      // Return the most recent synthesis (last in the map)
      if (availableKeys.length > 0) {
        const mostRecentKey = availableKeys[availableKeys.length - 1];
        console.log('Using most recent synthesis key:', mostRecentKey);
        return weeklySyntheses.get(mostRecentKey);
      }
    }

    // For non-current weeks, use exact key matching
    const weekKey = getSelectedWeekRange();
    console.log('Getting synthesis for key:', weekKey);
    console.log('Available syntheses:', Array.from(weeklySyntheses.keys()));
    const synthesis = weeklySyntheses.get(weekKey);
    console.log('Found synthesis:', synthesis);
    return synthesis;
  }

  async function handleSynthesizeWeek() {
    if (synthesizing) return;

    setSynthesizing(true);
    try {
      // Always synthesize for the current week
      const now = new Date();
      const weekStart = getWeekStart(now);
      console.log('Requesting synthesis for weekStart:', weekStart);
      console.log('Current selected week key will be:', formatWeekRange(weekStart));

      const result = await chrome.runtime.sendMessage({
        type: 'SYNTHESIZE_WEEK',
        weekStart: weekStart,
        force: true,  // Always force new synthesis, even if one exists
        timestamp: Date.now()  // Add timestamp to ensure fresh request
      });

      console.log('Sent synthesis request with force=true and timestamp:', Date.now());

      if (result.success) {
        console.log('Synthesis request successful, waiting for completion message...');
        // Keep synthesizing=true until SYNTHESIS_COMPLETE message arrives
        // Don't reset it here - let the message listener handle it
      } else {
        alert('Synthesis failed: ' + (result.error || 'Unknown error'));
        setSynthesizing(false);
      }
    } catch (error) {
      console.error('Weekly synthesis failed:', error);
      alert('Synthesis failed. Writer API may not be available.');
      setSynthesizing(false);
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
      <div className="insights-list">

        {/* Three-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '24px',
          marginBottom: '20px'
        }}>
          <div className="insight-card">
            <h3>Entity Distribution</h3>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>
              Breakdown of your knowledge graph by entity type
            </p>

            {/* Stats integrated into Entity Distribution */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <div style={{
                padding: '12px',
                background: 'rgba(167, 139, 250, 0.1)',
                border: '1px solid rgba(167, 139, 250, 0.3)',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#a78bfa', marginBottom: '2px' }}>
                  {graphData.nodes.length}
                </div>
                <div style={{ fontSize: '10px', color: '#888' }}>
                  Entities
                </div>
              </div>

              <div style={{
                padding: '12px',
                background: 'rgba(96, 165, 250, 0.1)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '2px' }}>
                  {graphData.links.length}
                </div>
                <div style={{ fontSize: '10px', color: '#888' }}>
                  Connections
                </div>
              </div>

              <div style={{
                padding: '12px',
                background: 'rgba(52, 211, 153, 0.1)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#34d399', marginBottom: '2px' }}>
                  {avgConnections}
                </div>
                <div style={{ fontSize: '10px', color: '#888' }}>
                  Avg/Entity
                </div>
              </div>
            </div>
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

          <div className="insight-card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <h3>Weekly Learning Synthesis</h3>
            <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', marginBottom: '12px' }}>
              Your week in review
            </p>

            {/* Calendar Range Picker */}
            <div className="week-picker-container" style={{ marginBottom: '16px' }}>
              <div
                onClick={() => setShowWeekPicker(!showWeekPicker)}
                style={{
                  padding: '8px 12px',
                  background: 'rgba(30, 64, 175, 0.1)',
                  border: '1px solid rgba(30, 64, 175, 0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#60a5fa' }}>
                  {getSelectedWeekRange()}
                </div>
              </div>

              {showWeekPicker && (
                <div style={{
                  position: 'absolute',
                  zIndex: 1000,
                  marginTop: '4px',
                  background: 'rgba(30, 30, 45, 0.98)',
                  border: '1px solid rgba(108, 92, 231, 0.4)',
                  borderRadius: '12px',
                  padding: '8px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  minWidth: '220px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ marginBottom: '12px', fontSize: '13px', color: '#a78bfa', fontWeight: '600' }}>
                    Select Week
                  </div>
                  {getPastWeekOptions().map((week, index) => (
                    <div
                      key={index}
                      onClick={() => handleCustomWeekSelect(week)}
                      style={{
                        padding: '12px 16px',
                        background: week.isSelected ? 'rgba(108, 92, 231, 0.4)' : week.isCurrent ? 'rgba(96, 165, 250, 0.2)' : 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        marginBottom: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: week.isCurrent ? '600' : '500',
                        color: week.isSelected ? '#a78bfa' : week.isCurrent ? '#60a5fa' : '#d1d5db',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                      onMouseEnter={(e) => {
                        if (!week.isSelected && !week.isCurrent) {
                          e.target.style.background = 'rgba(108, 92, 231, 0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!week.isSelected && !week.isCurrent) {
                          e.target.style.background = 'transparent';
                        }
                      }}
                    >
                      <span>{week.label}</span>
                      {week.hasSynthesis && <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Synthesis button - ONLY for current week */}
            {isCurrentWeek() ? (
              <button
                onClick={() => handleSynthesizeWeek()}
                disabled={synthesizing}
                style={{
                  padding: '8px 16px',
                  background: synthesizing ? '#475569' : '#6C5CE7',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: synthesizing ? 'not-allowed' : 'pointer',
                  width: '100%',
                  marginBottom: '12px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {synthesizing ? 'Generating synthesis...' : 'Synthesize Learning for this Week'}
              </button>
            ) : (
              <div style={{
                padding: '8px 12px',
                background: 'rgba(96, 165, 250, 0.1)',
                border: '1px solid rgba(96, 165, 250, 0.2)',
                borderRadius: '8px',
                color: '#60a5fa',
                fontSize: '12px',
                textAlign: 'center',
                marginBottom: '12px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                📅 Past week synthesis would appear here
              </div>
            )}

            <button
              onClick={handleManualDiscovery}
              disabled={discovering || graphData.nodes.length < 2}
              style={{
                padding: '8px 16px',
                background: discovering ? '#475569' : '#10b981',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: discovering || graphData.nodes.length < 2 ? 'not-allowed' : 'pointer',
                width: '100%',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {discovering ? 'Finding connections...' : 'Discover More Connections'}
            </button>

            {/* Synthesis Results - now with no scroll limit in wider layout */}
            {getWeeklySynthesis() && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: 'rgba(167, 139, 250, 0.1)',
                border: '1px solid rgba(167, 139, 250, 0.3)',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#e0e0e0',
                lineHeight: '1.6',
                flex: 1
              }}>
                <div style={{ fontWeight: '600', marginBottom: '8px', color: '#a78bfa' }}>
                  📚 {getSelectedWeekRange()}
                </div>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>
                  {getWeeklySynthesis()?.articlesAnalyzed || 0} artifacts analyzed
                </div>
                {getWeeklySynthesis()?.synthesis || 'No synthesis available for this week.'}
              </div>
            )}
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

        </div>

      </div>
    </div>
  );
}

export default InsightPanel;
