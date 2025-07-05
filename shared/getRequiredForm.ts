import { LESSON_PROMPT_STYLE } from '../shared/cknTypes/constants.js'
import type { GetRequiredFormProps } from '../shared/cknTypes/types.js'

export const getRequiredForm = ({ lesson, lessonPromptStyle }: GetRequiredFormProps): string => {
  switch (lessonPromptStyle) {
    case LESSON_PROMPT_STYLE.DIALOG:
      return `[
  "m|Participant|Line from the ${lessonPromptStyle}",
  "f|Participant|Line from the ${lessonPromptStyle}",
  "m|Participant|Line from the ${lessonPromptStyle}"
]

where each line uses three fields separated by '|':

- Gender ("m" or "f"),
- Role or title (e.g., from ${lesson.participantList}),
- The line of dialogue.`

    case LESSON_PROMPT_STYLE.DESCRIPTION:
    case LESSON_PROMPT_STYLE.STORY:
    case LESSON_PROMPT_STYLE.COMMENTARY:
    case LESSON_PROMPT_STYLE.POEM:
    case LESSON_PROMPT_STYLE.OPINION:
    case LESSON_PROMPT_STYLE.COMPARISON:
      return `[
  "n|narrator|Line from the ${lessonPromptStyle}",
  "n|narrator|Another line from the ${lessonPromptStyle}",
  "n|narrator|Yet another line from the ${lessonPromptStyle}"
]

where each line uses three fields separated by '|':

- Gender ("n"), which is neutral and fixed for the narrator,
- Role of narrator, which is fixed for non-dialog lesson prompt styles,
- The line of ${lessonPromptStyle} content.`

    case LESSON_PROMPT_STYLE.INSTRUCTION:
      return `[
  "n|narrator|Find a table outside.",
  "n|narrator|Greet the waiter.",
  "n|narrator|Order your coffee."
]

where each line uses three fields separated by '|':

- Gender ("n"), which is neutral and fixed for the narrator,
- Role of narrator, which is fixed for non-dialog lesson prompt styles,
- The line of ${lessonPromptStyle} content.

PURPOSE: An ${lessonPromptStyle} lesson prompt consists of clear, imperative instructions as if guiding a learner through a scenario.`

    case LESSON_PROMPT_STYLE.QUESTION_SET:
      return `[
  "n|narrator|Where are you sitting?",
  "n|narrator|What do you order?",
  "n|narrator|What is the waiter like?"
]

where each line uses three fields separated by '|':

- Gender ("n"), which is neutral and fixed for the narrator,
- Role of narrator, which is fixed for non-dialog lesson prompt styles,
- The line of ${lessonPromptStyle} content.

PURPOSE: A ${lessonPromptStyle} lesson prompt consists of short comprehension or discussion questions relevant to the scenario.`

    case LESSON_PROMPT_STYLE.LIST:
      return `[
  "n|narrator|Order coffee.",
  "n|narrator|Find your seat.",
  "n|narrator|Pay the bill."
]

where each line uses three fields separated by '|':

- Gender ("n"), which is neutral and fixed for the narrator,
- Role of narrator, which is fixed for non-dialog lesson prompt styles,
- The line of ${lessonPromptStyle} content.

PURPOSE: A ${lessonPromptStyle} is a checklist-style enumeration of scenario-relevant steps or actions.`

    default:
      return `[
  "n|narrator|Line from the ${lessonPromptStyle}",
  "n|narrator|Another line from the ${lessonPromptStyle}",
  "n|narrator|Yet another line from the ${lessonPromptStyle}"
]

where each line uses three fields separated by '|':

- Gender ("n"), which is neutral and fixed for the narrator,
- Role of narrator, which is fixed for non-dialog lesson prompt styles,
- The line of ${lessonPromptStyle} content.
- The content line.`
  }
}
