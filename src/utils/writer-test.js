/**
 * Test script for Chrome Writer API quality assessment
 *
 * This tests whether the Writer API can generate genuinely insightful
 * weekly learning summaries, or if it produces generic output.
 *
 * Decision criteria: Output must be "I would personally want this" quality.
 */

/**
 * Test the Writer API with sample article data
 * @param {Array} articles - Sample articles from last 7 days
 * @param {Array} topEntities - Top 15 most frequent entities
 * @returns {Promise<{quality: string, output: string, recommendation: string}>}
 */
export async function testWriterQuality(articles, topEntities) {
  try {
    // Check if Writer API is available
    if (!window.ai || !window.ai.writer) {
      return {
        quality: 'unavailable',
        output: null,
        recommendation: 'Skip - API not available'
      };
    }

    const { available } = await window.ai.writer.capabilities();
    if (available === 'no') {
      return {
        quality: 'unavailable',
        output: null,
        recommendation: 'Skip - API not ready'
      };
    }

    // Create writer session
    const writer = await window.ai.writer.create({
      sharedContext: `You are a world-class research analyst. Your job is to synthesize a user's reading history into a concise, insightful narrative. Identify the 2-3 main themes and show how they connect. Do not just list the articles. Focus on emerging patterns, connections between concepts, and intellectual trajectory.`
    });

    // Build prompt from sample data
    const articleTitles = articles.map(a => `- ${a.title}`).join('\n');
    const entityList = topEntities.map(e => e.name).join(', ');

    const prompt = `Synthesize this week's learning into a narrative paragraph (150-200 words).

Articles captured:
${articleTitles}

Key concepts explored: ${entityList}

Write a synthesis that:
1. Identifies the 2-3 main themes
2. Shows how concepts connect across articles
3. Reveals the intellectual trajectory
4. Sounds insightful, not generic`;

    const output = await writer.write(prompt);

    // Quality assessment heuristics
    const quality = assessOutputQuality(output, articles, topEntities);

    return {
      quality,
      output,
      recommendation: quality === 'exceptional' || quality === 'good'
        ? 'Build it - output is valuable'
        : 'Skip - output too generic'
    };

  } catch (error) {
    console.error('Writer API test failed:', error);
    return {
      quality: 'error',
      output: null,
      recommendation: 'Skip - API unstable'
    };
  }
}

/**
 * Assess quality of Writer API output
 * @param {string} output - Generated text
 * @param {Array} articles - Input articles
 * @param {Array} entities - Input entities
 * @returns {string} - 'exceptional', 'good', 'mediocre', 'poor'
 */
function assessOutputQuality(output, articles, entities) {
  // Red flags (generic/poor output)
  const genericPhrases = [
    'you read about',
    'you explored',
    'this week you focused on',
    'various topics',
    'different aspects'
  ];

  const hasGenericLanguage = genericPhrases.some(phrase =>
    output.toLowerCase().includes(phrase)
  );

  // Good signs (insightful output)
  const connectiveWords = ['connects', 'relationship', 'trade-off', 'bridge', 'thread', 'tension', 'emerges'];
  const hasConnectiveLanguage = connectiveWords.some(word =>
    output.toLowerCase().includes(word)
  );

  // Check if it just lists entities
  const entityCount = entities.filter(e =>
    output.includes(e.name)
  ).length;
  const justListingEntities = entityCount > entities.length * 0.7;

  // Check for narrative depth (compound sentences)
  const sentences = output.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = output.split(/\s+/).length / sentences.length;
  const hasDepth = avgWordsPerSentence > 15; // Longer sentences = more complex ideas

  // Scoring
  if (hasConnectiveLanguage && hasDepth && !hasGenericLanguage && !justListingEntities) {
    return 'exceptional';
  } else if (hasConnectiveLanguage && !hasGenericLanguage) {
    return 'good';
  } else if (hasGenericLanguage || justListingEntities) {
    return 'poor';
  } else {
    return 'mediocre';
  }
}

/**
 * Generate sample data for testing
 * @returns {Object} - {articles, topEntities}
 */
export function generateSampleData() {
  return {
    articles: [
      {
        title: 'Chrome Built-in AI: Gemini Nano Performance Benchmarks',
        capturedAt: Date.now() - 86400000 * 1
      },
      {
        title: 'Privacy Implications of On-Device Machine Learning',
        capturedAt: Date.now() - 86400000 * 2
      },
      {
        title: 'WebAssembly for High-Performance Browser Extensions',
        capturedAt: Date.now() - 86400000 * 3
      },
      {
        title: 'Local-First Software: Seven Ideals for Distributed Systems',
        capturedAt: Date.now() - 86400000 * 4
      },
      {
        title: 'The Future of Browser APIs: AI Integration Patterns',
        capturedAt: Date.now() - 86400000 * 5
      }
    ],
    topEntities: [
      { name: 'Gemini Nano', frequency: 12 },
      { name: 'Chrome Extensions', frequency: 10 },
      { name: 'On-device AI', frequency: 9 },
      { name: 'Privacy', frequency: 8 },
      { name: 'WebAssembly', frequency: 7 },
      { name: 'Performance', frequency: 6 },
      { name: 'Local-first', frequency: 5 },
      { name: 'Browser APIs', frequency: 5 },
      { name: 'Machine Learning', frequency: 4 },
      { name: 'Distributed Systems', frequency: 4 }
    ]
  };
}
