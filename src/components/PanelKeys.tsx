// src/components/PanelKeys.tsx
import React from 'react'
import { useAppContext } from '../context/AppContext/AppContext'
import { APP_PANEL } from '../../shared/cknTypes/types/types'

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

  const headline = (
    <div>
      <p className="pa0 ma0">
      Set your cloud-based keys here for Google Text-To-Speech (TTS) cloud-based services and OpenAI cloud-based service for GenAI.
      </p>
    </div>
  )

  return (
    <div className={`api-keys-panel z-3 absolute top-0 left-0 w-100 h-100 bg-light-gray transition-transform ${translateX}`}>
      <div className="h-100 w-100 overflow-y-auto">
        <div className="pa4 mw7 w-100 black center mb5">
          <h2 className="f3 pa3 pb0 mt5 w-100 tc">API Keys Panel</h2>
          <div className="f3 pv3 pt0 mt0">{headline}</div>

          <div className="w-100 pa3">
            <label className="db mb2 b f3">Google TTS API Key</label>
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
              className="bg-brand white pa2 f4 br2 bn pointer db mb3 w-100"
            >
              Clear API Key
            </button>

            <label className="db mt5 mb2 b f3">OpenAI API Key</label>
            <input
              type={maskOpenAiKey ? 'password' : 'text'}
              value={openAiKey}
              onChange={(e) => {
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
              className="bg-brand white pa2 f4 br2 bn pointer db mb3 w-100"
            >
              Clear OpenAI Key
            </button>          
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelKeys
