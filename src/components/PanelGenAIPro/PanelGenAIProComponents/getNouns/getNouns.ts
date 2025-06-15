import type {
  GetNounsProps,
  GetNounsResult
} from "../../../../../shared/cknTypes/types/types"

export const getNouns = async ({
  testMode,
  lesson
}: GetNounsProps): Promise<GetNounsResult | null> => {
  try {
    const res = await fetch('/.netlify/functions/genai-nouns', {
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
    return data as GetNounsResult
  } catch (err) {
    console.error('Network error:', err)
    return null
  }
}  

export default getNouns
