import type { Lines } from '@cknTypes/types'

type ResolveNounsMissingResult = {
  nounsMissingLinesResolved: Lines
  nounsMissingLinesResolutions: Lines
}

type ResolveNounsMissingProps = {
  nounsMissingReviewLines: Lines
  nounsMissingLines: Lines
}

export function resolveNounsMissing({
  nounsMissingReviewLines,
  nounsMissingLines
}: ResolveNounsMissingProps): ResolveNounsMissingResult {
  const nounsMissingLinesResolved: Lines = []
  const nounsMissingLinesResolutions: Lines = []

  const isNoCorrections =
    nounsMissingReviewLines.length === 1 &&
    nounsMissingReviewLines[0].toLowerCase().includes('no corrections')

  if (isNoCorrections) {
    return {
      nounsMissingLinesResolved: [...nounsMissingLines],
      nounsMissingLinesResolutions: ['✅ No corrections found. Kept original nounsMissingLines.']
    }
  }

  const reviewMap = new Map<number, string>()

  for (const entry of nounsMissingReviewLines) {
    const match = entry.match(/^(\d+)\.\s*(.+)$/)
    if (!match) {
      nounsMissingLinesResolutions.push(`⚠️ Unrecognized format in review line: '${entry}'`)
      continue
    }

    const index = parseInt(match[1], 10) - 1
    const updatedLine = match[2].trim()

    if (!isNaN(index)) {
      reviewMap.set(index, updatedLine)
    }
  }

  for (let i = 0; i < nounsMissingLines.length; i++) {
    const original = nounsMissingLines[i].trim()
    const updated = reviewMap.get(i)

    if (!updated || updated === original) {
      nounsMissingLinesResolved.push(original)
      nounsMissingLinesResolutions.push(`✅ No correction for line ${i + 1}: '${original}'`)
    } else {
      nounsMissingLinesResolved.push(updated)
      nounsMissingLinesResolutions.push(`✏️ Line ${i + 1} corrected: '${original}' → '${updated}'`)
    }
  }

  return {
    nounsMissingLinesResolved,
    nounsMissingLinesResolutions
  }
}
