import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { NotificationProvider } from './components/NotificationProvider'
import useLocalStorage from './hooks/useLocalStorage'
import { createAppTheme } from './theme/theme'
import App from './App.jsx'
import './index.css'

function Root() {
  const [themeMode, setThemeMode] = useLocalStorage('themeMode', 'dark')
  const theme = createAppTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <App themeMode={themeMode} setThemeMode={setThemeMode} />
      </NotificationProvider>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)

