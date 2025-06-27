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
  Language,
  LineNumber,
  DebugMode,
  LessonTimestamp,
  CustomScenario,
  CustomParticipants,
  CustomSeed,
  LessonPromptStyle,
  UseMyself,
  LessonPrompt
} from '@cknTypes/types'
import {
  defaultTargetLanguage,
  defaultLesson,
  defaultMaxCount,
  defaultScenarioData,
  defaultDebugMode,
  defaultCustomScenario,
  defaultCustomParticipants,
  defaultCustomSeed,
  defaultLessonPromptStyle,
  defaultLessonPrompt,
} from '@cknTypes/types'
import {
  APP_HOME,
  APP_PANEL,
  LANGUAGE,
  MODULE_NAME,
  SCENARIO
} from '@cknTypes/constants'
import { usePersistentState } from '@hooks/usePersistentState'
import { generateExample } from '@shared/generateExample'
import { handleGetScenarioData } from './AppContextComponents/handleGetScenarioData/handleGetScenarioData'

const AppContext = createContext<AppContextType | undefined>(undefined)

const defaultExample = {
  dialog: generateExample({language: defaultTargetLanguage, moduleName: MODULE_NAME.DIALOG_DRAFT, options: { asString: false }}),
  nouns: generateExample({language: defaultTargetLanguage, moduleName: MODULE_NAME.NOUNS_DRAFT, options: { asString: false }}),
  verbs: generateExample({language: defaultTargetLanguage, moduleName: MODULE_NAME.VERBS_DRAFT, options: { asString: false }}),
  dialogReview: generateExample({language: defaultTargetLanguage, moduleName: MODULE_NAME.DIALOG_REVIEW, options: { asString: false }}),
  nounsReview: generateExample({language: defaultTargetLanguage, moduleName: MODULE_NAME.NOUNS_REVIEW, options: { asString: false }}),
  verbsReview: generateExample({language: defaultTargetLanguage, moduleName: MODULE_NAME.VERBS_REVIEW, options: { asString: false }})
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
      typeof l.id === 'number' &&
      typeof l.name === 'string'
    )
  )

  const [lessonPromptStyle, setLessonPromptStyle] = usePersistentState<LessonPromptStyle>('lessonPromptStyle', defaultLessonPromptStyle)
  const [customSeed, setCustomSeed] = usePersistentState<CustomSeed>('customSeed', defaultCustomSeed)
  const [customScenario, setCustomScenario] = usePersistentState<CustomScenario>('customScenario', defaultCustomScenario)
  const [customParticipants, setCustomParticipants] = usePersistentState<CustomParticipants>('customParticipants', defaultCustomParticipants)

  const [useMyself, setUseMyself] = usePersistentState<UseMyself>('useMyself', true)
  const [debugMode, setDebugMode] = usePersistentState<DebugMode>('debugMode', defaultDebugMode)
  const [lessonTimestamp, setLessonTimestamp] = usePersistentState<LessonTimestamp>('lessonTimestamp', Date.now())
  const [lineNumber, setLineNumber] = useState<LineNumber>(0)
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
  const [lessonPrompt, setLessonPrompt] = usePersistentState<LessonPrompt>('lessonPrompt', defaultLessonPrompt)
  const [scenario, setScenario] = usePersistentState<Scenario>('scenario', SCENARIO.RESTAURANT)
  const [scenarioData, setScenarioData] = useState<ScenarioData>(defaultScenarioData)
  const [selectedLessonId, setSelectedLessonId] = usePersistentState<LessonId>('lessonCount', 1)
  const [ttsAvgChars, setTtsAvgChars] = useState<TtsAvgChars>(80)
  const [ttsBudget, setTtsBudget] = useState<TtsBudget>(1)
  const [ttsCharUsage, setTtsCharUsage] = useState<TtsCharUsage>(0)
  const [useCloudTTS, setUseCloudTTS] = useState<UseCloudTTS>(true)

  const [targetLanguage, setTargetLanguage] = usePersistentState<Language>('targetLanguage', LANGUAGE.SPANISH)
  const [sourceLanguage, setSourceLanguage] = usePersistentState<Language>('sourceLanguage', LANGUAGE.ENGLISH)

useEffect(() => {
  // cXonsole.log('useEffect', scenario)
  async function fetchScenarioData() {
    // cXonsole.log('fetchScenarioData', scenario)
    const data = await handleGetScenarioData({scenario, language: targetLanguage})
    if (!data) {
      console.log('fetchScenarioData', 'no data returned')
      return
    }

    // cXonsole.log('fetchScenarioData', JSON.stringify(data, null, 2))

    const nounBySingular = new Map()
    const nounByPlural = new Map()
    const singularNounList: string[] = []

    // cXonsole.log('data',data)

    for (const noun of data.nouns) {
      nounBySingular.set(noun.noun_singular, noun)
      nounByPlural.set(noun.noun_plural, noun)
      singularNounList.push(noun.noun_singular)
    }

    const verbByInfinitive = new Map()
    const verbBy1stPersonSingular = new Map()
    const verbBy2ndPersonSingular = new Map()
    const verbBy3rdPersonSingular = new Map()
    const verbBy1stPersonPlural = new Map()
    const verbBy2ndPersonPlural = new Map()
    const verbBy3rdPersonPlural = new Map()
    for (const verb of data.verbs) {
      verbByInfinitive.set(verb.verb_infinitive, verb)
      verbBy1stPersonSingular.set(verb.verb_yo, verb)
      verbBy2ndPersonSingular.set(verb.verb_tu, verb)
      verbBy3rdPersonSingular.set(verb.verb_el_ella_usted, verb)
      verbBy1stPersonPlural.set(verb.verb_nosotros, verb)
      verbBy2ndPersonPlural.set(verb.verb_vosotros, verb)
      verbBy3rdPersonPlural.set(verb.verb_ellos_ellas_ustedes, verb)
    }

    const N = 2

    setScenarioData({
      ...data,
      nounsChooseN: data.nouns.sort(() => 0.5 - Math.random()).slice(0, N),
      nounBySingular,
      nounByPlural,
      singularNounList,
      verbByInfinitive,
      verbBy1stPersonSingular,
      verbBy2ndPersonSingular,
      verbBy3rdPersonSingular,
      verbBy1stPersonPlural,
      verbBy2ndPersonPlural,
      verbBy3rdPersonPlural
    })
  }

  fetchScenarioData()
}, [scenario, targetLanguage, lessons])


const AppContextValue = {
    activeHome,
    activePanel,
    answer,
    apiKey,
    audioUrl,
    cleanedText,
    lessonPromptStyle,
    customParticipants,
    customScenario,
    customSeed,
    cutoff,
    debugMode,
    gcpKey,
    generateTTSCount,
    helpPanel,
    inputText,
    isHelpOpen,
    isTransitioning,
    lesson,
    lessons,
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
    scenarioData,
    selectedLessonId,
    setActiveHome,
    setActivePanel,
    setAnswer,
    setApiKey,
    setAudioUrl,
    setCleanedText,
    setLessonPromptStyle,
    setCustomParticipants,
    setCustomScenario,
    setCustomSeed,
    setCutoff,
    setDebugMode,
    setGcpKey,
    setGenerateTTSCount,
    setHelpPanel,
    setInputText,
    setIsHelpOpen,
    setIsTransitioning,
    setLesson,
    setLessons,
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
    setScenarioData,
    setSelectedLessonId,
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
