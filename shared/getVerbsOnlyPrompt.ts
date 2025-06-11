import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { GetVerbsOnlyPrompt, GetVerbsOnlyPromptProps, MODULE_NAME } from "./types"

export const getVerbsOnlyPrompt: GetVerbsOnlyPrompt = ({lesson, errors}: GetVerbsOnlyPromptProps) => {
  const verbsOnlyExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.NOUNS_ONLY, options: { asString: true }  })
  
  return (`
REQUEST: Extract a list of ${lesson.language} verbs from the dialog below:

DIALOG: ${lesson.prose}

${jsonQualification}

STRING ARRAY: A list of verbs is an array of strings with one noun only per string,

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
${verbsOnlyExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}