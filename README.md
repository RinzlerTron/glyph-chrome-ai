# Glyph

**Curate your learning. See how ideas connect.**

Glyph turns scattered reading into structured knowledge. Every article you capture becomes part of an intelligent graph that reveals patterns, connections, and insights across everything you've read.

**If you learn by reading** - whether you're researching, practicing law, analyzing markets, or just trying to make sense of complex topics - Glyph helps you see the bigger picture.

## Quick Start for Judges

1. Load extension: `chrome://extensions` → Load unpacked → `dist/`
2. Browse any article → Click Glyph icon → Capture
3. Repeat 3-5 times → Watch your knowledge graph emerge

**Requirements**: Chrome 138+, 22GB disk space (Gemini Nano model)

## What It Does

**Captures What Matters**
Instead of saving everything, Glyph identifies the key people, companies, technologies, and concepts from each article. When you have multiple tabs open, capture them all at once.

**Finds Hidden Connections**
This is where it gets interesting - Glyph finds connections between articles you've read that you might have missed. After every few captures, it reveals new relationships and labels them meaningfully: "founded by", "competes with", "implements".

**Shows Your Knowledge Structure**
Your reading becomes a visual, interactive graph that you can explore. The timeline scrubber lets you watch how your understanding evolved over time. It handles 500+ entities smoothly while staying fast.

**Answers From Your Reading**
Ask questions and get answers drawn from your own curated knowledge. "What have I learned about X?" gets answered from your captures, not from generic AI training data.

## How Each Feature Works

| What You See | Intelligence Behind It |
|--------------|------------------------|
| **Capture article** | Summarizer condenses → Prompt API extracts entities → Language Detector identifies language |
| **Visual graph grows** | D3.js physics simulation (no AI) |
| **Relationships appear** | Statistical analysis finds co-occurrence patterns → Prompt API labels them semantically |
| **Ask questions** | Prompt API answers from your data → Rewriter polishes clarity |
| **Weekly synthesis** | Writer API generates narrative summaries of your learning journey |
| **"You've seen this"** | Prompt API extracts entities from current page → Matches your database |

**5 Chrome AI APIs working together**: Prompt, Summarizer, Writer, Rewriter, Language Detector

**Tech**: React 18, D3.js v7, IndexedDB (100% local), Webpack 5 (723 KiB bundle)

## Why On-Device AI?

**Your knowledge, your control**: Process any content without sending data anywhere

**Zero cost forever**: No subscriptions, no API keys, no monthly limits

**Works everywhere**: Flights, coffee shops, anywhere you read

## How It Works

**Step 1 - Capture**: You click → Content script extracts text → Service worker receives it

**Step 2 - Understand**: Summarizer condenses (if needed) → Prompt API identifies key entities → Stored in IndexedDB

**Step 3 - Connect**: After 3 captures → Analyzes which entities appear together → Prompt API labels relationships

**Step 4 - Visualize**: React loads data → D3.js renders force-directed graph → You explore connections

**Step 5 - Learn**: Ask questions → AI answers from your curated knowledge → Insights deepen

## What I Learned Building This

**Technical Complexity That Feels Simple**
Getting 5 different AI APIs to work together smoothly was harder than I expected. Statistical relationship discovery, not just basic summarization, required real algorithmic thinking.

**Solving Real Problems**
The features that ended up mattering most were the ones that solved actual pain points - duplicate detection when browsing, relationship discovery across scattered reading, and weekly synthesis to see patterns over time.

**Performance Under Pressure**
Making the graph responsive with 500+ entities required optimizing everything - O(1) graph queries, 60fps rendering, and keeping the bundle under 1MB while maintaining rich functionality.

**Chrome's Unique Position**
Building this showed me how powerful browser context + built-in AI can be. These experiences would be nearly impossible to replicate with cloud services or in other browsers.

## Setup for Judges

```bash
npm install && npm run build
```

Load `dist/` in chrome://extensions/ → Start capturing

## Demo Tests

1. Capture 3 articles → Relationships auto-discovered
2. Disconnect WiFi → Everything still works
3. Ask question → Answered from your captures

## Where This Could Go

**Next Steps**: I'm excited about deeper Chrome integration - imagine searching your knowledge graph from the address bar, or having Chrome auto-group your tabs by topics from your reading patterns.

**Platform Potential**: If this works, opening up an API for other extensions could create interesting possibilities. Research teams sharing knowledge graphs could be powerful for collaborative work.

**The Long View**: Keep the core free while exploring premium features for teams and organizations that want to share knowledge graphs collaboratively.

---

**Chrome AI Challenge 2025** - Most Helpful Extension

Your knowledge, your connections, your insights. Everything stays local.

[Chrome AI Docs](https://developer.chrome.com/docs/ai/built-in-apis) | [Challenge](https://googlechromeai2025.devpost.com) | MIT License
