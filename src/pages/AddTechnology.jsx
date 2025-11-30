import { useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import TechnologyForm from '../components/TechnologyForm'
import { useNotification } from '../components/NotificationProvider'
import './AddTechnology.css'

function AddTechnology() {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', [])

  const handleSave = (technologyData) => {
    const newTechnology = {
      id: Date.now(),
      ...technologyData
    }

    const updated = [...technologies, newTechnology]
    setTechnologies(updated)
    showNotification('Технология успешно добавлена!', 'success')
    
    // Перенаправляем на страницу деталей новой технологии
    navigate(`/technology/${newTechnology.id}`)
  }

  const handleCancel = () => {
    navigate('/technologies')
  }

  return (
    <div className="page add-technology-page">
      <div className="page-header">
        <h1>Добавить новую технологию</h1>
      </div>

      <TechnologyForm
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  )
}

export default AddTechnology

