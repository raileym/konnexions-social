// src/components/Button.tsx
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faKey,
  faCircleQuestion,
  faGear,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion as faCircleQuestionRegular } from '@fortawesome/free-regular-svg-icons'

type IconName = 'gear' | 'key' | 'question' | 'question-regular'

type ButtonProps = {
  icon: IconName
  title?: string
  onClick?: () => void
  className?: string
}

const iconMap: Record<IconName, IconDefinition> = {
  gear: faGear,
  key: faKey,
  question: faCircleQuestion,
  'question-regular': faCircleQuestionRegular,
}

const Button: React.FC<ButtonProps> = ({ icon, title, onClick, className = '' }) => {
  const [selected, setSelected] = useState(false)

  const handleClick = () => {
    setSelected(!selected)
    if (onClick) onClick()
  }

  return (
    <button
      title={title}
      onClick={handleClick}
      className={`f2 pa2 br2 bn pointer mr2 ${selected ? 'bg-blue white' : 'bg-white dark-gray'} ${className}`}
    >
      <FontAwesomeIcon icon={iconMap[icon]} />
    </button>
  )
}

export default Button
