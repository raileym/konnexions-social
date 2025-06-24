import type { Lines, ResolveProps, ResolveResult } from '@cknTypes/types'

export const resolveNouns = ({
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

  // Build a map keyed by singular noun
  const reviewMap = new Map<string, string>()
  for (const entry of reviewLines) {
    const [gender, singular] = entry.split('|')
    if (gender && singular) {
      reviewMap.set(singular.trim(), entry.trim())
    }
  }

  for (const original of lines) {
    const parts = original.split('|')
    if (parts.length !== 4) {
      linesResolved.push(original)
      linesResolutions.push(`⚠️ Malformed line: kept as-is -> '${original}'`)
      continue
    }

    const [originalGender, singular, plural, prepositions] = parts.map(part => part.trim())
    const reviewed = reviewMap.get(singular)

    if (!reviewed) {
      linesResolved.push(original)
      linesResolutions.push(`✅ No correction for: '${singular}'`)
    } else if (reviewed === original) {
      linesResolved.push(original)
      linesResolutions.push(`🔁 Same in review: kept original -> '${original}'`)
    } else {
      const [newGender, , newPlural, newPrepositions] = reviewed.split('|').map(part => part.trim())

      const resolvedLine = [
        newGender || originalGender,
        singular,
        newPlural || plural,
        newPrepositions || prepositions
      ].join('|')

      linesResolved.push(resolvedLine)
      linesResolutions.push(`✏️ Corrected: "${original}" → "${resolvedLine}"`)
    }
  }

  return {
    linesResolved,
    linesResolutions
  }
}
