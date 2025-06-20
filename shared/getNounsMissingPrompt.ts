import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type { GetNounsMissingPrompt, GetNounsMissingPromptProps } from '@cknTypes/types'
import { MODULE_NAME } from '@cknTypes/constants'

export const getNounsMissingPrompt: GetNounsMissingPrompt = ({lesson, errors}: GetNounsMissingPromptProps) => {
  const nounsExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.NOUNS_MISSING, options: { asString: true }  })
  
  return (`
REQUEST: Identify and return the English translation, singular form, plural form, and grammatical gender for each of the ${lesson.language} nouns listed below:

NOUNS TO REVIEW:

${JSON.stringify(lesson?.nounsOnlyMissing?.lines, null, 2)}

NOUNS RESPONSE: Write your nouns response as an array of strings that takes the form,

[
  "english(translation)|noun(singular)|noun(plural)|gender",
  "english(translation)|noun(singular)|noun(plural)|gender",
  "english(translation)|noun(singular)|noun(plural)|gender"
]

Guidelines:
  
  - the vertical bar '|' delineates the four fields
  - use a single vertical bar ('|') with no extra spaces to separate your fields
  - the English translation is for the noun(singular) form,
  - gender must be 'm' for masculine or 'f' for feminine
  - use lowercase throughout
  - all content must be in lowercase

Formatting rules:
${getJsonQualification({responseType: 'nouns'})}
EXAMPLE NOUNS RESPONSE:
${nounsExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}