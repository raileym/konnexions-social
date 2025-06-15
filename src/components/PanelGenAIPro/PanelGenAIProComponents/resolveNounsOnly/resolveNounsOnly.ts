import type { Lines } from '@cknTypes/types'

type ResolveNounsOnlyProps = {
  nounsOnlyLines: Lines          // CAI’s original list
  nounsOnlyReviewLines: Lines    // Claude’s review
}

type ResolveNounsOnlyResult = {
  nounsOnlyLinesResolved: Lines      // Final accepted list (Claude's)
  nounsOnlyLinesResolutions: Lines   // Diagnostics explaining each decision
}

export function resolveNounsOnly({
  nounsOnlyLines,
  nounsOnlyReviewLines
}: ResolveNounsOnlyProps): ResolveNounsOnlyResult {
  const resolved: Lines = []
  const resolutions: Lines = []

  const caiSet = new Set(nounsOnlyLines.map(n => n.trim()))
  const reviewSet = new Set(nounsOnlyReviewLines.map(n => n.trim()))

  console.log('caiSet', caiSet)
  console.log('reviewSet', reviewSet)

  if (
    nounsOnlyReviewLines.length === 1 &&
    nounsOnlyReviewLines[0].toLowerCase().includes('no corrections')
  ) {
    return {
      nounsOnlyLinesResolved: [...nounsOnlyLines],
      nounsOnlyLinesResolutions: ['✅ No corrections found. Kept original nounsOnlyLines.']
    }
  }

  // Accept all reviewed nouns (Claude’s list)
  for (const noun of reviewSet) {
    resolved.push(noun)
    if (caiSet.has(noun)) {
      resolutions.push(`✅ Confirmed: "${noun}" was present in original.`)
    } else {
      resolutions.push(`➕ Added: "${noun}" was not in CAI list.`)
    }
  }

  // Optionally note which CAI nouns were dropped
  for (const noun of caiSet) {
    if (!reviewSet.has(noun)) {
      resolutions.push(`➖ Removed: "${noun}" not confirmed by reviewer.`)
    }
  }

  return {
    nounsOnlyLinesResolved: resolved,
    nounsOnlyLinesResolutions: resolutions
  }
}
