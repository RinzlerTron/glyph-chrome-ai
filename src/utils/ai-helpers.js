// Chrome AI API wrappers for Prompt API and Summarizer API
// Had to add queuing because Chrome AI gets cranky with too many concurrent requests
import { checkPromptAPIAvailability, checkSummarizerAvailability } from './availability.js';
import { AI_CONFIG } from './constants.js';

// AI Request Queue to prevent overwhelming Chrome AI with concurrent requests
// Learned this the hard way - 6 simultaneous requests = timeouts and sadness
class AIRequestQueue {
  constructor(maxConcurrent = 2) {
    this.maxConcurrent = maxConcurrent; // Sweet spot seems to be 2
    this.running = 0;
    this.queue = [];
  }

  async add(requestFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFunction, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { requestFunction, resolve, reject } = this.queue.shift();

    console.log(`[AI QUEUE] Starting request (${this.running}/${this.maxConcurrent} running, ${this.queue.length} queued)`);

    try {
      const result = await requestFunction();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      console.log(`[AI QUEUE] Request completed (${this.running}/${this.maxConcurrent} running, ${this.queue.length} queued)`);
      // Process next item in queue
      setTimeout(() => this.processQueue(), 0);
    }
  }
}

// Global AI request queue instance
const aiQueue = new AIRequestQueue(2); // Limit to 2 concurrent AI requests

/**
 * Create a Prompt API session
 * @param {string} systemPrompt - System instructions for the AI
 * @param {Object} options - Session options
 * @returns {Promise<Object>} AI session object
 */
export async function createPromptSession(systemPrompt, options = {}) {
  const availability = await checkPromptAPIAvailability();

  if (!availability.available) {
    throw new Error(`Prompt API not available: ${availability.reason}`);
  }

  try {
    const session = await LanguageModel.create({
      systemPrompt: systemPrompt,
      temperature: options.temperature || 0.7,
      topK: options.topK || 40
    });

    return session;
  } catch (error) {
    console.error('Failed to create Prompt API session:', error);
    throw new Error(`Session creation failed: ${error.message}`);
  }
}

/**
 * Send a single prompt and get response (auto-cleanup session)
 * @param {string} systemPrompt - System instructions
 * @param {string} userPrompt - User query
 * @param {Object} options - Session options
 * @returns {Promise<string>} AI response
 */
export async function promptOnce(systemPrompt, userPrompt, options = {}) {
  // Queue the AI request to prevent overwhelming Chrome AI
  return aiQueue.add(async () => {
    let session = null;

    try {
      session = await createPromptSession(systemPrompt, options);

      // Increased timeout from 20s to 30s for better success rate
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('AI request timed out after 30 seconds')), 30000)
      );

      const response = await Promise.race([
        session.prompt(userPrompt),
        timeoutPromise
      ]);

      return response;
    } catch (error) {
      console.error('Prompt failed:', error);
      throw error;
    } finally {
      if (session) {
        session.destroy();
      }
    }
  });
}

/**
 * Send a prompt and get streaming response
 * @param {string} systemPrompt - System instructions
 * @param {string} userPrompt - User query
 * @param {Object} options - Session options
 * @returns {AsyncGenerator<string>} Streaming response chunks
 */
export async function* promptStreaming(systemPrompt, userPrompt, options = {}) {
  let session = null;

  try {
    session = await createPromptSession(systemPrompt, options);
    const stream = await session.promptStreaming(userPrompt);

    for await (const chunk of stream) {
      yield chunk;
    }
  } catch (error) {
    console.error('Streaming prompt failed:', error);
    throw error;
  } finally {
    if (session) {
      session.destroy();
    }
  }
}

/**
 * Summarize text using Chrome's Summarizer API
 * @param {string} text - Text to summarize
 * @param {Object} options - Summarizer options
 * @returns {Promise<string>} Summary text
 */
export async function summarizeText(text, options = {}) {
  const availability = await checkSummarizerAvailability();

  if (!availability.available) {
    console.warn('Summarizer not available, returning truncated text');
    return text.slice(0, 1000) + '...';
  }

  // Queue the summarizer request to prevent overwhelming Chrome AI
  return aiQueue.add(async () => {
    let summarizer = null;

    try {
      summarizer = await Summarizer.create({
        type: options.type || AI_CONFIG.SUMMARIZER_TYPE,
        format: options.format || AI_CONFIG.SUMMARIZER_FORMAT,
        length: options.length || AI_CONFIG.SUMMARIZER_LENGTH
      });

      const summary = await summarizer.summarize(text);
      return summary;
    } catch (error) {
      console.error('Summarization failed:', error);
      return text.slice(0, 1000) + '...';
    } finally {
      if (summarizer) {
        summarizer.destroy();
      }
    }
  });
}

/**
 * Detect language of text using Chrome's Language Detector API
 * @param {string} text - Text to analyze
 * @returns {Promise<Object>} Language detection result
 */
export async function detectLanguage(text) {
  try {
    if (typeof LanguageDetector === 'undefined') {
      return { language: 'en', confidence: 0.5 };
    }

    const detector = await LanguageDetector.create();
    const results = await detector.detect(text);
    detector.destroy();

    if (results && results.length > 0) {
      return {
        language: results[0].detectedLanguage,
        confidence: results[0].confidence
      };
    }

    return { language: 'en', confidence: 0.5 };
  } catch (error) {
    console.error('Language detection failed:', error);
    return { language: 'en', confidence: 0.5 };
  }
}

/**
 * Parse JSON from AI response (handles markdown wrapping)
 * @param {string} response - AI response text
 * @returns {Object} Parsed JSON object
 */
export function parseAIJSON(response) {
  try {
    const cleaned = response
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Failed to parse AI JSON response:', error);
    // console.log('Raw response:', response);
    throw new Error('Invalid JSON in AI response');
  }
}

/**
 * Custom error class for AI-related errors
 */
export class AIError extends Error {
  constructor(message, type, originalError) {
    super(message);
    this.name = 'AIError';
    this.type = type;
    this.originalError = originalError;
  }
}

/**
 * Wrap AI API calls with error handling and fallback
 * @param {Function} apiCall - Function that makes the AI API call
 * @param {Function} fallback - Fallback function if API fails
 * @returns {Promise<any>} Result from API or fallback
 */
export async function withAIErrorHandling(apiCall, fallback) {
  try {
    return await apiCall();
  } catch (error) {
    console.error('AI API call failed:', error);

    if (error.message.includes('not available')) {
      throw new AIError(
        'AI model not available. Please download it from chrome://on-device-internals',
        'unavailable',
        error
      );
    } else if (error.message.includes('rate limit')) {
      throw new AIError(
        'Too many requests. Please wait a moment.',
        'rate_limit',
        error
      );
    } else if (error.message.includes('timeout')) {
      throw new AIError(
        'Request timed out. Try again.',
        'timeout',
        error
      );
    } else {
      if (fallback) {
        console.warn('Using fallback method due to AI error');
        return await fallback();
      }
      throw error;
    }
  }
}

export default {
  createPromptSession,
  promptOnce,
  promptStreaming,
  summarizeText,
  detectLanguage,
  parseAIJSON,
  AIError,
  withAIErrorHandling
};
