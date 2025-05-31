import type {
  GetPartialLessonProps,
  PartialLesson
} from "../../../../../shared/types"

export const getPartialLesson = async ({
  testMode,
  lesson,
  lessonTitle
}: GetPartialLessonProps): Promise<PartialLesson | null> => {
  try {
    const res = await fetch(`/.netlify/functions/genai-${lessonTitle}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testMode,
        lesson,
        lessonTitle
      })
    })

    if (!res.ok) {
      console.error('Function error:', res.status)
      return null
    }

    const data = await res.json()
    return data as PartialLesson
  } catch (err) {
    console.error('Network error:', err)
    return null
  }
}

export default getPartialLesson
