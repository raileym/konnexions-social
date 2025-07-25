import { PROFILE_PANEL_TRANSLATE_X, PROFILE_PANEL_WIDTH_PERCENT, SCREEN } from '@cknTypes/constants'
import PanelProfileComponents from '@components/PanelProfile/PanelProfileComponents'
import { useAppContext } from '@context/AppContext/AppContext'
import { useActivePanel } from '@hooks/useActivePanel'
import { useEffect, useState } from 'react'

const PanelProfile = () => {
  const { screenState, isProfileOpen } = useAppContext()
  const { refs } = useActivePanel()

  const [ translateX, setTranslateX ] = useState<string>('translate-x-full')

  useEffect(() => {
    setTranslateX( isProfileOpen ? PROFILE_PANEL_TRANSLATE_X : 'translate-x-full')
  }, [isProfileOpen])

  return (
    <>
      <div 
        ref={refs.profile}
        className={`panel-right-short panel-profile absolute bl b--background bw1 z-3 top-0 left-10 w-90 h-100 bg-tertiary pt5 on-background transition-transform ${translateX}`}
      >
        <div tabIndex={-1} aria-disabled={!screenState[SCREEN.PROFILE]} className="h-100 w-100 overflow-y-auto">
          <div className={`pa4X ${PROFILE_PANEL_WIDTH_PERCENT} mb5`}>
            <PanelProfileComponents />
          </div>
        </div>
      </div>      
    </>
  )
}

export default PanelProfile