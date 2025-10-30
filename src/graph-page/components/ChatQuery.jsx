import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ChatQuery({ selectedEntity, graphData }) {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [smartQuestions, setSmartQuestions] = useState([]);

  useEffect(() => {
    if (selectedEntity && graphData) {
      generateSmartQuestions();
    } else {
      setSmartQuestions([]);
      setAnswer('');
    }
  }, [selectedEntity, graphData]);

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
                🌐 Need more info? (requires internet)
              </p>
              <button
                className="suggestion-button"
                style={{ backgroundColor: '#1a73e8', color: 'white' }}
                onClick={() => {
                  const searchQuery = encodeURIComponent(selectedEntity.name);
                  const googleUrl = `https://www.google.com/search?q=${searchQuery}`;
                  chrome.tabs.create({ url: googleUrl });
                }}
              >
                🔍 Search "{selectedEntity.name}" with Google
              </button>
            </div>
          </div>
        )}

        {answer && (
          <div className="chat-answer">
            <p>{answer}</p>
            <button
              className="chat-back-btn"
              onClick={() => setAnswer('')}
              style={{
                marginTop: '12px',
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
