import {
  defaultErrorLabel,
  defaultPrompt,
} from '@cknTypes/types'
import {
  ERROR_LABEL,
  FIELD_COUNT,
  MODULE_NAME
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

const promptGenerators: Record<ModuleName, (args: { scenarioData: ScenarioData, lesson: Lesson, errors: HandleLLMError[] }) => PromptWithMeta> = {
  [MODULE_NAME.DIALOG]: ({ scenarioData, lesson, errors }) => ({
    prompt: getDialogPrompt({ scenarioData, lesson, errors }),
    fieldCount: FIELD_COUNT[MODULE_NAME.DIALOG],
    errorLabel: ERROR_LABEL.DIALOG_ERROR
  }),
  [MODULE_NAME.NOUNS]: ({ scenarioData, lesson, errors }) => ({
    prompt: getNounsPrompt({ scenarioData, lesson, errors }),
    fieldCount: FIELD_COUNT[MODULE_NAME.NOUNS],
    errorLabel: ERROR_LABEL.NOUNS_ERROR
  }),
  [MODULE_NAME.VERBS]: ({ scenarioData, lesson, errors }) => ({
    prompt: getVerbsPrompt({ scenarioData, lesson, errors }),
    fieldCount: FIELD_COUNT[MODULE_NAME.VERBS],
    errorLabel: ERROR_LABEL.VERBS_ERROR
  }),
  [MODULE_NAME.DIALOG_REVIEW]: ({ scenarioData, lesson, errors }) => ({
    prompt: getDialogReviewPrompt({ scenarioData, lesson, errors }),
    fieldCount: FIELD_COUNT[MODULE_NAME.DIALOG_REVIEW],
    errorLabel: ERROR_LABEL.DIALOG_REVIEW_ERROR
  }),
  [MODULE_NAME.NOUNS_REVIEW]: ({ scenarioData, lesson, errors }) => ({
    prompt: getNounsReviewPrompt({ scenarioData, lesson, errors }),
    fieldCount: FIELD_COUNT[MODULE_NAME.NOUNS_REVIEW],
    errorLabel: ERROR_LABEL.NOUNS_REVIEW_ERROR
  }),
  [MODULE_NAME.VERBS_REVIEW]: ({ scenarioData, lesson, errors }) => ({
    prompt: getVerbsReviewPrompt({ scenarioData, lesson, errors }),
    fieldCount: FIELD_COUNT[MODULE_NAME.VERBS_REVIEW],
    errorLabel: ERROR_LABEL.VERBS_REVIEW_ERROR
  }),
  [MODULE_NAME.VERBS_EXPANDED_INCOMPLETE]: () => ({
    prompt: defaultPrompt,
    fieldCount: FIELD_COUNT[MODULE_NAME.VERBS_EXPANDED_INCOMPLETE],
    errorLabel: defaultErrorLabel
  }),
  [MODULE_NAME.VERBS_EXPANDED_COMPLETE]: ({ scenarioData, lesson, errors }) => ({
    prompt: getVerbsExpandedCompletePrompt({ scenarioData, lesson, errors }),
    fieldCount: FIELD_COUNT[MODULE_NAME.VERBS_EXPANDED_COMPLETE],
    errorLabel: ERROR_LABEL.VERBS_REVIEW_ERROR
  }),
  [MODULE_NAME.VERBS_EXPANDED_TRIPLE]: () => ({
    prompt: defaultPrompt,
    fieldCount: FIELD_COUNT[MODULE_NAME.VERBS_EXPANDED_TRIPLE],
    errorLabel: defaultErrorLabel
  }),
  [MODULE_NAME.NOUNS_RESOLVE]: () => ({
    prompt: defaultPrompt,
    fieldCount: FIELD_COUNT[MODULE_NAME.NOUNS_RESOLVE],
    errorLabel: defaultErrorLabel
  }),
  [MODULE_NAME.VERBS_RESOLVE]: () => ({
    prompt: defaultPrompt,
    fieldCount: FIELD_COUNT[MODULE_NAME.VERBS_RESOLVE],
    errorLabel: defaultErrorLabel
  }),
  [MODULE_NAME.DIALOG_RESOLVE]: () => ({
    prompt: defaultPrompt,
    fieldCount: FIELD_COUNT[MODULE_NAME.DIALOG_RESOLVE],
    errorLabel: defaultErrorLabel
  }),
}

export const getPrompt_cb = ({ moduleName, scenarioData, lesson, errors }: GetPromptProps & { moduleName: ModuleName, scenarioData: ScenarioData }): PromptWithMeta =>
  promptGenerators[moduleName]({ scenarioData, lesson, errors })
