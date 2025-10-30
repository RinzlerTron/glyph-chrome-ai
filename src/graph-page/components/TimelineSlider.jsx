import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function TimelineSlider({
  onArticleSelect,
  articles,
  focusedArticle
}) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderRef = useRef(null);

  const sortedArticles = [...articles].sort((a, b) => a.capturedAt - b.capturedAt);

  useEffect(() => {
    if (sortedArticles.length > 0) {
      const latestIndex = sortedArticles.length - 1;
      setSliderPosition(latestIndex);
      if (!focusedArticle) {
        onArticleSelect(sortedArticles[latestIndex]);
      }
    }
  }, [articles.length]);

  // Sync slider position when article is clicked from articles list
  useEffect(() => {
    if (focusedArticle && sortedArticles.length > 0) {
      const articleIndex = sortedArticles.findIndex(a => a.id === focusedArticle.id);
      if (articleIndex !== -1) {
        setSliderPosition(articleIndex);
      }
    }
  }, [focusedArticle, sortedArticles]);

  function handleSliderChange(e) {
    const index = parseInt(e.target.value, 10);
    setSliderPosition(index);

    if (sortedArticles[index]) {
      onArticleSelect(sortedArticles[index]);
    }
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  }

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  if (articles.length === 0) {
    return null;
  }

  const currentArticle = focusedArticle || sortedArticles[sliderPosition];

  return (
    <div className="timeline-always-visible">
      <div className="timeline-left">
        {currentArticle && (
          <>
            <div className="timeline-article-title">{currentArticle.title}</div>
            <div className="timeline-article-meta">
              {formatDate(currentArticle.capturedAt)} at {formatTime(currentArticle.capturedAt)}
              {currentArticle.entities && ` · ${currentArticle.entities.length} entities`}
            </div>
          </>
        )}
      </div>

      <div className="timeline-right">
        <div className="timeline-slider-track">
          {sortedArticles.map((article, idx) => {
            const position = (idx / Math.max(sortedArticles.length - 1, 1)) * 100;
            const isFocused = currentArticle?.id === article.id;

            return (
              <div
                key={article.id}
                className={`timeline-dot ${isFocused ? 'focused' : ''}`}
                style={{ left: `${position}%` }}
                title={article.title}
              />
            );
          })}
        </div>

        <input
          ref={sliderRef}
          type="range"
          min="0"
          max={Math.max(sortedArticles.length - 1, 0)}
          step="1"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="timeline-slider-range"
        />

        <div className="timeline-labels-row">
          <span className="timeline-label">{formatDate(sortedArticles[0]?.capturedAt)}</span>
          <span className="timeline-position">{sliderPosition + 1} of {sortedArticles.length}</span>
          <span className="timeline-label">{formatDate(sortedArticles[sortedArticles.length - 1]?.capturedAt)}</span>
        </div>
      </div>
    </div>
  );
}

TimelineSlider.propTypes = {
  onArticleSelect: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  focusedArticle: PropTypes.object
};

export default TimelineSlider;
