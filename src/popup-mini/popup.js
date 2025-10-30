// Popup-mini: Quick stats + navigation

let isCapturing = false;

async function loadStats() {
  try {
    // Get stats from background script
    const statsResponse = await chrome.runtime.sendMessage({ type: 'GET_STATISTICS' });
    const captureStatus = await chrome.storage.local.get(['capturingStatus']);

    const stats = statsResponse.statistics || { totalEntities: 0, totalRelationships: 0, totalArticles: 0 };
    const capturing = captureStatus.capturingStatus || { active: false, progress: '' };

    // Update display
    document.getElementById('entityCount').textContent = stats.totalEntities || 0;
    document.getElementById('connectionCount').textContent = stats.totalRelationships || 0;
    document.getElementById('articleCount').textContent = stats.totalArticles || 0;

    // Show capture status
    const statusEl = document.getElementById('status');
    if (capturing.active) {
      isCapturing = true;
      statusEl.textContent = capturing.progress || 'Extracting insights...';
      statusEl.className = 'status capturing';

      document.getElementById('tip').textContent = 'You can close this popup. Processing continues in background.';
    } else if (stats.totalArticles === 0) {
      statusEl.textContent = 'Click the icon to capture your first article';
      statusEl.className = 'status';

      document.getElementById('tip').textContent = '💡 Tip: Browse any article and click the Glyph icon to start building your knowledge graph';
    } else {
      statusEl.textContent = `✓ ${stats.totalArticles} ${stats.totalArticles === 1 ? 'article' : 'articles'} in your knowledge graph`;
      statusEl.className = 'status';

      document.getElementById('tip').textContent = '💡 Tip: Enable auto-save in settings for seamless learning';
    }

  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

// Listen for capture completion
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'CAPTURE_PROGRESS') {
    document.getElementById('status').textContent = message.progress;
  } else if (message.type === 'CAPTURE_COMPLETE') {
    isCapturing = false;

    // Show success feedback
    const statusEl = document.getElementById('status');
    const tipEl = document.getElementById('tip');

    statusEl.textContent = '✓ Article captured!';
    statusEl.className = 'status';
    tipEl.innerHTML = `🎉 <strong style="color: #4ade80;">Success!</strong><br>Article added to your knowledge graph<br><span style="color: rgba(255,255,255,0.7); font-size: 11px;">${message.entities || 0} entities extracted</span>`;

    // Reset to normal state after a moment
    setTimeout(() => {
      loadStats();
    }, 2500);
  } else if (message.type === 'STATS_UPDATED') {
    loadStats();
  }
});

// Capture current page
document.getElementById('captureBtn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    // Extract page content first for duplicate check
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractPageForDuplicateCheck
    });

    if (!result || !result[0] || !result[0].result) {
      // Fallback: capture without duplicate check
      await captureWithoutCheck(tab);
      return;
    }

    const pageData = result[0].result;

    // Check for duplicates
    const duplicateCheck = await chrome.runtime.sendMessage({
      type: 'CHECK_DUPLICATE',
      data: pageData
    });

    if (duplicateCheck.isDuplicate && duplicateCheck.duplicates.length > 0) {
      // Show duplicate warning
      const duplicate = duplicateCheck.duplicates[0];
      const daysAgo = Math.floor((Date.now() - duplicate.capturedAt) / (1000 * 60 * 60 * 24));
      const timeAgo = daysAgo === 0 ? 'today' : daysAgo === 1 ? 'yesterday' : `${daysAgo} days ago`;

      const confirmed = confirm(
        `⚠️ Similar Article Found\n\n` +
        `You captured "${duplicate.title}" ${timeAgo}\n\n` +
        `${duplicate.overlap}% content overlap\n\n` +
        `Capture anyway?`
      );

      if (!confirmed) {
        return;
      }
    }

    // Proceed with capture
    await captureWithoutCheck(tab);

  } catch (error) {
    console.error('Capture failed:', error);
  }
});

// Helper function to capture without duplicate check
async function captureWithoutCheck(tab) {
  // Show immediate feedback with article info
  const statusEl = document.getElementById('status');
  const tipEl = document.getElementById('tip');

  const title = tab.title.length > 40 ? tab.title.substring(0, 40) + '...' : tab.title;
  const hostname = new URL(tab.url).hostname;

  statusEl.textContent = 'Starting capture...';
  statusEl.className = 'status capturing';
  tipEl.innerHTML = `📄 <strong>Capturing:</strong><br>"${title}"<br><span style="color: rgba(255,255,255,0.7); font-size: 11px;">${hostname}</span>`;

  await chrome.runtime.sendMessage({
    type: 'CAPTURE_CURRENT_TAB',
    tab: tab
  });

  // Refresh stats immediately to show capturing status
  loadStats();
}

// Injected function to extract page data for duplicate check
function extractPageForDuplicateCheck() {
  const selectors = [
    'article',
    '[role="article"]',
    'main article',
    '.article-content',
    '.post-content',
    '.entry-content',
    'main',
    '.content'
  ];

  let contentElement = null;
  for (const selector of selectors) {
    contentElement = document.querySelector(selector);
    if (contentElement) break;
  }

  if (!contentElement) {
    contentElement = document.body;
  }

  const text = contentElement.textContent
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 2000);

  return {
    title: document.title,
    url: window.location.href,
    text: text
  };
}

// Prevent multiple script executions
if (!window.glyphPopupInitialized) {
  window.glyphPopupInitialized = true;
  console.log('[POPUP DEBUG] Initializing popup script');

// Debounce mechanism to prevent double clicks
let isCreatingTab = false;

// Remove any existing event listeners first
const viewGraphBtn = document.getElementById('viewGraphBtn');
const settingsBtn = document.getElementById('settingsBtn');

if (viewGraphBtn) {
  // Clone node to remove all event listeners
  const newViewGraphBtn = viewGraphBtn.cloneNode(true);
  viewGraphBtn.parentNode.replaceChild(newViewGraphBtn, viewGraphBtn);
}

if (settingsBtn) {
  // Clone node to remove all event listeners
  const newSettingsBtn = settingsBtn.cloneNode(true);
  settingsBtn.parentNode.replaceChild(newSettingsBtn, settingsBtn);
}

// View full graph - robust duplicate prevention
document.getElementById('viewGraphBtn').addEventListener('click', async (e) => {
  console.log('[POPUP DEBUG] View Graph clicked, isCreatingTab:', isCreatingTab);

  e.preventDefault();
  e.stopPropagation();

  if (isCreatingTab) {
    console.log('[POPUP DEBUG] Already creating tab, ignoring click');
    return;
  }

  isCreatingTab = true;

  try {
    await chrome.tabs.create({
      url: chrome.runtime.getURL('graph-page/index.html')
    });
    console.log('[POPUP DEBUG] Tab created successfully');
  } catch (error) {
    console.error('[POPUP DEBUG] Failed to create tab:', error);
  }

  // Reset flag after a short delay
  setTimeout(() => {
    isCreatingTab = false;
    console.log('[POPUP DEBUG] Reset isCreatingTab flag');
  }, 1000);
});

// Open settings - robust duplicate prevention
document.getElementById('settingsBtn').addEventListener('click', async (e) => {
  console.log('[POPUP DEBUG] Settings clicked, isCreatingTab:', isCreatingTab);

  e.preventDefault();
  e.stopPropagation();

  if (isCreatingTab) {
    console.log('[POPUP DEBUG] Already creating tab, ignoring click');
    return;
  }

  isCreatingTab = true;

  try {
    await chrome.tabs.create({
      url: chrome.runtime.getURL('graph-page/index.html') + '?tab=settings'
    });
    console.log('[POPUP DEBUG] Settings tab created successfully');
  } catch (error) {
    console.error('[POPUP DEBUG] Failed to create settings tab:', error);
  }

  // Reset flag after a short delay
  setTimeout(() => {
    isCreatingTab = false;
    console.log('[POPUP DEBUG] Reset isCreatingTab flag');
  }, 1000);
});

// Load stats on open
loadStats();

// Refresh every 2 seconds if capturing
setInterval(() => {
  if (isCapturing) {
    loadStats();
  }
}, 2000);

} else {
  console.log('[POPUP DEBUG] Script already initialized, skipping');
}
