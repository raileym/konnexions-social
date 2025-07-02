import type { Lesson } from '@cknTypes/types'

export const runPipelineModuleClient = async (
  lesson: Lesson,
  pipelineType: string
): Promise<boolean> => {
  try {
    const res = await fetch('/.netlify/functions/runPipeline_cb-background', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lesson,
        pipelineType
      })
    })

    if (!res.ok) {
      console.error(`Background pipeline error: ${res.status}`)
      return false
    }

    return true // fire-and-forget — no response expected
  } catch (err) {
    console.error('Network error calling background pipeline:', err)
    return false
  }
}
