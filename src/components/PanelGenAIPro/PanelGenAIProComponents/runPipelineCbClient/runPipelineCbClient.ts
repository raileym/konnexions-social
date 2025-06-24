// client-side helper (e.g., runPipelineCbClient.ts)

import type { Lesson, RunPipelineCbClientProps } from '@cknTypes/types'

export const runPipelineCbClient = async ({
  lesson,
  pipelineType,
  scenarioData
}: RunPipelineCbClientProps): Promise<Lesson | null> => {
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
    return data.lesson as Lesson
  } catch (err) {
    console.error('Network error calling runPipelineCb:', err)
    return null
  }
}
