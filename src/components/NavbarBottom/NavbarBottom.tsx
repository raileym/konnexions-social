// src/components/NavbarBottom.tsx
import React, { useMemo } from 'react'
import { faPersonChalkboard, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons'   
import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL, MDX_PAGE, NAVBAR_BOTTOM_TRANSLATE_Y, SCREEN } from '@cknTypes/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMenuPanel } from '@hooks/useMenuPanel'
import { useHelpPanel } from '@hooks/useHelpPanel'
import { useProfilePanel } from '@hooks/useProfilePanel'

const NavbarBottom: React.FC = () => {
  const { closeMenu } = useMenuPanel()
  const { closeHelp } = useHelpPanel()
  const { closeProfile } = useProfilePanel()

  const {
    activePanel,
    isUserValidated,
    showModal,
    lessons,
    selectedLessonNumber, 
    engageSpanish,
    setMdxPage,
    isSelectedCreate,
    setIsSelectedCreate,
    screenState
  } = useAppContext()

  const { switchPanel } = usePanel()
  // const { activeHome, activePanel, lesson } = useAppContext()
  // const { switchPanel, switchHome } = usePanel()

  // useEffect(() =>{
  //   cXnsole.log('lesson', lesson)
  // }, [lesson])

    const translateY = engageSpanish ? NAVBAR_BOTTOM_TRANSLATE_Y : 'translate-y-full'
  
  const lesson = useMemo(() => {
    return lessons.find(l => l.number === selectedLessonNumber)
  }, [lessons, selectedLessonNumber])
  
  // cXonsole.log('isUserValidated', isUserValidated)
  
  const handleCreate = () => {
    closeMenu()
    closeHelp()
    closeProfile()
    setIsSelectedCreate(prev => !prev)
    if (isSelectedCreate) {
      switchPanel(APP_PANEL.BASIC_WELCOME)              
      setMdxPage(MDX_PAGE.WELCOME)
    }
  }

  return (
    <nav className={`navbar-bottom fixed bottom-0 bt b--background-30 left-0 w-100 flex flex-column items-center bg-secondary justify-aroundX ph3 pv2 transition-transform ${translateY} z-999`}>

      <div
        className="icon-learn-spanish left-0X flex justify-center flex-column tc mt0 pt0"
        style={{marginLeft: '0%'}}
        onClick={() => {
          if (!isUserValidated) {
            showModal({
              title: 'Email Required',
              message: 
                <div className="flex flex-column items-center tc">
                  <div>You must first validate your email under the user Profile</div>

                  <div className="flex flex-column items-center f2 mv3">
                    <FontAwesomeIcon icon={faUser} className="f1 secondary"/>
                    <div className="secondary f5 mt1">Profile</div>
                  </div>

                  <div>before beginning with <span className="secondary">Let's konnect! - through Spanish!</span>. See the user Profile button at the top right.</div>
                </div>,
              confirmText: 'Okay',
            })
          }
        }}        
      >
        <div>
          <div className="bg-blueX mb0 pb0 w-100X h2 tc on-background">Konnect with Spanish!</div>
          <Button
            tabIndex={screenState[SCREEN.CREATE] ? 0 : -1}
            ariaDisabled={!screenState[SCREEN.CREATE]}
            reverse={true}
            iconClass={`f2 ${isSelectedCreate ? 'secondaryX' : 'secondaryX'}`}
            // iconClass={`f2 ${isSelectedCreate ? 'secondary' : 'on-background'}`}
            disable={!isUserValidated}
            buttonClass={`mh3 bn bg-whiteX ${isSelectedCreate ? 'bg-backgroundX' : 'bg-on-backgroundX'}`}
            // buttonClass={`mh3 bn bg-redX ${isSelectedCreate ? 'bg-on-background' : 'bg-secondary'}`}
            // titleClass={`${isSelectedCreate ? 'secondary' : 'on-background'}`}
            titleClass={`${isSelectedCreate ? 'secondaryX' : 'secondaryX'}`}
            // titleClass={`${isSelectedCreate ? reverse ? 'secondary' : 'on-background' : 'secondary' : 'on-background' : reverse ? 'secondary' : 'on-background' : 'secondary' : 'on-background'  }`}
            isActive={activePanel === APP_PANEL.BASIC}
            switchFn={switchPanel}
            panel={APP_PANEL.BASIC}
            icon={faPersonChalkboard}
            title='Create'
            onClick={() => {
              handleCreate()          
              // setSelectedCreate(prev => !prev)
            }}
          />
          <Button tabIndex={screenState[SCREEN.CREATE] ? 0 : -1} ariaDisabled={!screenState[SCREEN.CREATE]} iconClass={'f2'} disable={!isUserValidated || !(lesson?.isComplete)} buttonClass='mh3 bn' isActive={activePanel === 'basicReview'} switchFn={switchPanel} panel='basicReview' icon={faBookOpen} title='Study' />
        </div>
      </div>

    </nav>
  )
}

export default NavbarBottom
