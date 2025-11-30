import './TechnologyFilter.css'

function TechnologyFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'Все', icon: '📋' },
    { value: 'not-started', label: 'Не начато', icon: '○' },
    { value: 'in-progress', label: 'В процессе', icon: '⟳' },
    { value: 'completed', label: 'Изучено', icon: '✓' }
  ]

  return (
    <div className="technology-filter">
      <h3>Фильтр по статусу</h3>
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.value}
            className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.value)}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TechnologyFilter

