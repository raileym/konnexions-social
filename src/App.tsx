// src/App.tsx
import React, { useEffect } from 'react'
import PanelKeys from './components/PanelKeys'
import PanelBasic from './components/PanelBasic'
import PanelSettings from './components/PanelSettings'
import PanelHelp from './components/PanelHelp'
import NavbarTop from './components/NavbarTop'
import './App.scss'
import PanelGenAI from './components/PanelGenAI'
import NavbarBottom from './components/NavbarBottom'
import PanelMenu from './components/PanelMenu'
import { useAppContext } from './context/AppContext/AppContext'
import { getCurrentWeek } from './components/Util'
import { defaultMaxCount, SCENARIO, type Scenario } from '@cknTypes/types'
import PanelGenAIPro from './components/PanelGenAIPro/PanelGenAIPro'

const App: React.FC = () => {
  const {
    setOpenAiUsage,
    setScenario,
    setTtsCharUsage,
    setMaxCount
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
      void window.speechSynthesis.getVoices()

      // // cXnsole.log('[Chrome] Voices loaded:', voices.map(v => v.lang + ' - ' + v.name))
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = handleVoiceLoad
      handleVoiceLoad()
    }

    const stored = localStorage.getItem('scenario') as Scenario | null
    if (stored && Object.values(SCENARIO).includes(stored)) {
      setScenario(stored as Scenario)
    } else {
      setScenario(SCENARIO.RESTAURANT)
      localStorage.setItem('scenario', SCENARIO.RESTAURANT)
    }    
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('maxCount')
      const parsed = stored ? JSON.parse(stored) : null

      if (typeof parsed !== 'number') {
        setMaxCount(defaultMaxCount)
      }
    }

    loadUsage()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="flex max-w6X min-w5 relative w-100 center min-vh-100 overflow-hidden bg-blue">
        <PanelBasic />
        <PanelGenAI />
        <PanelGenAIPro />

        <PanelKeys />
        <PanelSettings />
        <PanelMenu />

        <PanelHelp />
      </div>
      <NavbarTop />
      <NavbarBottom />
      </>
  )
}

export default App
