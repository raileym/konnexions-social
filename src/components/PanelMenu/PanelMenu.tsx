import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import {
  ACTIVE_PANEL,
  MDX_PAGE,
  MENU_PANEL_TRANSLATE_X,
  MENU_PANEL_WIDTH_PERCENT
} from '@cknTypes/constants'
import { useNavigate } from 'react-router-dom'
import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { faCircleQuestion, faGear, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { usePanelBase } from '@hooks/usePanelBase'

const PanelMenu: React.FC = () => {
  const firstFocusRef = useRef<HTMLButtonElement | null>(null)
  const [menuPanelTabIndex, setMenuPanelTabIndex] = useState<number>(-1)

  const { setActivePanel, setMdxPage } = useAppContext()
  const { switchPanel } = usePanel()
  const navigate = useNavigate()

  const {
    ref,
    isOpen,
    translateX
  } = usePanelBase(ACTIVE_PANEL.MENU, MENU_PANEL_TRANSLATE_X, {
    onOpen: () => {
      setMenuPanelTabIndex(0)
      setTimeout(() => {
        firstFocusRef.current?.focus()
      }, 250)
    },
    onClose: () => {
      setMenuPanelTabIndex(-1)
    }
  })

  const navigateTo = (route: string) => {
    setActivePanel(ACTIVE_PANEL.MDX)
    navigate(`/${route.toLowerCase()}`)
  }

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
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-panel-title"
        className={`panel-right-short panel-help absolute bl b--background bw1 z-3 top-0 left-10 w-90 h-100 bg-tertiary on-tertiary on-background pt5 transition-transform ${translateX}`}
      >
        <div tabIndex={-1} aria-disabled={!isOpen} className="h-100 w-100 overflow-y-auto">
          <div className={`pa4 ${MENU_PANEL_WIDTH_PERCENT} mb5`}>
            <h2 id="menu-panel-title" className="f3 pa3 mt5 tc on-tertiary">Menu Panel</h2>
            <div className="flex justify-between flex-m dn-lX">
              <Button
                buttonRef={firstFocusRef}
                ariaLabelledBy="label-button-home"
                tabIndex={menuPanelTabIndex}
                ariaDisabled={menuPanelTabIndex !== 0}
                titleClass="white"
                iconClass="white mh0 ph0"
                buttonClass="bnX w-50X width-3 mh0 ph2 brand bg-transparent focus:bg-redX focus:b--red b--double"
                isActive={false}
                switchFn={switchPanel}
                panel={ACTIVE_PANEL.MDX}
                icon={faHome}
                title="Home"
                onClick={() => setMdxPage('Welcome')}
              />
              <Button
                ariaLabelledBy="label-button-settings"
                tabIndex={menuPanelTabIndex}
                ariaDisabled={menuPanelTabIndex !== 0}
                titleClass="white"
                iconClass="white mh0 ph0"
                buttonClass="bnX w-50X width-3 mh0 ph2 brand bg-transparent"
                isActive={false}
                switchFn={switchPanel}
                panel={ACTIVE_PANEL.SETTINGS}
                icon={faGear}
                title="Settings"
              />
              <Button
                ariaLabelledBy="label-button-help"
                tabIndex={menuPanelTabIndex}
                ariaDisabled={menuPanelTabIndex !== 0}
                titleClass="white"
                iconClass="white mh0 ph0"
                buttonClass="bnX o-20X width-3 mh0 ph2 brand bg-transparent"
                isActive={false}
                switchFn={switchPanel}
                panel={ACTIVE_PANEL.HELP}
                icon={faCircleQuestion}
                title="Help"
              />
              <div className="dn-l">
                <Button
                  ariaLabelledBy="label-button-profile"
                  tabIndex={menuPanelTabIndex}
                  ariaDisabled={menuPanelTabIndex !== 0}
                  titleClass="white"
                  iconClass="white mh0 ph0"
                  buttonClass="bn w-50X width-3 mh0 ph0 brand bg-transparent"
                  isActive={false}
                  switchFn={switchPanel}
                  panel={ACTIVE_PANEL.PROFILE}
                  icon={faUser}
                  title="Profile"
                />
              </div>
            </div>

            <p className="pl3 mt4 on-tertiary">Click to view:</p>
            <ul className="list pl4 lh-copy">
              <li
                aria-labelledby="li-home-page"
                tabIndex={menuPanelTabIndex}
                aria-disabled={menuPanelTabIndex !== 0}
                className="link-url pl2 pointer bullet underline on-tertiaryX on-tertiary"
                onClick={() => navigateTo(MDX_PAGE.WELCOME)}
              >
                Home
              </li>
              <li
                aria-labelledby="li-about-page"
                tabIndex={menuPanelTabIndex}
                aria-disabled={menuPanelTabIndex !== 0}
                className="link-url pl2 pointer bullet underline on-tertiaryX on-tertiary"
                onClick={() => navigateTo(MDX_PAGE.ABOUT)}
              >
                About
              </li>
              <li
                aria-labelledby="li-terms-and-conditions-page"
                tabIndex={menuPanelTabIndex}
                aria-disabled={menuPanelTabIndex !== 0}
                className="link-url pl2 pointer bullet underline on-tertiaryX on-tertiary"
                onClick={() => navigateTo(MDX_PAGE.TERMS_AND_CONDITIONS)}
              >
                Terms and conditions
              </li>
              <li
                aria-labelledby="li-privacy-policy"
                tabIndex={menuPanelTabIndex}
                aria-disabled={menuPanelTabIndex !== 0}
                className="link-url pl2 pointer bullet underline on-tertiaryX on-tertiary"
                onClick={() => navigateTo(MDX_PAGE.PRIVACY_POLICY)}
              >
                Privacy Policy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default PanelMenu
