import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type { GetNounsOnlyReviewPrompt, GetNounsOnlyReviewPromptProps } from '@cknTypes/types'
import { MODULE_NAME, SCENARIO_LABELS } from '@cknTypes/constants'
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview'

export const getNounsOnlyReviewPrompt: GetNounsOnlyReviewPrompt = ({lesson, errors}: GetNounsOnlyReviewPromptProps) => {
  const nounsOnlyReviewExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.NOUNS_ONLY_REVIEW, options: { asString: true }  })
  
  const dialogReviewLines = formatDialogLinesForReview(lesson.dialog.lines)  
  
  return (`
REQUEST: Review the list of Latin American Spanish nouns below in relation to the dialog that follows. Your task is to ensure that the list contains only nouns that appear in the dialog.

NOUNS TO REVIEW:

${JSON.stringify(lesson.nounsOnly.lines, null, 2)}

DIALOG: The following beginner-level Spanish dialog takes place ${SCENARIO_LABELS[lesson.scenario]} between ${lesson.participantList}.

${dialogReviewLines.join('\n')}

NOUNS ONLY RESPONSE: Rewrite the noun list above so that it includes only nouns that explicitly appear in the dialog above, and excludes all others. Use the exact noun form as it appears in the dialog (singular or plural).

NOUNS ONLY RESPONSE FORMAT: Return your result as a single valid JSON array in the following structure:

  [
    "noun",
    "noun",
    "noun"
  ]

Guidelines:

  - use only one noun per string,
  - use the noun form (singular or plural) exactly as it appears in the dialog,
  - use lowercase throughout,
  - include only nouns (people, places, things, or ideas),
  - exclude verbs, adjectives, expressions, or other parts of speech.

Formatting rules:
${getJsonQualification({responseType: ''})}
EXAMPLE NOUNS ONLY RESPONSE:

${nounsOnlyReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}