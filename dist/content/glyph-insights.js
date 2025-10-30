/******/ (() => { // webpackBootstrap
/**
 * Glyph Insights - Live Reading Assistant
 *
 * Proactively shows connections to previously captured articles
 * as the user browses ANY page (not just captured ones).
 *
 * This is the killer feature that makes Glyph "ambient intelligence".
 */

// Configuration
const CONFIG = {
  enabled: true,
  minTextLength: 500,
  extractLength: 1500,
  minMatchingEntities: 2,
  debounceMs: 2000,
  excludedDomains: ['chrome://', 'chrome-extension://', 'accounts.google.com', 'mail.google.com']
};
let insightsPanel = null;
let currentInsights = null;
let debounceTimer = null;

// Initialize on page load
if (shouldRunOnPage()) {
  initialize();
}

/**
 * Check if insights should run on this page
 */
function shouldRunOnPage() {
  const url = window.location.href;

  // Skip excluded domains
  if (CONFIG.excludedDomains.some(domain => url.startsWith(domain))) {
    return false;
  }

  // Skip if no text content
  if (document.body.textContent.trim().length < CONFIG.minTextLength) {
    return false;
  }
  return true;
}

/**
 * Initialize insights when page loads
 */
function initialize() {
  // Wait for page to be somewhat loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      debounceAnalyzePage();
    });
  } else {
    debounceAnalyzePage();
  }

  // Re-analyze if user scrolls (they might have reached the main content)
  let scrolled = false;
  window.addEventListener('scroll', () => {
    if (!scrolled && window.scrollY > 100) {
      scrolled = true;
      debounceAnalyzePage();
    }
  }, {
    once: true
  });
}

/**
 * Debounce page analysis to avoid excessive API calls
 */
function debounceAnalyzePage() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    analyzePage();
  }, CONFIG.debounceMs);
}

/**
 * Analyze current page and show insights if matches found
 */
async function analyzePage() {
  try {
    // Extract page content
    const pageContent = extractPageContent();
    if (!pageContent || pageContent.length < CONFIG.minTextLength) {
      return;
    }

    // Send to service worker for entity extraction and matching
    const response = await chrome.runtime.sendMessage({
      type: 'ANALYZE_PAGE_FOR_INSIGHTS',
      data: {
        url: window.location.href,
        title: document.title,
        content: pageContent
      }
    });
    if (response.success && response.matches && response.matches.length > 0) {
      showInsights(response.matches, response.entities, response.duplicate);
    } else if (response.success && response.duplicate) {
      // Show duplicate warning even if no other matches
      showInsights([], response.entities || [], response.duplicate);
    }
  } catch (error) {
    console.error('[Glyph Insights] Analysis failed:', error);
  }
}

/**
 * Extract meaningful content from page
 */
function extractPageContent() {
  // Try to find article content
  const selectors = ['article', '[role="article"]', 'main article', '.article-content', '.post-content', '.entry-content', 'main', '.content'];
  let contentElement = null;
  for (const selector of selectors) {
    contentElement = document.querySelector(selector);
    if (contentElement) break;
  }

  // Fallback to body if no article found
  if (!contentElement) {
    contentElement = document.body;
  }

  // Extract text, limiting to first N characters
  const text = contentElement.textContent.trim().replace(/\s+/g, ' ').slice(0, CONFIG.extractLength);
  return text;
}

/**
 * Show insights panel with matched articles and duplicate warning
 */
function showInsights(matches, entities, duplicate) {
  // Store current insights
  currentInsights = {
    matches,
    entities,
    duplicate
  };

  // Create panel if it doesn't exist
  if (!insightsPanel) {
    insightsPanel = createInsightsPanel();
    document.body.appendChild(insightsPanel);
  }

  // Update panel content
  updatePanelContent(matches, entities, duplicate);

  // Fade in
  setTimeout(() => {
    insightsPanel.classList.add('glyph-panel-visible');
  }, 100);
}

/**
 * Create the floating insights panel
 */
function createInsightsPanel() {
  const panel = document.createElement('div');
  panel.className = 'glyph-insights-panel';
  panel.innerHTML = `
    <div class="glyph-panel-header">
      <div class="glyph-panel-title">
        <svg class="glyph-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <circle cx="12" cy="5" r="1"/>
          <circle cx="12" cy="19" r="1"/>
          <circle cx="5" cy="12" r="1"/>
          <circle cx="19" cy="12" r="1"/>
          <line x1="12" y1="9" x2="12" y2="8"/>
          <line x1="12" y1="16" x2="12" y2="15"/>
          <line x1="15" y1="12" x2="16" y2="12"/>
          <line x1="8" y1="12" x2="9" y2="12"/>
        </svg>
        <span>Glyph Insights</span>
      </div>
      <button class="glyph-panel-close" title="Close">×</button>
    </div>
    <div class="glyph-panel-content">
      <!-- Content dynamically inserted -->
    </div>
    <div class="glyph-panel-footer">
      <button class="glyph-capture-btn">Capture This Article</button>
    </div>
  `;

  // Add event listeners
  panel.querySelector('.glyph-panel-close').addEventListener('click', () => {
    hidePanel();
  });
  panel.querySelector('.glyph-capture-btn').addEventListener('click', () => {
    captureCurrentPage();
  });

  // Inject styles
  injectStyles();
  return panel;
}

/**
 * Update panel with matches and duplicate warning
 */
function updatePanelContent(matches, entities, duplicate) {
  const contentEl = insightsPanel.querySelector('.glyph-panel-content');
  let html = '';

  // Show duplicate warning first if present
  if (duplicate) {
    const daysAgo = Math.floor((Date.now() - duplicate.capturedAt) / (1000 * 60 * 60 * 24));
    const timeAgo = daysAgo === 0 ? 'today' : daysAgo === 1 ? 'yesterday' : `${daysAgo} days ago`;
    html += `
      <div class="glyph-duplicate-warning">
        <div class="glyph-duplicate-icon">⚠️</div>
        <div class="glyph-duplicate-content">
          <strong>You may have already captured this</strong>
          <div class="glyph-duplicate-title">"${escapeHtml(duplicate.title)}"</div>
          <div class="glyph-duplicate-meta">
            ${duplicate.overlap}% similar • Captured ${timeAgo}
          </div>
          <button class="glyph-view-original-btn" data-article-id="${duplicate.id}">View Original</button>
        </div>
      </div>
    `;
  }

  // Show related articles if any
  if (matches && matches.length > 0) {
    const entitiesText = entities.slice(0, 3).map(e => `"${e}"`).join(', ');
    const moreEntities = entities.length > 3 ? ` +${entities.length - 3} more` : '';
    html += `
      <p class="glyph-insight-text">
        ${duplicate ? 'Also related:' : `You've read about <strong>${entitiesText}${moreEntities}</strong> in ${matches.length} ${matches.length === 1 ? 'article' : 'articles'}:`}
      </p>
      <div class="glyph-matches-list">
        ${matches.map(match => `
          <div class="glyph-match-item" data-article-id="${match.id}">
            <div class="glyph-match-title">${escapeHtml(match.title)}</div>
            <div class="glyph-match-meta">
              <span class="glyph-match-entities">${match.sharedEntities} ${match.sharedEntities === 1 ? 'entity' : 'entities'} in common</span>
              <span class="glyph-match-time">${formatTimeAgo(match.capturedAt)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  contentEl.innerHTML = html;

  // Add click handlers
  contentEl.querySelectorAll('.glyph-match-item').forEach(item => {
    item.addEventListener('click', () => {
      openGraphPage(item.dataset.articleId);
    });
  });

  // Add click handler for "View Original" button
  const viewOriginalBtn = contentEl.querySelector('.glyph-view-original-btn');
  if (viewOriginalBtn) {
    viewOriginalBtn.addEventListener('click', e => {
      e.stopPropagation();
      openGraphPage(viewOriginalBtn.dataset.articleId);
    });
  }
}

/**
 * Hide the panel
 */
function hidePanel() {
  if (insightsPanel) {
    insightsPanel.classList.remove('glyph-panel-visible');
  }
}

/**
 * Capture current page
 */
async function captureCurrentPage() {
  try {
    // Send message to background script
    await chrome.runtime.sendMessage({
      type: 'CAPTURE_CURRENT_TAB'
    });

    // Show success feedback
    const btn = insightsPanel.querySelector('.glyph-capture-btn');
    const originalText = btn.textContent;
    btn.textContent = '✓ Captured!';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      hidePanel();
    }, 2000);
  } catch (error) {
    console.error('[Glyph Insights] Capture failed:', error);
  }
}

/**
 * Open graph page with article selected
 */
function openGraphPage(articleId) {
  chrome.runtime.sendMessage({
    type: 'OPEN_GRAPH_PAGE',
    articleId: articleId
  });
}

/**
 * Inject styles for the panel
 */
function injectStyles() {
  if (document.getElementById('glyph-insights-styles')) {
    return; // Already injected
  }
  const style = document.createElement('style');
  style.id = 'glyph-insights-styles';
  style.textContent = `
    .glyph-insights-panel {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 360px;
      max-height: 480px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(102, 126, 234, 0.3);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
      display: flex;
      flex-direction: column;
    }

    .glyph-insights-panel.glyph-panel-visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }

    .glyph-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid rgba(102, 126, 234, 0.2);
    }

    .glyph-panel-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #e0e0e0;
      font-weight: 600;
      font-size: 15px;
    }

    .glyph-icon {
      color: #667eea;
      animation: glyph-pulse 2s ease-in-out infinite;
    }

    @keyframes glyph-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    .glyph-panel-close {
      background: none;
      border: none;
      color: #888;
      font-size: 28px;
      line-height: 1;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }

    .glyph-panel-close:hover {
      color: #e0e0e0;
    }

    .glyph-panel-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .glyph-insight-text {
      margin: 0 0 16px 0;
      color: #b0b0b0;
      font-size: 14px;
      line-height: 1.6;
    }

    .glyph-insight-text strong {
      color: #e0e0e0;
    }

    .glyph-matches-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .glyph-match-item {
      padding: 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid transparent;
    }

    .glyph-match-item:hover {
      background: rgba(102, 126, 234, 0.1);
      border-color: rgba(102, 126, 234, 0.3);
    }

    .glyph-match-title {
      color: #e0e0e0;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 6px;
      line-height: 1.4;
    }

    .glyph-match-meta {
      display: flex;
      gap: 12px;
      font-size: 12px;
      color: #888;
    }

    .glyph-duplicate-warning {
      background: rgba(251, 146, 60, 0.1);
      border: 1px solid rgba(251, 146, 60, 0.3);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 16px;
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .glyph-duplicate-icon {
      font-size: 20px;
      flex-shrink: 0;
    }

    .glyph-duplicate-content {
      flex: 1;
    }

    .glyph-duplicate-content strong {
      color: #fb923c;
      font-size: 13px;
      display: block;
      margin-bottom: 6px;
    }

    .glyph-duplicate-title {
      color: #e0e0e0;
      font-size: 13px;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .glyph-duplicate-meta {
      color: #999;
      font-size: 12px;
      margin-bottom: 8px;
    }

    .glyph-view-original-btn {
      background: rgba(251, 146, 60, 0.2);
      border: 1px solid rgba(251, 146, 60, 0.4);
      color: #fb923c;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .glyph-view-original-btn:hover {
      background: rgba(251, 146, 60, 0.3);
      border-color: rgba(251, 146, 60, 0.6);
    }

    .glyph-panel-footer {
      padding: 12px 16px;
      border-top: 1px solid rgba(102, 126, 234, 0.2);
    }

    .glyph-capture-btn {
      width: 100%;
      padding: 10px 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .glyph-capture-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .glyph-capture-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    /* Scrollbar styling */
    .glyph-panel-content::-webkit-scrollbar {
      width: 6px;
    }

    .glyph-panel-content::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 3px;
    }

    .glyph-panel-content::-webkit-scrollbar-thumb {
      background: rgba(102, 126, 234, 0.5);
      border-radius: 3px;
    }

    .glyph-panel-content::-webkit-scrollbar-thumb:hover {
      background: rgba(102, 126, 234, 0.7);
    }
  `;
  document.head.appendChild(style);
}

/**
 * Format time ago (e.g., "2 days ago")
 */
function formatTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
  return `${Math.floor(seconds / 2592000)} months ago`;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Listen for settings changes (user can disable insights)
chrome.runtime.onMessage.addListener(message => {
  if (message.type === 'INSIGHTS_SETTINGS_CHANGED') {
    CONFIG.enabled = message.enabled;
    if (!CONFIG.enabled && insightsPanel) {
      hidePanel();
    }
  }
});
/******/ })()
;
//# sourceMappingURL=glyph-insights.js.map