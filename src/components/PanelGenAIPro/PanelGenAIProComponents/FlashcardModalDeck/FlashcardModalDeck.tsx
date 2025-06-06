import React, { useState, useEffect } from "react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type FlashcardDeckProps = {
  fronts: string[]
  backs: string[]
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export const FlashcardModalDeck: React.FC<FlashcardDeckProps> = ({ fronts, backs }) => {
  const [cards, setCards] = useState<{ front: string; back: string }[]>([])
  const [index, setIndex] = useState(0)
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    const zipped = fronts.map((front, i) => ({ front, back: backs[i] }))
    setCards(shuffle(zipped))
  }, [fronts, backs])

  const nextCard = () => {
    setShowBack(false)
    setIndex((prev) => (prev + 1) % cards.length)
  }

  const prevCard = () => {
    setShowBack(false)
    setIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  const current = cards[index]

  if (!current) return <p>No cards to show.</p>

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-xl font-semibold">Flashcard {index + 1} of {cards.length}</div>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => setShowBack(true)}>Show Card</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md text-center">
          <div className="text-2xl font-medium mb-4">{showBack ? current.back : current.front}</div>
          <Button variant="outline" onClick={() => setShowBack((s) => !s)}>
            {showBack ? "Hide Back" : "Reveal Back"}
          </Button>
        </DialogContent>
      </Dialog>

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={prevCard}>Previous</Button>
        <Button onClick={nextCard}>Next</Button>
      </div>
    </div>
  )
}
