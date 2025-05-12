// src/components/PanelHelp.tsx
import React from 'react'

const PanelHelp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="pa4">
      <h2 className="f3">Help</h2>
      <p>Need assistance? You're in the right place.</p>
      <button onClick={onClose} className="mt3">
        Close Help
      </button>
    </div>
  )
}

export default PanelHelp
