import './Modal.css'

// Простой переиспользуемый компонент модального окна
function Modal({ isOpen, onClose, title, children }) {
  // Если модалка закрыта - не показываем ничего
  if (!isOpen) {
    return null
  }

  // Функция для закрытия модалки при клике на фон
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  // Закрытие по Escape
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div 
      className="modal-background" 
      onClick={handleBackgroundClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="modal-window">
        {/* Шапка модалки с заголовком и кнопкой закрытия */}
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>
        {/* Основное содержимое модалки */}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal

