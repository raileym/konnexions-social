import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { GetDialogPrompt, GetDialogPromptProps } from "./types"

export const getDialogPrompt: GetDialogPrompt = ({lesson}: GetDialogPromptProps) => {
    const dialogExample = generateExample({lesson, lessonTitle: 'dialog', options: { asString: true }  })
    
    return (`
DIALOG: Create a dialog in ${lesson.language} appropriate for a beginning
language instruction, where the dialog takes place ${lesson.scenarioLabel}
between participants, ${lesson.participantList}.
Use between 6 to 8 sentences for this dialog.

${jsonQualification}

STRING ARRAY: A dialog response is an array of strings that takes the form,

  [
    "Participant|Line from the dialog",
    "Participant|Line from the dialog",
    "Participant|Line from the dialog",
  ]

where the vertical bar "|" delineates the two fields. A complete example
follows:

${dialogExample}
`
)}
