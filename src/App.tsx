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
import { useAppContext } from './context/AppContext'
import { getCurrentWeek } from './components/Util'
import { SCENARIO, type ScenarioValue, type StepResult } from './cknTypes/types/types'
import PanelGenAIPro from './components/PanelGenAIPro'

const App: React.FC = () => {
  const {
    setAnswerKeep,
    setApiKey,
    setDialogKeep,
    setMaskKey,
    setMaskOpenAiKey,    
    setOpenAiKey,
    setOpenAiUsage,
    setQuestionKeep,
    setScenario,
    setStepResult,
    setTtsCharUsage,
    setUseCloudTTS,
    setHandleDialogErrors,
    setHandleNounsErrors,
    setHandleVerbsErrors
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

    const questionKeep = localStorage.getItem('questionKeep')
    if (questionKeep) setQuestionKeep(questionKeep)
    
    const answerKeep = localStorage.getItem('answerKeep')
    if (answerKeep) setAnswerKeep(answerKeep)

    const dialogKeep = localStorage.getItem('dialogKeep')
    if (dialogKeep) setDialogKeep(dialogKeep)

    const nounsKeep = localStorage.getItem('nounsKeep')
    if (nounsKeep) setDialogKeep(nounsKeep)
  
    const verbsKeep = localStorage.getItem('verbsKeep')
    if (verbsKeep) setDialogKeep(verbsKeep)
  
    const saved = localStorage.getItem('stepResult')
    if (saved) {
      try {
        const recovered: StepResult = JSON.parse(saved)
        setStepResult(recovered)
      } catch (err) {
        console.error('Failed to load stepResult from localStorage:', err)
      }
    }

    try {
      const dialogErrors = localStorage.getItem('handleDialogError')
      if (dialogErrors) {
        const parsed = JSON.parse(dialogErrors)
        setHandleDialogErrors(parsed)
      }

      const nounErrors = localStorage.getItem('handleNounsError')
      if (nounErrors) {
        const parsed = JSON.parse(nounErrors)
        setHandleNounsErrors(parsed)
      }

      const verbErrors = localStorage.getItem('handleVerbsError')
      if (verbErrors) {
        const parsed = JSON.parse(verbErrors)
        setHandleVerbsErrors(parsed)
      }
    } catch (err) {
      console.error('Failed to load error logs from localStorage:', err)
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
