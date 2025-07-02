import crypto from 'crypto'
import type { Lesson } from '@cknTypes/types'

export const createLessonSignature = (lesson: Partial<Lesson>): string => {
  // Extract only the fields relevant to the signature, providing defaults if missing
  const signatureData = {
    id: lesson.id ?? 0,
    name: lesson.name ?? '',
    description: lesson.description ?? '',
    targetLanguage: lesson.targetLanguage ?? '',
    sourceLanguage: lesson.sourceLanguage ?? '',
    scenario: lesson.scenario ?? '',
    participantList: lesson.participantList ?? '',
    prose: lesson.prose ?? ''
  }

  const strToHash = JSON.stringify(signatureData)
  return crypto.createHash('sha256').update(strToHash).digest('hex')
}
