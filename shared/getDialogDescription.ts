import { LESSON_PROMPT_STYLE } from '../shared/cknTypes/constants.js'
import type { Lesson } from '../shared/cknTypes/types.js'

export const getDialogDescription = (lesson: Lesson): string => {
  const base = `${lesson.lessonPromptStyle.toUpperCase()}: ${lesson.lessonPrompt} The ${lesson.lessonPromptStyle} should be appropriate for beginning-level language instruction. 
  
The ${lesson.lessonPromptStyle} must contain between 8 to 12 lines, reflecting a natural flow for a ${lesson.lessonPromptStyle}. The ${lesson.lessonPromptStyle} should contain no fewer than 8 lines.`

  const customDescriptions: Record<string, string> = {
    [LESSON_PROMPT_STYLE.DIALOG]: ' The dialog should not end on a question -- the dialog should always resolve.',
    [LESSON_PROMPT_STYLE.DESCRIPTION]: ' This description should be written in the first person, narrating the scene as experienced by the speaker. Do not include quoted dialogue. Use simple descriptive sentences to express actions, setting, and observations.',
    [LESSON_PROMPT_STYLE.INSTRUCTION]: ' The instruction should consist of simple, direct commands using the imperative form (e.g., "Find a seat", "Order a coffee"). Avoid narration or dialogue.',
    [LESSON_PROMPT_STYLE.OPINION]: ' The opinion should consist of personal views using beginner-friendly phrases such as "Creo que", "Prefiero", or "Me gusta". Each sentence should express a distinct opinion, not facts or instructions.',
    [LESSON_PROMPT_STYLE.STORY]: ' The story should follow a simple narrative arc in the past tense, using first- or third-person narration. The story should describe a brief experience or encounter and be grounded in everyday vocabulary.',
    [LESSON_PROMPT_STYLE.COMMENTARY]: ' The commentary should sound reflective or observational, as if the speaker is making remarks or musings about what they see or feel. Avoid imperative commands or structured storytelling.',
    [LESSON_PROMPT_STYLE.COMPARISON]: ' The comparison should contrast two things, using structures like "más que", "menos que", or "tan... como". The comparisons should be simple and relevant to the scene.',
    [LESSON_PROMPT_STYLE.LIST]: ' The list should contain simple items or short sentences that describe what is seen, done, or needed in the scene. No storytelling or opinions.',
    [LESSON_PROMPT_STYLE.QUESTION_SET]: ' The question set should include simple, natural questions that could be used for comprehension or discussion. Avoid narrative or command forms.',
    [LESSON_PROMPT_STYLE.POEM]: ' The poem should use simple, rhythmic sentences that reflect the scene or mood. It may use rhyming or parallel structure but must remain beginner-accessible.'
  }

  const extra = customDescriptions[lesson.lessonPromptStyle] ?? ''
  return `${base}${extra}`
}
