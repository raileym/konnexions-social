import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { GetNounsOnlyReviewPrompt, GetNounsOnlyReviewPromptProps, MODULE_NAME } from "./types"

export const getNounsOnlyReviewPrompt: GetNounsOnlyReviewPrompt = ({lesson, errors}: GetNounsOnlyReviewPromptProps) => {
  const nounsOnlyReviewExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.NOUNS_ONLY_REVIEW, options: { asString: true }  })
  
  return (`
GIVEN:

nounsOnlyArray = ${JSON.stringify(lesson.nounsOnly.lines, null, 2)}

where the nounsOnlyArray takes the form:

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

REQUEST: Review the given Spanish-language nounsOnlyArray for grammatical correctness as to each noun's

  - singular or plural forms, either is fine

expressing minor corrections in your response only when necessary. All corrections offered for the 
${lesson.language} content must reflect language appropriate for beginning ${lesson.language} learners.
${jsonQualification}
Your response, an updated nounsOnlyArray, will mimic the original format of nounsOnlyArray. 
 
A complete example of a sample response follows:

EXAMPLE RESPONSE:

${nounsOnlyReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}