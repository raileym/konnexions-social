import type { Gender, Language, VoicePool } from '@cknTypes/types'
import { getStableHash } from '@shared/getStableHash'

type GetVoiceForSpeakerProps = {
  speaker: string,
  language: Language,
  gender: Gender
}

const VOICE_POOL: VoicePool = {
  en: {
    m: ['en-US-Wavenet-B', 'en-US-Wavenet-D', 'en-US-Wavenet-F'],
    n: ['en-US-Wavenet-B', 'en-US-Wavenet-D', 'en-US-Wavenet-F'],
    f: ['en-US-Wavenet-C', 'en-US-Wavenet-E']
  },
  es: {
    m: ['es-US-Wavenet-B'], // Only one for es-US
    n: ['es-US-Wavenet-B'], // Only one for es-US
    f: ['es-US-Wavenet-A']
  },
  fr: {
    m: ['fr-FR-Wavenet-B'],
    n: ['fr-FR-Wavenet-B'],
    f: ['fr-FR-Wavenet-A']
  },
  it: {
    m: ['it-IT-Wavenet-C'],
    n: ['it-IT-Wavenet-C'],
    f: ['it-IT-Wavenet-B']
  }
}

export const getVoiceForSpeaker = ({
  speaker,
  language,
  gender
}: GetVoiceForSpeakerProps): string => {
  const pool = VOICE_POOL[language]?.[gender] ?? []

  if (pool.length === 0) {
    return 'en-US-Wavenet-D' // safe fallback
  }

  const index = getStableHash(speaker) % pool.length
  return pool[index]
}
