import { useAppContext } from '@context/AppContext/AppContext'
import {
  ACTIVE_PANEL,
  MDX_PAGE,
  MENU_PANEL_TRANSLATE_X,
  MENU_PANEL_WIDTH_PERCENT,
  TABINDEX_NEVER
} from '@cknTypes/constants'
import { useNavigate } from 'react-router-dom'
import Button from '@components/Button/Button'
import { usePanel } from '@hooks/usePanel'
import { faCircleQuestion, faGear, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { usePanelBase } from '@hooks/usePanelBase'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'

const PanelMenu = () => {
  const { setActivePanel, setMdxPage } = useAppContext()
  const { switchPanel } = usePanel()
  const navigate = useNavigate()

  const { openPanel, togglePanelWithFocus } = usePanelManager()

  const { ref, translateX, tabIndex, ariaDisabled, ariaHidden, firstFocusButtonRef, isOpen, isMounted } = usePanelBase({
    panelName: ACTIVE_PANEL.MENU,
    translateXOpen: MENU_PANEL_TRANSLATE_X, 
    translateXClose: 'translate-x-full'
  })

  const navigateTo = (route: string) => {
    setActivePanel(ACTIVE_PANEL.MDX)
    navigate(`/${route.toLowerCase()}`)
  }

  const handleHelp = () => {
    togglePanelWithFocus(ACTIVE_PANEL.HELP)
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
        className={`
          panel-menu panel-right-short absolute bl b--background bw1 z-3 top-0 left-10 w-90 h-100 bg-tertiary on-tertiary on-background pt5 transition-transform
          ${translateX}
          ${isOpen ? 'panel-visible' : 'panel-hiddenX'}
          ${!isMounted ? 'dn' : ''}`}
        inert={!isOpen}
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-panel-title"
      >
        <div tabIndex={TABINDEX_NEVER} inert={!isOpen} aria-disabled={!isOpen} className="three h-100 w-100 overflow-y-auto">
          <div className={`pa4 ${MENU_PANEL_WIDTH_PERCENT} mb5`}>
            <h2 id="menu-panel-title" className="f3 pa3 mt5 tc on-tertiary">Menu Panel</h2>
            <div className="flex justify-between flex-m dn-lX">
              <Button
                buttonRef={firstFocusButtonRef}
                ariaLabelledBy="label-button-home"
                inert={!isOpen}
                tabIndex={tabIndex}
                ariaDisabled={ariaDisabled}
                titleClass="white"
                iconClass="white mh0 ph0"
                buttonClass="bnX w-50X width-3 mh0 ph2 brand bg-transparent focus:bg-redX focus:b--red b--double"
                isActive={false}
                switchFn={switchPanel}
                panel={ACTIVE_PANEL.MDX}
                onClick={() => {
                  setMdxPage('Welcome')
                  openPanel('mdx')
                }}
                icon={faHome}
                title="Home"
                // onClick={() => setMdxPage('Welcome')}
              />
              <Button
                ariaLabelledBy="label-button-settings"
                tabIndex={tabIndex}
                ariaDisabled={ariaDisabled}
                titleClass="white"
                iconClass="white mh0 ph0"
                buttonClass="bnX w-50X width-3 mh0 ph2 brand bg-transparent"
                inert={!isOpen}
                isActive={false}
                switchFn={switchPanel}
                panel={ACTIVE_PANEL.SETTINGS}
                icon={faGear}
                title="Settings"
                onClick={() => openPanel('settings')}
              />
              <Button
                ariaLabelledBy="label-button-help"
                tabIndex={tabIndex}
                ariaDisabled={ariaDisabled}
                titleClass="white"
                iconClass="white mh0 ph0"
                buttonClass="bnX o-20X width-3 mh0 ph2 brand bg-transparent"
                inert={!isOpen}
                isActive={false}
                onClick={handleHelp}
                // switchFn={switchPanel}
                // panel={ACTIVE_PANEL.HELP}
                icon={faCircleQuestion}
                title="Help"
              />
              <div className="dn-l">
                <Button
                  ariaLabelledBy="label-button-profile"
                  tabIndex={tabIndex}
                  ariaDisabled={ariaDisabled}
                  titleClass="white"
                  iconClass="white mh0 ph0"
                  buttonClass="bn w-50X width-3 mh0 ph0 brand bg-transparent"
                  inert={!isOpen}
                  isActive={false}
                  switchFn={switchPanel}
                  onClick={() => openPanel('profile')}
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
                tabIndex={tabIndex}
                inert={!isOpen}
                aria-disabled={ariaDisabled}
                aria-hidden={ariaHidden}
                className="link-url pl2 pointer bullet underline on-tertiaryX on-tertiary hover:b--attention-hover"
                onClick={() => navigateTo(MDX_PAGE.WELCOME)}
              >
                Home
              </li>
              <li
                aria-labelledby="li-about-page"
                tabIndex={tabIndex}
                inert={!isOpen}
                aria-disabled={ariaDisabled}
                aria-hidden={ariaHidden}
                className="link-url pl2 pointer bullet underline on-tertiaryX on-tertiary hover:b--attention-hover"
                onClick={() => navigateTo(MDX_PAGE.ABOUT)}
              >
                About
              </li>
              <li
                aria-labelledby="li-terms-and-conditions-page"
                tabIndex={tabIndex}
                inert={!isOpen}
                aria-disabled={ariaDisabled}
                aria-hidden={ariaHidden}
                className="link-url pl2 pointer bullet underline on-tertiaryX on-tertiary hover:b--attention-hover"
                onClick={() => navigateTo(MDX_PAGE.TERMS_AND_CONDITIONS)}
              >
                Terms and conditions
              </li>
              <li
                aria-labelledby="li-privacy-policy"
                tabIndex={tabIndex}
                inert={!isOpen}
                aria-disabled={ariaDisabled}
                aria-hidden={ariaHidden}
                className="link-url pl2 pointer bullet underline on-tertiaryX on-tertiary hover:b--attention-hover"
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
