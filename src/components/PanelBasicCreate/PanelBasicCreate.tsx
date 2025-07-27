import React, { useEffect, useState } from 'react'
// import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'
// import PanelBasicStudyComponents from '@components/PanelBasicStudy/PanelBasicStudyComponents'
import PanelBasicCreateComponents from '@components/PanelBasicCreate/PanelBasicCreateComponents'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'

const PanelBasicCreate: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(-1)
  const [ariaDisabled, setAriaDisabled] = useState<boolean>(true)

  const { currentPanel } = usePanelManager()
  
  const [translateX, setTranslateX] = useState<string>('translate-x-full')

  useEffect(()=> {
    setTranslateX(currentPanel === ACTIVE_PANEL.BASIC_CREATE ? 'translate-x-0' : 'translate-x-full')
    setTabIndex(currentPanel === ACTIVE_PANEL.BASIC_CREATE ? 0 : -1)
    setAriaDisabled(currentPanel !== ACTIVE_PANEL.BASIC_CREATE)
  }, [currentPanel])

  return (
    <div className={`panel-right panel-basic bl b--moon-gray bw1 z-1 absolute top-0 left-10 w-90 h-100 bg-light-grayX bg-on-background transition-transform ${translateX}`}>
      <PanelBasicCreateComponents tabIndex={tabIndex} ariaDisabled={ariaDisabled}/>
    </div>
  )
}

export default PanelBasicCreate
