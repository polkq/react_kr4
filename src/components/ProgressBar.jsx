import './ProgressBar.css'

// Переиспользуемый компонент прогресс-бара
function ProgressBar({ 
  progress, 
  label, 
  color = '#646cff', 
  height = 20, 
  showPercentage = true,
  animated = false 
}) {
  // Ограничиваем прогресс от 0 до 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className="progress-bar-wrapper">
      {label && (
        <div className="progress-bar-label">
          <span>{label}</span>
          {showPercentage && (
            <span className="progress-percentage">{clampedProgress}%</span>
          )}
        </div>
      )}
      <div 
        className="progress-bar-container"
        style={{ height: `${height}px` }}
      >
        <div
          className={`progress-bar-fill ${animated ? 'animated' : ''}`}
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: color,
            height: `${height}px`
          }}
        >
          {showPercentage && !label && (
            <span className="progress-text">{clampedProgress}%</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar

