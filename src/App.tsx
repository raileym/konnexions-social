// src/App.tsx
import React, { useEffect } from 'react'
import PanelKeys from './components/PanelKeys'
import PanelBasic from '@components/PanelBasic/PanelBasic'
import PanelSettings from './components/PanelSettings'
import PanelHelp from './components/PanelHelp'
import NavbarTop from './components/NavbarTop'
import './App.scss'
import PanelGenAI from './components/PanelGenAI'
import NavbarBottom from './components/NavbarBottom'
import PanelMenu from './components/PanelMenu'
import { useAppContext } from '@context/AppContext/AppContext'
import { getCurrentWeek } from './components/getCurrentWeek'
import { defaultMaxCount, type Scenario } from '@cknTypes/types'
import { SCENARIO } from '@cknTypes/constants'
import PanelGenAIPro from './components/PanelGenAIPro/PanelGenAIPro'
import AppLeftPanel from '@components/AppLeftPanel/AppLeftPanel'
import PanelBasicReview from '@components/PanelBasicReview/PanelBasicReview'

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

    loadUsage()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="app flex max-w6X min-w5 relative w-100 center min-vh-100 overflow-hidden bg-blue">
        {/* <div className="bg-yellow absolute z-4 w-10 left-0 top-0 h-100" /> */}
        <AppLeftPanel />
        <PanelGenAIPro />
        <PanelBasic />
        <PanelGenAI />
        {/* <PanelSettings /> */}
        <PanelBasicReview />
        <PanelKeys />
        <PanelMenu />
        <PanelHelp />
      </div>
      <NavbarTop />
      <NavbarBottom />
      </>
  )
}

export default App
