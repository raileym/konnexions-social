import { ACTIVE_PANEL } from '@cknTypes/constants'
import PanelGenAIProComponents from './PanelGenAIProComponents/PanelGenAIProComponents'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'
import { usePanelBase } from '@hooks/usePanelBase'

const PanelGenAIPro = () => {
  const { focusPanel, openPanel, closePanel } = usePanelManager()
  
  const { translateX } = usePanelBase({
    panelName: ACTIVE_PANEL.GEN_AI_PRO,
    translateXOpen: 'translate-x-0',
    translateXClose: 'translate-x-full',
    callback: {
      onOpen: () => {
        openPanel(ACTIVE_PANEL.GEN_AI_PRO_COMPONENTS)
      },
      onClose: () => {
        closePanel(ACTIVE_PANEL.GEN_AI_PRO_COMPONENTS)
      },
      onFocus: () => {
        focusPanel(ACTIVE_PANEL.GEN_AI_PRO_COMPONENTS)
      }
    }
  })

  return (
    <div className={`panel-right panel-gen-ai-pro bw1 b--moon-gray bl panel-gen-ai-pro z-1 absolute top-0 left-10 w-90 h-100 bg-light-greenX flex flex-rowX transition-transform ${translateX}`}>
      <PanelGenAIProComponents />
    </div>
  )
}

export default PanelGenAIPro
