import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import { type GetVerbsReviewPrompt, type GetVerbsReviewPromptProps } from '@cknTypes/types'
import { LANGUAGE_TITLE, MODULE_NAME, SCENARIO_LABELS } from '@cknTypes/constants'
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview'
import { formatNounLinesForReview } from '@shared/formatNounLinesForReview'

export const getVerbsReviewPrompt: GetVerbsReviewPrompt = ({lesson, errors}: GetVerbsReviewPromptProps) => {
  const verbsReviewExample = generateExample({language: lesson.targetLanguage, moduleName: MODULE_NAME.VERBS_REVIEW, lessonPromptStyle: lesson.lessonPromptStyle, options: { asString: true }  })
  const formatDialogLines = formatDialogLinesForReview(lesson[MODULE_NAME.DIALOG_RESOLVE].lines)  
  const formatVerbsLines = formatNounLinesForReview(lesson[MODULE_NAME.VERBS_DRAFT].lines)  
  
// REQUEST: Review the following Spanish-language verbs for grammatical correctness and natural usage, making minor corrections only when necessary. These verbs are intended for beginning Spanish learners.

  return (`
REQUEST: Review the list of ${LANGUAGE_TITLE[lesson.targetLanguage]} verbs below in relation to the dialog that follows. Your task is to ensure that the list contains only verbs that appear in the dialog and that the details for the verbs are correct as to each verb's English translation, infinitive form, and six conjugations in present tense appropriate for a beginning course in ${LANGUAGE_TITLE[lesson.targetLanguage]}.

VERBS TO REVIEW:

${JSON.stringify(formatVerbsLines, null, 2)} 

DIALOG: The following beginner-level Spanish dialog takes place ${SCENARIO_LABELS[lesson.scenario]} between ${lesson.participantList}.

  ${formatDialogLines.join('\n  ')}

VERBS RESPONSE: Rewrite the list of verbs above so that it includes only verbs that explicitly appear in the dialog above, and excludes all others. Correct any errors in the details of the verbs.

VERBS RESPONSE FORMAT: Return your result as a single valid JSON array in the following structure:

  [
    "1. english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "2. english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "3. english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)"
  ]

where each numbered string contains eight fields beginning with the English translation of the infinite form of the verb followed by the six forms of conjugation in common order.

Guidelines:

  - Each verb (with its eight fields) occupies one string in the array of strings.
  - All verb details use lowercase throughout.
  - The English translation is for the infinitive form of the verb expressed in lower case.
  - Include only verbs
  - Express all verbs in present tense.
  - Do not include pronouns
  - Do not include nouns, adjectives, expressions, or other parts of speech.
  - For reflexive verbs, conjugate them as appropriate in beginning ${LANGUAGE_TITLE[lesson.targetLanguage]} class.
  - Use a single vertical bar ('|') with no extra spaces to separate your fields

Formatting rules:
${getJsonQualification({responseType: 'verbs review'})}
EXAMPLE VERBS RESPONSE:

${verbsReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}