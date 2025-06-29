import { LESSON_PROMPT_STYLE } from '@cknTypes/constants'
import type { GetRequiredFormProps } from '@cknTypes/types'

export const getRequiredForm = ({ lesson, lessonPromptStyle }: GetRequiredFormProps): string => {
  switch (lessonPromptStyle) {
    case LESSON_PROMPT_STYLE.DIALOG:
      return `[
  "m|Participant|Line from the ${lessonPromptStyle}",
  "f|Participant|Line from the ${lessonPromptStyle}",
  "m|Participant|Line from the ${lessonPromptStyle}"
]

Each line uses three fields separated by '|':
- Gender ("m" or "f"),
- Role or title (e.g., from ${lesson.participantList}),
- The line of dialogue.`

    case LESSON_PROMPT_STYLE.INSTRUCTION:
      return `[
  "Find a table outside.",
  "Greet the waiter.",
  "Order your coffee."
]

PURPOSE: A(An) ${lessonPromptStyle} lesson prompt consists of clear, imperative instructions as if guiding a learner through the interaction.`

    case LESSON_PROMPT_STYLE.OPINION:
      return `[
  "I think the café has a great atmosphere.",
  "I prefer sitting outside.",
  "I like how the waiter is friendly."
]

PURPOSE: A(An) ${lessonPromptStyle} lesson prompt expresses personal opinions using simple phrases like "Creo que", "Prefiero", or "Me gusta".`

    case LESSON_PROMPT_STYLE.COMPARISON:
      return `[
  "The coffee here is stronger than at home.",
  "The waiters are more formal.",
  "The atmosphere is more relaxed."
]

PURPOSE: A(An) ${lessonPromptStyle} lesson prompt compares two experiences using expressions like "más que", "menos que", or "igual que".`

    case LESSON_PROMPT_STYLE.QUESTION_SET:
      return `[
  "Where are you sitting?",
  "What do you order?",
  "What is the waiter like?"
]

PURPOSE: A(An) ${lessonPromptStyle} lesson prompt consists of short comprehension or discussion questions relevant to the scenario.`

    default:
      return `[
  "Line from the ${lessonPromptStyle}",
  "Line from the ${lessonPromptStyle}",
  "Line from the ${lessonPromptStyle}"
]`
  }
}
