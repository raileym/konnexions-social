import { type Gender, type ModuleName, type NounArticlesValue, type ScenarioLabels } from './types.js'

export const MODULE_NAME = {
  DIALOG_DRAFT: 'dialogDraft',
  DIALOG_REVIEW: 'dialogReview',
  DIALOG_RESOLVE: 'dialogResolve',
  TRANSLATION_DRAFT: 'translationDraft',
  TRANSLATION_REVIEW: 'translationReview',
  TRANSLATION_RESOLVE: 'translationResolve',
  NOUNS_DRAFT: 'nounsDraft',
  NOUNS_REVIEW: 'nounsReview',
  NOUNS_RESOLVE: 'nounsResolve',
  VERBS_DRAFT: 'verbsDraft',
  VERBS_REVIEW: 'verbsReview',
  VERBS_RESOLVE: 'verbsResolve',
  VERBS_EXPANDED_COMPLETE: 'verbsExpandedComplete',
  VERBS_EXPANDED_INCOMPLETE: 'verbsExpandedInComplete',
  VERBS_EXPANDED_TRIPLE: 'verbsExpandedTriple',
  ERROR_MODULE: 'errorModule'
} as const

export const MDX_PAGE = {
  WELCOME: 'Welcome',
  ABOUT: 'About',
  FAQ: 'FAQ',
  WELCOME_LEARN_SPANISH: 'WelcomeLearnSpanish',
  TERMS_AND_CONDITIONS: 'TermsAndConditions',
  PRIVACY_POLICY: 'PrivacyPolicy',
  CLASSES: 'Classes'
} as const

export const PIPELINE_TYPE = {
  DIALOG: 'dialog',
  NOUNS: 'nouns',
  VERBS: 'verbs',
  TRANSLATION: 'translation'
} as const

export const FIELD_COUNT: Record<ModuleName, number> = {
  [MODULE_NAME.TRANSLATION_DRAFT]: 1, 
  [MODULE_NAME.TRANSLATION_RESOLVE]: 0, 
  [MODULE_NAME.TRANSLATION_REVIEW]: 1, 
  [MODULE_NAME.DIALOG_DRAFT]: 3, 
  [MODULE_NAME.DIALOG_RESOLVE]: 0, 
  [MODULE_NAME.DIALOG_REVIEW]: 1, 
  [MODULE_NAME.NOUNS_DRAFT]: 4,
  [MODULE_NAME.NOUNS_RESOLVE]: 0,
  [MODULE_NAME.NOUNS_REVIEW]: 4,
  [MODULE_NAME.VERBS_EXPANDED_COMPLETE]: 0,
  [MODULE_NAME.VERBS_EXPANDED_INCOMPLETE]: 0,
  [MODULE_NAME.VERBS_EXPANDED_TRIPLE]: 0,
  [MODULE_NAME.VERBS_DRAFT]: 8,
  [MODULE_NAME.VERBS_RESOLVE]: 0,
  [MODULE_NAME.VERBS_REVIEW]: 8,
  [MODULE_NAME.ERROR_MODULE]: 0
} as const

// export const LESSON_PROMPT_STYLE = {
//   DIALOG: 'dialog',
//   COMMENTARY: 'commentary',
//   POEM: 'poem',
//   DESCRIPTION: 'description',
//   STORY: 'story'
// } as const

export const GEN_AI_PROVIDER = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  GROQ: 'groq',
  MISTRAL: 'mistral',
  CLAUDE: 'claude'
} as const

export const LESSON_PROMPT_STYLE = {
  DIALOG: 'dialog',
  COMMENTARY: 'commentary',
  POEM: 'poem',
  DESCRIPTION: 'description',
  STORY: 'story',
  INSTRUCTION: 'instruction',
  OPINION: 'opinion',
  COMPARISON: 'comparison',
  LIST: 'list',
  QUESTION_SET: 'question_set'
} as const

// export const LANGUAGE_CODE = {
//   [LANGUAGE.ENGLISH]: 'en',
//   [LANGUAGE.SPANISH]: 'es',
//   [LANGUAGE.ITALIAN]: 'it',
//   [LANGUAGE.FRENCH]: 'fr'
// } as const

export const LANGUAGE = {
  SPANISH: 'es',
  ENGLISH: 'en',
  FRENCH: 'fr',
  ITALIAN: 'it'
} as const

export const LANGUAGE_TITLE = {
  [LANGUAGE.SPANISH]: 'Latin American Spanish',
  [LANGUAGE.ENGLISH]: 'English',
  [LANGUAGE.FRENCH]: 'French',
  [LANGUAGE.ITALIAN]: 'Italian'
} as const

export const SCENARIO = {
  RESTAURANT: 'restaurant',
  HOTEL: 'hotel',
  AIRPORT: 'airport',
  TAXI: 'taxi',
  CUSTOM: 'custom'
} as const

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

export const TABINDEX_NEVER = -1
export const TABINDEX_ALWAYS = 0
export const ARIA_DISABLED_ALWAYS = true
export const ARIA_DISABLED_NEVER = false

export const ACTIVE_PANEL = {
  // HOME: 'home',
  HELP: 'help',

  NAVBAR_TOP: 'navbarTop',
  LESSON_BAR: 'lessonBar',
  NAVBAR_BOTTOM: 'navbarBottom',
  SELECT_MARKETING_PREFERENCES: 'SelectMarketingPreferences',
  INPUT_CUSTOM_PARTICIPANT_LIST: 'InputCustomParticipantList',
  INPUT_LESSON_NAME: 'InputLessonName',
  TIPTAP_EDITOR: 'TiptapEditor',
  DIALOG_LIST: 'DialogList',
  DIALOG_LINE: 'DialogLine',
  SELECTOR_LANGUAGE: 'SelectorLanguage',
  TEXTAREA_FLEX_LESSON: 'TextareaFlexLesson',
  SELECTOR_LESSON_PROMPT_STYLE: 'SelectorLessonPromptStyle',
  SELECTOR_SCENARIO: 'SelectorScenario',
  SELECTOR_PARTICIPANT_ROLE: 'SelectorParticipantRole',
  INPUT_CUSTOM_SCENARIO: 'InputCustomScenario',

  PROFILE: 'profile',
  VERIFY_EMAIL: 'verifyEmail',
  
  SETTINGS: 'settings',
  KEYS: 'keys',
  MENU: 'menu',

  MDX: 'mdx',
  
  BASIC_CREATE: 'basicCreate',
  BASIC_CREATE_COMPONENTS: 'basicCreateComponents',

  BASIC_STUDY: 'basicStudy',
  BASIC_STUDY_COMPONENTS: 'basicStudyComponents',

  BASIC_WELCOME: 'basicWelcome',

  GEN_AI: 'genAI',

  GEN_AI_PRO: 'genAIPro',
  GEN_AI_PRO_COMPONENTS: 'genAIProComponents',

} as const

export const ERROR_LABEL: Record<ModuleName, string> = {
  [MODULE_NAME.TRANSLATION_DRAFT]: 'handleTranslationDraftError',
  [MODULE_NAME.TRANSLATION_RESOLVE]: 'handleTranslationResolveError',
  [MODULE_NAME.TRANSLATION_REVIEW]: 'handleTranslationReviewError',
  [MODULE_NAME.DIALOG_DRAFT]: 'handleDialogDraftError',
  [MODULE_NAME.DIALOG_RESOLVE]: 'handleDialogResolveError',
  [MODULE_NAME.DIALOG_REVIEW]: 'handleDialogReviewError',
  [MODULE_NAME.NOUNS_DRAFT]: 'handleNounsDraftError',
  [MODULE_NAME.NOUNS_RESOLVE]: 'handleNounsResolveError',
  [MODULE_NAME.NOUNS_REVIEW]: 'handleNounsReviewError',
  [MODULE_NAME.VERBS_DRAFT]: 'handleVerbsDraftError',
  [MODULE_NAME.VERBS_RESOLVE]: 'handleVerbsResolveError',
  [MODULE_NAME.VERBS_REVIEW]: 'handleVerbsReviewError',
  [MODULE_NAME.VERBS_EXPANDED_COMPLETE]: 'handleVerbsExpandedCompleteError',
  [MODULE_NAME.VERBS_EXPANDED_TRIPLE]: 'handleVerbsExpandedTripleError',
  [MODULE_NAME.VERBS_EXPANDED_INCOMPLETE]: 'handleVerbsExpandedInCompleteError',
  [MODULE_NAME.ERROR_MODULE]: 'handleErrorModuleError'
} as const

export const NOUN_ARTICLES = {
  LA: 'la',
  EL: 'el'
} as const

export const GENDER = {
  N: 'n',
  M: 'm',
  F: 'f'
} as const

export const CURATED = {
  TRUE: true,
  FALSE: false
} as const

export const GENDER_TO_ARTICLE: Record<Gender, NounArticlesValue> = {
  [GENDER.F]: NOUN_ARTICLES.LA,
  [GENDER.M]: NOUN_ARTICLES.EL,
  [GENDER.N]: NOUN_ARTICLES.EL
} as const

export const VERB_FORMATS = {
  INFINITIVE: 'infinitive',
  CONJUGATION: 'conjugation',
  PRONOUN: 'pronoun',
  PRONOUN_AND_CONJUGATION: 'pronounAndConjugation',
  INCOMPLETE: 'incomplete',
  COMPLETE: 'complete',
  TRIPLE: 'triple'
 } as const

 export const ACTIVE_HOME = ACTIVE_PANEL

 export const SCENARIO_LABELS: ScenarioLabels = {
  restaurant: 'at the restaurant',
  hotel: 'at the hotel',
  airport: 'at the airport',
  taxi: 'in a taxi',
  custom: 'custom'
} as const

export const MENU_PANEL_WIDTH_PERCENT = 'w-40'
export const MENU_PANEL_TRANSLATE_X = 'translate-x-60'
export const PROFILE_PANEL_WIDTH_PERCENT = 'w-40'
export const PROFILE_PANEL_TRANSLATE_X = 'translate-x-60'
export const NAVBAR_BOTTOM_TRANSLATE_Y = 'translate-y-0'
export const TERMS_AND_CONDITIONS_PANEL_WIDTH_PERCENT = 'w-100'
export const TERMS_AND_CONDITIONS_PANEL_TRANSLATE_X = 'translate-x-100'

export const USER_EMAIL_VALIDATED = 'User email confirmed'
export const USER_EMAIL_NOT_VALIDATED = 'User email not confirmed'

export const MARKETING_PREFERENCE = {
  EMAIL_NEWSLETTER: 'Email Newsletter',
  EMAIL_UPDATES: 'Email Updates',
  EMAIL_ANNOUNCEMENTS: 'Email Announcements',
  EMAIL_RELATED_STORES: 'Email Related Stories'
} as const

export const PAYWALL_TIER = {
  FREE: 'free',
  STUDENT: 'student',
  TEACHER: 'teacher'
} as const

export const PAYWALL_PACKAGE = {
  GREEN: 'green',
  YELLOW: 'yellow'
} as const

export const SCREEN = {
  MAIN: 'main',
  REVIEW: 'review',
  PROFILE: 'profile',
  SETTINGS: 'settings',
  CREATE: 'create',
  PAYWALL: 'paywall',
  GEN_AI: 'genAI',
  GEN_AI_PRO: 'genAIPro',
  MENU: 'menu',
  HELP: 'help'
} as const

export const BUTTON_NAME = {
  BIENVENIDO: 'bienvenido',
  PROFILE: 'profile',
  MENU: 'menu',
  SETTINGS: 'settings'
} as const

export const PANEL_NAME = {
  PROFILE: 'profile',
  MENU: 'menu',
  SETTINGS: 'settings',
  HELP: 'help'
} as const
