import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import { type GetDialogDraftPrompt, type GetDialogDraftPromptProps } from '@cknTypes/types'
import { MODULE_NAME } from '@cknTypes/constants'
import { getRequiredForm } from '@shared/getRequiredForm'
import { getDialogDescription } from '@shared/getDialogDescription'

export const getDialogDraftPrompt: GetDialogDraftPrompt = ({lesson, errors}: GetDialogDraftPromptProps) => {
  const dialogDraftExample = generateExample({
    language: lesson.targetLanguage, 
    moduleName: MODULE_NAME.DIALOG_DRAFT, 
    lessonPromptStyle: lesson.lessonPromptStyle,
    options: { asString: true } 
  })
  
  const requiredForm = getRequiredForm({lesson, lessonPromptStyle: lesson.lessonPromptStyle})
  
  return (`
${getDialogDescription(lesson)}

${lesson.lessonPromptStyle.toUpperCase()} RESPONSE: Your ${lesson.lessonPromptStyle} response should be an array of strings that takes the form,

  ${requiredForm}
  
Formatting rules:
${getJsonQualification({responseType: lesson.lessonPromptStyle})}
A complete example of a ${lesson.lessonPromptStyle} response follows:

${dialogDraftExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}
