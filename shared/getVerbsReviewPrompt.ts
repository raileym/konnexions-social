import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { type GetVerbsReviewPrompt, type GetVerbsReviewPromptProps, MODULE_NAME } from './cknTypes/types/types'

export const getVerbsReviewPrompt: GetVerbsReviewPrompt = ({lesson, errors}: GetVerbsReviewPromptProps) => {
  const verbsReviewExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.VERBS_REVIEW, options: { asString: true }  })
  
  return (`
REQUEST: Review the following Spanish-language verbs for grammatical correctness and natural usage, making minor corrections only when necessary. These verbs are intended for beginning Spanish learners.

VERBS REVIEW ARRAY:

${JSON.stringify(lesson.verbs.lines, null, 2)}         
${jsonQualification}
Only include lines from the verbs that require corrections. Do not include the participant's
name in your response. The Verbs Review Array must take the form:

  [
    "verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)"
  ]

Do not include unchanged lines. Exclude the speaker's name. State only the original line and
the updated line. If no lines require corrections or updates, return a JSON array with one entry,

  [ "No corrections needed" ]
 
A complete example of a sample response follows:

EXAMPLE RESPONSE:

${verbsReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}