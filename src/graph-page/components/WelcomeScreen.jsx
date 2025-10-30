import React, { useState } from 'react';
import PropTypes from 'prop-types';

function WelcomeScreen({ onStartFresh, onLoadDemo }) {
  const [loading, setLoading] = useState(false);

  async function handleLoadDemo() {
    setLoading(true);
    try {
      await onLoadDemo();
    } catch (error) {
      console.error('Failed to load demo:', error);
      alert('Failed to load demo data. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <div className="welcome-header">
          <div className="welcome-logo">
            <svg width="80" height="80" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="welcome-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#a78bfa', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#60a5fa', stopOpacity:1}} />
                </linearGradient>
              </defs>
              <circle cx="64" cy="64" r="8" fill="url(#welcome-gradient)" />
              <circle cx="64" cy="32" r="8" fill="url(#welcome-gradient)" />
              <circle cx="92" cy="48" r="8" fill="url(#welcome-gradient)" />
              <circle cx="92" cy="80" r="8" fill="url(#welcome-gradient)" />
              <circle cx="64" cy="96" r="8" fill="url(#welcome-gradient)" />
              <circle cx="36" cy="80" r="8" fill="url(#welcome-gradient)" />
              <circle cx="36" cy="48" r="8" fill="url(#welcome-gradient)" />
              <line x1="64" y1="64" x2="64" y2="32" stroke="url(#welcome-gradient)" strokeWidth="2" strokeOpacity="0.6" />
              <line x1="64" y1="64" x2="92" y2="48" stroke="url(#welcome-gradient)" strokeWidth="2" strokeOpacity="0.6" />
              <line x1="64" y1="64" x2="92" y2="80" stroke="url(#welcome-gradient)" strokeWidth="2" strokeOpacity="0.6" />
              <line x1="64" y1="64" x2="64" y2="96" stroke="url(#welcome-gradient)" strokeWidth="2" strokeOpacity="0.6" />
              <line x1="64" y1="64" x2="36" y2="80" stroke="url(#welcome-gradient)" strokeWidth="2" strokeOpacity="0.6" />
              <line x1="64" y1="64" x2="36" y2="48" stroke="url(#welcome-gradient)" strokeWidth="2" strokeOpacity="0.6" />
            </svg>
          </div>
          <h1 className="welcome-title">Welcome to Glyph!</h1>
          <p className="welcome-subtitle">Your Chrome-powered AI. 100% Local & Private.</p>
        </div>

        <div className="welcome-content">
          <div className="welcome-section">
            <h2>Get started in 3 simple steps:</h2>
            <ol className="welcome-steps">
              <li>
                <span className="step-number">1</span>
                <div className="step-content">
                  <strong>Browse to any article</strong>
                  <p>Visit news sites, blog posts, documentation pages</p>
                </div>
              </li>
              <li>
                <span className="step-number">2</span>
                <div className="step-content">
                  <strong>Click the Glyph icon</strong>
                  <p>The Glyph Insights panel will show connections</p>
                </div>
              </li>
              <li>
                <span className="step-number">3</span>
                <div className="step-content">
                  <strong>Watch your knowledge graph grow</strong>
                  <p>AI extracts entities and discovers relationships</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="welcome-features">
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Proactive Insights</h3>
              <p>Glyph shows connections as you browse, no clicking needed</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>100% Private</h3>
              <p>All processing happens on your device, nothing sent to cloud</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant & Offline</h3>
              <p>Works without internet, powered by Chrome Built-in AI</p>
            </div>
          </div>
        </div>

        <div className="welcome-actions">
          <button
            className="btn-primary btn-demo"
            onClick={handleLoadDemo}
            disabled={loading}
          >
            {loading ? 'Loading Demo...' : '🎯 Try Demo Data'}
          </button>
          <button
            className="btn-secondary"
            onClick={onStartFresh}
            disabled={loading}
          >
            Start Fresh
          </button>
        </div>

        <div className="welcome-footer">
          <p className="welcome-hint">
            <strong>Tip:</strong> Enable Chrome AI first at{' '}
            <code>chrome://flags/#optimization-guide-on-device-model</code>
          </p>
        </div>
      </div>

      <style jsx>{`
        .welcome-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .welcome-container {
          max-width: 800px;
          width: 90%;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .welcome-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .welcome-logo {
          margin-bottom: 24px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .welcome-title {
          font-size: 42px;
          font-weight: 700;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 12px 0;
        }

        .welcome-subtitle {
          font-size: 18px;
          color: #9ca3af;
          margin: 0;
        }

        .welcome-content {
          margin-bottom: 40px;
        }

        .welcome-section h2 {
          font-size: 20px;
          color: #e5e7eb;
          margin: 0 0 24px 0;
        }

        .welcome-steps {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
        }

        .welcome-steps li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
          gap: 16px;
        }

        .step-number {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
        }

        .step-content {
          flex: 1;
        }

        .step-content strong {
          color: #e5e7eb;
          font-size: 16px;
          display: block;
          margin-bottom: 4px;
        }

        .step-content p {
          color: #9ca3af;
          font-size: 14px;
          margin: 0;
        }

        .welcome-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .feature-card h3 {
          font-size: 16px;
          color: #e5e7eb;
          margin: 0 0 8px 0;
        }

        .feature-card p {
          font-size: 13px;
          color: #9ca3af;
          margin: 0;
        }

        .welcome-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 24px;
        }

        .btn-primary, .btn-secondary {
          padding: 14px 32px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          color: white;
          flex: 1;
          max-width: 300px;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(167, 139, 250, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #e5e7eb;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
        }

        .btn-primary:disabled, .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .welcome-footer {
          text-align: center;
        }

        .welcome-hint {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }

        .welcome-hint code {
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: #a78bfa;
        }
      `}</style>
    </div>
  );
}

WelcomeScreen.propTypes = {
  onStartFresh: PropTypes.func.isRequired,
  onLoadDemo: PropTypes.func.isRequired
};

export default WelcomeScreen;
