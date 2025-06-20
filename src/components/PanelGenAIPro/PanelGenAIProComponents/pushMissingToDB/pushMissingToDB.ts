import type { Lesson } from '@cknTypes/types'

export const pushMissingToDB = async (lesson: Lesson) => {
  console.log('pushing nouns missing', lesson.nounsMissing)
  console.log('pushing verbs missing', lesson.verbsMissing)
  
  const res = await fetch('/.netlify/functions/upsert-missing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lesson })
  })
  if (!res.ok) console.error('❌ Failed to insert missing nouns/verbs')
}
