import { useState } from 'react'
import useTechnologies from '../hooks/useTechnologies'
import { useNotification } from './NotificationProvider'
import './DataImportExport.css'

function DataImportExport() {
  const { technologies, setTechnologies } = useTechnologies()
  const { showNotification } = useNotification()
  const [isDragging, setIsDragging] = useState(false)

  // Функция сохранения данных в localStorage
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('techTrackerData', JSON.stringify(technologies))
      showNotification('Данные сохранены в localStorage', 'success')
    } catch (error) {
      showNotification('Ошибка сохранения данных', 'error')
      console.error('Ошибка сохранения:', error)
    }
  }

  // Функция загрузки данных из localStorage
  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('techTrackerData')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setTechnologies(parsed)
          showNotification(`Загружено ${parsed.length} технологий из localStorage`, 'success')
        } else {
          showNotification('Неверный формат данных в localStorage', 'error')
        }
      } else {
        showNotification('Нет сохраненных данных в localStorage', 'warning')
      }
    } catch (error) {
      showNotification('Ошибка загрузки данных', 'error')
      console.error('Ошибка загрузки:', error)
    }
  }

  // Экспорт данных в JSON-файл
  const exportToJSON = () => {
    try {
      // Преобразуем данные в JSON-строку с форматированием
      const dataStr = JSON.stringify(technologies, null, 2)
      // Создаем Blob объект из строки
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      // Создаем временную ссылку для скачивания
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`
      // Программно кликаем по ссылке для начала скачивания
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      // Освобождаем память
      URL.revokeObjectURL(url)
      showNotification('Данные экспортированы в JSON', 'success')
    } catch (error) {
      showNotification('Ошибка экспорта данных', 'error')
      console.error('Ошибка экспорта:', error)
    }
  }

  const importFromJSON = (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    // Обработчик завершения чтения файла
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        // Проверка что импортированные данные - это массив
        if (!Array.isArray(imported)) {
          throw new Error('Неверный формат данных')
        }
        setTechnologies(imported)
        showNotification(`Импортировано ${imported.length} технологий`, 'success')
      } catch (error) {
        showNotification('Ошибка импорта: неверный формат файла', 'error')
        console.error('Ошибка импорта:', error)
      }
    }
    // Запускаем асинхронное чтение файла как текста
    reader.readAsText(file)
    // Сбрасываем значение input для возможности повторного импорта того же файла
    event.target.value = ''
  }

  // Обработчики drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/json') {
      // Используем ту же логику чтения что и в importFromJSON
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result)
          if (Array.isArray(imported)) {
            setTechnologies(imported)
            showNotification(`Импортировано ${imported.length} технологий`, 'success')
          } else {
            showNotification('Ошибка импорта: неверный формат файла', 'error')
          }
        } catch (error) {
          showNotification('Ошибка импорта: неверный формат файла', 'error')
        }
      }
      reader.readAsText(file)
    } else {
      showNotification('Пожалуйста, перетащите JSON файл', 'warning')
    }
  }

  return (
    <div className="data-import-export">
      <h1>Импорт и экспорт данных</h1>

      {/* Кнопки управления */}
      <div className="controls">
        <button 
          onClick={exportToJSON} 
          disabled={technologies.length === 0}
          className="control-btn"
          aria-label="Экспортировать данные в JSON файл"
        >
          📥 Экспорт в JSON
        </button>
        <label className="file-input-label">
          📤 Импорт из JSON
          <input
            type="file"
            accept=".json"
            onChange={importFromJSON}
            style={{ display: 'none' }}
            aria-label="Выберите JSON файл для импорта"
          />
        </label>
        <button 
          onClick={saveToLocalStorage} 
          disabled={technologies.length === 0}
          className="control-btn"
          aria-label="Сохранить данные в localStorage"
        >
          💾 Сохранить в localStorage
        </button>
        <button 
          onClick={loadFromLocalStorage}
          className="control-btn"
          aria-label="Загрузить данные из localStorage"
        >
          📂 Загрузить из localStorage
        </button>
      </div>

      {/* Область drag-and-drop */}
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        aria-label="Область для перетаскивания JSON файлов"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            document.querySelector('input[type="file"]')?.click()
          }
        }}
      >
        <div className="drop-zone-content">
          <div className="drop-zone-icon">📁</div>
          <p>Перетащите JSON-файл сюда</p>
          <p className="drop-zone-hint">или нажмите для выбора файла</p>
        </div>
      </div>

      {/* Список импортированных технологий */}
      {technologies.length > 0 && (
        <div className="technologies-list">
          <h2>Технологии ({technologies.length})</h2>
          <ul>
            {technologies.slice(0, 10).map((tech, index) => (
              <li key={tech.id || index}>
                <strong>{tech.title}</strong> - {tech.category || 'без категории'}
              </li>
            ))}
            {technologies.length > 10 && (
              <li className="more-items">и еще {technologies.length - 10}...</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DataImportExport

