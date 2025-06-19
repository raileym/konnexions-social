import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type { GetVerbsOnlyPrompt, GetVerbsOnlyPromptProps } from '@cknTypes/types'
import { MODULE_NAME, SCENARIO_LABELS } from '@cknTypes/constants'
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview'

export const getVerbsOnlyPrompt: GetVerbsOnlyPrompt = ({lesson, errors}: GetVerbsOnlyPromptProps) => {
  const verbsOnlyExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.VERBS_ONLY, options: { asString: true }  })
  const dialogLines = formatDialogLinesForReview(lesson.dialog.lines)  
  
  return (`
REQUEST: Extract a list of ${lesson.language} verbs from the dialog below:

DIALOG: The following dialog is appropriate for a beginning language instruction. This dialog takes place ${SCENARIO_LABELS[lesson.scenario]} between ${lesson.participantList}.
  
${dialogLines.join('\n')}

VERBS ONLY RESPONSE: Your verbs only response should be an array of strings in the following format:

  [
    "verb",
    "verb",
    "verb"
  ]

Where:

  - each verb occupies one string in the array of strings,
  - all verbs use lowercase throughout,
  - use the verb form or conjugation as it appears in the dialog (1st, 2nd, or 3rd person, singular or plural),
  - include only verbs,
  - do not include nouns, adverbs, adjectives, expressions, or other parts of speech.

Formatting rules:
${getJsonQualification({responseType: 'verbs only'})}
EXAMPLE VERBS ONLY RESPONSE:

${verbsOnlyExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}