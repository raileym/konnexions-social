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
  setActivePanel: SetActivePanel
  setActiveHome: SetActiveHome
  setAnswer: SetAnswer
  setAnswerKeep: SetAnswerKeep
  setApiKey: SetApiKey
  setAudioUrl: SetAudioUrl
  setCleanedText: SetCleanedText
  setDialogKeep: SetDialogKeep
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
export type VerbsKeep = string

export type SetActiveHome = React.Dispatch<React.SetStateAction<AppHomeValue>>
export type SetActivePanel = React.Dispatch<React.SetStateAction<AppPanelValue>>
export type SetAnswer = React.Dispatch<React.SetStateAction<Answer>>
export type SetAnswerKeep = React.Dispatch<React.SetStateAction<AnswerKeep>>
export type SetApiKey = React.Dispatch<React.SetStateAction<ApiKey>>
export type SetAudioUrl = React.Dispatch<React.SetStateAction<AudioUrl>>
export type SetCleanedText = React.Dispatch<React.SetStateAction<CleanedText>>
export type SetDialogKeep = React.Dispatch<React.SetStateAction<DialogKeep>>
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
export type Participants = Participant[]
export type UseMyself = boolean

export type ScenarioLabel = string
export type ScenarioLabels = Record<ScenarioValue, ScenarioLabel>

export type ScenarioTitle = string
export type ScenarioTitles = Record<ScenarioValue, ScenarioTitle>

export type StepResult = {
  dialog: Dialog[]
  nouns: Nouns[]
  verbs: Verbs[]
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
export type Nouns = string
export type Verbs = string
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

export type DialogReviewPromptProps = {
  language: Language
  dialog: Dialog
}

export type NounsPromptProps = {
  dialog: Dialog
}

export type VerbsPromptProps = {
  dialog: Dialog
}

export type DialogPrompt = (props: DialogPromptProps) => string
export type DialogReviewPrompt = (props: DialogReviewPromptProps) => string
export type NounsPrompt = (props: NounsPromptProps) => string
export type VerbsPrompt = (props: VerbsPromptProps) => string

export type PromptSet = {
  dialogPrompt: DialogPrompt
  dialogReviewPrompt: DialogReviewPrompt
  nounsPrompt: NounsPrompt
  verbsPrompt: VerbsPrompt
}

export type GeneratePromptSet = () => PromptSet

export const defaultDialog: Dialog[] = [
  "Mesero: Buenas tardes. ¿Qué desea tomar?",
  "Cliente: Una limonada, por favor.",
  "Mesero: En seguida."
]

export const defaultNouns: Nouns[] = [
  "mesero",
  "tardes",
  "limonada"
]

export const defaultVerbs: Verbs[] = [
  "desear",
  "tomar"
]

export const defaultStepResult: StepResult = {
  dialog: defaultDialog, // JSON.stringify(defaultDialog, null, 2),
  nouns: defaultNouns, // JSON.stringify(defaultNouns, null, 2),
  verbs: defaultVerbs, // JSON.stringify(defaultVerbs, null, 2),
}

export type Language = string

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
  timestamp: string
}

export type HandleDialogError = HandleLLMError
export type HandleNounsError = HandleLLMError
export type HandleVerbsError = HandleLLMError

export type HandleDialogErrors = HandleDialogError[]
export type HandleNounsErrors = HandleNounsError[]
export type HandleVerbsErrors = HandleVerbsError[]

export type ErrorLabel = string

// 'handleDialogError' | 'handleNounsError' | 'handleVerbsError',

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
  setErrors: React.Dispatch<React.SetStateAction<HandleLLMError[]>>,
  expectedFieldCount: number
  language: Language
}

export type GenAIValidationResult<T> =
  | {
      success: true
      parsed: T[]
    }
  | {
      success: false
      error: HandleLLMError
    }

export type RichParsedLine = {
  original: string
  fields: string[]
  isValid: boolean
  reasons: string[]
}
