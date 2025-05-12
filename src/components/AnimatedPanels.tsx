// src/components/AnimatedPanels.tsx
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PanelHome from './PanelHome'
import PanelSettings from './PanelSettings'
import PanelHelp from './PanelHelp'

const AnimatedPanels: React.FC = () => {
  const location = useLocation()
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (location.pathname === '/') {
      if (activeOverlay) {
        setClosing(true)
        setTimeout(() => {
          setActiveOverlay(null)
          setClosing(false)
        }, 300)
      }
    } else {
      setActiveOverlay(location.pathname)
    }
  }, [location.pathname])

  const renderOverlay = () => {
    const className = `overlay-panel ${closing ? 'slide-out-right' : 'slide-in-right'}`

    switch (activeOverlay) {
      case '/settings':
        return <div className={className}><PanelSettings /></div>
      case '/help':
        return <div className={className}><PanelHelp /></div>
      default:
        return null
    }
  }

  return (
    <div className="relative w-100 min-vh-100 overflow-hidden">
      <div className="base-panel">
        <PanelHome />
      </div>
      {activeOverlay && renderOverlay()}
    </div>
  )
}

export default AnimatedPanels
