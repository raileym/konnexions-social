import { GEN_AI_PROVIDER, MODULE_NAME, PIPELINE_TYPE } from '../shared/cknTypes/constants.js'
import type { PipelineConfigMap } from '../shared/cknTypes/types.js'
import { resolveDialog } from '../shared/resolveDialog_cb/resolveDialog_cb.js'
import { resolveNouns } from '../shared/resolveNouns_cb/resolveNouns_cb.js'
import { resolveTranslation } from '../shared/resolveTranslation_cb/resolveTranslation_cb.js'
import { resolveVerbs } from '../shared/resolveVerbs_cb/resolveVerbs_cb.js'

export const pipelineConfigMap: PipelineConfigMap = {
  [PIPELINE_TYPE.DIALOG]: {
    draftModule: MODULE_NAME.DIALOG_DRAFT,
    draftProvider: GEN_AI_PROVIDER.OPENAI,
    reviewModule: MODULE_NAME.DIALOG_REVIEW,
    reviewProvider: GEN_AI_PROVIDER.CLAUDE,
    resolveModule: MODULE_NAME.DIALOG_RESOLVE,
    resolve: resolveDialog,
    pipelineType: PIPELINE_TYPE.DIALOG
  },
  [PIPELINE_TYPE.NOUNS]: {
    draftModule: MODULE_NAME.NOUNS_DRAFT,
    draftProvider: GEN_AI_PROVIDER.OPENAI,
    reviewModule: MODULE_NAME.NOUNS_REVIEW,
    reviewProvider: GEN_AI_PROVIDER.CLAUDE,
    resolveModule: MODULE_NAME.NOUNS_RESOLVE,
    resolve: resolveNouns,
    pipelineType: PIPELINE_TYPE.NOUNS
  },
  [PIPELINE_TYPE.TRANSLATION]: {
    draftModule: MODULE_NAME.TRANSLATION_DRAFT,
    draftProvider: GEN_AI_PROVIDER.OPENAI,
    reviewModule: MODULE_NAME.TRANSLATION_REVIEW,
    reviewProvider: GEN_AI_PROVIDER.CLAUDE,
    resolveModule: MODULE_NAME.TRANSLATION_RESOLVE,
    resolve: resolveTranslation,
    pipelineType: PIPELINE_TYPE.TRANSLATION
  },
  [PIPELINE_TYPE.VERBS]: {
    draftModule: MODULE_NAME.VERBS_DRAFT,
    draftProvider: GEN_AI_PROVIDER.OPENAI,
    reviewModule: MODULE_NAME.VERBS_REVIEW,
    reviewProvider: GEN_AI_PROVIDER.CLAUDE,
    resolveModule: MODULE_NAME.VERBS_RESOLVE,
    resolve: resolveVerbs,
    pipelineType: PIPELINE_TYPE.VERBS
  }
}