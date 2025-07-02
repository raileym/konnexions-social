import type { Module, PollModuleByLessonAndNameProps } from '@cknTypes/types'

/**
 * Poll Supabase for module data by lessonId and moduleName until available or timeout.
 */
export const pollModuleByLessonAndName = async ({
  lessonId,
  moduleName,
  pollIntervalMs = 2000,
  timeoutMs = 30000
}: PollModuleByLessonAndNameProps
): Promise<Module | null> => {
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    try {

      const res = await fetch('/.netlify/functions/get-module', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, moduleName })
      })

      // const res = await fetch(`/api/get-module?lessonId=${lessonId}&moduleName=${moduleName}`)

      if (res.ok) {
        const moduleContent = await res.json()
        if (moduleContent) {
          return moduleContent as Module
        }
      } else {
        console.warn(`Polling failed with status ${res.status} for ${moduleName}`)
      }
    } catch (error) {
      console.error(`Polling error for ${moduleName}:`, error)
    }

    await new Promise(resolve => setTimeout(resolve, pollIntervalMs))
  }

  console.warn(`Polling timeout for module ${moduleName}`)
  return null
}
