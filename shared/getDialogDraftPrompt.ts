import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import { type GetDialogDraftPrompt, type GetDialogDraftPromptProps } from '@cknTypes/types'
import { LESSON_PROMPT_STYLE, MODULE_NAME } from '@cknTypes/constants'
import { getRequiredForm } from '@shared/getRequiredForm'

export const getDialogDraftPrompt: GetDialogDraftPrompt = ({lesson, errors}: GetDialogDraftPromptProps) => {
  const dialogDraftExample = generateExample({
    language: lesson.targetLanguage, 
    moduleName: MODULE_NAME.DIALOG_DRAFT, 
    lessonPromptStyle: lesson.lessonPromptStyle,
    options: { asString: true } 
  })
  
  const requiredForm = getRequiredForm({lesson, lessonPromptStyle: lesson.lessonPromptStyle})
  
  return (`

${lesson.lessonPromptStyle.toUpperCase()}: ${lesson.lessonPrompt} The ${lesson.lessonPromptStyle} should be appropriate for beginning-level language instruction. The ${lesson.lessonPromptStyle} must contain between 8 to 12 lines, reflecting a natural flow for a ${lesson.lessonPromptStyle}. The ${lesson.lessonPromptStyle} should contain no fewer than 8 lines. ${lesson.lessonPromptStyle === LESSON_PROMPT_STYLE.DIALOG ? 'The dialog should not end on a question -- the dialog should always resolve.' : ''}

${lesson.lessonPromptStyle.toUpperCase()} RESPONSE: Your ${lesson.lessonPromptStyle} response should be an array of strings that takes the form,

  ${requiredForm}
  
Formatting rules
${getJsonQualification({responseType: lesson.lessonPromptStyle})}
A complete example of a ${lesson.lessonPromptStyle} response follows:

${dialogDraftExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}
