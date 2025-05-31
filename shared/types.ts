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
  scenario: Scenario
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
  setLesson: SetLesson
  setTtsAvgChars: SetTtsAvgChars
  setTtsBudget: SetTtsBudget
  setTtsCharUsage: SetTtsCharUsage
  setUseCloudTTS: SetUseCloudTTS
  setVerbsKeep: SetVerbsKeep
  lesson: Lesson
  ttsAvgChars: TtsAvgChars
  ttsBudget: TtsBudget
  ttsCharUsage: TtsCharUsage
  useCloudTTS: UseCloudTTS
  verbsKeep: VerbsKeep
}

export const LANGUAGE = {
  SPANISH: 'Latin American Spanish',
  ENGLISH: 'English',
  SPXNISH: 'SpXnish'
} as const
export type LanguageValue = (typeof LANGUAGE)[keyof typeof LANGUAGE]
export type LanguageKey = keyof typeof LANGUAGE
export type Language = LanguageValue

export type GenAIContext = 'dialog' | 'nouns' | 'verbs' | 'dialogReview' | 'nounsReview' | 'verbsReview'

export const LESSON_TITLE = {
  DIALOG: 'dialog',
  NOUNS: 'nouns',
  VERBS: 'verbs',
  DIALOG_REVIEW: 'dialogReview',
  NOUNS_REVIEW: 'nounsReview',
  VERBS_REVIEW: 'verbsReview'
}

export type LessonTitleValue = (typeof LESSON_TITLE)[keyof typeof LESSON_TITLE]
export type LessonTitleKey = keyof typeof LESSON_TITLE
export type LessonTitle = LessonTitleValue



export const SCENARIO = {
  RESTAURANT: 'restaurant',
  HOTEL: 'hotel',
  AIRPORT: 'airport',
  TAXI: 'taxi',
  CUSTOM: 'custom'
} as const
export type ScenarioValue = (typeof SCENARIO)[keyof typeof SCENARIO]
export type ScenarioKey = keyof typeof SCENARIO
export type Scenario = ScenarioValue

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
export type SetScenario = React.Dispatch<React.SetStateAction<Scenario>>
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
export type ParticipantProse = string
export type Participants = Participant[]
export type ParticipantLines = Participant[]
export type ParticipantLinesByLanguage = Record<Language, ParticipantLines>

export type UseMyself = boolean

export type ScenarioLabel = string
export type ScenarioLabels = Record<Scenario, ScenarioLabel>

export type ScenarioTitle = string
export type ScenarioTitles = Record<Scenario, ScenarioTitle>

export type Success = boolean

export type Lesson = {
  language: Language
  scenarioLabel: ScenarioLabel
  participantList: ParticipantProse
  dialogProse: DialogProse

  dialog: {
    dialogLines: DialogLines
    dialogPrompt: Prompt
    dialogSignature: Signature
    dialogErrors: HandleLLMError[]
    dialogSuccess: Success
    dialogSentinel: Sentinel
  }

  nouns: {
    nounsLines: NounsLines
    nounsPrompt: Prompt
    nounsSignature: Signature
    nounsErrors: HandleLLMError[]
    nounsSuccess: Success
    nounsSentinel: Sentinel
  }

  verbs: {
    verbsLines: VerbsLines
    verbsErrors: HandleLLMError[]
    verbsPrompt: Prompt
    verbsSignature: Signature
    verbsSuccess: Success
    verbsSentinel: Sentinel
  }

  dialogReview: {
    dialogReviewLines: DialogReviewLines
    dialogReviewErrors: HandleLLMError[]
    dialogReviewPrompt: Prompt
    dialogReviewSignature: Signature
    dialogReviewSentinel: Sentinel
    dialogReviewSuccess: Success
  }

  nounsReview: {
    nounsReviewLines: NounsReviewLines
    nounsReviewErrors: HandleLLMError[]
    nounsReviewPrompt: Prompt
    nounsReviewSignature: Signature
    nounsReviewSentinel: Sentinel
    nounsReviewSuccess: Success
  }

  verbsReview: {
    verbsReviewLines: VerbsReviewLines
    verbsReviewErrors: HandleLLMError[]
    verbsReviewPrompt: Prompt
    verbsReviewSignature: Signature
    verbsReviewSentinel: Sentinel
    verbsReviewSuccess: Success
  }
}

export type SetLesson = React.Dispatch<React.SetStateAction<Lesson>>

export type ChooseParticipantLinesProps = {
  participantLines: ParticipantLines // ByLanguage: ParticipantLinesByLanguage
  n: number
  useMyself: UseMyself
  language: Language
}

export type ParsedLesson = {
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
export type DialogLines = DialogLine[]
export type SetDialogLines = React.Dispatch<React.SetStateAction<DialogLines>>

export type NounsLine = string
export type NounsLines = NounsLine[]
export type SetNounsLines = React.Dispatch<React.SetStateAction<NounsLines>>

export type VerbsLine = string
export type VerbsLines = VerbsLine[]
export type SetVerbsLines = React.Dispatch<React.SetStateAction<VerbsLines>>

export type DialogReviewLine = string
export type DialogReviewLines = DialogReviewLine[]
export type SetDialogReviewLines = React.Dispatch<React.SetStateAction<DialogReviewLines>>

export type NounsReviewLine = string
export type NounsReviewLines = NounsReviewLine[]
export type SetNounsReviewLines = React.Dispatch<React.SetStateAction<NounsReviewLines>>

export type VerbsReviewLine = string
export type VerbsReviewLines = VerbsReviewLine[]
export type SetVerbsReviewLines = React.Dispatch<React.SetStateAction<VerbsReviewLines>>

export type DialogProse = string
export type Nouns = string
export type Verbs = string

export type DialogReview = string
export type NounsReview = string
export type VerbsReview = string

export type TestMode = boolean
export type JsonQualification = string
export type Prompt = string
export type HandleDialogProps = {
  testMode: TestMode
  lesson: Lesson
  setLesson: SetLesson
}

export type HandleNounsProps = {
  testMode: TestMode
  lesson: Lesson
  setLesson: SetLesson
}

export type HandleDialogReviewProps = {
  testMode: TestMode
  language: Language
  dialogLines: DialogLines
  dialogSignature: Signature
}

export type HandleNounsReviewProps = {
  testMode: TestMode
  language: Language
  nounsLines: NounsLines
  dialogSignature: Signature
}

export type HandleVerbsProps = {
  testMode: TestMode
  lesson: Lesson
  setLesson: SetLesson
}

export type GetPromptProps = {
  lesson: Lesson
  lessonTitle: LessonTitle
}

export type GetDialogPromptProps = {
  lesson: Lesson
}

export type GetDialogReviewPromptProps = {
  lesson: Lesson
}

export type GetNounsReviewPromptProps = {
  lesson: Lesson
}

export type GetVerbsReviewPromptProps = {
  lesson: Lesson
}

export type GetNounsPromptProps = {
  lesson: Lesson
}

export type GetVerbsPromptProps = {
  lesson: Lesson
}

export type GetPrompt = (props: GetPromptProps) => string
export type GetDialogPrompt = (props: GetDialogPromptProps) => string
export type GetDialogReviewPrompt = (props: GetDialogReviewPromptProps) => string
export type GetNounsPrompt = (props: GetNounsPromptProps) => string
export type GetNounsReviewPrompt = (props: GetNounsReviewPromptProps) => string
export type GetVerbsPrompt = (props: GetVerbsPromptProps) => string
export type GetVerbsReviewPrompt = (props: GetVerbsReviewPromptProps) => string

export type PromptSet = {
  getPrompt: GetPrompt
}

export type GeneratePromptSet = () => PromptSet

export const defaultDialogLines: DialogLines = [
  "Mesero: Buenas tardes. ¿Qué desea tomar?",
  "Cliente: Una limonada, por favor.",
  "Mesero: En seguida."
]

export const defaultDialogReviewLines: DialogLines = [
  "Mesero: Buenas tardes. ¿Qué desea tomar?|Mesero: Buenas tardes, ¿qué le gustaría tomar?",
  "Cliente: Una limonada, por favor.|Cliente: Me gustaría una limonada, por favor.",
  "Mesero: En seguida.|Mesero: En un momento le traigo su bebida."
]

export const defaultDialog: DialogProse = defaultDialogLines.join(' ')

export const defaultSignature = 'xyz'

export const defaultSentinel = ''

export const defaultNouns: Nouns[] = [
  "mesero",
  "tardes",
  "limonada"
]

export const defaultNounsLines: NounsLines = [
    "masculino|restaurante|restaurantes|a, en, desde, sobre",
    "femenino|noche|noches|en, durante, por",
    "femenino|ensalada|ensaladas|con, sin, de, para",
    "masculino|pollo|pollos|con, sin, de, para"
  ]

export const defaultVerbs: Verbs[] = [
  "desear",
  "tomar"
]

export const defaultVerbsLines: VerbsLines = [
  "gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta",
  "ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan",
  "pedir|pido|pides|pide|pedimos|pedís|piden",
]

export const scenarioTitles: ScenarioTitles = {
  restaurant: 'Restaurant',
  hotel: 'Hotel',
  airport: 'Airport',
  taxi: 'Taxi',
  custom: 'Custom'
}

export const scenarioLabels: ScenarioLabels = {
  restaurant: 'at the restaurant',
  hotel: 'at the hotel',
  airport: 'at the airport',
  taxi: 'in a taxi',
  custom: 'Custom'
}

export const defaultLesson: Lesson = {
  language: LANGUAGE.SPANISH,
  scenarioLabel: scenarioLabels[SCENARIO.RESTAURANT],
  participantList: '',
  dialogProse: defaultDialog,

  dialog: {
    dialogLines: defaultDialogLines,
    dialogPrompt: '',
    dialogErrors: [],
    dialogSignature: defaultSignature,
    dialogSuccess: false,
    dialogSentinel: defaultSentinel
  },

  nouns: {
    nounsPrompt: '',
    nounsLines: defaultNounsLines,
    nounsErrors: [],
    nounsSignature: defaultSignature,
    nounsSuccess: false,
    nounsSentinel: defaultSentinel
  },

  dialogReview: {
    dialogReviewPrompt: '',
    dialogReviewLines: defaultDialogReviewLines,
    dialogReviewErrors: [],
    dialogReviewSignature: defaultSignature,
    dialogReviewSentinel: defaultSentinel,
    dialogReviewSuccess: false,
  },

  nounsReview: {
    nounsReviewPrompt: '',
    nounsReviewLines: [],
    nounsReviewErrors: [],
    nounsReviewSignature: defaultSignature,
    nounsReviewSentinel: defaultSentinel,
    nounsReviewSuccess: false,
  },

  verbs: {
    verbsSignature: defaultSignature, // JSON.stringify(defaultVerbs, null, 2),
    verbsLines: defaultVerbsLines,
    verbsErrors: [],
    verbsPrompt: '',
    verbsSuccess: false,
    verbsSentinel: defaultSentinel
  },

  verbsReview: {
    verbsReviewPrompt: '',
    verbsReviewLines: [],
    verbsReviewErrors: [],
    verbsReviewSignature: defaultSignature,
    verbsReviewSentinel: defaultSentinel,
    verbsReviewSuccess: false
  }
}

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
  VERBS_ERROR: 'handleVerbsError',
  DIALOG_REVIEW_ERROR: 'handleDialogReviewError',
  NOUNS_REVIEW_ERROR: 'handleNounsReviewError',
  VERBS_REVIEW_ERROR: 'handleVerbsReviewError'
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

export type Sentinel = string

export type GenAIValidationResult<T> = {
  success: boolean
  lines: T[]
  errors?: HandleLLMError[]
  sentinel?: Sentinel
}

export type Signature = string

export type GetDialogResult = {
  lesson: Partial<Lesson>
}

export type PartialLesson = {
  lesson: Partial<Lesson>
}

// export type GetDialogResult = {
//   dialog: Dialog
//   dialogPrompt: Prompt
//   dialogResult: GenAIValidationResult<Dialog>
//   dialogSignature: Signature
// }

export type GetNounsResult = {
  lesson: Partial<Lesson>
}

export type GetVerbsResult = {
  verbsPrompt: Prompt
  verbsResult: GenAIValidationResult<Verbs>
  verbsSignature: Signature
}

export type GetDialogReviewResult = {
  dialogReviewPrompt: Prompt
  dialogReviewResult: GenAIValidationResult<Verbs>
  dialogReviewSignature: Signature
}

export type GetNounsReviewResult = {
  nounsReviewPrompt: Prompt
  nounsReviewResult: GenAIValidationResult<NounsReviewLine>
  nounsReviewSignature: Signature
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
  lessonTitle: LessonTitle
  options: GetGenAIExampleOptions // = {}
}

export type GetDialogReviewProps = {
  testMode: TestMode,
  language: Language
  dialogLines: DialogLines
  dialogSignature: Signature
}

export type GetNounsReviewProps = {
  testMode: TestMode,
  language: Language
  nounsLines: NounsLines
  dialogSignature: Signature
}

export type GetVerbsReviewProps = {
  testMode: TestMode,
  language: Language
  verbsLines: VerbsLines
  dialogSignature: Signature
}

export type GetScenarioDetailsProps = {
  scenario: Scenario,
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

export type GetDialogProps = {
  testMode: TestMode,
  lesson: Lesson,
}
  
export type GetPartialLessonProps = {
  testMode: TestMode,
  lesson: Lesson,
  lessonTitle: LessonTitle
}
  
export type GetNounsProps = {
  testMode: TestMode,
  lesson: Lesson
}
  
export type GetVerbsProps = {
  testMode: TestMode,
  lesson: Lesson
}
  

