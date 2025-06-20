import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type { GetNounsMissingReviewPrompt, GetNounsMissingReviewPromptProps } from '@cknTypes/types'
import { MODULE_NAME } from '@cknTypes/constants'
import { formatNounLinesForReview } from '@shared/formatNounLinesForReview'

export const getNounsMissingReviewPrompt: GetNounsMissingReviewPrompt = ({lesson, errors}: GetNounsMissingReviewPromptProps) => {
  const nounsMissingReviewExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.NOUNS_MISSING_REVIEW, options: { asString: true }  })
  
  const nounReviewLines = formatNounLinesForReview(lesson.nounsMissing.lines)

  return (`
REQUEST: Review the list of ${lesson.language} nouns below as to each noun's details: English translation, singular form, plural form, and proper grammatical gender. Your task is to ensure the details for each noun are correct.

NOUNS TO REVIEW:

${JSON.stringify(nounReviewLines, null, 2)}

which takes the form

  [
    "N. english(translation)|noun(singular)|noun(plural)|gender",
    "N. english(translation)|noun(singular)|noun(plural)|gender",
    "N. english(translation)|noun(singular)|noun(plural)|gender"
  ],

where
  
  - 'N.' denotes the line number for the noun
  - the vertical bar '|' separates four fields: English translation, singular form, plural form, and grammatical gender,
  - the English translation is for the noun(singular) form,
  - there is no extra space surrounding the vertical bar ('|'),
  - gender is either 'm' for masculine or 'f' for feminine, and
  - all content is in lowercase.

NOUNS REVIEW RESPONSE: Return a numbered list of nouns and their details in line with the original list, correcting any errors in the noun's details, as needed.

NOUNS REVIEW RESPONSE FORMAT: Return your response as a single valid JSON array with all items from the original list, whether corrected or unchanged, using the same structure:

  [
    "N. english(translation)|noun(singular)|noun(plural)|gender",
    "N. english(translation)|noun(singular)|noun(plural)|gender",
    "N. english(translation)|noun(singular)|noun(plural)|gender"
  ]

Formatting rules:
${getJsonQualification({responseType: ''})}
EXAMPLE NOUNS ONLY RESPONSE:

${nounsMissingReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}