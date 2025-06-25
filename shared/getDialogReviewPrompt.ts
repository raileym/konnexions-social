import { formatDialogLinesForReview } from './formatDialogLinesForReview'
import { generateExample } from '@shared/generateExample'
import { getJsonQualificationWithExample } from '@shared/getJsonQualification'
import { type GetDialogReviewPrompt, type GetDialogReviewPromptProps } from '@cknTypes/types'
import { LANGUAGE_TITLE, MODULE_NAME } from '@cknTypes/constants'

export const getDialogReviewPrompt: GetDialogReviewPrompt = ({lesson, errors}: GetDialogReviewPromptProps) => {
  const dialogReviewExample = generateExample({language: lesson.targetLanguage, moduleName: MODULE_NAME.DIALOG_REVIEW, options: { asString: true }  })

const dialogReviewLines = formatDialogLinesForReview(lesson[MODULE_NAME.DIALOG_DRAFT].lines)  
  
const example =
`
[
    "1. Corrected line",
    "2. Corrected line",
    "3. Corrected line"
],
`

  return (`
REQUEST: Create a dialog review for the following ${LANGUAGE_TITLE[lesson.targetLanguage]} dialog for grammatical correctness and natural usage, making minor corrections as appropriate. Please correct grammatical mistakes as appropriate for ${LANGUAGE_TITLE[lesson.targetLanguage]}. This dialog is intended for beginning ${LANGUAGE_TITLE[lesson.targetLanguage]} learners.

DIALOG:

${JSON.stringify(dialogReviewLines, null, 2)}         

DIALOG REVIEW RESPONSE: In your dialog review response, re-write dialog lines that require corrections, retaining the same numbering scheme as the original dialog.

${getJsonQualificationWithExample({responseType: 'dialog review', example})}

A complete example of a dialog review response follows:

EXAMPLE RESPONSE:

${dialogReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}