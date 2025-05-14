// components/Button.tsx
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../context/AppContext'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { type AppPanelValue } from '../cknTypes/types/types'
// import type { AppPanel } from '../cknTypes/types/types'
type ButtonProps = {
  panel: AppPanelValue
  // panel: AppPanel
  icon: IconProp
  title?: string
}

const Button: React.FC<ButtonProps> = ({ panel, icon, title }) => {
  const { activePanel, switchPanel } = useAppContext()
  const isActive = activePanel === panel

  const handleClick = () => {
    switchPanel(panel)
  }

  return (
    <button
      onClick={handleClick}
      className={`f2 pv2X br2X bn pointer bg-white ${isActive ? 'brand' : 'dark-gray'} mr2X`}
      // className={`f2 pa2 br2 bn pointer bg-white ${isActive ? 'bg-light-purple white' : 'dark-gray'} mr2`}
      title={title}
    >
      <FontAwesomeIcon icon={icon} />
      <div className="f6 mt1">{title}</div>
    </button>
  )
}

export default Button
