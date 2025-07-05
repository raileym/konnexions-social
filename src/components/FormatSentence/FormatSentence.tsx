import React from 'react'
import type { FormatSentenceProps } from '@cknTypes/types'

export const FormatSentence = ({ sentence }: FormatSentenceProps) => {
  const trimmed = sentence.trim()

  // Determine heading level by checking leading # characters
  let HeadingTag: React.ElementType | null = null
  let content = trimmed
  if (trimmed.startsWith('### ')) {
    HeadingTag = 'h3'
    content = trimmed.slice(4)
  } else if (trimmed.startsWith('## ')) {
    HeadingTag = 'h2'
    content = trimmed.slice(3)
  } else if (trimmed.startsWith('# ')) {
    HeadingTag = 'h1'
    content = trimmed.slice(2)
  }

  // Detect if it is an indented line starting with dash
  // const isDashed = content.startsWith('-')
  const isDashed = /^(-)/.test(content)
  const isOrdered = /^(\d+\.)/.test(content)

  // Remove the leading dash for list item, if any
  let processedContent = content
  if (isDashed) {
    processedContent = content.slice(1).trim()
  }

  // Helper: parse bold (**text**) and italic (*text*) with a regex
  // Replace **bold** with <strong> and *italic* with <em>
  // We split by these markers and map accordingly

  // Regex explanation:
  // (\*\*.*?\*\*) matches bold **text**
  // | (\*.*?\*) matches italic *text*
  const parts = processedContent.split(/(\*\*.*?\*\*|\*.*?\*)/g).filter(Boolean)

  const parsed = parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>
    }
    return part
  })

  // If this is a heading, return the heading tag wrapping parsed content
  if (HeadingTag) {
    return <HeadingTag>{parsed}</HeadingTag>
  }

  // Otherwise, return a div with bullet if indented or just content
  return (
    <div style={{ paddingLeft: (isDashed||isOrdered) ? '1.5em' : 0 }}>
      {
        isDashed ? <><div className="baX flex items-center h1"><span className="f2" style={{ marginLeft: '-0.1em' }}>&bull;</span>&nbsp;{parsed}</div></> : 
        isOrdered ? <><div className="baX flex items-center h1">{parsed}</div></> : parsed
      }
    </div>
  )
}
