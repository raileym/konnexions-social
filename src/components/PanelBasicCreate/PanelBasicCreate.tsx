// import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'
// import PanelBasicStudyComponents from '@components/PanelBasicStudy/PanelBasicStudyComponents'
import PanelBasicCreateComponents from '@components/PanelBasicCreate/PanelBasicCreateComponents'
import { usePanelBase } from '@hooks/usePanelBase'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'

const PanelBasicCreate = () => {

  const { focusPanel, openPanel, closePanel } = usePanelManager()
  
  const { translateX } = usePanelBase({
    panelName: ACTIVE_PANEL.BASIC_CREATE,
    translateXOpen: 'translate-x-0',
    translateXClose: 'translate-x-full',
    callback: {
      onOpen: () => {
        openPanel(ACTIVE_PANEL.BASIC_CREATE_COMPONENTS)
        openPanel(ACTIVE_PANEL.LESSON_BAR)
        openPanel(ACTIVE_PANEL.NAVBAR_BOTTOM)
      },
      onClose: () => {
        closePanel(ACTIVE_PANEL.NAVBAR_BOTTOM)
        closePanel(ACTIVE_PANEL.LESSON_BAR)
        closePanel(ACTIVE_PANEL.BASIC_CREATE_COMPONENTS)
        // focusPanel(ACTIVE_PANEL.NAVBAR_TOP)
      },
      onFocus: () => {
        focusPanel(ACTIVE_PANEL.LESSON_BAR)
      }
    }
  })

  return (
    <div className={`panel-right panel-basic bl b--moon-gray bw1 z-1 absolute top-0 left-10 w-90 h-100 bg-light-grayX bg-on-background transition-transform ${translateX}`}>
      <PanelBasicCreateComponents />
    </div>
  )
}

export default PanelBasicCreate
