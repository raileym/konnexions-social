// src/components/Navbar.tsx
import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faKey, faRobot } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import Button from './Button'

// type NavbarProps = {
//   onToggleSettings: () => void
//   onToggleHelp: () => void
//   onToggleKeys: () => void
// }

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 shadow-3 left-0 w-100 bg-white dark-gray flex items-center justify-between ph3 pv2 z-999">
      <div className="flex items-center">
        <img
          src="/logo-blue-on-transparent-178x133.png"
          alt="CKN logo"
          className="aspect-ratio aspect-ratio--1x h3 w3X mr2"
          style={{height: '3em'}}
        />
        <div className="black-30 ml2 f3 b lh-title tl">
          <div>CKՈ Series on Joy</div>
          <div className="black-20 f5">Joy of Language - Spanish</div>
        </div>
      </div>
      <div>

      <Button panel="genAI" icon={faRobot} title="GenAI" />
      <Button panel="settings" icon={faGear} title="Settings" />
      <Button panel="help" icon={faCircleQuestion} title="Help" />
      <Button panel="keys" icon={faKey} title="API Keys" />
              
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
