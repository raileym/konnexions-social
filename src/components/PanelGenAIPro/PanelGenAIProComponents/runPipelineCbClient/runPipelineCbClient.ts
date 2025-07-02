import type { Lesson, RunPipelineCbClientProps } from '@cknTypes/types'
import { pollPipelineModules } from '../pollPipelineModules/pollPipelineModules'
import { pipelineConfigMap } from '@shared/pipelineConfigMap'

export type RunPipelineCbClientResponse = {
  lesson: Lesson
  durationMs: number
}

export const runPipelineCbClient = async ({
  lesson,
  pipelineType
}: RunPipelineCbClientProps): Promise<RunPipelineCbClientResponse | null> => {
  try {
    const res = await fetch('/.netlify/functions/run-pipeline-cb-background', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lesson,
        pipelineType
      })
    })

    if (!res.ok) {
      console.error(`Cloud pipeline error: ${res.status}`)
      return null
    }

    const responseLesson = await pollPipelineModules({lesson, pipelineConfig: pipelineConfigMap[pipelineType]})
    if (!responseLesson ) {
      return null
    }

    const durationMs = responseLesson[pipelineConfigMap[pipelineType].draftModule].moduleDurationMs
      + responseLesson[pipelineConfigMap[pipelineType].reviewModule].moduleDurationMs
      + responseLesson[pipelineConfigMap[pipelineType].resolveModule].moduleDurationMs

    return {
      lesson: responseLesson,
      durationMs
    }
  } catch (err) {
    console.error('Network error calling runPipelineCb:', err)
    return null
  }
}
