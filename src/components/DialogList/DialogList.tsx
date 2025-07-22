import { useState, useRef, useCallback, useEffect } from 'react'
import { DialogLine } from '@components/DialogLine/DialogLine'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchTTS } from '@PanelGenAIProComponents/fetchTTS/fetchTTS'
import { useAppContext } from '@context/AppContext/AppContext'
import { LANGUAGE_TITLE, SCREEN } from '@cknTypes/constants'
import { useTTS } from '@PanelGenAIProComponents/useTTS/useTTS'
import { useDebugLogger } from '@hooks/useDebugLogger'
import { capitalize } from '@components/Util'
import type { DialogListProps } from '@cknTypes/types'
import { usePaywall } from '@hooks/usePaywall/usePaywall'

export const DialogList = ({ language, lines, translations, useCloudTTS }: DialogListProps) => {
  const [showTranslations, setShowTranslations] = useState(false)
  const audioItemsRef = useRef<string[]>([])
  const [, setCurrentIndex] = useState<number | null>(null)
  const synthRef = useRef(window.speechSynthesis)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(false)
  const iRef = useRef(0)

  const debugLog = useDebugLogger()
  const {
    cutoff,
    selectedLessonNumber,
    setLineNumber,
    lineNumber,
    lessonTimestamp,
    lessonPromptStyle,
    customScenario,
    paywall,
    clientUUID,
    screenState
  } = useAppContext()

  const { refreshPaywall } = usePaywall()

  // cXonsole.log('lines', lines)
  // cXonsole.log('translations', translations)
  const hasTranslations = translations && translations.length > 0

  const storeAudioOrLine = useCallback((index: number, value: string) => {
    const arr = audioItemsRef.current
    if (arr[index] === value) return
    arr[index] = value
  }, [])

  const { speak } = useTTS({
    useCloudTTS,
    cutoff,
    store: storeAudioOrLine,
    language,
    debugLog
  })

  useEffect(() => {
    audioItemsRef.current = []
  }, [selectedLessonNumber, cutoff])

  useEffect(() => {
    if (!useCloudTTS || cutoff) return
    const preloadSequentially = async () => {
      for (let i = 0; i < lines.length; i++) {
        if (audioItemsRef.current[i]) continue
        const [gender, speaker, sentence] = lines[i].split('|')
        try {
          const { audioUrl } = await fetchTTS({ text: sentence, speaker, gender, cutoff, language, paywall, debugLog, clientUUID })
          if (audioUrl !== null) storeAudioOrLine(i, audioUrl)
        } catch (err) {
          console.error(`Failed to preload TTS for line ${i}:`, err)
        }
      }
      refreshPaywall()
    }
    preloadSequentially()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLessonNumber, cutoff, lessonTimestamp])

  const resetPlayback = () => {
    isPlayingRef.current = false
    iRef.current = 0
    setCurrentIndex(null)
    setLineNumber(0)
  }

  const playAll = () => {
    if (isPlayingRef.current) return
    isPlayingRef.current = true
    iRef.current = 0
    const safeNext = () => {
      iRef.current++
      playNext()
    }

    const playNext = async () => {
      const i = iRef.current
      if (!isPlayingRef.current || i >= lines.length) {
        resetPlayback()
        refreshPaywall()        
        return
      }

      const line = lines[i]
      setCurrentIndex(i)
      setLineNumber(i)

      const value = audioItemsRef.current[i]
      const [gender, speaker, sentence] = line.split('|')
      if (!value) {
        try {
          const { audioUrl } = (useCloudTTS && !cutoff && paywall.paywall_package_yellow_remaining > 0)
            ? await fetchTTS({ debugLog, language, speaker, text: sentence, gender, paywall, cutoff, clientUUID }) ?? ''
            : {audioUrl: sentence}
          storeAudioOrLine(i, audioUrl ?? '')
        } catch (err) {
          console.error('TTS fetch failed:', err)
          return safeNext()
        }
      }

      const updatedValue = audioItemsRef.current[i]
      if (updatedValue.startsWith('http')) {
        const audio = new Audio(updatedValue)
        audioRef.current = audio
        audio.onended = safeNext
        audio.play()
      } else {
        speak({ text: updatedValue, speaker, gender, index: i, onEnd: safeNext })
      }
    }

    playNext()
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
    setLineNumber(0)
  }

  return (
    <div className="dialog-list">
      <div className='tc f2 w-100 mt4X b background'>{capitalize(lessonPromptStyle)} {customScenario}</div>
      <div className='tc f4 w-100 mt4X b'>{LANGUAGE_TITLE[language]}</div>

      <div className='flex flex-row items-center mt4'>
        <button onClick={playAll} className='ml3 f6 br2 ph2 pv1 on-background bg-secondary hover:bg-blue' tabIndex={screenState[SCREEN.REVIEW] ? 0 : -1} aria-disabled={!screenState[SCREEN.REVIEW]}>
          <FontAwesomeIcon icon={faPlay} /> Play All
        </button>
        <button onClick={stopAll} className='ml2 f6 br2 ph2 pv1 on-background bg-dark-red hover:bg-red' tabIndex={screenState[SCREEN.REVIEW] ? 0 : -1} aria-disabled={!screenState[SCREEN.REVIEW]}>
          <FontAwesomeIcon icon={faStop} /> Stop
        </button>
        <button
          tabIndex={screenState[SCREEN.REVIEW] ? 0 : -1}
          aria-disabled={!screenState[SCREEN.REVIEW]}
          onClick={() => setShowTranslations(prev => !prev)}
          className={`ml2 f6 br2 ph2 pv1 on-background ${hasTranslations ? 'bg-background hover:bg-silver' : 'bg-background cursor-not-allowed'}`}
          disabled={!hasTranslations}
        >
          {showTranslations ? 'Hide' : 'Show'} Translations
        </button>
      </div>

      <hr className="mv3 pv0" />

      <div className="h5 overflow-y-auto" style={{ height: '30rem' }}>
        <ul className='mt0 ml0 pl3'>
          {lines.map((line, i) => {
            const rawTranslation = translations && translations[i] ? translations[i] : ''
            const cleanedTranslation = rawTranslation.replace(/^[-–—]\s*/, '') // removes leading dash/space

            return (
              <li key={i} className={'mb2 flex flex-col'}>
                <div className="w-100 flex flex-column">
                  <div className={'translation-set flex justify-between w-100 items-center'}>
                    <DialogLine
                      line={line}
                      index={i}
                      useCloudTTS={useCloudTTS}
                      storeAudioOrLine={storeAudioOrLine}
                      className={i === lineNumber ? 'bg-brand white' : 'bg-transparent black'}
                      language={language}
                      debugLog={debugLog}
                      translation={showTranslations && hasTranslations ? cleanedTranslation : undefined}
                    />
                </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
