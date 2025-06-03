import { useEffect, useState } from 'react'
import { faPlay } from '@fortawesome/free-solid-svg-icons'   
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type DialogLineProps = {
  line: string  // Format: G|Speaker|Sentence
  index: number
  storeAudioUrl: (index: number, url: string) => void
}

export function DialogLine({ line, index, storeAudioUrl }: DialogLineProps) {
  const [gender, speaker, sentence] = line.split('|')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchAudio = async () => {
      const res = await fetch('/.netlify/functions/generate-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sentence, gender })
      })

      const { audioContent } = await res.json()
      const url = `data:audio/mp3;base64,${audioContent}`
      setAudioUrl(url)
      storeAudioUrl(index, url)
    }

    fetchAudio()
  }, [sentence, gender, index, storeAudioUrl])

  const handlePlay = () => {
    if (!audioUrl) return
    const audio = new Audio(audioUrl)
    audio.play()
  }

  return (
    <li className="mb2 flex items-center">
      <div className="flex-auto">
        <strong>{speaker}</strong>: {sentence}
      </div>
      <button
        className="ml3 f6 link dim br2 ph2 pv1 dib white bg-dark-blue"
        onClick={handlePlay}
        disabled={!audioUrl}
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </li>
  )
}
