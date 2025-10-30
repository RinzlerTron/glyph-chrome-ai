/******/ (() => { // webpackBootstrap
// Content script for extracting article content from web pages

// Listen for capture requests from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CAPTURE_ARTICLE') {
    handleCapture().then(result => sendResponse(result)).catch(error => sendResponse({
      success: false,
      error: error.message
    }));
    return true; // Keep channel open for async
  }
});
async function handleCapture() {
  try {
    const articleText = extractArticleText();
    const title = extractTitle();
    const language = detectLanguage();
    if (!articleText || articleText.length < 100) {
      throw new Error('Could not extract meaningful content from this page');
    }

    // Send to background for processing
    const response = await chrome.runtime.sendMessage({
      type: 'CAPTURE_ARTICLE',
      data: {
        text: articleText,
        title: title,
        url: window.location.href,
        language: language
      }
    });
    if (response.success) {
      showNotification('Article captured successfully!', 'success');
    } else {
      showNotification(`Failed to capture: ${response.error}`, 'error');
    }
    return response;
  } catch (error) {
    console.error('Capture failed:', error);
    showNotification(`Error: ${error.message}`, 'error');
    throw error;
  }
}
function extractArticleText() {
  // Try to find article content using common selectors
  const selectors = ['article', '[role="main"]', '.article-content', '.post-content', '.entry-content', '.content', 'main'];
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent.length > 500) {
      return cleanText(element.textContent);
    }
  }

  // Fallback to body text
  return cleanText(document.body.textContent);
}
function extractTitle() {
  // Try multiple methods to get the best title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) return ogTitle.content;
  const h1 = document.querySelector('h1');
  if (h1) return h1.textContent.trim();
  return document.title;
}
function detectLanguage() {
  // Try to detect language from HTML attributes
  const htmlLang = document.documentElement.lang;
  if (htmlLang) return htmlLang.split('-')[0];
  const metaLang = document.querySelector('meta[http-equiv="content-language"]');
  if (metaLang) return metaLang.content.split('-')[0];
  return 'en'; // Default to English
}
function cleanText(text) {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}
function showNotification(message, type) {
  // Create a simple toast notification
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
  `;

  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 300);
  }, 3000);
}

// Log when content script is loaded
// console.log('Glyph content script loaded');
/******/ })()
;
//# sourceMappingURL=content-script.js.map