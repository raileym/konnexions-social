import {
  defaultErrorLabel,
  defaultFieldCount,
  defaultPrompt,
} from '@cknTypes/types'
import {
  ERROR_LABEL
} from '@cknTypes/constants'
type PromptWithMeta = {
  prompt: string
  fieldCount: number
  errorLabel: ErrorLabel
}
import type { Lesson, ErrorLabel, GetPromptProps, HandleLLMError, ModuleName, ScenarioData } from '@cknTypes/types'
import { getDialogPrompt } from '@shared/getDialogPrompt'
import { getNounsPrompt } from '@shared/getNounsPrompt'
import { getVerbsPrompt } from '@shared/getVerbsPrompt'
import { getDialogReviewPrompt } from '@shared/getDialogReviewPrompt'
import { getNounsReviewPrompt } from '@shared/getNounsReviewPrompt'
import { getVerbsReviewPrompt } from '@shared/getVerbsReviewPrompt'
import { getVerbsExpandedCompletePrompt } from '@shared/getVerbsExpandedCompletePrompt'
import { getNounsOnlyPrompt } from '@shared/getNounsOnlyPrompt'
import { getNounsOnlyReviewPrompt } from '@shared/getNounsOnlyReviewPrompt'
import { getVerbsOnlyPrompt } from '@shared/getVerbsOnlyPrompt'
import { getVerbsOnlyReviewPrompt } from '@shared/getVerbsOnlyReviewPrompt'
import { getNounsMissingPrompt } from '@shared/getNounsMissingPrompt'
import { getNounsMissingReviewPrompt } from '@shared/getNounsMissingReviewPrompt'

const promptGenerators: Record<ModuleName, (args: { scenarioData: ScenarioData, lesson: Lesson, errors: HandleLLMError[] }) => PromptWithMeta> = {
  dialog: ({ scenarioData, lesson, errors }) => ({
    prompt: getDialogPrompt({ scenarioData, lesson, errors }),
    fieldCount: 3,
    errorLabel: ERROR_LABEL.DIALOG_ERROR
  }),
  nouns: ({ scenarioData, lesson, errors }) => ({
    prompt: getNounsPrompt({ scenarioData, lesson, errors }),
    fieldCount: 4,
    errorLabel: ERROR_LABEL.NOUNS_ERROR
  }),
  nounsOnly: ({ scenarioData, lesson, errors }) => ({
    prompt: getNounsOnlyPrompt({ scenarioData, lesson, errors }),
    fieldCount: 1,
    errorLabel: ERROR_LABEL.NOUNS_ONLY_ERROR
  }),
  nounsOnlyMissing: () => ({
    prompt: defaultPrompt,
    fieldCount: defaultFieldCount,
    errorLabel: defaultErrorLabel
  }),
  nounsMissing: ({ scenarioData, lesson, errors }) => ({
    prompt: getNounsMissingPrompt({ scenarioData, lesson, errors }),
    fieldCount: 3,
    errorLabel: ERROR_LABEL.NOUNS_ERROR
  }),
  nounsMissingReview: ({ scenarioData, lesson, errors }) => ({
    prompt: getNounsMissingReviewPrompt({ scenarioData, lesson, errors }),
    fieldCount: 1,
    errorLabel: ERROR_LABEL.NOUNS_ONLY_ERROR
  }),
  verbs: ({ scenarioData, lesson, errors }) => ({
    prompt: getVerbsPrompt({ scenarioData, lesson, errors }),
    fieldCount: 7,
    errorLabel: ERROR_LABEL.VERBS_ERROR
  }),
  verbsOnly: ({ scenarioData, lesson, errors }) => ({
    prompt: getVerbsOnlyPrompt({ scenarioData, lesson, errors }),
    fieldCount: 1,
    errorLabel: ERROR_LABEL.VERBS_ERROR
  }),
  dialogReview: ({ scenarioData, lesson, errors }) => ({
    prompt: getDialogReviewPrompt({ scenarioData, lesson, errors }),
    fieldCount: 1,
    errorLabel: ERROR_LABEL.DIALOG_REVIEW_ERROR
  }),
  nounsReview: ({ scenarioData, lesson, errors }) => ({
    prompt: getNounsReviewPrompt({ scenarioData, lesson, errors }),
    fieldCount: 4,
    errorLabel: ERROR_LABEL.NOUNS_REVIEW_ERROR
  }),
  nounsOnlyReview: ({ scenarioData, lesson, errors }) => ({
    prompt: getNounsOnlyReviewPrompt({ scenarioData, lesson, errors }),
    fieldCount: 1,
    errorLabel: ERROR_LABEL.NOUNS_ONLY_REVIEW_ERROR
  }),
  verbsReview: ({ scenarioData, lesson, errors }) => ({
    prompt: getVerbsReviewPrompt({ scenarioData, lesson, errors }),
    fieldCount: 7,
    errorLabel: ERROR_LABEL.VERBS_REVIEW_ERROR
  }),
  verbsOnlyReview: ({ scenarioData, lesson, errors }) => ({
    prompt: getVerbsOnlyReviewPrompt({ scenarioData, lesson, errors }),
    fieldCount: 1,
    errorLabel: ERROR_LABEL.VERBS_REVIEW_ERROR
  }),
  verbsExpandedInComplete: () => ({
    prompt: defaultPrompt,
    fieldCount: defaultFieldCount,
    errorLabel: defaultErrorLabel
  }),
  verbsExpandedComplete: ({ scenarioData, lesson, errors }) => ({
    prompt: getVerbsExpandedCompletePrompt({ scenarioData, lesson, errors }),
    fieldCount: 1,
    errorLabel: ERROR_LABEL.VERBS_REVIEW_ERROR
  }),
  verbsExpandedTriple: () => ({
    prompt: defaultPrompt,
    fieldCount: defaultFieldCount,
    errorLabel: defaultErrorLabel
  }),
}

export const getPrompt = ({ moduleName, scenarioData, lesson, errors }: GetPromptProps & { moduleName: ModuleName, scenarioData: ScenarioData }): PromptWithMeta =>
  promptGenerators[moduleName]({ scenarioData, lesson, errors })
