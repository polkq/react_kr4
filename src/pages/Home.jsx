import { Link } from 'react-router-dom'
import useTechnologies from '../hooks/useTechnologies'
import ProgressBar from '../components/ProgressBar'
import RoadmapImporter from '../components/RoadmapImporter'
import './Home.css'

function Home() {
  const { technologies, progress } = useTechnologies()
  
  const completed = technologies.filter(t => t.status === 'completed').length
  const inProgress = technologies.filter(t => t.status === 'in-progress').length
  const notStarted = technologies.filter(t => t.status === 'not-started').length

  return (
    <div className="page home-page">
      <div className="page-header">
        <h1>Добро пожаловать в Трекер технологий!</h1>
        <p className="page-subtitle">Отслеживайте свой прогресс в изучении технологий</p>
      </div>

      <div className="home-stats">
        <div className="stat-card">
          <h3>Общий прогресс</h3>
          <ProgressBar
            progress={progress}
            color="#4CAF50"
            animated={true}
            height={30}
          />
          <p className="stat-value">{progress}%</p>
        </div>

        <div className="stats-grid">
          <div className="stat-item completed">
            <span className="stat-number">{completed}</span>
            <span className="stat-label">Изучено</span>
          </div>
          <div className="stat-item in-progress">
            <span className="stat-number">{inProgress}</span>
            <span className="stat-label">В процессе</span>
          </div>
          <div className="stat-item not-started">
            <span className="stat-number">{notStarted}</span>
            <span className="stat-label">Не начато</span>
          </div>
        </div>
      </div>

      <div className="home-features">
        <h2>Возможности приложения:</h2>
        <ul className="features-list">
          <li>📋 Навигация между страницами без перезагрузки</li>
          <li>🔍 Поиск и фильтрация технологий</li>
          <li>📝 Добавление заметок к каждой технологии</li>
          <li>📊 Отслеживание прогресса изучения</li>
          <li>💾 Автоматическое сохранение в localStorage</li>
          <li>📈 Детальная статистика</li>
        </ul>
      </div>

      <RoadmapImporter />

      <div className="home-actions">
        <Link to="/technologies" className="btn btn-primary">
          Посмотреть все технологии
        </Link>
        <Link to="/add-technology" className="btn btn-secondary">
          Добавить новую технологию
        </Link>
      </div>
    </div>
  )
}

export default Home

