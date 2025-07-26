import React, { useEffect } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'
import RightPanel from './PanelGenAIProComponents/RightPanel/RightPanel'

const PanelGenAIPro: React.FC = () => {
  const {
    activePanel,
    setActivateLessonBar
  } = useAppContext()

  const isActive = activePanel === ACTIVE_PANEL.GEN_AI_PRO
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  useEffect(() => {
    if (isActive) {
      setActivateLessonBar(true)
    }
  }, [isActive, setActivateLessonBar])
  
  

  return (
    // <div className={`flex ba w-90 bg-red absolute z-1 left-10 top-0 h-100 transition-transform ${translateX}}`}>
    <div className={`panel-right panel-gen-ai-pro bw1 b--moon-gray bl panel-gen-ai-pro z-1 absolute top-0 left-10 w-90 h-100 bg-light-greenX flex flex-rowX transition-transform ${translateX}`}>
      <RightPanel />
      {/* <div className="bg-green w-100 h-100"></div> */}
    </div>
  )
}

export default PanelGenAIPro
