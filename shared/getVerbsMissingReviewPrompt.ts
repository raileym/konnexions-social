import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import type { GetVerbsMissingReviewPrompt, GetVerbsMissingReviewPromptProps } from '@cknTypes/types'
import { MODULE_NAME } from '@cknTypes/constants'
import { formatVerbLinesForReview } from '@shared/formatVerbLinesForReview'

export const getVerbsMissingReviewPrompt: GetVerbsMissingReviewPrompt = ({lesson, errors}: GetVerbsMissingReviewPromptProps) => {
  const verbsMissingReviewExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.VERBS_MISSING_REVIEW, options: { asString: true }  })
  
  const verbReviewLines = formatVerbLinesForReview(lesson?.verbsMissing?.lines ?? [])

  return (`
REQUEST: Review the list of ${lesson.language} verbs below as to each verb's details: English translation, singular form, plural form, and proper grammatical gender. Your task is to ensure the details for each verb are correct.

VERBS TO REVIEW:

${JSON.stringify(verbReviewLines, null, 2)}

which takes the form

  [
    "N. english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "N. english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "N. english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)"
  ]

where
  
  - 'N.' denotes the line number for the verb,
  - the vertical bar '|' separates eight fields,
  - the English translation is for the infinitive form of the verb (minus the 'to' part),
  - there is no extra space surrounding the vertical bar ('|'),
  - gender is either 'm' for masculine or 'f' for feminine, and
  - all content is in lowercase.

VERBS REVIEW RESPONSE: Return a numbered list of verbs and their details in line with the original list, correcting any errors in the verb's details, as needed.

VERBS REVIEW RESPONSE FORMAT: Return your response as a single valid JSON array with all items from the original list, whether corrected or unchanged, using the same structure:

  [
    "N. english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "N. english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
    "N. english(translation)|verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)"
  ]

Formatting rules:
${getJsonQualification({responseType: ''})}
EXAMPLE VERBS ONLY RESPONSE:

${verbsMissingReviewExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}