import { ACTIVE_PANEL } from '@cknTypes/constants'
import PanelMDXComponents from '@components/PanelMDX/PanelMDXComponents'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'
import { usePanelBase } from '@hooks/usePanelBase'
// import PanelBasicWelcomeReviewComponents from '@components/PanelBasicWelcomeReview/PanelBasicWelcomeReviewComponents'
// import PanelBasicWelcomeComponents from '@components/PanelBasicWelcome/PanelBasicWelcomeComponents'

const PanelBasicWelcome = () => {

  const { focusPanel, openPanel, closePanel } = usePanelManager()

  const { translateX, isOpen, isMounted } = usePanelBase({
    panelName: ACTIVE_PANEL.BASIC_WELCOME,
    translateXOpen: 'translate-x-0',
    translateXClose: 'translate-x-full',

    callback: {
      onOpen: () => {
        openPanel(ACTIVE_PANEL.LESSON_BAR)
      },
      onClose: () => {
        closePanel(ACTIVE_PANEL.LESSON_BAR)
      },
      onFocus: () => {
        focusPanel(ACTIVE_PANEL.LESSON_BAR)
      }
    }

  })

  // const { translateX } = usePanelBase({
  //   panelName: ACTIVE_PANEL.BASIC_CREATE,
  //   translateXOpen: 'translate-x-0',
  //   translateXClose: 'translate-x-full',
  //   callback: {
  //     onOpen: () => {
  //       openPanel(ACTIVE_PANEL.BASIC_CREATE_COMPONENTS)
  //       openPanel(ACTIVE_PANEL.LESSON_BAR)
  //       openPanel(ACTIVE_PANEL.NAVBAR_BOTTOM)
  //     },
  //     onClose: () => {
  //       closePanel(ACTIVE_PANEL.NAVBAR_BOTTOM)
  //       closePanel(ACTIVE_PANEL.LESSON_BAR)
  //       closePanel(ACTIVE_PANEL.BASIC_CREATE_COMPONENTS)
  //       // focusPanel(ACTIVE_PANEL.NAVBAR_TOP)
  //     },
  //     onFocus: () => {
  //       focusPanel(ACTIVE_PANEL.LESSON_BAR)
  //     }
  //   }
  // })

  return (
    <div inert={!isOpen} className={`panel-basic-welcome panel-right panel-basic bl b--moon-gray bw1 z-1 absolute top-0 left-10 w-90 h-100 bg-light-gray transition-transform ${translateX} ${isOpen ? 'panel-visible' : 'panel-hiddenX'} ${!isMounted ? 'dnX' : ''}`}>
      <PanelMDXComponents page={'WelcomeLearnSpanish'} />
    </div>
  )
}

export default PanelBasicWelcome
