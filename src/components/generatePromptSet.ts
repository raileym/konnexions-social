import type {
  DialogPrompt,
  DialogPromptProps,
  DialogReviewPrompt,
  DialogReviewPromptProps,
  GeneratePromptSet,
  JsonQualification,
  NounsPrompt,
  NounsPromptProps,
  PromptSet,
  VerbsPrompt,
  VerbsPromptProps
} from "../cknTypes/types/types"

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

    const dialogPrompt: DialogPrompt = ({language, scenarioLabel, participant}: DialogPromptProps) => `
Create a dialog in ${language} appropriate for a beginning language
instruction, where the dialog takes place ${scenarioLabel}
between participants, ${participant}.
Use between 6 to 8 sentences for this dialog.

${jsonQualification}

Note, a dialog response is an array of strings that take the form,

    "Participant| Line from the dialog"

where the vertical bar "|" delineates the two fields.

A complete example (written in English) follows: 

    [
      "Hostess| Welcome to our restaurant! How many in your party?",
      "Waitress| Here are the menus. Can I start you off with some drinks?",
      "Male diner| I'll have the steak, please."
    ]
`

    // *****************************************************************
    // DIALOG REVIEW PROMPT
    // *****************************************************************

    const dialogReviewPrompt: DialogReviewPrompt = ({dialog, language}: DialogReviewPromptProps) => `
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

    const nounsPrompt: NounsPrompt = ({dialog}: NounsPromptProps) => `
REQUEST: Extract the nouns from the dialog below:

DIALOG: ${dialog}
${jsonQualification}
Each string in the array must take the form:

    "gender|noun(singular)|noun(plural)|common prepositions"

where common prepositions are those suitable for this noun in grammatically correct expressions, e.g.,

    a, con, de, desde, en, entre, hacia, hasta, para, por, sin, sobre.

Each noun must include at least 3 common prepositions, separated by commas.

A complete example follows:

    [
      "masculino|restaurante|restaurantes|a, en, desde, sobre",
      "femenino|noche|noches|en, durante, por",
      "femenino|ensalada|ensaladas|con, sin, de, para",
      "masculino|pollo|pollos|con, sin, de, para"
    ]

`

    // *****************************************************************
    // VERBS PROMPT
    // *****************************************************************

    const verbsPrompt: VerbsPrompt = ({dialog}: VerbsPromptProps) => `
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
      dialogPrompt,
      dialogReviewPrompt,
      nounsPrompt,
      verbsPrompt
    }
  }