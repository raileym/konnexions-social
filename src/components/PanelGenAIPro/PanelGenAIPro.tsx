import React from 'react'
import { useAppContext } from '../../context/AppContext/AppContext'
// import {
//   APP_HOME
// } from '@cknTypes/types'
import {
  APP_HOME
} from '@cknTypes/types'
import LeftPanel from './PanelGenAIProComponents/LeftPanel/LeftPanel'
import RightPanel from './PanelGenAIProComponents/RightPanel/RightPanel'

const PanelGenAIPro: React.FC = () => {
  const {
    activeHome
  } = useAppContext()

  const isActive = activeHome === APP_HOME.GEN_AI_PRO
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  return (
    <div className={`gen-ai-pro-panel z-2 absolute top-0 left-0 w-100 h-100 bg-light-green flex flex-rowX transition-transform ${translateX}`}>
      <LeftPanel />
      <RightPanel />
    </div>
  )
}

export default PanelGenAIPro
