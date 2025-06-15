import type { Lines } from '../../../../../shared/cknTypes/types/types'

type ResolveVerbsProps = {
  verbsLines: Lines
  verbsReviewLines: Lines
}

type ResolveVerbsResult = {
  verbsLinesResolved: Lines
  verbsLinesResolutions: Lines
}

export function resolveVerbs({
  verbsLines,
  verbsReviewLines
}: ResolveVerbsProps): ResolveVerbsResult {
  const verbsLinesResolved: Lines = []
  const verbsLinesResolutions: Lines = []

  const isNoCorrections =
    verbsReviewLines.length === 1 &&
    verbsReviewLines[0].toLowerCase().includes("no corrections")

  if (isNoCorrections) {
    return {
      verbsLinesResolved: [...verbsLines],
      verbsLinesResolutions: ["✅ No corrections found. Kept original verbsLines."]
    }
  }

  // Build a review map keyed by infinitive
  const reviewMap = new Map<string, string>()
  for (const entry of verbsReviewLines) {
    const [infinitive] = entry.split("|").map(s => s.trim())
    if (infinitive) {
      reviewMap.set(infinitive, entry.trim())
    }
  }

  for (const original of verbsLines) {
    const parts = original.split("|").map(s => s.trim())
    if (parts.length !== 7) {
      verbsLinesResolved.push(original)
      verbsLinesResolutions.push(`⚠️ Malformed line: kept as-is -> "${original}"`)
      continue
    }

    const [infinitive] = parts
    // const [infinitive, ...originalConjugations] = parts
    const reviewed = reviewMap.get(infinitive)

    if (!reviewed) {
      verbsLinesResolved.push(original)
      verbsLinesResolutions.push(`✅ No correction for: "${infinitive}"`)
    } else if (reviewed === original) {
      verbsLinesResolved.push(original)
      verbsLinesResolutions.push(`🔁 Same in review: kept original -> "${original}"`)
    } else {
      const reviewedParts = reviewed.split("|").map(s => s.trim())
      if (reviewedParts.length !== 7) {
        verbsLinesResolved.push(original)
        verbsLinesResolutions.push(`⚠️ Malformed review line: kept original -> "${original}"`)
        continue
      }

      const resolvedLine = reviewedParts.join("|")
      verbsLinesResolved.push(resolvedLine)
      verbsLinesResolutions.push(`✏️ Corrected: "${original}" → "${resolvedLine}"`)
    }
  }

  return {
    verbsLinesResolved,
    verbsLinesResolutions
  }
}
