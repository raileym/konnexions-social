// Helper function to parse and decorate a sentence

import type { FormatSentenceProps } from '@cknTypes/types'

export const FormatSentence = ({sentence}: FormatSentenceProps) => {
  // Check for indent (leading dash)
  const isIndented = sentence.trim().startsWith('-')

  // Split by '**' to find bold segments, e.g. "This is **bold** text"
  const parts = sentence.split(/(\*\*.*?\*\*)/g)

  return (
    <div style={{ paddingLeft: isIndented ? '1.5em' : 0 }}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // Remove the ** and make bold
          const boldText = part.slice(2, -2)
          return <strong key={i}>{boldText}</strong>
        }
        return part
      })}
    </div>
  )
}
