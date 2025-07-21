// components/Button.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@context/AppContext/AppContext'
import { type ButtonProps } from '@cknTypes/types'
import { APP_PANEL } from '@cknTypes/constants'
import { useHelpPanel } from '@hooks/useHelpPanel'
import { useMenuPanel } from '@hooks/useMenuPanel'
import { useProfilePanel } from '@hooks/useProfilePanel'
import { useSettingsPanel } from '@hooks/useSettingsPanel'

const Button = ({ reverse = false, iconClass, titleClass, disable, panel, icon, img, title, buttonClass, switchFn, isActive, onClick }: ButtonProps) => {
  const { isHelpOpen, isMenuOpen, isProfileOpen, isSettingsOpen } = useAppContext()
  const { openProfile, closeProfile } = useProfilePanel()
  const { openHelp, closeHelp } = useHelpPanel()
  const { openMenu, closeMenu } = useMenuPanel()
  const { openSettings, closeSettings } = useSettingsPanel()

  const handleClick = () => {
    if (isHelpOpen && panel === APP_PANEL.HELP) {
      closeHelp()
    } else if (isMenuOpen && panel === APP_PANEL.MENU) {
      closeMenu()
    } else if (isProfileOpen && panel === APP_PANEL.PROFILE) {
      closeProfile()
    } else if (isSettingsOpen && panel === APP_PANEL.SETTINGS) {
      closeSettings()

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
      onClick={() => { if (!disable) handleClick() }}
      disabled={disable}
      className={`f2 pa1 pointer width-2X ${isActive ? reverse ? 'bg-on-background secondary' : 'bg-on-background on-secondary' : reverse ? 'bg-on-background on-secondary' : 'bg-on-background secondary'} mr2X ${disable ? 'o-20' : 'o-100'} ${buttonClass}`}
      // style={{width: '2.5em'}}
      title={title}
    >
      { icon && <FontAwesomeIcon className={`${iconClass} baX`} icon={icon} /> }
      { img && (
        <div className="flex items-center justify-center overflow-hiddenX w2X h2 br-100X baX" style={{height: '1.15em'}}>
          <img
            src={`/${img}`}
            alt={title}
            className="scale-125X h3 w3 mv0 pv0"
          />
        </div>
      )}

      <div className={`f6 mt1 tc ${isActive ? reverse ? 'secondary' : 'on-secondary' : reverse ? 'secondary' : 'on-secondary'}} ${titleClass}`}>{title}</div>
    </button>
  )
}

export default Button
