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

DIALOG: The following beginner-level Spanish dialog takes place ${SCENARIO_LABELS[lesson.scenario]} between ${lesson.participantList}.

${dialogReviewLines.join('\n')}

NOUNS TO REVIEW:

nounsOnlyArray = ${JSON.stringify(lesson.nounsOnly.lines, null, 2)}

NOUNS ONLY REVIEW RESPONSE: Your task is to rewrite the noun list so that it includes **only nouns that appear in the dialog above**, and excludes all others. Do not include nouns that do not appear in the dialog. Use the exact noun form as it appears in the dialog (singular or plural).

Use the following format:

  [
    "noun",
    "noun",
    "noun"
  ]

with

  - one noun per string, and
  - a noun can take singular or plural forms, either is fine.

Guidelines:

  - include only one noun per string  
  - use lowercase throughout  
  - singular or plural forms are both acceptable, as used in the dialog  
  - include **only** nouns (people, places, things, or ideas)  
  - exclude verbs, adjectives, expressions, or other parts of speech  

Formatting rules:
${getJsonQualification({responseType: 'nounsOnlyReview'})}
EXAMPLE NOUNS ONLY REVIEW RESPONSE:

${nounsOnlyReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}