import React, { useState } from 'react'
import PanelHome from './components/PanelHome'
import PanelSettings from './components/PanelSettings'
import PanelHelp from './components/PanelHelp'
import Navbar from './components/Navbar'
import './App.css'

const App: React.FC = () => {
  const [activePanel, setActivePanel] = useState<'home' | 'settings' | 'help'>('home')

  const togglePanel = (panel: 'settings' | 'help') =>
    setActivePanel(prev => (prev === panel ? 'home' : panel))

  return (
    <>
      <Navbar
        onToggleSettings={() => togglePanel('settings')}
        onToggleHelp={() => togglePanel('help')}
      />
      <div className="relative w-100 min-vh-100 overflow-hidden bg-light-gray">
        <PanelHome />
        <PanelSettings onActive={activePanel === 'settings'} />
        <PanelHelp onActive={activePanel === 'help'} />
      </div>
    </>
  )
}

export default App
