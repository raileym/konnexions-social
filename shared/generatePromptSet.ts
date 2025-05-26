import type {
  GetDialogPrompt,
  GetDialogPromptProps,
  GetDialogReviewPrompt,
  GetDialogReviewPromptProps,
  GeneratePromptSet,
  JsonQualification,
  GetNounsPrompt,
  GetNounsPromptProps,
  PromptSet,
  GetVerbsPrompt,
  GetVerbsPromptProps
} from "./types"

import { generateExample } from './generateExample'

export const generatePromptSet: GeneratePromptSet = (): PromptSet => {

    const jsonQualification: JsonQualification = `
RESPONSE: Express your response using well-formed JSON only, with no trailing
commas, no single quotes (use double quotes only), no Markdown wrappers, no
comments, no explanatory text or prose or partial JSON blocks, and no headings
or titles. The output must be a single valid JSON array, starting
with [ and ending with ]. Do not prepend phrases like “Here is your JSON:”.
Assume the consumer is a machine expecting strict JSON compliance.
`

    // *****************************************************************
    // DIALOG PROMPT
    // *****************************************************************

    
    const getDialogPrompt: GetDialogPrompt = ({language, scenarioLabel, scenarioParticipantList}: GetDialogPromptProps) => {
      const dialogExample = generateExample({language, context: 'dialog', options: { asString: true }  })
      
      return (`
DIALOG: Create a dialog in ${language} appropriate for a beginning
language instruction, where the dialog takes place ${scenarioLabel}
between participants, ${scenarioParticipantList}.
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

    // *****************************************************************
    // DIALOG REVIEW PROMPT
    // *****************************************************************

    const getDialogReviewPrompt: GetDialogReviewPrompt = ({dialog, language}: GetDialogReviewPromptProps) => `
REQUEST: Review the following ${language}-language dialog for grammatical correctness and
         natural usage appropriate for beginning Spanish learners.

${jsonQualification}
Only include lines from the dialog that require corrections. Do not include the participant's
name in your response. Each string in the array must take the form:

    "Original line|Updated line"

Do not include unchanged lines. If no lines require corrections, return an empty array: []

DIALOG: ${dialog}

A complete example of a sample response follows:

    [
      "Hola, estoy bien. Quisiera ver el menú, por favor.|Hola, estoy bien. ¿Puedo ver el menú, por favor?",
      "Perfecto, ¿ya decidiste qué vas a comer?|Perfecto, ¿ya decidiste lo que vas a comer?"
    ]


`

    // *****************************************************************
    // NOUNS PROMPT
    // *****************************************************************

    const getNounsPrompt: GetNounsPrompt = ({language, dialog}: GetNounsPromptProps) => {
        const nounsExample = generateExample({language, context: 'nouns', options: { asString: true }  })
        
        return (`
REQUEST: Extract the ${language} nouns from the dialog below:

DIALOG: ${dialog}

${jsonQualification}

STRING ARRAY: A nouns response is an array of strings that takes the form,

    [
        "gender|noun(singular)|noun(plural)|common prepositions",
        "gender|noun(singular)|noun(plural)|common prepositions",
        "gender|noun(singular)|noun(plural)|common prepositions"
    ]

where

- the vertical bar "|" delineates the four fields
- Use a single vertical bar ("|") with no extra spaces to separate your fields
- gender must be "masculino" or "femenino"
- common prepositions must be at least 3 valid Spanish prepositions, separated by commas
- use lowercase throughout
- all content must be in lowercase, including nouns and prepositions

EXAMPLE:
${nounsExample}
`
)}

    // *****************************************************************
    // VERBS PROMPT
    // *****************************************************************

    const getVerbsPrompt: GetVerbsPrompt = ({dialog}: GetVerbsPromptProps) => `
REQUEST: Extract the verbs from the dialog below:

DIALOG: ${dialog}
${jsonQualification}
Each string in the array must take the form:

    "verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)"

where you are conjugating the verb in present tense. Do not include the pronouns, which are assumed for each conjugation, as ordered in common conjugation order.
If verbs can be conjugated reflexively, then conjugate them as one would first see them in a beginning lesson on Spanish.

A complete example follows:

    [
      "gustar|me gusta|te gusta|le gusta|nos gusta|os gusta|les gusta",
      "ordenar|ordeno|ordenas|ordena|ordenamos|ordenáis|ordenan",
      "pedir|pido|pides|pide|pedimos|pedís|piden",
    ]
`

    return {
      getDialogPrompt,
      getDialogReviewPrompt,
      getNounsPrompt,
      getVerbsPrompt
    }
  }