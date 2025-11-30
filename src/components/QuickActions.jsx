import { useState } from 'react'
import Modal from './Modal'
import './QuickActions.css'

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomSelect, hasNotStarted, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportData, setExportData] = useState(null)

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      exportedAtFormatted: new Date().toLocaleString('ru-RU'),
      totalTechnologies: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      inProgress: technologies.filter(t => t.status === 'in-progress').length,
      notStarted: technologies.filter(t => t.status === 'not-started').length,
      technologies: technologies
    }
    
    const dataStr = JSON.stringify(data, null, 2)
    setExportData(dataStr)
    setShowExportModal(true)
    
    // Логируем в консоль
    console.log('Данные для экспорта:', dataStr)
    
    // Создаем и скачиваем файл
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tech-tracker-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="actions-buttons">
        <button 
          className="action-btn action-complete"
          onClick={onMarkAllCompleted}
        >
          ✓ Отметить все как выполненные
        </button>
        <button 
          className="action-btn action-reset"
          onClick={onResetAll}
        >
          ↻ Сбросить все статусы
        </button>
        <button 
          className="action-btn action-random"
          onClick={onRandomSelect}
          disabled={!hasNotStarted}
        >
          🎲 Случайный выбор следующей технологии
        </button>
        <button 
          className="action-btn action-export"
          onClick={handleExport}
        >
          📥 Экспорт данных
        </button>
      </div>
      
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <div className="export-modal-content">
          <p>✅ Данные успешно подготовлены для экспорта!</p>
          <p>Файл JSON был автоматически скачан.</p>
          <p className="export-info">
            <strong>Дата экспорта:</strong> {exportData && JSON.parse(exportData).exportedAtFormatted}
          </p>
          <p className="export-info">
            <strong>Всего технологий:</strong> {technologies.length}
          </p>
          <details className="export-details">
            <summary>Просмотр данных (консоль разработчика)</summary>
            <p className="export-hint">
              Откройте консоль разработчика (F12) для просмотра полных данных экспорта.
            </p>
          </details>
          <button 
            className="export-close-btn"
            onClick={() => setShowExportModal(false)}
          >
            Закрыть
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default QuickActions

