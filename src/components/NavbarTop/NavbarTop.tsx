// src/components/NavbarTop.tsx
import React, { useRef, useState } from 'react'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'   

import Button from '@components/Button/Button'
import { ACTIVE_PANEL } from '@cknTypes/constants'
import { useAppContext } from '@context/AppContext/AppContext'
import { useNavigate } from 'react-router-dom'
import MyKonnexionsTitle from '@components/MyKonnexionsTitle/MyKonnexionsTitle'
import type { MdxPage } from '@cknTypes/types'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'
import { usePanelBase } from '@hooks/usePanelBase'

const NavbarTop: React.FC = () => {
  const firstFocusRef = useRef<HTMLDivElement | null>(null)
  const [tabIndex, setTabIndex] = useState<number>(0)

  const {
    setMdxPage,
    // setActivePanel,
    setEngageSpanish,
  } = useAppContext()

  const { openPanel, currentPanel, togglePanel } = usePanelManager()
  
  const navigate = useNavigate()
  
  const navigateTo = (route: string) => {
    navigate(`/${route.toLowerCase()}`)
    setMdxPage(route.toLowerCase() as MdxPage)
    // setActivePanel(ACTIVE_PANEL.MDX)
    openPanel(ACTIVE_PANEL.MDX)              
  }

  const handleGoHome = () => {
    navigateTo('Welcome')
  }

  const handleEngageSpanish = () => {
    setEngageSpanish(prev => !prev)
    togglePanel(ACTIVE_PANEL.BASIC)
  }

  const handleProfile = () => {
    togglePanel(ACTIVE_PANEL.PROFILE)

  }

  const handleMenu = () => {
    togglePanel(ACTIVE_PANEL.MENU)
  }

  usePanelBase(ACTIVE_PANEL.NAVBAR_TOP, 'translate-x-full', {
    onOpen: () => {
      setTabIndex(0)
      setTimeout(() => {
        firstFocusRef.current?.focus()
      }, 250)
    },
    onClose: () => {
      setTabIndex(-1)
    }
  })
  
  return (
    <>
      <div className="sr-only">
        <span id="label-navbar-top">[Top Navigation Bar] The Top Navigation Bar is always present.</span>    
        <span id="label-button-home">[Home Button] Press the Home Button to return to the Welcome Page.</span>    
        <span id="label-button-bienvenido">[Bienvenido Button] Press the Bienvenido Button to engage your Spanish lesson.</span>    
        <span id="label-button-menu">[Menu Button] Press the Menu Button to engage the menu.</span>    
        <span id="label-button-profile">[Profile Button] Press the Profile Button to update your profile.</span>
      </div>

      <nav
        aria-labelledby={'label-navbar-top'} 
        aria-describedby={'describe-navbar-top'}
        tabIndex={-1}
        className="navbar-top fixed top-0 shadow-on-background-kx left-0 w-100 bg-background flex justify-between ph2 pt2 pt2-kx-45 pt3-kx-60 pb2 pb2-kx-45 pb3-kx-60 z-999"
        style={{borderRadius: 0}}>
        <div
          ref={firstFocusRef}
          tabIndex={tabIndex}
          aria-describedby={'button-home'}
          className="button-home flex justify-start flex-row pointer lh-4-kx grow-5-kxX mh0 mh2X ph3 focus-visible:bg-tertiaryX focus-visible:b--redX bw3X hover:b--attention-hover"
          onClick={handleGoHome}
        >

          <div aria-hidden={true} className="ml4X mr3 width-3-kx height-3-kx items-center flex-ks-vvs flex-kx-45 flex-kx-60 lh-4-kx">
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
            <div className="silver f2 b flex flex-column">
              <div className="flex f2">
                <div className="dn dn-kx-45 dib-kx-n45">
                  <MyKonnexionsTitle ariaLabel={''} ariaDescribedBy={'button-home'} color='secondary' fontSizeInRem={2} />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end">
          <Button tabIndex={tabIndex} ariaLabelledBy={'label-button-bienvenido'} isActive={currentPanel === ACTIVE_PANEL.BASIC} title='Bienvenido!' buttonClass={'mh3 bg-background bnX wiggle-grow-kxX grow-kxX bw3X focus-visible:bg-tertiaryX'} iconClass={'f2'} img={'icons8-sombrero-48.png'} onClick={handleEngageSpanish} />
          <Button tabIndex={tabIndex} ariaLabelledBy={'label-button-profile'} isActive={currentPanel === ACTIVE_PANEL.PROFILE} title='Profile' buttonClass='bnX mh3 ph2 dn dn-m dib-l grow-kxX bg-background bw3X focus-visible:bg-tertiaryX' panel={ACTIVE_PANEL.PROFILE} icon={faUser} onClick={handleProfile} />
          <Button tabIndex={tabIndex} ariaLabelledBy={'label-button-menu'} isActive={currentPanel === ACTIVE_PANEL.MENU} title='Menu' buttonClass='bnX b--backgroundX ph2 ml2 mr2 grow-kxX bg-backgound bw3X focus-visible:bg-tertiaryX' titleClass='db' panel={ACTIVE_PANEL.MENU} icon={faBars} onClick={handleMenu}/>
        </div>
      </nav>
    </>

  )
}

export default NavbarTop
