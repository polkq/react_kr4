import { useState, useEffect, useRef } from 'react'
import './ProductSearch.css'

function ProductSearch() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Используем useRef для хранения таймера и AbortController
  const searchTimeoutRef = useRef(null)
  const abortControllerRef = useRef(null)

  // Функция для поиска продуктов
  const searchProducts = async (query) => {
    // Отменяем предыдущий запрос, если он существует
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Создаем новый AbortController для текущего запроса
    abortControllerRef.current = new AbortController()

    try {
      setLoading(true)
      setError(null)

      // Если поисковый запрос пустой, очищаем результаты
      if (!query.trim()) {
        setProducts([])
        setLoading(false)
        return
      }

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=10`,
        { signal: abortControllerRef.current.signal }
      )

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }

      const data = await response.json()
      setProducts(data.products || [])
    } catch (err) {
      // Игнорируем ошибки отмены запроса
      if (err.name !== 'AbortError') {
        setError(err.message)
        console.error('Ошибка поиска:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  // Эффект для debounce поиска
  useEffect(() => {
    // Очищаем предыдущий таймер
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Устанавливаем новый таймер для задержки поиска
    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(searchTerm)
    }, 500) // Задержка 500ms

    // Очистка при размонтировании
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [searchTerm])

  return (
    <div className="product-search">
      <div className="search-header">
        <h2>Поиск продуктов</h2>
        <p className="search-hint">Поиск с задержкой (debounce) и отменой предыдущих запросов</p>
      </div>
      
      <div className="search-input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введите название продукта..."
          className="search-input"
        />
        {loading && <div className="search-spinner"></div>}
      </div>

      {error && (
        <div className="error-message">
          <p>Ошибка: {error}</p>
        </div>
      )}

      {searchTerm && !loading && products.length === 0 && (
        <div className="no-results">
          <p>Продукты не найдены</p>
        </div>
      )}

      {products.length > 0 && (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.thumbnail && (
                  <img src={product.thumbnail} alt={product.title} />
                )}
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-details">
                  <span className="product-price">${product.price}</span>
                  <span className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? `В наличии (${product.stock})` : 'Нет в наличии'}
                  </span>
                </div>
                <div className="product-rating">
                  <span>⭐ {product.rating}</span>
                  <span className="product-brand">{product.brand}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!searchTerm && (
        <div className="search-placeholder">
          <p>Начните вводить название продукта для поиска...</p>
        </div>
      )}
    </div>
  )
}

export default ProductSearch

