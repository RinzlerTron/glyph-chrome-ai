import { getGraphStore } from '../storage/graph-store.js';
import { getGraphEngine } from '../graph/graph-engine.js';
import { extractEntitiesWithSummarization } from '../graph/entity-extractor.js';
import { discoverAllRelationships } from '../graph/relationship-finder.js';
import { checkAllAIAvailability } from '../utils/availability.js';
import { createEntity, createArticle } from '../utils/helpers.js';
import { populateMockData } from '../utils/mock-data.js';
import { testWriterQuality, generateSampleData } from '../utils/writer-test.js';
import { promptOnce } from '../utils/ai-helpers.js';

// Initialize extension on install/startup
chrome.runtime.onInstalled.addListener(() => {
  initializeExtension();
  setupContextMenus();
});

async function initializeExtension() {
  try {
    const store = await getGraphStore();
    const settings = await store.getSettings();
    if (!settings.id) {
      await store.updateSettings(settings);
    }

    await checkAllAIAvailability();
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}

// Setup context menus for right-click capture
function setupContextMenus() {
  chrome.contextMenus.create({
    id: 'captureArticle',
    title: 'Capture Insights with Glyph',
    contexts: ['page']
  });

  chrome.contextMenus.create({
    id: 'captureImage',
    title: 'Extract from Image',
    contexts: ['image']
  });

  chrome.contextMenus.create({
    id: 'captureAllTabs',
    title: 'Capture All Tabs',
    contexts: ['page']
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'captureArticle') {
    captureCurrentTab(tab);
  } else if (info.menuItemId === 'captureImage') {
    captureImage(info.srcUrl, tab);
  } else if (info.menuItemId === 'captureAllTabs') {
    captureAllOpenTabs();
  }
});

// Badge removed - ambient intelligence, not notifications

// Message handler for communication with popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender)
    .then(response => sendResponse(response))
    .catch(error => {
      console.error('Message handler error:', error);
      sendResponse({ success: false, error: error.message });
    });

  return true; // Keep channel open for async
});

async function handleMessage(message, sender) {
  switch (message.type) {
    case 'GET_GRAPH_DATA':
      return await getGraphData();

    case 'CHECK_DUPLICATE':
      return await checkForDuplicate(message.data);

    case 'CAPTURE_ARTICLE':
      return await captureArticle(message.data);

    case 'GET_SETTINGS':
      return await getSettings();

    case 'UPDATE_SETTINGS':
      return await updateSettings(message.data);

    case 'CHECK_AI_STATUS':
      return await checkAIAvailability();

    case 'GET_STATISTICS':
      return await getStatistics();

    case 'LOAD_MOCK_DATA':
      return await loadMockData(message.entityCount);

    case 'QUERY_GRAPH':
      return await queryGraph(message.query, message.graphData);

    case 'QUERY_KNOWLEDGE':
      return await queryKnowledge(message.query);

    case 'ANSWER_ENTITY_QUESTION':
      return await answerEntityQuestion(message.entityId, message.questionType);

    case 'CAPTURE_CURRENT_TAB':
      return await captureCurrentTab(message.tab);

    case 'CAPTURE_IMAGE':
      return await captureImage(message.imageUrl, message.tab);

    case 'CAPTURE_ALL_TABS':
      return await captureAllOpenTabs();

    case 'DISCOVER_RELATIONSHIPS':
      return await discoverAllRelationships();

    case 'GET_ALL_ARTICLES':
      return await getAllArticles();

    case 'DELETE_ARTICLE':
      return await deleteArticle(message.articleId);

    case 'CLEAR_ALL_DATA':
      return await clearAllData();

    case 'TEST_WRITER_API':
      return await testWriterAPI();

    case 'SYNTHESIZE_WEEK':
      synthesizeWeekBackground();
      return {
        success: true,
        message: 'Synthesis started in background. Check back in a few moments.'
      };

    case 'GET_ALL_SYNTHESES':
      return await getAllSyntheses();

    case 'GET_LATEST_SYNTHESIS':
      return await getLatestSynthesis();

    case 'ANALYZE_PAGE_FOR_INSIGHTS':
      return await analyzePageForInsights(message.data);

    case 'OPEN_GRAPH_PAGE':
      return await openGraphPage(message.articleId);

    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
}

async function getGraphData() {
  try {
    const store = await getGraphStore();
    const entities = await store.getAllEntities();
    const relationships = await store.getAllRelationships();

    const nodes = entities.map(entity => ({
      id: entity.id,
      name: entity.name,
      type: entity.type,
      topic: entity.topic,
      relevance: entity.relevance
    }));

    const links = relationships.map(rel => ({
      id: rel.id,
      source: rel.source,
      target: rel.target,
      type: rel.type,
      strength: rel.strength,
      description: rel.description
    }));

    return { success: true, data: { nodes, links } };
  } catch (error) {
    console.error('Failed to get graph data:', error);
    throw error;
  }
}

// URL-specific capture locks to prevent duplicate processing while allowing parallel captures
const captureQueue = new Set();

async function captureArticle(data) {
  try {
    // Check if this specific URL is already being processed
    if (captureQueue.has(data.url)) {
      console.log(`[DEBUG] 🚫 CAPTURE BLOCKED - This URL is already being processed: ${data.url}`);
      return { success: false, error: 'This article is already being processed' };
    }

    // Add URL to processing queue (allows parallel processing of different URLs)
    captureQueue.add(data.url);
    console.log(`[DEBUG] 🔒 CAPTURE STARTED for: ${data.url} (${captureQueue.size} total captures running)`);

    const store = await getGraphStore();
    const settings = await store.getSettings();
    const userTopics = settings.topics || [];

    // Skip duplicate checking here - popup already handled it with user confirmation
    console.log(`[DEBUG] Processing article (duplicate check handled by popup): ${data.url}`);

    notifyProcessingStatus('Analyzing article...', true);

    // Extract entities with AI
    notifyProcessingStatus('Extracting entities with AI...', true);
    const extractedEntities = await extractEntitiesWithSummarization(
      data.text,
      userTopics
    );

    console.log(`[DEBUG] 🤖 AI extracted ${extractedEntities.length} entities from article`);

    // Create article record
    const articleId = generateTempUUID();
    const article = createArticle(
      data.url,
      data.title,
      data.text,
      '', // Summary will be added later if needed
      data.language || 'en',
      []
    );
    article.id = articleId;

    // console.log(`Extracted ${extractedEntities.length} entities:`, extractedEntities);

    // Store entities and link to article
    notifyProcessingStatus('Storing entities...', true);
    const entityIds = [];

    for (const entityData of extractedEntities) {
      const entity = createEntity(
        entityData.name,
        entityData.type,
        entityData.topic || userTopics[0] || 'General',
        entityData.context
      );
      entity.sources = [articleId];
      entity.relevance = entityData.relevance || 0.5;

      try {
        const storedId = await store.addEntity(entity);
        entityIds.push(storedId || entity.id);
      } catch (error) {
        console.error('Failed to store entity:', entity.name, error);
      }
    }

    // Update article with entity references
    article.entities = entityIds;
    await store.addArticle(article);

    // Reload graph engine cache
    notifyProcessingStatus('Updating knowledge graph...', true);
    const engine = await getGraphEngine();
    await engine.loadGraph();

    // Discover relationships automatically every 5 articles (less frequent for performance)
    const allArticles = await store.getAllArticles();
    if (allArticles.length % 5 === 0 && allArticles.length > 0) {
      // Run relationship discovery in background after capture completes to not block
      setTimeout(async () => {
        try {
          await discoverAllRelationships();
          await engine.reloadGraph();
          chrome.runtime.sendMessage({ type: 'GRAPH_UPDATED' }).catch(() => {});
        } catch (error) {
          console.error('Background relationship discovery failed:', error);
        }
      }, 1000); // 1 second delay
    }

    // Notify popup to refresh
    chrome.runtime.sendMessage({ type: 'GRAPH_UPDATED' }).catch(() => {});

    notifyProcessingStatus('Article captured successfully!', false);

    // Cleanup: remove URL from processing queue
    captureQueue.delete(data.url);
    console.log(`[DEBUG] 🔓 CAPTURE COMPLETED for: ${data.url} (${captureQueue.size} captures still running)`);

    return {
      success: true,
      articleId: article.id,
      entityCount: extractedEntities.length,
      entities: extractedEntities.map(e => e.name)
    };
  } catch (error) {
    console.error('Article capture failed:', error);
    notifyProcessingStatus(`Error: ${error.message}`, false);

    // Cleanup: remove URL from processing queue even on error
    captureQueue.delete(data.url);
    console.log(`[DEBUG] 🔓 CAPTURE FAILED for: ${data.url} - ${error.message} (${captureQueue.size} captures still running)`);

    throw error;
  }
}

async function getSettings() {
  try {
    const store = await getGraphStore();
    const settings = await store.getSettings();
    return { success: true, settings };
  } catch (error) {
    console.error('Failed to get settings:', error);
    throw error;
  }
}

async function updateSettings(newSettings) {
  try {
    const store = await getGraphStore();
    await store.updateSettings(newSettings);
    return { success: true };
  } catch (error) {
    console.error('Failed to update settings:', error);
    throw error;
  }
}

async function checkAIAvailability() {
  try {
    const status = await checkAllAIAvailability();
    return { success: true, status };
  } catch (error) {
    console.error('Error checking AI availability:', error);
    return {
      success: false,
      error: error.message,
      status: {
        prompt: { available: false, status: 'error' },
        summarizer: { available: false, status: 'error' },
        languageDetector: { available: false, status: 'error' }
      }
    };
  }
}

async function getStatistics() {
  try {
    const store = await getGraphStore();
    const stats = await store.getStatistics();
    return { success: true, statistics: stats };
  } catch (error) {
    console.error('Failed to get statistics:', error);
    throw error;
  }
}

async function getAllArticles() {
  try {
    const store = await getGraphStore();
    const articles = await store.getAllArticles();
    return { success: true, articles };
  } catch (error) {
    console.error('Failed to get articles:', error);
    throw error;
  }
}

async function deleteArticle(articleId) {
  try {
    const store = await getGraphStore();

    // Get article to find its entities
    const article = await store.getArticle(articleId);
    if (!article) {
      throw new Error('Article not found');
    }

    // Delete the article
    await store.db.delete('articles', articleId);

    // Clean up orphaned entities (entities only linked to this article)
    const allArticles = await store.getAllArticles();
    for (const entityId of article.entities || []) {
      const entity = await store.getEntity(entityId);
      if (entity && entity.sources.length === 1 && entity.sources[0] === articleId) {
        // This entity is only linked to the deleted article
        await store.db.delete('entities', entityId);

        // Clean up relationships involving this entity
        const relationships = await store.getAllRelationships();
        for (const rel of relationships) {
          if (rel.source === entityId || rel.target === entityId) {
            await store.db.delete('relationships', rel.id);
          }
        }
      }
    }

    // Reload graph engine
    const engine = await getGraphEngine();
    await engine.reloadGraph();

    // Update badge
    await 
    // Notify UI
    chrome.runtime.sendMessage({ type: 'GRAPH_UPDATED' }).catch(() => {});

    return { success: true };
  } catch (error) {
    console.error('Failed to delete article:', error);
    throw error;
  }
}

async function clearAllData() {
  try {
    const store = await getGraphStore();
    await store.clearAllData();

    // Reload graph engine
    const engine = await getGraphEngine();
    await engine.reloadGraph();

    // Update badge
    await 
    // Notify UI
    chrome.runtime.sendMessage({ type: 'GRAPH_UPDATED' }).catch(() => {});

    return { success: true };
  } catch (error) {
    console.error('Failed to clear data:', error);
    throw error;
  }
}

function notifyProcessingStatus(status, processing) {
  chrome.runtime.sendMessage({
    type: 'PROCESSING_STATUS',
    status: status,
    processing: processing
  }).catch(() => {
    // Popup might not be open, ignore error
  });
}

function generateTempUUID() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}


async function loadMockData(entityCount = 50) {
  try {
    notifyProcessingStatus('Loading mock data...', true);

    const store = await getGraphStore();
    const stats = await populateMockData(store, entityCount);

    // Reload graph engine
    const engine = await getGraphEngine();
    await engine.reloadGraph();

    // Notify popup to refresh
    chrome.runtime.sendMessage({ type: 'GRAPH_UPDATED' }).catch(() => {});

    notifyProcessingStatus('Mock data loaded successfully!', false);

    return {
      success: true,
      stats
    };
  } catch (error) {
    console.error('Failed to load mock data:', error);
    notifyProcessingStatus(`Error loading mock data: ${error.message}`, false);
    throw error;
  }
}
// Additional service worker functions for new features
// This will be appended to service-worker.js

// Capture current tab (context menu or icon click)
async function captureCurrentTab(tab) {
  try {
    // Simple processing indicator - just show something is happening
    chrome.action.setBadgeText({ text: '...' });
    chrome.action.setBadgeBackgroundColor({ color: '#FFA500' }); // Orange

    // Update capture status for popup
    await chrome.storage.local.set({
      capturingStatus: {
        active: true,
        progress: 'Extracting article content...'
      }
    });

    // Notify popup that processing started
    chrome.runtime.sendMessage({
      type: 'PROCESSING_STATUS',
      status: 'Extracting article content...',
      processing: true
    }).catch(() => {});

    // Notify extension page that article processing started
    chrome.runtime.sendMessage({
      type: 'ARTICLE_PROCESSING_STARTED',
      article: {
        url: tab.url,
        title: 'Processing...',
        processing: true,
        timestamp: Date.now()
      }
    }).catch(() => {});

    // Inject content script if needed and get article content
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractArticleContent
    });

    const articleData = results[0]?.result;

    if (!articleData || !articleData.text) {
      throw new Error('No article content found on this page');
    }

    // Update popup status
    chrome.runtime.sendMessage({
      type: 'PROCESSING_STATUS',
      status: `Extracting entities... (${articleData.text.length} characters)`,
      processing: true
    }).catch(() => {});

    // Update processing status with actual article title
    chrome.runtime.sendMessage({
      type: 'ARTICLE_PROCESSING_UPDATED',
      article: {
        url: tab.url,
        title: articleData.title,
        processing: true,
        timestamp: Date.now()
      }
    }).catch(() => {});

    // Update progress
    await chrome.storage.local.set({
      capturingStatus: {
        active: true,
        progress: `Extracting entities... (${articleData.text.length} characters)`
      }
    });

    // Capture article (this will run in background)
    const result = await captureArticle(articleData);

    // Reset badge to normal (clear processing indicator)
    chrome.action.setBadgeText({ text: '' });

    // Clear capturing status
    await chrome.storage.local.set({
      capturingStatus: { active: false }
    });

    // Notify popup that processing completed
    chrome.runtime.sendMessage({
      type: 'PROCESSING_STATUS',
      status: `Complete! Extracted ${result.entityCount} entities`,
      processing: false
    }).catch(() => {});

    // Notify extension page that processing completed
    chrome.runtime.sendMessage({
      type: 'ARTICLE_PROCESSING_COMPLETE',
      article: {
        url: tab.url,
        title: articleData.title,
        processing: false,
        entities: result.entityCount
      }
    }).catch(() => {});

    // Notify popup of completion
    chrome.runtime.sendMessage({
      type: 'CAPTURE_COMPLETE',
      entities: result.entityCount,
      total: (await getStatistics()).statistics.totalEntities
    }).catch(() => {});

    // Notify extension page to refresh
    chrome.runtime.sendMessage({
      type: 'GRAPH_UPDATED'
    }).catch(() => {});

    return result;
  } catch (error) {
    console.error('Capture failed:', error);

    // Reset badge to normal (clear processing indicator)
    chrome.action.setBadgeText({ text: '' });

    // Notify popup of error
    chrome.runtime.sendMessage({
      type: 'PROCESSING_STATUS',
      status: `Failed: ${error.message}`,
      processing: false
    }).catch(() => {});

    // Clear capturing status
    await chrome.storage.local.set({
      capturingStatus: { active: false }
    });

    throw error;
  }
}

// Function injected into page to extract article content
function extractArticleContent() {
  // Try to find article content
  const selectors = [
    'article',
    '[role="article"]',
    'main article',
    '.article-content',
    '.post-content',
    '.entry-content'
  ];

  let article = null;
  for (const selector of selectors) {
    article = document.querySelector(selector);
    if (article) break;
  }

  // Fallback to body if no article found
  const content = article || document.body;

  // Extract text
  const title = document.title;
  const text = content.innerText || content.textContent;

  return {
    url: window.location.href,
    title: title,
    text: text.trim(),
    language: document.documentElement.lang || 'en'
  };
}

// Removed complex icon indicator logic - keeping it simple

// Get current active tab
async function getCurrentTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

// Capture image with multimodal AI
async function captureImage(imageUrl, tab) {
  try {
    // console.log('Capturing image:', imageUrl);

    // Download image
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Convert to File
    const file = new File([blob], 'image.jpg', { type: blob.type });

    // Extract entities from image using multimodal Prompt API
    const entities = await extractEntitiesFromImage(file, tab.url);

    if (entities.length > 0) {
      // Store entities
      const store = await getGraphStore();
      for (const entityData of entities) {
        const entity = createEntity(
          entityData.name,
          entityData.type,
          entityData.topic || 'General',
          `From image: ${imageUrl}`
        );
        entity.sources = [tab.url];
        entity.metadata.imageSource = imageUrl;

        await store.addEntity(entity);
      }

      // Update badge
      await 
      // Notify
      chrome.notifications.create({
        type: 'basic',
        iconUrl: '/icons/icon128.ico',
        title: 'Image Saved',
        message: `Found ${entities.length} entities in image`
      });
    }

    return { success: true, entityCount: entities.length };
  } catch (error) {
    console.error('Image capture failed:', error);
    throw error;
  }
}

// Extract entities from image using multimodal Prompt API
async function extractEntitiesFromImage(imageFile, sourceUrl) {
  try {
    // Check if multimodal is available
    if (typeof LanguageModel === 'undefined') {
      throw new Error('Prompt API not available');
    }

    // Create session with multimodal support
    const session = await LanguageModel.create({
      systemPrompt: 'You extract entities from images. Return JSON only.',
      expectedInputs: [
        { type: 'image' },
        { type: 'text' }
      ]
    });

    // Append image
    await session.append([{
      role: 'user',
      content: [
        { type: 'image', value: imageFile },
        {
          type: 'text',
          value: `Extract key entities from this image.
Return JSON array: [{"name": "Entity Name", "type": "person|company|technology|concept", "relevance": 0.8}]`
        }
      ]
    }]);

    // Get response
    const response = await session.prompt('List the entities as JSON.');

    // Parse
    const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const entities = JSON.parse(cleaned);

    session.destroy();

    return entities;
  } catch (error) {
    console.error('Image entity extraction failed:', error);
    return []; // Fallback to empty
  }
}

// Capture all open tabs
async function captureAllOpenTabs() {
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });

    let successCount = 0;
    let totalEntities = 0;

    for (const tab of tabs) {
      try {
        // Skip chrome:// and extension pages
        if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
          continue;
        }

        const result = await captureCurrentTab(tab);
        successCount++;
        totalEntities += result.entityCount;

        // Small delay between captures
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Failed to capture tab ${tab.url}:`, error);
      }
    }

    chrome.notifications.create({
      type: 'basic',
      iconUrl: '/icons/icon128.ico',
      title: 'Bulk Capture Complete',
      message: `Captured ${successCount} tabs, extracted ${totalEntities} entities`
    });

    return { success: true, tabCount: successCount, entityCount: totalEntities };
  } catch (error) {
    console.error('Bulk capture failed:', error);
    throw error;
  }
}

// Handle graph queries for chat feature
async function queryGraph(query, graphData) {
  try {
    // Build context from graph
    const context = buildQueryContext(query, graphData);

    // Use Prompt API to answer
    if (typeof LanguageModel === 'undefined') {
      throw new Error('Prompt API not available');
    }

    const session = await LanguageModel.create({
      systemPrompt: 'You answer questions about a knowledge graph. Be concise and factual.',
      temperature: 0.5,
      topK: 40
    });

    const prompt = `Knowledge graph context:
${context}

Question: ${query}

Answer in 2-3 sentences based only on the context provided.`;

    const answer = await session.prompt(prompt);
    session.destroy();

    // Polish with Rewriter if available
    let polished = answer;
    if (typeof Rewriter !== 'undefined') {
      try {
        const rewriter = await Rewriter.create({
          tone: 'neutral',
          length: 'as-is'
        });
        polished = await rewriter.rewrite(answer);
        rewriter.destroy();
      } catch (error) {
        // console.log('Rewriter not available, using raw response');
      }
    }

    return { success: true, answer: polished };
  } catch (error) {
    console.error('Query failed:', error);
    return { success: false, error: error.message };
  }
}

// Query knowledge base with full database access
async function queryKnowledge(query) {
  try {
    const store = await getGraphStore();
    const entities = await store.getAllEntities();
    const relationships = await store.getAllRelationships();
    const articles = await store.getAllArticles();

    // Build comprehensive context
    const queryLower = query.toLowerCase();
    const relevantEntities = entities.filter(e =>
      queryLower.includes(e.name.toLowerCase()) ||
      e.name.toLowerCase().includes(queryLower) ||
      e.context?.toLowerCase().includes(queryLower)
    );

    let context = `Knowledge Base Summary:\n`;
    context += `Total: ${entities.length} entities, ${relationships.length} relationships, ${articles.length} articles\n\n`;

    if (relevantEntities.length > 0) {
      context += `Relevant Entities:\n`;
      for (const entity of relevantEntities.slice(0, 10)) {
        context += `- ${entity.name} (${entity.type})\n`;
        if (entity.context) context += `  Context: ${entity.context.slice(0, 100)}\n`;

        // Find relationships
        const rels = relationships.filter(r =>
          r.source === entity.id || r.target === entity.id
        );

        if (rels.length > 0) {
          const connectedNames = rels.slice(0, 3).map(r => {
            const otherId = r.source === entity.id ? r.target : r.source;
            const other = entities.find(e => e.id === otherId);
            return other ? other.name : null;
          }).filter(Boolean);

          if (connectedNames.length > 0) {
            context += `  Connected to: ${connectedNames.join(', ')}\n`;
          }
        }
      }
    } else {
      // If no direct matches, provide general info about all entities
      const entitySummary = entities.slice(0, 20).map(e => e.name).join(', ');
      context += `\nAvailable entities: ${entitySummary}`;
    }

    // Use Prompt API to answer
    if (typeof LanguageModel === 'undefined') {
      throw new Error('Prompt API not available');
    }

    const session = await LanguageModel.create({
      systemPrompt: 'You answer questions about a knowledge graph. Be concise and helpful.',
      temperature: 0.5,
      topK: 40
    });

    const prompt = `${context}\n\nQuestion: ${query}\n\nAnswer based on the knowledge base:`;

    const answer = await session.prompt(prompt);
    session.destroy();

    return { success: true, answer };
  } catch (error) {
    console.error('Knowledge query failed:', error);
    return { success: false, error: error.message };
  }
}

// Answer entity-specific questions (no AI needed)
async function answerEntityQuestion(entityId, questionType) {
  try {
    const store = await getGraphStore();
    const entity = await store.getEntity(entityId);

    if (!entity) {
      return { success: false, error: 'Entity not found' };
    }

    const [type, id] = questionType.split(':');

    if (type === 'SOURCES') {
      // Get articles that mention this entity
      const articles = await store.getAllArticles();
      const sourceArticles = articles.filter(a =>
        a.entities && a.entities.includes(entityId)
      );

      if (sourceArticles.length === 0) {
        return {
          success: true,
          answer: `${entity.name} hasn't been mentioned in any captured articles yet.`
        };
      }

      const articleList = sourceArticles
        .map(a => `• ${a.title}`)
        .join('\n');

      return {
        success: true,
        answer: `${entity.name} is mentioned in ${sourceArticles.length} article${sourceArticles.length !== 1 ? 's' : ''}:\n\n${articleList}`
      };
    }

    if (type === 'CONNECTIONS') {
      // Get connected entities
      const relationships = await store.getAllRelationships();
      const allEntities = await store.getAllEntities();

      const connectedRels = relationships.filter(r =>
        r.source === entityId || r.target === entityId
      );

      if (connectedRels.length === 0) {
        return {
          success: true,
          answer: `${entity.name} doesn't have any connections yet. Capture more articles to discover relationships.`
        };
      }

      const connections = connectedRels.map(r => {
        const otherId = r.source === entityId ? r.target : r.source;
        const other = allEntities.find(e => e.id === otherId);
        if (!other) return null;

        const relType = r.type || 'related to';
        return `• ${other.name} (${relType})`;
      }).filter(Boolean);

      return {
        success: true,
        answer: `${entity.name} is connected to ${connections.length} ent${connections.length !== 1 ? 'ities' : 'ity'}:\n\n${connections.join('\n')}`
      };
    }

    if (type === 'CONTEXT') {
      // Get entity context
      let answer = `${entity.name} is a ${entity.type}.`;

      if (entity.context) {
        answer += `\n\n${entity.context}`;
      }

      const sourceCount = entity.sources?.length || 0;
      if (sourceCount > 0) {
        answer += `\n\nMentioned in ${sourceCount} article${sourceCount !== 1 ? 's' : ''}.`;
      }

      return { success: true, answer };
    }

    return { success: false, error: 'Unknown question type' };
  } catch (error) {
    console.error('Answer entity question failed:', error);
    return { success: false, error: error.message };
  }
}

// Build context for query
function buildQueryContext(query, graphData) {
  const queryLower = query.toLowerCase();

  // Find relevant nodes
  const relevantNodes = graphData.nodes.filter(node =>
    queryLower.includes(node.name.toLowerCase()) ||
    node.name.toLowerCase().includes(queryLower)
  );

  if (relevantNodes.length === 0) {
    return 'No directly relevant entities found.';
  }

  // Build context string
  let context = 'Entities:\n';
  for (const node of relevantNodes.slice(0, 5)) {
    context += `- ${node.name} (${node.type})\n`;

    // Find connections
    const connections = graphData.edges?.filter(edge =>
      edge.source === node.id || edge.target === node.id
    ) || [];

    if (connections.length > 0) {
      context += `  Connected to: ${connections.slice(0, 3).map(e => {
        const otherId = e.source === node.id ? e.target : e.source;
        const other = graphData.nodes.find(n => n.id === otherId);
        return other ? `${other.name} (${e.type || 'related'})` : '';
      }).filter(Boolean).join(', ')}\n`;
    }
  }

  return context;
}

// Check for duplicate articles before capturing
async function checkForDuplicate(data) {
  try {
    const { title, text, url } = data;
    const store = await getGraphStore();
    const allArticles = await store.getAllArticles();

    if (allArticles.length === 0) {
      return { success: true, isDuplicate: false, duplicates: [] };
    }

    // First pass: Check URL similarity (exact match or very similar)
    const urlDuplicates = allArticles.filter(article => {
      if (article.url === url) return true;

      // Check if URLs are very similar (same domain + path)
      try {
        const url1 = new URL(url);
        const url2 = new URL(article.url);
        return url1.hostname === url2.hostname && url1.pathname === url2.pathname;
      } catch {
        return false;
      }
    });

    if (urlDuplicates.length > 0) {
      return {
        success: true,
        isDuplicate: true,
        confidence: 100,
        duplicates: urlDuplicates.map(a => ({
          id: a.id,
          title: a.title,
          url: a.url,
          capturedAt: a.capturedAt,
          overlap: 100
        }))
      };
    }

    // Second pass: Title similarity
    const titleDuplicates = allArticles.filter(article => {
      const similarity = calculateTitleSimilarity(title, article.title);
      return similarity > 0.8;
    });

    if (titleDuplicates.length > 0) {
      return {
        success: true,
        isDuplicate: true,
        confidence: 90,
        duplicates: titleDuplicates.map(a => ({
          id: a.id,
          title: a.title,
          url: a.url,
          capturedAt: a.capturedAt,
          overlap: Math.round(calculateTitleSimilarity(title, a.title) * 100)
        }))
      };
    }

    // Third pass: Content similarity using summaries (most expensive)
    const contentDuplicates = await findContentDuplicates(text, allArticles);

    if (contentDuplicates.length > 0) {
      return {
        success: true,
        isDuplicate: true,
        confidence: 75,
        duplicates: contentDuplicates
      };
    }

    return { success: true, isDuplicate: false, duplicates: [] };
  } catch (error) {
    console.error('Duplicate check failed:', error);
    // Don't block capture if check fails
    return { success: true, isDuplicate: false, duplicates: [] };
  }
}

// Calculate title similarity using word overlap
function calculateTitleSimilarity(title1, title2) {
  const words1 = new Set(title1.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  const words2 = new Set(title2.toLowerCase().split(/\s+/).filter(w => w.length > 3));

  if (words1.size === 0 || words2.size === 0) return 0;

  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

// Find content duplicates using entity overlap
async function findContentDuplicates(text, allArticles) {
  try {
    // Extract entities from new article quickly
    const newEntities = await extractEntitiesQuick(text);

    if (newEntities.length < 3) {
      return [];
    }

    // Get all entities from database
    const store = await getGraphStore();
    const dbEntities = await store.getAllEntities();
    const entityNameToId = new Map();
    dbEntities.forEach(e => entityNameToId.set(e.name.toLowerCase(), e.id));

    // Match new entities to database
    const newEntityIds = newEntities
      .map(name => entityNameToId.get(name.toLowerCase()))
      .filter(Boolean);

    if (newEntityIds.length < 3) {
      return [];
    }

    // Find articles with high entity overlap
    const duplicates = [];
    for (const article of allArticles) {
      const articleEntityIds = article.entities || [];
      const overlap = articleEntityIds.filter(id => newEntityIds.includes(id)).length;
      const totalEntities = Math.max(articleEntityIds.length, newEntityIds.length);
      const overlapPercent = totalEntities > 0 ? (overlap / totalEntities) * 100 : 0;

      if (overlapPercent > 70) {
        duplicates.push({
          id: article.id,
          title: article.title,
          url: article.url,
          capturedAt: article.capturedAt,
          overlap: Math.round(overlapPercent)
        });
      }
    }

    return duplicates;
  } catch (error) {
    console.error('Content duplicate detection failed:', error);
    return [];
  }
}

// Analyze page for Glyph Insights (Live Reading Assistant)
async function analyzePageForInsights(data) {
  try {
    const { content, url, title } = data;

    // Quick entity extraction (simplified for speed)
    const entities = await extractEntitiesQuick(content);

    if (entities.length === 0) {
      return { success: true, matches: [], entities: [] };
    }

    // Find matching articles in database
    const store = await getGraphStore();
    const allArticles = await store.getAllArticles();
    const allEntities = await store.getAllEntities();

    // Build entity name to ID map
    const entityNameToId = new Map();
    allEntities.forEach(e => {
      entityNameToId.set(e.name.toLowerCase(), e.id);
    });

    // Match extracted entities to database entities
    const matchedEntityIds = [];
    const matchedEntityNames = [];
    for (const entityName of entities) {
      const entityId = entityNameToId.get(entityName.toLowerCase());
      if (entityId) {
        matchedEntityIds.push(entityId);
        matchedEntityNames.push(entityName);
      }
    }

    if (matchedEntityIds.length < 2) {
      return { success: true, matches: [], entities: matchedEntityNames };
    }

    // Find articles that contain these entities
    const articleMatches = [];
    for (const article of allArticles) {
      const articleEntityIds = article.entities || [];
      const sharedEntities = articleEntityIds.filter(id =>
        matchedEntityIds.includes(id)
      ).length;

      if (sharedEntities >= 2) {
        articleMatches.push({
          id: article.id,
          title: article.title,
          url: article.url,
          capturedAt: article.capturedAt,
          sharedEntities
        });
      }
    }

    // Sort by shared entities (most relevant first)
    articleMatches.sort((a, b) => b.sharedEntities - a.sharedEntities);

    // Check for duplicates
    const duplicateCheck = await checkForDuplicate({ url, title, text: content });
    const duplicate = duplicateCheck.isDuplicate && duplicateCheck.duplicates.length > 0
      ? duplicateCheck.duplicates[0]
      : null;

    // Return top 5 matches + duplicate warning
    return {
      success: true,
      matches: articleMatches.slice(0, 5),
      entities: matchedEntityNames.slice(0, 5),
      duplicate: duplicate
    };
  } catch (error) {
    console.error('Page analysis for insights failed:', error);
    return {
      success: false,
      matches: [],
      entities: [],
      error: error.message,
      duplicate: null
    };
  }
}

// Quick entity extraction for live pages (DISABLED FOR TESTING)
async function extractEntitiesQuick(text) {
  console.log('[DEBUG] 🚀 EXTRACTENTITIESQUICK DISABLED - Using fallback');
  // Skip AI entirely for testing
  return extractKeywordsSimple(text);
}

// Simple keyword extraction fallback
function extractKeywordsSimple(text) {
  // Extract capitalized phrases (potential entities)
  const words = text.split(/\s+/);
  const entities = new Set();

  for (let i = 0; i < words.length && entities.size < 8; i++) {
    const word = words[i];
    // Check if starts with capital letter and is not common word
    if (/^[A-Z][a-z]+/.test(word) && word.length > 3) {
      entities.add(word);
    }
    // Check for multi-word capitalized phrases
    if (i < words.length - 1) {
      const nextWord = words[i + 1];
      if (/^[A-Z][a-z]+/.test(word) && /^[A-Z][a-z]+/.test(nextWord)) {
        entities.add(`${word} ${nextWord}`);
      }
    }
  }

  return Array.from(entities).slice(0, 8);
}

// Open graph page with article selected
async function openGraphPage(articleId) {
  try {
    const url = chrome.runtime.getURL('graph-page/index.html');
    const fullUrl = articleId ? `${url}?article=${articleId}` : url;

    await chrome.tabs.create({ url: fullUrl });

    return { success: true };
  } catch (error) {
    console.error('Failed to open graph page:', error);
    return { success: false, error: error.message };
  }
}

// Test Writer API quality with sample or real data
async function testWriterAPI() {
  try {
    const store = await getGraphStore();

    // Try to get real articles from last 7 days
    const allArticles = await store.getAllArticles();
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const recentArticles = allArticles.filter(a => a.capturedAt > sevenDaysAgo);

    let testData;
    if (recentArticles.length >= 3) {
      // Use real data
      const allEntities = await store.getAllEntities();

      // Count entity frequencies from recent articles
      const entityFrequency = new Map();
      for (const article of recentArticles) {
        for (const entityId of article.entities || []) {
          entityFrequency.set(entityId, (entityFrequency.get(entityId) || 0) + 1);
        }
      }

      // Get top 15 entities
      const topEntities = Array.from(entityFrequency.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([id, freq]) => {
          const entity = allEntities.find(e => e.id === id);
          return entity ? { name: entity.name, frequency: freq } : null;
        })
        .filter(Boolean);

      testData = {
        articles: recentArticles.map(a => ({
          title: a.title,
          capturedAt: a.capturedAt
        })),
        topEntities
      };
    } else {
      // Use sample data
      testData = generateSampleData();
    }

    // Test Writer API
    const result = await testWriterQuality(testData.articles, testData.topEntities);

    return {
      success: true,
      ...result,
      dataSource: recentArticles.length >= 3 ? 'real' : 'sample',
      articlesCount: testData.articles.length
    };
  } catch (error) {
    console.error('Writer API test failed:', error);
    return {
      success: false,
      quality: 'error',
      error: error.message,
      recommendation: 'Skip - API test failed'
    };
  }
}

// Synthesize weekly learning using Writer API
async function synthesizeWeek() {
  try {
    // Check Writer API availability
    if (typeof Writer === 'undefined' || typeof Writer.create !== 'function') {
      return {
        success: false,
        error: 'Writer API not available in this Chrome version. Update to Chrome 142+ or enable experimental flags.'
      };
    }

    try {
      const availability = await Writer.availability();
      if (availability !== 'readily' && availability !== 'available') {
        return {
          success: false,
          error: `Writer API not ready. Status: ${availability}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Writer API check failed: ${error.message}`
      };
    }

    const store = await getGraphStore();

    // Get articles from last 7 days
    const allArticles = await store.getAllArticles();
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const recentArticles = allArticles.filter(a => a.capturedAt >= oneWeekAgo);

    if (recentArticles.length === 0) {
      return {
        success: false,
        error: 'No articles captured in the last 7 days'
      };
    }

    // Get all entities
    const allEntities = await store.getAllEntities();

    // Count entity frequencies from recent articles
    const entityFrequency = new Map();
    for (const article of recentArticles) {
      for (const entityId of article.entities || []) {
        entityFrequency.set(entityId, (entityFrequency.get(entityId) || 0) + 1);
      }
    }

    // Get top 15 entities
    const topEntities = Array.from(entityFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([id, freq]) => {
        const entity = allEntities.find(e => e.id === id);
        return entity ? { name: entity.name, type: entity.type, frequency: freq } : null;
      })
      .filter(Boolean);

    if (topEntities.length === 0) {
      return {
        success: false,
        error: 'No entities found in recent articles'
      };
    }

    // Create Writer session with specific context
    const writer = await Writer.create({
      sharedContext: `You are a world-class learning analyst who crafts insightful narratives about people's learning journeys. You synthesize information into compelling, coherent stories that reveal patterns and connections.`
    });

    // Build prompt with article and entity data
    const entityList = topEntities
      .map(e => `- ${e.name} (${e.type}, appeared ${e.frequency} times)`)
      .join('\n');

    const articleTitles = recentArticles
      .slice(0, 10)
      .map(a => `- "${a.title}"`)
      .join('\n');

    const prompt = `Based on the following learning data from the past week, write a 150-200 word narrative synthesis that tells the story of this person's intellectual journey. Focus on themes, connections, and insights rather than just listing topics.

Articles Read (${recentArticles.length} total):
${articleTitles}

Most Frequent Entities:
${entityList}

Write a narrative that:
1. Identifies 2-3 major themes or topics
2. Highlights interesting connections between entities
3. Suggests what the person is learning about or interested in
4. Uses a warm, insightful tone

Synthesis:`;

    const synthesis = await writer.write(prompt, {
      context: 'This is a personal learning summary for educational purposes.'
    });

    writer.destroy();

    // Store synthesis in database with timestamp
    const now = Date.now();
    const weekStart = oneWeekAgo;
    const synthesisId = `synthesis_${now}`;

    const synthesisRecord = {
      id: synthesisId,
      synthesis: synthesis.trim(),
      createdAt: now,
      weekStart: weekStart,
      weekEnd: now,
      articlesAnalyzed: recentArticles.length,
      topEntities: topEntities.slice(0, 5).map(e => e.name)
    };

    await store.db.add('syntheses', synthesisRecord);

    return {
      success: true,
      synthesis: synthesis.trim(),
      articlesAnalyzed: recentArticles.length,
      topEntities: topEntities.slice(0, 5).map(e => e.name),
      createdAt: now,
      weekStart: weekStart
    };
  } catch (error) {
    console.error('Weekly synthesis failed:', error);
    return {
      success: false,
      error: error.message || 'Unknown error during synthesis'
    };
  }
}

async function synthesizeWeekBackground() {
  try {
    const result = await synthesizeWeek();
    if (result.success) {
      console.log('Weekly synthesis completed in background');
      chrome.runtime.sendMessage({
        type: 'SYNTHESIS_COMPLETE',
        data: result
      }).catch(() => {});
    }
  } catch (error) {
    console.error('Background synthesis failed:', error);
  }
}

async function getAllSyntheses() {
  try {
    const store = await getGraphStore();
    const allSyntheses = await store.db.getAll('syntheses');

    allSyntheses.sort((a, b) => b.createdAt - a.createdAt);

    return {
      success: true,
      syntheses: allSyntheses
    };
  } catch (error) {
    console.error('Failed to get syntheses:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

async function getLatestSynthesis() {
  try {
    const result = await getAllSyntheses();
    if (result.success && result.syntheses.length > 0) {
      return {
        success: true,
        synthesis: result.syntheses[0]
      };
    }
    return {
      success: false,
      error: 'No syntheses found'
    };
  } catch (error) {
    console.error('Failed to get latest synthesis:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Add these to the message handler
// Update handleMessage function to include these new cases:
/*
case 'QUERY_GRAPH':
  return await queryGraph(message.query, message.graphData);


case 'CAPTURE_ALL_TABS':
  return await captureAllOpenTabs();
*/
