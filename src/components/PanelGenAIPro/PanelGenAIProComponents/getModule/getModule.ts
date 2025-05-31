import type {
  GetModuleProps,
  Module
} from "../../../../../shared/types"

export const getModule = async ({
  testMode,
  lesson,
  moduleName
}: GetModuleProps): Promise<Module | null> => {
  try {
    const res = await fetch('/.netlify/functions/genai-module', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
    return data as Module
  } catch (err) {
    console.error('Network error:', err)
    return null
  }
}

export default getModule
