import { useState, useRef, useCallback, useEffect } from 'react'
import { DialogLine } from '@components/DialogLine/DialogLine'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchTTS } from '@PanelGenAIProComponents/fetchTTS/fetchTTS'
import { useAppContext } from '@context/AppContext/AppContext'
// import { LANGUAGE_TITLE, SCENARIO_LABELS } from '@cknTypes/constants'
import { LANGUAGE_TITLE } from '@cknTypes/constants'
import type { Language } from '@cknTypes/types'
import { useTTS } from '@PanelGenAIProComponents/useTTS/useTTS'
import { useDebugLogger } from '@hooks/useDebugLogger'
import { capitalize } from '@components/Util'

type DialogListProps = {
  lines: string[]
  useCloudTTS: boolean
  language: Language
}

export const DialogList = ({ language, lines, useCloudTTS }: DialogListProps) => {
  // const [audioItems, setAudioItems] = useState<string[]>([])
  const audioItemsRef = useRef<string[]>([])

  const [, setCurrentIndex] = useState<number | null>(null)
  const synthRef = useRef(window.speechSynthesis)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(false)
  const iRef = useRef(0) // controls current index across calls

  const debugLog = useDebugLogger()

  const {
    maxCount,
    setMaxCount,
    cutoff,
    selectedLessonNumber,
    setLineNumber,
    lineNumber,
    // scenario,
    lessonTimestamp,
    lessonPromptStyle,
    customScenario
  } = useAppContext()

  const storeAudioOrLine = useCallback((index: number, value: string) => {
    const arr = audioItemsRef.current
    if (arr[index] === value) return
    arr[index] = value
  }, [])

  const { speak } = useTTS({
    useCloudTTS,
    maxCount,
    setMaxCount,
    cutoff,
    store: storeAudioOrLine,
    language,
    debugLog
  })

  useEffect(() => {
    audioItemsRef.current = []
  }, [selectedLessonNumber, cutoff])

  useEffect(() => {
    // cXonsole.log('Invoking useEffect in DialogList')
    if (!useCloudTTS || cutoff) return
    // cXonsole.log('Passing through useEffect in DialogList')

    const preloadSequentially = async () => {
      for (let i = 0; i < lines.length; i++) {
        if (audioItemsRef.current[i]) {
          // cXonsole.log(`audio line found, no. ${i}`)
          continue
        }

        // cXonsole.log(`audio line not found, no. ${i}`)

        const [gender, speaker, sentence] = lines[i].split('|')

        try {
          const maybeAudio = await fetchTTS({
            text: sentence,
            speaker,
            gender,
            cutoff,
            maxCount,
            setMaxCount,
            language,
            debugLog
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLessonNumber, cutoff, lessonTimestamp])

  const resetPlayback = () => {
    // cXonsole.log('Resetting playback')
    isPlayingRef.current = false
    iRef.current = 0
    setCurrentIndex(null)
    setLineNumber(0)
  }

  const playAll = () => {
    if (isPlayingRef.current) {
      // cXonsole.log('playAll: already playing')
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
        // cXonsole.log(`playAll: done or stopped. isPlaying: ${isPlayingRef.current}, i: ${i}, len: ${lines.length}`)
        resetPlayback()
        return
      }

      const line = lines[i]
      setCurrentIndex(i)
      setLineNumber(i)

      let value = audioItemsRef.current[i]

      const [gender, speaker, sentence] = line.split('|')
      
      if (!value) {
        // cXonsole.log(`playAll: audioItemsRef.current[${i}] is empty. Fetch: ${sentence}`)

        try {
          value = (useCloudTTS && !cutoff && maxCount > 0)
            ? await fetchTTS({ debugLog, language, speaker, text: sentence, gender, maxCount, setMaxCount, cutoff }) ?? ''
            : sentence

          storeAudioOrLine(i, value)
        } catch (err) {
          console.error('TTS fetch failed:', err)
          return safeNext()
        }
      }

      // cXonsole.log('value', value)
      // cXonsole.log(`No ${i}: ${value}`)

      if (value.startsWith('http')) {
        const audio = new Audio(value)
        audioRef.current = audio
        audio.onended = safeNext
        audio.play()
      } else {
        speak({
          text: value,
          speaker,
          gender,
          index: i,
          onEnd: safeNext
        })
      }
    }

    playNext()
  }


  // const pauseAll = () => {
  //   if (audioRef.current) audioRef.current.pause()
  //   else synthRef.current.pause()
  // }

  const stopAll = () => {
    isPlayingRef.current = false
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    } else {
      synthRef.current.cancel()
    }
    setCurrentIndex(null)
    setLineNumber(0)
  }

  return (
    <div>
      <div className='tc f2 w-100 mt4X b'>{capitalize(lessonPromptStyle)} {customScenario}</div>
      <div className='tc f4 w-100 mt4X b'>{LANGUAGE_TITLE[language]}</div>
      <div className='flex flex-row items-center mt4'>
        <button
          onClick={playAll}
          className='ml3 f6 br2 ph2 pv1 white bg-dark-blue hover:bg-blue no-outline'
        >
          <FontAwesomeIcon icon={faPlay} /> Play All
        </button>

        {/*
        <button
          onClick={pauseAll}
          className='ml2 f6 br2 ph2 pv1 white bg-gold hover:bg-yellow no-outline'
        >
          <FontAwesomeIcon icon={faPause} /> Pause
        </button>
        */}

        <button
          onClick={stopAll}
          className='ml2 f6 br2 ph2 pv1 white bg-dark-red hover:bg-red no-outline'
        >
          <FontAwesomeIcon icon={faStop} /> Stop
        </button>
      </div>
      <ul className='mt3 ml0 pl3'>
        {lines.map((line, i) => (
          <li key={i} className={'mb2 pl3X flex items-center'}>
            <DialogLine
              key={i}
              line={line}
              index={i}
              useCloudTTS={useCloudTTS}
              storeAudioOrLine={storeAudioOrLine}
              className={i === lineNumber ? 'bg-brand white ': 'bg-transparent black'}
              language={language}
              debugLog={debugLog}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
