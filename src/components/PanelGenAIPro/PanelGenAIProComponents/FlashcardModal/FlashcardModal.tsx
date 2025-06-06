import * as Dialog from "@radix-ui/react-dialog"
import { useState, useEffect, useCallback, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faLessThan, faTimes } from '@fortawesome/free-solid-svg-icons'   

type FlashcardProps = {
  fronts: string[]
  backs: string[]
}

export function FlashcardModal({ fronts, backs }: FlashcardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const [shuffled] = useState(() =>
    fronts.map((front, i) => ({ front, back: backs[i] }))
      .sort(() => Math.random() - 0.5)
  )
  const [current, setCurrent] = useState(0)
  const [showBack, setShowBack] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleNext = useCallback(() => {
    setCurrent((c) => (c + 1) % shuffled.length)
    setShowBack(false)

    requestAnimationFrame(() => {
      cardRef.current?.focus()
    })
  }, [shuffled.length])

  const handlePrev = useCallback(() => {
    setCurrent((c) => (c - 1 + shuffled.length) % shuffled.length)
    setShowBack(false)

    requestAnimationFrame(() => {
      cardRef.current?.focus()
    })
  }, [shuffled.length])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      handleNext()
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      setCurrent((c) => (c - 1 + shuffled.length) % shuffled.length)
      setShowBack(false)
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault()
      setShowBack((s) => !s)
    }
  }, [handleNext, shuffled.length])


  useEffect(() => {
    if (!isOpen) return

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button>Open Flashcard</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 left-0 right-0 bottom-0 bg-black-50" style={{ zIndex: 99999 }} />
          <Dialog.Content
            className="ba bw4X b--redX fixed top-1/2 left-1/2 transform bg-white pa4 br3 shadow-5 w-60 w-60-m w-60-l"
            style={{
              zIndex: 999999,
              transform: "translate(-50%, -50%)",
              // top: '50%',
              // left: '50%'
            }}
          >
            <Dialog.Title className="f4 b mb0 baX mt0 pt0">
              Flashcard {current + 1} / {shuffled.length}
            </Dialog.Title>

            <Dialog.Description className="baX mb5 gray f6">
                Use the left ( <FontAwesomeIcon icon={faLessThan} /> ) or 
                right ( <FontAwesomeIcon icon={faGreaterThan} /> ) arrow keys 
                to navigate between cards. Press the space bar to reveal the back of the card.
            </Dialog.Description>

            <div className="tc">
              <div
                className="no-focus-outline baX bn b--grayX pa4 pb5 br2X bg-light-yellowX pointer"
                onClick={() => setShowBack(s => !s)}
                ref={cardRef}
                tabIndex={-1}
                style={{
                    width: "100%",
                    height: "8rem", // adjust this as needed
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem",
                    textAlign: "center"
                  }}                
              >
                <span className="f1">
                  {showBack ? shuffled[current].back : shuffled[current].front}
                </span>
              </div>
              <div className="baX mt5 flex justify-between items-center">
                <button
                  className="mt3X f3 link dim ph3 pv1X dib black bg-transparent bn"
                  onClick={(e) => {
                    handlePrev()
                    e.currentTarget.blur()
                  }}
                >
                  <FontAwesomeIcon icon={faLessThan} />
                </button>
                <div>tap space bar (flip) </div>
                <button
                  className="mt3X f3 link dim ph3 pv0 dib black bg-transparent bn"
                  onClick={(e) => {
                    handleNext()
                    e.currentTarget.blur()
                  }}
                >
                  <FontAwesomeIcon icon={faGreaterThan} />
                </button>
              </div>
            </div>

            <Dialog.Close className="absolute top-1 right-1 f3 dim pointer bg-transparent bn dark-red">
              <FontAwesomeIcon icon={faTimes} />
            </Dialog.Close>
          </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
