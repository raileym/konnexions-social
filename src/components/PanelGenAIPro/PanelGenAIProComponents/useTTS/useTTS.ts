import { useRef, useState } from "react"
import type { MaxCount, SetMaxCount } from "../../../../../shared/types"
import { fetchTTS } from "../fetchTTS/fetchTTS"

type UseTTSOptions = {
  text: string
  gender?: string
  index?: number
  useCloudTTS: boolean
  maxCount: MaxCount
  setMaxCount: SetMaxCount
  cutoff: boolean
  store?: (index: number, value: string) => void
}

export function useTTS({
  text,
  gender = "M",
  index = 0,
  useCloudTTS,
  maxCount,
  setMaxCount,
  cutoff,
  store
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
        const url = await fetchTTS({ text, gender, maxCount, setMaxCount, cutoff })
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
      const match = voices.find(v =>
        gender === "F"
          ? v.lang.startsWith("es") && v.name.toLowerCase().includes("female")
          : v.lang.startsWith("es") && v.name.toLowerCase().includes("male")
      )

      utterance.voice = match || voices.find(v => v.lang.startsWith("es")) || null
      utterance.lang = "es-ES"
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  return { audioUrl, speak, stop }
}
