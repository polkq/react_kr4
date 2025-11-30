import UserList from '../components/UserList'
import ProductSearch from '../components/ProductSearch'
import RoadmapImporter from '../components/RoadmapImporter'
import './ApiExamples.css'

function ApiExamples() {
  return (
    <div className="page api-examples-page">
      <div className="page-header">
        <h1>Примеры работы с API</h1>
        <p className="page-subtitle">
          Демонстрация различных способов работы с внешними API в React
        </p>
      </div>

      <div className="examples-section">
        <div className="example-card">
          <h2>Пример 1: Базовый запрос к API</h2>
          <p className="example-description">
            Загрузка списка пользователей из JSONPlaceholder API с обработкой состояний загрузки и ошибок
          </p>
          <UserList />
        </div>

        <div className="example-card">
          <h2>Пример 2: Поиск с debounce</h2>
          <p className="example-description">
            Поиск продуктов с задержкой (debounce) и отменой предыдущих запросов при новом поиске
          </p>
          <ProductSearch />
        </div>

        <div className="example-card">
          <h2>Пример 3: Импорт дорожной карты</h2>
          <p className="example-description">
            Импорт технологий из API и добавление их в локальное хранилище
          </p>
          <RoadmapImporter />
        </div>
      </div>
    </div>
  )
}

export default ApiExamples

