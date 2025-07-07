// src/components/NavbarBottom.tsx
import React, { useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFilePen, faBookOpen } from '@fortawesome/free-solid-svg-icons'   
import { faEnvelope, faCoffee, faGear, faKey, faRobot, faBars, faFilePen, faBookOpen } from '@fortawesome/free-solid-svg-icons'   
import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL } from '@cknTypes/constants'

const NavbarBottom: React.FC = () => {
  const { activePanel, lesson } = useAppContext()
  const { switchPanel } = usePanel()
  // const { activeHome, activePanel, lesson } = useAppContext()
  // const { switchPanel, switchHome } = usePanel()

  useEffect(() =>{
    console.log('lesson', lesson)
  }, [lesson])

  return (
    <nav className='fixed bottom-0 bt b--black-30 left-0 w-100 bg-white flex items-center justify-around ph3 pv2 z-999'>
      <Button buttonClass='w-50X' isActive={activePanel === APP_PANEL.REQUEST_EMAIL} switchFn={switchPanel} panel={APP_PANEL.REQUEST_EMAIL} icon={faEnvelope} title='Request Email' />
      {/* <Button buttonClass='w-50X' isActive={activePanel === APP_PANEL.VERIFY_EMAIL} switchFn={switchPanel} panel={APP_PANEL.VERIFY_EMAIL} icon={faEnvelopeOpen} title='Verify Email' /> */}

      {/* Careful here. Note my use of both activePanel (not activeHome) and switchPanel (not switchHome) */}
      <Button buttonClass='w-50X' isActive={activePanel === APP_PANEL.MDX} switchFn={switchPanel} panel={APP_PANEL.MDX} icon={faCoffee} title='MDX' />
      {/* <Button buttonClass='w-50X' isActive={activeHome === APP_PANEL.MDX} switchFn={switchHome} panel=APP_PANEL.MDX icon={faCoffee} title='MDX' /> */}

      {/* Careful here. Note my use of both activePanel (not activeHome) and switchPanel (not switchHome) */}
      <Button buttonClass='w-50X' isActive={activePanel === APP_PANEL.BASIC} switchFn={switchPanel} panel={APP_PANEL.BASIC} icon={faFilePen} title='Create Lesson' />
      {/* <Button buttonClass='w-50X' isActive={activeHome === APP_PANEL.BASIC} switchFn={switchHome} panel=APP_PANEL.BASIC icon={faFilePen} title='Create Lesson' /> */}

      <Button buttonClass='w-50X o-20X' isActive={activePanel === APP_PANEL.GEN_AI} switchFn={switchPanel} panel={APP_PANEL.GEN_AI} icon={faRobot} title='GenAI' />
      <Button buttonClass='w-50X o-20X' isActive={activePanel === APP_PANEL.GEN_AI_PRO} switchFn={switchPanel} panel={APP_PANEL.GEN_AI_PRO} icon={faRobot} title='GenAI Pro' />

      <Button disable={!lesson.isComplete} buttonClass='' isActive={activePanel === 'basicReview'} switchFn={switchPanel} panel='basicReview' icon={faBookOpen} title='Review Lesson' />

      <Button buttonClass='' isActive={activePanel === APP_PANEL.SETTINGS} switchFn={switchPanel} panel={APP_PANEL.SETTINGS} icon={faGear} title='Settings' />
      <Button buttonClass='o-20X' isActive={activePanel === 'keys'} switchFn={switchPanel} panel='keys' icon={faKey} title='API Keys' />
      <Button buttonClass='o-20X' isActive={activePanel === APP_PANEL.MENU} switchFn={switchPanel} panel={APP_PANEL.MENU} icon={faBars} title='Menu' />
    </nav>
  )
}

export default NavbarBottom
