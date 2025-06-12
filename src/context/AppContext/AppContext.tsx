/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
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
  LessonId,
  GenerateTTSCount,
  MaxCount,
  Cutoff,
  ScenarioData,
  Language
} from '../../../shared/types'
import {
  APP_HOME,
  APP_PANEL,
  defaultLanguage,
  defaultLesson,
  defaultMaxCount,
  defaultScenarioData,
  LANGUAGE,
  MODULE_NAME,
  SCENARIO
} from '../../../shared/types'
import { usePersistentState } from '../../hooks/usePersistentState'
import { generateExample } from '../../../shared/generateExample'
import { handleGetScenarioData } from './AppContextComponents/handleGetScenarioData/handleGetScenarioData'

const AppContext = createContext<AppContextType | undefined>(undefined)

const defaultExample = {
  dialog: generateExample({language: defaultLanguage, moduleName: MODULE_NAME.DIALOG, options: { asString: false }}),
  nouns: generateExample({language: defaultLanguage, moduleName: MODULE_NAME.NOUNS, options: { asString: false }}),
  verbs: generateExample({language: defaultLanguage, moduleName: MODULE_NAME.VERBS, options: { asString: false }}),
  dialogReview: generateExample({language: defaultLanguage, moduleName: MODULE_NAME.DIALOG_REVIEW, options: { asString: false }}),
  nounsReview: generateExample({language: defaultLanguage, moduleName: MODULE_NAME.NOUNS_REVIEW, options: { asString: false }}),
  verbsReview: generateExample({language: defaultLanguage, moduleName: MODULE_NAME.VERBS_REVIEW, options: { asString: false }})
}

const updatedDefaultLesson = {
  ...defaultLesson,
  dialog: {
    ...defaultLesson.dialog,
    lines: defaultExample.dialog
  },
  nouns: {
    ...defaultLesson.nouns,
    lines: defaultExample.nouns
  },
  verbs: {
    ...defaultLesson.verbs,
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

// // cXnsole.log(generateExample({language: defaultLanguage, moduleName: MODULE_NAME.VERBS, options: { asString: false }}))
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
      typeof l.id === 'number' &&
      typeof l.name === 'string'
    )
  )  
  const [activeHome, setActiveHome] = useState<ActiveHome>(APP_HOME.GEN_AI_PRO)
  const [activePanel, setActivePanel] = useState<ActivePanel>(APP_PANEL.BASIC)
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
  const [scenario, setScenario] = usePersistentState<Scenario>('scenario', SCENARIO.RESTAURANT)
  const [scenarioData, setScenarioData] = useState<ScenarioData>(defaultScenarioData)
  const [selectedLessonId, setSelectedLessonId] = usePersistentState<LessonId>('lessonCount', 1)
  const [ttsAvgChars, setTtsAvgChars] = useState<TtsAvgChars>(80)
  const [ttsBudget, setTtsBudget] = useState<TtsBudget>(1)
  const [ttsCharUsage, setTtsCharUsage] = useState<TtsCharUsage>(0)
  const [useCloudTTS, setUseCloudTTS] = useState<UseCloudTTS>(true)

  const [language, setLanguage] = usePersistentState<Language>('language', LANGUAGE.ENGLISH)
  // export type ScenarioData = {
  //   nouns: NounDetails[]
  //   verbs: VerbDetails[]
  //   nounBySingular: Map<string, NounDetails>
  //   nounByPlural: Map<string, NounDetails>
  //   singularNounList: string[]
  //   verbByInfinitive: Map<string, VerbDetails>
  // }
  
useEffect(() => {
  console.log('useEffect', scenario)
  async function fetchScenarioData() {
    console.log('fetchScenarioData', scenario)
    const data = await handleGetScenarioData({scenario, language})
    if (!data) {
      console.log('fetchScenarioData', 'no data returned')
      return
    }

    console.log('fetchScenarioData', JSON.stringify(data, null, 2))

    const nounBySingular = new Map()
    const nounByPlural = new Map()
    const singularNounList: string[] = []

    for (const noun of data.nouns) {
      nounBySingular.set(noun.noun_singular, noun)
      nounByPlural.set(noun.noun_plural, noun)
      singularNounList.push(noun.noun_singular)
    }

    const verbByInfinitive = new Map()
    for (const verb of data.verbs) {
      verbByInfinitive.set(verb.verb_infinitive, verb)
    }

    setScenarioData({
      ...data,
      nounBySingular,
      nounByPlural,
      singularNounList,
      verbByInfinitive
    })
  }

  fetchScenarioData()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [scenario, language])


const AppContextValue = {
    activeHome,
    activePanel,
    answer,
    apiKey,
    audioUrl,
    cleanedText,
    cutoff,
    gcpKey,
    generateTTSCount,
    helpPanel,
    inputText,
    isHelpOpen,
    isTransitioning,
    language,
    lesson,
    lessons, setLessons,
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
    scenarioData,
    selectedLessonId,
    setActiveHome,
    setActivePanel,
    setAnswer,
    setApiKey,
    setAudioUrl,
    setCleanedText,
    setCutoff,
    setGcpKey,
    setGenerateTTSCount,
    setHelpPanel,
    setInputText,
    setIsHelpOpen,
    setIsTransitioning,
    setLanguage,
    setLesson,
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
    setScenarioData,
    setSelectedLessonId,
    setTtsAvgChars,
    setTtsBudget,
    setTtsCharUsage,
    setUseCloudTTS,
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
