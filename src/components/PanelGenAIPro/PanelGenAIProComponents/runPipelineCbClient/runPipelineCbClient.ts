import type { Lesson, RunPipelineCbClientProps } from '@cknTypes/types'

export type RunPipelineCbClientResponse = {
  lesson: Lesson
  durationMs: number
}

export const runPipelineCbClient = async ({
  lesson,
  pipelineType,
  scenarioData
}: RunPipelineCbClientProps): Promise<RunPipelineCbClientResponse | null> => {
  try {
    const res = await fetch('/.netlify/functions/runPipeline_cb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lesson,
        scenarioData,
        pipelineType
      })
    })

    if (!res.ok) {
      console.error(`Cloud pipeline error: ${res.status}`)
      return null
    }

    const data = await res.json()

    // Validate structure just in case
    if (!data.lesson || typeof data.durationMs !== 'number') {
      console.warn('Unexpected pipeline response:', data)
      return null
    }

    return {
      lesson: data.lesson,
      durationMs: data.durationMs
    }
  } catch (err) {
    console.error('Network error calling runPipelineCb:', err)
    return null
  }
}
