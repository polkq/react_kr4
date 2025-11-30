import useLocalStorage from '../hooks/useLocalStorage'
import './UserSettings.css'

// Компонент настроек пользователя - пример использования кастомного хука useLocalStorage
function UserSettings() {
  // Используем наш кастомный хук для разных настроек
  const [username, setUsername] = useLocalStorage('username', 'Гость')
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [notifications, setNotifications] = useLocalStorage('notifications', true)

  return (
    <div className="user-settings">
      <h2>Настройки пользователя</h2>
      <div className="setting-group">
        <label>Имя пользователя:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите ваше имя"
        />
      </div>
      <div className="setting-group">
        <label>Тема оформления:</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Светлая</option>
          <option value="dark">Темная</option>
          <option value="auto">Авто</option>
        </select>
      </div>
      <div className="setting-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Включить уведомления
        </label>
      </div>
      <div className="current-settings">
        <h3>Текущие настройки:</h3>
        <p>Имя: <strong>{username}</strong></p>
        <p>Тема: <strong>{theme}</strong></p>
        <p>Уведомления: <strong>{notifications ? 'Включены' : 'Выключены'}</strong></p>
      </div>
    </div>
  )
}

export default UserSettings

