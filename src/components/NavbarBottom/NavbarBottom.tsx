// src/components/NavbarBottom.tsx
import { useEffect, useMemo, useState } from 'react'
import { faPersonChalkboard, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons'   
import Button from '@components/Button/Button'
// import { usePanel } from '@hooks/usePanel'
import { useAppContext } from '@context/AppContext/AppContext'
// import { ACTIVE_PANEL, MDX_PAGE, NAVBAR_BOTTOM_TRANSLATE_Y, SCREEN } from '@cknTypes/constants'
import { ACTIVE_PANEL, NAVBAR_BOTTOM_TRANSLATE_Y } from '@cknTypes/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useActivePanel } from '@hooks/useActivePanel'
import { usePanelBase } from '@hooks/usePanelBase'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'

const NavbarBottom = () => {
  // const { closePanel } = useActivePanel()

  const {
    activePanel,
    isUserValidated,
    showModal,
    lessons,
    selectedLessonNumber, 
    // setMdxPage,
    isSelectedCreate,
    // setIsSelectedCreate
  } = useAppContext()

  const { togglePanelWithFocus } = usePanelManager()
  
  const { translateY, tabIndex, ariaDisabled } = usePanelBase({
    panelName: ACTIVE_PANEL.NAVBAR_BOTTOM, 
    translateYOpen: NAVBAR_BOTTOM_TRANSLATE_Y,
    translateYClose: 'translate-y-full',
  })

  // const { switchPanel } = usePanel()
  
  const lesson = useMemo(() => {
    return lessons.find(l => l.number === selectedLessonNumber)
  }, [lessons, selectedLessonNumber])
  
  // const handleCreate = () => {
  //   closePanel('menu')
  //   closePanel('help')
  //   closePanel('profile')
  //   setIsSelectedCreate(prev => !prev)
  //   if (isSelectedCreate) {
  //     switchPanel(ACTIVE_PANEL.BASIC_WELCOME)              
  //     setMdxPage(MDX_PAGE.WELCOME)
  //   }
  // }

  const handleCreate = () => {
    togglePanelWithFocus(ACTIVE_PANEL.BASIC_CREATE)
  }

  const handleStudy = () => {
    togglePanelWithFocus(ACTIVE_PANEL.BASIC_STUDY)
  }

  const [shouldWiggle, setShouldWiggle] = useState(false)

  useEffect(() => {
    if (isUserValidated && lesson?.isComplete) {
      setShouldWiggle(false) // Step 1: remove class
      const timeout = setTimeout(() => {
        setShouldWiggle(true) // Step 2: re-add class after DOM has updated
        const timer = setTimeout(() => setShouldWiggle(false), 1000) // Optional reset
        return () => clearTimeout(timer)
      }, 50) // Give React 1 frame to remove class

      return () => clearTimeout(timeout)
    }
  }, [isUserValidated, lesson?.isComplete])

  return (
    <nav className={`navbar-bottom fixed bottom-0 bt b--background-30 left-0 w-100 flex flex-column items-center bg-secondary justify-aroundX ph3 pv2 transition-transform ${translateY} z-999 br0`}>

      <div
        className='icon-learn-spanish left-0X flex justify-center flex-column tc mt0 pt0'
        style={{marginLeft: '0%'}}
        onClick={() => {
          if (!isUserValidated) {
            showModal({
              title: 'Email Required',
              message: 
                <div className='flex flex-column items-center tc'>
                  <div>You must first validate your email under the user Profile</div>

                  <div className='flex flex-column items-center f2 mv3'>
                    <FontAwesomeIcon icon={faUser} className='f1 secondary'/>
                    <div className='secondary f5 mt1'>Profile</div>
                  </div>

                  <div>before beginning with <span className='secondary'>Let's konnect! - through Spanish!</span>. See the user Profile button at the top right.</div>
                </div>,
              confirmText: 'Okay',
            })
          }
        }}        
      >
        <>
          <span id='button-create' className='sr-only'>[Button Create] Press the Create Button to describe and create a lesson</span>
          <span id='button-study' className='sr-only'>[Button Study] Press the Study Button to open the panel for the finished lesson</span>
          <div>
            <div className='bg-blueX mb0 pb0 w-100X h2 tc on-background'>Konnect with Spanish!</div>
            <Button
              ariaLabelledBy={'button-create'} 
              tabIndex={tabIndex}
              ariaDisabled={ariaDisabled}
              iconClass={`f2 ${isSelectedCreate ? 'secondaryX' : 'secondaryX'}`}
              disable={!isUserValidated}
              buttonClass={`b--double b--transparent bw3 mh3 bnX bg-whiteX ${isSelectedCreate ? 'bg-backgroundX' : 'bg-on-backgroundX'} focus-visible:b--red`}
              titleClass={`${isSelectedCreate ? 'secondaryX' : 'secondaryX'}`}
              isActive={activePanel === ACTIVE_PANEL.BASIC_CREATE}
              panel={ACTIVE_PANEL.BASIC_CREATE}
              icon={faPersonChalkboard}
              title='Create'
              onClick={handleCreate}
            />
            <Button
              ariaLabelledBy={'button-study'}
              tabIndex={tabIndex}
              ariaDisabled={ariaDisabled}
              iconClass={'f2'}
              disable={!isUserValidated || !(lesson?.isComplete)}
              buttonClass={`b--double b--transparent bw3 ${shouldWiggle ? 'wiggle-once' : ''} growX mh3 bnX Xfocus-visible:b--red`}
              isActive={activePanel === 'basicStudy'}
              onClick={handleStudy}
              panel='basicStudy'
              icon={faBookOpen}
              title='Study' />
          </div>
        </>
      </div>

    </nav>
  )
}

export default NavbarBottom
