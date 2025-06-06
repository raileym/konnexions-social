import { useEffect, useState } from 'react'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../../../../context/AppContext'

type DialogLineProps = {
  line: string
  index: number
  useCloudTTS: boolean
  storeAudioOrLine: (index: number, value: string) => void
}

export function DialogLine({ line, index, useCloudTTS, storeAudioOrLine }: DialogLineProps) {
  const [gender, speaker, sentence] = line.split('|')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const { setGenerateTTSCount } = useAppContext()
  
  useEffect(() => {
    let cancelled = false

    if (useCloudTTS) {
      const fetchAudio = async () => {
        try {
          setGenerateTTSCount(prev => prev+1)
          console.log('Calling Google TTS')

          const res = await fetch('/.netlify/functions/generate-tts-cache', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: sentence,
              gender
            })
          })

          const { audioContent } = await res.json()
          console.log(JSON.stringify(audioContent, null, 2))
          if (!cancelled) {
            const url = `data:audio/mp3;base64,${audioContent}`
            setAudioUrl(url)
            storeAudioOrLine(index, url)
          }
        } catch (err) {
          console.error('TTS fetch failed:', err)
        }
      }

      fetchAudio()
    } else {
      storeAudioOrLine(index, sentence)
    }

    return () => {
      cancelled = true
    }
  }, [sentence, gender, index, useCloudTTS, storeAudioOrLine, setGenerateTTSCount])

  const handlePlay = () => {
    if (useCloudTTS && audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play()
    } else {
      const utterance = new SpeechSynthesisUtterance(sentence)
      const voices = window.speechSynthesis.getVoices()

      const match = voices.find(v =>
        gender === 'F'
          ? v.lang.startsWith('es') && v.name.toLowerCase().includes('female')
          : v.lang.startsWith('es') && v.name.toLowerCase().includes('male')
      )

      utterance.voice = match || voices.find(v => v.lang.startsWith('es')) || null
      utterance.lang = 'es-ES'
      utterance.rate = 0.9

      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <li className="mb2 flex items-center">
      <div className="flex-auto">
        <strong>{speaker}</strong>: {sentence}
      </div>
      <button
        className="ml3 f6 link dim br2 ph2 pv1 dib white bg-dark-blue"
        onClick={handlePlay}
        disabled={useCloudTTS && !audioUrl}
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </li>
  )
}
