export type AppContextType = {
  activePanel: ActivePanel
  activeHome: ActiveHome
  answer: Answer
  answerKeep: AnswerKeep
  apiKey: ApiKey
  audioUrl: AudioUrl
  cleanedText: CleanedText
  dialogKeep: DialogKeep
  gcpKey: GcpKey
  helpPanel: HelpPanel
  inputText: InputText
  isHelpOpen: IsHelpOpen
  isTransitioning: IsTransitioning
  maskKey: MaskKey
  maskOpenAiKey: MaskOpenAiKey
  nounsKeep: NounsKeep
  openAiAvgTokens: OpenAiAvgTokens
  openAiBudget: OpenAiBudget
  openAiKey: OpenAiKey
  openAiUsage: OpenAiUsage
  question: Question
  questionContext: QuestionContext
  questionKeep: QuestionKeep
  scenario: ScenarioValue
  setActivePanel: SetActivePanel
  setActiveHome: SetActiveHome
  setAnswer: SetAnswer
  setAnswerKeep: SetAnswerKeep
  setApiKey: SetApiKey
  setAudioUrl: SetAudioUrl
  setCleanedText: SetCleanedText
  setDialogKeep: SetDialogKeep
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
  setNounsKeep: SetNounsKeep
  setOpenAiUsage: SetOpenAiUsage
  setQuestion: SetQuestion
  setQuestionContext: SetQuestionContext
  setQuestionKeep: SetQuestionKeep
  setScenario: SetScenario
  setStepResult: SetStepResult
  setTtsAvgChars: SetTtsAvgChars
  setTtsBudget: SetTtsBudget
  setTtsCharUsage: SetTtsCharUsage
  setUseCloudTTS: SetUseCloudTTS
  stepResult: StepResult
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

export type ActiveHome = AppHomeValue
export type ActivePanel = AppPanelValue
export type Answer = string
export type AnswerKeep = string
export type ApiKey = string
export type AudioUrl = string | null
export type CleanedText = string
export type DialogKeep = string
export type GcpKey = string
export type HelpPanel = AppPanelValue
export type InputText = string
export type IsHelpOpen = boolean
export type IsTransitioning = boolean
export type MaskKey = boolean
export type MaskOpenAiKey = boolean
export type NounsKeep = string
export type OpenAiAvgTokens = number
export type OpenAiBudget = number
export type OpenAiKey = string
export type OpenAiUsage = number
export type Question = string
export type QuestionContext = string
export type QuestionKeep = string
export type Scenario = string

export type SetActiveHome = React.Dispatch<React.SetStateAction<AppHomeValue>>
export type SetActivePanel = React.Dispatch<React.SetStateAction<AppPanelValue>>
export type SetAnswer = React.Dispatch<React.SetStateAction<Answer>>
export type SetAnswerKeep = React.Dispatch<React.SetStateAction<AnswerKeep>>
export type SetApiKey = React.Dispatch<React.SetStateAction<ApiKey>>
export type SetAudioUrl = React.Dispatch<React.SetStateAction<AudioUrl>>
export type SetCleanedText = React.Dispatch<React.SetStateAction<CleanedText>>
export type SetDialogKeep = React.Dispatch<React.SetStateAction<DialogKeep>>
export type SetGcpKey = React.Dispatch<React.SetStateAction<GcpKey>>
export type SetHelpPanel = React.Dispatch<React.SetStateAction<HelpPanel>>
export type SetInputText = React.Dispatch<React.SetStateAction<InputText>>
export type SetIsHelpOpen = React.Dispatch<React.SetStateAction<IsHelpOpen>>
export type SetIsTransitioning = React.Dispatch<React.SetStateAction<IsTransitioning>>
export type SetMaskKey = React.Dispatch<React.SetStateAction<MaskKey>>
export type SetMaskOpenAiKey = React.Dispatch<React.SetStateAction<MaskOpenAiKey>>
export type SetNounsKeep = React.Dispatch<React.SetStateAction<NounsKeep>>
export type SetOpenAiAvgTokens = React.Dispatch<React.SetStateAction<OpenAiAvgTokens>>
export type SetOpenAiBudget = React.Dispatch<React.SetStateAction<OpenAiBudget>>
export type SetOpenAiKey = React.Dispatch<React.SetStateAction<OpenAiKey>>
export type SetOpenAiUsage = React.Dispatch<React.SetStateAction<OpenAiUsage>>
export type SetQuestion = React.Dispatch<React.SetStateAction<Question>>
export type SetQuestionContext = React.Dispatch<React.SetStateAction<QuestionContext>>
export type SetQuestionKeep = React.Dispatch<React.SetStateAction<QuestionKeep>>
export type SetScenario = React.Dispatch<React.SetStateAction<ScenarioValue>>
export type SetTtsAvgChars = React.Dispatch<React.SetStateAction<TtsAvgChars>>
export type SetTtsBudget = React.Dispatch<React.SetStateAction<TtsBudget>>
export type SetTtsCharUsage = React.Dispatch<React.SetStateAction<TtsCharUsage>>
export type SetUseCloudTTS = React.Dispatch<React.SetStateAction<UseCloudTTS>>

export type SwitchPanel = (newPanel: AppPanelValue) => void

export type TtsAvgChars = number
export type TtsBudget = number
export type TtsCharUsage = number
export type UseCloudTTS = boolean

export type IsActive = boolean

export const GEN_AI_STEP = {
  DIALOG: 0,
  NOUNS: 1,
  VERBS: 2,
  VERB_CONJUGATIONS: 3,
  NOUN_USAGE: 4
} as const
export type GenAIStepValue = (typeof GEN_AI_STEP)[keyof typeof GEN_AI_STEP]
export type GenAIStepKey = keyof typeof GEN_AI_STEP

export const APP_PANEL = {
  // HOME: 'home',
  SETTINGS: 'settings',
  HELP: 'help',
  KEYS: 'keys',
  MENU: 'menu',
  BASIC: 'basic',
  GEN_AI: 'genAI',
  GEN_AI_PRO: 'genAIPro'
} as const
export type AppPanelValue = (typeof APP_PANEL)[keyof typeof APP_PANEL]
export type AppPanelKey = keyof typeof APP_PANEL
export const APP_HOME = APP_PANEL

export type AppHomeValue = (typeof APP_HOME)[keyof typeof APP_HOME]
export type AppHomeKey = keyof typeof APP_HOME

export type Participant = string
export type Participants = Participant[]
export type UseMyself = boolean

export type ScenarioLabel = string
export type ScenarioLabels = Record<ScenarioValue, ScenarioLabel>

export type ScenarioTitle = string
export type ScenarioTitles = Record<ScenarioValue, ScenarioTitle>

export type StepResult = {
  dialog: Dialog[]
  nouns: Noun[]
  verbs: Verb[]
  // ...
}

export type SetStepResult = React.Dispatch<React.SetStateAction<StepResult>>

export type ChooseParticipantsProps = {
  participants: Participants
  n: number
  useMyself: UseMyself
}

export type ParsedStepResult = {
  dialog: string[] // array of simple utterance strings

  nouns: Record<string, string> // noun → matching phrase

  verbs: Record<string, string> // verb → matching phrase

  verbConjugations: {
    [verb: string]: {
      nosotros: string
      yo: string
      'él/ella': string
      'ellos/ellas': string
      tú: string
    }
  }

  nounUsage: {
    [noun: string]: {
      masculine: string
      feminine: string
      preposition: string
    }
  }
}

export type Dialog = string
export type Noun = string
export type Verb = string
export type JsonQualification = string
export type Prompt = string
export type HandleDialogProps = {
  prompt: Prompt
  nextStep: GenAIStepValue
  setStepResult: SetStepResult
}

export type DialogPromptProps = {
  language: Language
  scenarioLabel: ScenarioLabel
  participant: Participant
}
export type DialogPrompt = (props: DialogPromptProps) => string

export type NounsPromptProps = {
  dialog: Dialog
}
export type NounsPrompt = (props: NounsPromptProps) => string

export type PromptSet = {
  dialogPrompt: DialogPrompt
  nounsPrompt: NounsPrompt
}

export type GeneratePromptSet = (jsonQualification: JsonQualification) => PromptSet



export const defaultDialog: Dialog[] = [
  "Mesero: Buenas tardes. ¿Qué desea tomar?",
  "Cliente: Una limonada, por favor.",
  "Mesero: En seguida."
]

export const defaultNouns: Noun[] = [
  "mesero",
  "tardes",
  "limonada"
]

export const defaultVerbs: Verb[] = [
  "desear",
  "tomar"
]

export const defaultStepResult: StepResult = {
  dialog: defaultDialog, // JSON.stringify(defaultDialog, null, 2),
  nouns: defaultNouns, // JSON.stringify(defaultNouns, null, 2),
  verbs: defaultVerbs, // JSON.stringify(defaultVerbs, null, 2),
}

export type Language = string