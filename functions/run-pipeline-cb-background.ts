// /.netlify/functions/run-pipeline-cb-background.ts
import type { BackgroundHandler } from '@netlify/functions'
import { runPipelineCb } from '@shared/runPipelineCb/runPipelineCb'
import type { RunPipelineCbBody } from '@cknTypes/types'
import { pipelineConfigMap } from '@shared/pipelineConfigMap'

const handler: BackgroundHandler = async (event) => {
  try {
    const { lesson, pipelineType }: RunPipelineCbBody = JSON.parse(event.body || '{}')

    if (!lesson || !pipelineType ) {
      console.error('Missing lesson or pipelineType')
      return
    }

    const pipelineConfig = pipelineConfigMap[pipelineType]
    if (!pipelineConfig) {
      console.error('Unknown pipeline type:', pipelineType)
      return
    }

    const updatedLesson = await runPipelineCb({
      lesson,
      pipelineConfig
    })

    console.log('cloud: updatedLesson', updatedLesson)
    
  } catch (err) {
    console.error('Pipeline execution failed:', err)
  }
}

export { handler }
