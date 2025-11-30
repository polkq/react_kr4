import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

function ThemeToggle({ mode, onToggle }) {
  return (
    <Tooltip title={mode === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}>
      <IconButton
        onClick={onToggle}
        color="inherit"
        aria-label="Переключить тему"
      >
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle

