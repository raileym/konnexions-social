// import { generateSignature } from '../shared/generateSignature'

export type AppContextType = {
  activeHome: ActiveHome
  activePanel: ActivePanel
  answer: Answer
  answerKeep: AnswerKeep
  apiKey: ApiKey
  audioUrl: AudioUrl
  cleanedText: CleanedText
  gcpKey: GcpKey
  handleDialogErrors: HandleDialogErrors
  handleNounsErrors: HandleNounsErrors
  handleVerbsErrors: HandleVerbsErrors
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
  setActiveHome: SetActiveHome
  setActivePanel: SetActivePanel
  setAnswer: SetAnswer
  setAnswerKeep: SetAnswerKeep
  setApiKey: SetApiKey
  setAudioUrl: SetAudioUrl
  setCleanedText: SetCleanedText
  setGcpKey: SetGcpKey
  setHandleDialogErrors: SetHandleDialogErrors
  setHandleNounsErrors: SetHandleNounsErrors
  setHandleVerbsErrors: SetHandleVerbsErrors
  setHelpPanel: SetHelpPanel
  setInputText: SetInputText
  setIsHelpOpen: SetIsHelpOpen
  setIsTransitioning: SetIsTransitioning
  setMaskKey: SetMaskKey
  setMaskOpenAiKey: SetMaskOpenAiKey
  setNounsKeep: SetNounsKeep
  setOpenAiAvgTokens: SetOpenAiAvgTokens
  setOpenAiBudget: SetOpenAiBudget
  setOpenAiKey: SetOpenAiKey
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
  setVerbsKeep: SetVerbsKeep
  stepResult: StepResult
  ttsAvgChars: TtsAvgChars
  ttsBudget: TtsBudget
  ttsCharUsage: TtsCharUsage
  useCloudTTS: UseCloudTTS
  verbsKeep: VerbsKeep
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
export type VerbsKeep = string

export type SetActiveHome = React.Dispatch<React.SetStateAction<AppHomeValue>>
export type SetActivePanel = React.Dispatch<React.SetStateAction<AppPanelValue>>
export type SetAnswer = React.Dispatch<React.SetStateAction<Answer>>
export type SetAnswerKeep = React.Dispatch<React.SetStateAction<AnswerKeep>>
export type SetApiKey = React.Dispatch<React.SetStateAction<ApiKey>>
export type SetAudioUrl = React.Dispatch<React.SetStateAction<AudioUrl>>
export type SetCleanedText = React.Dispatch<React.SetStateAction<CleanedText>>
export type SetDialogPrompt = React.Dispatch<React.SetStateAction<Prompt>>
export type SetNounsPrompt = React.Dispatch<React.SetStateAction<Prompt>>
export type SetGcpKey = React.Dispatch<React.SetStateAction<GcpKey>>
export type SetHandleDialogErrors = React.Dispatch<React.SetStateAction<HandleDialogErrors>>
export type SetHandleNounsErrors = React.Dispatch<React.SetStateAction<HandleNounsErrors>>
export type SetHandleVerbsErrors = React.Dispatch<React.SetStateAction<HandleVerbsErrors>>
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
export type SetVerbsKeep = React.Dispatch<React.SetStateAction<VerbsKeep>>

export type SwitchPanel = (newPanel: AppPanelValue) => void

export type TtsAvgChars = number
export type TtsBudget = number
export type TtsCharUsage = number
export type UseCloudTTS = boolean

export type IsActive = boolean

export const GEN_AI_STEP = {
  DIALOG: 0,
  DIALOG_REVIEW: 1,
  NOUNS: 2,
  NOUNS_REVIEW: 3,
  VERBS: 4,
  VERBS_REVIEW: 5,
  VERB_CONJUGATIONS: 6,
  VERB_CONJUGATIONS_REVIEW: 7,
  NOUN_USAGE: 8,
  NOUN_USAGE_REVIEW: 9
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
export type ParticipantList = string
export type Participants = Participant[]
export type ParticipantArray = Participant[]
export type ParticipantArrayByLanguage = Record<Language, ParticipantArray>

export type ParticipantsByLanguage = {
  [K in LangKey]: ParticipantArray
}

export type UseMyself = boolean

export type ScenarioLabel = string
export type ScenarioLabels = Record<ScenarioValue, ScenarioLabel>

export type ScenarioTitle = string
export type ScenarioTitles = Record<ScenarioValue, ScenarioTitle>

export type StepResult = {
  verbsArray: VerbsArray
  
  dialog: Dialog
  dialogArray: DialogArray
  dialogPrompt: Prompt
  dialogSignature: Signature
  dialogErrors: HandleLLMError[]

  nounsArray: NounsArray
  nounsPrompt: Prompt
  nounsSignature: Signature
  nounsErrors: HandleLLMError[]

  verbs: Verbs[]
  verbsErrors: HandleLLMError[]
  verbsPrompt: Prompt
  // ...
}

export type SetStepResult = React.Dispatch<React.SetStateAction<StepResult>>

export type ChooseParticipantsProps = {
  participantArray: ParticipantArray // ByLanguage: ParticipantArrayByLanguage
  n: number
  useMyself: UseMyself
  language: Language
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

export type DialogLine = string
export type DialogArray = DialogLine[]
export type SetDialogArray = React.Dispatch<React.SetStateAction<DialogArray>>

export type NounsLine = string
export type NounsArray = NounsLine[]
export type SetNounsArray = React.Dispatch<React.SetStateAction<NounsArray>>

export type VerbsLine = string
export type VerbsArray = VerbsLine[]
export type SetVerbsArray = React.Dispatch<React.SetStateAction<VerbsArray>>

export type Dialog = string
export type Nouns = string
export type Verbs = string
export type JsonQualification = string
export type Prompt = string
export type HandleDialogProps = {
  language: Language
  scenarioLabel: ScenarioLabel
  scenarioParticipantList: ParticipantList
}
export type HandleNounsProps = {
  language: Language
  dialogArray: DialogArray
}

export type HandleVerbsProps = {
  prompt: Prompt
  nextStep: GenAIStepValue
  setStepResult: SetStepResult
}


export type GetDialogPromptProps = {
  language: Language
  scenarioLabel: ScenarioLabel
  scenarioParticipantList: ParticipantList
}

export type GetDialogReviewPromptProps = {
  language: Language
  dialog: Dialog
}

export type GetNounsPromptProps = {
  dialog: Dialog
}

export type GetVerbsPromptProps = {
  dialog: Dialog
}

export type GetDialogPrompt = (props: GetDialogPromptProps) => string
export type GetDialogReviewPrompt = (props: GetDialogReviewPromptProps) => string
export type GetNounsPrompt = (props: GetNounsPromptProps) => string
export type GetVerbsPrompt = (props: GetVerbsPromptProps) => string

export type PromptSet = {
  getDialogPrompt: GetDialogPrompt
  getDialogReviewPrompt: GetDialogReviewPrompt
  getNounsPrompt: GetNounsPrompt
  getVerbsPrompt: GetVerbsPrompt
}

export type GeneratePromptSet = () => PromptSet

export const defaultDialogArray: DialogArray = [
  "Mesero: Buenas tardes. ¿Qué desea tomar?",
  "Cliente: Una limonada, por favor.",
  "Mesero: En seguida."
]

export const defaultDialog: Dialog = defaultDialogArray.join(' ')
export const defaultDialogSignature: Signature = 'xyz' // generateSignature(defaultDialog)
export const defaultNounsSignature: Signature = 'xyz' // generateSignature(defaultDialog)

export const defaultNouns: Nouns[] = [
  "mesero",
  "tardes",
  "limonada"
]

export const defaultNounsArray: NounsArray = [
    "masculino|restaurante|restaurantes|a, en, desde, sobre",
    "femenino|noche|noches|en, durante, por",
    "femenino|ensalada|ensaladas|con, sin, de, para",
    "masculino|pollo|pollos|con, sin, de, para"
  ]

export const defaultVerbs: Verbs[] = [
  "desear",
  "tomar"
]

export const defaultVerbsArray: VerbsArray = [
  "gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta",
  "ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan",
  "pedir|pido|pides|pide|pedimos|pedís|piden",
]

export const defaultStepResult: StepResult = {
  dialog: defaultDialog,
  dialogPrompt: '',
  dialogArray: defaultDialogArray,
  dialogErrors: [],
  dialogSignature: defaultDialogSignature,

  nounsPrompt: '',
  nounsArray: defaultNounsArray,
  nounsErrors: [],
  nounsSignature: defaultNounsSignature,

  verbs: defaultVerbs, // JSON.stringify(defaultVerbs, null, 2),
  verbsArray: defaultVerbsArray,
  verbsErrors: [],
  verbsPrompt: ''
}

export type Language = 'Spanish' | 'English' 

export type GenAIContext = 'dialog' | 'nouns' | 'verbs'

// export type HandleNounsError = {
//   message: string
//   detail: string
//   offendingData: string
//   timestamp: string
// }

// export type HandleNounsErrors = HandleNounsError[]

// export type HandleDialogError = {
//   message: string
//   detail: string
//   offendingData: string
//   timestamp: string
// }

// export type HandleDialogErrors = HandleDialogError[]

// export type HandleVerbsError = {
//   message: string
//   detail: string
//   offendingData: string
//   timestamp: string
// }

// export type HandleVerbsErrors = HandleVerbsError[]

export type HandleLLMError = {
  message: string
  detail: string
  offendingData: string
  errorLabel: ErrorLabelValue
  timestamp: string
}

export type HandleDialogError = HandleLLMError
export type HandleNounsError = HandleLLMError
export type HandleVerbsError = HandleLLMError

export type HandleDialogErrors = HandleDialogError[]
export type HandleNounsErrors = HandleNounsError[]
export type HandleVerbsErrors = HandleVerbsError[]

export type ErrorLabel = string

export const ERROR_LABEL = {
  DIALOG_ERROR: 'handleDialogError',
  NOUNS_ERROR: 'handleNounsError',
  VERBS_ERROR: 'handleVerbsError'
} as const
export type ErrorLabelValue = (typeof ERROR_LABEL)[keyof typeof ERROR_LABEL]
export type ErrorLabelKey = keyof typeof ERROR_LABEL

export type AddErrorProps = {
  errorLabel: ErrorLabelValue
  setErrors: React.Dispatch<React.SetStateAction<HandleLLMError[]>>
  error: HandleLLMError
}

export type ValidateGenAIResponseProps = {
  response: string | null,
  errorLabel: ErrorLabelValue,
  expectedFieldCount: number
  language: Language
}

export type ValidateGenAIResponsePropsOLD = {
  response: string | null,
  errorLabel: ErrorLabelValue,
  setErrors: React.Dispatch<React.SetStateAction<HandleLLMError[]>>,
  expectedFieldCount: number
  language: Language
}

export type GenAIValidationResult<T> = {
  success: boolean
  parsed: T[]
  // prompt: Prompt
  errors?: HandleLLMError[]
}

export type Signature = string

export type GetDialogResult = {
  dialog: Dialog
  dialogPrompt: Prompt
  dialogResult: GenAIValidationResult<Dialog>
  dialogSignature: Signature
}

export type GetNounsResult = {
  nounsPrompt: Prompt
  nounsResult: GenAIValidationResult<Nouns>
  nounsSignature: Signature
}

export type RichParsedLine = {
  original: string
  fields: string[]
  isValid: boolean
  reasons: string[]
}

export type GetGenAIExampleOptions = {
  asString?: boolean
}

export type GenerateExampleProps = {
  language: Language
  context: GenAIContext
  options: GetGenAIExampleOptions // = {}
}

// export type ParticipantsByLanguage = {
//   en: string[]
//   es: string[]
// }

export type GetScenarioDetailsProps = {
  scenario: ScenarioValue,
  language: Language
}

export const LANG_KEYS = {
  EN: 'EN',
  ES: 'ES' //,
  // ZH: 'ZH',
  // FR: 'FR',
  // DE: 'DE',
  // IT: 'IT',
  // PT: 'PT',
  // JA: 'JA',
  // KO: 'KO'
} as const

export type LangKey = keyof typeof LANG_KEYS
export type LangValue = (typeof LANG_KEYS)[keyof typeof LANG_KEYS]
