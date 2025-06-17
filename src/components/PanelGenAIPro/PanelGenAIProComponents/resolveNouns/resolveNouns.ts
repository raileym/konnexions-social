import type { Lines } from '@cknTypes/types'

type ResolveNounsProps = {
  nounsLines: Lines
  nounsReviewLines: Lines
}

type ResolveNounsResult = {
  nounsLinesResolved: Lines
  nounsLinesResolutions: Lines
}

export function resolveNouns({
  nounsLines,
  nounsReviewLines
}: ResolveNounsProps): ResolveNounsResult {
  const nounsLinesResolved: Lines = []
  const nounsLinesResolutions: Lines = []

  const isNoCorrections =
    nounsReviewLines.length === 1 &&
    nounsReviewLines[0].toLowerCase().includes('no corrections')

  if (isNoCorrections) {
    return {
      nounsLinesResolved: [...nounsLines],
      nounsLinesResolutions: ['✅ No corrections found. Kept original nounsLines.']
    }
  }

  // Build a map keyed by singular noun
  const reviewMap = new Map<string, string>()
  for (const entry of nounsReviewLines) {
    const [gender, singular] = entry.split('|')
    if (gender && singular) {
      reviewMap.set(singular.trim(), entry.trim())
    }
  }

  for (const original of nounsLines) {
    const parts = original.split('|')
    if (parts.length !== 4) {
      nounsLinesResolved.push(original)
      nounsLinesResolutions.push(`⚠️ Malformed line: kept as-is -> '${original}'`)
      continue
    }

    const [originalGender, singular, plural, prepositions] = parts.map(part => part.trim())
    const reviewed = reviewMap.get(singular)

    if (!reviewed) {
      nounsLinesResolved.push(original)
      nounsLinesResolutions.push(`✅ No correction for: '${singular}'`)
    } else if (reviewed === original) {
      nounsLinesResolved.push(original)
      nounsLinesResolutions.push(`🔁 Same in review: kept original -> '${original}'`)
    } else {
      const [newGender, , newPlural, newPrepositions] = reviewed.split('|').map(part => part.trim())

      const resolvedLine = [
        newGender || originalGender,
        singular,
        newPlural || plural,
        newPrepositions || prepositions
      ].join('|')

      nounsLinesResolved.push(resolvedLine)
      nounsLinesResolutions.push(`✏️ Corrected: "${original}" → "${resolvedLine}"`)
    }
  }

  return {
    nounsLinesResolved,
    nounsLinesResolutions
  }
}
