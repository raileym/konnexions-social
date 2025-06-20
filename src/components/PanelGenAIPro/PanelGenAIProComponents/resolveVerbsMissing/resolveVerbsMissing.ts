import type { Lines } from '@cknTypes/types'

type ResolveVerbsMissingResult = {
  verbsMissingLinesResolved: Lines
  verbsMissingLinesResolutions: Lines
}

type ResolveVerbsMissingProps = {
  verbsMissingReviewLines: Lines
  verbsMissingLines: Lines
}

export function resolveVerbsMissing({
  verbsMissingReviewLines,
  verbsMissingLines
}: ResolveVerbsMissingProps): ResolveVerbsMissingResult {
  const verbsMissingLinesResolved: Lines = []
  const verbsMissingLinesResolutions: Lines = []

  const isNoCorrections =
    verbsMissingReviewLines.length === 1 &&
    verbsMissingReviewLines[0].toLowerCase().includes('no corrections')

  if (isNoCorrections) {
    return {
      verbsMissingLinesResolved: [...verbsMissingLines],
      verbsMissingLinesResolutions: ['✅ No corrections found. Kept original verbsMissingLines.']
    }
  }

  const reviewMap = new Map<number, string>()

  for (const entry of verbsMissingReviewLines) {
    const match = entry.match(/^(\d+)\.\s*(.+)$/)
    if (!match) {
      verbsMissingLinesResolutions.push(`⚠️ Unrecognized format in review line: '${entry}'`)
      continue
    }

    const index = parseInt(match[1], 10) - 1
    const updatedLine = match[2].trim()

    if (!isNaN(index)) {
      reviewMap.set(index, updatedLine)
    }
  }

  for (let i = 0; i < verbsMissingLines.length; i++) {
    const original = verbsMissingLines[i].trim()
    const updated = reviewMap.get(i)

    if (!updated || updated === original) {
      verbsMissingLinesResolved.push(original)
      verbsMissingLinesResolutions.push(`✅ No correction for line ${i + 1}: '${original}'`)
    } else {
      verbsMissingLinesResolved.push(updated)
      verbsMissingLinesResolutions.push(`✏️ Line ${i + 1} corrected: '${original}' → '${updated}'`)
    }
  }

  return {
    verbsMissingLinesResolved,
    verbsMissingLinesResolutions
  }
}
