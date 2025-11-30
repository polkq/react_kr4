import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import TechnologyList from './pages/TechnologyList'
import TechnologyDetail from './pages/TechnologyDetail'
import AddTechnology from './pages/AddTechnology'
import EditTechnology from './pages/EditTechnology'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'
import ApiExamples from './pages/ApiExamples'
import DataImportExport from './components/DataImportExport'
import Dashboard from './components/Dashboard'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App({ themeMode, setThemeMode }) {
  const toggleTheme = () => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark'
    setThemeMode(newMode)
  }

  return (
    <Router>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default'
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Navigation />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              right: '1rem',
              transform: 'translateY(-50%)',
              zIndex: 1000
            }}
          >
            <ThemeToggle mode={themeMode} onToggle={toggleTheme} />
          </Box>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/add-technology" element={<AddTechnology />} />
            <Route path="/edit-technology/:techId" element={<EditTechnology />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/api-examples" element={<ApiExamples />} />
            <Route path="/import-export" element={<DataImportExport />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  )
}

export default App

