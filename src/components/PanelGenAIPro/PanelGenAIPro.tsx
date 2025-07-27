import React, { useEffect, useState } from 'react'
// import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'
import PanelGenAIProComponents from './PanelGenAIProComponents/PanelGenAIProComponents'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'

const PanelGenAIPro: React.FC = () => {
  const [translateX, setTranslateX] = useState<string>('translate-x-full')
  const { currentPanel } = usePanelManager()
  
  useEffect(()=> {
    setTranslateX( currentPanel === ACTIVE_PANEL.GEN_AI_PRO ? 'translate-x-0' : 'translate-x-full')
  }, [currentPanel])

  return (
    // <div className={`flex ba w-90 bg-red absolute z-1 left-10 top-0 h-100 transition-transform ${translateX}}`}>
    <div className={`panel-right panel-gen-ai-pro bw1 b--moon-gray bl panel-gen-ai-pro z-1 absolute top-0 left-10 w-90 h-100 bg-light-greenX flex flex-rowX transition-transform ${translateX}`}>
      <PanelGenAIProComponents />
      {/* <div className="bg-green w-100 h-100"></div> */}
    </div>
  )
}

export default PanelGenAIPro
