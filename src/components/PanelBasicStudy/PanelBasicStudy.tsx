import { ACTIVE_PANEL } from '@cknTypes/constants'
import PanelBasicStudyComponents from '@components/PanelBasicStudy/PanelBasicStudyComponents'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'
import { usePanelBase } from '@hooks/usePanelBase'

const PanelBasicStudy = () => {

  const { focusPanel, openPanel, closePanel } = usePanelManager()

  const { translateX, isOpen, isMounted } = usePanelBase({
    panelName: ACTIVE_PANEL.BASIC_STUDY,
    translateXOpen: 'translate-x-0',
    translateXClose: 'translate-x-full',
    callback: {
      onOpen: () => {
        openPanel(ACTIVE_PANEL.BASIC_STUDY_COMPONENTS)
        openPanel(ACTIVE_PANEL.LESSON_BAR)
        openPanel(ACTIVE_PANEL.NAVBAR_BOTTOM)
      },
      onClose: () => {
        closePanel(ACTIVE_PANEL.NAVBAR_BOTTOM)
        closePanel(ACTIVE_PANEL.LESSON_BAR)
        closePanel(ACTIVE_PANEL.BASIC_STUDY_COMPONENTS)
        // focusPanel(ACTIVE_PANEL.NAVBAR_TOP)
      },
      onFocus: () => {
        focusPanel(ACTIVE_PANEL.BASIC_STUDY_COMPONENTS)
      }
    }
  })
  
  return (
    <div className={`panel-basic-study panel-right bl b--moon-gray bw1 z-1 absolute top-0 left-10 w-90 h-100 bg-light-gray transition-transform ${translateX} ${isOpen ? 'panel-visible' : 'panel-hidden'} ${!isMounted ? 'dn' : ''}`}>
      <PanelBasicStudyComponents />
    </div>
  )
}

export default PanelBasicStudy
