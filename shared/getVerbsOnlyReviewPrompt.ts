import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type {
  GetVerbsOnlyReviewPrompt,
  GetVerbsOnlyReviewPromptProps
} from '@cknTypes/types'
import { MODULE_NAME } from '@cknTypes/constants'

export const getVerbsOnlyReviewPrompt: GetVerbsOnlyReviewPrompt = ({lesson, errors}: GetVerbsOnlyReviewPromptProps) => {
  const verbsOnlyReviewExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.NOUNS_ONLY_REVIEW, options: { asString: true }  })
  
  return (`
GIVEN:

verbsOnlyArray = ${JSON.stringify(lesson.verbsOnly.lines, null, 2)}

where the verbsOnlyArray takes the form:

  [
    "noun",
    "noun",
    "noun"
  ]

with

  - one noun per string
  - a noun can take singular or plural forms, either is fine.

and

  - use lowercase throughout
  - all content must be in lowercase

REQUEST: Review the given Spanish-language verbsOnlyArray for grammatical correctness as to each noun's

  - singular or plural forms, either is fine

expressing minor corrections in your response only when necessary. All corrections offered for the 
${lesson.language} content must reflect language appropriate for beginning ${lesson.language} learners.
${getJsonQualification({responseType: 'verbsOnlyReview'})}
Your response, an updated verbsOnlyArray, will mimic the original format of verbsOnlyArray. 
 
A complete example of a sample response follows:

EXAMPLE RESPONSE:

${verbsOnlyReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}