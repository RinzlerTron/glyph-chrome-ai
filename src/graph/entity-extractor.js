// Entity extraction from article text using Chrome's Prompt API
import { promptOnce, summarizeText, parseAIJSON, withAIErrorHandling } from '../utils/ai-helpers.js';
import { AI_CONFIG, ENTITY_TYPES } from '../utils/constants.js';
import { truncateText, extractKeywords } from '../utils/text-processing.js';

// System prompt for entity extraction
const ENTITY_EXTRACTION_SYSTEM_PROMPT = `You are an expert at extracting key entities from articles.
Extract the most important entities mentioned in the text.

Entity types:
- person: Individual people (e.g., "Elon Musk", "Marie Curie")
- company: Organizations and companies (e.g., "Google", "NASA")
- technology: Technologies, tools, frameworks (e.g., "Gemini", "React", "Quantum Computing")
- concept: Ideas, theories, methodologies (e.g., "Machine Learning", "Climate Change")

IMPORTANT - Do NOT extract:
- Pronouns, demonstratives, or grammar words (this, that, these, those, it, he, she, they)
- Generic nouns (thing, stuff, way, type, kind, people, person)
- Time references (year, day, week, month, time)
- Vague descriptors (new, old, good, bad, great, small, large)
- Common verbs or adjectives used alone
- Single-letter entities or numbers
- Generic processes (system, method, process, approach)

Only extract SPECIFIC, NAMED entities that are meaningful and relevant.

Return ONLY valid JSON, no markdown formatting, no explanation.
Focus on entities relevant to the user's interests.`;

/**
 * Extract entities from article text using AI
 * @param {string} articleText - Full article text
 * @param {Array<string>} userTopics - User's topics of interest
 * @returns {Promise<Array<Object>>} Extracted entities
 */
export async function extractEntities(articleText, userTopics = []) {
  const truncatedText = truncateText(articleText, AI_CONFIG.MAX_ARTICLE_CHARS);

  const userPrompt = buildExtractionPrompt(truncatedText, userTopics);

  try {
    return await withAIErrorHandling(
      async () => {
        const response = await promptOnce(
          ENTITY_EXTRACTION_SYSTEM_PROMPT,
          userPrompt,
          { temperature: AI_CONFIG.ENTITY_EXTRACTION_TEMPERATURE }
        );

        const entities = parseAIJSON(response);

        return validateAndFilterEntities(entities, userTopics);
      },
      async () => {
        console.warn('AI extraction failed, using fallback keyword extraction');
        return fallbackKeywordExtraction(articleText, userTopics);
      }
    );
  } catch (error) {
    console.error('Entity extraction completely failed:', error);
    return fallbackKeywordExtraction(articleText, userTopics);
  }
}

/**
 * Extract entities from article with summarization for long texts
 * @param {string} articleText - Full article text
 * @param {Array<string>} userTopics - User's topics of interest
 * @returns {Promise<Array<Object>>} Extracted entities
 */
export async function extractEntitiesWithSummarization(articleText, userTopics = []) {
  let textToProcess = articleText;

  if (articleText.length > AI_CONFIG.MAX_ARTICLE_CHARS) {
    // console.log('Article is long, summarizing first...');
    try {
      const summary = await summarizeText(articleText, {
        type: 'key-points',
        length: 'medium'
      });
      textToProcess = summary;
    } catch (error) {
      console.error('Summarization failed, using truncated text:', error);
      textToProcess = truncateText(articleText, AI_CONFIG.MAX_ARTICLE_CHARS);
    }
  }

  return extractEntities(textToProcess, userTopics);
}

/**
 * Build the user prompt for entity extraction
 * @param {string} text - Article text
 * @param {Array<string>} topics - User topics
 * @returns {string} Formatted prompt
 */
function buildExtractionPrompt(text, topics) {
  const topicsText = topics.length > 0
    ? topics.join(', ')
    : 'general knowledge';

  return `Article text:
${text}

User interests: ${topicsText}

Extract up to ${AI_CONFIG.MAX_ENTITIES_PER_ARTICLE} most relevant entities.

Return JSON array in this exact format:
[
  {
    "name": "Entity Name",
    "type": "person|company|technology|concept",
    "relevance": 0.8,
    "context": "Brief context from article (one sentence)"
  }
]

Focus on entities related to: ${topicsText}`;
}

/**
 * Validate and filter extracted entities
 * @param {Array<Object>} entities - Raw entities from AI
 * @param {Array<string>} userTopics - User topics for relevance
 * @returns {Array<Object>} Validated entities
 */
function validateAndFilterEntities(entities, userTopics) {
  if (!Array.isArray(entities)) {
    throw new Error('Entity extraction did not return an array');
  }

  const validEntityTypes = Object.values(ENTITY_TYPES);

  const stopwords = new Set([
    // Pronouns
    'i', 'me', 'my', 'mine', 'myself',
    'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself',
    'she', 'her', 'hers', 'herself',
    'it', 'its', 'itself',
    'we', 'us', 'our', 'ours', 'ourselves',
    'they', 'them', 'their', 'theirs', 'themselves',
    // Demonstratives
    'this', 'that', 'these', 'those',
    // Interrogatives
    'which', 'what', 'who', 'whom', 'whose', 'when', 'where', 'why', 'how',
    // Quantifiers
    'some', 'any', 'many', 'few', 'several', 'most', 'all', 'each', 'every',
    'much', 'more', 'less', 'little', 'lot', 'none', 'both', 'either', 'neither',
    // Common generics
    'other', 'another', 'such', 'same', 'different', 'various', 'certain',
    'example', 'examples', 'thing', 'things', 'stuff', 'item', 'items',
    'way', 'ways', 'type', 'types', 'kind', 'kinds', 'sort', 'sorts',
    'people', 'person', 'someone', 'anyone', 'everyone', 'no one', 'nobody',
    'something', 'anything', 'everything', 'nothing',
    'time', 'times', 'year', 'years', 'day', 'days', 'week', 'weeks', 'month', 'months',
    'part', 'parts', 'piece', 'pieces', 'portion', 'section', 'segment',
    'place', 'places', 'area', 'areas', 'location', 'locations',
    'number', 'numbers', 'amount', 'amounts', 'quantity', 'quantities',
    // Articles and determiners
    'the', 'a', 'an', 'some', 'any',
    // Common verbs (often extracted by mistake)
    'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'having',
    'do', 'does', 'did', 'doing', 'done',
    'can', 'could', 'will', 'would', 'should', 'may', 'might', 'must',
    'get', 'gets', 'got', 'getting', 'make', 'makes', 'made', 'making',
    'go', 'goes', 'went', 'going', 'come', 'comes', 'came', 'coming',
    'take', 'takes', 'took', 'taking', 'use', 'uses', 'used', 'using',
    'find', 'finds', 'found', 'finding', 'give', 'gives', 'gave', 'giving',
    'tell', 'tells', 'told', 'telling', 'work', 'works', 'worked', 'working',
    'call', 'calls', 'called', 'calling', 'try', 'tries', 'tried', 'trying',
    'ask', 'asks', 'asked', 'asking', 'need', 'needs', 'needed', 'needing',
    'feel', 'feels', 'felt', 'feeling', 'become', 'becomes', 'became', 'becoming',
    'leave', 'leaves', 'left', 'leaving', 'put', 'puts', 'putting',
    // Common adjectives (too vague alone)
    'new', 'old', 'good', 'bad', 'great', 'small', 'large', 'big', 'little',
    'high', 'low', 'long', 'short', 'early', 'late', 'young', 'old',
    'important', 'possible', 'available', 'likely', 'able', 'free',
    'sure', 'certain', 'clear', 'whole', 'full', 'real', 'true', 'false',
    'better', 'best', 'worse', 'worst', 'less', 'more', 'least', 'most',
    // Generic nouns (too broad)
    'system', 'systems', 'process', 'processes', 'method', 'methods',
    'issue', 'issues', 'problem', 'problems', 'solution', 'solutions',
    'information', 'data', 'result', 'results', 'fact', 'facts',
    'idea', 'ideas', 'thought', 'thoughts', 'view', 'views',
    'point', 'points', 'case', 'cases', 'question', 'questions',
    'answer', 'answers', 'reason', 'reasons', 'cause', 'causes',
    'effect', 'effects', 'change', 'changes', 'difference', 'differences',
    'group', 'groups', 'level', 'levels', 'order', 'orders',
    'form', 'forms', 'state', 'states', 'line', 'lines',
    'side', 'sides', 'end', 'ends', 'beginning', 'start',
    'matter', 'matters', 'sense', 'senses', 'purpose', 'purposes',
    // Adverbs
    'very', 'really', 'quite', 'too', 'so', 'just', 'only', 'even',
    'well', 'also', 'still', 'never', 'always', 'often', 'sometimes',
    'here', 'there', 'now', 'then', 'today', 'yesterday', 'tomorrow',
    'up', 'down', 'out', 'in', 'off', 'on', 'over', 'under',
    // Prepositions and conjunctions
    'of', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'about',
    'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
    'between', 'among', 'against', 'without', 'within',
    'and', 'or', 'but', 'if', 'because', 'while', 'although', 'unless',
    // Common filler words
    'etc', 'et cetera', 'versus', 'via', 'per', 'ie', 'eg', 'aka',
    // Vague business/tech terms
    'approach', 'strategy', 'model', 'framework', 'concept', 'theory',
    'practice', 'technique', 'tool', 'feature', 'option', 'aspect',
    'factor', 'element', 'component', 'detail', 'details',
    'overview', 'summary', 'introduction', 'conclusion',
    // Single letters and digits
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
  ]);

  const MIN_RELEVANCE_THRESHOLD = 0.3;

  return entities
    .filter(entity => {
      if (!entity.name || typeof entity.name !== 'string') return false;
      if (!entity.type || !validEntityTypes.includes(entity.type)) return false;
      if (entity.name.length < 2 || entity.name.length > 100) return false;

      const nameLower = entity.name.toLowerCase().trim();
      if (stopwords.has(nameLower)) return false;

      const words = nameLower.split(/\s+/);
      if (words.every(word => stopwords.has(word))) return false;

      if (!/[a-zA-Z]/.test(entity.name)) return false;

      const relevance = entity.relevance || 0.5;
      if (relevance < MIN_RELEVANCE_THRESHOLD) return false;

      return true;
    })
    .map(entity => ({
      name: entity.name.trim(),
      type: entity.type,
      relevance: Math.max(0, Math.min(1, entity.relevance || 0.5)),
      context: entity.context || '',
      topic: assignTopic(entity, userTopics)
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, AI_CONFIG.MAX_ENTITIES_PER_ARTICLE);
}

/**
 * Assign a topic to an entity based on user interests
 * @param {Object} entity - Entity object
 * @param {Array<string>} userTopics - User's topics
 * @returns {string} Assigned topic
 */
function assignTopic(entity, userTopics) {
  if (userTopics.length === 0) return 'General';

  const entityText = `${entity.name} ${entity.context}`.toLowerCase();

  for (const topic of userTopics) {
    if (entityText.includes(topic.toLowerCase())) {
      return topic;
    }
  }

  return userTopics[0];
}

/**
 * Fallback keyword extraction when AI is unavailable
 * @param {string} text - Article text
 * @param {Array<string>} userTopics - User topics
 * @returns {Array<Object>} Extracted entities
 */
function fallbackKeywordExtraction(text, userTopics) {
  const keywords = extractKeywords(text, AI_CONFIG.MAX_ENTITIES_PER_ARTICLE);

  return keywords.map(keyword => ({
    name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
    type: ENTITY_TYPES.CONCEPT,
    relevance: 0.5,
    context: 'Extracted by keyword frequency',
    topic: userTopics[0] || 'General'
  }));
}

/**
 * Batch extract entities from multiple articles
 * @param {Array<Object>} articles - Array of article objects
 * @param {Array<string>} userTopics - User topics
 * @returns {Promise<Array<Object>>} Results for each article
 */
export async function batchExtractEntities(articles, userTopics) {
  const results = [];

  for (const article of articles) {
    try {
      const entities = await extractEntitiesWithSummarization(
        article.text,
        userTopics
      );

      results.push({
        articleId: article.id,
        success: true,
        entities: entities,
        count: entities.length
      });
    } catch (error) {
      console.error(`Failed to extract entities from article ${article.id}:`, error);
      results.push({
        articleId: article.id,
        success: false,
        error: error.message,
        entities: []
      });
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return results;
}

export default {
  extractEntities,
  extractEntitiesWithSummarization,
  batchExtractEntities
};
