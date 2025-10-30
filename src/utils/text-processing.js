// Text processing utilities for article content

export function cleanText(text) {
  if (!text) return '';

  return text
    .replace(/\s+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength)}...`;
}

export function extractArticleText() {
  // Try to find article content using common selectors
  const selectors = [
    'article',
    '[role="main"]',
    '.article-content',
    '.post-content',
    '.entry-content',
    'main'
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent.length > 500) {
      return cleanText(element.textContent);
    }
  }

  // Fallback to body text
  return cleanText(document.body.textContent);
}

export function countWords(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

export function extractDomain(url) {
  try {
    return new URL(url).hostname;
  } catch (error) {
    return '';
  }
}

export function sanitizeForJSON(text) {
  if (!text) return '';

  return text
    .replace(/[\n\r]/g, ' ')
    .replace(/"/g, '\\"')
    .trim();
}

export function extractKeywords(text, limit = 10) {
  // Simple keyword extraction based on frequency
  const words = text
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 3);

  const wordCounts = {};
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

export default {
  cleanText,
  truncateText,
  extractArticleText,
  countWords,
  extractDomain,
  sanitizeForJSON,
  extractKeywords
};
