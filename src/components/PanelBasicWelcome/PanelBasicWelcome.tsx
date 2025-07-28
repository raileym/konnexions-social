import { useEffect } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'
import PanelMDXComponents from '@components/PanelMDX/PanelMDXComponents'
// import PanelBasicWelcomeReviewComponents from '@components/PanelBasicWelcomeReview/PanelBasicWelcomeReviewComponents'
// import PanelBasicWelcomeComponents from '@components/PanelBasicWelcome/PanelBasicWelcomeComponents'

const PanelBasicWelcome = () => {
  const {
    activePanel,
    setActivateLessonBar,
    setMdxPage
  } = useAppContext()
  const isActive = activePanel === ACTIVE_PANEL.BASIC_WELCOME
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  useEffect(() => {
    if (isActive) {
      setActivateLessonBar(true)
      // setMdxPage('WelcomeLearnSpanish')
    }
  }, [isActive, setActivateLessonBar, setMdxPage])

  return (
    <div className={`panel-right panel-basic bl b--moon-gray bw1 z-1 absolute top-0 left-10 w-90 h-100 bg-light-gray transition-transform ${translateX}`}>
      <PanelMDXComponents page={'WelcomeLearnSpanish'} />
    </div>
  )
}

export default PanelBasicWelcome
