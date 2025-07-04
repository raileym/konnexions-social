import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_HOME } from '@cknTypes/constants'
// import LeftPanel from '@PanelGenAIProComponents/LeftPanel/LeftPanel'
import RightPanel from './PanelGenAIProComponents/RightPanel/RightPanel'

const PanelGenAIPro: React.FC = () => {
  const {
    activeHome
  } = useAppContext()

  const isActive = activeHome === APP_HOME.GEN_AI_PRO
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  return (
    // <div className={`flex ba w-90 bg-red absolute z-2 left-10 top-0 h-100 transition-transform ${translateX}}`}>
    <div className={`baX bw1 b--moon-gray bl gen-ai-pro-panel z-2 absolute top-0 left-10 w-90 h-100 bg-light-greenX flex flex-rowX transition-transform ${translateX}`}>
      <RightPanel />
      {/* <div className="bg-green w-100 h-100"></div> */}
    </div>
  )
}

export default PanelGenAIPro
