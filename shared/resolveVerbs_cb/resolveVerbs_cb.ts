import { FIELD_COUNT, MODULE_NAME } from '../cknTypes/constants.js'
import type { Lines, ResolveProps, ResolveResult } from '../cknTypes/types.js'

export const resolveVerbs = ({
  reviewLines,
  draftLines,
}: ResolveProps): ResolveResult => {
  const linesResolved: Lines = []
  const linesResolutions: Lines = []

  const isNoCorrections =
    reviewLines.length === 1 &&
    reviewLines[0].toLowerCase().includes('no corrections')

  if (isNoCorrections) {
    return {
      linesResolved: [...draftLines],
      linesResolutions: ['✅ No corrections found. Kept original draftLines.']
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

  for (const original of draftLines) {
    const parts = original.split('|').map(s => s.trim())
    if (parts.length !== FIELD_COUNT[MODULE_NAME.VERBS_DRAFT]) {
      linesResolved.push(original)
      linesResolutions.push(`⚠️ Malformed line: expected 8 fields, got ${parts.length} -> '${original}'`)
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
