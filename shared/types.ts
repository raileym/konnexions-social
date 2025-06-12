// import { generateSignature } from '../shared/generateSignature'

export type AppContextType = {
  activeHome: ActiveHome
  activePanel: ActivePanel
  answer: Answer
  apiKey: ApiKey
  audioUrl: AudioUrl
  cleanedText: CleanedText
  cutoff: Cutoff
  gcpKey: GcpKey
  generateTTSCount: GenerateTTSCount
  helpPanel: HelpPanel
  inputText: InputText
  isHelpOpen: IsHelpOpen
  isTransitioning: IsTransitioning
  language: Language
  lesson: Lesson
  lessons: Lessons
  maskKey: MaskKey
  maskOpenAiKey: MaskOpenAiKey
  maxCount: MaxCount
  openAiAvgTokens: OpenAiAvgTokens
  openAiBudget: OpenAiBudget
  openAiKey: OpenAiKey
  openAiUsage: OpenAiUsage
  question: Question
  questionContext: QuestionContext
  scenario: Scenario
  scenarioData: ScenarioData
  selectedLessonId: LessonId
  setActiveHome: SetActiveHome
  setActivePanel: SetActivePanel
  setAnswer: SetAnswer
  setApiKey: SetApiKey
  setAudioUrl: SetAudioUrl
  setCleanedText: SetCleanedText
  setCutoff: SetCutoff
  setGcpKey: SetGcpKey
  setGenerateTTSCount: SetGenerateTTSCount
  setHelpPanel: SetHelpPanel
  setInputText: SetInputText
  setIsHelpOpen: SetIsHelpOpen
  setIsTransitioning: SetIsTransitioning
  setLanguage: SetLanguage
  setLesson: SetLesson
  setLessons: SetLessons
  setMaskKey: SetMaskKey
  setMaskOpenAiKey: SetMaskOpenAiKey
  setMaxCount: SetMaxCount
  setOpenAiAvgTokens: SetOpenAiAvgTokens
  setOpenAiBudget: SetOpenAiBudget
  setOpenAiKey: SetOpenAiKey
  setOpenAiUsage: SetOpenAiUsage
  setQuestion: SetQuestion
  setQuestionContext: SetQuestionContext
  setScenario: SetScenario
  setScenarioData: SetScenarioData
  setSelectedLessonId: SetLessonId
  setTtsAvgChars: SetTtsAvgChars
  setTtsBudget: SetTtsBudget
  setTtsCharUsage: SetTtsCharUsage
  setUseCloudTTS: SetUseCloudTTS
  ttsAvgChars: TtsAvgChars
  ttsBudget: TtsBudget
  ttsCharUsage: TtsCharUsage
  useCloudTTS: UseCloudTTS
}

export type LessonComplete = boolean

export const LANGUAGE = {
  SPANISH: 'Latin American Spanish',
  ENGLISH: 'English',
  FRENCH: 'French',
  ITALIAN: 'Italian'
} as const
export type LanguageValue = (typeof LANGUAGE)[keyof typeof LANGUAGE]
export type LanguageKey = keyof typeof LANGUAGE
export type Language = LanguageValue

export const MODULE_NAME = {
  DIALOG: 'dialog',
  NOUNS: 'nouns',
  NOUNS_ONLY: 'nounsOnly',
  VERBS: 'verbs',
  VERBS_ONLY: 'verbsOnly',
  DIALOG_REVIEW: 'dialogReview',
  NOUNS_REVIEW: 'nounsReview',
  NOUNS_ONLY_REVIEW: 'nounsOnlyReview',
  VERBS_REVIEW: 'verbsReview',
  VERBS_ONLY_REVIEW: 'verbsOnlyReview',
  VERBS_EXPANDED_INCOMPLETE: 'verbsExpandedInComplete',
  VERBS_EXPANDED_COMPLETE: 'verbsExpandedComplete',
  VERBS_EXPANDED_TRIPLE: 'verbsExpandedTriple'
} as const
export type ModuleNameValue = (typeof MODULE_NAME)[keyof typeof MODULE_NAME]
export type ModuleNameKey = keyof typeof MODULE_NAME
export type ModuleName = ModuleNameValue

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

export const languageCode = {
  [LANGUAGE.ENGLISH]: 'en',
  [LANGUAGE.SPANISH]: 'es',
  [LANGUAGE.ITALIAN]: 'it',
  [LANGUAGE.FRENCH]: 'fr'
}

export type Answer = string
export type ApiKey = string
export type AudioUrl = string | null
export type CleanedText = string
export type GcpKey = string
export type HelpPanel = ActivePanel
export type InputText = string
export type IsHelpOpen = boolean
export type IsTransitioning = boolean
export type MaskKey = boolean
export type MaskOpenAiKey = boolean
export type OpenAiAvgTokens = number
export type OpenAiBudget = number
export type OpenAiKey = string
export type OpenAiUsage = number
export type Question = string
export type QuestionContext = string

export type SetActiveHome = React.Dispatch<React.SetStateAction<ActiveHome>>
export type SetActivePanel = React.Dispatch<React.SetStateAction<ActivePanel>>
export type SetAnswer = React.Dispatch<React.SetStateAction<Answer>>
export type SetApiKey = React.Dispatch<React.SetStateAction<ApiKey>>
export type SetAudioUrl = React.Dispatch<React.SetStateAction<AudioUrl>>
export type SetCleanedText = React.Dispatch<React.SetStateAction<CleanedText>>
export type SetCutoff = React.Dispatch<React.SetStateAction<Cutoff>>
export type SetDialogPrompt = React.Dispatch<React.SetStateAction<Prompt>>
export type SetGcpKey = React.Dispatch<React.SetStateAction<GcpKey>>
export type SetGenerateTTSCount = React.Dispatch<React.SetStateAction<GenerateTTSCount>>
export type SetHandleDialogErrors = React.Dispatch<React.SetStateAction<HandleDialogErrors>>
export type SetHandleNounsErrors = React.Dispatch<React.SetStateAction<HandleNounsErrors>>
export type SetHandleVerbsErrors = React.Dispatch<React.SetStateAction<HandleVerbsErrors>>
export type SetHelpPanel = React.Dispatch<React.SetStateAction<HelpPanel>>
export type SetInputText = React.Dispatch<React.SetStateAction<InputText>>
export type SetIsHelpOpen = React.Dispatch<React.SetStateAction<IsHelpOpen>>
export type SetIsTransitioning = React.Dispatch<React.SetStateAction<IsTransitioning>>
export type SetLanguage = React.Dispatch<React.SetStateAction<Language>>
export type SetLessonId = React.Dispatch<React.SetStateAction<LessonId>>
export type SetLessons = React.Dispatch<React.SetStateAction<Lessons>>
export type SetMaskKey = React.Dispatch<React.SetStateAction<MaskKey>>
export type SetMaskOpenAiKey = React.Dispatch<React.SetStateAction<MaskOpenAiKey>>
export type SetMaxCount = React.Dispatch<React.SetStateAction<MaxCount>>
export type SetNounsPrompt = React.Dispatch<React.SetStateAction<Prompt>>
export type SetOpenAiAvgTokens = React.Dispatch<React.SetStateAction<OpenAiAvgTokens>>
export type SetOpenAiBudget = React.Dispatch<React.SetStateAction<OpenAiBudget>>
export type SetOpenAiKey = React.Dispatch<React.SetStateAction<OpenAiKey>>
export type SetOpenAiUsage = React.Dispatch<React.SetStateAction<OpenAiUsage>>
export type SetQuestion = React.Dispatch<React.SetStateAction<Question>>
export type SetQuestionContext = React.Dispatch<React.SetStateAction<QuestionContext>>
export type SetScenario = React.Dispatch<React.SetStateAction<Scenario>>
export type SetScenarioData = React.Dispatch<React.SetStateAction<ScenarioData>>
export type SetTtsAvgChars = React.Dispatch<React.SetStateAction<TtsAvgChars>>
export type SetTtsBudget = React.Dispatch<React.SetStateAction<TtsBudget>>
export type SetTtsCharUsage = React.Dispatch<React.SetStateAction<TtsCharUsage>>
export type SetUseCloudTTS = React.Dispatch<React.SetStateAction<UseCloudTTS>>

export type SwitchPanel = (newPanel: ActivePanel) => void

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
export type GenAIStep = GenAIStepValue

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
export type ActivePanelValue = (typeof APP_PANEL)[keyof typeof APP_PANEL]
export type ActivePanelKey = keyof typeof APP_PANEL
export type ActivePanel = ActivePanelValue

export const APP_HOME = APP_PANEL
export type ActiveHomeValue = (typeof APP_HOME)[keyof typeof APP_HOME]
export type ActiveHomeKey = keyof typeof APP_HOME
export type ActiveHome = ActiveHomeValue

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

export type ScenarioDescription = string
export type ScenarioDescriptions = Record<Scenario, ScenarioDescription>

export type Success = boolean

export type Module = {
    lines: Lines
    prompt: Prompt
    signature: Signature
    errors: HandleLLMError[]
    success: Success
    sentinel: Sentinel
    moduleProse: Prose
}

export type Name = string
export type Description = string

export type Lesson = {
  id: LessonId
  name: Name
  description: Description

  language: Language
  scenario: Scenario
  participantList: ParticipantProse
  prose: Prose
  signature: Signature

  dialog: Module
  nouns: Module
  nounsOnly: Module
  verbs: Module
  verbsOnly: Module
  dialogReview: Module
  nounsReview: Module
  nounsOnlyReview: Module
  verbsReview: Module
  verbsOnlyReview: Module
  verbsExpandedComplete: Module
  verbsExpandedInComplete: Module
  verbsExpandedTriple: Module
}

export type LessonId = number
export type SelectedLessonId = LessonId

export type Lessons = Lesson[]

export type GenerateTTSCount = number

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

export type Line = string
export type Lines = Line[]

export type DialogLine = string
export type DialogLines = DialogLine[]
export type SetDialogLines = React.Dispatch<React.SetStateAction<DialogLines>>

export type NounsLine = string
export type NounsLines = NounsLine[]
export type SetNounsLines = React.Dispatch<React.SetStateAction<NounsLines>>

export type VerbsLine = string
export type VerbsLines = VerbsLine[]
export type SetVerbsLines = React.Dispatch<React.SetStateAction<VerbsLines>>

export type Verb = string
export type Verbs = Verb[]

export type Noun = string
export type Nouns = Noun[]

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
export type Prose = string

export type DialogReview = string
export type NounsReview = string
export type VerbsReview = string

export type TestMode = boolean
export type JsonQualification = string
export type Prompt = string

export type HandleModuleProps = {
  testMode: TestMode
  lesson: Lesson
  moduleName: ModuleName
}

export type HandleDialogProps = {
  testMode: TestMode
  lesson: Lesson
  setLesson: SetLesson
  moduleName: ModuleName
}

export type HandleNounsProps = {
  testMode: TestMode
  lesson: PartialLesson
  setLesson: SetLesson
}

export type HandleVerbsProps = {
  testMode: TestMode
  lesson: PartialLesson
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

export type GetPromptProps = {
  lesson: Lesson
  errors: HandleLLMError[]
}

export type GetDialogPromptProps = GetPromptProps
export type GetDialogReviewPromptProps = GetPromptProps
export type GetNounsPromptProps = GetPromptProps
export type GetNounsReviewPromptProps = GetPromptProps
export type GetNounsOnlyPromptProps = GetPromptProps
export type GetNounsOnlyReviewPromptProps = GetPromptProps
export type GetVerbsExpandedCompletePromptProps = GetPromptProps
export type GetVerbsPromptProps = GetPromptProps
export type GetVerbsReviewPromptProps = GetPromptProps
export type GetVerbsOnlyPromptProps = GetPromptProps
export type GetVerbsOnlyReviewPromptProps = GetPromptProps

export type GetDialogPrompt = (props: GetDialogPromptProps) => string
export type GetDialogReviewPrompt = (props: GetDialogReviewPromptProps) => string
export type GetNounsPrompt = (props: GetNounsPromptProps) => string
export type GetNounsReviewPrompt = (props: GetNounsReviewPromptProps) => string
export type GetNounsOnlyPrompt = (props: GetNounsOnlyPromptProps) => string
export type GetNounsOnlyReviewPrompt = (props: GetNounsOnlyReviewPromptProps) => string
export type GetVerbsExpandedCompletePrompt = (props: GetVerbsExpandedCompletePromptProps) => string
export type GetVerbsPrompt = (props: GetVerbsPromptProps) => string
export type GetVerbsReviewPrompt = (props: GetVerbsReviewPromptProps) => string
export type GetVerbsOnlyPrompt = (props: GetVerbsOnlyPromptProps) => string
export type GetVerbsOnlyReviewPrompt = (props: GetVerbsOnlyReviewPromptProps) => string

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

export const scenarioLabels: ScenarioLabels = {
  restaurant: 'at the restaurant',
  hotel: 'at the hotel',
  airport: 'at the airport',
  taxi: 'in a taxi',
  custom: 'custom'
}

export const NOUN_ARTICLES = {
  LA: 'la',
  EL: 'el'
}
export type NounArticlesValue = (typeof NOUN_ARTICLES)[keyof typeof NOUN_ARTICLES]
export type NounArticlesKey = keyof typeof NOUN_ARTICLES
export type NounArticles = NounArticlesValue

export const GENDER_TO_ARTICLE: Record<'F' | 'M', NounArticlesValue> = {
  F: NOUN_ARTICLES.LA,
  M: NOUN_ARTICLES.EL
}

export const ERROR_LABEL = {
  NO_ERROR: 'noError',
  DIALOG_ERROR: 'handleDialogError',
  NOUNS_ERROR: 'handleNounsError',
  NOUNS_ONLY_ERROR: 'handleNounsOnlyError',
  VERBS_ERROR: 'handleVerbsError',
  VERBS_ONLY_ERROR: 'handleVerbsOnlyError',
  DIALOG_REVIEW_ERROR: 'handleDialogReviewError',
  NOUNS_REVIEW_ERROR: 'handleNounsReviewError',
  NOUNS_ONLY_REVIEW_ERROR: 'handleNounsOnlyReviewError',
  VERBS_REVIEW_ERROR: 'handleVerbsReviewError',
  VERBS_REVIEW_ONLY_ERROR: 'handleVerbsOnlyReviewError',
  VERBS_EXPANDED_ERROR: 'handleVerbsExpandedError',
  VERBS_EXPANDED_INCOMPLETE_ERROR: 'handleVerbsExpandedInCompleteError',
  VERBS_EXPANDED_COMPLETE_ERROR: 'handleVerbsExpandedCompleteError'
} as const
export type ErrorLabelValue = (typeof ERROR_LABEL)[keyof typeof ERROR_LABEL]
export type ErrorLabelKey = keyof typeof ERROR_LABEL
export type ErrorLabel = ErrorLabelValue

export const defaultErrorLabel = ERROR_LABEL.NO_ERROR
export const defaultFieldCount = 0
export const defaultLines = []
export const defaultPrompt = ''
export const defaultSignature = ''
export const defaultErrors = []
export const defaultSentinel = ''
export const defaultProse = ''
export const defaultModuleName = MODULE_NAME.DIALOG
export const defaultScenarioLabel = scenarioLabels[SCENARIO.RESTAURANT]
export const defaultLanguage = LANGUAGE.SPANISH
export const defaultParticipantList = ''
export const defaultMaxCount = 20
export const defaultScenario = SCENARIO.RESTAURANT

export const defaultModule: Module = {
  lines: defaultLines,
  prompt: defaultPrompt,
  errors: defaultErrors,
  signature: defaultSignature,
  success: false,
  sentinel: defaultSentinel,
  moduleProse: defaultProse
}

export const defaultLesson: Lesson = {
  language: defaultLanguage,
  scenario: defaultScenario,
  signature: defaultSignature,
  id: 1,
  name: "Default Lesson",
  description: "Default Lesson - Starter Details",
  participantList: defaultParticipantList,
  prose: defaultProse,

  dialog: defaultModule,
  nouns: defaultModule,
  nounsOnly: defaultModule,
  verbs: defaultModule,
  verbsOnly: defaultModule,
  dialogReview: defaultModule,
  nounsReview: defaultModule,
  nounsOnlyReview: defaultModule,
  verbsReview: defaultModule,
  verbsOnlyReview: defaultModule,
  verbsExpandedComplete: defaultModule,
  verbsExpandedInComplete: defaultModule,
  verbsExpandedTriple: defaultModule
}

export const dXfaultNounsLines: NounsLines = [
    "masculino|restaurante|restaurantes|a, en, desde, sobre",
    "femenino|noche|noches|en, durante, por",
    "femenino|ensalada|ensaladas|con, sin, de, para",
    "masculino|pollo|pollos|con, sin, de, para"
  ]

// export const dXfaultVerbs: Verbs[] = [
//   "desear",
//   "tomar"
// ]

export const dXfaultVerbsLines: VerbsLines = [
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

export const scenarioDescriptions: ScenarioDescriptions = {
  restaurant: 'for a dining situation — at a restaurant with hosts, waiters, and other guests',
  hotel: 'for a lodging situation — checking into a hotel, speaking with staff, or addressing room needs',
  airport: 'for a travel scenario — navigating an airport, speaking to agents, or boarding a flight',
  taxi: 'for ground transportation — riding in a taxi, using a rideshare, or talking to a driver',
  custom: 'for a custom situation'
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
  errorLabel: ErrorLabel
  timestamp: string
}

export type HandleDialogError = HandleLLMError
export type HandleNounsError = HandleLLMError
export type HandleVerbsError = HandleLLMError

export type HandleDialogErrors = HandleDialogError[]
export type HandleNounsErrors = HandleNounsError[]
export type HandleVerbsErrors = HandleVerbsError[]

export type AddErrorProps = {
  errorLabel: ErrorLabel
  setErrors: React.Dispatch<React.SetStateAction<HandleLLMError[]>>
  error: HandleLLMError
}

export type ValidateGenAIResponseProps = {
  response: string | null,
  errorLabel: ErrorLabel,
  fieldCount: number
  lesson: Lesson
}

export type ValidateModuleProps = {
  response: string | null,
  errorLabel: ErrorLabel,
  fieldCount: number
  language: Language
  moduleName: ModuleName
}

export type ValidateGenAIResponsePropsOLD = {
  response: string | null,
  errorLabel: ErrorLabel,
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
  lesson: PartialLesson
}

export type PartialLesson = Partial<Lesson>

export type GetNounsResult = {
  lesson: PartialLesson
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

export type GetConstraintsProps = {
  language: Language
  scenario: Scenario
}

export type GenerateExampleProps = {
  language: Language
  moduleName: ModuleName
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

export type GetDialogProps = {
  testMode: TestMode,
  lesson: Lesson,
}
  
export type GetPartialLessonProps = {
  testMode: TestMode,
  partialLesson: PartialLesson
}
  
export type GetModuleProps = {
  testMode: TestMode,
  lesson: Lesson
  moduleName: ModuleName
}
  
export type GetNounsProps = {
  testMode: TestMode,
  lesson: Lesson
}
  
export type GetVerbsProps = {
  testMode: TestMode,
  lesson: Lesson
}
  

export type LessonBank = Record<string, Lesson> // key = unique ID or label
export type StoredLessons = Record<string, Lesson>

export const pronouns = [
  'yo',
  'tú',
  'él/ella/usted',
  'nosotros/nosotras',
  'vosotros/vosotras',
  'ellos/ellas/ustedes'
]

export const pronounsUpperCase: string[][] = [
  ['Yo'],
  ['Tú'],
  ['Él', 'Ella', 'Usted'],
  ['Nosotros', 'Nosotras'],
  ['Vosotros', 'Vosotras'],
  ['Ellos', 'Ellas', 'Ustedes']
]

export const VERB_FORMATS = {
  INFINITE: "infinitive",
  CONJUGATION: "conjugation",
  PRONOUN: "pronoun",
  PRONOUN_AND_CONJUGATION: "pronounAndConjugation",
  INCOMPLETE: "incomplete",
  COMPLETE: "complete",
  TRIPLE: "triple"
 } as const
export type VerbFormatsValue = (typeof VERB_FORMATS)[keyof typeof VERB_FORMATS]
export type VerbFormatsKey = keyof typeof VERB_FORMATS
export type VerbFormats = VerbFormatsValue

export type MaxCount = number
export type Cutoff = boolean

export type FetchTTSProps = {
  text: string
  gender?: string
  maxCount: number
  setMaxCount: SetMaxCount
  cutoff: boolean
}
export type FetchTTSResult = string | null

export type NounRecord = {
  noun_singular: string
  noun_plural: string
  noun_gender: 'M' | 'F'
  noun_article: 'el' | 'la'
}

export type VerbRecord = {
  verb_infinitive: string
  verb_yo: string
  verb_tu: string
  verb_el_ella_usted: string
  verb_nosotros: string
  verb_vosotros: string
  verb_ellos_ellas_ustedes: string
}

export type NounDetails = {
  noun_base: string
  noun_singular: string
  noun_plural: string
  noun_gender: 'M' | 'F'
}

export type VerbDetails = {
  verb_infinitive: string
  verb_yo: string
  verb_tu: string
  verb_el_ella_usted: string
  verb_nosotros: string
  verb_vosotros: string
  verb_ellos_ellas_ustedes: string
}

export type ScenarioData = {
  nouns: NounDetails[]
  verbs: VerbDetails[]
  nounBySingular: Map<string, NounDetails>
  nounByPlural: Map<string, NounDetails>
  singularNounList: string[]
  verbByInfinitive: Map<string, VerbDetails>
}

export const defaultScenarioData: ScenarioData = {
  nouns: [],
  verbs: [],
  nounBySingular: new Map(),
  nounByPlural: new Map(),
  singularNounList: [],
  verbByInfinitive: new Map()
}

export type HandleGetScenarioDataProps = {
  scenario: Scenario,
  language: Language
}

