import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { GetDialogReviewPrompt, GetDialogReviewPromptProps, MODULE_NAME } from "./types"

export const getDialogReviewPrompt: GetDialogReviewPrompt = ({lesson}: GetDialogReviewPromptProps) => {
  const dialogReviewExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.DIALOG_REVIEW, options: { asString: true }  })
  
  return (`
REQUEST: Review the following Spanish-language dialog array for grammatical correctness and natural usage, making minor corrections only when necessary. This dialog is intended for beginning Spanish learners.

DIALOG REVIEW ARRAY:

${JSON.stringify(lesson.dialog.lines, null, 2)}         
${jsonQualification}
Only include lines from the dialog that require corrections. Do not include the participant's
name in your response. The Dialog Review Array must take the form:

  [
    "Original line|Updated line",
    "Original line|Updated line",
    "Original line|Updated line"
  ]

Do not include unchanged lines. Exclude the speaker's name. State only the original line and
the updated line. If no lines require corrections or updates, return a JSON array with one entry,

  [ "No corrections needed" ]
 
A complete example of a sample response follows:

EXAMPLE RESPONSE:

${dialogReviewExample}
`)}