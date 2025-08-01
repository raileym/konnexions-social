// src/components/NavbarTop.tsx
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'   

import Button from '@components/Button/Button'
import { ACTIVE_PANEL, ARIA_DISABLED_NEVER, TABINDEX_ALWAYS, TABINDEX_NEVER } from '@cknTypes/constants'
import { useAppContext } from '@context/AppContext/AppContext'
import { useNavigate } from 'react-router-dom'
import MyKonnexionsTitle from '@components/MyKonnexionsTitle/MyKonnexionsTitle'
import type { MdxPage } from '@cknTypes/types'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'
import { usePanelBase } from '@hooks/usePanelBase'
import DayNightToggle from '@components/DayNightToggle/DayNightToggle'
import { ARIA_LABEL_IDS } from '@components/AriaLabels/ariaLabelsContstants'

const NavbarTop = () => {
  const {
    setMdxPage
  } = useAppContext()

  const { firstFocusDivRef } = usePanelBase({
    panelName: ACTIVE_PANEL.NAVBAR_TOP, 
  })

  const { openPanel, isPanelOpen, focusPanel, closePanel, currentPanel, togglePanelWithFocus } = usePanelManager()

  const navigate = useNavigate()
  
  const navigateTo = (route: string) => {
    navigate(`/${route.toLowerCase()}`)
    setMdxPage(route.toLowerCase() as MdxPage)
    // openPanel(ACTIVE_PANEL.MDX)              
  }

  const handleGoHome = () => {
    navigateTo('Welcome')
  }

  const handleEngageSpanish = () => {
    // togglePanelWithFocus(ACTIVE_PANEL.BASIC_CREATE)
    if (isPanelOpen(ACTIVE_PANEL.BASIC_WELCOME)) {
      closePanel(ACTIVE_PANEL.BASIC_WELCOME)
      // openPanel(ACTIVE_PANEL.MDX)
      // focusPanel(ACTIVE_PANEL.MDX)
    } else if (isPanelOpen(ACTIVE_PANEL.BASIC_CREATE)) {
      closePanel(ACTIVE_PANEL.BASIC_CREATE)
      // openPanel(ACTIVE_PANEL.MDX)
      // focusPanel(ACTIVE_PANEL.MDX)
    } else if (isPanelOpen(ACTIVE_PANEL.BASIC_STUDY)) {
      closePanel(ACTIVE_PANEL.BASIC_STUDY)
      // openPanel(ACTIVE_PANEL.MDX)
      // focusPanel(ACTIVE_PANEL.MDX)
    } else {
      openPanel(ACTIVE_PANEL.BASIC_WELCOME)
      focusPanel(ACTIVE_PANEL.BASIC_WELCOME)
    }
  }

  const handleEngageSpanishPro = () => {
    togglePanelWithFocus(ACTIVE_PANEL.GEN_AI_PRO)
  }

  const handleProfile = () => {
    togglePanelWithFocus(ACTIVE_PANEL.PROFILE)
  }

  const handleMenu = () => {
    togglePanelWithFocus(ACTIVE_PANEL.MENU)
  }
  
  return (
    <>
      <nav
        className="o-20 navbar-top fixed top-0 focus:bn focus-visible:bn shadow-on-background-kx left-0 w-100 bg-background flex justify-between ph2 pt2 pt2-kx-45 pt3-kx-60 pb2 pb2-kx-45 pb3-kx-60 z-999"
        aria-describedby={ARIA_LABEL_IDS.NAVBAR_TOP}
        tabIndex={TABINDEX_NEVER}
        inert={false}
        aria-disabled={ARIA_DISABLED_NEVER}
        style={{borderRadius: 0}}>
        
        <div
          ref={firstFocusDivRef}
          tabIndex={TABINDEX_ALWAYS}
          inert={false}
          aria-disabled={ARIA_DISABLED_NEVER}
          aria-describedby={ARIA_LABEL_IDS.BUTTON_HOME}
          className="button-home b--double b--transparent flex flex-row justify-start pointer lh-4-kx mh0 ph3 hover:b--attention-hover"
          onClick={handleGoHome}
        >
          <div aria-hidden={true} className="ml4X mr4 width-3-kx height-3-kx items-center flex-ks-vvs flex-kx-45 flex-kx-60 lh-4-kx">
            <div className="silver bX flex flex-column">
              <div className="flex f3">
                <div className="dn relative width-4-kx height-3-kx dn-kx-45 dib-kx-n45">
                  <div className="absolute top-0 left-0 bg-secondary mt2X width-4-kx br3 height-4-kx ar-1" style={{marginTop: '0.2rem', marginLeft: '0.2rem'}}></div>
                  <div className="konnexions-title f2 absolute top-0 left-0 ml3">
                    <MyKonnexionsTitle ariaHidden={true} ariaLabel='' ariaDescribedBy={''} shorten={true} color='on-background' fontSizeInRem={2}/>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div aria-hidden={true} className="items-center ml3 flex-ks-vvs flex-kx-45 flex-kx-60 lh-4-kx">
            <div className="silver f2 b flex flex-column">
              <div className="flex f1">
                <div className="dn dn-kx-45 dib-kx-n45">
                  <MyKonnexionsTitle ariaLabel={''} ariaDescribedBy={'button-home'} color='secondary' fontSizeInRem={3} />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end">
          <Button tabIndex={TABINDEX_ALWAYS} ariaLabelledBy={ARIA_LABEL_IDS.BUTTON_BIENVENIDO_PRO} inert={false} isActive={currentPanel === ACTIVE_PANEL.GEN_AI_PRO} title='Bienvenido! Pro' buttonClass={'baX b--transparent mh3 bg-background bnX wiggle-grow-kxX grow-kxX bw3X focus-visible:bg-tertiaryX'} iconClass={'f2'} img={'icons8-sombrero-48.png'} onClick={handleEngageSpanishPro} />
          <Button tabIndex={TABINDEX_ALWAYS} ariaLabelledBy={ARIA_LABEL_IDS.BUTTON_BIENVENIDO} inert={false} isActive={currentPanel === ACTIVE_PANEL.BASIC_CREATE} title='Bienvenido!' buttonClass={'baX b--transparent mh3 bg-background bnX wiggle-grow-kxX grow-kxX bw3X focus-visible:bg-tertiaryX'} iconClass={'f2'} img={'icons8-sombrero-48.png'} onClick={handleEngageSpanish} />
          <Button tabIndex={TABINDEX_ALWAYS} ariaLabelledBy={ARIA_LABEL_IDS.BUTTON_PROFILE} inert={false} isActive={currentPanel === ACTIVE_PANEL.PROFILE} title='Profile' buttonClass='baX b--transparent mh3 ph2 dn dn-m dib-l grow-kxX bg-background bw3X focus-visible:bg-tertiaryX' panel={ACTIVE_PANEL.PROFILE} icon={faUser} onClick={handleProfile} />
          <DayNightToggle className="baX b--transparent bw1X b--solidX mh3" />
          <Button tabIndex={TABINDEX_ALWAYS} ariaLabelledBy={ARIA_LABEL_IDS.BUTTON_MENU} inert={false} isActive={currentPanel === ACTIVE_PANEL.MENU} title='Menu' buttonClass='baX b--transparent mh3 b--backgroundX ph2 ml2 mr2 grow-kxX bg-backgound bw3X focus-visible:bg-tertiaryX' titleClass='db' panel={ACTIVE_PANEL.MENU} icon={faBars} onClick={handleMenu}/>
        </div>
      </nav>
    </>

  )
}

export default NavbarTop
