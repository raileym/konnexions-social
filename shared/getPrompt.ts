import {
  defaultErrorLabel,
  defaultFieldCount,
  defaultPrompt,
  ERROR_LABEL,
  type Lesson
} from './types'

type PromptWithMeta = {
  prompt: string
  fieldCount: number
  errorLabel: ErrorLabel
}

import type { ErrorLabel, GetPromptProps, HandleLLMError, ModuleName } from './types'
import { getDialogPrompt } from './getDialogPrompt'
import { getNounsPrompt } from './getNounsPrompt'
import { getVerbsPrompt } from './getVerbsPrompt'
import { getDialogReviewPrompt } from './getDialogReviewPrompt'
import { getNounsReviewPrompt } from './getNounsReviewPrompt'
import { getVerbsReviewPrompt } from './getVerbsReviewPrompt'
import { getVerbsExpandedCompletePrompt } from './getVerbsExpandedCompletePrompt'

const promptGenerators: Record<ModuleName, (args: { lesson: Lesson, errors: HandleLLMError[] }) => PromptWithMeta> = {
  dialog: ({ lesson, errors }) => ({
    prompt: getDialogPrompt({ lesson, errors }),
    fieldCount: 3,
    errorLabel: ERROR_LABEL.DIALOG_ERROR
  }),
  nouns: ({ lesson, errors }) => ({
    prompt: getNounsPrompt({ lesson, errors }),
    fieldCount: 4,
    errorLabel: ERROR_LABEL.NOUNS_ERROR
  }),
  verbs: ({ lesson, errors }) => ({
    prompt: getVerbsPrompt({ lesson, errors }),
    fieldCount: 7,
    errorLabel: ERROR_LABEL.VERBS_ERROR
  }),
  dialogReview: ({ lesson, errors }) => ({
    prompt: getDialogReviewPrompt({ lesson, errors }),
    fieldCount: 1,
    errorLabel: ERROR_LABEL.DIALOG_REVIEW_ERROR
  }),
  nounsReview: ({ lesson, errors }) => ({
    prompt: getNounsReviewPrompt({ lesson, errors }),
    fieldCount: 4,
    errorLabel: ERROR_LABEL.NOUNS_REVIEW_ERROR
  }),
  verbsReview: ({ lesson, errors }) => ({
    prompt: getVerbsReviewPrompt({ lesson, errors }),
    fieldCount: 7,
    errorLabel: ERROR_LABEL.VERBS_REVIEW_ERROR
  }),
  verbsExpanded: ({ lesson, errors }) => ({
    prompt: getVerbsReviewPrompt({ lesson, errors }),
    fieldCount: 7,
    errorLabel: ERROR_LABEL.VERBS_REVIEW_ERROR
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verbsExpandedInComplete: ({ lesson, errors }) => ({
    prompt: defaultPrompt,
    fieldCount: defaultFieldCount,
    errorLabel: defaultErrorLabel
  }),
  verbsExpandedComplete: ({ lesson, errors }) => ({
    prompt: getVerbsExpandedCompletePrompt({ lesson, errors }),
    fieldCount: 1,
    errorLabel: ERROR_LABEL.VERBS_REVIEW_ERROR
  })
}

export const getPrompt = ({ moduleName, lesson, errors }: GetPromptProps & { moduleName: ModuleName }): PromptWithMeta =>
  promptGenerators[moduleName]({ lesson, errors })
