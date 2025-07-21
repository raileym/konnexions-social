// src/components/NavbarBottom.tsx
import React, { useMemo } from 'react'
import { faPersonChalkboard, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons'   
import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL, MDX_PAGE, NAVBAR_BOTTOM_TRANSLATE_Y } from '@cknTypes/constants'
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
    isSelectedCreate, setIsSelectedCreate
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
          {/* <Button iconClass={'f2'} disable={!isUserValidated} buttonClass='mh3 bn' isActive={activePanel === APP_PANEL.BASIC_WELCOME} switchFn={switchPanel} panel={APP_PANEL.BASIC_WELCOME} img={'icons8-sombrero-48.png'} title='Bienvenido!' /> */}
          <Button
          reverse={true}
            iconClass={`f2 ${isSelectedCreate ? 'secondary' : 'on-background'}`}
            disable={!isUserValidated}
            buttonClass={`mh3 bn bg-redX ${isSelectedCreate ? 'bg-on-background' : 'bg-secondary'}`}
            titleClass={`${isSelectedCreate ? 'secondary' : 'on-background'}`}
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
          <Button iconClass={'f2'} disable={!isUserValidated || !(lesson?.isComplete)} buttonClass='mh3 bn' isActive={activePanel === 'basicReview'} switchFn={switchPanel} panel='basicReview' icon={faBookOpen} title='Study' />
        </div>
      </div>

      {/* <Button buttonClass='w-50X' isActive={activePanel === APP_PANEL.MDX} switchFn={switchPanel} panel={APP_PANEL.MDX} icon={faCoffee} title='MDX' /> */}
      {/* <Button disable={!isUserValidated} buttonClass='' isActive={activePanel === APP_PANEL.GEN_AI} switchFn={switchPanel} panel={APP_PANEL.GEN_AI} icon={faRobot} title='GenAI' /> */}
      {/* <Button disable={!isUserValidated} buttonClass='' isActive={activePanel === APP_PANEL.GEN_AI_PRO} switchFn={switchPanel} panel={APP_PANEL.GEN_AI_PRO} icon={faRobot} title='GenAI Pro' /> */}
      {/* <Button disable={!isUserValidated} buttonClass='' isActive={activePanel === APP_PANEL.SETTINGS} switchFn={switchPanel} panel={APP_PANEL.SETTINGS} icon={faGear} title='Settings' /> */}
      {/* <Button disable={!isUserValidated} buttonClass='' isActive={activePanel === APP_PANEL.KEYS} switchFn={switchPanel} panel='keys' icon={faKey} title='API Keys' /> */}
      {/* <Button disable={!isUserValidated} buttonClass='' isActive={activePanel === APP_PANEL.MENU} switchFn={switchPanel} panel={APP_PANEL.MENU} icon={faBars} title='Menu' /> */}
    </nav>
  )
}

export default NavbarBottom
