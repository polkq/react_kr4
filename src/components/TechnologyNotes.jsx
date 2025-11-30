import './TechnologyNotes.css'

function TechnologyNotes({ notes, onNotesChange, techId }) {
  return (
    <div className="notes-section" onClick={(e) => e.stopPropagation()}>
      <h4>Мои заметки:</h4>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты..."
        rows="3"
        className="notes-textarea"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="notes-hint">
        {notes.length > 0 ? (
          <span className="notes-saved">✓ Заметка сохранена ({notes.length} символов)</span>
        ) : (
          <span className="notes-empty">Добавьте заметку</span>
        )}
      </div>
    </div>
  )
}

export default TechnologyNotes

