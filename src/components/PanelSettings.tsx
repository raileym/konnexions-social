import React from 'react'

type PanelSettingsProps = {
  onActive: boolean
}

const PanelSettings: React.FC<PanelSettingsProps> = ({ onActive }) => {
  const translateX = onActive ? 'translate-x-0' : 'translate-x-full'

  return (
    <div className={`absolute pa4 bg-yellow top-0 left-0 w-100 h-100 bg-white z-1 transition-transform ${translateX}`} >
      <h2 className="f3 pa3 mt5">Settings Panel</h2>
      <p>Mark your settings.</p>
    </div>
  )
}

export default PanelSettings
