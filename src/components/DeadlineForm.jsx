import { useState, useEffect } from 'react'
import useTechnologies from '../hooks/useTechnologies'
import './DeadlineForm.css'

function DeadlineForm() {
  const { technologies, setTechnologies } = useTechnologies()
  const [selectedTechs, setSelectedTechs] = useState([])
  const [deadline, setDeadline] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [status, setStatus] = useState('')

  // Валидация формы
  useEffect(() => {
    const newErrors = {}

    if (selectedTechs.length === 0) {
      newErrors.selectedTechs = 'Выберите хотя бы одну технологию'
    }

    if (!deadline) {
      newErrors.deadline = 'Дедлайн обязателен для заполнения'
    } else {
      const deadlineDate = new Date(deadline)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом'
      }
    }

    setErrors(newErrors)
    setIsFormValid(Object.keys(newErrors).length === 0)
  }, [selectedTechs, deadline])

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

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isFormValid) return

    const updated = technologies.map(tech =>
      selectedTechs.includes(tech.id)
        ? { ...tech, deadline }
        : tech
    )

    setTechnologies(updated)
    setStatus(`Дедлайн установлен для ${selectedTechs.length} технологий`)
    setSelectedTechs([])
    setDeadline('')

    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <div className="deadline-form-container">
      <h2>Установка сроков изучения</h2>
      <p className="form-description">
        Выберите технологии и установите для них дедлайн изучения
      </p>

      <form onSubmit={handleSubmit} className="deadline-form" noValidate>
        <div className="form-section">
          <div className="section-header">
            <label>
              Выберите технологии *
              <span className="sr-only">Обязательное поле</span>
            </label>
            <button
              type="button"
              onClick={handleSelectAll}
              className="select-all-btn"
              aria-label="Выбрать все технологии"
            >
              {selectedTechs.length === technologies.length ? 'Снять все' : 'Выбрать все'}
            </button>
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
                  htmlFor={`tech-${tech.id}`}
                >
                  <input
                    id={`tech-${tech.id}`}
                    type="checkbox"
                    checked={selectedTechs.includes(tech.id)}
                    onChange={() => handleTechToggle(tech.id)}
                    aria-describedby={tech.deadline ? `deadline-${tech.id}` : undefined}
                  />
                  <div className="tech-info">
                    <span className="tech-name">{tech.title}</span>
                    {tech.deadline && (
                      <span id={`deadline-${tech.id}`} className="existing-deadline">
                        Текущий дедлайн: {new Date(tech.deadline).toLocaleDateString('ru-RU')}
                      </span>
                    )}
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
        </div>

        <div className="form-section">
          <label htmlFor="deadline">
            Дедлайн *
            <span className="sr-only">Обязательное поле</span>
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={errors.deadline ? 'error' : ''}
            min={new Date().toISOString().split('T')[0]}
            aria-required="true"
            aria-invalid={errors.deadline ? 'true' : 'false'}
            aria-describedby={errors.deadline ? 'deadline-error' : undefined}
          />
          {errors.deadline && (
            <span id="deadline-error" className="error-message" role="alert">
              {errors.deadline}
            </span>
          )}
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
            Установить дедлайн
          </button>
          {!isFormValid && (
            <span id="submit-hint" className="sr-only">
              Форма содержит ошибки, исправьте их перед отправкой
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

export default DeadlineForm

