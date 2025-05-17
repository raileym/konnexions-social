// components/Button.tsx
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../context/AppContext'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { APP_PANEL, type AppPanelValue } from '../cknTypes/types/types'
import { usePanel } from '../hooks/usePanel'
import { useHelpPanel } from '../hooks/useHelpPanel'
// import type { AppPanel } from '../cknTypes/types/types'
type ButtonProps = {
  panel: AppPanelValue
  // panel: AppPanel
  icon: IconProp
  title?: string
}

const Button: React.FC<ButtonProps> = ({ panel, icon, title }) => {
  const { activePanel, isHelpOpen } = useAppContext()
  const { switchPanel } = usePanel()
  const { openHelp, closeHelp } = useHelpPanel()

  const isActive = activePanel === panel

  const handleClick = () => {
    if (panel === APP_PANEL.HELP && isHelpOpen) {
      console.log('Close Help')
      closeHelp()
    } else if (panel === APP_PANEL.HELP && !isHelpOpen) {
      console.log('Open Help')
      openHelp()
    } else {
      console.log('Switch Panel', panel)
      switchPanel(panel)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`f2 bn pointer bg-white ${isActive ? 'brand' : 'dark-gray'} mr2X`}
      // className={`f2 pa2 br2 bn pointer bg-white ${isActive ? 'bg-light-purple white' : 'dark-gray'} mr2`}
      title={title}
    >
      <FontAwesomeIcon icon={icon} />
      <div className="f6 mt1">{title}</div>
    </button>
  )
}

export default Button
