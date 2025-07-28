import React, { useEffect } from 'react'
// import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL } from '@cknTypes/constants'
// import PanelBasicStudyComponents from '@components/PanelBasicStudy/PanelBasicStudyComponents'
import PanelBasicCreateComponents from '@components/PanelBasicCreate/PanelBasicCreateComponents'
import { usePanelBase } from '@hooks/usePanelBase'

const PanelBasicCreate: React.FC = () => {

  const { translateX } = usePanelBase({
    panelName: ACTIVE_PANEL.BASIC_CREATE,
    translateXOpen: 'translate-x-0',
    translateXClose: 'translate-x-full'
  })

  useEffect(() => {
    console.log(`Inside PanelBasicCreate: ${translateX}`)
  })
  
  return (
    <div className={`panel-right panel-basic bl b--moon-gray bw1 z-1 absolute top-0 left-10 w-90 h-100 bg-light-grayX bg-on-background transition-transform ${translateX}`}>
      <PanelBasicCreateComponents />
    </div>
  )
}

export default PanelBasicCreate
