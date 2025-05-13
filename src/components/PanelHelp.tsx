// src/components/PanelHelp.tsx
import React from 'react'

type PanelHelpProps = {
  onActive: boolean
}

const PanelHelp: React.FC<PanelHelpProps> = ({ onActive }) => {
  const translateX = onActive ? 'translate-x-0' : 'translate-x-full'

  return (
    <div className={`pa4 absolute bg-blue white top-0 left-0 w-100 h-100 bg-whiteX z-1 transition-transform ${translateX}`} >
      <h2 className={"f3 mt5"}>Help</h2>
      <p>Need assistance? You're in the right place.</p>
    </div>
  )
}

export default PanelHelp
