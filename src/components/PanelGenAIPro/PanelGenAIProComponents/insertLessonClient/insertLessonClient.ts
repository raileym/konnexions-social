import type { Lesson } from '@cknTypes/types'

export const insertLessonClient = async (
  lesson: Lesson
): Promise<Lesson | null> => {
  try {
    const res = await fetch('/.netlify/functions/insert-lesson-cb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lesson })
    })

    if (!res.ok) {
      console.error(`Insert lesson error: ${res.status}`)
      return null
    }

    const data = await res.json()

    if (!data.lesson) {
      console.warn('Unexpected insert response:', data)
      return null
    }

    return data.lesson
  } catch (err) {
    console.error('Network error calling insertLessonClient:', err)
    return null
  }
}
