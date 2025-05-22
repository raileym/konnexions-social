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
  ScenarioValue,
  IsHelpOpen,
  AppHomeValue,
  AnswerKeep,
  QuestionKeep,
  DialogKeep,
  StepResult,
  NounsKeep,
  HandleNounsErrors,
  HandleDialogErrors,
  HandleVerbsErrors,
  VerbsKeep
} from '../cknTypes/types/types'
import {
  APP_HOME,
  APP_PANEL,
  defaultStepResult,
  SCENARIO
} from '../cknTypes/types/types'

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePanel, setActivePanel] = useState<AppPanelValue>(APP_PANEL.BASIC)
  const [activeHome, setActiveHome] = useState<AppHomeValue>(APP_HOME.GEN_AI_PRO)
  const [helpPanel, setHelpPanel] = useState<AppPanelValue>(APP_PANEL.BASIC)
  const [answer, setAnswer] = useState<Answer>('')
  const [answerKeep, setAnswerKeep] = useState<AnswerKeep>('')
  const [stepResult, setStepResult] = useState<StepResult>(defaultStepResult)
  const [dialogKeep, setDialogKeep] = useState<DialogKeep>('')
  const [verbsKeep, setVerbsKeep] = useState<VerbsKeep>('')
  const [nounsKeep, setNounsKeep] = useState<NounsKeep>('')
  const [handleDialogErrors, setHandleDialogErrors] = useState<HandleDialogErrors>([])
  const [handleNounsErrors, setHandleNounsErrors] = useState<HandleNounsErrors>([])
  const [handleVerbsErrors, setHandleVerbsErrors] = useState<HandleVerbsErrors>([])
  const [apiKey, setApiKey] = useState<ApiKey>('')
  const [isHelpOpen, setIsHelpOpen] = useState<IsHelpOpen>(false)
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
  const [questionKeep, setQuestionKeep] = useState<QuestionKeep>('')
  const [scenario, setScenario] = useState<ScenarioValue>(SCENARIO.RESTAURANT)
  const [ttsAvgChars, setTtsAvgChars] = useState<TtsAvgChars>(80)
  const [ttsBudget, setTtsBudget] = useState<TtsBudget>(1)
  const [ttsCharUsage, setTtsCharUsage] = useState<TtsCharUsage>(0)
  const [useCloudTTS, setUseCloudTTS] = useState<UseCloudTTS>(true)

  const AppContextValue = {
    activeHome,
    activePanel,
    answer,
    answerKeep,
    apiKey,
    audioUrl,
    cleanedText,
    dialogKeep,
    gcpKey,
    handleDialogErrors,
    handleNounsErrors,
    handleVerbsErrors,
    helpPanel,
    inputText,
    isHelpOpen,
    isTransitioning,
    maskKey,
    maskOpenAiKey,
    nounsKeep,
    openAiAvgTokens,
    openAiBudget,
    openAiKey,
    openAiUsage,
    question,
    questionContext,
    questionKeep,
    scenario,
    setActiveHome,
    setActivePanel,
    setAnswer,
    setAnswerKeep,
    setApiKey,
    setAudioUrl,
    setCleanedText,
    setDialogKeep,
    setGcpKey,
    setHandleDialogErrors,
    setHandleNounsErrors,
    setHandleVerbsErrors,
    setHelpPanel,
    setInputText,
    setIsHelpOpen,
    setIsTransitioning,
    setMaskKey,
    setMaskOpenAiKey,
    setNounsKeep,
    setOpenAiAvgTokens,
    setOpenAiBudget,
    setOpenAiKey,
    setOpenAiUsage,
    setQuestion,
    setQuestionContext,
    setQuestionKeep,
    setScenario,
    setStepResult,
    setTtsAvgChars,
    setTtsBudget,
    setTtsCharUsage,
    setUseCloudTTS,
    setVerbsKeep,
    stepResult,
    ttsAvgChars,
    ttsBudget,
    ttsCharUsage,
    useCloudTTS,
    verbsKeep
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
