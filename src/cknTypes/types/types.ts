export type AppContextType = {
  activePanel: ActivePanel
  answer: Answer
  apiKey: ApiKey
  audioUrl: AudioUrl
  cleanedText: CleanedText
  gcpKey: GcpKey
  helpPanel: HelpPanel
  inputText: InputText
  isHelpOpen: IsHelpOpen
  isTransitioning: IsTransitioning
  maskKey: MaskKey
  maskOpenAiKey: MaskOpenAiKey
  openAiAvgTokens: OpenAiAvgTokens
  openAiBudget: OpenAiBudget
  openAiKey: OpenAiKey
  openAiUsage: OpenAiUsage
  question: Question
  questionContext: QuestionContext
  scenario: ScenarioValue
  setActivePanel: SetActivePanel
  setAnswer: SetAnswer
  setApiKey: SetApiKey
  setAudioUrl: SetAudioUrl
  setCleanedText: SetCleanedText
  setGcpKey: SetGcpKey
  setHelpPanel: SetHelpPanel
  setInputText: SetInputText
  setIsHelpOpen: SetIsHelpOpen
  setIsTransitioning: SetIsTransitioning
  setMaskKey: SetMaskKey
  setMaskOpenAiKey: SetMaskOpenAiKey
  setOpenAiAvgTokens: SetOpenAiAvgTokens
  setOpenAiBudget: SetOpenAiBudget
  setOpenAiKey: SetOpenAiKey
  setOpenAiUsage: SetOpenAiUsage
  setQuestion: SetQuestion
  setQuestionContext: SetQuestionContext
  setScenario: SetScenario
  setTtsAvgChars: SetTtsAvgChars
  setTtsBudget: SetTtsBudget
  setTtsCharUsage: SetTtsCharUsage
  setUseCloudTTS: SetUseCloudTTS
  ttsAvgChars: TtsAvgChars
  ttsBudget: TtsBudget
  ttsCharUsage: TtsCharUsage
  useCloudTTS: UseCloudTTS
}

export const SCENARIO = {
  RESTAURANT: 'restaurant',
  HOTEL: 'hotel',
  AIRPORT: 'airport',
  TAXI: 'taxi',
  CUSTOM: 'custom'
} as const

export type ScenarioValue = (typeof SCENARIO)[keyof typeof SCENARIO]
export type ScenarioKey = keyof typeof SCENARIO

export type ActivePanel = AppPanelValue
export type HelpPanel = AppPanelValue
export type Answer = string
export type ApiKey = string
export type AudioUrl = string | null
export type CleanedText = string
export type GcpKey = string
export type InputText = string
export type IsTransitioning = boolean
export type IsHelpOpen = boolean
export type MaskKey = boolean
export type MaskOpenAiKey = boolean
export type OpenAiAvgTokens = number
export type OpenAiBudget = number
export type OpenAiKey = string
export type OpenAiUsage = number
export type Question = string
export type QuestionContext = string
export type Scenario = string
export type SetActivePanel = (panel: AppPanelValue) => void
export type SetAnswer = (answer: Answer) => void
export type SetApiKey = (apiKey: ApiKey) => void
export type SetAudioUrl = (audioUrl: AudioUrl) => void
export type SetCleanedText = (cleanedText: CleanedText) => void
export type SetGcpKey = (gcpKey: GcpKey) => void
export type SetHelpPanel = (helpPanel: HelpPanel) => void
export type SetInputText = (inputText: InputText) => void
export type SetIsTransitioning = (isTransitioning: IsTransitioning) => void
export type SetIsHelpOpen = (isHelpPanelOpen: IsHelpOpen) => void
export type SetMaskKey = (maskKey: MaskKey) => void
export type SetMaskOpenAiKey = (maskOpenAiKey: MaskOpenAiKey) => void
export type SetOpenAiAvgTokens = (openAiAvgTokens: OpenAiAvgTokens) => void
export type SetOpenAiBudget = (openAiBudget: OpenAiBudget) => void
export type SetOpenAiKey = (openAiKey: OpenAiKey) => void
export type SetOpenAiUsage = (openAiUsage: OpenAiUsage) => void
export type SetQuestion = (question: Question) => void
export type SetQuestionContext = (questionContext: QuestionContext) => void
export type SetScenario = (scenario: ScenarioValue) => void
export type SetTtsAvgChars = (ttsAvgChars: TtsAvgChars) => void
export type SetTtsBudget = (ttsBudget: TtsBudget) => void
export type SetTtsCharUsage = (ttsCharUsage: TtsCharUsage) => void
export type SetUseCloudTTS = (useCloudTTS: UseCloudTTS) => void
export type SwitchPanel = (newPanel: AppPanelValue) => void
export type TtsAvgChars = number
export type TtsBudget = number
export type TtsCharUsage = number
export type UseCloudTTS = boolean

export const APP_PANEL = {
  HOME: 'home',
  SETTINGS: 'settings',
  HELP: 'help',
  KEYS: 'keys',
  GEN_AI: 'genAI',
  MENU: 'menu',
} as const

export type AppPanelValue = (typeof APP_PANEL)[keyof typeof APP_PANEL]
export type AppPanelKey = keyof typeof APP_PANEL
