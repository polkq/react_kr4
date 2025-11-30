import useLocalStorage from '../hooks/useLocalStorage'
import DeadlineForm from '../components/DeadlineForm'
import BulkStatusEditor from '../components/BulkStatusEditor'
import { useNotification } from '../components/NotificationProvider'
import './Settings.css'

function Settings() {
  const { showNotification } = useNotification()
  const [theme, setTheme] = useLocalStorage('appTheme', 'dark')
  const [notifications, setNotifications] = useLocalStorage('notifications', true)
  const [autoSave, setAutoSave] = useLocalStorage('autoSave', true)
  const [showExamples, setShowExamples] = useLocalStorage('showExamples', true)

  const handleResetData = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все данные? Это действие нельзя отменить!')) {
      localStorage.removeItem('techTrackerData')
      showNotification('Данные успешно сброшены', 'info')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }

  const handleExportData = () => {
    const data = localStorage.getItem('techTrackerData')
    if (data) {
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `tech-tracker-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      showNotification('Данные успешно экспортированы!', 'success')
    } else {
      showNotification('Нет данных для экспорта', 'warning')
    }
  }

  const handleImportData = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result)
          if (Array.isArray(data)) {
            localStorage.setItem('techTrackerData', JSON.stringify(data))
            showNotification(`Импортировано ${data.length} технологий!`, 'success')
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          } else {
            showNotification('Неверный формат файла', 'error')
          }
        } catch (error) {
          showNotification('Ошибка при чтении файла: ' + error.message, 'error')
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="page settings-page">
      <div className="page-header">
        <h1>Настройки</h1>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h2>Внешний вид</h2>
          <div className="setting-item">
            <label htmlFor="theme">Тема оформления</label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="dark">Темная</option>
              <option value="light">Светлая</option>
              <option value="auto">Автоматическая</option>
            </select>
            <p className="setting-hint">Выберите тему оформления приложения</p>
          </div>
        </div>

        <div className="settings-section">
          <h2>Уведомления</h2>
          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              Включить уведомления
            </label>
            <p className="setting-hint">Получать уведомления о важных событиях</p>
          </div>
        </div>

        <div className="settings-section">
          <h2>Работа с данными</h2>
          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
              />
              Автоматическое сохранение
            </label>
            <p className="setting-hint">Автоматически сохранять изменения в localStorage</p>
          </div>

          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showExamples}
                onChange={(e) => setShowExamples(e.target.checked)}
              />
              Показывать примеры компонентов
            </label>
            <p className="setting-hint">Отображать примеры компонентов на главной странице</p>
          </div>
        </div>

        <div className="settings-section">
          <h2>Управление данными</h2>
          <div className="data-actions">
            <button onClick={handleExportData} className="btn btn-primary">
              📥 Экспорт данных
            </button>
            <label className="btn btn-secondary">
              📤 Импорт данных
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                style={{ display: 'none' }}
              />
            </label>
            <button onClick={handleResetData} className="btn btn-danger">
              🗑️ Сбросить все данные
            </button>
          </div>
          <p className="setting-hint warning">
            ⚠️ Внимание: Сброс данных удалит все технологии и заметки. Это действие нельзя отменить!
          </p>
        </div>

        <div className="settings-section">
          <h2>Информация о приложении</h2>
          <div className="app-info">
            <div className="info-item">
              <span>Версия:</span>
              <strong>1.0.0</strong>
            </div>
            <div className="info-item">
              <span>React Router:</span>
              <strong>v6</strong>
            </div>
            <div className="info-item">
              <span>Хранилище:</span>
              <strong>localStorage</strong>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <DeadlineForm />
        </div>

        <div className="settings-section">
          <BulkStatusEditor />
        </div>
      </div>
    </div>
  )
}

export default Settings

