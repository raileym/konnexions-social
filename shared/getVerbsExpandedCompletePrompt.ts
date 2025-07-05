import { generateExample } from '../shared/generateExample.js'
import { getJsonQualification } from '../shared/getJsonQualification.js'
import { type GetVerbsExpandedCompletePrompt, type GetVerbsExpandedCompletePromptProps } from '../shared/cknTypes/types.js'
import { LANGUAGE_TITLE, MODULE_NAME } from '../shared/cknTypes/constants.js'

export const getVerbsExpandedCompletePrompt: GetVerbsExpandedCompletePrompt = ({lesson, errors}: GetVerbsExpandedCompletePromptProps) => {
  const verbsExpandedCompleteExample = generateExample({language: lesson.targetLanguage, moduleName: MODULE_NAME.VERBS_EXPANDED_COMPLETE, lessonPromptStyle: lesson.lessonPromptStyle, options: { asString: true }  })
  
  return (`
REQUEST: Complete the sentences below as appropriate for a beginner's lesson in ${LANGUAGE_TITLE[lesson.targetLanguage]}.

IN-COMPLETE SENTENCES:

${lesson.verbsExpandedInComplete.lines.map(line => `    ${line}`).join('\n')}
${getJsonQualification({responseType: 'verbs'})}
Align numbered in-complete sentences with numbered complete sentences. The Numbered Complete Sentences Array must take the form:

  [
    "1. Complete sentence.",
    "2. Complete sentence.",
    "3. Complete sentence.",
    ...
  ]

Each complete sentence must show a realistic use of the verb, appropriate for a beginner learning ${LANGUAGE_TITLE[lesson.targetLanguage]}.

- Include a clear object, place, or time expression (e.g., un libro, al parque, cada mañana).
- Avoid one-word or two-word sentences like “Yo voy.” or “Tú tienes.”
- Do not use nouns like “gracias” as verbs.
- Stay in present tense, use friendly and useful vocabulary.

A complete example of a sample response follows:

EXAMPLE RESPONSE (SAMPLE COMPLETED SENTENCES):

${verbsExpandedCompleteExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}