// components/Button.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ButtonProps } from '@cknTypes/types'
import { APP_PANEL } from '@cknTypes/constants'
// import { useHelpPanel } from '@hooks/useHelpPanel'
// import { useMenuPanel } from '@hooks/useMenuPanel'
// import { useProfilePanel } from '@hooks/useProfilePanel'
// import { useSettingsPanel } from '@hooks/useSettingsPanel'
import { useAppContext } from '@context/AppContext/AppContext'
import { useActivePanel } from '@hooks/useActivePanel'

const Button = ({
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
  const { openPanel, closePanel } = useActivePanel()
  
  const { isProfileOpen, isHelpOpen, isMenuOpen, isSettingsOpen } = useAppContext()

  const handleClick = () => {
    if (isHelpOpen && panel === APP_PANEL.HELP) {
      closePanel('profile')
      closePanel('menu')
      closePanel('settings')
      closePanel('help')
    } else if (isMenuOpen && panel === APP_PANEL.MENU) {
      closePanel('profile')
      closePanel('menu')
      closePanel('settings')
      closePanel('help')
    } else if (isProfileOpen && panel === APP_PANEL.PROFILE) {
      closePanel('profile')
      closePanel('menu')
      closePanel('settings')
      closePanel('help')
    } else if (isSettingsOpen && panel === APP_PANEL.SETTINGS) {
      closePanel('profile')
      closePanel('menu')
      closePanel('settings')
      closePanel('help')
    } else if (!isHelpOpen && panel === APP_PANEL.HELP) {
      closePanel('profile')
      closePanel('menu')
      closePanel('settings')
      openPanel('help')
    } else if (!isMenuOpen && panel === APP_PANEL.MENU) {
      closePanel('profile')
      closePanel('help')
      closePanel('settings')
      openPanel('menu')
    } else if (!isProfileOpen && panel === APP_PANEL.PROFILE) {
      closePanel('menu')
      closePanel('help')
      closePanel('settings')
      openPanel('profile')
    } else if (!isSettingsOpen && panel === APP_PANEL.SETTINGS) {
      closePanel('menu')
      closePanel('help')
      closePanel('profile')
      openPanel('settings')
    } else {
      closePanel('menu')
      closePanel('help')
      closePanel('profile')
      closePanel('settings')
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
        className={`f2 pa1 bnX b--redX focus-visible:bg-tertiaryX bw3X pointer width-2X secondary ${isActive ? 'bg-on-backgroundX' : 'bg-backgroundX'} mr2X ${disable ? 'o-20' : 'o-100'} ${buttonClass}`}
        // style={{width: '2.5em'}}
        title={title}
      >
        { icon && <FontAwesomeIcon className={`secondary ${iconClass} baX`} icon={icon} /> }
        { img && (
          <div className="flex items-center justify-center overflow-hiddenX w2X h2 br-100X baX" style={{height: '1.15em'}}>
            <img
              src={`/${img}`}
              alt={title}
              className="scale-125X h3 w3 mv0 pv0"
            />
          </div>
        )}

        <div className={`f6 mt1 tc secondary ${titleClass}`}>{title}</div>
        {/* <div className={`f6 mt1 tc ${isActive ? reverse ? 'secondary' : 'on-secondary' : reverse ? 'secondary' : 'on-secondary'}} ${titleClass}`}>{title}</div> */}
      </button>
  )
}

export default Button
