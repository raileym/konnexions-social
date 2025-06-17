import { formatDialogLinesForReview } from './formatDialogLinesForReview'
import { generateExample } from './generateExample'
import { jsonQualificationWithExample } from '../shared/jsonQualification'
import { type GetDialogReviewPrompt, type GetDialogReviewPromptProps } from '@cknTypes/types'
import { MODULE_NAME } from '@cknTypes/constants'

export const getDialogReviewPrompt: GetDialogReviewPrompt = ({lesson, errors}: GetDialogReviewPromptProps) => {
  const dialogReviewExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.DIALOG_REVIEW, options: { asString: true }  })

const dialogReviewLines = formatDialogLinesForReview(lesson.dialog.lines)  
  
const example =
`
[
    "1. Corrected line",
    "2. Corrected line",
    "3. Corrected line"
]
`

  return (`
REQUEST: Review the following Spanish-language dialog array for grammatical correctness and natural usage, making minor corrections as appropriate. Please correct grammatical mistakes as appropriate for ${lesson.language}. This dialog is intended for beginning Spanish learners.

DIALOG REVIEW ARRAY:

${JSON.stringify(dialogReviewLines, null, 2)}         

RESPONSE: In your response, re-write dialog lines that require corrections, retaining the same numbering scheme aligned with the lines corrected.

${jsonQualificationWithExample({example})}

A complete example response follows:

EXAMPLE RESPONSE:

${dialogReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}