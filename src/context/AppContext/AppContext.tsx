/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type FC } from 'react'
import About from '@mdxPages/About.mdx'
import Welcome from '@mdxPages/Welcome.mdx'
import FAQ from '@mdxPages/FAQ.mdx'
import One from '@mdxPages/One.mdx'
import Two from '@mdxPages/Two.mdx'
import Three from '@mdxPages/Three.mdx'
import WelcomeLearnSpanish from '@mdxPages/WelcomeLearnSpanish.mdx'
import type {
  Answer,
  ApiKey,
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
  LessonComplete,
  CookedEmail,
  VerificationToken,
  IsUserValidated,
  UserData,
  IsProfileOpen,
  ShowIsUserValidatedModal,
  ModalConfig,
  LessonName,
  ActivateLessonBar,
  HelpPanel,
  IsMenuOpen,
  SetActivateLessonBar,
  SetActiveHome,
  SetActivePanel,
  SetAnswer,
  SetApiKey,
  SetAudioUrl,
  SetCleanedText,
  SetClientEmail,
  SetClientMeter,
  SetClientSignature,
  SetClientUUID,
  SetCookedEmail,
  SetCustomParticipantList,
  SetCustomScenario,
  SetCustomSeed,
  SetCutoff,
  SetDebugMode,
  SetFlexLesson,
  SetFormattedFlexLesson,
  SetGcpKey,
  SetGenerateTTSCount,
  SetHelpPanel,
  SetInputText,
  SetIsHelpOpen,
  SetIsMenuOpen,
  SetIsProfileOpen,
  SetIsTransitioning,
  SetIsUserValidated,
  SetLesson,
  SetLessonComplete,
  SetLessonName,
  SetLessonNumber,
  SetLessonPrompt,
  SetLessonPromptStyle,
  SetLessons,
  SetLessonTimestamp,
  SetLineNumber,
  SetMaskKey,
  SetMaskOpenAiKey,
  SetMaxCount,
  SetOpenAiAvgTokens,
  SetOpenAiBudget,
  SetOpenAiKey,
  SetOpenAiUsage,
  SetQuestion,
  SetQuestionContext,
  SetScenario,
  SetShowIsUserValidatedModal,
  SetSourceLanguage,
  SetTargetLanguage,
  SetTtsAvgChars,
  SetTtsBudget,
  SetTtsCharUsage,
  SetUseCloudTTS,
  SetUseMyself,
  SetUserData,
  SetVerificationToken,
  MdxPagesMap
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
  defaultUserData,
  defaultLessonName,
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

export type AppContextType = {
  isModalVisible: boolean
  modalConfig: ModalConfig | null
  showModal: (config: ModalConfig) => void
  hideModal: () => void,

  activateLessonBar: ActivateLessonBar
  activeHome: ActiveHome
  activePanel: ActivePanel
  answer: Answer
  apiKey: ApiKey
  audioUrl: AudioUrl
  cleanedText: CleanedText
  clientEmail: ClientEmail
  clientMeter: ClientMeter
  clientSignature: ClientSignature
  clientUUID: ClientUUID
  cookedEmail: CookedEmail
  customParticipantList: CustomParticipantList
  customScenario: CustomScenario
  customSeed: CustomSeed
  cutoff: Cutoff
  debugMode: DebugMode
  flexLesson: FlexLesson
  formattedFlexLesson: FormattedFlexLesson
  gcpKey: GcpKey
  generateTTSCount: GenerateTTSCount
  helpPanel: HelpPanel
  inputText: InputText
  isHelpOpen: IsHelpOpen
  isMenuOpen: IsMenuOpen
  isProfileOpen: IsProfileOpen
  isTransitioning: IsTransitioning
  isUserValidated: IsUserValidated
  lesson: Lesson
  lessonComplete: LessonComplete
  lessonName: LessonName
  lessonPrompt: LessonPrompt
  lessonPromptStyle: LessonPromptStyle
  lessonTimestamp: LessonTimestamp
  lessons: Lessons
  lineNumber: LineNumber
  maskKey: MaskKey
  maskOpenAiKey: MaskOpenAiKey
  maxCount: MaxCount
  mdxPage: MdxPage
  mdxPagesMap: MdxPagesMap
  openAiAvgTokens: OpenAiAvgTokens
  openAiBudget: OpenAiBudget
  openAiKey: OpenAiKey
  openAiUsage: OpenAiUsage
  question: Question
  questionContext: QuestionContext
  scenario: Scenario
  selectedLessonNumber: LessonNumber
  setActivateLessonBar: SetActivateLessonBar
  setActiveHome: SetActiveHome
  setActivePanel: SetActivePanel
  setAnswer: SetAnswer
  setApiKey: SetApiKey
  setAudioUrl: SetAudioUrl
  setCleanedText: SetCleanedText
  setClientEmail: SetClientEmail
  setClientMeter: SetClientMeter
  setClientSignature: SetClientSignature
  setClientUUID: SetClientUUID
  setCookedEmail: SetCookedEmail
  setCustomParticipantList: SetCustomParticipantList
  setCustomScenario: SetCustomScenario
  setCustomSeed: SetCustomSeed
  setCutoff: SetCutoff
  setDebugMode: SetDebugMode
  setFlexLesson: SetFlexLesson
  setFormattedFlexLesson: SetFormattedFlexLesson
  setGcpKey: SetGcpKey
  setGenerateTTSCount: SetGenerateTTSCount
  setHelpPanel: SetHelpPanel
  setInputText: SetInputText
  setIsHelpOpen: SetIsHelpOpen
  setIsMenuOpen: SetIsMenuOpen
  setIsProfileOpen: SetIsProfileOpen
  setIsTransitioning: SetIsTransitioning
  setIsUserValidated: SetIsUserValidated
  setLesson: SetLesson
  setLessonComplete: SetLessonComplete
  setLessonName: SetLessonName
  setLessonPrompt: SetLessonPrompt
  setLessonPromptStyle: SetLessonPromptStyle
  setLessonTimestamp: SetLessonTimestamp
  setLessons: SetLessons
  setLineNumber: SetLineNumber
  setMaskKey: SetMaskKey
  setMaskOpenAiKey: SetMaskOpenAiKey
  setMaxCount: SetMaxCount
  setMdxPage: SetMdxPage
  setOpenAiAvgTokens: SetOpenAiAvgTokens
  setOpenAiBudget: SetOpenAiBudget
  setOpenAiKey: SetOpenAiKey
  setOpenAiUsage: SetOpenAiUsage
  setQuestion: SetQuestion
  setQuestionContext: SetQuestionContext
  setScenario: SetScenario
  setSelectedLessonNumber: SetLessonNumber
  setSourceLanguage: SetSourceLanguage
  setTargetLanguage: SetTargetLanguage
  setTtsAvgChars: SetTtsAvgChars
  setTtsBudget: SetTtsBudget
  setTtsCharUsage: SetTtsCharUsage
  setUseCloudTTS: SetUseCloudTTS
  setUseMyself: SetUseMyself
  setUserData: SetUserData
  setVerificationToken: SetVerificationToken
  setShowIsUserValidatedModal: SetShowIsUserValidatedModal
  showIsUserValidatedModal: ShowIsUserValidatedModal
  sourceLanguage: Language
  targetLanguage: Language
  ttsAvgChars: TtsAvgChars
  ttsBudget: TtsBudget
  ttsCharUsage: TtsCharUsage
  useCloudTTS: UseCloudTTS
  useMyself: UseMyself
  verificationToken: VerificationToken
  userData: UserData
}

// const generateUUID = (): string =>
//   'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
//     const r = (Math.random() * 16) | 0
//     const v = c === 'x' ? r : (r & 0x3) | 0x8
//     return v.toString(16)
// })

// // cXnsole.log(generateExample({language: defaultTargetLanguage, moduleName: MODULE_NAME.VERBS, options: { asString: false }}))
// cXnsole.log(updatedDefaultLesson)

export const mdxPagesMap: MdxPagesMap = {
  Welcome: Welcome,
  About: About,
  FAQ: FAQ,
  One: One,
  Two: Two,
  Three: Three,
  WelcomeLearnSpanish: WelcomeLearnSpanish
}

export type MdxPage = keyof typeof mdxPagesMap
export type SetMdxPage = React.Dispatch<React.SetStateAction<MdxPage>>
export type MdxPagesMap = Record<string, FC>

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null)

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

  const [lessonName, setLessonName] = usePersistentState<LessonName>('lessonName', defaultLessonName)
  const [mdxPage, setMdxPage] = useState<MdxPage>('Welcome')

  const [showIsUserValidatedModal, setShowIsUserValidatedModal] = useState<ShowIsUserValidatedModal>(false)
  const [isHelpOpen, setIsHelpOpen] = useState<IsHelpOpen>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<IsHelpOpen>(false)
  const [isProfileOpen, setIsProfileOpen] = useState<IsProfileOpen>(false)

  const [userData, setUserData] = usePersistentState<UserData>('userData', defaultUserData)
  const [isUserValidated, setIsUserValidated] = useState<IsUserValidated>(false)
  const [cookedEmail, setCookedEmail] = usePersistentState<CookedEmail>('cookedEmail', '')
  const [verificationToken, setVerificationToken] = usePersistentState<VerificationToken>('verificationToken', '')

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

  const showModal = (config: ModalConfig) => {
    setModalConfig(config)
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
    setModalConfig(null)
  }

  const AppContextValue = {
    isModalVisible,
    modalConfig,
    showModal,
    hideModal,

    mdxPagesMap,

    activateLessonBar,
    activeHome,
    activePanel,
    answer,
    apiKey,
    audioUrl,
    cleanedText,
    clientEmail,
    clientMeter,
    clientSignature,
    clientUUID,
    cookedEmail,
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
    isMenuOpen,
    isProfileOpen,
    isTransitioning,
    isUserValidated,
    lesson,
    lessonComplete,
    lessonName,
    lessonPrompt,
    lessonPromptStyle,
    lessonTimestamp,
    lessons,
    lineNumber,
    maskKey,
    maskOpenAiKey,
    maxCount,
    mdxPage,
    openAiAvgTokens,
    openAiBudget,
    openAiKey,
    openAiUsage,
    question,
    questionContext,
    scenario,
    selectedLessonNumber,
    setActivateLessonBar,    
    setActiveHome,
    setActivePanel,
    setAnswer,
    setApiKey,
    setAudioUrl,
    setCleanedText,
    setClientEmail,
    setClientMeter,
    setClientSignature,
    setClientUUID,
    setCookedEmail,
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
    setIsMenuOpen,
    setIsProfileOpen,
    setIsTransitioning,
    setIsUserValidated,
    setLesson,
    setLessonComplete,
    setLessonName,
    setLessonPrompt,
    setLessonPromptStyle,
    setLessonTimestamp,
    setLessons,
    setLineNumber,
    setMaskKey,
    setMaskOpenAiKey,
    setMaxCount,
    setMdxPage,
    setOpenAiAvgTokens,
    setOpenAiBudget,
    setOpenAiKey,
    setOpenAiUsage,
    setQuestion,
    setQuestionContext,
    setScenario,
    setSelectedLessonNumber,
    setShowIsUserValidatedModal,
    setSourceLanguage,
    setTargetLanguage,
    setTtsAvgChars,
    setTtsBudget,
    setTtsCharUsage,
    setUseCloudTTS,
    setUseMyself,
    setUserData,
    setVerificationToken,
    showIsUserValidatedModal,
    sourceLanguage,
    targetLanguage,
    ttsAvgChars,
    ttsBudget,
    ttsCharUsage,
    useCloudTTS,
    useMyself,
    verificationToken,
    userData
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
