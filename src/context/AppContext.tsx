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
  UseCloudTTS
} from '../cknTypes/types/types'
import {
  APP_PANEL
} from '../cknTypes/types/types'

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePanel, setActivePanel] = useState<AppPanelValue>(APP_PANEL.HOME)

  const [gcpKey, setGcpKey] = useState<GcpKey>('')
  const [isTransitioning, setIsTransitioning] = useState<IsTransitioning>(false)

  const [useCloudTTS, setUseCloudTTS] = useState<UseCloudTTS>(true)
  const [inputText, setInputText] = useState<InputText>('')
  const [cleanedText, setCleanedText] = useState<CleanedText>('')
  const [audioUrl, setAudioUrl] = useState<AudioUrl>(null)
  const [apiKey, setApiKey] = useState<ApiKey>('')
  const [maskKey, setMaskKey] = useState<MaskKey>(false)

  const [openAiKey, setOpenAiKey] = useState<OpenAiKey>('')
  const [maskOpenAiKey, setMaskOpenAiKey] = useState<MaskOpenAiKey>(false)
  const [question, setQuestion] = useState<Question>('')
  const [questionContext, setQuestionContext] = useState<QuestionContext>('')
  const [answer, setAnswer] = useState<Answer>('')
  const [openAiUsage, setOpenAiUsage] = useState<OpenAiUsage>(0)
  const [ttsCharUsage, setTtsCharUsage] = useState<TtsCharUsage>(0)

  const [openAiBudget, setOpenAiBudget] = useState<OpenAiBudget>(1)
  const [openAiAvgTokens, setOpenAiAvgTokens] = useState<OpenAiAvgTokens>(200)
  const [ttsBudget, setTtsBudget] = useState<TtsBudget>(1)
  const [ttsAvgChars, setTtsAvgChars] = useState<TtsAvgChars>(80)

  const handlePanelSwitch = (newPanel: AppPanelValue) => {
    if (isTransitioning) return
  
    if (newPanel === activePanel) {
      setIsTransitioning(true)

      setActivePanel(APP_PANEL.HOME)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    } else {
      setIsTransitioning(true)
    
      setActivePanel(APP_PANEL.HOME)
    
      setTimeout(() => {
        setActivePanel(newPanel)
        setIsTransitioning(false)
      }, 600) // match your CSS transition duration
    }
  }

  const AppContextValue = {
    activePanel,
    answer,
    apiKey,
    audioUrl,
    cleanedText,
    gcpKey,
    inputText,
    maskKey,
    maskOpenAiKey,
    openAiAvgTokens,
    openAiBudget,
    openAiKey,
    openAiUsage,
    question,
    questionContext,
    setActivePanel,
    setAnswer,
    setApiKey,
    setAudioUrl,
    setCleanedText,
    setGcpKey,
    setInputText,
    setMaskKey,
    setMaskOpenAiKey,
    setOpenAiAvgTokens,
    setOpenAiBudget,
    setOpenAiKey,
    setOpenAiUsage,
    setQuestion,
    setQuestionContext,
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
