import { generateExample } from "./generateExample"
import { jsonQualification } from "./jsonQualification"
import { GetVerbsPrompt, GetVerbsPromptProps, LESSON_TITLE } from "./types"

export const getVerbsPrompt: GetVerbsPrompt = ({lesson}: GetVerbsPromptProps) => {
        
        const verbsExample = generateExample({lesson, lessonTitle: LESSON_TITLE.VERBS, options: { asString: true }  })

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