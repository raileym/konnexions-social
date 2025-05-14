// src/components/NavbarBottom.tsx
import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faKey, faRobot, faBars } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

const NavbarBottom: React.FC = () => {
  return (
    <nav className="fixed bottom-0 bt b--black-30 left-0 w-100 bg-white flex items-center justify-around ph3 pv2 z-999">
      <Button panel="genAI" icon={faRobot} title="GenAI" />
      <Button panel="settings" icon={faGear} title="Settings" />
      <Button panel="keys" icon={faKey} title="API Keys" />
      <Button panel="menu" icon={faBars} title="Menu" />
    </nav>
  )
}

export default NavbarBottom
