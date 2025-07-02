import { type Lesson } from '@cknTypes/types'

export const pollForLessonUpdate = async (
  id: string,
  pollIntervalMs = 2000,
  timeoutMs = 30000
): Promise<Lesson | null> => {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    const res = await fetch(`/api/lesson-by-id?id=${id}`)
    if (res.ok) {
      const lesson = await res.json()
      if (lesson && lesson.translation) return lesson // check readiness condition
    }
    await new Promise(resolve => setTimeout(resolve, pollIntervalMs))
  }
  console.warn('Timeout waiting for lesson update.')
  return null
}
