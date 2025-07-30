/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type FC } from 'react'
import About from '@mdxPages/About.mdx'
import Welcome from '@mdxPages/Welcome.mdx'
import FAQ from '@mdxPages/FAQ.mdx'
import WelcomeLearnSpanish from '@mdxPages/WelcomeLearnSpanish.mdx'
import TermsAndConditions from '@mdxPages/TermsAndConditions.mdx'
import PrivacyPolicy from '@mdxPages/PrivacyPolicy.mdx'
import Classes from '@mdxPages/Classes.mdx'

import type {
  ActivateLessonBar,
  ActiveHome,
  ActivePanel,
  Answer,
  ApiKey,
  AudioUrl,
  BaseFontSize,
  CleanedText,
  ClientEmail,
  ClientMeter,
  ClientSignature,
  ClientUUID,
  CookedEmail,
  CustomParticipantList,
  CustomScenario,
  CustomSeed,
  Cutoff,
  DebugMode,
  EngageSpanish,
  FlexLesson,
  FormattedFlexLesson,
  GcpKey,
  GenerateTTSCount,
  HelpPanel,
  InputText,
  IsSelectedCreate,
  IsTransitioning,
  IsUserValidated,
  Language,
  Lesson,
  LessonComplete,
  LessonName,
  LessonNumber,
  LessonPrompt,
  LessonPromptStyle,
  LessonTimestamp,
  Lessons,
  LineNumber,
  MaskKey,
  MaskOpenAiKey,
  MaxCount,
  MdxPage,
  ModalConfig,
  OpenAiAvgTokens,
  OpenAiBudget,
  OpenAiKey,
  OpenAiUsage,
  Paywall,
  Question,
  QuestionContext,
  Scenario,
  SetActivateLessonBar,
  SetActiveHome,
  SetActivePanel,
  SetAnswer,
  SetApiKey,
  SetAudioUrl,
  SetBaseFontSize,
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
  SetEngageSpanish,
  SetFlexLesson,
  SetFormattedFlexLesson,
  SetGcpKey,
  SetGenerateTTSCount,
  SetHelpPanel,
  SetInputText,
  SetIsSelectedCreate,
  SetIsTransitioning,
  SetIsUserValidated,
  SetLesson,
  SetLessonComplete,
  SetLessonName,
  SetLessonNumber,
  SetLessonPrompt,
  SetLessonPromptStyle,
  SetLessonTimestamp,
  SetLessons,
  SetLineNumber,
  SetMaskKey,
  SetMaskOpenAiKey,
  SetMaxCount,
  SetOpenAiAvgTokens,
  SetOpenAiBudget,
  SetOpenAiKey,
  SetOpenAiUsage,
  SetPaywall,
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
  ShowIsUserValidatedModal,
  TtsAvgChars,
  TtsBudget,
  TtsCharUsage,
  UseCloudTTS,
  UseMyself,
  UserData,
  VerificationToken,
  ScreenState,
  SetScreenState,
  IsProfileOpen,
  SetIsProfileOpen,
  IsSettingsOpen,
  SetIsSettingsOpen,
  IsMenuOpen,
  SetIsMenuOpen,
  IsNavbarTopOpen,
  SetIsNavbarTopOpen,
  IsHelpOpen,
  SetIsHelpOpen
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
  defaultPaywall,
  defaultScreenState,
} from '@cknTypes/types'
import {
  ACTIVE_HOME,
  ACTIVE_PANEL,
  LANGUAGE,
  LESSON_PROMPT_STYLE,
  MDX_PAGE,
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
  activateLessonBar: ActivateLessonBar
  activeHome: ActiveHome
  activePanel: ActivePanel
  answer: Answer
  apiKey: ApiKey
  audioUrl: AudioUrl
  baseFontSize: BaseFontSize
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
  engageSpanish: EngageSpanish
  flexLesson: FlexLesson
  formattedFlexLesson: FormattedFlexLesson
  gcpKey: GcpKey
  generateTTSCount: GenerateTTSCount
  helpPanel: HelpPanel
  hideModal: () => void,
  inputText: InputText
  isHelpOpen: IsHelpOpen
  isMenuOpen: IsMenuOpen
  isModalVisible: boolean
  isNavbarTopOpen: IsNavbarTopOpen
  isProfileOpen: IsProfileOpen
  isSelectedCreate: IsSelectedCreate
  isSettingsOpen: IsSettingsOpen
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
  modalConfig: ModalConfig | null
  openAiAvgTokens: OpenAiAvgTokens
  openAiBudget: OpenAiBudget
  openAiKey: OpenAiKey
  openAiUsage: OpenAiUsage
  paywall: Paywall
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
  setBaseFontSize: SetBaseFontSize
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
  setEngageSpanish: SetEngageSpanish
  setFlexLesson: SetFlexLesson
  setFormattedFlexLesson: SetFormattedFlexLesson
  setGcpKey: SetGcpKey
  setGenerateTTSCount: SetGenerateTTSCount
  setHelpPanel: SetHelpPanel
  setInputText: SetInputText
  setIsHelpOpen: SetIsHelpOpen
  setIsMenuOpen: SetIsMenuOpen
  setIsNavbarTopOpen: SetIsNavbarTopOpen
  setIsProfileOpen: SetIsProfileOpen
  setIsSelectedCreate: SetIsSelectedCreate
  setIsSettingsOpen: SetIsSettingsOpen
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
  setPaywall: SetPaywall
  setQuestion: SetQuestion
  setQuestionContext: SetQuestionContext
  setScenario: SetScenario
  setSelectedLessonNumber: SetLessonNumber
  setShowIsUserValidatedModal: SetShowIsUserValidatedModal
  setSourceLanguage: SetSourceLanguage
  setTargetLanguage: SetTargetLanguage
  setTtsAvgChars: SetTtsAvgChars
  setTtsBudget: SetTtsBudget
  setTtsCharUsage: SetTtsCharUsage
  setUseCloudTTS: SetUseCloudTTS
  setUseMyself: SetUseMyself
  setUserData: SetUserData
  setVerificationToken: SetVerificationToken
  showIsUserValidatedModal: ShowIsUserValidatedModal
  showModal: (config: ModalConfig) => void
  sourceLanguage: Language
  targetLanguage: Language
  ttsAvgChars: TtsAvgChars
  ttsBudget: TtsBudget
  ttsCharUsage: TtsCharUsage
  useCloudTTS: UseCloudTTS
  useMyself: UseMyself
  userData: UserData
  verificationToken: VerificationToken
}

// const generateUUID = (): string =>
//   'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
//     const r = (Math.random() * 16) | 0
//     const v = c === 'x' ? r : (r & 0x3) | 0x8
//     return v.toString(16)
// })

// // cXnsole.log(generateExample({language: defaultTargetLanguage, moduleName: MODULE_NAME.VERBS, options: { asString: false }}))
// cXnsole.log(updatedDefaultLesson)

export type MdxPagesMap = Record<MdxPage, FC>

export const mdxPagesMap: MdxPagesMap = {
  [MDX_PAGE.WELCOME]: Welcome,
  [MDX_PAGE.ABOUT]: About,
  [MDX_PAGE.FAQ]: FAQ,
  [MDX_PAGE.WELCOME_LEARN_SPANISH]: WelcomeLearnSpanish,
  [MDX_PAGE.TERMS_AND_CONDITIONS]: TermsAndConditions,
  [MDX_PAGE.PRIVACY_POLICY]: PrivacyPolicy,
  [MDX_PAGE.CLASSES]: Classes
}

// export type MdxPage = keyof typeof mdxPagesMap
export type SetMdxPage = React.Dispatch<React.SetStateAction<MdxPage>>

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [isSettingsOpen, setIsSettingsOpen] = useState<IsSettingsOpen>(false)
  
  const [isProfileOpen, _setIsProfileOpen] = useState<IsProfileOpen>(false)
  const [isMenuOpen, _setIsMenuOpen] = useState<IsMenuOpen>(false)

  const setIsProfileOpen: SetIsProfileOpen = (value) => {
    console.log('[setIsProfileOpen]', value)
    _setIsProfileOpen(value)
  }

  const setIsMenuOpen: SetIsMenuOpen = (value) => {
    console.log('[setIsMenuOpen]', value)
    _setIsMenuOpen(value)
  }  

  const [isHelpOpen, setIsHelpOpen] = useState<IsHelpOpen>(false)
  const [isNavbarTopOpen, setIsNavbarTopOpen] = useState<IsNavbarTopOpen>(true)

  const [engageSpanish, setEngageSpanish] = useState<EngageSpanish>(false)
  
  const[paywall, setPaywall] = useState<Paywall>(defaultPaywall)

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

  const [isSelectedCreate, setIsSelectedCreate] = useState<IsSelectedCreate>(false)
  
  const [baseFontSize, setBaseFontSize] = usePersistentState<BaseFontSize>('baseFontSize', 24)
  const [lessonName, setLessonName] = usePersistentState<LessonName>('lessonName', defaultLessonName)
  const [mdxPage, setMdxPage] = useState<MdxPage>(MDX_PAGE.WELCOME)

  const [showIsUserValidatedModal, setShowIsUserValidatedModal] = useState<ShowIsUserValidatedModal>(false)

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
  const [activeHome, setActiveHome] = useState<ActiveHome>(ACTIVE_HOME.MDX)
  const [activePanel, setActivePanel] = useState<ActivePanel>(ACTIVE_PANEL.MDX)
  const [answer, setAnswer] = useState<Answer>('')
  const [apiKey, setApiKey] = useState<ApiKey>('')
  const [audioUrl, setAudioUrl] = useState<AudioUrl>(null)
  const [cleanedText, setCleanedText] = useState<CleanedText>('')
  const [cutoff, setCutoff] = usePersistentState<Cutoff>('cutoff', false)
  const [gcpKey, setGcpKey] = useState<GcpKey>('')
  const [helpPanel, setHelpPanel] = useState<ActivePanel>(ACTIVE_PANEL.BASIC_CREATE)
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


    activateLessonBar,
    activeHome,
    activePanel,
    answer,
    apiKey,
    audioUrl,
    baseFontSize,
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
    engageSpanish,
    flexLesson,
    formattedFlexLesson,
    gcpKey,
    generateTTSCount,
    helpPanel,
    hideModal,
    inputText,
    isHelpOpen,
    isMenuOpen,
    isModalVisible,
    isNavbarTopOpen,
    isProfileOpen,
    isSelectedCreate,
    isSettingsOpen,
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
    mdxPagesMap,
    modalConfig,
    openAiAvgTokens,
    openAiBudget,
    openAiKey,
    openAiUsage,
    paywall,
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
    setBaseFontSize,
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
    setEngageSpanish,
    setFlexLesson,
    setFormattedFlexLesson,
    setGcpKey,
    setGenerateTTSCount,
    setHelpPanel,
    setInputText,
    setIsHelpOpen,
    setIsMenuOpen,
    setIsNavbarTopOpen,
    setIsProfileOpen,
    setIsSelectedCreate,
    setIsSettingsOpen,
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
    setPaywall,
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
    showModal,
    sourceLanguage,
    targetLanguage,
    ttsAvgChars,
    ttsBudget,
    ttsCharUsage,
    useCloudTTS,
    useMyself,
    userData,
    verificationToken
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
