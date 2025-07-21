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
    }
  }

  const handleProfile = () => {
    setIsSelectedProfile(prev => !prev)
  }

  const handleMenu = () => {
    setIsSelectedMenu(prev => !prev)
  }

  return (
    <nav className="navbar-top fixed top-0 shadow-3 left-0 w-100 bg-white flex items-center justify-between ph2 pt2 pt2-kx-45 pt3-kx-60 pb2 pb2-kx-45 pb3-kx-60 z-999">
      <div className="w-100 flex flex-column">
        <div className="w-100 flex flex-row justify-between">
          <div 
            className="flex justify-start flex-row pointer lh-4-kx" 
            onClick={handleGoHome}
          >
            <div className="mh3 width-3-kx height-3-kx items-center flex-ks-vvs flex-kx-45 flex-kx-60 lh-4-kx">
              <div className="silver b flex flex-column">
                <div className="flex flex-row f3">
                  <div className="dn relative width-4-kx height-3-kx dn-kx-45 dib-kx-n45">
                    <div className="absolute top-0 left-0 bg-secondary mt2 width-3-kx br3 height-3-kx"></div>
                    <div className="konnexions-title absolute top-0 left-0 ml2">
                      <MyKonnexionsTitle shorten={true} color='white' fontSizeInRem={1}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="items-center flex-ks-vvs flex-kx-45 flex-kx-60 lh-4-kx">
              <div className="silver f1 b flex flex-column">
                <div className="flex flex-row f1">
                  <div className="dn dn-kx-45 dib-kx-n45">
                    <MyKonnexionsTitle color='secondary' fontSizeInRem={3}/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <Button isActive={isSelectedBienVenido} title='Bienvenido!' buttonClass={'mh3 bn wiggle'} iconClass={'f2'} img={'icons8-sombrero-48.png'} onClick={handleEngageSpanish} />
            <Button isActive={isSelectedProfile} title='Profile' buttonClass='bn mh3 ph2 dn dn-m dib-l' switchFn={switchPanel} panel={APP_PANEL.PROFILE} icon={faUser} onClick={handleProfile} />
            <Button isActive={isSelectedMenu} title='Menu' buttonClass='bn b--black ph2 ml2 mr3' titleClass='db' switchFn={switchPanel} panel={APP_PANEL.MENU} icon={faBars} onClick={handleMenu}/>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default NavbarTop
