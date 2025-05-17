/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'
import type {
  Answer,
  ApiKey,
  AppContextType,
  AppPanelValue,
  AudioUrl,
  CleanedText,
  GcpKey,
  InputText,
  IsTransitioning,
  MaskKey,
  MaskOpenAiKey,
  OpenAiAvgTokens,
  OpenAiBudget,
  OpenAiKey,
  OpenAiUsage,
  Question,
  QuestionContext,
  TtsAvgChars,
  TtsBudget,
  TtsCharUsage,
  UseCloudTTS,
  ScenarioValue
} from '../cknTypes/types/types'
import {
  APP_PANEL,
  SCENARIO
} from '../cknTypes/types/types'

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePanel, setActivePanel] = useState<AppPanelValue>(APP_PANEL.HOME)
  const [helpPanel, setHelpPanel] = useState<AppPanelValue>(APP_PANEL.HOME)
  const [answer, setAnswer] = useState<Answer>('')
  const [apiKey, setApiKey] = useState<ApiKey>('')
  const [audioUrl, setAudioUrl] = useState<AudioUrl>(null)
  const [cleanedText, setCleanedText] = useState<CleanedText>('')
  const [gcpKey, setGcpKey] = useState<GcpKey>('')
  const [inputText, setInputText] = useState<InputText>('')
  const [isTransitioning, setIsTransitioning] = useState<IsTransitioning>(false)
  const [maskKey, setMaskKey] = useState<MaskKey>(false)
  const [maskOpenAiKey, setMaskOpenAiKey] = useState<MaskOpenAiKey>(false)
  const [openAiAvgTokens, setOpenAiAvgTokens] = useState<OpenAiAvgTokens>(200)
  const [openAiBudget, setOpenAiBudget] = useState<OpenAiBudget>(1)
  const [openAiKey, setOpenAiKey] = useState<OpenAiKey>('')
  const [openAiUsage, setOpenAiUsage] = useState<OpenAiUsage>(0)
  const [question, setQuestion] = useState<Question>('')
  const [questionContext, setQuestionContext] = useState<QuestionContext>('')
  const [scenario, setScenario] = useState<ScenarioValue>(SCENARIO.RESTAURANT)
  const [ttsAvgChars, setTtsAvgChars] = useState<TtsAvgChars>(80)
  const [ttsBudget, setTtsBudget] = useState<TtsBudget>(1)
  const [ttsCharUsage, setTtsCharUsage] = useState<TtsCharUsage>(0)
  const [useCloudTTS, setUseCloudTTS] = useState<UseCloudTTS>(true)

  const handlePanelSwitch = (newPanel: AppPanelValue) => {
    if (isTransitioning) return
  
    const isHelp = newPanel === APP_PANEL.HELP
    const isSame = newPanel === activePanel
  
    setIsTransitioning(true)
  
    if (isHelp) {
      // Toggle Help Panel on/off without affecting the current panel
      setHelpPanel(prev => (prev === APP_PANEL.HELP ? APP_PANEL.HOME : APP_PANEL.HELP))
      setTimeout(() => setIsTransitioning(false), 300)
      return
    }
  
    // Closing any other panel should also hide Help
    if (isSame) {
      setActivePanel(APP_PANEL.HOME)
      setHelpPanel(APP_PANEL.HOME)
      setTimeout(() => setIsTransitioning(false), 300)
      return
    }
  
    // Switching to new primary panel: reset Help and swap panels
    setActivePanel(APP_PANEL.HOME)
    setHelpPanel(APP_PANEL.HOME)
    setTimeout(() => {
      setActivePanel(newPanel)
      setIsTransitioning(false)
    }, 300)
  }  

  const AppContextValue = {
    activePanel,
    answer,
    apiKey,
    audioUrl,
    cleanedText,
    gcpKey,
    helpPanel,
    inputText,
    maskKey,
    maskOpenAiKey,
    openAiAvgTokens,
    openAiBudget,
    openAiKey,
    openAiUsage,
    question,
    questionContext,
    scenario,
    setActivePanel,
    setAnswer,
    setApiKey,
    setAudioUrl,
    setCleanedText,
    setGcpKey,
    setHelpPanel,
    setInputText,
    setMaskKey,
    setMaskOpenAiKey,
    setOpenAiAvgTokens,
    setOpenAiBudget,
    setOpenAiKey,
    setOpenAiUsage,
    setQuestion,
    setQuestionContext,
    setScenario,
    setTtsAvgChars,
    setTtsBudget,
    setTtsCharUsage,
    setUseCloudTTS,
    switchPanel: handlePanelSwitch,
    ttsAvgChars,
    ttsBudget,
    ttsCharUsage,
    useCloudTTS
  }

  return (
    <AppContext.Provider value={AppContextValue}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('AppContext must be used within AppProvider')
  return ctx
}
