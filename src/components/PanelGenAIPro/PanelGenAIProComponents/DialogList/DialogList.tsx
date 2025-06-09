import { useState, useRef, useCallback, useEffect } from 'react'
import { DialogLine } from '../DialogLine/DialogLine'
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchTTS } from '../fetchTTS/fetchTTS'
import { useAppContext } from '../../../../context/AppContext'

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

  const { maxCount, cutoff } = useAppContext()

  const storeAudioOrLine = useCallback((index: number, value: string) => {
    setAudioItems(prev => {
      const updated = [...prev]
      if (updated[index] === value) return prev
      updated[index] = value
      return updated
    })
  }, [])

useEffect(() => {
  console.log('Invoking useEffect in DialogList')
  if (!useCloudTTS || cutoff) return
  console.log('Passing through useEffect in DialogList')

  const preloadSequentially = async () => {
    for (let i = 0; i < lines.length; i++) {
      if (audioItems[i]) {
        console.log(`audio line found, no. ${i}`)
        continue
      }

      console.log(`audio line not found, no. ${i}`)

      const [gender, , sentence] = lines[i].split('|')

      try {
        const maybeAudio = await fetchTTS({
          text: sentence,
          gender,
          maxCount,
          cutoff
        })

        if (maybeAudio !== null) {
          storeAudioOrLine(i, maybeAudio)
        }
      } catch (err) {
        console.error(`Failed to preload TTS for line ${i}:`, err)
      }
    }
  }

  preloadSequentially()
}, [lines])


  const playAll = () => {
    if (isPlayingRef.current) return

    let i = 0
    isPlayingRef.current = true

    const playNext = async () => {
      if (!isPlayingRef.current || i >= lines.length) {
        setCurrentIndex(null)
        return
      }

      const line = lines[i]
      setCurrentIndex(i)

      let value = audioItems[i]

      if (!value) {
        const [gender, , sentence] = line.split('|')
        try {
          value = useCloudTTS
            ? await fetchTTS({ text: sentence, gender, maxCount, cutoff }) ?? ''
            : sentence
          storeAudioOrLine(i, value)
        } catch (err) {
          console.error('TTS fetch failed:', err)
          i++
          return playNext()
        }
      }

      if (value.startsWith('data:audio/mp3')) {
        const audio = new Audio(value)
        audioRef.current = audio
        audio.onended = () => {
          i++
          playNext()
        }
        audio.play()
      } else {
        const utterance = new SpeechSynthesisUtterance(value)
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
    } else {
      synthRef.current.cancel()
    }
    setCurrentIndex(null)
  }

  return (
    <div>
      <div className="flex flex-row items-center mt4">
        <div className="mt4X b">Dialog</div>
        <button
          onClick={playAll}
          className="ml3 f6 link dim br2 ph2 pv1 white bg-dark-blue"
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
