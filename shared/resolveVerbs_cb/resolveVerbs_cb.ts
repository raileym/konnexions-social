import type { Lines, ResolveProps, ResolveResult } from '@cknTypes/types'

export const resolveVerbs = ({
  reviewLines,
  lines,
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

  // Build a review map keyed by infinitive
  const reviewMap = new Map<string, string>()
  for (const entry of reviewLines) {
    const [infinitive] = entry.split('|').map(s => s.trim())
    if (infinitive) {
      reviewMap.set(infinitive, entry.trim())
    }
  }

  for (const original of lines) {
    const parts = original.split('|').map(s => s.trim())
    if (parts.length !== 7) {
      linesResolved.push(original)
      linesResolutions.push(`⚠️ Malformed line: kept as-is -> '${original}'`)
      continue
    }

    const [infinitive] = parts
    // const [infinitive, ...originalConjugations] = parts
    const reviewed = reviewMap.get(infinitive)

    if (!reviewed) {
      linesResolved.push(original)
      linesResolutions.push(`✅ No correction for: '${infinitive}'`)
    } else if (reviewed === original) {
      linesResolved.push(original)
      linesResolutions.push(`🔁 Same in review: kept original -> '${original}'`)
    } else {
      const reviewedParts = reviewed.split('|').map(s => s.trim())
      if (reviewedParts.length !== 7) {
        linesResolved.push(original)
        linesResolutions.push(`⚠️ Malformed review line: kept original -> '${original}'`)
        continue
      }

      const resolvedLine = reviewedParts.join('|')
      linesResolved.push(resolvedLine)
      linesResolutions.push(`✏️ Corrected: "${original}" → "${resolvedLine}"`)
    }
  }

  return {
    linesResolved,
    linesResolutions
  }
}
