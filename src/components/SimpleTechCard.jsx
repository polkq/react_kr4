import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

// Компонент карточки технологии с использованием Material-UI
function SimpleTechCard({ technology, onStatusChange }) {
  const navigate = useNavigate()
  // Функция определения цвета чипа в зависимости от статуса
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in-progress':
        return 'warning'
      default:
        return 'default'
    }
  }

  // Функция получения текста статуса
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Завершено'
      case 'in-progress':
        return 'В процессе'
      default:
        return 'Не начато'
    }
  }

  return (
    <Card sx={{ maxWidth: 345, margin: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {technology.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {technology.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={technology.category || 'Без категории'}
            variant="outlined"
            size="small"
          />
          <Chip
            label={getStatusText(technology.status)}
            color={getStatusColor(technology.status)}
            size="small"
          />
        </Box>
        {technology.deadline && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Дедлайн: {new Date(technology.deadline).toLocaleDateString('ru-RU')}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box>
          {technology.status !== 'completed' && (
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => onStatusChange(technology.id, 'completed')}
              sx={{ mr: 1 }}
            >
              Завершить
            </Button>
          )}
          <Button
            size="small"
            variant="outlined"
            onClick={() => onStatusChange(technology.id, technology.status === 'in-progress' ? 'not-started' : 'in-progress')}
          >
            {technology.status === 'in-progress' ? 'Приостановить' : 'Начать'}
          </Button>
        </Box>
        <IconButton
          size="small"
          onClick={() => navigate(`/technology/${technology.id}`)}
          aria-label="Подробнее"
        >
          <InfoIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default SimpleTechCard

