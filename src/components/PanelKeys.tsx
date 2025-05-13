// src/components/PanelKeys.tsx
import React from 'react'
import { useAppContext } from '../context/AppContext'

const PanelKeys: React.FC = () => {
  const { gcpKey, setGcpKey, openAiKey, setOpenAiKey, activePanel } = useAppContext()
  const isActive = activePanel === 'keys'
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  return (
    <div className={`pa4 absolute top-0 left-0 w-100 h-100 bg-white z-1 transition-transform ${translateX}`}>
      <h2 className="f3 mt5">API Keys</h2>

      <label className="db mb2 f6">Google TTS API Key</label>
      <input
        type="password"
        value={gcpKey}
        onChange={(e) => setGcpKey(e.target.value)}
        className="input-reset ba b--black-20 pa2 mb3 db w-100"
      />

      <label className="db mb2 f6">OpenAI API Key</label>
      <input
        type="password"
        value={openAiKey}
        onChange={(e) => setOpenAiKey(e.target.value)}
        className="input-reset ba b--black-20 pa2 db w-100"
      />
    </div>
  )
}

export default PanelKeys
