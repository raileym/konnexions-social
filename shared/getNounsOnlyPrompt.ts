import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type { GetNounsOnlyPrompt, GetNounsOnlyPromptProps } from '@cknTypes/types'
import { LANGUAGE_TITLE, MODULE_NAME, SCENARIO_LABELS } from '@cknTypes/constants'
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview'

export const getNounsOnlyPrompt: GetNounsOnlyPrompt = ({lesson, errors}: GetNounsOnlyPromptProps) => {
  const nounsOnlyExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.NOUNS_ONLY, options: { asString: true }  })
  const dialogLines = formatDialogLinesForReview(lesson.dialog.lines)  
  
  // console.log('dialogLines',dialogLines)
  return (`
REQUEST: Extract a list of ${LANGUAGE_TITLE[lesson.language]} nouns from the dialog below:

DIALOG: The following dialog is appropriate for a beginning language instruction. This dialog takes place ${SCENARIO_LABELS[lesson.scenario]} between ${lesson.participantList}.
  
${dialogLines.join('\n')}

NOUNS ONLY RESPONSE: Your nouns only response should be an array of strings in the following format:

  [
    "noun",
    "noun",
    "noun"
  ],

Guidelines:

  - each noun occupies one string in the array of strings,
  - all nouns use lowercase throughout,
  - use the noun form as it appears in the dialog (singular or plural),
  - include only nouns (e.g., people, places, things, or ideas),
  - do not include verbs, adjectives, expressions, or other parts of speech.

Formatting rules:
${getJsonQualification({responseType: 'nouns only'})}
EXAMPLE NOUNS ONLY RESPONSE:

${nounsOnlyExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}