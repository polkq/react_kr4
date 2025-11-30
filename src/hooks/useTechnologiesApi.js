import { useState, useEffect } from 'react'

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Загрузка технологий из API
  const fetchTechnologies = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // В реальном приложении здесь будет запрос к вашему API
      // Сейчас имитируем загрузку с задержкой
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock данные - в реальном приложении замените на реальный API
      const mockTechnologies = [
        {
          id: 1,
          title: 'React',
          description: 'Библиотека для создания пользовательских интерфейсов',
          category: 'frontend',
          difficulty: 'beginner',
          resources: ['https://react.dev', 'https://ru.reactjs.org'],
          status: 'not-started',
          notes: ''
        },
        {
          id: 2,
          title: 'Node.js',
          description: 'Среда выполнения JavaScript на сервере',
          category: 'backend',
          difficulty: 'intermediate',
          resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'],
          status: 'not-started',
          notes: ''
        },
        {
          id: 3,
          title: 'TypeScript',
          description: 'Типизированное надмножество JavaScript',
          category: 'language',
          difficulty: 'intermediate',
          resources: ['https://www.typescriptlang.org'],
          status: 'not-started',
          notes: ''
        },
        {
          id: 4,
          title: 'Vue.js',
          description: 'Прогрессивный JavaScript-фреймворк',
          category: 'frontend',
          difficulty: 'beginner',
          resources: ['https://vuejs.org'],
          status: 'not-started',
          notes: ''
        },
        {
          id: 5,
          title: 'Python',
          description: 'Высокоуровневый язык программирования',
          category: 'language',
          difficulty: 'beginner',
          resources: ['https://www.python.org'],
          status: 'not-started',
          notes: ''
        }
      ]
      
      setTechnologies(mockTechnologies)
    } catch (err) {
      setError('Не удалось загрузить технологии')
      console.error('Ошибка загрузки:', err)
    } finally {
      setLoading(false)
    }
  }

  // Добавление новой технологии
  const addTechnology = async (techData) => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newTech = {
        id: Date.now(), // В реальном приложении ID генерируется на сервере
        ...techData,
        createdAt: new Date().toISOString()
      }
      
      setTechnologies(prev => [...prev, newTech])
      return newTech
    } catch (err) {
      throw new Error('Не удалось добавить технологию')
    }
  }

  // Загружаем технологии при монтировании
  useEffect(() => {
    fetchTechnologies()
  }, [])

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology
  }
}

export default useTechnologiesApi

