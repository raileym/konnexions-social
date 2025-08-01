import { ACTIVE_PANEL } from '@cknTypes/constants'
import PanelGenAIComponents from '@components/PanelGenAI/PanelGenAIComponents'
import { usePanelBase } from '@hooks/usePanelBase'

const PanelGenAI = () => {

  const { isOpen, isMounted, translateX } = usePanelBase({panelName: ACTIVE_PANEL.GEN_AI})
  
  return (
    <div
      inert={!isOpen}
      className={`
        panel-gen-ai panel-right bl b--moon-gray bw1 z-1 absolute top-0 left-10 w-90 h-100 bg-light-gray transition-transform
        ${translateX}
        ${isOpen ? 'panel-visible' : 'panel-hiddenX'}
        ${!isMounted ? 'dn' : ''}`}>
      Hello, world
      <PanelGenAIComponents />
    </div>
  )
}

export default PanelGenAI
