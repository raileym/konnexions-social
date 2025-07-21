import * as Dialog from '@radix-ui/react-dialog'
import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGreaterThan,
  faLessThan,
  faTimes,
  faVolumeXmark,
  faVolumeHigh
} from '@fortawesome/free-solid-svg-icons'
import { useTTS } from '../useTTS/useTTS'
import { useAppContext } from '@context/AppContext/AppContext'
import { GENDER } from '@cknTypes/constants'
import type { DebugLog } from '@cknTypes/types'

type FlashcardProps = {
  fronts: string[]
  backs: string[]
  useCloudTTS: boolean
  buttonClassName?: string
  title?: string | ReactNode
  debugLog: DebugLog
}

export function FlashcardModal({
  fronts,
  backs,
  useCloudTTS,
  title = '',
  buttonClassName = '',
  debugLog
}: FlashcardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const { cutoff,
    maxCount,
    setMaxCount,
    targetLanguage
  } = useAppContext()
  
  const [shuffled] = useState(() =>
    fronts.map((front, i) => ({ front, back: backs[i] }))
      .sort(() => Math.random() - 0.5)
  )
  const [current, setCurrent] = useState(0)
  const [showBack, setShowBack] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [soundEnabled, setSoundEnabled] = useState(false)

  const currentText = showBack ? shuffled[current].back : shuffled[current].front
  const { speak, stop } = useTTS({
    useCloudTTS,
    maxCount,
    setMaxCount,
    cutoff,
    // store: storeAudioOrLine,
    language: targetLanguage,
    debugLog
  })

  // const { speak, stop } = useTTS({
  //   text: currentText,
  //   gender,
  //   index,
  //   useCloudTTS,
  //   cutoff,
  //   maxCount,
  //   setMaxCount,
  //   language: targetLanguage
  // })

  const handleNext = useCallback(() => {
    stop()
    setCurrent((c) => (c + 1) % shuffled.length)
    setShowBack(false)
    requestAnimationFrame(() => {
      cardRef.current?.focus()
    })
  }, [shuffled.length, stop])

  const handlePrev = useCallback(() => {
    stop()
    setCurrent((c) => (c - 1 + shuffled.length) % shuffled.length)
    setShowBack(false)
    requestAnimationFrame(() => {
      cardRef.current?.focus()
    })
  }, [shuffled.length, stop])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    stop()
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      handleNext()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      handlePrev()
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      setShowBack((s) => !s)
    }
  }, [handleNext, handlePrev, stop])

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    if (soundEnabled) {
      speak({
        text: currentText,
        speaker: 'unknown',
        gender: GENDER.M,
      })
    }
  }, [current, currentText, showBack, speak, soundEnabled])

  return (
    <Dialog.Root 
      open={isOpen}
      onOpenChange={(open) => {
        setSoundEnabled(open) // instant toggle
        setIsOpen(open)
      }}
    >
      <Dialog.Trigger asChild>
        <button className={`bg-brand pa2 mh3X background ${buttonClassName}`}>{title || 'Open Flashcard'}</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed top-0 left-0 right-0 bottom-0 bg-background-50' style={{ zIndex: 99999 }} />
        <Dialog.Content
          className='fixed top-1/2 left-1/2 bg-on-background pa4 br3 shadow-5 w-60 w-60-m w-40-l no-focus-outline'
          style={{ zIndex: 999999, transform: 'translate(-50%, -50%)' }}
        >
          <Dialog.Title className='f4 b mb0 mt0 pt0'>Flashcard {current + 1} / {shuffled.length}</Dialog.Title>

          <Dialog.Description className='mb4 gray f6'>
            Use the left (<FontAwesomeIcon icon={faLessThan} />) or right (<FontAwesomeIcon icon={faGreaterThan} />)
            arrow keys to navigate between cards. Press the space bar to reveal the back of the card.
          </Dialog.Description>

          <div className='tc'>
            <div
              className='pa4 pointer no-focus-outline mv5'
              onClick={() => setShowBack(s => !s)}
              ref={cardRef}
              tabIndex={-1}
              style={{
                width: '100%',
                height: '8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                textAlign: 'center'
              }}
            >
              <span className='f1'>{currentText}</span>
            </div>

            <div className='ba mt4 flex justify-between items-center'>
              <button className='f3 link dim ph3 pv1 bn bg-transparent' onClick={handlePrev}>
                <FontAwesomeIcon icon={faLessThan} />
              </button>
              <div className='mt2X gray f6'>tap space bar (flip)</div>
              <button className='f3 link dim ph3 pv1 bn bg-transparent' onClick={handleNext}>
                <FontAwesomeIcon icon={faGreaterThan} />
              </button>
            </div>
          </div>

          <div className='absolute top-1 right-1 flex items-center gap-2'>
            <button
              className='f4 dim pointer bg-transparent bn dark-gray mr4'
              onClick={() => setSoundEnabled(prev => !prev)}
              aria-label='Toggle sound'
            >
              <FontAwesomeIcon icon={soundEnabled ? faVolumeHigh : faVolumeXmark} />
            </button>
            <Dialog.Close className='f4 dim pointer bg-transparent bn dark-red'>
              <FontAwesomeIcon icon={faTimes} />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
