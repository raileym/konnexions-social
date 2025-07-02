import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type { GetNounsReviewPrompt, GetNounsReviewPromptProps } from '@cknTypes/types'
import { LANGUAGE_TITLE, MODULE_NAME, SCENARIO_LABELS } from '@cknTypes/constants'
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview'

export const getNounsReviewPrompt: GetNounsReviewPrompt = ({lesson, errors}: GetNounsReviewPromptProps) => {
  const nounsReviewExample = generateExample({language: lesson.targetLanguage, moduleName: MODULE_NAME.NOUNS_REVIEW, lessonPromptStyle: lesson.lessonPromptStyle, options: { asString: true }  })
  const formatDialogLines = formatDialogLinesForReview(lesson[MODULE_NAME.DIALOG_RESOLVE].lines)  
  
// ${JSON.stringify(lesson.nouns.lines, null, 2)}

  return (`
REQUEST: Review the list of ${LANGUAGE_TITLE[lesson.targetLanguage]} nouns below in relation to the dialog that follows. Your task is to ensure that the list contains only nouns that appear in the dialog and that the details for the nouns are correct as to each noun's English translation, singular form, plural form, and grammatical gender ('m' for masculine or 'f' for feminine).

NOUNS TO REVIEW:

${JSON.stringify(lesson[MODULE_NAME.NOUNS_DRAFT].lines, null, 2)}

DIALOG: The following beginner-level Spanish dialog takes place ${SCENARIO_LABELS[lesson.scenario]} between ${lesson.participantList}.

  ${formatDialogLines.join('\n  ')}

NOUNS RESPONSE: Rewrite the list of nouns above so that it includes only nouns that explicitly appear in the dialog above, and excludes all others. Correct any errors in the details of the nouns.

NOUNS RESPONSE FORMAT: Return your result as a single valid JSON array in the following structure:

  [
    "1. english(translation)|noun(singular)|noun(plural)|gender",
    "2. english(translation)|noun(singular)|noun(plural)|gender",
    "3. english(translation)|noun(singular)|noun(plural)|gender"
  ].

where

  - Field no 1 is the English translation for the singular form of the noun.
  - Field no 2 is the singular form of the noun.
  - Field no 3 is the plural form of the noun, grammatically correct and commonly accepted in ${LANGUAGE_TITLE[lesson.targetLanguage]}.
  - Field no 4 is gender of the noun using 'm' to denote grammatical masculine nouns and 'f' to denote grammatical feminine nouns.

Guidelines:

  - Each noun occupies one string in the array of strings.
  - All nouns use lowercase throughout.
  - The English translation is for the noun(singular) form expressed in lower case.
  - Use the noun form as it appears in the dialog (singular or plural).
  - Include only nouns (e.g., people, places, things, or ideas).
  - Do not include verbs, adjectives, expressions, or other parts of speech.
  
Formatting rules:
${getJsonQualification({responseType: 'nouns'})}
EXAMPLE NOUNS RESPONSE:

${nounsReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}