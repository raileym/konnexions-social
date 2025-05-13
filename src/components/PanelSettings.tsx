import React from 'react'
import { useAppContext } from '../context/AppContext'

const PanelSettings: React.FC = () => {
  const { activePanel } = useAppContext()
  const isActive = activePanel === 'settings'
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  return (
    <div className={`absolute top-0 left-0 w-100 h-100 bg-green white transition-transform ${translateX}`}>
      <h2 className="f3 pa3 mt5">Settings Panel</h2>
      <p>This panel slides in and out correctly based on context.</p>
    </div>
  )
}

export default PanelSettings
