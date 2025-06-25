import type { Handler } from '@netlify/functions'
import { resolveNouns } from '@shared/resolveNouns_cb/resolveNouns_cb'
import { resolveVerbs } from '@shared/resolveVerbs_cb/resolveVerbs_cb'
import { resolveDialog } from '@shared/resolveDialog_cb/resolveDialog_cb'
import { MODULE_NAME, PIPELINE_TYPE } from '@cknTypes/constants'
import { runPipelineCb } from '@shared/runPipelineCb/runPipelineCb'
import type { PipelineConfigMap, RunPipelineCbBody } from '@cknTypes/types'

import type { PostgrestError } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

import { performance } from 'perf_hooks'

type UpsertLessonResponse = {
  data: null
  error: PostgrestError | null
}

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const handler: Handler = async (event) => {
  const startTime = performance.now()

  try {
    const { lesson, pipelineType, scenarioData }: RunPipelineCbBody = JSON.parse(event.body || '{}')

    if (!lesson || !pipelineType || !scenarioData) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing required fields: lesson, pipelineType, or scenarioData',
          durationMs: performance.now() - startTime
        })
      }
    }

    const pipelineConfigMap: PipelineConfigMap = {
      [PIPELINE_TYPE.DIALOG]: {
        doModule: MODULE_NAME.DIALOG,
        reviewModule: MODULE_NAME.DIALOG_REVIEW,
        resolveModule: MODULE_NAME.DIALOG_RESOLVE,
        resolve: resolveDialog
      },
      [PIPELINE_TYPE.NOUNS]: {
        doModule: MODULE_NAME.NOUNS,
        reviewModule: MODULE_NAME.NOUNS_REVIEW,
        resolveModule: MODULE_NAME.NOUNS_RESOLVE,
        resolve: resolveNouns
      },
      [PIPELINE_TYPE.VERBS]: {
        doModule: MODULE_NAME.VERBS,
        reviewModule: MODULE_NAME.VERBS_REVIEW,
        resolveModule: MODULE_NAME.VERBS_RESOLVE,
        resolve: resolveVerbs
      }
    }

    const pipelineConfig = pipelineConfigMap[pipelineType]
    if (!pipelineConfig) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: `Unknown pipelineType: ${pipelineType}`,
          durationMs: performance.now() - startTime
        })
      }
    }

    const updatedLesson = await runPipelineCb({
      lesson,
      scenarioData,
      pipelineConfig
    })

    const alwaysFalse = false

    if (updatedLesson !== null && alwaysFalse) {
      const { error: upsertError }: UpsertLessonResponse = await supabase.rpc('ckn_upsert_lesson', {
        arg_lesson_id: updatedLesson.id,
        arg_lesson_signature: updatedLesson.signature,
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
        arg_dialog: updatedLesson.dialog,

        arg_nouns_draft: updatedLesson.nounsDraft,
        arg_nouns_review: updatedLesson.nounsReview,
        arg_nouns: updatedLesson.nouns,

        arg_verbs_draft: updatedLesson.verbsDraft,
        arg_verbs_review: updatedLesson.verbsReview,
        arg_verbs: updatedLesson.verbs,

        arg_verbs_expanded_complete: updatedLesson.verbsExpandedComplete,
        arg_verbs_expanded_incomplete: updatedLesson.verbsExpandedInComplete,
        arg_verbs_expanded_triple: updatedLesson.verbsExpandedTriple
      })

      if (upsertError) {
        console.error('Lesson upsert failed:', upsertError)
      }
    }

    const durationMs = performance.now() - startTime

    return {
      statusCode: 200,
      body: JSON.stringify({
        lesson: updatedLesson,
        durationMs
      })
    }
  } catch (err) {
    const durationMs = performance.now() - startTime
    console.error('Pipeline execution failed:', err)

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Unexpected error in pipeline handler',
        durationMs
      })
    }
  }
}

export { handler }
