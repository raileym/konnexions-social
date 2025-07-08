import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { MENU_PANEL_TRANSLATE_X, MENU_PANEL_WIDTH_PERCENT } from '@cknTypes/constants'
// import { APP_PANEL } from '@cknTypes/constants'

const PanelMenu: React.FC = () => {
  const { isMenuOpen } = useAppContext()
  // const { activePanel, isMenuOpen } = useAppContext()
  // const isActive = activePanel === APP_PANEL.MENU
  const translateX = isMenuOpen ? MENU_PANEL_TRANSLATE_X : 'translate-x-full'

  // useEffect(() => {
  //   if (isActive) {
  //     setActivateLessonBar(true)
  //   }
  // }, [isActive, setActivateLessonBar])

  return (
    <div className={`panel-right panel-help absolute bl b--black bw1 z-3 top-0 left-10 w-90 h-100 bg-red white pt5 transition-transform ${translateX}`}>
      <div className="h-100 w-100 overflow-y-auto">
        <div className={`pa4 ${MENU_PANEL_WIDTH_PERCENT} mb5`}>
          <h2 className="f3 pa3 mt5">Menu Panel</h2>
          <p className="pl3">This panel slides in and out correctly based on context.</p>
          <div style={{height: '100em'}} className="bg-blue" />
        </div>
      </div>
    </div>
  )  
}

export default PanelMenu

    // <div className={`panel-right panel-menu z-3 bl b--moon-gray bw1 absolute top-0 left-10 w-90 h-100 bg-light-gray black transition-transform ${translateX}`}>
    //   <div className="h-100 w-100 overflow-y-auto">
    //     <div className={`pa4 mw7 w-100 center ${MENU_PANEL_WIDTH_PERCENT} mb5`}>
    //       <h2 className="f3 pa3 mt5">Menu Panel</h2>
    //       <p className="pl3">This panel slides in and out correctly based on context.</p>
    //       <div style={{height: '100em'}} className="bg-red" />
    //     </div>
    //   </div>
    // </div>

