// /.netlify/functions/runModule_cb-background.ts
import type { BackgroundHandler } from '@netlify/functions'
import { runPipelineCb } from '../shared/runPipelineCb/runPipelineCb.js'
import { resolveNouns } from '../shared/resolveNouns_cb/resolveNouns_cb.js'
import { resolveVerbs } from '../shared/resolveVerbs_cb/resolveVerbs_cb.js'
import { resolveDialog } from '../shared/resolveDialog_cb/resolveDialog_cb.js'
import { resolveTranslation } from '../shared/resolveTranslation_cb/resolveTranslation_cb.js'
import { MODULE_NAME, PIPELINE_TYPE } from '../shared/cknTypes/constants.js'
import type { PipelineConfigMap, RunPipelineCbBody } from '../shared/cknTypes/types.js'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const handler: BackgroundHandler = async (event) => {
  try {
    const { lesson, pipelineType }: RunPipelineCbBody = JSON.parse(event.body || '{}')
    if (!lesson || !pipelineType ) return

    const pipelineConfigMap: PipelineConfigMap = {
      [PIPELINE_TYPE.DIALOG]: {
        draftModule: MODULE_NAME.DIALOG_DRAFT,
        reviewModule: MODULE_NAME.DIALOG_REVIEW,
        resolveModule: MODULE_NAME.DIALOG_RESOLVE,
        resolve: resolveDialog,
        pipelineType
      },
      [PIPELINE_TYPE.NOUNS]: {
        draftModule: MODULE_NAME.NOUNS_DRAFT,
        reviewModule: MODULE_NAME.NOUNS_REVIEW,
        resolveModule: MODULE_NAME.NOUNS_RESOLVE,
        resolve: resolveNouns,
        pipelineType
      },
      [PIPELINE_TYPE.TRANSLATION]: {
        draftModule: MODULE_NAME.TRANSLATION_DRAFT,
        reviewModule: MODULE_NAME.TRANSLATION_REVIEW,
        resolveModule: MODULE_NAME.TRANSLATION_RESOLVE,
        resolve: resolveTranslation,
        pipelineType
      },
      [PIPELINE_TYPE.VERBS]: {
        draftModule: MODULE_NAME.VERBS_DRAFT,
        reviewModule: MODULE_NAME.VERBS_REVIEW,
        resolveModule: MODULE_NAME.VERBS_RESOLVE,
        resolve: resolveVerbs,
        pipelineType
      }
    }

    const pipelineConfig = pipelineConfigMap[pipelineType]
    const updatedLesson = await runPipelineCb({ lesson, pipelineConfig })
    if (!updatedLesson) return

    const moduleData = {
      lesson_id: updatedLesson.id,
      // lesson_signature: updatedLesson.signature,
      module_name: pipelineConfig.resolveModule,
      module_draft: updatedLesson[`${pipelineType}Draft`],
      module_review: updatedLesson[`${pipelineType}Review`],
      module_resolve: updatedLesson[`${pipelineType}Resolve`]
    }

    const { error } = await supabase.rpc('ckn_upsert_module', moduleData)
    if (error) console.error('Upsert module error:', error)
  } catch (err) {
    console.error('Pipeline background handler failed:', err)
  }
}

export { handler }
