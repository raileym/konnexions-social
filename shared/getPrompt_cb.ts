import {
  defaultPrompt,
} from '../shared/cknTypes/types.js'
import {
  ERROR_LABEL,
  FIELD_COUNT,
  MODULE_NAME
} from '../shared/cknTypes/constants.js'
type PromptWithMeta = {
  prompt: string
  fieldCount: number
  errorLabel: ErrorLabel
}
import type { Lesson, ErrorLabel, GetPromptProps, HandleLLMError, ModuleName } from '../shared/cknTypes/types.js'
import { getDialogDraftPrompt } from '../shared/getDialogDraftPrompt.js'
import { getNounsDraftPrompt } from '../shared/getNounsDraftPrompt.js'
import { getVerbsDraftPrompt } from '../shared/getVerbsDraftPrompt.js'
import { getDialogReviewPrompt } from '../shared/getDialogReviewPrompt.js'
import { getNounsReviewPrompt } from '../shared/getNounsReviewPrompt.js'
import { getVerbsReviewPrompt } from '../shared/getVerbsReviewPrompt.js'
import { getVerbsExpandedCompletePrompt } from '../shared/getVerbsExpandedCompletePrompt.js'
import { getTranslationDraftPrompt } from '../shared/getTranslationDraftPrompt.js'
import { getTranslationReviewPrompt } from '../shared/getTranslationReviewPrompt.js'

const makePromptGenerator = (
  moduleName: ModuleName,
  promptFn: (args: { lesson: Lesson, errors: HandleLLMError[] }) => string
) => ({ lesson, errors }: { lesson: Lesson, errors: HandleLLMError[] }) => ({
  prompt: promptFn({ lesson, errors }),
  fieldCount: FIELD_COUNT[moduleName],
  errorLabel: ERROR_LABEL[moduleName]
})

const makeStaticPromptGenerator = (moduleName: ModuleName) => () => ({
  prompt: defaultPrompt,
  fieldCount: FIELD_COUNT[moduleName],
  errorLabel: ERROR_LABEL[moduleName]
})

const promptGenerators: Record<ModuleName, (args: { lesson: Lesson, errors: HandleLLMError[] }) => PromptWithMeta> = {
  [MODULE_NAME.TRANSLATION_DRAFT]: makePromptGenerator(MODULE_NAME.TRANSLATION_DRAFT, getTranslationDraftPrompt),
  [MODULE_NAME.TRANSLATION_RESOLVE]: makeStaticPromptGenerator(MODULE_NAME.TRANSLATION_RESOLVE),
  [MODULE_NAME.TRANSLATION_REVIEW]: makePromptGenerator(MODULE_NAME.TRANSLATION_REVIEW, getTranslationReviewPrompt),
  [MODULE_NAME.DIALOG_DRAFT]: makePromptGenerator(MODULE_NAME.DIALOG_DRAFT, getDialogDraftPrompt),
  [MODULE_NAME.DIALOG_RESOLVE]: makeStaticPromptGenerator(MODULE_NAME.DIALOG_RESOLVE),
  [MODULE_NAME.DIALOG_REVIEW]: makePromptGenerator(MODULE_NAME.DIALOG_REVIEW, getDialogReviewPrompt),
  [MODULE_NAME.NOUNS_DRAFT]: makePromptGenerator(MODULE_NAME.NOUNS_DRAFT, getNounsDraftPrompt),
  [MODULE_NAME.NOUNS_RESOLVE]: makeStaticPromptGenerator(MODULE_NAME.NOUNS_RESOLVE),
  [MODULE_NAME.NOUNS_REVIEW]: makePromptGenerator(MODULE_NAME.NOUNS_REVIEW, getNounsReviewPrompt),
  [MODULE_NAME.VERBS_DRAFT]: makePromptGenerator(MODULE_NAME.VERBS_DRAFT, getVerbsDraftPrompt),
  [MODULE_NAME.VERBS_EXPANDED_COMPLETE]: makePromptGenerator(MODULE_NAME.VERBS_EXPANDED_COMPLETE, getVerbsExpandedCompletePrompt),
  [MODULE_NAME.VERBS_EXPANDED_INCOMPLETE]: makeStaticPromptGenerator(MODULE_NAME.VERBS_EXPANDED_INCOMPLETE),
  [MODULE_NAME.VERBS_EXPANDED_TRIPLE]: makeStaticPromptGenerator(MODULE_NAME.VERBS_EXPANDED_TRIPLE),
  [MODULE_NAME.VERBS_RESOLVE]: makeStaticPromptGenerator(MODULE_NAME.VERBS_RESOLVE),
  [MODULE_NAME.VERBS_REVIEW]: makePromptGenerator(MODULE_NAME.VERBS_REVIEW, getVerbsReviewPrompt),
  [MODULE_NAME.ERROR_MODULE]: makeStaticPromptGenerator(MODULE_NAME.ERROR_MODULE)
}

export const getPrompt_cb = ({ moduleName, lesson, errors }: GetPromptProps & { moduleName: ModuleName }): PromptWithMeta =>
  promptGenerators[moduleName]({ lesson, errors })
