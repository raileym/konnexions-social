import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { type GetVerbsPrompt, type GetVerbsPromptProps, MODULE_NAME } from './cknTypes/types/types'

export const getVerbsPrompt: GetVerbsPrompt = ({lesson, errors}: GetVerbsPromptProps) => {
        
  const verbsExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.VERBS, options: { asString: true }  })

  return (`
REQUEST: Extract the ${lesson.language} verbs from the dialog below. Only include present-tense verbs, 
not greetings (e.g., “buenos días”), nouns, or fixed expressions. Do not include repeated phrases
unless they are valid present-tense conjugations of the same verb.

DIALOG: ${lesson.prose}

${jsonQualification}

STRING ARRAY: A nouns response is an array of strings that takes the form,

  [
    "verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)"
  ]

where there are seven fields total beginning with the infinitive followed
by the six forms of conjugation in common order.

Also,

  - The vertical bar "|" delineates the seven fields
  - Use a single vertical bar ("|") with no extra spaces to separate your fields
  - Use lowercase throughout
  - All content must be in lowercase, including nouns and prepositions
  - Each line denotes a conjugation of the verb in present tense.
  - Order your conjugations using an order common to all beginning ${lesson.language} classes.
  - Do not include pronouns
  - For reflexive verbs, conjugate them as appropriate in beginning ${lesson.language} class.

EXAMPLE RESPONSE:

${verbsExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}