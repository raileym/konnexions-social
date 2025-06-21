import { useRef, useState } from 'react'
import type { Language, MaxCount, SetMaxCount } from '@cknTypes/types'
import { fetchTTS } from '@PanelGenAIProComponents/fetchTTS/fetchTTS'
import { GENDER } from '@cknTypes/constants'

type UseTTSOptions = {
  text: string
  gender?: string
  index?: number
  useCloudTTS: boolean
  maxCount: MaxCount
  setMaxCount: SetMaxCount
  cutoff: boolean
  store?: (index: number, value: string) => void
  language: Language
}

const LANG_TAG_MAP: Record<string, string> = {
  es: 'es-ES',
  en: 'en-US',
  fr: 'fr-FR',
  it: 'it-IT'
}

export function useTTS({
  text,
  gender = GENDER.M,
  index = 0,
  useCloudTTS,
  maxCount,
  setMaxCount,
  cutoff,
  store,
  language
}: UseTTSOptions) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fetchingRef = useRef(false)

  const stop = () => {
    window.speechSynthesis.cancel()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
  }

  const speak = async () => {
    stop()

    // if (cutoff || maxCount <= 0) return

    if (useCloudTTS && !cutoff && maxCount > 0) {
      if (audioUrl) {
        const audio = new Audio(audioUrl)
        audioRef.current = audio
        audio.play()
        return
      }

      if (fetchingRef.current) return
      fetchingRef.current = true

      try {
        const url = await fetchTTS({ language, text, gender, maxCount, setMaxCount, cutoff })
        if (url) {
          setAudioUrl(url)
          if (store) store(index, url)
          const audio = new Audio(url)
          audioRef.current = audio
          audio.play()
        }
      } finally {
        fetchingRef.current = false
      }
    } else {
      const utterance = new SpeechSynthesisUtterance(text)
      const voices = window.speechSynthesis.getVoices()
      const langTag = LANG_TAG_MAP[language] || 'en-US'  // fallback to 'en-US' if undefined

      const match = voices.find(v =>
        gender === 'f'
          ? v.lang === langTag && v.name.toLowerCase().includes('female')
          : v.lang === langTag && v.name.toLowerCase().includes('male')
      )

      utterance.voice = match || voices.find(v => v.lang === langTag) || null
      utterance.lang = langTag
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  return { audioUrl, speak, stop }
}
