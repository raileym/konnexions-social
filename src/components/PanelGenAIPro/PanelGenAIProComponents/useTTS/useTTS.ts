import { useEffect, useRef, useState } from "react"

type UseTTSOptions = {
  text: string
  gender?: string
  index?: number
  useCloudTTS: boolean
  store?: (index: number, value: string) => void
}

export function useTTS({
  text,
  gender = "M",
  index = 0,
  useCloudTTS,
  store
}: UseTTSOptions) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let cancelled = false

    if (useCloudTTS) {
      const fetchAudio = async () => {
        try {
          const res = await fetch("/.netlify/functions/generate-tts-cache", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, gender })
          })

          const { audioContent } = await res.json()
          if (!cancelled) {
            const url = `data:audio/mp3;base64,${audioContent}`
            setAudioUrl(url)
            if (store) store(index, url)
          }
        } catch (err) {
          console.error("TTS fetch failed:", err)
        }
      }

      fetchAudio()
    } else {
      if (store) store(index, text)
    }

    return () => {
      cancelled = true
      stop() // Ensure playback is cancelled when input changes
    }
  }, [text, gender, useCloudTTS, index, store])

  const speak = () => {
    stop()

    if (useCloudTTS && audioUrl) {
      const audio = new Audio(audioUrl)
      audioRef.current = audio
      audio.play()
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

  const stop = () => {
    // Cancel browser TTS
    window.speechSynthesis.cancel()

    // Stop HTMLAudioElement if playing
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
  }

  return { audioUrl, speak, stop }
}
