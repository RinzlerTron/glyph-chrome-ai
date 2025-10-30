// General helper utilities
import { v4 as uuidv4 } from 'uuid';

export function generateUUID() {
  return uuidv4();
}

export function createEntity(name, type, topic, context) {
  return {
    id: generateUUID(),
    name: name.trim(),
    type: type,
    topic: topic,
    relevance: 0.5,
    firstSeen: Date.now(),
    lastSeen: Date.now(),
    sources: [],
    metadata: {
      context: context || '',
      aliases: [],
      frequency: 1
    }
  };
}

export function createRelationship(sourceId, targetId, type, description, strength) {
  return {
    id: generateUUID(),
    source: sourceId,
    target: targetId,
    type: type,
    strength: Math.max(0, Math.min(1, strength)),
    description: description,
    inferredBy: 'ai',
    created: Date.now(),
    sources: [],
    metadata: {
      coOccurrences: 1,
      contexts: []
    }
  };
}

export function createArticle(url, title, text, summary, language, entityIds) {
  const wordCount = text.split(/\s+/).length;

  return {
    id: generateUUID(),
    url: url,
    title: title,
    summary: summary,
    fullText: text.length > 10000 ? null : text,
    language: language,
    capturedAt: Date.now(),
    wordCount: wordCount,
    entities: entityIds,
    metadata: {
      domain: extractDomain(url),
      author: null,
      publishedDate: null
    }
  };
}

function extractDomain(url) {
  try {
    return new URL(url).hostname;
  } catch (error) {
    return '';
  }
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export default {
  generateUUID,
  createEntity,
  createRelationship,
  createArticle,
  debounce,
  throttle
};
