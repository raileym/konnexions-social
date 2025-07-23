// src/components/NavbarTop.tsx
import React, { useState } from 'react'
// import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
// import { faBars, faGear, faUser } from '@fortawesome/free-solid-svg-icons'   
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'   

import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { APP_PANEL, MDX_PAGE } from '@cknTypes/constants'
import { useAppContext } from '@context/AppContext/AppContext'
import { useMenuPanel } from '@hooks/useMenuPanel'
import { useHelpPanel } from '@hooks/useHelpPanel'
import { useProfilePanel } from '@hooks/useProfilePanel'
import { useNavigate } from 'react-router-dom'
import MyKonnexionsTitle from '@components/MyKonnexionsTitle/MyKonnexionsTitle'

const NavbarTop: React.FC = () => {
  const [isSelectedBienVenido, setIsSelectedBienVenido] = useState<boolean>(false)
  const [isSelectedProfile, setIsSelectedProfile] = useState<boolean>(false)
  const [isSelectedMenu, setIsSelectedMenu] = useState<boolean>(false)

  const {
    setMdxPage,
    setActivePanel,
    setIsMenuOpen,
    setEngageSpanish,
    engageSpanish,
    setIsSelectedCreate
  } = useAppContext()

  const { switchPanel } = usePanel()
  const { closeMenu } = useMenuPanel()
  const { closeHelp } = useHelpPanel()
  const { closeProfile } = useProfilePanel()
  const navigate = useNavigate()
  
  // const alwaysTrue = false

  const navigateTo = (route: string) => {
    navigate(`/${route.toLowerCase()}`)
    setActivePanel(APP_PANEL.MDX)
    setIsMenuOpen(false)
  }

  const handleBienVenido = () => {
    console.log('Clicking on handleBienVenido.')
    closeMenu()
    closeHelp()
    closeProfile()
    switchPanel(APP_PANEL.BASIC_WELCOME)              
    // setMdxPage(MDX_PAGE.WELCOME)
    // navigateTo('Welcome')
  }

  const handleGoHome = () => {
    console.log('Clicking on handleGoHome.')
    closeMenu()
    closeHelp()
    closeProfile()
    switchPanel(APP_PANEL.MDX)              
    setMdxPage(MDX_PAGE.WELCOME)
    navigateTo('Welcome')
  }

  const handleEngageSpanish = () => {
    setEngageSpanish(prev => !prev)
    if (engageSpanish) {
      handleGoHome()
      setIsSelectedBienVenido(false)
    } else {
      handleBienVenido()
      setIsSelectedCreate(false)
      setIsSelectedBienVenido(true)
      setIsSelectedMenu(false)
      setIsSelectedProfile(false)
    }
  }

  const handleProfile = () => {
    setIsSelectedProfile(prev => !prev)
    setIsSelectedBienVenido(false)
    setIsSelectedMenu(false)
  }

  const handleMenu = () => {
    setIsSelectedMenu(prev => !prev)
    setIsSelectedProfile(false)
    setIsSelectedBienVenido(false)
  }

  return (
    <>
      <div className="sr-only">
        <span id="label-navbar-top">[Top Navigation Bar] The Top Navigation Bar is always present.</span>    
        <span id="label-button-home">[Home Button] Press the Home Button to return to the Welcome Page.</span>    
        <span id="label-button-bienvenido">[Bienvenido Button] Press the Bienvenido Button to engage your Spanish lesson.</span>    
        <span id="label-button-menu">[Menu Button] Press the Menu Button to engage the menu.</span>    
        <span id="label-button-profile">[Profile Button] Press the Profile Button to update your profile.</span>

        <span id="describe-navbar-top">DESCRIBE Navbar Top is always present</span>    
        <span id="describe-button-home">DESCRIBE Press the Home Button to return to the Welcome Page</span>    
        <span id="describe-button-bienvenido">DESCRIBE Press the Bienvenido Button to engage your Spanish lesson</span>    
        <span id="describe-button-menu">DESCRIBE Press the Menu Button to engage the menu</span>    
        <span id="describe-button-profile">DESCRIBE Press the Profile Button to update your profile</span>    
      </div>

      <nav aria-labelledBy={'label-navbar-top'} are-describedBy={'describe-navbar-top'} tabIndex={0} className="navbar-top fixed top-0 shadow-on-background-kx left-0 w-100 bg-background flex justify-between ph2 pt2 pt2-kx-45 pt3-kx-60 pb2 pb2-kx-45 pb3-kx-60 z-999">
        <div tabIndex={0} aria-describedBy={'button-home'} className="flex justify-start flex-row pointer lh-4-kx grow-5-kx" onClick={handleGoHome}>

          {/* <div aria-describedBy={'button-home'} className="sr-only">
            Home Button, Press the Home Button to return to the Welcome Page            
          </div> */}

          <div aria-hidden={true} className="ml3 mr4 width-3-kx height-3-kx items-center flex-ks-vvs flex-kx-45 flex-kx-60 lh-4-kx">
            <div className="silver bX flex flex-column">
              <div className="flex f3">
                <div className="dn relative width-4-kx height-3-kx dn-kx-45 dib-kx-n45">
                  <div className="absolute top-0 left-0 bg-secondary mt2 width-3-kx br3 height-3-kx"></div>
                  <div className="konnexions-title f2 absolute top-0 left-0 ml2">
                    <MyKonnexionsTitle ariaHidden={true} ariaLabel='' ariaDescribedBy={''} shorten={true} color='on-background' fontSizeInRem={2}/>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div aria-hidden={true} className="items-center flex-ks-vvs flex-kx-45 flex-kx-60 lh-4-kx">
            <div className="silver f1 b flex flex-column">
              <div className="flex f1">
                <div className="dn dn-kx-45 dib-kx-n45">
                  <MyKonnexionsTitle ariaLabel={''} ariaDescribedBy={'button-home'} color='secondary' fontSizeInRem={3}/>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end">
          <Button tabIndex={0} ariaLabelledBy={'label-button-bienvenido'} ariaDescribedBy={'describe-button-bienvenido'} isActive={isSelectedBienVenido} title='Bienvenido!' buttonClass={'mh3 bg-background bn wiggle focus-kx:b--red bw3'} iconClass={'f2'} img={'icons8-sombrero-48.png'} onClick={handleEngageSpanish} />
          <Button tabIndex={0} ariaLabelledBy={'label-button-profile'} ariaDescribedBy={'describe-button-profile'} isActive={isSelectedProfile} title='Profile' buttonClass='bn mh3 ph2 dn dn-m dib-l grow-kx bg-background' switchFn={switchPanel} panel={APP_PANEL.PROFILE} icon={faUser} onClick={handleProfile} />
          <Button tabIndex={0} ariaLabelledBy={'label-button-menu'} ariaDescribedBy={'describe-button-menu'} isActive={isSelectedMenu} title='Menu' buttonClass='bn b--background ph2 ml2 mr3 grow-kx bg-backgound' titleClass='db' switchFn={switchPanel} panel={APP_PANEL.MENU} icon={faBars} onClick={handleMenu}/>
        </div>
      </nav>
    </>

  )
}

export default NavbarTop
