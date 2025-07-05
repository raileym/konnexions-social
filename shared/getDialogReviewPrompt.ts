import { formatDialogLinesForReview } from '../shared/formatDialogLinesForReview.js'
import { generateExample } from '../shared/generateExample.js'
import { getJsonQualificationWithExample } from '../shared/getJsonQualification.js'
import { type GetDialogReviewPrompt, type GetDialogReviewPromptProps } from '../shared/cknTypes/types.js'
import { LANGUAGE_TITLE, MODULE_NAME } from '../shared/cknTypes/constants.js'
import { formatNounLinesForReview } from '../shared/formatNounLinesForReview.js'

export const getDialogReviewPrompt: GetDialogReviewPrompt = ({lesson, errors}: GetDialogReviewPromptProps) => {
  const dialogReviewExample = generateExample({
    language: lesson.targetLanguage, 
    moduleName: MODULE_NAME.DIALOG_REVIEW,
    lessonPromptStyle: lesson.lessonPromptStyle,
    options: { asString: true }
  })

  const dialogExample = generateExample({
    language: lesson.targetLanguage, 
    moduleName: MODULE_NAME.DIALOG_DRAFT,
    lessonPromptStyle: lesson.lessonPromptStyle,
    options: { asString: false }
  })

  // console.log('dialogExample', dialogExample)

  const dialogReviewLines = formatDialogLinesForReview(lesson[MODULE_NAME.DIALOG_DRAFT].lines) 
  const fakeDialogReviewLines = formatNounLinesForReview(dialogExample) 
  
  const example =
`
[
    "1. Corrected line",
    "2. Corrected line",
    "3. Corrected line"
],
`

  return (`
REQUEST: Create a(an) ${lesson.lessonPromptStyle} review for the following ${LANGUAGE_TITLE[lesson.targetLanguage]} ${lesson.lessonPromptStyle} for grammatical correctness and natural usage, making minor corrections as appropriate. Please correct grammatical mistakes as appropriate for ${LANGUAGE_TITLE[lesson.targetLanguage]}. This ${lesson.lessonPromptStyle} is intended for beginning ${LANGUAGE_TITLE[lesson.targetLanguage]} learners.

${lesson.lessonPromptStyle.toUpperCase()}:

${JSON.stringify(dialogReviewLines.length > 0 ? dialogReviewLines : fakeDialogReviewLines, null, 2)}         

${lesson.lessonPromptStyle.toUpperCase()} REVIEW RESPONSE: In your ${lesson.lessonPromptStyle} review response, re-write ${lesson.lessonPromptStyle} lines that require corrections, retaining the same numbering scheme and JSON format as the original ${lesson.lessonPromptStyle}.

${getJsonQualificationWithExample({responseType: `${lesson.lessonPromptStyle} review`, example})}

A complete example of a ${lesson.lessonPromptStyle} review response follows:

EXAMPLE RESPONSE:

${dialogReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}