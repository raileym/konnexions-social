import { formatDialogLinesForReview } from './formatDialogLinesForReview'
import { generateExample } from '@shared/generateExample'
import { getJsonQualificationWithExample } from '@shared/getJsonQualification'
import { type GetTranslationDraftPrompt, type GetTranslationDraftPromptProps } from '@cknTypes/types'
import { LANGUAGE_TITLE, MODULE_NAME } from '@cknTypes/constants'

export const getTranslationDraftPrompt: GetTranslationDraftPrompt = ({lesson, errors}: GetTranslationDraftPromptProps) => {
  const translationDraftExample = generateExample({language: lesson.targetLanguage, moduleName: MODULE_NAME.TRANSLATION_DRAFT, lessonPromptStyle: lesson.lessonPromptStyle, options: { asString: true }  })
  const dialogReviewExample = generateExample({language: lesson.targetLanguage, moduleName: MODULE_NAME.DIALOG_REVIEW, lessonPromptStyle: lesson.lessonPromptStyle, options: { asString: true }  })

  const dialogReviewLines = formatDialogLinesForReview(lesson[MODULE_NAME.DIALOG_RESOLVE].lines)  
  
  const example =
`
[
    "1. translated line",
    "2. translated line",
    "3. translated line"
],
`

  return (`
REQUEST: Translate the following dialog from ${LANGUAGE_TITLE[lesson.targetLanguage]} into ${LANGUAGE_TITLE[lesson.sourceLanguage]}. Ensure the translation is grammatically correct, natural-sounding, and suitable for beginning-level learners of ${LANGUAGE_TITLE[lesson.targetLanguage]}. Make minor corrections to improve clarity or proper usage, while preserving the original meaning and tone. Retain any/all Markdown-like punctuation marks, such as asterisks, double asterisks, dashes, double dashes, and triple dashes.

DIALOG:

${JSON.stringify(dialogReviewLines, null, 2)}         

TRANSLATION RESPONSE: Your response must use the same numbering scheme as the original.

${getJsonQualificationWithExample({responseType: 'translation', example})}

A complete example of a dialog review response follows:

EXAMPLE TRANSLATION:

${translationDraftExample}

for the ${LANGUAGE_TITLE[lesson.targetLanguage]} dialog:

${dialogReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}