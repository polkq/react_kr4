import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import ProgressBar from '../components/ProgressBar'
import './TechnologyDetail.css'

function TechnologyDetail() {
  const { techId } = useParams()
  const navigate = useNavigate()
  const [technologies] = useLocalStorage('techTrackerData', [])
  const [technology, setTechnology] = useState(null)

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(techId))
    setTechnology(tech)
  }, [techId, technologies])

  const updateStatus = (newStatus) => {
    const updated = technologies.map(tech =>
      tech.id === parseInt(techId) ? { ...tech, status: newStatus } : tech
    )
    localStorage.setItem('techTrackerData', JSON.stringify(updated))
    setTechnology({ ...technology, status: newStatus })
  }

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      const updated = technologies.filter(t => t.id !== parseInt(techId))
      localStorage.setItem('techTrackerData', JSON.stringify(updated))
      navigate('/technologies')
    }
  }

  if (!technology) {
    return (
      <div className="page">
        <div className="error-state">
          <h1>Технология не найдена</h1>
          <p>Технология с ID {techId} не существует.</p>
          <Link to="/technologies" className="btn btn-primary">
            ← Назад к списку
          </Link>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4caf50'
      case 'in-progress': return '#ff9800'
      case 'not-started': return '#757575'
      default: return '#646cff'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Изучено'
      case 'in-progress': return 'В процессе'
      case 'not-started': return 'Не начато'
      default: return status
    }
  }

  const progress = technology.status === 'completed' ? 100 : 
                   technology.status === 'in-progress' ? 50 : 0

  return (
    <div className="page technology-detail-page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>{technology.title}</h1>
      </div>

      <div className="technology-detail">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-display">
            <span 
              className="status-badge"
              style={{ 
                backgroundColor: getStatusColor(technology.status),
                color: '#fff'
              }}
            >
              {getStatusText(technology.status)}
            </span>
            <ProgressBar
              progress={progress}
              color={getStatusColor(technology.status)}
              height={20}
            />
          </div>
          <div className="status-buttons">
            <button
              onClick={() => updateStatus('not-started')}
              className={`status-btn ${technology.status === 'not-started' ? 'active' : ''}`}
            >
              Не начато
            </button>
            <button
              onClick={() => updateStatus('in-progress')}
              className={`status-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
            >
              В процессе
            </button>
            <button
              onClick={() => updateStatus('completed')}
              className={`status-btn ${technology.status === 'completed' ? 'active' : ''}`}
            >
              Завершено
            </button>
          </div>
        </div>

        {technology.notes && (
          <div className="detail-section">
            <h3>Мои заметки</h3>
            <div className="notes-display">
              <p>{technology.notes}</p>
            </div>
          </div>
        )}

        {technology.category && (
          <div className="detail-section">
            <h3>Категория</h3>
            <span className="category-badge">{technology.category}</span>
          </div>
        )}

        <div className="detail-actions">
          <Link 
            to={`/edit-technology/${techId}`}
            className="btn btn-secondary"
          >
            Редактировать
          </Link>
          <button 
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default TechnologyDetail

