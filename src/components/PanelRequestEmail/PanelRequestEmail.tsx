import { APP_PANEL } from '@cknTypes/constants'
import PanelRequestEmailComponents from '@components/PanelRequestEmail/PanelRequestEmailComponents'
import { useAppContext } from '@context/AppContext/AppContext'

const PanelRequestEmail = () => {

  const {
    activePanel,
    setActivateLessonBar
  } = useAppContext()
  const isActive = activePanel === APP_PANEL.REQUEST_EMAIL
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  if (isActive) {
    setActivateLessonBar(false)
  }

  return (
    <div className={`panel-right panel-request-email bw1 b--moon-gray bl panel-basic z-5 absolute top-0 left-0 w-100 h-100 flex transition-transform ${translateX}`}>
      <PanelRequestEmailComponents />
    </div>
  )
}

export default PanelRequestEmail
