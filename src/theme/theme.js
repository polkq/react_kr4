import { createTheme } from '@mui/material/styles'

// Функция для создания темы
export const createAppTheme = (mode = 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#646cff' : '#1976d2',
      },
      secondary: {
        main: mode === 'dark' ? '#ff9800' : '#dc004e',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1a1a1a' : '#ffffff',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        'system-ui',
        'Avenir',
        'Helvetica',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
        },
      },
    },
  })
}

