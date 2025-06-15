import type {
  GetModuleProps,
  Lesson
} from "../../../../../shared/cknTypes/types/types"

export const getDialog = async ({
  testMode,
  lesson
}: GetModuleProps): Promise<Lesson | null> => {
  try {
    const res = await fetch('/.netlify/functions/genai-dialog', {
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
    return data as Lesson
  } catch (err) {
    console.error('Network error:', err)
    return null
  }
}

export default getDialog
