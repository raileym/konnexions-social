// components/Button.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@context/AppContext/AppContext'
import { type ButtonProps } from '@cknTypes/types'
import { APP_PANEL } from '@cknTypes/constants'
import { useHelpPanel } from '@hooks/useHelpPanel'

const Button = ({ panel, icon, title, buttonClass, switchFn, isActive }: ButtonProps) => {
  const { isHelpOpen } = useAppContext()
  const { openHelp, closeHelp } = useHelpPanel()

  const handleClick = () => {
    if (isHelpOpen && panel === APP_PANEL.HELP) {
      closeHelp()
    } else if (!isHelpOpen && panel === APP_PANEL.HELP) {
      openHelp()
    } else {
      switchFn(panel)
    }
  }  

  return (
    <button
      onClick={handleClick}
      className={`${buttonClass} f2 bn pointer bg-white ${isActive ? 'brand' : 'dark-gray'} mr2X`}
      // className={`f2 pa2 br2 bn pointer bg-white ${isActive ? 'bg-light-purple white' : 'dark-gray'} mr2`}
      title={title}
    >
      <FontAwesomeIcon icon={icon} />
      <div className="f6 mt1">{title}</div>
    </button>
  )
}

export default Button
