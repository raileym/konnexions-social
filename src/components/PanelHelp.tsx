import React from 'react'
import { useAppContext } from '../context/AppContext'

const PanelSettings: React.FC = () => {
  const { helpPanel, isHelpOpen } = useAppContext()
  
  const translateX = isHelpOpen ? 'translate-x-25' : 'translate-x-full'

  return (
    <div className={`help-panel absolute z-2 top-0 left-0 w-100 h-100 bg-green white transition-transform ${translateX}`}>
      <div className="h-100 w-100 overflow-y-auto">
        <div className="pa4 mw6 w-70X centerX mb5">
          <h2 className="f3 pa3 mt5">Help Panel for {helpPanel}</h2>
          <p className="pl3">This panel slides in and out correctly based on context.</p>
          <div style={{height: '100em'}} className="bg-blue" />
        </div>
      </div>
    </div>
  )  
}

export default PanelSettings
