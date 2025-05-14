// src/components/PanelKeys.tsx
import React from 'react'
import { useAppContext } from '../context/AppContext'
import { APP_PANEL } from '../cknTypes/types/types'

const PanelKeys: React.FC = () => {
  const { gcpKey, setGcpKey, openAiKey, setOpenAiKey, activePanel } = useAppContext()
  const isActive = activePanel === APP_PANEL.KEYS
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  return (
    <div className={`absolute pa4 z-1 top-0 left-0 w-100 h-100 bg-light-gray transition-transform ${translateX}`}>
      <h2 className="f3 pa3 baX mt5">API Keys</h2>

      <div className="w-100 pa3 bg-blueX">
        <label className="db mb2 ml3X f6">Google TTS API Key</label>
        <input
          type="password"
          value={gcpKey}
          onChange={(e) => setGcpKey(e.target.value)}
          className="input-reset ba b--black-20 pa2 mb3 ml3X mr5X db w-100"
        />

        <label className="db mb2 ml3X f6">OpenAI API Key</label>
        <input
          type="password"
          value={openAiKey}
          onChange={(e) => setOpenAiKey(e.target.value)}
          className="input-reset ba b--black-20 pa2 ml3X db w-100"
          />
        </div>
    </div>
  )
}

export default PanelKeys
