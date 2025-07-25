import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL, MDX_PAGE, MENU_PANEL_TRANSLATE_X, MENU_PANEL_WIDTH_PERCENT } from '@cknTypes/constants'
import { useNavigate } from 'react-router-dom'
import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { faCircleQuestion, faGear, faHome, faUser } from '@fortawesome/free-solid-svg-icons'   
import { useActivePanel } from '@hooks/useActivePanel'

const PanelMenu: React.FC = () => {
  const firstFocusRef = useRef<HTMLButtonElement | null>(null)

  const { setActivePanel, setMdxPage, isMenuOpen } = useAppContext()
  const { switchPanel } = usePanel()
  const { closePanel, refs } = useActivePanel()
  // const translateX = isMenuOpen ? MENU_PANEL_TRANSLATE_X : 'translate-x-full'
  const navigate = useNavigate()

  const [menuPanelTabIndex, setMenuPanelTabIndex] = useState<number>(-1)
  const [ translateX, setTranslateX ] = useState<string>('translate-x-full')

  const navigateTo = (route: string) => {
    closePanel('menu')
    navigate(`/${route.toLowerCase()}`)
    setActivePanel(APP_PANEL.MDX)
    // setIsMenuOpen(false)
  }

  useEffect(() => {
    setTranslateX( isMenuOpen ? MENU_PANEL_TRANSLATE_X : 'translate-x-full')
  // const translateX = isMenuOpen ? PROFILE_PANEL_TRANSLATE_X : 'translate-x-full'
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen && firstFocusRef.current) {
      const timeoutId = setTimeout(() => {
        firstFocusRef.current?.focus()
        setMenuPanelTabIndex(0)
        console.log('✅ Delayed focus on menu first button')
        console.log('menuPanelTabIndex', menuPanelTabIndex)
      }, 250)

      return () => clearTimeout(timeoutId)
    } else {
      setMenuPanelTabIndex(-1)
    }
  }, [isMenuOpen, firstFocusRef, menuPanelTabIndex])

  
  return (
    <>
      <div className="sr-only">
        <span id="label-button-home">[Home Button] Press the Home Button to return to the Welcome Page.</span>    
        <span id="label-button-settings">[Settings Button] Press the Settings Button to adjust your settings.</span>    
        <span id="label-button-menu">[Help Button] Press the Help Button to engage the tour.</span>    
        <span id="label-button-profile">[Profile Button] Press the Profile Button to update your profile.</span>
        <span id="li-home-page">[Home Page] Click on this link to return to the Welcome Page</span>
        <span id="li-about-page">[About Page] Click on this link to go to the About Page</span>
        <span id="li-terms-and-conditions">[Terms and Conditions] Click on this link to go to the Terms and Conditions Page</span>
        <span id="li-privacy-policy">[Privacy Policy] Click on this link to go to the Privacy Policy</span>
      </div>

      <div 
        ref={refs.menu}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-panel-title"
        className={`panel-right-short panel-help absolute bl b--background bw1 z-3 top-0 left-10 w-90 h-100 bg-tertiary on-tertiary on-background pt5 transition-transform ${translateX}`}
      >
        <div tabIndex={-1} aria-disabled={true} className="h-100 w-100 overflow-y-auto">
          <div className={`pa4 ${MENU_PANEL_WIDTH_PERCENT} mb5`}>
            <h2 id="menu-panel-title" className="f3 pa3 mt5 tc on-tertiary">Menu Panel</h2>
            <div className="flex justify-between flex-m dn-lX">
              <Button buttonRef={firstFocusRef} ariaLabelledBy={'label-button-home'} tabIndex={menuPanelTabIndex} ariaDisabled={menuPanelTabIndex !== 0} titleClass={'white'} iconClass={'white mh0 ph0'} buttonClass='bnX w-50X width-3 mh0 ph2 brand bg-transparent' isActive={false} switchFn={switchPanel} panel={APP_PANEL.MDX} icon={faHome} title='Home' onClick={() => setMdxPage('Welcome')}/>
              <Button ariaLabelledBy={'label-button-settings'} tabIndex={menuPanelTabIndex} ariaDisabled={menuPanelTabIndex !== 0} titleClass={'white'} iconClass={'white mh0 ph0'} buttonClass='bnX w-50X width-3 mh0 ph2 brand bg-transparent' isActive={false} switchFn={switchPanel} panel={APP_PANEL.SETTINGS} icon={faGear} title='Settings' />
              <Button ariaLabelledBy={'label-button-help'} tabIndex={menuPanelTabIndex} ariaDisabled={menuPanelTabIndex !== 0} titleClass={'white'} iconClass={'white mh0 ph0'} buttonClass='bnX o-20X width-3 mh0 ph2 brand bg-transparent' isActive={false} switchFn={switchPanel} panel="help" icon={faCircleQuestion} title="Help" />
              <div className="dn-l">
                <Button ariaLabelledBy={'label-button-profile'} tabIndex={menuPanelTabIndex ? -1 : -1} ariaDisabled={menuPanelTabIndex !== 0} titleClass={'white'} iconClass={'white mh0 ph0'} buttonClass='bn w-50X width-3 mh0 ph0 brand bg-transparent' isActive={false} switchFn={switchPanel} panel={APP_PANEL.PROFILE} icon={faUser} title='Profile' />
              </div>
            </div>
            <p className="pl3 mt4 on-tertiary">Click to view:</p>
            <ul className="list pl4 lh-copy">
              <li aria-labelledby={'li-home-page'} tabIndex={menuPanelTabIndex} aria-disabled={!menuPanelTabIndex}
                className={'link-url pl2 pointer bullet underline on-tertiaryX on-tertiary'} 
                onClick={() => navigateTo(MDX_PAGE.WELCOME)}>Home</li>
              <li aria-labelledby={'li-about-page'} tabIndex={menuPanelTabIndex} aria-disabled={!menuPanelTabIndex}
                className={'link-url pl2 pointer bullet underline on-tertiaryX on-tertiary'}
                onClick={() => navigateTo(MDX_PAGE.ABOUT)}>About</li>
              <li aria-labelledby={'li-terms-and-conditions-page'} tabIndex={menuPanelTabIndex} aria-disabled={!menuPanelTabIndex}
                className={'link-url pl2 pointer bullet underline on-tertiaryX  on-tertiary'}
                onClick={() => navigateTo(MDX_PAGE.TERMS_AND_CONDITIONS)}>Terms and conditions</li>
              <li aria-labelledby={'li-privacy-policy'} tabIndex={menuPanelTabIndex} aria-disabled={!menuPanelTabIndex} 
                className={'link-url pl2 pointer bullet underline on-tertiaryX on-tertiary'}
                onClick={() => navigateTo(MDX_PAGE.PRIVACY_POLICY)}>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default PanelMenu