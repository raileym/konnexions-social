import { PROFILE_PANEL_TRANSLATE_X, PROFILE_PANEL_WIDTH_PERCENT } from '@cknTypes/constants'
import PanelProfileComponents from '@components/PanelProfile/PanelProfileComponents'
import { useAppContext } from '@context/AppContext/AppContext'

const PanelProfile = () => {
  const { isProfileOpen } = useAppContext()

  const translateX = isProfileOpen ? PROFILE_PANEL_TRANSLATE_X : 'translate-x-full'

  return (
    <>
      {/*
      <div className={`panel-right panel-profile bw1 b--moon-gray bl panel-basic z-5 absolute top-0 left-0 w-100X h-100 flex transition-transform ${translateX}`}>
        <div className="h-100 w-100 bg-yellow"></div>
        <PanelProfileComponents />
      </div>
      */}
      <div className={`panel-right panel-profile absolute bl b--black bw1 z-3 top-0 left-10 w-90 h-100 bg-yellow pt5 white transition-transform ${translateX}`}>
        <div className="h-100 w-100 overflow-y-auto">
          <div className={`pa4X ${PROFILE_PANEL_WIDTH_PERCENT} mb5`}>
            <PanelProfileComponents />

            {/*
            <h2 className="f3 pa3 mt5 black">Profile Panel</h2>
            <p className="pl3 black">This panel slides in and out correctly based on context.</p>
            <div style={{height: '100em'}} className="bg-black" />
            */}
          </div>
        </div>
      </div>      
    </>
  )
}

export default PanelProfile
