import type { Lines } from "@cknTypes/types"

export function zipVerbsExpandedWithComplete({
  expandedLines,
  completeLines
}: {
  expandedLines: Lines
  completeLines: Lines
}): Lines {
  const result: Lines = []

  const len = Math.min(expandedLines.length, completeLines.length)

  for (let i = 0; i < len; i++) {
    // Strip any leading line numbers from expanded line
    const expanded = expandedLines[i].replace(/^\s*\d+\.\s*/, '').trim()
    const complete = completeLines[i].replace(/^\s*\d+\.\s*/, '').trim()
    result.push(`${i + 1}. ${expanded} ${complete}`)
  }

  return result
}
