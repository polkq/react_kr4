import useTechnologies from '../hooks/useTechnologies'
import ProgressBar from '../components/ProgressBar'
import './Statistics.css'

function Statistics() {
  const { technologies, progress } = useTechnologies()

  const completed = technologies.filter(t => t.status === 'completed').length
  const inProgress = technologies.filter(t => t.status === 'in-progress').length
  const notStarted = technologies.filter(t => t.status === 'not-started').length
  const total = technologies.length

  // Статистика по категориям
  const categoryStats = technologies.reduce((acc, tech) => {
    const category = tech.category || 'other'
    if (!acc[category]) {
      acc[category] = { total: 0, completed: 0, inProgress: 0, notStarted: 0 }
    }
    acc[category].total++
    if (tech.status === 'completed') acc[category].completed++
    else if (tech.status === 'in-progress') acc[category].inProgress++
    else acc[category].notStarted++
    return acc
  }, {})

  // Технологии с заметками
  const withNotes = technologies.filter(t => t.notes && t.notes.trim()).length

  return (
    <div className="page statistics-page">
      <div className="page-header">
        <h1>Статистика</h1>
      </div>

      <div className="stats-overview">
        <div className="stat-card main-stat">
          <h3>Общий прогресс</h3>
          <ProgressBar
            progress={progress}
            color="#4CAF50"
            animated={true}
            height={40}
          />
          <div className="stat-value-large">{progress}%</div>
        </div>

        <div className="stats-grid">
          <div className="stat-card completed">
            <div className="stat-icon">✓</div>
            <div className="stat-number">{completed}</div>
            <div className="stat-label">Изучено</div>
            <div className="stat-percentage">
              {total > 0 ? Math.round((completed / total) * 100) : 0}%
            </div>
          </div>

          <div className="stat-card in-progress">
            <div className="stat-icon">⟳</div>
            <div className="stat-number">{inProgress}</div>
            <div className="stat-label">В процессе</div>
            <div className="stat-percentage">
              {total > 0 ? Math.round((inProgress / total) * 100) : 0}%
            </div>
          </div>

          <div className="stat-card not-started">
            <div className="stat-icon">○</div>
            <div className="stat-number">{notStarted}</div>
            <div className="stat-label">Не начато</div>
            <div className="stat-percentage">
              {total > 0 ? Math.round((notStarted / total) * 100) : 0}%
            </div>
          </div>

          <div className="stat-card total">
            <div className="stat-icon">📚</div>
            <div className="stat-number">{total}</div>
            <div className="stat-label">Всего технологий</div>
          </div>
        </div>
      </div>

      {Object.keys(categoryStats).length > 0 && (
        <div className="category-stats">
          <h2>Статистика по категориям</h2>
          <div className="category-grid">
            {Object.entries(categoryStats).map(([category, stats]) => (
              <div key={category} className="category-card">
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div className="category-progress">
                  <ProgressBar
                    progress={stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}
                    color="#646cff"
                    height={20}
                  />
                </div>
                <div className="category-details">
                  <div className="category-stat-item">
                    <span>Всего:</span>
                    <strong>{stats.total}</strong>
                  </div>
                  <div className="category-stat-item">
                    <span>Изучено:</span>
                    <strong className="completed">{stats.completed}</strong>
                  </div>
                  <div className="category-stat-item">
                    <span>В процессе:</span>
                    <strong className="in-progress">{stats.inProgress}</strong>
                  </div>
                  <div className="category-stat-item">
                    <span>Не начато:</span>
                    <strong className="not-started">{stats.notStarted}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="additional-stats">
        <div className="stat-card">
          <h3>Дополнительная информация</h3>
          <div className="additional-info">
            <div className="info-item">
              <span>Технологий с заметками:</span>
              <strong>{withNotes}</strong>
            </div>
            <div className="info-item">
              <span>Технологий без заметок:</span>
              <strong>{total - withNotes}</strong>
            </div>
            <div className="info-item">
              <span>Процент с заметками:</span>
              <strong>{total > 0 ? Math.round((withNotes / total) * 100) : 0}%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics

