import type { Module, PollModuleByLessonAndNameProps } from '@cknTypes/types'

/**
 * Poll Supabase for module data by lessonId and moduleName until available or timeout.
 */
export const pollModuleByLessonAndName = async ({
  lessonId,
  moduleName,
  pollIntervalMs = 10000,
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

      console.log('pollModuleByLessonAndName', JSON.stringify({lessonId, moduleName}))
      
      if (res.ok) {
        const moduleContent = await res.json()

        // Check for your custom "not ready" response pattern
        if (
          moduleContent &&
          (moduleContent.ready === false || moduleContent.message === 'Module not ready')
        ) {
          console.info(`Waiting for module "${moduleName}" to be ready. Retrying...`)
          // Don't return, continue polling
        } else {
          // Module ready, return it
          return moduleContent as Module
        }
      } else {
        console.info(`Waiting for module "${moduleName}" to be ready. Retrying...`)
      }
    } catch (error) {
      console.error(`Polling error for ${moduleName}:`, error)
    }

    await new Promise(resolve => setTimeout(resolve, pollIntervalMs))
  }

  console.warn(`Polling timeout for module ${moduleName}`)
  return null
}
