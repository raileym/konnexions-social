// src/components/NavbarBottom.tsx
import { useMemo } from 'react'
import { faPersonChalkboard, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons'   
import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL, MDX_PAGE, NAVBAR_BOTTOM_TRANSLATE_Y, SCREEN } from '@cknTypes/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useActivePanel } from '@hooks/useActivePanel'
import { usePanelBase } from '@hooks/usePanelBase'

const NavbarBottom = () => {
  const { closePanel } = useActivePanel()

  const {
    activePanel,
    isUserValidated,
    showModal,
    lessons,
    selectedLessonNumber, 
    // engageSpanish,
    setMdxPage,
    isSelectedCreate,
    setIsSelectedCreate,
    screenState
  } = useAppContext()

  const { translateY } = usePanelBase({
    panelName: ACTIVE_PANEL.NAVBAR_BOTTOM, 
    translateYOpen: NAVBAR_BOTTOM_TRANSLATE_Y,
    translateYClose: 'translate-y-full',
  })

  const { switchPanel } = usePanel()
  
  // const { activeHome, activePanel, lesson } = useAppContext()
  // const { switchPanel, switchHome } = usePanel()

  // useEffect(() =>{
  //   cXnsole.log('lesson', lesson)
  // }, [lesson])

  // useEffect(() =>{
  //   const activateLessonBar =
  //     currentPanel == ACTIVE_PANEL.BASIC_CREATE ||
  //     currentPanel == ACTIVE_PANEL.BASIC_STUDY ||
  //     currentPanel == ACTIVE_PANEL.GEN_AI_PRO

  //   setTranslateY( activateLessonBar ? NAVBAR_BOTTOM_TRANSLATE_Y : 'translate-y-full')
  // })

  const lesson = useMemo(() => {
    return lessons.find(l => l.number === selectedLessonNumber)
  }, [lessons, selectedLessonNumber])
  
  // cXonsole.log('isUserValidated', isUserValidated)
  
  const handleCreate = () => {
    closePanel('menu')
    closePanel('help')
    closePanel('profile')
    setIsSelectedCreate(prev => !prev)
    if (isSelectedCreate) {
      switchPanel(ACTIVE_PANEL.BASIC_WELCOME)              
      setMdxPage(MDX_PAGE.WELCOME)
    }
  }

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
              tabIndex={screenState[SCREEN.CREATE] ? 0 : -1}
              ariaDisabled={!screenState[SCREEN.CREATE]}
              // reverse={true}
              iconClass={`f2 ${isSelectedCreate ? 'secondaryX' : 'secondaryX'}`}
              // iconClass={`f2 ${isSelectedCreate ? 'secondary' : 'on-background'}`}
              disable={!isUserValidated}
              buttonClass={`mh3 bn bg-whiteX ${isSelectedCreate ? 'bg-backgroundX' : 'bg-on-backgroundX'}`}
              // buttonClass={`mh3 bn bg-redX ${isSelectedCreate ? 'bg-on-background' : 'bg-secondary'}`}
              // titleClass={`${isSelectedCreate ? 'secondary' : 'on-background'}`}
              titleClass={`${isSelectedCreate ? 'secondaryX' : 'secondaryX'}`}
              // titleClass={`${isSelectedCreate ? reverse ? 'secondary' : 'on-background' : 'secondary' : 'on-background' : reverse ? 'secondary' : 'on-background' : 'secondary' : 'on-background'  }`}
              isActive={activePanel === ACTIVE_PANEL.BASIC_CREATE}
              switchFn={switchPanel}
              panel={ACTIVE_PANEL.BASIC_CREATE}
              icon={faPersonChalkboard}
              title='Create'
              onClick={() => {
                handleCreate()          
                // setSelectedCreate(prev => !prev)
              }}
            />
            <Button ariaLabelledBy={'button-study'} tabIndex={screenState[SCREEN.CREATE] ? 0 : -1} ariaDisabled={!screenState[SCREEN.CREATE]} iconClass={'f2'} disable={!isUserValidated || !(lesson?.isComplete)} buttonClass='mh3 bn' isActive={activePanel === 'basicStudy'} switchFn={switchPanel} panel='basicStudy' icon={faBookOpen} title='Study' />
          </div>
        </>
      </div>

    </nav>
  )
}

export default NavbarBottom
