import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL } from '@cknTypes/constants'

const PanelMenu: React.FC = () => {
  const { activePanel } = useAppContext()
  const isActive = activePanel === APP_PANEL.MENU
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  return (
    <div className={`menu-panel z-3 bl b--moon-gray bw1 absolute top-0 left-10 w-90 h-100 bg-light-gray black transition-transform ${translateX}`}>
      <div className="h-100 w-100 overflow-y-auto">
        <div className="pa4 mw7 w-100 center mb5">
          <h2 className="f3 pa3 mt5">Menu Panel</h2>
          <p className="pl3">This panel slides in and out correctly based on context.</p>
          <div style={{height: '100em'}} className="bg-red" />
        </div>
      </div>
    </div>
  )  
}

export default PanelMenu
