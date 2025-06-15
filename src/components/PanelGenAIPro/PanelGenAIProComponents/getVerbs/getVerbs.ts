import type {
  GetVerbsProps,
  GetVerbsResult
} from "../../../../../shared/cknTypes/types/types"

export const getVerbs = async ({
  testMode,
  lesson
}: GetVerbsProps): Promise<GetVerbsResult | null> => {
  try {
    const res = await fetch('/.netlify/functions/genai-verbs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testMode,
        lesson
      })
    })

    if (!res.ok) {
      console.error('Function error:', res.status)
      return null
    }

    const data = await res.json()
    return data as GetVerbsResult
  } catch (err) {
    console.error('Network error:', err)
    return null
  }
}

export default getVerbs
