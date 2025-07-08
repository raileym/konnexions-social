import React, { useEffect } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL } from '@cknTypes/constants'
import PanelBasicReviewComponents from '@components/PanelBasicReview/PanelBasicReviewComponents'

const PanelBasicReview: React.FC = () => {
  const {
    activePanel,
    setActivateLessonBar
  } = useAppContext()
  const isActive = activePanel === APP_PANEL.BASIC_REVIEW
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  useEffect(() => {
    if (isActive) {
      setActivateLessonBar(true)
    }
  }, [isActive, setActivateLessonBar])

  return (
    <div className={`panel-right panel-basic-review bl b--moon-gray bw1 z-1 absolute top-0 left-10 w-90 h-100 bg-light-gray transition-transform ${translateX}`}>
      <PanelBasicReviewComponents />
    </div>
  )
}

export default PanelBasicReview
