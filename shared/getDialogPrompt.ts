import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { GetDialogPrompt, GetDialogPromptProps } from "./types"

export const getDialogPrompt: GetDialogPrompt = ({lesson}: GetDialogPromptProps) => {
  const dialogExample = generateExample({language: lesson.language, moduleName: 'dialog', options: { asString: true }  })
  
  return (`
DIALOG: Create a dialog in ${lesson.language} appropriate for a beginning
language instruction, where the dialog takes place ${lesson.scenarioLabel}
between participants, ${lesson.participantList}.
Use between 6 to 8 sentences for this dialog.

${jsonQualification}

STRING ARRAY: A dialog response is an array of strings that takes the form,

  [
    "G|Participant|Line from the dialog",
    "G|Participant|Line from the dialog",
    "G|Participant|Line from the dialog",
  ]

where the vertical bar "|" delineates the three fields. The first field, G,
denotes the gender of the participant, M for Male and F for Female. 
A complete example follows:

${dialogExample}
`
)}
