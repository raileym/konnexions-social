// src/components/NavbarBottom.tsx
import React, { useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFilePen, faBookOpen } from '@fortawesome/free-solid-svg-icons'   
import { faCoffee, faGear, faKey, faRobot, faBars, faFilePen, faBookOpen } from '@fortawesome/free-solid-svg-icons'   
import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { useAppContext } from '@context/AppContext/AppContext'

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
      {/* Careful here. Note my use of both activePanel (not activeHome) and switchPanel (not switchHome) */}
      <Button buttonClass='w-50X' isActive={activePanel === 'mdx'} switchFn={switchPanel} panel='mdx' icon={faCoffee} title='MDX' />
      {/* <Button buttonClass='w-50X' isActive={activeHome === 'mdx'} switchFn={switchHome} panel='mdx' icon={faCoffee} title='MDX' /> */}

      {/* Careful here. Note my use of both activePanel (not activeHome) and switchPanel (not switchHome) */}
      <Button buttonClass='w-50X' isActive={activePanel === 'basic'} switchFn={switchPanel} panel='basic' icon={faFilePen} title='Create Lesson' />
      {/* <Button buttonClass='w-50X' isActive={activeHome === 'basic'} switchFn={switchHome} panel='basic' icon={faFilePen} title='Create Lesson' /> */}

      <Button buttonClass='w-50X o-20X' isActive={activePanel === 'genAI'} switchFn={switchPanel} panel='genAI' icon={faRobot} title='GenAI' />
      <Button buttonClass='w-50X o-20X' isActive={activePanel === 'genAIPro'} switchFn={switchPanel} panel='genAIPro' icon={faRobot} title='GenAI Pro' />

      <Button disable={!lesson.isComplete} buttonClass='' isActive={activePanel === 'basicReview'} switchFn={switchPanel} panel='basicReview' icon={faBookOpen} title='Review Lesson' />

      <Button buttonClass='' isActive={activePanel === 'settings'} switchFn={switchPanel} panel='settings' icon={faGear} title='Settings' />
      <Button buttonClass='o-20X' isActive={activePanel === 'keys'} switchFn={switchPanel} panel='keys' icon={faKey} title='API Keys' />
      <Button buttonClass='o-20X' isActive={activePanel === 'menu'} switchFn={switchPanel} panel='menu' icon={faBars} title='Menu' />
    </nav>
  )
}

export default NavbarBottom
