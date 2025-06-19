import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import { type GetDialogPrompt, type GetDialogPromptProps } from '@cknTypes/types'
import { SCENARIO_LABELS } from '@cknTypes/constants'
// import { getConstraints } from '@shared/getConstraints'
export const getDialogPrompt: GetDialogPrompt = ({scenarioData, lesson, errors}: GetDialogPromptProps) => {
  // const dialogNouns = getConstraints({language: lesson.language, scenario: lesson.scenario  })
  const dialogExample = generateExample({language: lesson.language, moduleName: 'dialog', options: { asString: true }  })
  
  // console.log('scenarioData.nouns', scenarioData?.nouns)

  const constrainedNouns = scenarioData?.nouns?.map((noun) => (`'${noun.noun_singular}'`))
  const requiredNouns = scenarioData?.nounsChooseN?.map((noun) => (`'${noun.noun_singular}'`))

  return (`
DIALOG: Create a dialog in ${lesson.language} appropriate for a beginning language instruction, where the dialog takes place ${SCENARIO_LABELS[lesson.scenario]} between participants, ${lesson.participantList}. The dialog must contain between 6 to 8 lines, reflecting a natural dialog exchange.

REQUIRED NOUNS: Your dialog must strongly prefer to include at least one of the following nouns:

    [
${requiredNouns.join(', ')}
    ].

CONSTRAINED NOUNS: Limit your noun usage to the following list. If your dialog uses additional nouns, they must be clearly associated with a typical scenario ${SCENARIO_LABELS[lesson.scenario]}.

    [
${constrainedNouns.join(', ')}
    ].

DIALOG RESPONSE: Your dialog response should be an array of strings that takes the form,

  [
    'M|Participant|Line from the dialog',
    'F|Participant|Line from the dialog',
    'M|Participant|Line from the dialog',
  ],

where the vertical bar '|' delineates three fields:

    - the gender of the speaking participant using M for Male and F for Female,
    - the title of the participant, ${lesson.participantList.replace(/and/g, 'or')}, and 
    - the particular dialog line spoken.
${getJsonQualification({responseType: 'dialog'})}
A complete example of a dialog response follows:

${dialogExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}
