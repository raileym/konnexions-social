import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { type GetVerbsExpandedCompletePrompt, type GetVerbsExpandedCompletePromptProps, MODULE_NAME } from "./types"

export const getVerbsExpandedCompletePrompt: GetVerbsExpandedCompletePrompt = ({lesson, errors}: GetVerbsExpandedCompletePromptProps) => {
  const verbsExpandedCompleteExample = generateExample({language: lesson.language, moduleName: MODULE_NAME.VERBS_EXPANDED_COMPLETE, options: { asString: true }  })
  
  return (`
REQUEST: Complete the sentences below as appropriate for a beginner's lesson in ${lesson.language}.

IN-COMPLETE SENTENCES:

${lesson.verbsExpanded.lines.map(line => `    ${line}`).join('\n')}
${jsonQualification}
Align numbered in-complete sentences with numbered complete sentences. The Numbered Complete Sentences Array must take the form:

  [
    "1. Complete sentence.",
    "2. Complete sentence.",
    "3. Complete sentence.",
    ...
  ]

A complete example of a sample response follows:

EXAMPLE RESPONSE (SAMPLE COMPLETED SENTENCES):

${verbsExpandedCompleteExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`)}