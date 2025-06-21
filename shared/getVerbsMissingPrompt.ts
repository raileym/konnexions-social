import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type { GetVerbsMissingPrompt, GetVerbsMissingPromptProps } from '@cknTypes/types'
import { LANGUAGE_TITLE, MODULE_NAME } from '@cknTypes/constants'

export const getVerbsMissingPrompt: GetVerbsMissingPrompt = ({lesson, errors}: GetVerbsMissingPromptProps) => {
  const verbsExample = generateExample({language: lesson.targetLanguage, moduleName: MODULE_NAME.VERBS_MISSING, options: { asString: true }  })
  
  return (`
REQUEST: Identify and return the English translation, singular form, plural form, and grammatical gender for each of the ${LANGUAGE_TITLE[lesson.targetLanguage]} verbs listed below:

VERBS TO REVIEW:

${JSON.stringify(lesson?.verbsOnlyMissing?.lines ?? [], null, 2)}

VERBS RESPONSE: Write your verbs response as an array of strings that takes the form,

  [
    "english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)"
  ]

Guidelines:
  
  - the vertical bar '|' delineates the seven fields
  - use a single vertical bar ('|') with no extra spaces to separate your fields
  - the English translation is for the noun(singular) form,
  - gender must be 'm' for masculine or 'f' for feminine
  - use lowercase throughout
  - all content must be in lowercase

Formatting rules:
${getJsonQualification({responseType: 'verbs'})}
EXAMPLE VERBS RESPONSE:
${verbsExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}