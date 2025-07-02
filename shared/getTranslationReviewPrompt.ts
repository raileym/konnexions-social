import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type { GetTranslationReviewPrompt, GetTranslationReviewPromptProps } from '@cknTypes/types'
import { LANGUAGE_TITLE, MODULE_NAME } from '@cknTypes/constants'
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview'

export const getTranslationReviewPrompt: GetTranslationReviewPrompt = ({lesson, errors}: GetTranslationReviewPromptProps) => {
  const translationDraftExample = generateExample({language: lesson.targetLanguage, moduleName: MODULE_NAME.TRANSLATION_DRAFT, lessonPromptStyle: lesson.lessonPromptStyle, options: { asString: true }  })
  const formatDialogLines = formatDialogLinesForReview(lesson[MODULE_NAME.DIALOG_RESOLVE].lines)  

return (`
REQUEST: Review the ${LANGUAGE_TITLE[lesson.sourceLanguage]} translation below. It is a translation of the ${LANGUAGE_TITLE[lesson.targetLanguage]} dialog that follows. Your task is to revise this ${LANGUAGE_TITLE[lesson.sourceLanguage]} translation to ensure that it is:

    - grammatically correct,
    - natural-sounding,
    - faithful to the original ${LANGUAGE_TITLE[lesson.targetLanguage]} meaning,
    - and suitable for beginning-level learners of ${LANGUAGE_TITLE[lesson.targetLanguage]}. 

Make minor corrections to improve clarity or proper usage, while preserving the original meaning and tone.

IMPORTANT: Do not rewrite the ${LANGUAGE_TITLE[lesson.targetLanguage]}. Only revise the ${LANGUAGE_TITLE[lesson.sourceLanguage]} translation.

${LANGUAGE_TITLE[lesson.sourceLanguage].toUpperCase()} TRANSLATION TO REVIEW:

${JSON.stringify(lesson[MODULE_NAME.TRANSLATION_DRAFT].lines, null, 2)}

ORIGINAL ${LANGUAGE_TITLE[lesson.targetLanguage].toUpperCase()} DIALOG: 

  ${formatDialogLines.join('\n  ')}

REVISION OUTPUT FORMAT FOR ${LANGUAGE_TITLE[lesson.sourceLanguage].toUpperCase()} TRANSLATION

  - Use the same numbering scheme as the original. ${getJsonQualification({responseType: 'translation'})}
EXAMPLE REVISION OUTPUT:

${translationDraftExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}