import type { Lines, ResolveProps, ResolveResult } from '@cknTypes/types'

export const nounsMissingResolve = ({
  reviewLines,
  lines
}: ResolveProps): ResolveResult => {
  const linesResolved: Lines = []
  const linesResolutions: Lines = []

  const isNoCorrections =
    reviewLines.length === 1 &&
    reviewLines[0].toLowerCase().includes('no corrections')

  if (isNoCorrections) {
    return {
      linesResolved: [...lines],
      linesResolutions: ['✅ No corrections found. Kept original lines.']
    }
  }

  const reviewMap = new Map<number, string>()

  for (const entry of reviewLines) {
    const match = entry.match(/^(\d+)\.\s*(.+)$/)
    if (!match) {
      linesResolutions.push(`⚠️ Unrecognized format in review line: '${entry}'`)
      continue
    }

    const index = parseInt(match[1], 10) - 1
    const updatedLine = match[2].trim()

    if (!isNaN(index)) {
      reviewMap.set(index, updatedLine)
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const original = lines[i].trim()
    const updated = reviewMap.get(i)

    if (!updated || updated === original) {
      linesResolved.push(original)
      linesResolutions.push(`✅ No correction for line ${i + 1}: '${original}'`)
    } else {
      linesResolved.push(updated)
      linesResolutions.push(`✏️ Line ${i + 1} corrected: '${original}' → '${updated}'`)
    }
  }

  return {
    linesResolved,
    linesResolutions
  }
}
