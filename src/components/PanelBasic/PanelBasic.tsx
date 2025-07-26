import React, { useEffect, useState } from 'react'
// import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'
// import PanelBasicReviewComponents from '@components/PanelBasicReview/PanelBasicReviewComponents'
import PanelBasicComponents from '@components/PanelBasic/PanelBasicComponents'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'

const PanelBasic: React.FC = () => {
  // const {
  //   activePanel,
  //   setActivateLessonBar
  // } = useAppContext()
  // const isActive = activePanel === ACTIVE_PANEL.BASIC
  // const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  const { currentPanel } = usePanelManager()
  
  const [translateX, setTranslateX] = useState<string>('translate-x-full')

  useEffect(()=> {
    setTranslateX( currentPanel === ACTIVE_PANEL.BASIC ? 'translate-x-0' : 'translate-x-full')
  }, [currentPanel])

  // useEffect(() => {
  //   if (isActive) {
  //     setActivateLessonBar(true)
  //   }
  // }, [isActive, setActivateLessonBar])

  return (
    <div className={`panel-right panel-basic bl b--moon-gray bw1 z-1 absolute top-0 left-10 w-90 h-100 bg-light-gray transition-transform ${translateX}`}>
      <PanelBasicComponents />
    </div>
  )
}

export default PanelBasic
