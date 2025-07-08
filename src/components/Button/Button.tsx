// components/Button.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@context/AppContext/AppContext'
import { type ButtonProps } from '@cknTypes/types'
import { APP_PANEL } from '@cknTypes/constants'
import { useHelpPanel } from '@hooks/useHelpPanel'
import { useMenuPanel } from '@hooks/useMenuPanel'

const Button = ({ iconStyle, disable, panel, icon, title, buttonClass, switchFn, isActive }: ButtonProps) => {
  const { isHelpOpen, isMenuOpen } = useAppContext()
  const { openHelp, closeHelp } = useHelpPanel()
  const { openMenu, closeMenu } = useMenuPanel()

  const handleClick = () => {
    if (isHelpOpen && panel === APP_PANEL.HELP) {
      closeHelp()
    } else if (!isHelpOpen && panel === APP_PANEL.HELP) {
      closeMenu()
      openHelp()
    } else if (isMenuOpen && panel === APP_PANEL.MENU) {
      closeMenu()
    } else if (!isMenuOpen && panel === APP_PANEL.MENU) {
      closeHelp()
      openMenu()
    } else {
      switchFn(panel)
    }
  }  

  return (
    <button
      onClick={() => { if (!disable) handleClick() }}
      disabled={disable}
      className={`${buttonClass} f2 bn pointer bg-white ${isActive ? 'brand' : 'dark-gray'} mr2X ${disable ? 'o-20' : 'o-100'}`}
      // className={`f2 pa2 br2 bn pointer bg-white ${isActive ? 'bg-light-purple white' : 'dark-gray'} mr2`}
      title={title}
    >
      <FontAwesomeIcon className={iconStyle} icon={icon} />
      <div className="f6 mt1">{title}</div>
    </button>
  )
}

export default Button
