import './TechnologyCard.css'
import TechnologyNotes from './TechnologyNotes'

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
  const getStatusClass = () => {
    switch (status) {
      case 'completed':
        return 'status-completed'
      case 'in-progress':
        return 'status-in-progress'
      case 'not-started':
        return 'status-not-started'
      default:
        return ''
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return '✓ Изучено'
      case 'in-progress':
        return '⟳ В процессе'
      case 'not-started':
        return '○ Не начато'
      default:
        return ''
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return '✓'
      case 'in-progress':
        return '⟳'
      case 'not-started':
        return '○'
      default:
        return ''
    }
  }

  const handleClick = () => {
    if (onStatusChange) {
      onStatusChange(id)
    }
  }

  return (
    <div 
      className={`technology-card ${getStatusClass()}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <div className="card-header">
        <h3>{title}</h3>
        <span className="status-badge">{getStatusText()}</span>
      </div>
      <p className="card-description">{description}</p>
      <div className="status-indicator">
        <span className="status-icon">{getStatusIcon()}</span>
      </div>
      <TechnologyNotes 
        notes={notes || ''} 
        onNotesChange={onNotesChange}
        techId={id}
      />
      <div className="card-hint">Нажмите на карточку для изменения статуса</div>
    </div>
  )
}

export default TechnologyCard

