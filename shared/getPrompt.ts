import {
  type GetPrompt,
  type GetPromptProps,
  type Lesson
} from './types'

import type { LessonTitle } from './types'
import { getDialogPrompt } from './getDialogPrompt'
import { getNounsPrompt } from './getNounsPrompt'
import { getVerbsPrompt } from './getVerbsPrompt'
import { getDialogReviewPrompt } from './getDialogReviewPrompt'
import { getNounsReviewPrompt } from './getNounsReviewPrompt'
import { getVerbsReviewPrompt } from './getVerbsReviewPrompt'

const promptGenerators: Record<LessonTitle, (args: { lesson: Lesson }) => string> = {
  dialog: getDialogPrompt,
  nouns: getNounsPrompt,
  verbs: getVerbsPrompt,
  dialogReview: getDialogReviewPrompt,
  nounsReview: getNounsReviewPrompt,
  verbsReview: getVerbsReviewPrompt
}

export const getPrompt: GetPrompt = ({ lessonTitle, lesson }: GetPromptProps) =>
  promptGenerators[lessonTitle]({ lesson })
