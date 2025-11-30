import './TechnologySearch.css'

function TechnologySearch({ searchQuery, onSearchChange, resultsCount }) {
  return (
    <div className="technology-search">
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий по названию, описанию или заметкам..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
      <div className="search-results">
        <span className="results-count">Найдено: <strong>{resultsCount}</strong></span>
        {searchQuery && (
          <button 
            className="clear-search"
            onClick={() => onSearchChange('')}
          >
            ✕ Очистить
          </button>
        )}
      </div>
    </div>
  )
}

export default TechnologySearch

