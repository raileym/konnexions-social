import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type {
  GetVerbsOnlyReviewPrompt,
  GetVerbsOnlyReviewPromptProps
} from '@cknTypes/types'
import { MODULE_NAME, SCENARIO_LABELS } from '@cknTypes/constants'
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview'

export const getVerbsOnlyReviewPrompt: GetVerbsOnlyReviewPrompt = ({lesson, errors}: GetVerbsOnlyReviewPromptProps) => {
  const verbsOnlyReviewExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.VERBS_ONLY_REVIEW, options: { asString: true }  })
  
  const dialogReviewLines = formatDialogLinesForReview(lesson.dialog.lines)  

  return (`
REQUEST: Review the list of Latin American Spanish verbs below in relation to the dialog that follows. Your task is to ensure that the list contains only verbs that appear in the dialog.

VERBS TO REVIEW:

${JSON.stringify(lesson.verbsOnly.lines, null, 2)}

DIALOG: The following beginner-level Spanish dialog takes place ${SCENARIO_LABELS[lesson.scenario]} between ${lesson.participantList}.

${dialogReviewLines.join('\n')}

VERBS ONLY RESPONSE: Rewrite the verb list above so that it includes only verbs that explicitly appear in the dialog above, and excludes all others. Use the exact verb form or conjugation as it appears in the dialog (1st, 2nd, or 3rd person, singular or plural).

VERBS ONLY RESPONSE FORMAT: Return your result as a single valid JSON array in the following structure:

  [
    "verb",
    "verb",
    "verb"
  ]

Guidelines:

  - use only one verb per string,
  - use the verb conjugation (1st, 2nd, or 3rd person, singular or plural) exactly as it appears in the dialog,
  - use lowercase throughout,
  - include only verbs,
  - exclude nouns, adjectives, adverbs, expressions, or other parts of speech.

Formatting rules:
${getJsonQualification({responseType: ''})}
EXAMPLE VERBS ONLY RESPONSE:

${verbsOnlyReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}