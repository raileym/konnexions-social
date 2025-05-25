// components/Button.tsx
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../context/AppContext'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { APP_PANEL, type AppHomeValue, type AppPanelValue, type IsActive } from '../../shared/types'
// import { usePanel } from '../hooks/usePanel'
import { useHelpPanel } from '../hooks/useHelpPanel'
// import type { AppPanel } from '../../shared/types'

// type ButtonProps = {
//   panel: AppPanelValue
//   // panel: AppPanel
//   icon: IconProp
//   title?: string
//   buttonClass?: string
// }

type ButtonProps = {
  panel: AppPanelValue | AppHomeValue
  icon: IconProp // IconDefinition
  title?: string
  buttonClass?: string
  switchFn: (target: AppPanelValue | AppHomeValue) => void
  isActive: IsActive
}

const Button: React.FC<ButtonProps> = ({ panel, icon, title, buttonClass, switchFn, isActive }) => {
  const { isHelpOpen } = useAppContext()
  // const { activePanel, isHelpOpen } = useAppContext()
  // const { switchPanel } = usePanel()
  const { openHelp, closeHelp } = useHelpPanel()

  // const isActive = activePanel === panel

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
