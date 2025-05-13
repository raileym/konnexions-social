// src/App.tsx
import React from 'react'
import PanelKeys from './components/PanelKeys'
import PanelHome from './components/PanelHome'
import PanelSettings from './components/PanelSettings'
import PanelHelp from './components/PanelHelp'
import Navbar from './components/Navbar'
// import { useAppContext, type AppPanel } from './context/AppContext'
import './App.css'

const App: React.FC = () => {
  // const { activePanel, setActivePanel } = useAppContext()

  // const togglePanel = (panel: Exclude<AppPanel, 'home'>) => {
  //   const updateActivePanel = activePanel === panel ? 'home' : panel
  //   setActivePanel(updateActivePanel)
  // }
  

  return (
    <>
      <Navbar 
        // onToggleKeys={() => togglePanel('keys')}
        // onToggleSettings={() => togglePanel('settings')}
        // onToggleHelp={() => togglePanel('help')}
      />
      <div className="relative w-100 min-vh-100 overflow-hidden bg-light-gray">
        <PanelHome />
        <PanelKeys />
        <PanelSettings />
        <PanelHelp />
      </div>
    </>
  )
}

export default App
