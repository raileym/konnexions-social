import { useState, useRef, useCallback } from 'react'
import { DialogLine } from '../DialogLine/DialogLine'
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type DialogListProps = {
  lines: string[]
  useCloudTTS: boolean
}

export function DialogList({ lines, useCloudTTS }: DialogListProps) {
  const [audioItems, setAudioItems] = useState<string[]>([])
  const [, setCurrentIndex] = useState<number | null>(null)
  const synthRef = useRef(window.speechSynthesis)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(false)

  const storeAudioOrLine = useCallback((index: number, value: string) => {
    setAudioItems(prev => {
      const updated = [...prev]
      if (updated[index] === value) return prev
      updated[index] = value
      return updated
    })
  }, [])

  const playAll = () => {
    if (audioItems.length !== lines.length || isPlayingRef.current) return

    let i = 0
    isPlayingRef.current = true

    const playNext = () => {
      if (!isPlayingRef.current || i >= audioItems.length) {
        setCurrentIndex(null)
        return
      }

      const item = audioItems[i]
      setCurrentIndex(i)

      if (item.startsWith('data:audio/mp3')) {
        const audio = new Audio(item)
        audioRef.current = audio
        audio.onended = () => {
          i++
          playNext()
        }
        audio.play()
      } else {
        const utterance = new SpeechSynthesisUtterance(item)
        utterance.lang = 'es-ES'
        utterance.rate = 0.9
        utterance.onend = () => {
          i++
          playNext()
        }
        synthRef.current.speak(utterance)
      }
    }

    playNext()
  }

  const pauseAll = () => {
    if (audioRef.current) audioRef.current.pause()
    else synthRef.current.pause()
  }

  const stopAll = () => {
    isPlayingRef.current = false
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    } else synthRef.current.cancel()
    setCurrentIndex(null)
  }

  const hasStored = audioItems.length === lines.length

  return (
    <div>
      <div className="flex flex-row items-center mt4">
        <div className="mt4X b">Dialog</div>
        <button
          onClick={playAll}
          className="ml3 f6 link dim br2 ph2 pv1 white bg-dark-blue"
          disabled={!hasStored}
        >
          <FontAwesomeIcon icon={faPlay} /> Play All
        </button>
        <button
          onClick={pauseAll}
          className="ml2 f6 link dim br2 ph2 pv1 white bg-gold"
        >
          <FontAwesomeIcon icon={faPause} /> Pause
        </button>
        <button
          onClick={stopAll}
          className="ml2 f6 link dim br2 ph2 pv1 white bg-dark-red"
        >
          <FontAwesomeIcon icon={faStop} /> Stop
        </button>
      </div>
      <ul className="mt3">
        {lines.map((line, i) => (
          <DialogLine
            key={i}
            line={line}
            index={i}
            useCloudTTS={useCloudTTS}
            storeAudioOrLine={storeAudioOrLine}
          />
        ))}
      </ul>
    </div>
  )
}
