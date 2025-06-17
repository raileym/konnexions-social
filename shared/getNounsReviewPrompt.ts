import { generateExample } from '@shared/generateExample'
import { jsonQualification } from '@shared/jsonQualification'
import type { GetNounsReviewPrompt, GetNounsReviewPromptProps } from '@cknTypes/types'
import { MODULE_NAME } from '@cknTypes/constants'

export const getNounsReviewPrompt: GetNounsReviewPrompt = ({lesson, errors}: GetNounsReviewPromptProps) => {
  const nounsReviewExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.NOUNS_REVIEW, options: { asString: true }  })
  
  return (`
GIVEN:

nounsArray = ${JSON.stringify(lesson.nouns.lines, null, 2)}

where the nounsArray takes the form:

  [
    "noun(singular)|noun(plural)|gender|common prepositions",
    "noun(singular)|noun(plural)|gender|common prepositions",
    "noun(singular)|noun(plural)|gender|common prepositions"
  ]

with

  - Field no 1: gender must be 'M' or 'F' for masculine and feminine, respectively
  - Field no 2: singular form of the noun
  - Field no 3: plural form of the noun, grammatically correct and commonly accepted in Latin American Spanish
  - Field no 4: common prepositions frequently used with the noun. Include at least 3 valid Spanish prepositions, separated by commas

and

  - the vertical bar '|' delineates the four fields
  - use a single vertical bar ('|') with no extra spaces to separate your fields
  - use lowercase throughout
  - all content must be in lowercase, including nouns and prepositions

REQUEST: Review the given Spanish-language nounsArray for grammatical correctness as to each noun's

  - proper gender,
  - singular form,
  - plural form,
  - common prepositions used with the noun,

expressing minor corrections in your response only when necessary. All corrections offered for the 
${lesson.language} content must reflect language appropriate for beginning ${lesson.language} learners.
${jsonQualification}
Only include lines from nounsArray that require corrections. Your response, an updated nounsArray, will mimic the original format of nounsArray. Do not include unchanged lines. If no lines require corrections or updates, return a JSON array with one entry,

  [ 'No corrections needed' ]
 
A complete example of a sample response follows:

EXAMPLE RESPONSE:

${nounsReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}