import { APP_PANEL } from '@cknTypes/constants'
import PanelVerifyEmailComponents from '@components/PanelVerifyEmail/PanelVerifyEmailComponents'
import { useAppContext } from '@context/AppContext/AppContext'
import { useEffect } from 'react'

const PanelVerifyEmail = () => {

  const {
    activePanel,
    setActivateLessonBar
  } = useAppContext()
  const isActive = activePanel === APP_PANEL.VERIFY_EMAIL
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  useEffect(() => {
    if (isActive) {
      setActivateLessonBar(false)
    }
  }, [isActive, setActivateLessonBar])

  return (
    <div className={`panel-right panel-verify-email bw1 b--moon-gray bl panel-basic z-0 absolute top-0 left-0 w-100 h-100 flex transition-transform ${translateX}`}>
      <PanelVerifyEmailComponents />
    </div>
  )
}

export default PanelVerifyEmail
