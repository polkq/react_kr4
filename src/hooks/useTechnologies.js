import useLocalStorage from './useLocalStorage'

// Начальные данные для технологий
const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 2,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 3,
    title: 'State Management',
    description: 'Работа с состоянием компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 4,
    title: 'React Hooks',
    description: 'Изучение хуков useState и useEffect',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 5,
    title: 'Event Handling',
    description: 'Обработка событий в React',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 6,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  {
    id: 7,
    title: 'Express.js',
    description: 'Веб-фреймворк для Node.js',
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  {
    id: 8,
    title: 'REST API',
    description: 'Создание RESTful API',
    status: 'not-started',
    notes: '',
    category: 'backend'
  }
]

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', initialTechnologies)

  // Функция для обновления статуса технологии
  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    )
  }

  // Функция для циклического переключения статуса
  const toggleStatus = (techId) => {
    setTechnologies(prev =>
      prev.map(tech => {
        if (tech.id === techId) {
          const statusOrder = ['not-started', 'in-progress', 'completed']
          const currentIndex = statusOrder.indexOf(tech.status)
          const nextIndex = (currentIndex + 1) % statusOrder.length
          return { ...tech, status: statusOrder[nextIndex] }
        }
        return tech
      })
    )
  }

  // Функция для обновления заметок
  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    )
  }

  // Функция для отметки всех как выполненных
  const markAllAsCompleted = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'completed' }))
    )
  }

  // Функция для сброса всех статусов
  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    )
  }

  // Функция для расчета общего прогресса
  const calculateProgress = () => {
    if (technologies.length === 0) return 0
    const completed = technologies.filter(tech => tech.status === 'completed').length
    return Math.round((completed / technologies.length) * 100)
  }

  return {
    technologies,
    setTechnologies,
    updateStatus,
    toggleStatus,
    updateNotes,
    markAllAsCompleted,
    resetAllStatuses,
    progress: calculateProgress()
  }
}

export default useTechnologies

