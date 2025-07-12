// import { generateSignature } from '@shared/generateSignature'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'

import {
  APP_HOME,
  VERB_FORMATS,
  NOUN_ARTICLES,
  APP_PANEL,
  GEN_AI_STEP,
  SCENARIO,
  LANGUAGE,
  MODULE_NAME,
  ERROR_LABEL,
  GENDER,
  SCENARIO_LABELS,
  CURATED,
  PIPELINE_TYPE,
  LESSON_PROMPT_STYLE,
  GEN_AI_PROVIDER,
  MARKETING_PREFERENCE,
  PAYWALL_TIER,
  PAYWALL_PACKAGE
} from './constants.js'

export type UserData = {
  email_user_key: string
  email_user_client_uuid: ClientUUID,
  email_user_flex_lesson: FlexLesson,
  email_user_current_lesson: Lesson,
  email_user_lessons: Lessons,
  email_user_lesson_number: LessonNumber,
  email_user_lesson_prompt: Prompt,
  email_user_lesson_timestamp: LessonTimestamp,
  email_user_created_at: string,
  email_user_updated_at: string
}

export type IsUserValidated = boolean
export type CookedEmail = string
export type VerificationToken = string

export type LessonComplete = boolean

export type GenAIProviderKey = keyof typeof GEN_AI_PROVIDER
export type GenAIProviderValue = (typeof GEN_AI_PROVIDER)[GenAIProviderKey]
export type GenAIProvider = GenAIProviderValue

export type LessonPromptStyleValue = (typeof LESSON_PROMPT_STYLE)[keyof typeof LESSON_PROMPT_STYLE]
export type LessonPromptStyleKey = keyof typeof LESSON_PROMPT_STYLE
export type LessonPromptStyle = LessonPromptStyleValue

export type LanguageValue = (typeof LANGUAGE)[keyof typeof LANGUAGE]
export type LanguageKey = keyof typeof LANGUAGE
export type Language = LanguageValue

export type ModuleNameValue = (typeof MODULE_NAME)[keyof typeof MODULE_NAME]
export type ModuleNameKey = keyof typeof MODULE_NAME
export type ModuleName = ModuleNameValue

export type ScenarioValue = (typeof SCENARIO)[keyof typeof SCENARIO]
export type ScenarioKey = keyof typeof SCENARIO
export type Scenario = ScenarioValue

export type Answer = string
export type ApiKey = string
export type AudioUrl = string | null
export type CleanedText = string
export type GcpKey = string
export type HelpPanel = ActivePanel
export type InputText = string
export type IsHelpOpen = boolean
export type IsMenuOpen = boolean
export type IsProfileOpen = boolean
export type IsTransitioning = boolean
export type MaskKey = boolean
export type MaskOpenAiKey = boolean
export type OpenAiAvgTokens = number
export type OpenAiBudget = number
export type OpenAiKey = string
export type OpenAiUsage = number
export type Question = string
export type QuestionContext = string
export type LineNumber = number
export type DebugMode = boolean
export type LessonPrompt = string
export type FlexLesson = string
export type FormattedFlexLesson = Lines
export type IsComplete = boolean
export type ActivateLessonBar = boolean
export type ShowIsUserValidatedModal = boolean
export type LessonName = string

export type SetActivateLessonBar = React.Dispatch<React.SetStateAction<ActivateLessonBar>>
export type SetActiveHome = React.Dispatch<React.SetStateAction<ActiveHome>>
export type SetActivePanel = React.Dispatch<React.SetStateAction<ActivePanel>>
export type SetAnswer = React.Dispatch<React.SetStateAction<Answer>>
export type SetApiKey = React.Dispatch<React.SetStateAction<ApiKey>>
export type SetAudioUrl = React.Dispatch<React.SetStateAction<AudioUrl>>
export type SetCleanedText = React.Dispatch<React.SetStateAction<CleanedText>>
export type SetClientEmail = React.Dispatch<React.SetStateAction<ClientEmail>>
export type SetClientMeter = React.Dispatch<React.SetStateAction<ClientMeter>>
export type SetClientSignature = React.Dispatch<React.SetStateAction<ClientSignature>>
export type SetClientUUID = React.Dispatch<React.SetStateAction<ClientUUID>>
export type SetCookedEmail = React.Dispatch<React.SetStateAction<CookedEmail>>
export type SetCustomParticipantList = React.Dispatch<React.SetStateAction<CustomParticipantList>>
export type SetCustomScenario = React.Dispatch<React.SetStateAction<CustomScenario>>
export type SetCustomSeed = React.Dispatch<React.SetStateAction<CustomSeed>>
export type SetCutoff = React.Dispatch<React.SetStateAction<Cutoff>>
export type SetDebugMode = React.Dispatch<React.SetStateAction<DebugMode>>
export type SetFlexLesson = React.Dispatch<React.SetStateAction<FlexLesson>>
export type SetFormattedFlexLesson = React.Dispatch<React.SetStateAction<FormattedFlexLesson>>
export type SetGcpKey = React.Dispatch<React.SetStateAction<GcpKey>>
export type SetGenerateTTSCount = React.Dispatch<React.SetStateAction<GenerateTTSCount>>
export type SetHandleDialogErrors = React.Dispatch<React.SetStateAction<HandleDialogErrors>>
export type SetHandleNounsErrors = React.Dispatch<React.SetStateAction<HandleNounsErrors>>
export type SetHandleVerbsErrors = React.Dispatch<React.SetStateAction<HandleVerbsErrors>>
export type SetHelpPanel = React.Dispatch<React.SetStateAction<HelpPanel>>
export type SetInputText = React.Dispatch<React.SetStateAction<InputText>>
export type SetIsHelpOpen = React.Dispatch<React.SetStateAction<IsHelpOpen>>
export type SetIsMenuOpen = React.Dispatch<React.SetStateAction<IsMenuOpen>>
export type SetIsProfileOpen = React.Dispatch<React.SetStateAction<IsProfileOpen>>
export type SetIsUserValidated = React.Dispatch<React.SetStateAction<IsUserValidated>>
export type SetIsTransitioning = React.Dispatch<React.SetStateAction<IsTransitioning>>
export type SetLessonComplete = React.Dispatch<React.SetStateAction<LessonComplete>>
export type SetLessonName = React.Dispatch<React.SetStateAction<LessonName>>
export type SetLessonNumber = React.Dispatch<React.SetStateAction<LessonNumber>>
export type SetLessonPrompt = React.Dispatch<React.SetStateAction<LessonPrompt>>
export type SetLessonPromptStyle = React.Dispatch<React.SetStateAction<LessonPromptStyle>>
export type SetLessonTimestamp = React.Dispatch<React.SetStateAction<LessonTimestamp>>
export type SetLessons = React.Dispatch<React.SetStateAction<Lessons>>
export type SetLineNumber = React.Dispatch<React.SetStateAction<LineNumber>>
export type SetMaskKey = React.Dispatch<React.SetStateAction<MaskKey>>
export type SetMaskOpenAiKey = React.Dispatch<React.SetStateAction<MaskOpenAiKey>>
export type SetMaxCount = React.Dispatch<React.SetStateAction<MaxCount>>
export type SetOpenAiAvgTokens = React.Dispatch<React.SetStateAction<OpenAiAvgTokens>>
export type SetOpenAiBudget = React.Dispatch<React.SetStateAction<OpenAiBudget>>
export type SetOpenAiKey = React.Dispatch<React.SetStateAction<OpenAiKey>>
export type SetOpenAiUsage = React.Dispatch<React.SetStateAction<OpenAiUsage>>
export type SetQuestion = React.Dispatch<React.SetStateAction<Question>>
export type SetQuestionContext = React.Dispatch<React.SetStateAction<QuestionContext>>
export type SetScenario = React.Dispatch<React.SetStateAction<Scenario>>
export type SetShowIsUserValidatedModal = React.Dispatch<React.SetStateAction<ShowIsUserValidatedModal>>
export type SetSourceLanguage = React.Dispatch<React.SetStateAction<Language>>
export type SetTargetLanguage = React.Dispatch<React.SetStateAction<Language>>
export type SetTtsAvgChars = React.Dispatch<React.SetStateAction<TtsAvgChars>>
export type SetTtsBudget = React.Dispatch<React.SetStateAction<TtsBudget>>
export type SetTtsCharUsage = React.Dispatch<React.SetStateAction<TtsCharUsage>>
export type SetUseCloudTTS = React.Dispatch<React.SetStateAction<UseCloudTTS>>
export type SetUseMyself = React.Dispatch<React.SetStateAction<UseMyself>>
export type SetUserData = React.Dispatch<React.SetStateAction<UserData>>
export type SetPaywall = React.Dispatch<React.SetStateAction<Paywall>>
export type SetVerificationToken = React.Dispatch<React.SetStateAction<VerificationToken>>

export type SwitchPanel = (newPanel: ActivePanel) => void

export type TtsAvgChars = number
export type TtsBudget = number
export type TtsCharUsage = number
export type UseCloudTTS = boolean

export type IsActive = boolean

export type GenAIStepValue = (typeof GEN_AI_STEP)[keyof typeof GEN_AI_STEP]
export type GenAIStepKey = keyof typeof GEN_AI_STEP
export type GenAIStep = GenAIStepValue

export type ActivePanelValue = (typeof APP_PANEL)[keyof typeof APP_PANEL]
export type ActivePanelKey = keyof typeof APP_PANEL
export type ActivePanel = ActivePanelValue

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
    // signature: Signature
    errors: HandleLLMError[]
    success: Success
    sentinel: Sentinel
    moduleProse: Prose
    linesResolutions: Lines
    moduleDurationMs: number
}

export type Name = string
export type Description = string

export type Translation = Record<Language, Lines>

export type Lesson = {
  id: LessonId
  clientUUID: ClientUUID
  number: LessonNumber
  timestamp: LessonTimestamp
  name: Name
  description: Description
  isComplete: IsComplete

  targetLanguage: Language
  sourceLanguage: Language
  scenario: Scenario
  participantList: ParticipantProse
  prose: Prose
  // signature: Signature

  lessonName: LessonName
  lessonPrompt: LessonPrompt
  lessonPromptStyle: LessonPromptStyle
  flexLesson: FlexLesson
  formattedFlexLesson: Lines

  translation: Translation

  dialogDraft: Module
  dialogReview: Module
  dialogResolve: Module

  nounsDraft: Module
  nounsReview: Module
  nounsResolve: Module

  translationDraft: Module
  translationReview: Module
  translationResolve: Module

  verbsDraft: Module
  verbsReview: Module
  verbsResolve: Module

  verbsExpandedComplete: Module
  verbsExpandedInComplete: Module
  verbsExpandedTriple: Module

  errorModule: Module
}

export type LessonId = string
export type LessonTimestamp = string
export type LessonNumber = number
export type SelectedLessonNumber = LessonNumber

export type Lessons = Lesson[]

export type GenerateTTSCount = number

export type SetLesson = React.Dispatch<React.SetStateAction<Lesson>>

export type ChooseParticipantLinesProps = {
  participantLines: ParticipantLines // ByLanguage: ParticipantLinesByLanguage
  n: number
  useMyself: UseMyself
  targetLanguage: Language
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

export type GetJsonQualificationWithExampleProps = {
  responseType: string
  example: string
}
export type GetJsonQualificationProps = {
  responseType: string
}
export type JsonQualification = string

export type TestMode = boolean
export type Prompt = string

export type HandleModuleProps = {
  testMode: TestMode
  lesson: Lesson
  moduleName: ModuleName
}

export type ClientUUID = string
export type ClientMeter = number
export type ClientSignature = string

export type CustomScenario = string
export type CustomSeed = string
export type CustomParticipantList = string

export const defaultLessonPromptStyle: LessonPromptStyle = LESSON_PROMPT_STYLE.DIALOG
export const defaultFlexLesson: FlexLesson = ''
export const defaultCustomSeed: CustomSeed = ''
export const defaultCustomScenario: CustomScenario = ''
export const defaultCustomParticipantList: CustomParticipantList = ''
export const defaultLessonName = ''
export const defaultFormattedFlexLesson = []

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

export type GetDialogDraftPrompt = (props: GetDialogDraftPromptProps) => string
export type GetDialogDraftPromptProps = GetPromptProps
export type GetDialogReviewPrompt = (props: GetDialogReviewPromptProps) => string
export type GetDialogReviewPromptProps = GetPromptProps

export type GetNounsDraftPrompt = (props: GetNounsDraftPromptProps) => string
export type GetNounsDraftPromptProps = GetPromptProps
export type GetNounsReviewPrompt = (props: GetNounsReviewPromptProps) => string
export type GetNounsReviewPromptProps = GetPromptProps

export type GetTranslationDraftPrompt = (props: GetTranslationDraftPromptProps) => string
export type GetTranslationDraftPromptProps = GetPromptProps
export type GetTranslationReviewPrompt = (props: GetTranslationReviewPromptProps) => string
export type GetTranslationReviewPromptProps = GetPromptProps

export type GetVerbsDraftPrompt = (props: GetVerbsDraftPromptProps) => string
export type GetVerbsDraftPromptProps = GetPromptProps
export type GetVerbsReviewPrompt = (props: GetVerbsReviewPromptProps) => string
export type GetVerbsReviewPromptProps = GetPromptProps

export type GetVerbsExpandedCompletePrompt = (props: GetVerbsExpandedCompletePromptProps) => string
export type GetVerbsExpandedCompletePromptProps = GetPromptProps

export const defaultTranslation: Translation = {
  [LANGUAGE.ENGLISH]: [],
  [LANGUAGE.SPANISH]: [],
  [LANGUAGE.FRENCH]: [],
  [LANGUAGE.ITALIAN]: []
}

export const defaultDialogLines: DialogLines = [
  'Mesero: Buenas tardes. ¿Qué desea tomar?',
  'Cliente: Una limonada, por favor.',
  'Mesero: En seguida.'
]

export const defaultDialogReviewLines: DialogLines = [
  'Mesero: Buenas tardes. ¿Qué desea tomar?|Mesero: Buenas tardes, ¿qué le gustaría tomar?',
  'Cliente: Una limonada, por favor.|Cliente: Me gustaría una limonada, por favor.',
  'Mesero: En seguida.|Mesero: En un momento le traigo su bebida.'
]

export type PipelineTypeValue = (typeof PIPELINE_TYPE)[keyof typeof PIPELINE_TYPE]
export type PipelineTypeKey = keyof typeof PIPELINE_TYPE
export type PipelineType = PipelineTypeValue

export type NounArticlesValue = (typeof NOUN_ARTICLES)[keyof typeof NOUN_ARTICLES]
export type NounArticlesKey = keyof typeof NOUN_ARTICLES
export type NounArticles = NounArticlesValue

export type ErrorLabelValue = (typeof ERROR_LABEL)[keyof typeof ERROR_LABEL]
export type ErrorLabelKey = keyof typeof ERROR_LABEL
export type ErrorLabel = ErrorLabelValue

export const defaultLessonPrompt = ''

export const defaultErrors = []
export const defaultFieldCount = 0
export const defaultLines = []
export const defaultLinesResolution = []
export const defaultFormatDialogLines = []
export const defaultMaxCount = 20
export const defaultModuleName = MODULE_NAME.DIALOG_DRAFT
export const defaultParticipantList = ''
export const defaultPrompt = ''
export const defaultProse = ''
export const defaultScenario = SCENARIO.RESTAURANT
export const defaultScenarioLabel = SCENARIO_LABELS[SCENARIO.RESTAURANT]
export const defaultSentinel = ''
export const defaultSignature = ''
export const defaultSourceLanguage = LANGUAGE.ENGLISH
export const defaultTargetLanguage = LANGUAGE.SPANISH

export const defaultModule: Module = {
  lines: defaultLines,
  prompt: defaultPrompt,
  errors: defaultErrors,
  success: false,
  sentinel: defaultSentinel,
  moduleProse: defaultProse,
  linesResolutions: defaultLines,
  moduleDurationMs: 0
}

export const defaultLesson: Lesson = {
  id: '',
  number: 1,
  clientUUID: '',
  timestamp: '',
  isComplete: false,

  name: 'Default Lesson',
  description: 'Default Lesson - Starter Details',

  targetLanguage: defaultTargetLanguage,
  sourceLanguage: defaultSourceLanguage,
  scenario: defaultScenario,
  // signature: defaultSignature,

  participantList: defaultParticipantList,
  prose: defaultProse,

  lessonPrompt: defaultLessonPrompt,
  lessonPromptStyle: defaultLessonPromptStyle,
  lessonName: defaultLessonName,
  flexLesson: defaultFlexLesson,
  formattedFlexLesson: defaultFormattedFlexLesson,

  translation: defaultTranslation,

  dialogDraft: defaultModule,
  dialogReview: defaultModule,
  dialogResolve: defaultModule,

  nounsDraft: defaultModule,
  nounsReview: defaultModule,
  nounsResolve: defaultModule,

  translationDraft: defaultModule,
  translationReview: defaultModule,
  translationResolve: defaultModule,
  
  verbsDraft: defaultModule,
  verbsReview: defaultModule,
  verbsResolve: defaultModule,

  // nounsMissing: defaultModule,
  // nounsMissingReview: defaultModule,
  // nounsOnly: defaultModule,
  // nounsOnlyMissing: defaultModule,
  // nounsOnlyReview: defaultModule,
  verbsExpandedComplete: defaultModule,
  verbsExpandedInComplete: defaultModule,
  verbsExpandedTriple: defaultModule,
  // verbsMissing: defaultModule,
  // verbsMissingReview: defaultModule,
  // verbsOnly: defaultModule,
  // verbsOnlyMissing: defaultModule,
  // verbsOnlyReview: defaultModule

  errorModule: defaultModule
}

export const defaultKey = ''
export const defaultCookedEmail = ''
export const defaultClientUUID = ''
export const defaultLessonNumber = 0
export const defaultLessonTimestamp = ''
export const defaultCreatedAt = ''
export const defaultUpdatedAt = ''

export const defaultUserData = {
  email_user_key: defaultKey,
  email_user_client_uuid: defaultClientUUID,
  email_user_flex_lesson: defaultFlexLesson,
  email_user_current_lesson: defaultLesson,
  email_user_lessons: [],
  email_user_lesson_number: defaultLessonNumber,
  email_user_lesson_prompt: defaultPrompt,
  email_user_lesson_timestamp: defaultLessonTimestamp,
  email_user_created_at: defaultCreatedAt,
  email_user_updated_at: defaultUpdatedAt
}

export const dXfaultNounsLines: NounsLines = [
    'masculino|restaurante|restaurantes|a, en, desde, sobre',
    'femenino|noche|noches|en, durante, por',
    'femenino|ensalada|ensaladas|con, sin, de, para',
    'masculino|pollo|pollos|con, sin, de, para'
  ]

// export const dXfaultVerbs: Verbs[] = [
//   'desear',
//   'tomar'
// ]

export const dXfaultVerbsLines: VerbsLines = [
  'gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta',
  'ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan',
  'pedir|pido|pides|pide|pedimos|pedís|piden',
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
  taxi: 'for a situation involving ground transportation — riding in a taxi, using a rideshare, or talking to a driver',
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
  useMyself: UseMyself
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

export type GenderValue = (typeof GENDER)[keyof typeof GENDER]
export type GenderKey = keyof typeof GENDER
export type Gender = GenderValue

export type CuratedValue = (typeof CURATED)[keyof typeof CURATED]
export type CuratedKey = keyof typeof CURATED
export type Curated = CuratedValue

export type VerbFormatsValue = (typeof VERB_FORMATS)[keyof typeof VERB_FORMATS]
export type VerbFormatsKey = keyof typeof VERB_FORMATS
export type VerbFormats = VerbFormatsValue

export type MaxCount = number
export type Cutoff = boolean

export type FetchTTSProps = {
  text: string
  speaker: string
  gender: string
  maxCount: number
  setMaxCount: SetMaxCount
  cutoff: boolean
  language: Language
  debugLog: DebugLog
}
export type FetchTTSResult = string | null

export type NounRecord = {
  noun_base: Noun
  noun_singular: Noun
  noun_plural: Noun
  noun_gender: Gender
  noun_article: 'el' | 'la'
  curated: Curated
}

export type VerbRecord = {
  verb_base: string
  verb_infinitive: string
  verb_yo: string
  verb_tu: string
  verb_el_ella_usted: string
  verb_nosotros: string
  verb_vosotros: string
  verb_ellos_ellas_ustedes: string
  curated: Curated
}

export type NounDetails = {
  noun_base: string
  noun_singular: string
  noun_plural: string
  noun_gender: Gender
  curated: Curated
}

export type VerbDetails = {
  verb_base: string
  verb_infinitive: string
  verb_yo: string
  verb_tu: string
  verb_el_ella_usted: string
  verb_nosotros: string
  verb_vosotros: string
  verb_ellos_ellas_ustedes: string
  curated: Curated
}

export type VerbByForm = Map<string, VerbDetails>
export type NounByForm = Map<string, NounDetails>

// export type ScenarioData = {
//   nounsChooseN: NounDetails[]
//   nouns: NounDetails[]
//   verbs: VerbDetails[]
//   nounBySingular: NounByForm
//   nounByPlural: NounByForm
//   singularNounList: Lines
//   verbByInfinitive: VerbByForm
//   verbBy1stPersonSingular: VerbByForm
//   verbBy2ndPersonSingular: VerbByForm
//   verbBy3rdPersonSingular: VerbByForm
//   verbBy1stPersonPlural: VerbByForm
//   verbBy2ndPersonPlural: VerbByForm
//   verbBy3rdPersonPlural: VerbByForm
// }

export const defaultDebugMode = false

// export const defaultScenarioData: ScenarioData = {
//   nounsChooseN: [],
//   nouns: [],
//   verbs: [],
//   nounBySingular: new Map(),
//   nounByPlural: new Map(),
//   singularNounList: [],
//   verbByInfinitive: new Map(),
//   verbBy1stPersonSingular: new Map(),
//   verbBy2ndPersonSingular: new Map(),
//   verbBy3rdPersonSingular: new Map(),
//   verbBy1stPersonPlural: new Map(),
//   verbBy2ndPersonPlural: new Map(),
//   verbBy3rdPersonPlural: new Map()
// }

export type HandleGetScenarioDataProps = {
  scenario: Scenario,
  language: Language
}

export type HandleCreateLessonProps = {
  scenario: Scenario
  sourceLanguage: Language
  targetLanguage: Language
  lesson: Lesson
  setLessonComplete: SetLessonComplete
  setLessons: SetLessons
  selectedLessonNumber: SelectedLessonNumber
  useMyself: UseMyself
  testMode: TestMode
  debugLog: DebugLog
  setLessonTimestamp: SetLessonTimestamp
  initialLesson: Lesson
  clientMeter: ClientMeter,
  clientSignature: ClientSignature,
  clientUUID: ClientUUID
  clientEmail: ClientEmail
  setClientUUID: SetClientUUID
}

// export type HandleFlexLessonProps = {
//   scenario: Scenario
//   sourceLanguage: Language
//   targetLanguage: Language
//   lesson: Lesson
//   setLessonComplete: SetLessonComplete
//   setLessons: SetLessons
//   selectedLessonNumber: SelectedLessonNumber
//   useMyself: UseMyself
//   testMode: TestMode
//   debugLog: DebugLog
//   setLessonTimestamp: SetLessonTimestamp
//   initialLesson: Lesson
//   clientMeter: ClientMeter,
//   clientSignature: ClientSignature,
//   clientUUID: ClientUUID
//   clientEmail: ClientEmail
//   setClientUUID: SetClientUUID
// }

export type RunModuleProps = {
  testMode: TestMode
  moduleName: ModuleName
  lesson: Lesson
}

export type Voice = string
export type Voices = Voice[]
export type VoicePool = Record<Language, Record<Gender, Voices>>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebugLog = (...args: any[]) => void

export type RebuildNounLinesProps = {
  nounsOnly: Lines
  nounsMissing: Lines
  nounBySingular: NounByForm
}

export type RebuildVerbLinesProps = {
  verbsOnly: Lines
  verbsMissing: Lines
}

export type DialogLineProps = {
  line: string
  index: number
  useCloudTTS: boolean
  storeAudioOrLine: (index: number, value: string) => void
  className?: string
  debugLog: (...args: unknown[]) => void // formerly (...args: any[])
  language: Language
  noSpeaker?: boolean
  translation?: string
}



export type ResolveResult = {
  linesResolved: Lines
  linesResolutions: Lines
}

export type ResolveProps = {
  reviewLines: Lines,
  draftLines: Lines
}

export type Resolve = (props: ResolveProps) => ResolveResult

// export type RunPipelineProps = {
//   lesson: Lesson
//   testMode: boolean
//   draftModule: ModuleName
//   reviewModule: ModuleName
//   resolveModule: ModuleName
//   resolve: Resolve
// }

export type RunPipelineCbProps = {
  lesson: Lesson
  pipelineConfig: PipelineConfig
}

export type GetModuleCbProps = {
  testMode: TestMode
  lesson: Lesson
  moduleName: ModuleName
}

export type PipelineConfig = {
  draftModule: ModuleName
  reviewModule: ModuleName
  resolveModule: ModuleName
  resolve: Resolve
  pipelineType: PipelineType
}

export type PipelineConfigMap = Record<PipelineType, PipelineConfig>

export type RunPipelineCbBody = {
  lesson: Lesson
  pipelineType: PipelineType
}

export type RunPipelineCbClientProps = {
  lesson: Lesson
  pipelineType: PipelineType
}

export type GetRequiredFormProps = {
  lesson: Lesson
  lessonPromptStyle: LessonPromptStyle
}

export type ClientEmail = string
export type GetClientUUIDProps = {
  clientEmail: ClientEmail
}

export type CreateLessonResult = {
  success: boolean
  lessonId: LessonId
}

export type PollPipelineModulesProps = {
  lesson: Lesson
  pipelineConfig: PipelineConfig
}

export type PollModuleByLessonAndNameProps = {
  lessonId: string
  moduleName: string
  pollIntervalMs?: number
  timeoutMs?: number
}

export type FormatFlexLessonButtonProps = {
  flexLesson: FlexLesson
  setFormattedFlexLesson: SetFormattedFlexLesson
}

export type CreateFlexLessonProps = {
  lesson: Lesson
}

export type FormatSentenceProps = {
  sentence: string
}

export type TextareaFlexLessonProps = {
  title: string
}

export type FormattedFlexLessonProps = {
  title: string
}

export type ToastMarkdownEditorProps = {
  initialValue?: string
  onChange?: (markdown: string) => void
  title: string
}

export type TiptapEditorProps = {
  initialValue: string
  onChange: (markdown: string) => void
  title: string
}

export type ButtonProps = {
  disable?: boolean
  panel: ActivePanel | ActiveHome
  icon?: IconProp // IconDefinition
  img?: string
  title?: string
  buttonClass?: string
  switchFn: (target: ActivePanel | ActiveHome) => void
  isActive: IsActive
  iconStyle?: string
  onClick?: () => void   // ← NEW
}

export type PanelVerifyEmailComponentsProps = {
  onVerified?: () => void; // Callback on successful verification
  token: string;
  cookedEmail: CookedEmail
}

export type ModalConfig = {
  title: string
  message: React.ReactNode  // ← change from `string` to `ReactNode`
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export type DialogListProps = {
  lines: Lines
  translations: Lines
  useCloudTTS: boolean
  language: Language
}

export type StorePromptResponseProps = {
  clientUUID: ClientUUID
  lessonId: LessonId
  prompt: Prompt
  response?: string
  genAIProvider: GenAIProvider
}

export type GenAIProps = {
  prompt: Prompt
  lessonId: LessonId
  clientUUID: ClientUUID
}

export type FetchOpenAIProps = GenAIProps
export type FetchClaudeProps = GenAIProps
export type FetchOpenAIResponse = string
export type FetchClaudeResponse = string

export type UpsertUserDataProps = {
  clientUUID: ClientUUID
  flexLesson: FlexLesson
  currentLesson: Lesson // or a stricter type
  lessons: Lessons       // or a stricter type
  lessonNumber: LessonNumber
  lessonPrompt: Prompt
  lessonTimestamp: LessonTimestamp
}

export type Version = number
export type UpdatedAt = string
export type CreatedAt = string


export type MarketingPreferencesKey = keyof typeof MARKETING_PREFERENCE
export type MarketingPreferencesValue = (typeof MARKETING_PREFERENCE)[MarketingPreferencesKey]
export type MarketingPreference = MarketingPreferencesValue
export type MarketingPreferences = Record<MarketingPreference, boolean>

export const defaultMarketingPreferences: MarketingPreferences = {
  [MARKETING_PREFERENCE.EMAIL_ANNOUNCEMENTS]: true,
  [MARKETING_PREFERENCE.EMAIL_UPDATES]: true,
  [MARKETING_PREFERENCE.EMAIL_NEWSLETTER]: true,
  [MARKETING_PREFERENCE.EMAIL_RELATED_STORES]: true
}

export type MarketingData = {
  clientUUID: ClientUUID
  preferences: MarketingPreferences,
  version?: Version,
  updatedAt?: UpdatedAt,
  createdAt?: CreatedAt
}

export type UpsertMarketingDataProps = {
  clientUUID: ClientUUID,
  marketingData: MarketingData
}

export type GetMarketingDataProps = {
  clientUUID: ClientUUID
}

export type GetMarketingPreferencesProps = {
  clientUUID: ClientUUID
}

export type UpsertMarketingPreferencesProps = {
  clientUUID: ClientUUID
  marketingPreferences: MarketingPreferences
}

export type PaywallTierValue = (typeof PAYWALL_TIER)[keyof typeof PAYWALL_TIER]
export type PaywallTierKey = keyof typeof PAYWALL_TIER
export type PaywallTier = PaywallTierValue

export type PaywallPackageValue = (typeof PAYWALL_PACKAGE)[keyof typeof PAYWALL_PACKAGE]
export type PaywallPackageKey = keyof typeof PAYWALL_PACKAGE
export type PaywallPackage = PaywallPackageValue

export type StripeMetadata = {
  tier?: PaywallTier
  packages?: PaywallPackage[]
  origin?: 'stripe' | 'manual' | 'promo'
  notes?: string
  [key: string]: string | number | boolean | PaywallTier | PaywallPackage[] | undefined
}

// Upsertable fields (excluding audit and identity columns)
export type PaywallUpsertFields = {
  paywall_package_green_remaining: number
  paywall_package_yellow_remaining: number
  paywall_stripe_customer_id?: string | null
  paywall_stripe_subscription_id?: string | null
  paywall_stripe_metadata?: StripeMetadata
}

// Full Paywall structure returned from Supabase
export type Paywall = {
  paywall_client_uuid: ClientUUID
  paywall_package_green_remaining: number
  paywall_package_yellow_remaining: number
  paywall_stripe_customer_id?: string | null
  paywall_stripe_subscription_id?: string | null
  paywall_stripe_metadata: StripeMetadata
  paywall_version: Version
  paywall_updated_at: UpdatedAt
  paywall_created_at: CreatedAt
}

export const defaultPaywall: Paywall = {
  paywall_client_uuid: defaultClientUUID,
  paywall_package_green_remaining: 0,
  paywall_package_yellow_remaining: 0,
  paywall_stripe_customer_id: null,
  paywall_stripe_subscription_id: null,
  paywall_stripe_metadata: {},
  paywall_version: 1,
  paywall_updated_at: new Date().toISOString(),
  paywall_created_at: new Date().toISOString()
}

export type GetPaywallProps = {
  clientUUID: ClientUUID
}

export type UpsertPaywallProps = {
  clientUUID: ClientUUID
  patch: Partial<PaywallUpsertFields>
}

export type BumpPaywallPackageCountsProps = {
  clientUUID: ClientUUID
  bumpGreenCount: number
  bumpYellowCount: number
}

export type SetPaywallPackageCountsProps = {
  clientUUID: ClientUUID
  greenCount: number
  yellowCount: number
}

export type BumpPackagesProps = {
  bumpGreenCount: number
  bumpYellowCount: number
}  

export type SetPackagesProps = {
  greenCount: number
  yellowCount: number
}


