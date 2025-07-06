/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'
import type {
  Answer,
  ApiKey,
  AppContextType,
  ActivePanel,
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
  Scenario,
  IsHelpOpen,
  ActiveHome,
  Lesson,
  Lessons,
  GenerateTTSCount,
  MaxCount,
  Cutoff,
  Language,
  LineNumber,
  DebugMode,
  LessonTimestamp,
  CustomScenario,
  CustomParticipantList,
  CustomSeed,
  LessonPromptStyle,
  UseMyself,
  LessonPrompt,
  ClientUUID,
  ClientMeter,
  ClientSignature,
  ClientEmail,
  LessonNumber,
  FlexLesson,
  FormattedFlexLesson,
  LessonComplete
} from '@cknTypes/types'
import {
  defaultTargetLanguage,
  defaultLesson,
  defaultMaxCount,
  defaultDebugMode,
  defaultCustomScenario,
  defaultCustomParticipantList,
  defaultCustomSeed,
  defaultLessonPromptStyle,
  defaultLessonPrompt,
  defaultFlexLesson,
} from '@cknTypes/types'
import {
  APP_HOME,
  APP_PANEL,
  LANGUAGE,
  LESSON_PROMPT_STYLE,
  MODULE_NAME,
  SCENARIO
} from '@cknTypes/constants'
import { usePersistentState } from '@hooks/usePersistentState'
import { generateExample } from '@shared/generateExample'

const AppContext = createContext<AppContextType | undefined>(undefined)

const defaultExample = {
  dialog: generateExample({lessonPromptStyle: LESSON_PROMPT_STYLE.DIALOG, language: defaultTargetLanguage, moduleName: MODULE_NAME.DIALOG_DRAFT, options: { asString: false }}),
  nouns: generateExample({lessonPromptStyle: LESSON_PROMPT_STYLE.DIALOG, language: defaultTargetLanguage, moduleName: MODULE_NAME.NOUNS_DRAFT, options: { asString: false }}),
  verbs: generateExample({lessonPromptStyle: LESSON_PROMPT_STYLE.DIALOG, language: defaultTargetLanguage, moduleName: MODULE_NAME.VERBS_DRAFT, options: { asString: false }}),
  dialogReview: generateExample({lessonPromptStyle: LESSON_PROMPT_STYLE.DIALOG, language: defaultTargetLanguage, moduleName: MODULE_NAME.DIALOG_REVIEW, options: { asString: false }}),
  nounsReview: generateExample({lessonPromptStyle: LESSON_PROMPT_STYLE.DIALOG, language: defaultTargetLanguage, moduleName: MODULE_NAME.NOUNS_REVIEW, options: { asString: false }}),
  verbsReview: generateExample({lessonPromptStyle: LESSON_PROMPT_STYLE.DIALOG, language: defaultTargetLanguage, moduleName: MODULE_NAME.VERBS_REVIEW, options: { asString: false }})
}

const updatedDefaultLesson = {
  ...defaultLesson,
  dialog: {
    ...defaultLesson.dialogDraft,
    lines: defaultExample.dialog
  },
  nouns: {
    ...defaultLesson.nounsDraft,
    lines: defaultExample.nouns
  },
  verbs: {
    ...defaultLesson.verbsDraft,
    lines: defaultExample.verbs
  },
  dialogReview: {
    ...defaultLesson.dialogReview,
    lines: defaultExample.dialogReview
  },
  nounsReview: {
    ...defaultLesson.nounsReview,
    lines: defaultExample.nounsReview
  },
  verbsReview: {
    ...defaultLesson.verbsReview,
    lines: defaultExample.verbsReview
  }
}

// const generateUUID = (): string =>
//   'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
//     const r = (Math.random() * 16) | 0
//     const v = c === 'x' ? r : (r & 0x3) | 0x8
//     return v.toString(16)
// })

// // cXnsole.log(generateExample({language: defaultTargetLanguage, moduleName: MODULE_NAME.VERBS, options: { asString: false }}))
// cXnsole.log(updatedDefaultLesson)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [generateTTSCount, setGenerateTTSCount] = usePersistentState<GenerateTTSCount>('lessons', 0)
  // const [lessons, setLessons] = usePersistentState<Lessons>('lessons', [])
  const [lessons, setLessons] = usePersistentState<Lessons>(
    'lessons',
    [],
    (val): val is Lessons =>
      Array.isArray(val) &&
    val.every(
      l =>
        typeof l === 'object' &&
      l !== null &&
      typeof l.id === 'string' &&
      typeof l.name === 'string'
    )
  )

  const [activateLessonBar, setActivateLessonBar] = useState<LessonComplete>(false)
  const [lessonComplete, setLessonComplete] = useState<LessonComplete>(false)
  
  const [flexLesson, setFlexLesson] = usePersistentState<FlexLesson>('flexLesson', defaultFlexLesson)
  const [formattedFlexLesson, setFormattedFlexLesson] = usePersistentState<FormattedFlexLesson>('formattedFlexLesson', [])

  const [lessonPromptStyle, setLessonPromptStyle] = usePersistentState<LessonPromptStyle>('lessonPromptStyle', defaultLessonPromptStyle)
  const [customSeed, setCustomSeed] = usePersistentState<CustomSeed>('customSeed', defaultCustomSeed)
  const [customScenario, setCustomScenario] = usePersistentState<CustomScenario>('customScenario', defaultCustomScenario)
  const [customParticipantList, setCustomParticipantList] = usePersistentState<CustomParticipantList>('customParticipantList', defaultCustomParticipantList)

  const [clientEmail, setClientEmail] = usePersistentState<ClientEmail>('clientEmail', 'public@raileyn.net')

  const [clientUUID, setClientUUID] = usePersistentState<ClientUUID>('clientUUID', '')
  const [clientMeter, setClientMeter] = usePersistentState<ClientMeter>('clientMeter', 0)
  const [clientSignature, setClientSignature] = usePersistentState<ClientSignature>('clientSignature', '')

  const [useMyself, setUseMyself] = usePersistentState<UseMyself>('useMyself', true)
  const [debugMode, setDebugMode] = usePersistentState<DebugMode>('debugMode', defaultDebugMode)
  const [lessonTimestamp, setLessonTimestamp] = usePersistentState<LessonTimestamp>('lessonTimestamp', Date.now().toString())
  const [lineNumber, setLineNumber] = useState<LineNumber>(0)
  const [activeHome, setActiveHome] = useState<ActiveHome>(APP_HOME.MDX)
  const [activePanel, setActivePanel] = useState<ActivePanel>(APP_PANEL.MDX)
  const [answer, setAnswer] = useState<Answer>('')
  const [apiKey, setApiKey] = useState<ApiKey>('')
  const [audioUrl, setAudioUrl] = useState<AudioUrl>(null)
  const [cleanedText, setCleanedText] = useState<CleanedText>('')
  const [cutoff, setCutoff] = usePersistentState<Cutoff>('cutoff', false)
  const [gcpKey, setGcpKey] = useState<GcpKey>('')
  const [helpPanel, setHelpPanel] = useState<ActivePanel>(APP_PANEL.BASIC)
  const [inputText, setInputText] = useState<InputText>('')
  const [isHelpOpen, setIsHelpOpen] = useState<IsHelpOpen>(false)
  const [isTransitioning, setIsTransitioning] = useState<IsTransitioning>(false)
  const [lesson, setLesson] = usePersistentState<Lesson>('lesson', updatedDefaultLesson)
  const [maskKey, setMaskKey] = useState<MaskKey>(false)
  const [maskOpenAiKey, setMaskOpenAiKey] = useState<MaskOpenAiKey>(false)
  const [maxCount, setMaxCount] = usePersistentState<MaxCount>('maxCount', defaultMaxCount, (v): v is number => typeof v === 'number')
  const [openAiAvgTokens, setOpenAiAvgTokens] = useState<OpenAiAvgTokens>(200)
  const [openAiBudget, setOpenAiBudget] = useState<OpenAiBudget>(1)
  const [openAiKey, setOpenAiKey] = useState<OpenAiKey>('')
  const [openAiUsage, setOpenAiUsage] = useState<OpenAiUsage>(0)
  const [question, setQuestion] = useState<Question>('')
  const [questionContext, setQuestionContext] = useState<QuestionContext>('')
  const [lessonPrompt, setLessonPrompt] = usePersistentState<LessonPrompt>('lessonPrompt', defaultLessonPrompt)
  const [scenario, setScenario] = usePersistentState<Scenario>('scenario', SCENARIO.RESTAURANT)
  const [selectedLessonNumber, setSelectedLessonNumber] = usePersistentState<LessonNumber>('lessonNumber', 1)
  const [ttsAvgChars, setTtsAvgChars] = useState<TtsAvgChars>(80)
  const [ttsBudget, setTtsBudget] = useState<TtsBudget>(1)
  const [ttsCharUsage, setTtsCharUsage] = useState<TtsCharUsage>(0)
  const [useCloudTTS, setUseCloudTTS] = useState<UseCloudTTS>(true)

  const [targetLanguage, setTargetLanguage] = usePersistentState<Language>('targetLanguage', LANGUAGE.SPANISH)
  const [sourceLanguage, setSourceLanguage] = usePersistentState<Language>('sourceLanguage', LANGUAGE.ENGLISH)

  // useEffect(() => {
  //   if (!clientUUID) {
  //     const newUUID = generateUUID()
  //     setClientUUID(newUUID)
  //   }
  // }, [clientUUID, setClientUUID])

  const AppContextValue = {
    activeHome,
    activePanel,
    activateLessonBar,
    answer,
    apiKey,
    audioUrl,
    cleanedText,
    clientEmail,
    clientMeter,
    clientSignature,
    clientUUID,
    lessonPromptStyle,
    customParticipantList,
    customScenario,
    customSeed,
    cutoff,
    debugMode,
    flexLesson,
    formattedFlexLesson,
    gcpKey,
    generateTTSCount,
    helpPanel,
    inputText,
    isHelpOpen,
    isTransitioning,
    lesson,
    lessons,
    lessonComplete,
    lessonPrompt,
    lessonTimestamp,
    lineNumber,
    maskKey,
    maskOpenAiKey,
    maxCount,
    openAiAvgTokens,
    openAiBudget,
    openAiKey,
    openAiUsage,
    question,
    questionContext,
    scenario,
    selectedLessonNumber,
    setActiveHome,
    setActivePanel,
    setActivateLessonBar,    
    setAnswer,
    setApiKey,
    setAudioUrl,
    setCleanedText,
    setClientEmail,
    setClientMeter,
    setClientSignature,
    setClientUUID,
    setLessonPromptStyle,
    setCustomParticipantList,
    setCustomScenario,
    setCustomSeed,
    setCutoff,
    setDebugMode,
    setFlexLesson,
    setFormattedFlexLesson,
    setGcpKey,
    setGenerateTTSCount,
    setHelpPanel,
    setInputText,
    setIsHelpOpen,
    setIsTransitioning,
    setLesson,
    setLessons,
    setLessonComplete,
    setLessonPrompt,
    setLessonTimestamp,
    setLineNumber,
    setMaskKey,
    setMaskOpenAiKey,
    setMaxCount,
    setOpenAiAvgTokens,
    setOpenAiBudget,
    setOpenAiKey,
    setOpenAiUsage,
    setQuestion,
    setQuestionContext,
    setScenario,
    setSelectedLessonNumber,
    setSourceLanguage,
    setTargetLanguage,
    setTtsAvgChars,
    setTtsBudget,
    setTtsCharUsage,
    setUseCloudTTS,
    setUseMyself,
    sourceLanguage,
    targetLanguage,
    ttsAvgChars,
    ttsBudget,
    ttsCharUsage,
    useCloudTTS,
    useMyself
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
