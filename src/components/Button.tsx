// components/Button.tsx
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../context/AppContext'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'

type ButtonProps = {
  panel: 'settings' | 'help' | 'keys'
  icon: IconProp
  title?: string
}

const Button: React.FC<ButtonProps> = ({ panel, icon, title }) => {
  const { activePanel, setActivePanel } = useAppContext()
  const isActive = activePanel === panel

  const handleClick = () => {
    setActivePanel(isActive ? 'home' : panel)
  }

  return (
    <button
      onClick={handleClick}
      className={`f2 pa2 br2 bn pointer bg-white ${isActive ? 'light-purple' : 'dark-gray'} mr2`}
      // className={`f2 pa2 br2 bn pointer bg-white ${isActive ? 'bg-light-purple white' : 'dark-gray'} mr2`}
      title={title}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}

export default Button
