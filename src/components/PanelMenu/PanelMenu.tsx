import React, { useEffect, useRef } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { APP_PANEL, MDX_PAGE, MENU_PANEL_TRANSLATE_X, MENU_PANEL_WIDTH_PERCENT, SCREEN } from '@cknTypes/constants'
import { useNavigate } from 'react-router-dom'
import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { faCircleQuestion, faGear, faHome, faUser } from '@fortawesome/free-solid-svg-icons'   
import { useMenuPanel } from '@hooks/useMenuPanel'

const PanelMenu: React.FC = () => {
  const PanelMenuRef = useRef<HTMLDivElement>(null);

  const { isMenuOpen, setActivePanel, setIsMenuOpen, setMdxPage, screenState } = useAppContext()
  const { switchPanel } = usePanel()
  const { closeMenu } = useMenuPanel()
  
  const translateX = isMenuOpen ? MENU_PANEL_TRANSLATE_X : 'translate-x-full'
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // cXonsole.log('Click detected, checking if outside Menu Panel ...')
      
      if (
        PanelMenuRef.current &&
        !PanelMenuRef.current.contains(event.target as Node)
      ) {
        // cXonsole.log('Click is outside Menu Panel, closing menu')
        
        // Don't interfere with the event - let it complete naturally
        // Close panel on next tick
        requestAnimationFrame(() => {
          closeMenu();
        });
      } else {
        // cXonsole.log('Click is inside Menu Panel or ref not available')
      }
    }

    if (isMenuOpen) {
      // cXonsole.log('Adding listener for click outside Menu Panel')
      
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, { 
          capture: false // Listen in bubbling phase, after other handlers
        });
      }, 150); // Slightly longer delay

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
        // cXonsole.log('Removing listener for click outside Menu Panel')
      };
    }
  }, [isMenuOpen, closeMenu]);

  const navigateTo = (route: string) => {
    navigate(`/${route.toLowerCase()}`)
    setActivePanel(APP_PANEL.MDX)
    setIsMenuOpen(false)
  }

  return (
    <div 
      ref={PanelMenuRef}
      className={`panel-right-short panel-help absolute bl b--background bw1 z-3 top-0 left-10 w-90 h-100 bg-red on-background pt5 transition-transform ${translateX}`}
    >
      <div tabIndex={screenState[SCREEN.MENU] ? -1 : -1} aria-hidden={true} className="h-100 w-100 overflow-y-auto">
        <div className={`pa4 ${MENU_PANEL_WIDTH_PERCENT} mb5`}>
          <h2 className="f3 pa3 mt5 tc">Menu Panel</h2>
          <div className="flex justify-between flex-m dn-lX">
            <Button tabIndex={screenState[SCREEN.MENU] ? 0 : -1} ariaHidden={!screenState[SCREEN.MENU]} titleClass={'white'} iconClass={'white mh0 ph0'} buttonClass='bn w-50X width-3 mh0 ph0 brand bg-transparent' isActive={false} switchFn={switchPanel} panel={APP_PANEL.MDX} icon={faHome} title='Home' onClick={() => setMdxPage('Welcome')}/>
            <Button tabIndex={screenState[SCREEN.MENU] ? 1 : -1} ariaHidden={!screenState[SCREEN.MENU]} titleClass={'white'} iconClass={'white mh0 ph0'} buttonClass='bn w-50X width-4 mh0 ph0 brand bg-transparent' isActive={false} switchFn={switchPanel} panel={APP_PANEL.SETTINGS} icon={faGear} title='Settings' />
            <Button tabIndex={screenState[SCREEN.MENU] ? 2 : -1} ariaHidden={!screenState[SCREEN.MENU]} titleClass={'white'} iconClass={'white mh0 ph0'} buttonClass='bn o-20X width-3 mh0 ph0 brand bg-transparent' isActive={false} switchFn={switchPanel} panel="help" icon={faCircleQuestion} title="Help" />
            <div className="dn-l">
              <Button tabIndex={screenState[SCREEN.MENU] ? -1 : -1} ariaHidden={!screenState[SCREEN.MENU]} titleClass={'white'} iconClass={'white mh0 ph0'} buttonClass='bn w-50X width-3 mh0 ph0 brand bg-transparent' isActive={false} switchFn={switchPanel} panel={APP_PANEL.PROFILE} icon={faUser} title='Profile' />
            </div>
          </div>
          <p className="pl3 mt4">Click to view:</p>
          <ul className="list pl4 lh-copy">
            <li tabIndex={screenState[SCREEN.MENU] ? 3 : -1} aria-hidden={!screenState[SCREEN.MENU]} className="pointer bullet underline" onClick={() => navigateTo(MDX_PAGE.WELCOME)}>Home</li>
            <li tabIndex={screenState[SCREEN.MENU] ? 4 : -1} aria-hidden={!screenState[SCREEN.MENU]} className="pointer bullet underline" onClick={() => navigateTo(MDX_PAGE.ABOUT)}>About</li>
            <li tabIndex={screenState[SCREEN.MENU] ? 5 : -1} aria-hidden={!screenState[SCREEN.MENU]} className="pointer bullet underline" onClick={() => navigateTo(MDX_PAGE.TERMS_AND_CONDITIONS)}>Terms and conditions</li>
            <li tabIndex={screenState[SCREEN.MENU] ? 6 : -1} aria-hidden={!screenState[SCREEN.MENU]} className="pointer bullet underline" onClick={() => navigateTo(MDX_PAGE.FAQ)}>FAQ</li>
            <li tabIndex={screenState[SCREEN.MENU] ? 7 : -1} aria-hidden={!screenState[SCREEN.MENU]} className="pointer bullet underline" onClick={() => navigateTo(MDX_PAGE.TERMS_AND_CONDITIONS)}>Terms & Conditions</li>
            <li tabIndex={screenState[SCREEN.MENU] ? 8 : -1} aria-hidden={!screenState[SCREEN.MENU]} className="pointer bullet underline" onClick={() => navigateTo(MDX_PAGE.PRIVACY_POLICY)}>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PanelMenu