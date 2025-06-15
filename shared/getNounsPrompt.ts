import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import type { GetNounsPrompt, GetNounsPromptProps } from '@cknTypes/types'
import { MODULE_NAME } from '@cknTypes/constants'

export const getNounsPrompt: GetNounsPrompt = ({lesson, errors}: GetNounsPromptProps) => {
  const nounsExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.NOUNS, options: { asString: true }  })
  
  return (`
REQUEST: Extract the ${lesson.language} nouns from the dialog below:

DIALOG: ${lesson.prose}

${jsonQualification}

STRING ARRAY: A nouns response is an array of strings that takes the form,

  [
    "noun(singular)|noun(plural)|gender|common prepositions",
    "noun(singular)|noun(plural)|gender|common prepositions",
    "noun(singular)|noun(plural)|gender|common prepositions"
  ]

where

  - the vertical bar "|" delineates the four fields
  - use a single vertical bar ("|") with no extra spaces to separate your fields
  - gender must be "masculino" or "femenino"
  - common prepositions must be at least 3 valid Spanish prepositions, separated by commas
  - use lowercase throughout
  - all content must be in lowercase, including nouns and prepositions

EXAMPLE RESPONSE:
${nounsExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}