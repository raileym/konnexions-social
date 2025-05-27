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

//     const jsonQualification: JsonQualification = `
// RESPONSE: Express your response using well-formed JSON only, with no trailing
// commas, no single quotes (use double quotes only), no Markdown wrappers, no
// comments, no explanatory text or prose or partial JSON blocks, and no headings
// or titles. The output must be a single valid JSON array, starting
// with [ and ending with ]. Do not prepend phrases like “Here is your JSON:”.
// Assume the consumer is a machine expecting strict JSON compliance.
// `
    const jsonQualification: JsonQualification = `
RESPONSE: Express your response using well-formed JSON only, with:

  - no trailing commas,
  - no single quotes (use double quotes only),
  - no Markdown wrappers,
  - no comments,
  - no explanatory text or prose or partial JSON blocks, and
  - no headings, titles, or labels

The output must be a single valid JSON array, starting
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

    const getDialogReviewPrompt: GetDialogReviewPrompt = ({dialogArray, language}: GetDialogReviewPromptProps) => {
        const dialogReviewExample = generateExample({language, context: 'dialogReview', options: { asString: true }  })
        
        return (`
REQUEST: Review the following Spanish-language dialog array for grammatical correctness and natural usage, making minor corrections only when necessary. This dialog is intended for beginning Spanish learners.

DIALOG ARRAY:

${JSON.stringify(dialogArray, null, 2)}         
${jsonQualification}
Only include lines from the dialog that require corrections. Do not include the participant's
name in your response. The Design Review Array must take the form:

    [
        "Original line|Updated line",
        "Original line|Updated line",
        "Original line|Updated line"
    ]

Do not include unchanged lines. Exclude the speaker's name. State only the original line and
the updated line. If no lines require corrections or updates, return a JSON array with one entry,

    [ "No corrections needed" ]
 
A complete example of a sample response follows:

EXAMPLE RESPONSE:

${dialogReviewExample}
`)}

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
- use a single vertical bar ("|") with no extra spaces to separate your fields
- gender must be "masculino" or "femenino"
- common prepositions must be at least 3 valid Spanish prepositions, separated by commas
- use lowercase throughout
- all content must be in lowercase, including nouns and prepositions

EXAMPLE RESPONSE:
${nounsExample}
`
)}

    // *****************************************************************
    // VERBS PROMPT
    // *****************************************************************

    const getVerbsPrompt: GetVerbsPrompt = ({language, dialog}: GetVerbsPromptProps) => {
        
        const verbsExample = generateExample({language, context: 'verbs', options: { asString: true }  })

        return (`
REQUEST: Extract the ${language} verbs from the dialog below:

DIALOG: ${dialog}

${jsonQualification}

STRING ARRAY: A nouns response is an array of strings that takes the form,

    [
        "verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
        "verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)",
        "verb(infinitive)|verb(1st Person Singular)|verb(2nd Person Singular)|verb(3rd Person Singular)|verb(1st Person Plural)|verb(2nd Person Plural)|verb(3rd Person Plural)"
    ]

where

- Thethe vertical bar "|" delineates the seven fields
- Use a single vertical bar ("|") with no extra spaces to separate your fields
- Use lowercase throughout
- All content must be in lowercase, including nouns and prepositions
- Each line denotes a conjugation of the verb in present tense.
- Order your conjugations using an order common to all beginning ${language} classes.
- Do not include pronouns
- For reflexive verbs, conjugate them as appropriate in beginning ${language} class.

EXAMPLE RESPONSE:

${verbsExample}
`
)}

    return {
      getDialogPrompt,
      getDialogReviewPrompt,
      getNounsPrompt,
      getVerbsPrompt
    }
  }