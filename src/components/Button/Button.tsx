// components/Button.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@context/AppContext/AppContext'
import { type ButtonProps } from '@cknTypes/types'
import { APP_PANEL } from '@cknTypes/constants'
import { useHelpPanel } from '@hooks/useHelpPanel'
import { useMenuPanel } from '@hooks/useMenuPanel'
import { useProfilePanel } from '@hooks/useProfilePanel'

const Button = ({ iconStyle, disable, panel, icon, img, title, buttonClass, switchFn, isActive, onClick }: ButtonProps) => {
  const { isHelpOpen, isMenuOpen, isProfileOpen } = useAppContext()
  const { openProfile, closeProfile } = useProfilePanel()
  const { openHelp, closeHelp } = useHelpPanel()
  const { openMenu, closeMenu } = useMenuPanel()

  const handleClick = () => {
    if (isHelpOpen && panel === APP_PANEL.HELP) {
      closeHelp()
    } else if (isMenuOpen && panel === APP_PANEL.MENU) {
      closeMenu()
    } else if (isProfileOpen && panel === APP_PANEL.PROFILE) {
      closeProfile()
    } else if (!isHelpOpen && panel === APP_PANEL.HELP) {
      closeProfile()
      closeMenu()
      openHelp()
    } else if (!isMenuOpen && panel === APP_PANEL.MENU) {
      closeProfile()
      closeHelp()
      openMenu()
    } else if (!isProfileOpen && panel === APP_PANEL.PROFILE) {
      closeMenu()
      closeHelp()
      openProfile()
    } else {
      switchFn(panel)
    }

    if (onClick) onClick()    
  }  

  return (
    <button
      onClick={() => { if (!disable) handleClick() }}
      disabled={disable}
      className={`f2 bnX pa1 w3 pointer bg-whiteX ${isActive ? 'bg-brand white' : 'bg-white brand'} mr2X ${disable ? 'o-20' : 'o-100'} ${buttonClass}`}
      style={{width: '2em'}}
      // className={`f2 pa2 br2 bn pointer bg-white ${isActive ? 'bg-light-purple white' : 'dark-gray'} mr2`}
      title={title}
    >
      { icon && <FontAwesomeIcon className={`${iconStyle} baX`} icon={icon} /> }
      { img && (
        <div className="flex items-center justify-center overflow-hiddenX w2X h2 br-100X baX" style={{height: '1.15em'}}>
          <img
            src={`/${img}`}
            alt={title}
            className="scale-125X h3 w4 mv0 pv0"
          />
        </div>
      )}


      <div className="f6 mt1">{title}</div>
    </button>
  )
}

export default Button
