import type {
  DialogPrompt,
  DialogPromptProps,
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

    return {
      dialogPrompt,
      nounsPrompt,
      verbsPrompt
    }
  }