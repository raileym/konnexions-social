import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { GetDialogPrompt, GetDialogPromptProps, scenarioLabels } from "./types"

export const getDialogPrompt: GetDialogPrompt = ({lesson, errors}: GetDialogPromptProps) => {
  const dialogNouns = getConstraints({language: lesson.language, scenario: lesson.scenario, options: { asString: true }  })
  const dialogExample = generateExample({language: lesson.language, moduleName: 'dialog', options: { asString: true }  })
  
  return (`
DIALOG: Create a dialog in ${lesson.language} appropriate for a beginning
language instruction, where the dialog takes place ${scenarioLabels[lesson.scenario]}
between participants, ${lesson.participantList}.
Use between 6 to 8 sentences for this dialog.

${jsonQualification}

STRING ARRAY: A dialog response is an array of strings that takes the form,

  [
    "M|Participant|Line from the dialog",
    "F|Participant|Line from the dialog",
    "M|Participant|Line from the dialog",
  ]

where the vertical bar "|" delineates the three fields. The first field, M or F,
denotes the gender of the participant, M for Male and F for Female. 
A complete example follows:

${dialogExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}
