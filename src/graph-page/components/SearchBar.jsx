import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function SearchBar({ onSearch, placeholder }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300); // Debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  function handleClear() {
    setQuery('');
    onSearch('');
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className="search-input"
      />
      {query && (
        <button
          className="search-clear"
          onClick={handleClear}
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearchBar;
