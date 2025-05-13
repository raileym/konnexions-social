import React from 'react'
import { useAppContext } from '../context/AppContext'

const PanelGenAI: React.FC = () => {
  const { activePanel } = useAppContext()
  const isActive = activePanel === 'genAI'
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  return (
    <div className={`absolute top-0 left-0 w-100 h-100 bg-orange white transition-transform ${translateX}`}>
      <h2 className="f3 pa3 mt5">GenAI Panel</h2>
      <p className="pl3 mt5X">This panel slides in and out correctly based on context.</p>
    </div>
  )
}

export default PanelGenAI
