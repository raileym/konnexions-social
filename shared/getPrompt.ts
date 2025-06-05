import {
  ERROR_LABEL,
  type Lesson
} from './types'

type PromptWithMeta = {
  prompt: string
  fieldCount: number
  errorLabel: ErrorLabel
}

import type { ErrorLabel, ModuleName } from './types'
import { getDialogPrompt } from './getDialogPrompt'
import { getNounsPrompt } from './getNounsPrompt'
import { getVerbsPrompt } from './getVerbsPrompt'
import { getDialogReviewPrompt } from './getDialogReviewPrompt'
import { getNounsReviewPrompt } from './getNounsReviewPrompt'
import { getVerbsReviewPrompt } from './getVerbsReviewPrompt'
import { getVerbsExpandedFullPrompt } from './getVerbsExpandedFullPrompt'

const promptGenerators: Record<ModuleName, (args: { lesson: Lesson }) => PromptWithMeta> = {
  dialog: ({ lesson }) => ({
    prompt: getDialogPrompt({ lesson }),
    fieldCount: 3,
    errorLabel: ERROR_LABEL.DIALOG_ERROR
  }),
  nouns: ({ lesson }) => ({
    prompt: getNounsPrompt({ lesson }),
    fieldCount: 4,
    errorLabel: ERROR_LABEL.NOUNS_ERROR
  }),
  verbs: ({ lesson }) => ({
    prompt: getVerbsPrompt({ lesson }),
    fieldCount: 7,
    errorLabel: ERROR_LABEL.VERBS_ERROR
  }),
  dialogReview: ({ lesson }) => ({
    prompt: getDialogReviewPrompt({ lesson }),
    fieldCount: 1,
    errorLabel: ERROR_LABEL.DIALOG_REVIEW_ERROR
  }),
  nounsReview: ({ lesson }) => ({
    prompt: getNounsReviewPrompt({ lesson }),
    fieldCount: 4,
    errorLabel: ERROR_LABEL.NOUNS_REVIEW_ERROR
  }),
  verbsReview: ({ lesson }) => ({
    prompt: getVerbsReviewPrompt({ lesson }),
    fieldCount: 7,
    errorLabel: ERROR_LABEL.VERBS_REVIEW_ERROR
  }),
  verbsExpanded: ({ lesson }) => ({
    prompt: getVerbsReviewPrompt({ lesson }),
    fieldCount: 7,
    errorLabel: ERROR_LABEL.VERBS_REVIEW_ERROR
  }),
  verbsExpandedFull: ({ lesson }) => ({
    prompt: getVerbsExpandedFullPrompt({ lesson }),
    fieldCount: 1,
    errorLabel: ERROR_LABEL.VERBS_REVIEW_ERROR
  })
}

export const getPrompt = ({ moduleName, lesson }: { moduleName: ModuleName, lesson: Lesson }): PromptWithMeta =>
  promptGenerators[moduleName]({ lesson })
