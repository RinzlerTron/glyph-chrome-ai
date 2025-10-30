# Architecture

Glyph leverages Chrome's built-in AI APIs to transform scattered reading into structured knowledge graphs. The architecture prioritizes local processing, accessibility, and seamless integration with Chrome's AI capabilities.

## Chrome's Built-in AI Integration

**Local Processing Architecture**
The extension leverages Chrome's built-in AI for complete local processing - no external API keys, server costs, or data transmission. This approach ensures privacy while providing sophisticated AI capabilities through on-device models.

**Five API Integration**

**Prompt API** - Handles entity extraction and relationship analysis. Configured for context-aware processing that identifies meaningful entities beyond simple proper noun detection. Also generates semantic relationship labels and answers user queries from curated knowledge.

**Summarizer API** - Processes long-form articles before entity extraction. Applied to content exceeding 6,000 characters to improve extraction accuracy and reduce processing time.

**Language Detector API** - Provides automatic multilingual support. Processing pipelines adapt based on detected language without requiring user configuration.

**Writer API** - Generates weekly synthesis narratives that identify patterns across reading history. Runs asynchronously to avoid blocking the main interface.

**Rewriter API** - Enhances Q&A response clarity and readability. Applied to conversational features to improve user comprehension.

**Graceful Degradation**
The architecture includes availability checking, elegant failure handling, and proper session cleanup. When AI services are unavailable, the system falls back to keyword-based extraction to maintain basic functionality.

## System Components

**Background Processing** (service-worker.js)
The service worker coordinates AI calls without blocking browser performance. It handles multiple articles simultaneously using Chrome's built-in AI, managing processing queues and state across tabs. All AI sessions are properly cleaned up to prevent memory leaks.

**Content Extraction** (content-script.js)
Extracts article content only when users explicitly click "Capture Article" - no passive tracking or automatic data collection. Includes duplicate detection and provides hints about related articles already in the knowledge graph.

**Knowledge Visualization** (graph-page/, popup/)
React-based interface that visualizes knowledge connections through D3.js force-directed graphs. Components designed with accessibility support including keyboard navigation and screen readers.

## AI Processing Pipeline

**Capture Workflow**
Article capture is user-initiated through explicit clicks, ensuring intentional knowledge curation rather than passive data collection. The content script extracts text and metadata, passing it to the service worker for AI processing.

**Multi-Stage AI Processing**
Processing occurs in sequential stages for optimal results. Language detection identifies the article's language, supporting multilingual reading. For articles exceeding 6,000 characters, the Summarizer API condenses content before entity extraction to improve accuracy. The Prompt API then extracts people, companies, technologies, and concepts, filtered through a 250+ stopword list to prevent noise from common terms.

**Statistical Relationship Discovery**
The system periodically analyzes entity co-occurrence patterns using pointwise mutual information (PMI) - a statistical measure that identifies meaningful connections beyond simple frequency counting. When significant relationships are detected, the Prompt API generates semantic labels like "founded by" or "competes with" to make connections interpretable.

**Real-time Interface Updates**
All processing updates appear immediately in the interface. The knowledge graph re-renders with new entities, the timeline extends to include new articles, and open panels refresh with updated data. This immediate feedback supports understanding of how knowledge connections develop over time.

## Chrome's Built-in AI Integration

**Local Processing Architecture**
The extension leverages Chrome's built-in AI for complete local processing - no external API keys, server costs, or data transmission. This approach ensures privacy while providing sophisticated AI capabilities through on-device models.

**Five API Integration**

**Prompt API** - Handles entity extraction and relationship analysis. Configured for context-aware processing that identifies meaningful entities beyond simple proper noun detection. Also generates semantic relationship labels and answers user queries from curated knowledge.

**Summarizer API** - Processes long-form articles before entity extraction. Applied to content exceeding 6,000 characters to improve extraction accuracy and reduce processing time.

**Language Detector API** - Provides automatic multilingual support. Processing pipelines adapt based on detected language without requiring user configuration.

**Writer API** - Generates weekly synthesis narratives that identify patterns across reading history. Runs asynchronously to avoid blocking the main interface.

**Rewriter API** - Enhances Q&A response clarity and readability. Applied to conversational features to improve user comprehension.

**Graceful Degradation**
The architecture includes availability checking, elegant failure handling, and proper session cleanup. When AI services are unavailable, the system falls back to keyword-based extraction to maintain basic functionality.

## Data Storage Architecture

**IndexedDB Schema**
All data persists locally in the browser's IndexedDB with no external dependencies or sync conflicts. The schema optimizes for common operations: entity search, relationship traversal, and temporal navigation.

**Entities Table** - Core knowledge graph nodes tracking name, type, source articles, and frequency data. Duplicate entities are merged by name normalization to ensure "OpenAI" and "openai" represent the same concept.

**Relationships Table** - Edges connecting entities with statistical strength scores and semantic labels. Bidirectional indexing prevents duplicates and compound indexes enable efficient graph traversal even with thousands of connections.

**Articles Table** - Reading history with captured metadata, timestamps, and extracted entities. URL indexing prevents duplicate captures while timestamp indexing supports timeline navigation. Foreign key relationships enable bidirectional article-entity navigation.

**Syntheses Table** - Weekly AI-generated summaries providing temporal pattern analysis across reading history. Supports long-term knowledge trend identification and learning journey visualization.

## Performance Optimizations

**Graph Rendering**
The visualization uses adaptive rendering based on node count. SVG provides crisp graphics and natural interaction handling for graphs under 200 nodes. Above this threshold, automatic fallback to Canvas rendering maintains 60fps performance even with 1000+ entities, trading some visual fidelity for responsiveness.

D3 force simulation employs quadtree spatial partitioning for efficient collision detection at scale. User interactions are debounced at 16ms intervals to prevent performance degradation during pan and zoom operations.

**Relationship Discovery Scaling**
Entity relationship analysis uses progressive filtering to maintain performance. For collections under 20 articles, all entity combinations are analyzed. Between 20-50 articles, analysis focuses on entities from the 15 most recent pieces. Above 50 articles, user-configured topic filters reduce the search space. A hard limit of 200 entities prevents performance degradation from excessive relationship noise.

**Memory Management**
Chrome AI sessions require explicit cleanup to prevent memory leaks. D3 simulations are properly disposed through React useEffect cleanup functions. IndexedDB operations are batched into single transactions to minimize overhead with large knowledge graphs.

## User Interface Design

**Three-Panel Layout**
The interface provides three essential functions: context (article source), exploration (connection discovery), and focus (detailed information). This layout supports different learning styles and accessibility needs, allowing users to navigate between overview and detail views naturally.

**Synchronized Navigation**
Article selection, timeline position, and graph focus work together seamlessly. Selecting an article moves the timeline to that moment and filters the graph to relevant entities. This coordination reduces cognitive load and helps users understand temporal connections in their reading.

**Adaptive Right Panel**
The details panel contextually adapts based on user focus. Article selection shows extracted entities and metadata. Entity selection displays connections and source articles. This contextual switching supports both broad exploration and focused investigation.

**Accessibility Features**
The interface includes keyboard navigation, screen reader support, and a Google search integration button for external research. High contrast mode compatibility and scalable text ensure usability across different accessibility needs. The "Show All" reset function provides clear navigation paths without dead ends.

## Privacy & Security

**Local-Only Processing**
All AI processing occurs locally using Chrome's built-in models with zero external data transmission. No servers, analytics, telemetry, or external API requests. Data persistence uses Chrome profile storage with automatic OS-level encryption, ensuring GDPR compliance by design through the absence of data collection.

**Minimal Permission Model**
The extension requests only essential permissions: activeTab for user-initiated content extraction and storage for IndexedDB access. Chrome's built-in AI requires no additional permissions, host access, or external connectivity - the models are integral to the browser.

**Security Architecture**
The codebase avoids common extension vulnerabilities through architectural simplicity. No eval() calls, unsafe inline scripts, or external CDN dependencies. Webpack bundles all dependencies for self-contained execution. The attack surface is minimal - essentially a React application interfacing with IndexedDB and Chrome's AI APIs.

**Accessibility Integration**
The extension includes built-in Google search buttons for external research when users need information beyond their captured knowledge. This provides a bridge between local knowledge and broader research needs while maintaining the privacy-first approach for core functionality.

## Deployment & Development

**Quick Setup**
The extension deploys without build requirements. Load chrome://extensions, enable Developer mode, click "Load unpacked" and select the `dist/` folder. No compilation, dependency installation, or configuration needed.

**Development Workflow**
Development uses `npm run dev` for automatic rebuilding when source files change. Production builds via `npm run build` generate optimized bundles with minification and dead code elimination.

**Debugging & Monitoring**
Service worker debugging: chrome://extensions → "Inspect views" → "service worker" opens DevTools for background script analysis.

Key debugging resources:
- chrome://on-device-internals - Chrome AI model status and availability
- DevTools → Application → IndexedDB → GlyphDB - Direct database inspection
- Browser console - Real-time processing logs and error monitoring

The extension uses "GlyphDB" as its IndexedDB database name for easy identification during development and debugging.

## Component Architecture

**Core Extension Scripts**
- service-worker.js (1500 lines) - Central coordinator for AI processing and cross-tab state management. Handles all Chrome AI API interactions and background processing.
- content-script.js (400 lines) - Lightweight article extraction focused on clean text capture from web pages.

**React Interface Components**
- GraphPage.jsx (360 lines) - Main application router coordinating panel interactions and state management.
- KnowledgeGraph.jsx (450 lines) - D3.js force-directed graph visualization with React integration.
- TimelineSlider.jsx (280 lines) - Temporal navigation component synchronized with article selection.
- ArticlesList.jsx (320 lines) - Article clustering and display logic for Recent/Connected views.
- InsightPanel.jsx (350 lines) - Weekly AI summary generation and pattern analysis.
- NodeDetails.jsx (250 lines) - Entity detail display with relationship exploration.
- ChatQuery.jsx (200 lines) - Conversational Q&A interface for knowledge queries.

**Intelligence Modules**
- entity-extractor.js (250 lines) - Chrome Prompt API wrapper for entity identification and extraction.
- relationship-discovery.js (350 lines) - PMI algorithm implementation for statistical relationship detection.

**Storage & Utilities**
- db.js (200 lines) - IndexedDB abstraction layer for simplified database operations.
- mock-data.js (150 lines) - Demo data generation for welcome screen and testing.
- article-clustering.js (180 lines) - Article grouping algorithms for Connected view.
- constants.js (50 lines) - Application configuration and constant definitions.

File size limits maintain code readability and debugging efficiency, with the service worker as an exception due to its central coordination responsibilities. I hope to evolve and refine this later on, with support for broader roadmap for the project, especially through winning the competition. 
