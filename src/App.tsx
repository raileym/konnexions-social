// src/App.tsx
import React from 'react'
import PanelKeys from './components/PanelKeys'
import PanelHome from './components/PanelHome'
import PanelSettings from './components/PanelSettings'
import PanelHelp from './components/PanelHelp'
import NavbarTop from './components/NavbarTop'
import './App.scss'
import PanelGenAI from './components/PanelGenAI'
import NavbarBottom from './components/NavbarBottom'
import PanelMenu from './components/PanelMenu'

const App: React.FC = () => {
  return (
    <>
      <NavbarTop />
      <div className="relative w-100 min-vh-100 overflow-hidden bg-light-gray">
        <PanelHome />
        <PanelKeys />
        <PanelSettings />
        <PanelHelp />
        <PanelGenAI />
        <PanelMenu />
      </div>
      <NavbarBottom />
      </>
  )
}

export default App
