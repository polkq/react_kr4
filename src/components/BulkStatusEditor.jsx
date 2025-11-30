import { useState, useEffect } from 'react'
import useTechnologies from '../hooks/useTechnologies'
import './BulkStatusEditor.css'

function BulkStatusEditor() {
  const { technologies, setTechnologies } = useTechnologies()
  const [selectedTechs, setSelectedTechs] = useState([])
  const [newStatus, setNewStatus] = useState('not-started')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [status, setStatus] = useState('')

  // Валидация формы
  useEffect(() => {
    const newErrors = {}

    if (selectedTechs.length === 0) {
      newErrors.selectedTechs = 'Выберите хотя бы одну технологию'
    }

    setErrors(newErrors)
    setIsFormValid(Object.keys(newErrors).length === 0)
  }, [selectedTechs])

  const handleTechToggle = (techId) => {
    setSelectedTechs(prev =>
      prev.includes(techId)
        ? prev.filter(id => id !== techId)
        : [...prev, techId]
    )
  }

  const handleSelectAll = () => {
    if (selectedTechs.length === technologies.length) {
      setSelectedTechs([])
    } else {
      setSelectedTechs(technologies.map(tech => tech.id))
    }
  }

  const handleSelectByStatus = (status) => {
    const techsWithStatus = technologies
      .filter(tech => tech.status === status)
      .map(tech => tech.id)
    setSelectedTechs(techsWithStatus)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isFormValid) return

    const updated = technologies.map(tech =>
      selectedTechs.includes(tech.id)
        ? { ...tech, status: newStatus }
        : tech
    )

    setTechnologies(updated)
    setStatus(`Статус обновлен для ${selectedTechs.length} технологий`)
    setSelectedTechs([])
    setNewStatus('not-started')

    setTimeout(() => setStatus(''), 3000)
  }

  const getStatusCount = (status) => {
    return technologies.filter(tech => tech.status === status).length
  }

  return (
    <div className="bulk-status-editor-container">
      <h2>Массовое редактирование статусов</h2>
      <p className="form-description">
        Выберите несколько технологий и измените их статус одновременно
      </p>

      <form onSubmit={handleSubmit} className="bulk-status-form" noValidate>
        <div className="form-section">
          <div className="section-header">
            <label>
              Выберите технологии *
              <span className="sr-only">Обязательное поле</span>
            </label>
            <div className="selection-controls">
              <button
                type="button"
                onClick={handleSelectAll}
                className="control-btn"
                aria-label="Выбрать все технологии"
              >
                {selectedTechs.length === technologies.length ? 'Снять все' : 'Выбрать все'}
              </button>
              <div className="status-filters">
                <button
                  type="button"
                  onClick={() => handleSelectByStatus('not-started')}
                  className="status-filter-btn"
                  aria-label={`Выбрать все не начатые (${getStatusCount('not-started')})`}
                >
                  Не начатые ({getStatusCount('not-started')})
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectByStatus('in-progress')}
                  className="status-filter-btn"
                  aria-label={`Выбрать все в процессе (${getStatusCount('in-progress')})`}
                >
                  В процессе ({getStatusCount('in-progress')})
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectByStatus('completed')}
                  className="status-filter-btn"
                  aria-label={`Выбрать все завершенные (${getStatusCount('completed')})`}
                >
                  Завершенные ({getStatusCount('completed')})
                </button>
              </div>
            </div>
          </div>

          <div
            className="techs-list"
            role="group"
            aria-label="Список технологий для выбора"
          >
            {technologies.length === 0 ? (
              <p className="empty-message">Нет доступных технологий</p>
            ) : (
              technologies.map(tech => (
                <label
                  key={tech.id}
                  className="tech-checkbox-label"
                  htmlFor={`bulk-tech-${tech.id}`}
                >
                  <input
                    id={`bulk-tech-${tech.id}`}
                    type="checkbox"
                    checked={selectedTechs.includes(tech.id)}
                    onChange={() => handleTechToggle(tech.id)}
                    aria-describedby={`tech-status-${tech.id}`}
                  />
                  <div className="tech-info">
                    <span className="tech-name">{tech.title}</span>
                    <span
                      id={`tech-status-${tech.id}`}
                      className={`tech-status status-${tech.status}`}
                    >
                      {tech.status === 'completed' && '✓ Изучено'}
                      {tech.status === 'in-progress' && '⟳ В процессе'}
                      {tech.status === 'not-started' && '○ Не начато'}
                    </span>
                  </div>
                </label>
              ))
            )}
          </div>

          {errors.selectedTechs && (
            <span className="error-message" role="alert">
              {errors.selectedTechs}
            </span>
          )}

          {selectedTechs.length > 0 && (
            <div className="selection-info">
              Выбрано: <strong>{selectedTechs.length}</strong> из {technologies.length}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="new-status">
            Новый статус *
            <span className="sr-only">Обязательное поле</span>
          </label>
          <select
            id="new-status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            aria-required="true"
            aria-label="Выберите новый статус для выбранных технологий"
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>

        {status && (
          <div className="status-message success" role="alert">
            {status}
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`btn btn-primary ${!isFormValid ? 'disabled' : ''}`}
            aria-describedby={!isFormValid ? 'submit-hint' : undefined}
          >
            Применить изменения
          </button>
          {!isFormValid && (
            <span id="submit-hint" className="sr-only">
              Форма содержит ошибки, исправьте их перед отправкой
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              setSelectedTechs([])
              setNewStatus('not-started')
            }}
            className="btn btn-secondary"
          >
            Сбросить
          </button>
        </div>
      </form>
    </div>
  )
}

export default BulkStatusEditor

