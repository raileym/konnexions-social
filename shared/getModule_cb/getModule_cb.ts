import type {
  GetModuleCbProps,
  Module
} from '@cknTypes/types'

export const getModuleCb = async ({
  lesson,
  moduleName,
  testMode
}: GetModuleCbProps): Promise<Module | null> => {
  try {
    const res = await fetch('/.netlify/functions/genai-module-cb', {
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
    return data[moduleName] as Module
  } catch (err) {
    console.error('Network error:', err)
    return null
  }
}

export default getModuleCb
