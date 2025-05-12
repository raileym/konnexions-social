// src/App.tsx
import React, { useState } from 'react'
import PanelHome from './components/PanelHome'
import PanelSettings from './components/PanelSettings'
import PanelHelp from './components/PanelHelp'
import './App.css'
import Navbar from './components/Navbar'

const App: React.FC = () => {
  const [activePanel, setActivePanel] = useState<'home' | 'settings' | 'help'>('home')

  return (
    <>
      <Navbar
        onOpenSettings={() => setActivePanel('settings')}
        onOpenHelp={() => setActivePanel('help')}
      />
      <div className="relative w-100 min-vh-100 overflow-hidden bg-light-gray">

        <div className="absolute top-0 left-0 w-100 h-100 z-0">
          <PanelHome onNavigate={(panel) => setActivePanel(panel)} />
        </div>

        <div
          className={`absolute top-0 left-0 w-100 h-100 bg-white z-1 transition-transform ${
            activePanel === 'settings' ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <PanelSettings onClose={() => setActivePanel('home')} />
        </div>

        <div
          className={`absolute top-0 left-0 w-100 h-100 bg-white z-2 transition-transform ${
            activePanel === 'help' ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <PanelHelp onClose={() => setActivePanel('home')} />
        </div>
      </div>
    </>
  )
}

export default App
