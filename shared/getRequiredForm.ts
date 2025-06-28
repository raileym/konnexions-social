import { LESSON_PROMPT_STYLE } from '@cknTypes/constants'
import type { GetRequiredFormProps } from '@cknTypes/types'

export const getRequiredForm = ({ lesson, lessonPromptStyle }: GetRequiredFormProps): string => {
  if (lessonPromptStyle === LESSON_PROMPT_STYLE.DIALOG) {
    return `[
      'm|Participant|Line from the ${lessonPromptStyle}',
      'f|Participant|Line from the ${lessonPromptStyle}',
      'm|Participant|Line from the ${lessonPromptStyle}',
    ]
      
where the vertical bar '|' delineates three fields:

    - the gender of the speaking participant using "m" for masculine and "f" for feminine,
    - the title of the participant, ${lesson.participantList}, and 
    - the particular dialog line spoken.`
  } else {
    return `[
      'Line from the ${lessonPromptStyle}',
      'Line from the ${lessonPromptStyle}',
      'Line from the ${lessonPromptStyle}',
    ]`
  }
}
