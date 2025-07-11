import { generateExample } from '../shared/generateExample.js'
import { getJsonQualification } from '../shared/getJsonQualification.js'
import { type GetDialogDraftPrompt, type GetDialogDraftPromptProps } from '../shared/cknTypes/types.js'
import { MODULE_NAME } from '../shared/cknTypes/constants.js'
import { getRequiredForm } from '../shared/getRequiredForm.js'
import { getDialogDescription } from '../shared/getDialogDescription.js'

export const getDialogDraftPrompt: GetDialogDraftPrompt = ({lesson, errors}: GetDialogDraftPromptProps) => {
  const dialogDraftExample = generateExample({
    language: lesson.targetLanguage, 
    moduleName: MODULE_NAME.DIALOG_DRAFT, 
    lessonPromptStyle: lesson.lessonPromptStyle,
    options: { asString: true } 
  })
  
  // cXonsole.log('getDialogDraftPrompt:lesson', lesson)
  
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
