// src/components/PanelSettings.tsx
import React from 'react'

const PanelSettings: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="pa4">
      <h2 className="f3">Settings</h2>
      <p>Adjust your preferences here.</p>
      <button onClick={onClose} className="mt3">
        Close Settings
      </button>
    </div>
  )
}

export default PanelSettings
