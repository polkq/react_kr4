import { Link } from 'react-router-dom'
import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewListIcon from '@mui/icons-material/ViewList'
import useTechnologies from '../hooks/useTechnologies'
import TechnologyCard from '../components/TechnologyCard'
import SimpleTechCard from '../components/SimpleTechCard'
import TechnologyFilter from '../components/TechnologyFilter'
import TechnologySearch from '../components/TechnologySearch'
import { useState, useEffect, useRef } from 'react'
import { useNotification } from '../components/NotificationProvider'
import './TechnologyList.css'

function TechnologyList() {
  const { technologies, toggleStatus, updateNotes, updateStatus } = useTechnologies()
  const { showNotification } = useNotification()
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('mui') // 'mui' или 'custom'
  const searchTimeoutRef = useRef(null)

  const handleStatusChange = (id, newStatus) => {
    updateStatus(id, newStatus)
    showNotification(`Статус технологии обновлен`, 'success')
  }

  // Debounce для поискового запроса
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500) // Задержка 500ms

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery])

  // Фильтрация технологий по статусу и поисковому запросу
  const filteredTechnologies = technologies.filter(tech => {
    const matchesFilter = filter === 'all' || tech.status === filter
    const matchesSearch = debouncedSearchQuery === '' || 
      tech.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      (tech.notes && tech.notes.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
    
    return matchesFilter && matchesSearch
  })

  return (
    <div className="page technology-list-page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>

      <TechnologySearch 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        resultsCount={filteredTechnologies.length}
      />
      
      <TechnologyFilter currentFilter={filter} onFilterChange={setFilter} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => newMode && setViewMode(newMode)}
          aria-label="Режим отображения"
        >
          <ToggleButton value="mui" aria-label="Material-UI карточки">
            <ViewModuleIcon sx={{ mr: 1 }} />
            MUI
          </ToggleButton>
          <ToggleButton value="custom" aria-label="Кастомные карточки">
            <ViewListIcon sx={{ mr: 1 }} />
            Кастомные
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {viewMode === 'mui' ? (
        <Grid container spacing={2}>
          {filteredTechnologies.map(tech => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
              <SimpleTechCard
                technology={tech}
                onStatusChange={handleStatusChange}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="technologies-container">
          {filteredTechnologies.map(tech => (
            <Link 
              key={tech.id} 
              to={`/technology/${tech.id}`}
              className="technology-link"
            >
              <TechnologyCard
                id={tech.id}
                title={tech.title}
                description={tech.description}
                status={tech.status}
                notes={tech.notes}
                onStatusChange={toggleStatus}
                onNotesChange={updateNotes}
              />
            </Link>
          ))}
        </div>
      )}

      {filteredTechnologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий пока нет или не найдено по запросу.</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить первую технологию
          </Link>
        </div>
      )}
    </div>
  )
}

export default TechnologyList

