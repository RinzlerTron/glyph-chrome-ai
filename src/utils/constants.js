// Entity types for knowledge graph nodes
export const ENTITY_TYPES = {
  PERSON: 'person',
  COMPANY: 'company',
  TECHNOLOGY: 'technology',
  CONCEPT: 'concept'
};

// Relationship types for graph connections
export const RELATIONSHIP_TYPES = {
  DIRECT: 'direct',
  CONCEPTUAL: 'conceptual',
  TEMPORAL: 'temporal',
  CAUSAL: 'causal'
};

// Chrome AI API configuration
export const AI_CONFIG = {
  MAX_ARTICLE_CHARS: 6000,
  MAX_ENTITIES_PER_ARTICLE: 8,
  MAX_RELATIONSHIP_CANDIDATES: 8,
  ENTITY_EXTRACTION_TEMPERATURE: 0.3,
  RELATIONSHIP_INFERENCE_TEMPERATURE: 0.3,
  SUMMARIZER_LENGTH: 'short',
  SUMMARIZER_TYPE: 'key-points',
  SUMMARIZER_FORMAT: 'markdown'
};

// Graph visualization settings
export const GRAPH_CONFIG = {
  CANVAS_THRESHOLD: 200,
  FORCE_STRENGTH: -30,
  FORCE_DISTANCE: 100,
  COLLISION_RADIUS: 20,
  DEFAULT_NODE_SIZE: 8,
  SELECTED_NODE_SIZE: 12,
  LINK_WIDTH: 1.5
};

// UI layout configuration
export const UI_CONFIG = {
  POPUP_WIDTH: 800,
  POPUP_HEIGHT: 600,
  INSIGHTS_LIMIT: 5,
  RECENT_ARTICLES_LIMIT: 10
};

// Default user interests
export const DEFAULT_TOPICS = [
  'AI',
  'Technology',
  'Science',
  'Business',
  'Innovation'
];

// Storage configuration
export const STORAGE_KEYS = {
  USER_SETTINGS: 'user_settings'
};

export default {
  ENTITY_TYPES,
  RELATIONSHIP_TYPES,
  AI_CONFIG,
  GRAPH_CONFIG,
  UI_CONFIG,
  DEFAULT_TOPICS,
  STORAGE_KEYS
};
