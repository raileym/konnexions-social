import React from 'react'
import { useAppContext } from '../context/AppContext'
import { APP_PANEL } from '../cknTypes/types/types'

const PanelSettings: React.FC = () => {
  const {
    activePanel,
    ttsBudget,
    setTtsBudget,
    ttsAvgChars,
    setTtsAvgChars,
    ttsCharUsage,
    openAiBudget,
    setOpenAiBudget,
    openAiAvgTokens,
    setOpenAiAvgTokens,
    openAiUsage
  } = useAppContext()
  const isActive = activePanel === APP_PANEL.SETTINGS
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  const ttsWeeklyLimit = Math.floor((ttsBudget / 16) * 1_000_000 / ttsAvgChars)
  const openAiWeeklyLimit = Math.floor((openAiBudget / 0.0035 / 4.33) * (1000 / openAiAvgTokens))

  return (
    <div className={`absolute z-1 pa4 top-0 left-0 w-100 h-100 bg-light-gray black transition-transform ${translateX}`}>
      <h2 className="f3 baX pa3 mt5">Settings Panel</h2>
      <label className="db mb2 f6">TTS Budget ($/month)</label>
      <input
        type="number"
        value={ttsBudget}
        onChange={(e) => setTtsBudget(parseFloat(e.target.value))}
        className="input-reset ba b--black-20 pa2 mb2 db w-100"
      />
      <label className="db mb2 f6">Avg chars per TTS</label>
      <input
        type="number"
        value={ttsAvgChars}
        onChange={(e) => setTtsAvgChars(parseInt(e.target.value))}
        className="input-reset ba b--black-20 pa2 mb2 db w-100"
      />
      <small className="db mb3 gray">{ttsWeeklyLimit - Math.floor(ttsCharUsage / ttsAvgChars)} TTS transforms remaining this week</small>

      <label className="db mb2 f6">OpenAI Budget ($/month)</label>
      <input
        type="number"
        value={openAiBudget}
        onChange={(e) => setOpenAiBudget(parseFloat(e.target.value))}
        className="input-reset ba b--black-20 pa2 mb2 db w-100"
      />
      <label className="db mb2 f6">Avg tokens per Q</label>
      <input
        type="number"
        value={openAiAvgTokens}
        onChange={(e) => setOpenAiAvgTokens(parseInt(e.target.value))}
        className="input-reset ba b--black-20 pa2 mb2 db w-100"
      />
      <small className="db mb4 gray">{openAiWeeklyLimit - openAiUsage} OpenAI questions remaining this week</small>
    </div>
  )
}

export default PanelSettings
