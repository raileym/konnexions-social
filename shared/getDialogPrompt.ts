import { generateExample } from '@shared/generateExample'
import { getJsonQualification } from '@shared/getJsonQualification'
import { type GetDialogPrompt, type GetDialogPromptProps } from '@cknTypes/types'
import { LANGUAGE_TITLE, SCENARIO_LABELS } from '@cknTypes/constants'
export const getDialogPrompt: GetDialogPrompt = ({scenarioData, lesson, errors}: GetDialogPromptProps) => {
  const dialogExample = generateExample({language: lesson.targetLanguage, moduleName: 'dialog', options: { asString: true }  })
  
  // cXonsole.log('scenarioData.nouns', scenarioData?.nouns)

  const constrainedNouns = scenarioData?.nouns?.map((noun) => (`'${noun.noun_singular}'`))
  const requiredNouns = scenarioData?.nounsChooseN?.map((noun) => (`'${noun.noun_singular}'`))

  return (`
DIALOG: Create a dialog in ${LANGUAGE_TITLE[lesson.targetLanguage]} appropriate for a beginning language instruction, where the dialog takes place ${SCENARIO_LABELS[lesson.scenario]} between participants, ${lesson.participantList}. The dialog must contain between 8 to 12 lines, reflecting a natural dialog exchange. The dialog should contain no fewer than 8 lines. The dialog should not end on a question -- the dialog should always resolve.

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
    'm|Participant|Line from the dialog',
    'f|Participant|Line from the dialog',
    'm|Participant|Line from the dialog',
  ],

where the vertical bar '|' delineates three fields:

    - the gender of the speaking participant using "m" for masculine and "f" for feminine,
    - the title of the participant, ${lesson.participantList.replace(/and/g, 'or')}, and 
    - the particular dialog line spoken.
${getJsonQualification({responseType: 'dialog'})}
A complete example of a dialog response follows:

${dialogExample}

${errors.length > 0 ? `AVOID THESE ERRORS:\n\n${errors.map(error => `    - ${error.detail}`).join('\n')}` : ''}
`
)}
