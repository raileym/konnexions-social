import * as Dialog from "@radix-ui/react-dialog"
import { useState, useEffect, useCallback, useRef } from "react"

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
        <Dialog.Overlay className="fixed top-0 left-0 right-0 bottom-0 bg-black-60" style={{ zIndex: 99999 }} />
        <div className="flex flex-column items-center justify-center w-100">
          <Dialog.Content
            className="fixed top-50 left-50 transform translate--50--50 bg-white pa4 br3 shadow-5 w-90 w-60-m w-40-l"
            style={{
              zIndex: 999999,
              transform: "translate(-50%, -50%)"
            }}
          >
            <Dialog.Title className="f4 b mb3">
              Flashcard {current + 1} / {shuffled.length}
            </Dialog.Title>

            <Dialog.Description className="mb3 gray f6">
              Click the card to reveal the answer. Then press Next.
            </Dialog.Description>

            <div className="tc">
              <div
                className="ba b--gray pa4 br2 bg-light-yellow pointer"
                onClick={() => setShowBack(s => !s)}
                ref={cardRef}
                tabIndex={-1}
              >
                <span className="f3">
                  {showBack ? shuffled[current].back : shuffled[current].front}
                </span>
              </div>
              <button
                className="mt3 f6 link dim br2 ba ph3 pv2 dib bg-light-blue dark-blue"
                onClick={(e) => {
                  handleNext()
                  e.currentTarget.blur()
                }}
              >
                Next
              </button>
            </div>

            <Dialog.Close className="absolute top-1 right-1 f5 dim pointer bg-transparent bn dark-red">
              ×
            </Dialog.Close>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
