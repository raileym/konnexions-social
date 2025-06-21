import { useRef, useState } from 'react'
import type { Language, MaxCount, SetMaxCount } from '@cknTypes/types'
import { fetchTTS } from '@PanelGenAIProComponents/fetchTTS/fetchTTS'

type SpeakArgs = {
  text: string
  speaker: string
  gender: string
  index?: number
  onEnd?: () => void
}

type UseTTSOptions = {
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

  const speak = async ({ text, speaker, gender, index = 0, onEnd }: SpeakArgs) => {
    stop()

    if (useCloudTTS && !cutoff && maxCount > 0) {
      if (audioUrl) {
        const audio = new Audio(audioUrl)
        audioRef.current = audio
        audio.onended = onEnd ?? (() => {})
        audio.play()
        return
      }

      if (fetchingRef.current) return
      fetchingRef.current = true

      try {
        const url = await fetchTTS({ speaker, language, text, gender, maxCount, setMaxCount, cutoff })
        if (url) {
          setAudioUrl(url)
          if (store) store(index, url)
          const audio = new Audio(url)
          audioRef.current = audio
          audio.onended = onEnd ?? (() => {})
          audio.play()
        }
      } finally {
        fetchingRef.current = false
      }
    } else {
      const utterance = new SpeechSynthesisUtterance(text)
      const voices = window.speechSynthesis.getVoices()
      const langTag = LANG_TAG_MAP[language] || 'en-US'

      const match = voices.find(v =>
        gender === 'f'
          ? v.lang === langTag && v.name.toLowerCase().includes('female')
          : v.lang === langTag && v.name.toLowerCase().includes('male')
      )

      utterance.voice = match || voices.find(v => v.lang === langTag) || null
      utterance.lang = langTag
      utterance.rate = 0.9
      utterance.onend = onEnd ?? (() => {})
      window.speechSynthesis.speak(utterance)
    }
  }

  return { audioUrl, speak, stop }
}
