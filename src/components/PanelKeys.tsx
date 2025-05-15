// src/components/PanelKeys.tsx
import React from 'react'
import { useAppContext } from '../context/AppContext'
import { APP_PANEL } from '../cknTypes/types/types'

const PanelKeys: React.FC = () => {
  const {
    activePanel,
    apiKey,
    maskKey,
    maskOpenAiKey,
    openAiKey,
    setApiKey,
    setMaskKey,
    setMaskOpenAiKey,    
    setOpenAiKey
  } = useAppContext()
  const isActive = activePanel === APP_PANEL.KEYS
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  return (
    <div className={`absolute pa4 z-1 top-0 left-0 w-100 h-100 bg-light-gray transition-transform ${translateX}`}>
      <h2 className="f3 pa3 baX mt5">API Keys</h2>

      <div className="w-100 pa3 bg-blueX">
        <label className="db mb2 f6">Google TTS API Key</label>
        <input
          type={maskKey ? 'password' : 'text'}
          value={apiKey}
          onChange={(e) => {
            setApiKey(e.target.value)
            localStorage.setItem('gcpTTSKey', e.target.value)
          }}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
        />
        <button
          onClick={() => {
            setApiKey('')
            setMaskKey(false)
            localStorage.removeItem('gcpTTSKey')
          }}
          className="bg-light-red white pa2 br2 bn pointer db mb3 w-100"
        >
          Clear API Key
        </button>

        <label className="db mt5 mb2 f6">OpenAI API Key</label>
        <input
          type={maskOpenAiKey ? 'password' : 'text'}
          value={openAiKey}
          onChange={(e) => {
            console.log(e.target.value)
            setOpenAiKey(e.target.value)
            localStorage.setItem('openAiKey', e.target.value)
          }}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
        />
        <button
          onClick={() => {
            setOpenAiKey('')
            setMaskOpenAiKey(false)
            localStorage.removeItem('openAiKey')
          }}
          className="bg-light-red white pa2 br2 bn pointer db mb3 w-100"
        >
          Clear OpenAI Key
        </button>          
      </div>
    </div>
  )
}

export default PanelKeys
