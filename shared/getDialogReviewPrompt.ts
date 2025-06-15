import { formatDialogLinesForReview } from "./formatDialogLinesForReview"
import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { type GetDialogReviewPrompt, type GetDialogReviewPromptProps } from '@cknTypes/types'
import { MODULE_NAME } from '@cknTypes/constants'

export const getDialogReviewPrompt: GetDialogReviewPrompt = ({lesson, errors}: GetDialogReviewPromptProps) => {
  const dialogReviewExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.DIALOG_REVIEW, options: { asString: true }  })

const dialogReviewLines = formatDialogLinesForReview(lesson.dialog.lines)  
  
  return (`
REQUEST: Review the following Spanish-language dialog array for grammatical correctness and natural usage, making minor corrections only when necessary. This dialog is intended for beginning Spanish learners.

DIALOG REVIEW ARRAY:

${JSON.stringify(dialogReviewLines, null, 2)}         
${jsonQualification}
In your response, only include corrections for each numbered line as noted above, retaining the same numbering scheme
matching a corrected line with the original line that it will replace. The Dialog Review Array must take the form:

  [
    "1. Corrected line",
    "2. Corrected line",
    "3. Corrected line"
  ]

If no lines require corrections or updates, return a JSON array with one entry,

  [ "No corrections needed" ]
 
A complete example of a sample response follows:

EXAMPLE RESPONSE:

${dialogReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}