// components/Button.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@context/AppContext/AppContext'
import { type ButtonProps } from '@cknTypes/types'
import { APP_PANEL } from '@cknTypes/constants'
import { useHelpPanel } from '@hooks/useHelpPanel'
import { useMenuPanel } from '@hooks/useMenuPanel'
import { useProfilePanel } from '@hooks/useProfilePanel'
import { useSettingsPanel } from '@hooks/useSettingsPanel'

const ButtonBare = ({
  buttonRef,
  tabIndex,
  ariaDisabled = false,
  ariaLabelledBy,
  iconClass,
  titleClass,
  disable,
  panel,
  icon,
  img,
  title,
  buttonClass,
  switchFn,
  isActive,
  onClick
}: ButtonProps) => {
  const { isHelpOpen, isMenuOpen, isProfileOpen, isSettingsOpen } = useAppContext()
  const { openProfile, closeProfile } = useProfilePanel()
  const { openHelp, closeHelp } = useHelpPanel()
  const { openMenu, closeMenu } = useMenuPanel()
  const { openSettings, closeSettings } = useSettingsPanel()

  const handleClick = () => {
    if (isHelpOpen && panel === APP_PANEL.HELP) {
      closeProfile()
      closeMenu()
      closeSettings()
      closeHelp()
    } else if (isMenuOpen && panel === APP_PANEL.MENU) {
      closeProfile()
      closeMenu()
      closeSettings()
      closeHelp()
    } else if (isProfileOpen && panel === APP_PANEL.PROFILE) {
      closeProfile()
      closeMenu()
      closeSettings()
      closeHelp()
    } else if (isSettingsOpen && panel === APP_PANEL.SETTINGS) {
      closeProfile()
      closeMenu()
      closeSettings()
      closeHelp()
    } else if (!isHelpOpen && panel === APP_PANEL.HELP) {
      closeProfile()
      closeMenu()
      closeSettings()
      openHelp()
    } else if (!isMenuOpen && panel === APP_PANEL.MENU) {
      closeProfile()
      closeHelp()
      closeSettings()
      openMenu()
    } else if (!isProfileOpen && panel === APP_PANEL.PROFILE) {
      closeMenu()
      closeHelp()
      closeSettings()
      openProfile()
    } else if (!isSettingsOpen && panel === APP_PANEL.SETTINGS) {
      closeMenu()
      closeHelp()
      closeProfile()
      openSettings()
    } else {
      closeMenu()
      closeHelp()
      closeProfile()
      closeSettings()
      switchFn?.(panel ?? APP_PANEL.MDX)
    }

    if (onClick) onClick()    
  }  

  return (
    <button
      ref={buttonRef} // <-- apply ref here
      // aria-label={`${title} Button,`}
      aria-labelledby={ariaLabelledBy}
      // aria-describedby={ariaDescribedBy}
      tabIndex={tabIndex}
      aria-disabled={ariaDisabled}
      // aria-keyshortcuts={'up arrow'}
      onClick={() => { if (!disable) handleClick() }}
      disabled={disable}
      className={`f2X pa1X focus-visible:bg-tertiaryX bw3 pointerX width-2XX secondaryX ${isActive ? 'bg-on-backgroundX' : 'bg-backgroundX'} mr2X ${disable ? 'o-20' : 'o-100'} ${buttonClass}`}
      // style={{width: '2.5em'}}
      title={title}
    >
      { icon && <FontAwesomeIcon className={`secondary ${iconClass} baX`} icon={icon} /> }
      <div className={`f6X mt1X tcX secondaryX ${titleClass}`}>{title}</div>
      {/* <div className={`f6 mt1 tc ${isActive ? reverse ? 'secondary' : 'on-secondary' : reverse ? 'secondary' : 'on-secondary'}} ${titleClass}`}>{title}</div> */}
    </button>
  )
}

export default ButtonBare
