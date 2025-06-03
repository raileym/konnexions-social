import { useState } from "react"
import { DialogLine } from "../DialogLine/DialogLine"

export function DialogList({ lines }: { lines: string[] }) {
  const [audioUrls, setAudioUrls] = useState<string[]>([])

  const storeAudioUrl = (index: number, url: string) => {
    setAudioUrls(prev => {
      const updated = [...prev]
      updated[index] = url
      return updated
    })
  }

  const playAll = () => {
    const audio = new Audio()
    let i = 0

    const playNext = () => {
      if (i < audioUrls.length && audioUrls[i]) {
        audio.src = audioUrls[i]
        audio.onended = () => {
          i += 1
          playNext()
        }
        audio.play()
      }
    }

    playNext()
  }

  return (
    <div>
      <ul>
        {lines.map((line, i) => (
          <DialogLine
            key={i}
            line={line}
            index={i}
            storeAudioUrl={storeAudioUrl}
          />
        ))}
      </ul>
      <button onClick={playAll} disabled={audioUrls.length === 0}>
        ▶️ Play All
      </button>
    </div>
  )
}
