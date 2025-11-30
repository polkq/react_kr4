import './ProgressHeader.css'

function ProgressHeader({ technologies }) {
  const total = technologies.length
  const completed = technologies.filter(tech => tech.status === 'completed').length
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="progress-header">
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-label">Всего технологий:</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Изучено:</span>
          <span className="stat-value completed">{completed}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">В процессе:</span>
          <span className="stat-value in-progress">{inProgress}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Не начато:</span>
          <span className="stat-value not-started">{notStarted}</span>
        </div>
      </div>
      
      <div className="progress-section">
        <div className="progress-info">
          <span className="progress-label">Прогресс выполнения:</span>
          <span className="progress-percentage">{percentage}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default ProgressHeader

