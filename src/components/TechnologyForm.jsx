import { useState, useEffect } from 'react'
import './TechnologyForm.css'

function TechnologyForm({ onSave, onCancel, initialData = {} }) {
  // Состояние формы с начальными значениями
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'frontend',
    difficulty: initialData.difficulty || 'beginner',
    deadline: initialData.deadline || '',
    resources: initialData.resources || [''],
    status: initialData.status || 'not-started',
    notes: initialData.notes || ''
  })

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState({})
  // Флаг валидности всей формы
  const [isFormValid, setIsFormValid] = useState(false)

  // Функция валидации с обнулением времени
  const validateForm = () => {
    const newErrors = {}

    // Валидация названия технологии
    if (!formData.title.trim()) {
      newErrors.title = 'Название технологии обязательно'
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Название должно содержать минимум 3 символа'
    }

    // Валидация описания
    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Описание должно содержать минимум 10 символов'
    }

    // Валидация дедлайна (не должен быть в прошлом)
    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline)
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Обнуляем время для корректного сравнения
      
      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом'
      }
    }

    // Валидация ресурсов - минимум один валидный URL
    const validResources = formData.resources.filter(resource => {
      if (!resource.trim()) return false
      try {
        // Пробуем создать URL, добавляя http:// если протокол отсутствует
        const urlToCheck = resource.includes('://') ? resource : `https://${resource}`
        new URL(urlToCheck)
        return true
      } catch {
        return false
      }
    })

    if (validResources.length === 0 && formData.resources.some(r => r.trim())) {
      newErrors.resources = 'Введите хотя бы один валидный URL (например: example.com или https://example.com)'
    }

    setErrors(newErrors)
    setIsFormValid(Object.keys(newErrors).length === 0)
  }

  // Запуск валидации при изменении данных
  useEffect(() => {
    validateForm()
  }, [formData])

  // Обработчик изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Обработчик изменения конкретного ресурса в массиве
  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources]
    newResources[index] = value
    setFormData(prev => ({
      ...prev,
      resources: newResources
    }))
  }

  // Добавление нового поля ресурса
  const handleAddResource = () => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, '']
    }))
  }

  // Удаление поля ресурса
  const handleRemoveResource = (index) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        resources: newResources
      }))
    }
  }

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isFormValid) {
      // Фильтруем пустые ресурсы и валидируем URL
      const validResources = formData.resources
        .filter(resource => resource.trim())
        .map(resource => resource.trim())
      
      const technologyData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        difficulty: formData.difficulty,
        deadline: formData.deadline || null,
        resources: validResources,
        status: formData.status,
        notes: formData.notes.trim()
      }

      onSave(technologyData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="technology-form" noValidate>
      <div className="form-group">
        <label htmlFor="title">
          Название технологии *
          <span className="sr-only">Обязательное поле</span>
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
          placeholder="Например: React Hooks"
          aria-required="true"
          aria-invalid={errors.title ? 'true' : 'false'}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <span id="title-error" className="error-message" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Описание *
          <span className="sr-only">Обязательное поле</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={errors.description ? 'error' : ''}
          placeholder="Опишите, что нужно изучить..."
          aria-required="true"
          aria-invalid={errors.description ? 'true' : 'false'}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description && (
          <span id="description-error" className="error-message" role="alert">
            {errors.description}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            aria-label="Выберите категорию технологии"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Fullstack</option>
            <option value="mobile">Mobile</option>
            <option value="devops">DevOps</option>
            <option value="language">Язык программирования</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Сложность</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            aria-label="Выберите уровень сложности"
          >
            <option value="beginner">Начинающий</option>
            <option value="intermediate">Средний</option>
            <option value="advanced">Продвинутый</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Статус</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            aria-label="Выберите статус изучения"
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="deadline">
          Дедлайн (необязательно)
        </label>
        <input
          id="deadline"
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className={errors.deadline ? 'error' : ''}
          min={new Date().toISOString().split('T')[0]}
          aria-invalid={errors.deadline ? 'true' : 'false'}
          aria-describedby={errors.deadline ? 'deadline-error' : undefined}
        />
        {errors.deadline && (
          <span id="deadline-error" className="error-message" role="alert">
            {errors.deadline}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>
          Ресурсы для изучения *
          <span className="sr-only">Обязательное поле, минимум один валидный URL</span>
        </label>
        <div className="resources-container" role="group" aria-label="Список ресурсов">
          {formData.resources.map((resource, index) => (
            <div key={index} className="resource-input-group">
              <input
                type="url"
                value={resource}
                onChange={(e) => handleResourceChange(index, e.target.value)}
                placeholder="https://example.com"
                className={errors.resources ? 'error' : ''}
                aria-label={`Ресурс ${index + 1}`}
                aria-invalid={errors.resources ? 'true' : 'false'}
              />
              {formData.resources.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveResource(index)}
                  className="remove-resource-btn"
                  aria-label={`Удалить ресурс ${index + 1}`}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddResource}
            className="add-resource-btn"
            aria-label="Добавить еще один ресурс"
          >
            + Добавить ресурс
          </button>
        </div>
        {errors.resources && (
          <span className="error-message" role="alert">
            {errors.resources}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="notes">Заметки (необязательно)</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          placeholder="Добавьте заметки, если нужно..."
          aria-label="Заметки о технологии"
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`btn btn-primary ${!isFormValid ? 'disabled' : ''}`}
          aria-describedby={!isFormValid ? 'submit-hint' : undefined}
        >
          {initialData.title ? 'Сохранить изменения' : 'Добавить технологию'}
        </button>
        {!isFormValid && (
          <span id="submit-hint" className="sr-only">
            Форма содержит ошибки, исправьте их перед отправкой
          </span>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Отмена
        </button>
      </div>
    </form>
  )
}

export default TechnologyForm

