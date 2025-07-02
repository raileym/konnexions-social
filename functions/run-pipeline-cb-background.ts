// /.netlify/functions/run-pipeline-cb-background.ts
import type { BackgroundHandler } from '@netlify/functions'
import { resolveNouns } from '@shared/resolveNouns_cb/resolveNouns_cb'
import { resolveVerbs } from '@shared/resolveVerbs_cb/resolveVerbs_cb'
import { resolveDialog } from '@shared/resolveDialog_cb/resolveDialog_cb'
import { resolveTranslation } from '@shared/resolveTranslation_cb/resolveTranslation_cb'
import { MODULE_NAME, PIPELINE_TYPE } from '@cknTypes/constants'
import { runPipelineCb } from '@shared/runPipelineCb/runPipelineCb'
import type { PipelineConfigMap, RunPipelineCbBody } from '@cknTypes/types'

import type { PostgrestError } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

// import { performance } from 'perf_hooks'

type UpsertLessonResponse = {
  data: null
  error: PostgrestError | null
}

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const handler: BackgroundHandler = async (event) => {
  // const startTime = performance.now()

  try {
    const { lesson, pipelineType }: RunPipelineCbBody = JSON.parse(event.body || '{}')

    if (!lesson || !pipelineType ) {
      // return {
      //   statusCode: 400,
      //   body: JSON.stringify({
      //     error: 'Missing required fields: lesson or pipelineType',
      //     durationMs: performance.now() - startTime
      //   })
      // }
    }

    const pipelineConfigMap: PipelineConfigMap = {
      [PIPELINE_TYPE.DIALOG]: {
        draftModule: MODULE_NAME.DIALOG_DRAFT,
        reviewModule: MODULE_NAME.DIALOG_REVIEW,
        resolveModule: MODULE_NAME.DIALOG_RESOLVE,
        resolve: resolveDialog,
        pipelineType: PIPELINE_TYPE.DIALOG
      },
      [PIPELINE_TYPE.NOUNS]: {
        draftModule: MODULE_NAME.NOUNS_DRAFT,
        reviewModule: MODULE_NAME.NOUNS_REVIEW,
        resolveModule: MODULE_NAME.NOUNS_RESOLVE,
        resolve: resolveNouns,
        pipelineType: PIPELINE_TYPE.NOUNS
      },
      [PIPELINE_TYPE.TRANSLATION]: {
        draftModule: MODULE_NAME.TRANSLATION_DRAFT,
        reviewModule: MODULE_NAME.TRANSLATION_REVIEW,
        resolveModule: MODULE_NAME.TRANSLATION_RESOLVE,
        resolve: resolveTranslation,
        pipelineType: PIPELINE_TYPE.TRANSLATION
      },
      [PIPELINE_TYPE.VERBS]: {
        draftModule: MODULE_NAME.VERBS_DRAFT,
        reviewModule: MODULE_NAME.VERBS_REVIEW,
        resolveModule: MODULE_NAME.VERBS_RESOLVE,
        resolve: resolveVerbs,
        pipelineType: PIPELINE_TYPE.VERBS
      }
    }

    const pipelineConfig = pipelineConfigMap[pipelineType]
    if (!pipelineConfig) {
      // return {
      //   statusCode: 400,
      //   body: JSON.stringify({
      //     error: `Unknown pipelineType: ${pipelineType}`,
      //     durationMs: performance.now() - startTime
      //   })
      // }
    }

    const updatedLesson = await runPipelineCb({
      lesson,
      pipelineConfig
    })

    // const alwaysFalse = false
 
    if (updatedLesson !== null) {
      const { error: upsertError }: UpsertLessonResponse = await supabase.rpc('ckn_upsert_lesson', {
        arg_lesson_id: updatedLesson.id,
        // arg_lesson_signature: updatedLesson.signature,
        arg_lesson_name: updatedLesson.name,
        arg_lesson_description: updatedLesson.description,
        arg_lesson_target_language: updatedLesson.targetLanguage,
        arg_lesson_source_language: updatedLesson.sourceLanguage,
        arg_lesson_scenario: updatedLesson.scenario,
        arg_lesson_participant_list: updatedLesson.participantList,
        arg_lesson_prose: updatedLesson.prose,
        arg_lesson_translation: updatedLesson.translation,

        arg_dialog_draft: updatedLesson.dialogDraft,
        arg_dialog_review: updatedLesson.dialogReview,
        arg_dialog_resolve: updatedLesson.dialogResolve,

        arg_nouns_draft: updatedLesson.nounsDraft,
        arg_nouns_review: updatedLesson.nounsReview,
        arg_nouns_resolve: updatedLesson.nounsResolve,

        arg_verbs_draft: updatedLesson.verbsDraft,
        arg_verbs_review: updatedLesson.verbsReview,
        arg_verbs_resolve: updatedLesson.verbsResolve,

        arg_verbs_expanded_complete: updatedLesson.verbsExpandedComplete,
        arg_verbs_expanded_incomplete: updatedLesson.verbsExpandedInComplete,
        arg_verbs_expanded_triple: updatedLesson.verbsExpandedTriple
      })

      if (upsertError) {
        console.error('Lesson upsert failed:', upsertError)
      }
    }

    // const durationMs = performance.now() - startTime

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     lesson: updatedLesson,
    //     durationMs
    //   })
    // }
  } catch (err) {
    // const durationMs = performance.now() - startTime
    console.error('Pipeline execution failed:', err)

    // return {
    //   statusCode: 500,
    //   body: JSON.stringify({
    //     error: 'Unexpected error in pipeline handlerBackground',
    //     durationMs
    //   })
    // }
  }
}

export { handler }
