import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import TechnologyForm from '../components/TechnologyForm'
import { useNotification } from '../components/NotificationProvider'
import './EditTechnology.css'

function EditTechnology() {
  const { techId } = useParams()
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', [])
  const [technology, setTechnology] = useState(null)

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(techId))
    setTechnology(tech)
  }, [techId, technologies])

  const handleSave = (technologyData) => {
    const updated = technologies.map(tech =>
      tech.id === parseInt(techId)
        ? { ...tech, ...technologyData }
        : tech
    )
    setTechnologies(updated)
    showNotification('Изменения успешно сохранены!', 'success')
    navigate(`/technology/${techId}`)
  }

  const handleCancel = () => {
    navigate(`/technology/${techId}`)
  }

  if (!technology) {
    return (
      <div className="page">
        <div className="error-state">
          <h1>Технология не найдена</h1>
          <p>Технология с ID {techId} не существует.</p>
          <button onClick={() => navigate('/technologies')} className="btn btn-primary">
            ← Назад к списку
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page edit-technology-page">
      <div className="page-header">
        <h1>Редактировать технологию</h1>
      </div>

      <TechnologyForm
        onSave={handleSave}
        onCancel={handleCancel}
        initialData={technology}
      />
    </div>
  )
}

export default EditTechnology

