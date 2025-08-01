import { useEffect } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'
import PanelGenAIComponents from '@components/PanelGenAI/PanelGenAIComponents'
import { usePanelBase } from '@hooks/usePanelBase'

const PanelGenAI = () => {
  const {
    activePanel,
    setActivateLessonBar
  } = useAppContext()
  const isActive = activePanel === ACTIVE_PANEL.GEN_AI
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  useEffect(() => {
    if (isActive) {
      setActivateLessonBar(true)
    }
  }, [isActive, setActivateLessonBar])

  const { isOpen, isMounted } = usePanelBase({panelName: ACTIVE_PANEL.GEN_AI})
  
  return (
    <div inert={!isOpen} className={`panel-gen-ai panel-right bl b--moon-gray bw1 z-1 absolute top-0 left-10 w-90 h-100 bg-light-gray transition-transform ${translateX} ${isOpen ? 'panel-visible' : 'panel-hiddenX'} ${!isMounted ? 'dnX' : ''}`}>
      Hello, world
      <PanelGenAIComponents />
    </div>
  )
}

export default PanelGenAI
