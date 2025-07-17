import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { AppProvider } from '@context/AppContext/AppContext'
import App from '../src/App'
import 'tachyons/css/tachyons.min.css' // ← Tachyons global styles
import { ThemeProvider } from '@context/ThemeContext/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AppProvider>
  </StrictMode>
)
