import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { GetNounsOnlyPrompt, GetNounsOnlyPromptProps, MODULE_NAME } from "./types"

export const getNounsOnlyPrompt: GetNounsOnlyPrompt = ({lesson, errors}: GetNounsOnlyPromptProps) => {
  const nounsOnlyExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.NOUNS_ONLY, options: { asString: true }  })
  
  return (`
REQUEST: Extract a list of ${lesson.language} nouns from the dialog below:

DIALOG: ${lesson.prose}

${jsonQualification}

STRING ARRAY: A list of nouns is an array of strings with one noun only per string,

  [
    "noun",
    "noun",
    "noun",
    "noun",
    "noun"
  ]

where

  - use only one string per noun
  - use lowercase throughout
  - all content must be in lowercase

EXAMPLE RESPONSE:
${nounsOnlyExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}