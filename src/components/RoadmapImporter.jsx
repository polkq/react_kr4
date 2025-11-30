import { useState } from 'react'
import useTechnologiesApi from '../hooks/useTechnologiesApi'
import useTechnologies from '../hooks/useTechnologies'
import './RoadmapImporter.css'

function RoadmapImporter() {
  const { technologies: apiTechnologies, loading, error, addTechnology } = useTechnologiesApi()
  const { technologies: localTechnologies, setTechnologies } = useTechnologies()
  const [importing, setImporting] = useState(false)
  const [importStatus, setImportStatus] = useState(null)

  const handleImportFromApi = async () => {
    try {
      setImporting(true)
      setImportStatus('Импорт технологий из API...')
      
      // Имитация загрузки дорожной карты из API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Получаем технологии из API и добавляем их в локальное хранилище
      const technologiesToAdd = apiTechnologies.filter(apiTech => {
        // Проверяем, нет ли уже такой технологии
        return !localTechnologies.some(localTech => localTech.title === apiTech.title)
      })

      if (technologiesToAdd.length === 0) {
        setImportStatus('Все технологии из API уже добавлены')
        return
      }

      // Добавляем технологии в локальное хранилище
      const updated = [...localTechnologies, ...technologiesToAdd]
      setTechnologies(updated)
      
      setImportStatus(`Успешно импортировано ${technologiesToAdd.length} технологий`)
      
      // Очищаем статус через 3 секунды
      setTimeout(() => {
        setImportStatus(null)
      }, 3000)
    } catch (err) {
      setImportStatus(`Ошибка импорта: ${err.message}`)
      console.error('Ошибка импорта:', err)
    } finally {
      setImporting(false)
    }
  }

  const handleImportExample = async () => {
    try {
      setImporting(true)
      setImportStatus('Импорт примерной дорожной карты...')
      
      // Пример дорожной карты
      const exampleRoadmap = [
        {
          title: 'HTML & CSS',
          description: 'Основы веб-разработки: разметка и стилизация',
          category: 'frontend',
          status: 'not-started',
          notes: '',
          difficulty: 'beginner'
        },
        {
          title: 'JavaScript Basics',
          description: 'Основы программирования на JavaScript',
          category: 'language',
          status: 'not-started',
          notes: '',
          difficulty: 'beginner'
        },
        {
          title: 'Git & GitHub',
          description: 'Система контроля версий и работа с репозиториями',
          category: 'devops',
          status: 'not-started',
          notes: '',
          difficulty: 'beginner'
        }
      ]

      await new Promise(resolve => setTimeout(resolve, 800))

      // Добавляем только новые технологии
      const newTechs = exampleRoadmap.filter(tech => {
        return !localTechnologies.some(localTech => localTech.title === tech.title)
      })

      if (newTechs.length === 0) {
        setImportStatus('Все технологии из примерной дорожной карты уже добавлены')
        return
      }

      const updated = [...localTechnologies, ...newTechs.map(tech => ({
        ...tech,
        id: Date.now() + Math.random()
      }))]
      setTechnologies(updated)

      setImportStatus(`Успешно импортировано ${newTechs.length} технологий из примерной дорожной карты`)
      
      setTimeout(() => {
        setImportStatus(null)
      }, 3000)
    } catch (err) {
      setImportStatus(`Ошибка импорта: ${err.message}`)
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>
      <p className="importer-description">
        Импортируйте технологии из внешних источников или используйте примерную дорожную карту
      </p>
      
      <div className="import-actions">
        <button
          onClick={handleImportFromApi}
          disabled={importing || loading}
          className="import-button"
        >
          {importing ? 'Импорт...' : '📥 Импорт из API'}
        </button>
        <button
          onClick={handleImportExample}
          disabled={importing}
          className="import-button secondary"
        >
          {importing ? 'Импорт...' : '📋 Примерная дорожная карта'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {importStatus && (
        <div className={`status-message ${importStatus.includes('Ошибка') ? 'error' : 'success'}`}>
          {importStatus}
        </div>
      )}

      {apiTechnologies.length > 0 && (
        <div className="available-technologies">
          <h4>Доступные технологии из API ({apiTechnologies.length}):</h4>
          <div className="tech-preview">
            {apiTechnologies.slice(0, 3).map(tech => (
              <div key={tech.id} className="tech-preview-item">
                <strong>{tech.title}</strong> - {tech.category}
              </div>
            ))}
            {apiTechnologies.length > 3 && (
              <div className="tech-preview-item">
                и еще {apiTechnologies.length - 3}...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RoadmapImporter

