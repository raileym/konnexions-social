// src/App.tsx
import React, { useEffect } from 'react'
import PanelKeys from './components/PanelKeys'
import PanelHome from './components/PanelHome'
import PanelSettings from './components/PanelSettings'
import PanelHelp from './components/PanelHelp'
import NavbarTop from './components/NavbarTop'
import './App.scss'
import PanelGenAI from './components/PanelGenAI'
import NavbarBottom from './components/NavbarBottom'
import PanelMenu from './components/PanelMenu'
import { useAppContext } from './context/AppContext'
import { getCurrentWeek } from './components/Util'
import { SCENARIO, type ScenarioValue } from './cknTypes/types/types'

const App: React.FC = () => {
  const {
    setApiKey,
    setMaskKey,
    setMaskOpenAiKey,    
    setOpenAiKey,
    setOpenAiUsage,
    setScenario,
    setTtsCharUsage,
    setUseCloudTTS
  } = useAppContext()

  const loadUsage = () => {
    const week = getCurrentWeek()
    const openAiStored = localStorage.getItem(`openAiUsageW${week}`)
    setOpenAiUsage(openAiStored ? parseInt(openAiStored, 10) : 0)

    const ttsStored = localStorage.getItem(`ttsCharUsageW${week}`)
    setTtsCharUsage(ttsStored ? parseInt(ttsStored, 10) : 0)
  }

  useEffect(() => {
    const handleVoiceLoad = () => {
      const voices = window.speechSynthesis.getVoices()
      console.log('[Chrome] Voices loaded:', voices.map(v => v.lang + ' - ' + v.name))
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = handleVoiceLoad
      handleVoiceLoad()
    }

    const stored = localStorage.getItem('scenario') as ScenarioValue | null

    if (stored && Object.values(SCENARIO).includes(stored)) {
      setScenario(stored as ScenarioValue)
    } else {
      setScenario(SCENARIO.RESTAURANT)
      localStorage.setItem('scenario', SCENARIO.RESTAURANT)
    }    
    
    const storedKey = localStorage.getItem('gcpTTSKey')
    if (storedKey) {
      setApiKey(storedKey)
      setMaskKey(true)
    }

    const storedOpenAiKey = localStorage.getItem('openAiKey')
    if (storedOpenAiKey) {
      setOpenAiKey(storedOpenAiKey)
      setMaskOpenAiKey(true)
    }

    const storedUseCloudTTS = localStorage.getItem('useCloudTTS')
    if (storedUseCloudTTS && storedUseCloudTTS === 'true') {
      setUseCloudTTS(true)
    } else if (storedUseCloudTTS && storedUseCloudTTS === 'false') {
      setUseCloudTTS(false)
    } else {
      setUseCloudTTS(false)
    }
    
    loadUsage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="max-w6 min-w5 relative w-100 center min-vh-100 overflow-hidden bg-light-gray">
        <PanelHome />
        <PanelKeys />
        <PanelSettings />
        <PanelHelp />
        <PanelGenAI />
        <PanelMenu />
      </div>
      <NavbarTop />
      <NavbarBottom />
      </>
  )
}

export default App
