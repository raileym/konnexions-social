import type {
  GetModuleCbProps,
  Module
} from '../cknTypes/types.js'

export const getModule_cb = async ({
  lesson,
  moduleName,
  testMode
}: GetModuleCbProps): Promise<Module | null> => {
  try {
    const baseURL = process.env.URL

    const res = await fetch(`${baseURL}/.netlify/functions/genai-module-cb`, {
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

    const data = (await res.json()) as Record<string, Module>;
    return data[moduleName] ?? null;
  } catch (err) {
    console.error('Network error:', err)
    return null
  }
}

export default getModule_cb
