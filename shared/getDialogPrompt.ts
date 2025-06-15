import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { type GetDialogPrompt, type GetDialogPromptProps, scenarioLabels } from "./types"
// import { getConstraints } from '../shared/getConstraints'
export const getDialogPrompt: GetDialogPrompt = ({scenarioData, lesson, errors}: GetDialogPromptProps) => {
  // const dialogNouns = getConstraints({language: lesson.language, scenario: lesson.scenario  })
  const dialogExample = generateExample({language: lesson.language, moduleName: 'dialog', options: { asString: true }  })
  
  console.log('scenarioData.nouns', scenarioData?.nouns)

  const constrainedNouns = scenarioData?.nouns?.map((noun) => (`"${noun.noun_singular}"`))
  const requiredNouns = scenarioData?.nounsChooseN?.map((noun) => (`"${noun.noun_singular}"`))

  return (`
DIALOG: Create a dialog in ${lesson.language} appropriate for a beginning language instruction, where the dialog takes place ${scenarioLabels[lesson.scenario]} between participants, ${lesson. participantList}. The dialog must contain between 6 to 8 lines, reflecting a natural exchange.

REQUIRED NOUNS: Your dialog must strongly prefer to include at least one of the following nouns:

    [
${requiredNouns.join(', ')}
    ]

CONSTRAINED NOUNS: Limit your noun usage to the following list. If your dialog uses additional nouns, they must be clearly associated with typical scenario ${scenarioLabels[lesson.scenario]}.

    [
${constrainedNouns.join(', ')}
    ]
${jsonQualification}
STRING ARRAY: A dialog response is an array of strings that takes the form,

  [
    "M|Participant|Line from the dialog",
    "F|Participant|Line from the dialog",
    "M|Participant|Line from the dialog",
  ]

where the vertical bar "|" delineates the three fields. The first field, M or F, denotes the gender of the participant, M for Male and F for Female. A complete example follows:

${dialogExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}
