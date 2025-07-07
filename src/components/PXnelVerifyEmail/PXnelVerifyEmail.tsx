// src/components/PanelVerifyEmail/PanelVerifyEmail.tsx
import { APP_PANEL } from '@cknTypes/constants'
import PanelVerifyEmailComponents from '@components/PXnelVerifyEmail/PXnelVerifyEmailComponents'
import { useAppContext } from '@context/AppContext/AppContext'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export type PanelVerifyEmailProps = {
  isRouteMode: boolean
}
const PanelVerifyEmail = ({isRouteMode}: PanelVerifyEmailProps) => {
  const {
    activePanel,
    setActivateLessonBar,
    cookedEmail
  } = useAppContext()
  const isActive = activePanel === APP_PANEL.VERIFY_EMAIL
  const translateX = (isActive || isRouteMode) ? 'translate-x-0' : 'translate-x-full'

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  useEffect(() => {
    if (isActive) {
      setActivateLessonBar(false)
    }
  }, [isActive, setActivateLessonBar])

  return (
    <div className={`panel-right panel-verify-email bw1 b--moon-gray bl panel-basic z-0 absolute top-0 left-0 w-100 h-100 flex transition-transform ${translateX}`}>
      {/* <div className="w-100 h-100 bg-blue flex justify-center items-center">{cookedEmail}</div> */}
      <PanelVerifyEmailComponents token={token} cookedEmail={cookedEmail} />
    </div>
  )
}

export default PanelVerifyEmail
