import type { Gender, NounArticlesValue, ScenarioLabels } from './types'

export const MODULE_NAME = {
  DIALOG: 'dialog',
  DIALOG_REVIEW: 'dialogReview',
  NOUNS: 'nouns',
  NOUNS_MISSING: 'nounsMissing',
  NOUNS_MISSING_REVIEW: 'nounsMissingReview',
  NOUNS_ONLY: 'nounsOnly',
  NOUNS_ONLY_MISSING: 'nounsOnlyMissing',
  NOUNS_ONLY_REVIEW: 'nounsOnlyReview',
  NOUNS_REVIEW: 'nounsReview',
  VERBS: 'verbs',
  VERBS_EXPANDED_COMPLETE: 'verbsExpandedComplete',
  VERBS_EXPANDED_INCOMPLETE: 'verbsExpandedInComplete',
  VERBS_EXPANDED_TRIPLE: 'verbsExpandedTriple',
  VERBS_MISSING: 'verbsMissing',
  VERBS_MISSING_REVIEW: 'verbsMissingReview',
  VERBS_ONLY: 'verbsOnly',
  VERBS_ONLY_MISSING: 'verbsOnlyMissing',
  VERBS_ONLY_REVIEW: 'verbsOnlyReview',
  VERBS_REVIEW: 'verbsReview'
} as const

export const LANGUAGE = {
  SPANISH: 'Latin American Spanish',
  ENGLISH: 'English',
  FRENCH: 'French',
  ITALIAN: 'Italian'
} as const

export const LANGUAGE_CODE = {
  [LANGUAGE.ENGLISH]: 'en',
  [LANGUAGE.SPANISH]: 'es',
  [LANGUAGE.ITALIAN]: 'it',
  [LANGUAGE.FRENCH]: 'fr'
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

export const NOUN_ARTICLES = {
  LA: 'la',
  EL: 'el'
} as const

// export type Gender = 'M' | 'F'
export const GENDER = {
  M: 'M',
  F: 'F'
} as const

export const GENDER_TO_ARTICLE: Record<Gender, NounArticlesValue> = {
  [GENDER.F]: NOUN_ARTICLES.LA,
  [GENDER.M]: NOUN_ARTICLES.EL
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

 export const APP_HOME = APP_PANEL

 export const SCENARIO_LABELS: ScenarioLabels = {
  restaurant: 'at the restaurant',
  hotel: 'at the hotel',
  airport: 'at the airport',
  taxi: 'in a taxi',
  custom: 'custom'
} as const

