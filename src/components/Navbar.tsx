// src/components/Navbar.tsx
import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGear, faKey } from '@fortawesome/free-solid-svg-icons'
// import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import Button from './Button'

type NavbarProps = {
  onToggleSettings: () => void
  onToggleHelp: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSettings, onToggleHelp }) => {
  return (
    <nav className="fixed top-0 shadow-3 left-0 w-100 bg-white dark-gray flex items-center justify-between ph3 pv2 z-999">
      <div className="flex items-center">
        <img
          src="/logo-white-on-purple-224x224.png"
          alt="Let's Connect logo"
          className="h3 w3 mr2"
        />
        <div className="ml3 f3 b lh-solid">
          Share the<br/> connection!
        </div>
      </div>
      <div>

        <Button icon="gear" title="Settings" onClick={onToggleSettings} />
        <Button icon="question-regular" title="Help" onClick={onToggleHelp} />
              
        {/*
        <button
          className="mr2 f2 bg-white dark-gray pa2 br2 bn pointer"
          onClick={onToggleSettings}
          title="Settings"
        >
          <FontAwesomeIcon icon={faKey} />
        </button>
        <button
          className="mr2 f2 bg-white dark-gray pa2 br2 bn pointer"
          onClick={onToggleSettings}
          title="Settings"
        >
          <FontAwesomeIcon icon={faGear} />
        </button>
        <button
          className="bg-white f2 dark-gray pa2 br2 bn pointer"
          onClick={onToggleHelp}
          title="Help"
        >
          <FontAwesomeIcon icon={faCircleQuestion} />
        </button>
        */}
      </div>
    </nav>

  )
}

export default Navbar
