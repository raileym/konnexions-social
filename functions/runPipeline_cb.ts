// File: functions/runPipeline_cb.ts
import type { Handler } from '@netlify/functions'
import { resolveNouns } from '@shared/resolveNouns_cb/resolveNouns_cb'
import { resolveVerbs } from '@shared/resolveVerbs_cb/resolveVerbs_cb'
import { resolveDialog } from '@shared/resolveDialog_cb/resolveDialog_cb'
import { MODULE_NAME, PIPELINE_TYPE } from '@cknTypes/constants'
import { runPipelineCb } from '@shared/runPipelineCb/runPipelineCb'
import type { PipelineConfigMap, RunPipelineCbBody } from '@cknTypes/types'

const handler: Handler = async (event) => {
  try {
    const { lesson, pipelineType, scenarioData }: RunPipelineCbBody = JSON.parse(event.body || '{}')

    if (!lesson || !pipelineType || !scenarioData) {
      return {
        statusCode: 400,
        body: 'Missing required fields: lesson, pipelineType, or scenarioData'
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
        body: `Unknown pipelineType: ${pipelineType}`
      }
    }

    const updatedLesson = await runPipelineCb({
      lesson,
      scenarioData,
      pipelineConfig
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ lesson: updatedLesson })
    }
  } catch (err) {
    console.error('Pipeline execution failed:', err)
    return {
      statusCode: 500,
      body: 'Unexpected error in pipeline handler'
    }
  }
}

export { handler }
