import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type { GetNounsPrompt, GetNounsPromptProps } from '@cknTypes/types'
import { LANGUAGE_TITLE, MODULE_NAME } from '@cknTypes/constants'
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview'

export const getNounsPrompt: GetNounsPrompt = ({lesson, errors}: GetNounsPromptProps) => {
  const nounsExample = generateExample({language: lesson.targetLanguage, moduleName: MODULE_NAME.NOUNS, options: { asString: true }  })
  const formatDialogLines = formatDialogLinesForReview(lesson.dialog.lines)  

  return (`
REQUEST: Extract the ${LANGUAGE_TITLE[lesson.targetLanguage]} nouns from the dialog below:

DIALOG:

  ${formatDialogLines.join('\n  ')}

NOUNS RESPONSE: Your nouns response should be a well-formed JSON array of strings in the following format:

  [
    "english(translation)|noun(singular)|noun(plural)|gender",
    "english(translation)|noun(singular)|noun(plural)|gender",
    "english(translation)|noun(singular)|noun(plural)|gender"
  ].

Guidelines:

  - Each noun occupies one string in the array of strings.
  - All nouns use lowercase throughout.
  - The English translation is for the noun(singular) form expressed in lower case.
  - Include only nouns (e.g., people, places, things, or ideas).
  - Do not include verbs, adjectives, expressions, or other parts of speech.

Formatting rules:
${getJsonQualification({responseType: 'nouns'})}
EXAMPLE NOUNS RESPONSE:

${nounsExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}