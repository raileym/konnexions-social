import type {
  GetModuleProps,
  Module
} from "../../../../../shared/cknTypes/types/types"

export const getModule = async ({
  scenarioData,
  lesson,
  moduleName,
  testMode
}: GetModuleProps): Promise<Module | null> => {
  try {
    const res = await fetch('/.netlify/functions/genai-module', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioData,
        testMode,
        lesson,
        moduleName
      })
    })

    if (!res.ok) {
      console.error('Function error:', res.status)
      return null
    }

    const data = await res.json()
    return data[moduleName] as Module
  } catch (err) {
    console.error('Network error:', err)
    return null
  }
}

export default getModule
