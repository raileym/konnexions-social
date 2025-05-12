// src/components/Navbar.tsx
import React from 'react'
import { NavLink } from 'react-router-dom'

const navStyle = 'pa2 dim'

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-center bg-light-gray pa3">
      <NavLink to="/" end className={({ isActive }) => `${navStyle} ${isActive ? 'b dark-blue' : ''}`}>
        Home
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `${navStyle} ${isActive ? 'b dark-blue' : ''}`}>
        Settings
      </NavLink>
      <NavLink to="/help" className={({ isActive }) => `${navStyle} ${isActive ? 'b dark-blue' : ''}`}>
        Help
      </NavLink>
    </nav>
  )
}

export default Navbar
