import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import { type GetVerbsPrompt, type GetVerbsPromptProps } from '@cknTypes/types'
import { LANGUAGE_TITLE, MODULE_NAME } from '@cknTypes/constants'
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview'

export const getVerbsPrompt: GetVerbsPrompt = ({lesson, errors}: GetVerbsPromptProps) => {
        
  const verbsExample = generateExample({language: lesson.targetLanguage, moduleName: MODULE_NAME.VERBS, options: { asString: true }  })

  const formatDialogLines = formatDialogLinesForReview(lesson.dialog.lines)  
  
  return (`
REQUEST: Extract the ${LANGUAGE_TITLE[lesson.targetLanguage]} verbs from the dialog below. Only include present-tense verbs, not greetings (e.g., “buenos días”), nouns, or fixed expressions. Do not include repeated phrases unless they are valid present-tense conjugations of the same verb.

DIALOG:

  ${formatDialogLines.join('\n  ')}
  
VERBS RESPONSE: Your verbs response should be a well-formed JSON array of strings in the following format:
  
  [
    "english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)"
  ]
  
where there are eight fields total beginning with the English translation of the infinite form of the verb followed by the six forms of conjugation in common order.

Guidelines:

  - Each verb (with its eight fields) occupies one string in the array of strings.
  - All verb details use lowercase throughout.
  - The English translation is for the infinitive form of the verb expressed in lower case.
  - Include only verbs
  - Do not include pronouns
  - Do not include nouns, adjectives, expressions, or other parts of speech.
  - For reflexive verbs, conjugate them as appropriate in beginning ${LANGUAGE_TITLE[lesson.targetLanguage]} class.
  - Use a single vertical bar ('|') with no extra spaces to separate your fields

Formatting rules:
${getJsonQualification({responseType: 'verbs'})}
EXAMPLE VERBS RESPONSE:

${verbsExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}