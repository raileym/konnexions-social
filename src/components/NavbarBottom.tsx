// src/components/NavbarBottom.tsx
import React, { useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faRobot, faBars, faFilePen, faBookOpen } from '@fortawesome/free-solid-svg-icons'   
// import { faGear, faKey, faRobot, faBars, faFilePen, faBookOpen } from '@fortawesome/free-solid-svg-icons'   
import Button from './Button'
import { usePanel } from '@hooks/usePanel'
import { useAppContext } from '@context/AppContext/AppContext'

const NavbarBottom: React.FC = () => {
  const { activeHome, activePanel, lesson } = useAppContext()
  const { switchPanel, switchHome } = usePanel()

  useEffect(() =>{
    console.log('lesson', lesson)
  }, [lesson])

  return (
    <nav className='fixed bottom-0 bt b--black-30 left-0 w-100 bg-white flex items-center justify-around ph3 pv2 z-999'>
      <div className='ba ph3 w-30 flex items-center justify-between'>
        <Button buttonClass='w-50X' isActive={activeHome === 'basic'} switchFn={switchHome} panel='basic' icon={faFilePen} title='Create Lesson' />
        <Button buttonClass='w-50X o-20' isActive={activeHome === 'genAI'} switchFn={switchHome} panel='genAI' icon={faRobot} title='GenAI' />
        <Button buttonClass='w-50X o-20' isActive={activeHome === 'genAIPro'} switchFn={switchHome} panel='genAIPro' icon={faRobot} title='GenAI Pro' />
      </div>
      <Button disable={!lesson.isComplete} buttonClass='' isActive={activePanel === 'basicReview'} switchFn={switchPanel} panel='basicReview' icon={faBookOpen} title='Review Lesson' />
      {/* <Button buttonClass='' isActive={activePanel === 'settings'} switchFn={switchPanel} panel='settings' icon={faGear} title='Settings' /> */}
      <Button buttonClass='o-20' isActive={activePanel === 'keys'} switchFn={switchPanel} panel='keys' icon={faKey} title='API Keys' />
      <Button buttonClass='o-20' isActive={activePanel === 'menu'} switchFn={switchPanel} panel='menu' icon={faBars} title='Menu' />
    </nav>
  )
}

export default NavbarBottom
