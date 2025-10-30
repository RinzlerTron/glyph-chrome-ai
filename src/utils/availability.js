/**
 * Check if Chrome's Prompt API is available and ready
 * @returns {Promise<Object>} Availability status object
 */
export async function checkPromptAPIAvailability() {
  try {
    if (typeof LanguageModel === 'undefined') {
      return {
        available: false,
        status: 'not_supported',
        reason: 'Prompt API not available in this Chrome version',
        action: 'Update to Chrome 128+ or enable chrome://flags/#prompt-api-for-gemini-nano'
      };
    }

    const status = await LanguageModel.availability();

    return {
      available: status === 'readily' || status === 'available',
      status: status,
      needsDownload: status === 'after-download' || status === 'downloadable',
      downloading: status === 'downloading',
      reason: status === 'readily' || status === 'available'
        ? 'Prompt API ready'
        : `Model status: ${status}`,
      action: status === 'after-download' || status === 'downloadable'
        ? 'Model needs to be downloaded. Visit chrome://on-device-internals'
        : null
    };
  } catch (error) {
    console.error('Error checking Prompt API availability:', error);
    return {
      available: false,
      status: 'error',
      reason: error.message,
      action: 'Check browser console for details'
    };
  }
}

/**
 * Check if Chrome's Summarizer API is available and ready
 * @returns {Promise<Object>} Availability status object
 */
export async function checkSummarizerAvailability() {
  try {
    if (typeof Summarizer === 'undefined') {
      return {
        available: false,
        status: 'not_supported',
        reason: 'Summarizer API not available in this Chrome version',
        action: 'Update to Chrome 128+'
      };
    }

    const status = await Summarizer.availability();

    return {
      available: status === 'readily' || status === 'available',
      status: status,
      needsDownload: status === 'after-download' || status === 'downloadable',
      downloading: status === 'downloading',
      reason: status === 'readily' || status === 'available'
        ? 'Summarizer API ready'
        : `Model status: ${status}`,
      action: status === 'after-download' || status === 'downloadable'
        ? 'Model needs to be downloaded'
        : null
    };
  } catch (error) {
    console.error('Error checking Summarizer API availability:', error);
    return {
      available: false,
      status: 'error',
      reason: error.message,
      action: 'Check browser console for details'
    };
  }
}

/**
 * Check if Chrome's Language Detector API is available
 * @returns {Promise<Object>} Availability status object
 */
export async function checkLanguageDetectorAvailability() {
  try {
    if (typeof LanguageDetector === 'undefined') {
      return {
        available: false,
        status: 'not_supported',
        reason: 'Language Detector API not available',
        action: 'Update to Chrome 128+'
      };
    }

    const status = await LanguageDetector.availability();

    return {
      available: status === 'readily' || status === 'available',
      status: status,
      reason: status === 'readily' || status === 'available'
        ? 'Language Detector ready'
        : `Status: ${status}`,
      languagesSupported: []
    };
  } catch (error) {
    console.error('Error checking Language Detector availability:', error);
    return {
      available: false,
      status: 'error',
      reason: error.message,
      action: 'Language detection may not work'
    };
  }
}

/**
 * Check availability of all AI APIs
 * @returns {Promise<Object>} Combined availability status
 */
export async function checkAllAIAvailability() {
  const [prompt, summarizer, languageDetector] = await Promise.all([
    checkPromptAPIAvailability(),
    checkSummarizerAvailability(),
    checkLanguageDetectorAvailability()
  ]);

  const allReady = prompt.available && summarizer.available && languageDetector.available;

  return {
    allReady,
    prompt,
    summarizer,
    languageDetector,
    message: allReady
      ? 'All AI APIs are ready'
      : 'Some AI APIs are not available. Extension will use fallback methods.'
  };
}

/**
 * Wait for AI model to become available (with timeout)
 * @param {Function} checkFunction - Availability check function
 * @param {number} timeoutMs - Maximum wait time in milliseconds
 * @param {number} pollIntervalMs - Check interval in milliseconds
 * @returns {Promise<boolean>} True if became available, false if timeout
 */
export async function waitForAIAvailability(
  checkFunction,
  timeoutMs = 30000,
  pollIntervalMs = 1000
) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    const status = await checkFunction();

    if (status.available) {
      return true;
    }

    if (status.status === 'not_supported' || status.status === 'error') {
      return false;
    }

    await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
  }

  return false;
}

export default {
  checkPromptAPIAvailability,
  checkSummarizerAvailability,
  checkLanguageDetectorAvailability,
  checkAllAIAvailability,
  waitForAIAvailability
};
