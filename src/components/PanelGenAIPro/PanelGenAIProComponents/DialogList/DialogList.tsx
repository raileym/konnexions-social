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
  // const [audioItems, setAudioItems] = useState<string[]>([])
  const audioItemsRef = useRef<string[]>([])

  const [, setCurrentIndex] = useState<number | null>(null)
  const synthRef = useRef(window.speechSynthesis)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(false)
  const iRef = useRef(0) // controls current index across calls

  const { maxCount, cutoff, selectedLessonId } = useAppContext()

  const storeAudioOrLine = useCallback((index: number, value: string) => {
    const arr = audioItemsRef.current
    if (arr[index] === value) return
    arr[index] = value
  }, [])


  useEffect(() => {
    audioItemsRef.current = []
  }, [selectedLessonId, cutoff])

  useEffect(() => {
    console.log('Invoking useEffect in DialogList')
    if (!useCloudTTS || cutoff) return
    console.log('Passing through useEffect in DialogList')

    const preloadSequentially = async () => {
      for (let i = 0; i < lines.length; i++) {
        if (audioItemsRef.current[i]) {
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
  }, [selectedLessonId, cutoff])

  const resetPlayback = () => {
    console.log('Resetting playback')
    isPlayingRef.current = false
    iRef.current = 0
    setCurrentIndex(null)
  }

  const playAll = () => {
    if (isPlayingRef.current) {
      console.log('playAll: already playing')
      return
    }

    isPlayingRef.current = true
    iRef.current = 0

    const safeNext = () => {
      iRef.current++
      playNext()
    }

    const playNext = async () => {
      const i = iRef.current

      if (!isPlayingRef.current || i >= lines.length) {
        console.log(`playAll: done or stopped. isPlaying: ${isPlayingRef.current}, i: ${i}, len: ${lines.length}`)
        resetPlayback()
        return
      }

      const line = lines[i]
      setCurrentIndex(i)

      let value = audioItemsRef.current[i]

      if (!value) {
        const [gender, , sentence] = line.split('|')
        console.log(`playAll: audioItemsRef.current[${i}] is empty. Fetch: ${sentence}`)

        try {
          value = (useCloudTTS && !cutoff && maxCount > 0)
            ? await fetchTTS({ text: sentence, gender, maxCount, cutoff }) ?? ''
            : sentence

          storeAudioOrLine(i, value)
        } catch (err) {
          console.error('TTS fetch failed:', err)
          return safeNext()
        }
      } else {
        console.log(`playAll: audioItemsRef.current[${i}] is NOT empty.`)
      }

      console.log('value', value)

      if (value.startsWith('http')) {
        const audio = new Audio(value)
        audioRef.current = audio
        audio.onended = safeNext
        audio.play()
      } else {
        const utterance = new SpeechSynthesisUtterance(value)
        utterance.lang = 'es-ES'
        utterance.rate = 0.9
        utterance.onend = safeNext
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
          className="ml3 f6 br2 ph2 pv1 white bg-dark-blue hover:bg-blue no-outline"
        >
          <FontAwesomeIcon icon={faPlay} /> Play All
        </button>

        {/* <button
          onClick={pauseAll}
          className="ml2 f6 br2 ph2 pv1 white bg-gold hover:bg-yellow no-outline"
        >
          <FontAwesomeIcon icon={faPause} /> Pause
        </button> */}

        <button
          onClick={stopAll}
          className="ml2 f6 br2 ph2 pv1 white bg-dark-red hover:bg-red no-outline"
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
