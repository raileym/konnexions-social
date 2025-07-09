// src/components/NavbarBottom.tsx
import React, { useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFilePen, faBookOpen } from '@fortawesome/free-solid-svg-icons'   
import { faPersonChalkboard, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons'   
// import { faUserGraduate, faCoffee, faGear, faKey, faBars, faFilePen, faPersonChalkboard, faBookOpen } from '@fortawesome/free-solid-svg-icons'   
// import { faUserGraduate, faCoffee, faGear, faKey, faRobot, faBars, faFilePen, faBookOpen } from '@fortawesome/free-solid-svg-icons'   
import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL } from '@cknTypes/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavbarBottom: React.FC = () => {
  const { activePanel, lesson, isUserValidated, showModal } = useAppContext()
  const { switchPanel } = usePanel()
  // const { activeHome, activePanel, lesson } = useAppContext()
  // const { switchPanel, switchHome } = usePanel()

  useEffect(() =>{
    console.log('lesson', lesson)
  }, [lesson])

  return (
    <nav className='fixed bottom-0 bt b--black-30 left-0 w-100 bg-white flex flex-column items-center justify-aroundX ph3 pv2 z-999'>

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
                    <FontAwesomeIcon icon={faUser} className="f1 brand"/>
                    <div className="brand f5 mt1">Profile</div>
                  </div>

                  <div>before beginning with <span className="brand">Learn Spanish!</span>. See the user Profile button at the top right.</div>
                </div>,
              confirmText: 'Okay',
            })
          }
        }}        
      >
        <div>
          <div className="baX bg-blueX mb0 pb0 w-100X h2 tc brand">Learn Spanish!</div>
          <Button iconStyle={'f2'} disable={!isUserValidated} buttonClass='mh3' isActive={activePanel === APP_PANEL.BASIC_WELCOME} switchFn={switchPanel} panel={APP_PANEL.BASIC_WELCOME} icon={faPersonChalkboard} title='Create' />
          {/* <Button iconStyle={'f2'} disable={!isUserValidated} buttonClass='mh3' isActive={activePanel === APP_PANEL.BASIC} switchFn={switchPanel} panel={APP_PANEL.BASIC} icon={faPersonChalkboard} title='Create' /> */}
          <Button iconStyle={'f2'} disable={!isUserValidated || !lesson.isComplete} buttonClass='mh3' isActive={activePanel === 'basicReview'} switchFn={switchPanel} panel='basicReview' icon={faBookOpen} title='Study' />
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
