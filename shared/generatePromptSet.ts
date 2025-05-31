import {
  type GetDialogPrompt,
  type GetDialogPromptProps,
  type GetDialogReviewPrompt,
  type GetDialogReviewPromptProps,
  type GeneratePromptSet,
  type JsonQualification,
  type GetNounsPrompt,
  type GetNounsPromptProps,
  type PromptSet,
  type GetVerbsPrompt,
  type GetVerbsPromptProps,
  type GetNounsReviewPromptProps,
  type GetNounsReviewPrompt,
  type GetVerbsReviewPromptProps,
  type GetVerbsReviewPrompt,
  type GetPromptProps,
  type GetPrompt,
  type Lesson,
  LESSON_TITLE
} from "./types"

import { generateExample } from './generateExample'

import type { LessonTitle } from './types' // adjust path as needed

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

  
  const getDialogPrompt: GetDialogPrompt = ({lesson}: GetDialogPromptProps) => {
    const dialogExample = generateExample({language: lesson.language, lessonTitle: 'dialog', options: { asString: true }  })
    
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

  // *****************************************************************
  // DIALOG REVIEW PROMPT
  // *****************************************************************

  const getDialogReviewPrompt: GetDialogReviewPrompt = ({lesson}: GetDialogReviewPromptProps) => {
    const dialogReviewExample = generateExample({language: lesson.language, lessonTitle: LESSON_TITLE.DIALOG_REVIEW, options: { asString: true }  })
    
    return (`
REQUEST: Review the following Spanish-language dialog array for grammatical correctness and natural usage, making minor corrections only when necessary. This dialog is intended for beginning Spanish learners.

DIALOG REVIEW ARRAY:

${JSON.stringify(lesson.dialog.dialogLines, null, 2)}         
${jsonQualification}
Only include lines from the dialog that require corrections. Do not include the participant's
name in your response. The Dialog Review Array must take the form:

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
  // NOUNS REVIEW PROMPT
  // *****************************************************************

  const getNounsReviewPrompt: GetNounsReviewPrompt = ({lesson}: GetNounsReviewPromptProps) => {
    const nounsReviewExample = generateExample({language: lesson.language, lessonTitle: LESSON_TITLE.NOUNS_REVIEW, options: { asString: true }  })
    
    return (`
GIVEN:

nounsArray = ${JSON.stringify(lesson.nouns.nounsLines, null, 2)}

where the nounsArray takes the form:

  [
    "gender|noun(singular)|noun(plural)|common prepositions",
    "gender|noun(singular)|noun(plural)|common prepositions",
    "gender|noun(singular)|noun(plural)|common prepositions"
  ]

with

  - Field no 1: gender must be "masculino" or "femenino"
  - Field no 2: singular form of the noun
  - Field no 3: plural form of the noun, grammatically correct and commonly accepted in Latin American Spanish
  - Field no 4: common prepositions frequently used with the noun. Include at least 3 valid Spanish prepositions, separated by commas

and

  - the vertical bar "|" delineates the four fields
  - use a single vertical bar ("|") with no extra spaces to separate your fields
  - use lowercase throughout
  - all content must be in lowercase, including nouns and prepositions

REQUEST: Review the given Spanish-language nounsArray for grammatical correctness as to each noun's

  - proper gender,
  - singular form,
  - plural form,
  - common prepositions used with the noun,

expressing minor corrections in your response only when necessary. All corrections offered for the 
${lesson.language} content must reflect language appropriate for beginning ${lesson.language} learners.
${jsonQualification}
Only include lines from nounsArray that require corrections. Your response, an updated nounsArray, will mimic the original format of nounsArray. Do not include unchanged lines. If no lines require corrections or updates, return a JSON array with one entry,

  [ "No corrections needed" ]
 
A complete example of a sample response follows:

EXAMPLE RESPONSE:

${nounsReviewExample}
`)}

  // *****************************************************************
  // VERBS REVIEW PROMPT
  // *****************************************************************

  const getVerbsReviewPrompt: GetVerbsReviewPrompt = ({lesson}: GetVerbsReviewPromptProps) => {
    const verbsReviewExample = generateExample({language: lesson.language, lessonTitle: LESSON_TITLE.VERBS_REVIEW, options: { asString: true }  })
    
    return (`
REQUEST: Review the following Spanish-language verbs for grammatical correctness and natural usage, making minor corrections only when necessary. These verbs are intended for beginning Spanish learners.

VERBS REVIEW ARRAY:

${JSON.stringify(lesson.verbs.verbsLines, null, 2)}         
${jsonQualification}
Only include lines from the verbs that require corrections. Do not include the participant's
name in your response. The Verbs Review Array must take the form:

    [
        "gender|noun(singular)|noun(plural)|common prepositions",
        "gender|noun(singular)|noun(plural)|common prepositions",
        "gender|noun(singular)|noun(plural)|common prepositions"
    ]

Do not include unchanged lines. Exclude the speaker's name. State only the original line and
the updated line. If no lines require corrections or updates, return a JSON array with one entry,

    [ "No corrections needed" ]
 
A complete example of a sample response follows:

EXAMPLE RESPONSE:

${verbsReviewExample}
`)}

    // *****************************************************************
    // NOUNS PROMPT
    // *****************************************************************

    const getNounsPrompt: GetNounsPrompt = ({lesson}: GetNounsPromptProps) => {
        const nounsExample = generateExample({language: lesson.language, lessonTitle: LESSON_TITLE.NOUNS, options: { asString: true }  })
        
        return (`
REQUEST: Extract the ${lesson.language} nouns from the dialog below:

DIALOG: ${lesson.dialogProse}

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

    const getVerbsPrompt: GetVerbsPrompt = ({lesson}: GetVerbsPromptProps) => {
        
        const verbsExample = generateExample({language: lesson.language, lessonTitle: LESSON_TITLE.VERBS, options: { asString: true }  })

        return (`
REQUEST: Extract the ${lesson.language} verbs from the dialog below:

DIALOG: ${lesson.dialogProse}

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
- Order your conjugations using an order common to all beginning ${lesson.language} classes.
- Do not include pronouns
- For reflexive verbs, conjugate them as appropriate in beginning ${lesson.language} class.

EXAMPLE RESPONSE:

${verbsExample}
`
)}

  const promptGenerators: Record<LessonTitle, (args: { lesson: Lesson }) => string> = {
    dialog: getDialogPrompt,
    nouns: getNounsPrompt,
    verbs: getVerbsPrompt,
    dialogReview: getDialogReviewPrompt,
    nounsReview: getNounsReviewPrompt,
    verbsReview: getVerbsReviewPrompt
  }

  const getPrompt: GetPrompt = ({lessonTitle, lesson}: GetPromptProps) => {
    const generator = promptGenerators[lessonTitle]
    return generator({ lesson })
  }
    
  return {
    getPrompt
  }
}