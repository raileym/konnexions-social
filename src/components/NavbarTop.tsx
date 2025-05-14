// src/components/NavbarTop.tsx
import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import Button from './Button'

const NavbarTop: React.FC = () => {
  return (
    <nav className="fixed top-0 shadow-3 left-0 w-100 bg-whiteX dark-grayX bg-white flex items-center justify-between ph3 pv2 z-999">
      <div className="flex items-center">
        <div className="bg-brand mr4">
          <img
            src="/logo-blue-transparent-on-white-173x126.png"
            alt="CKN logo"
            className="db aspect-ratio aspect-ratio--1x h3"
          />
        </div>
        <div className="black-30 ml2 f3 b lh-title tl">
          <div><span className="brand">CK</span>Ո Series on Joy</div>
          <div className="black-20 f5">Joy of Language - Spanish</div>
        </div>
      </div>
      <div>

      <Button panel="help" icon={faCircleQuestion} title="Help" />
              
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

export default NavbarTop
