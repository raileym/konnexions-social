import {
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
import { getDialogDraftPrompt } from '@shared/getDialogDraftPrompt'
import { getNounsDraftPrompt } from '@shared/getNounsDraftPrompt'
import { getVerbsDraftPrompt } from '@shared/getVerbsDraftPrompt'
import { getDialogReviewPrompt } from '@shared/getDialogReviewPrompt'
import { getNounsReviewPrompt } from '@shared/getNounsReviewPrompt'
import { getVerbsReviewPrompt } from '@shared/getVerbsReviewPrompt'
import { getVerbsExpandedCompletePrompt } from '@shared/getVerbsExpandedCompletePrompt'
import { getTranslationDraftPrompt } from '@shared/getTranslationDraftPrompt'
import { getTranslationReviewPrompt } from '@shared/getTranslationReviewPrompt'

const makePromptGenerator = (
  moduleName: ModuleName,
  promptFn: (args: { scenarioData: ScenarioData, lesson: Lesson, errors: HandleLLMError[] }) => string
) => ({ scenarioData, lesson, errors }: { scenarioData: ScenarioData, lesson: Lesson, errors: HandleLLMError[] }) => ({
  prompt: promptFn({ scenarioData, lesson, errors }),
  fieldCount: FIELD_COUNT[moduleName],
  errorLabel: ERROR_LABEL[moduleName]
})

const makeStaticPromptGenerator = (moduleName: ModuleName) => () => ({
  prompt: defaultPrompt,
  fieldCount: FIELD_COUNT[moduleName],
  errorLabel: ERROR_LABEL[moduleName]
})

const promptGenerators: Record<ModuleName, (args: { scenarioData: ScenarioData, lesson: Lesson, errors: HandleLLMError[] }) => PromptWithMeta> = {
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
  [MODULE_NAME.VERBS_REVIEW]: makePromptGenerator(MODULE_NAME.VERBS_REVIEW, getVerbsReviewPrompt)
}

export const getPrompt_cb = ({ moduleName, scenarioData, lesson, errors }: GetPromptProps & { moduleName: ModuleName, scenarioData: ScenarioData }): PromptWithMeta =>
  promptGenerators[moduleName]({ scenarioData, lesson, errors })
