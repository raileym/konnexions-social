import React, { useEffect } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL } from '@cknTypes/constants'
import PanelGenAIComponents from '@components/PanelGenAI/PanelGenAIComponents'

const PanelGenAI: React.FC = () => {
  const {
    activePanel,
    setActivateLessonBar
  } = useAppContext()
  const isActive = activePanel === APP_PANEL.GEN_AI
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  useEffect(() => {
    if (isActive) {
      setActivateLessonBar(true)
    }
  }, [isActive, setActivateLessonBar])
  
  return (
    <div className={`panel-right panel-gen-ai bl b--moon-gray bw1 z-1 absolute top-0 left-10 w-90 h-100 bg-light-gray transition-transform ${translateX}`}>
      Hello, world
      <PanelGenAIComponents />
    </div>
  )
}

export default PanelGenAI
