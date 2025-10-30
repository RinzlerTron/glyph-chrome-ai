import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ChatQuery({ selectedEntity, graphData }) {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [smartQuestions, setSmartQuestions] = useState([]);
  const [aiQuestion, setAiQuestion] = useState('');
  const [generatingAiQuestion, setGeneratingAiQuestion] = useState(false);

  useEffect(() => {
    if (selectedEntity && graphData) {
      generateSmartQuestions();
      // Reset AI question when entity changes
      setAiQuestion('');
      setGeneratingAiQuestion(false);
    } else {
      setSmartQuestions([]);
      setAnswer('');
      setAiQuestion('');
      setGeneratingAiQuestion(false);
    }
  }, [selectedEntity, graphData]);

  useEffect(() => {
    // Generate AI question when panel opens
    if (isOpen && selectedEntity && !aiQuestion && !generatingAiQuestion) {
      generateAiQuestion();
    }
  }, [isOpen, selectedEntity, aiQuestion, generatingAiQuestion]);

  function generateSmartQuestions() {
    if (!selectedEntity) {
      setSmartQuestions([]);
      return;
    }

    const questions = [];
    const entity = selectedEntity;

    // Question 1: What articles mention this entity
    const sourceCount = entity.sources?.length || 0;
    if (sourceCount > 0) {
      questions.push({
        text: `What articles mention ${entity.name}?`,
        query: `SOURCES:${entity.id}`
      });
    }

    // Question 2: What is this entity connected to
    const neighbors = graphData.links.filter(
      link => link.source === entity.id || link.target === entity.id
    );
    if (neighbors.length > 0) {
      questions.push({
        text: `What is ${entity.name} connected to?`,
        query: `CONNECTIONS:${entity.id}`
      });
    }

    // Question 3: What type of entity is this
    if (entity.type) {
      questions.push({
        text: `Tell me about ${entity.name}`,
        query: `CONTEXT:${entity.id}`
      });
    }

    setSmartQuestions(questions.slice(0, 3));
  }

  function handleSimpleGoogleSearch() {
    const searchQuery = selectedEntity.name;
    const encodedQuery = encodeURIComponent(searchQuery);
    const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
    chrome.tabs.create({ url: googleUrl });
  }

  function handleContextualGoogleSearch() {
    // Add 2-3 related entities for context
    const relatedEntities = [];
    const connections = graphData.links.filter(
      link => link.source === selectedEntity.id || link.target === selectedEntity.id
    );

    connections.forEach(link => {
      const relatedId = link.source === selectedEntity.id ? link.target : link.source;
      const relatedEntity = graphData.nodes.find(node => node.id === relatedId);
      if (relatedEntity && relatedEntity.type !== selectedEntity.type) {
        relatedEntities.push(relatedEntity.name);
      }
    });

    let searchQuery = selectedEntity.name;
    if (relatedEntities.length > 0) {
      searchQuery += ` ${relatedEntities.slice(0, 2).join(' ')}`;
    }

    const encodedQuery = encodeURIComponent(searchQuery);
    const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
    chrome.tabs.create({ url: googleUrl });
  }

  function handleAiQuestionSearch() {
    if (aiQuestion) {
      const encodedQuery = encodeURIComponent(aiQuestion);
      const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
      chrome.tabs.create({ url: googleUrl });
    }
  }

  async function generateAiQuestion() {
    if (!selectedEntity) return;

    setGeneratingAiQuestion(true);

    try {
      // Get related entities for context
      const relatedEntities = [];
      const connections = graphData.links.filter(
        link => link.source === selectedEntity.id || link.target === selectedEntity.id
      );

      connections.forEach(link => {
        const relatedId = link.source === selectedEntity.id ? link.target : link.source;
        const relatedEntity = graphData.nodes.find(node => node.id === relatedId);
        if (relatedEntity) {
          relatedEntities.push(`${relatedEntity.name} (${relatedEntity.type})`);
        }
      });

      const contextInfo = relatedEntities.length > 0
        ? ` It's connected to: ${relatedEntities.slice(0, 3).join(', ')}.`
        : '';

      const prompt = `You are helping a user research "${selectedEntity.name}" (a ${selectedEntity.type}).${contextInfo}

Generate ONE specific, searchable research question that would help them learn more. The question should be:
- Focused and specific
- Good for Google search
- About recent developments, applications, or relationships
- 8-15 words maximum

Examples of good questions:
- "How does CRISPR gene editing affect cancer treatment 2024"
- "What are latest applications of machine learning in healthcare"

Generate only the research question, no explanations:`;

      const response = await chrome.runtime.sendMessage({
        type: 'GENERATE_AI_QUESTION',
        prompt: prompt
      });

      if (response.success && response.question) {
        setAiQuestion(response.question.trim());
      } else {
        // Fallback if AI fails
        const fallback = `What are recent developments in ${selectedEntity.name}`;
        setAiQuestion(fallback);
      }
    } catch (error) {
      console.error('AI question generation failed:', error);
      // Fallback question
      const fallback = `What are recent developments in ${selectedEntity.name}`;
      setAiQuestion(fallback);
    } finally {
      setGeneratingAiQuestion(false);
    }
  }

  async function handleQuestionClick(question) {
    setLoading(true);
    setAnswer('');

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'ANSWER_ENTITY_QUESTION',
        entityId: selectedEntity.id,
        questionType: question.query
      });

      if (response.success) {
        setAnswer(response.answer);
      } else {
        setAnswer(response.error || 'Unable to answer this question.');
      }
    } catch (error) {
      console.error('Query error:', error);
      setAnswer('Error processing question.');
    } finally {
      setLoading(false);
    }
  }

  // Only show if entity is selected
  if (!selectedEntity || !smartQuestions.length) {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        className="chat-toggle"
        onClick={() => setIsOpen(true)}
        title={`Ask about ${selectedEntity.name}`}
      >
        💬 Ask about {selectedEntity.name}
      </button>
    );
  }

  return (
    <div className="chat-query">
      <div className="chat-header">
        <h3>Ask about {selectedEntity.name}</h3>
        <button
          className="chat-close"
          onClick={() => {
            setIsOpen(false);
            setAnswer('');
          }}
        >
          ✕
        </button>
      </div>

      <div className="chat-body">
        {!answer && !loading && (
          <div className="chat-suggestions">
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>
              Click a question:
            </p>
            {smartQuestions.map((question, idx) => (
              <button
                key={idx}
                className="suggestion-button"
                onClick={() => handleQuestionClick(question)}
              >
                {question.text}
              </button>
            ))}

            <div style={{ borderTop: '1px solid #333', paddingTop: '12px', marginTop: '12px' }}>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                🔍 Google Search
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  className="suggestion-button"
                  style={{
                    backgroundColor: '#1e40af',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    width: '100%'
                  }}
                  onClick={handleSimpleGoogleSearch}
                >
                  Search "{selectedEntity.name}"
                </button>

                <button
                  className="suggestion-button"
                  style={{
                    backgroundColor: generatingAiQuestion ? '#475569' : '#10b981',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    opacity: generatingAiQuestion ? 0.8 : 1,
                    cursor: generatingAiQuestion ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    width: '100%'
                  }}
                  onClick={generatingAiQuestion ? undefined : handleAiQuestionSearch}
                  disabled={generatingAiQuestion}
                >
                  {generatingAiQuestion ? (
                    <span>💡 Finding research angle...</span>
                  ) : aiQuestion ? (
                    <span>💡 {aiQuestion}</span>
                  ) : (
                    <span>💡 Suggest research direction</span>
                  )}
                </button>
              </div>

              {aiQuestion && !generatingAiQuestion && (
                <p style={{ fontSize: '10px', color: '#888', marginTop: '4px', fontStyle: 'italic' }}>
                  Suggestion based on your reading connections
                </p>
              )}
            </div>
          </div>
        )}

        {answer && (
          <div className="chat-answer">
            <p>{answer}</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button
                className="chat-back-btn"
                onClick={() => setAnswer('')}
                style={{
                  padding: '6px 12px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  borderRadius: '6px',
                  color: '#667eea',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ← Ask another question
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="chat-loading">
            <div className="spinner"></div>
            <p>Finding answer...</p>
          </div>
        )}
      </div>
    </div>
  );
}

ChatQuery.propTypes = {
  selectedEntity: PropTypes.object,
  graphData: PropTypes.object.isRequired
};

export default ChatQuery;
