import type { Lines } from '@cknTypes/types'

type ResolveVerbsOnlyProps = {
  verbsOnlyLines: Lines          // CAI’s original list
  verbsOnlyReviewLines: Lines    // Claude’s review
}

type ResolveVerbsOnlyResult = {
  verbsOnlyLinesResolved: Lines      // Final accepted list (Claude's)
  verbsOnlyLinesResolutions: Lines   // Diagnostics explaining each decision
}

export function resolveVerbsOnly({
  verbsOnlyLines,
  verbsOnlyReviewLines
}: ResolveVerbsOnlyProps): ResolveVerbsOnlyResult {
  const resolved: Lines = []
  const resolutions: Lines = []

  const caiSet = new Set(verbsOnlyLines.map(v => v.trim()))
  const reviewSet = new Set(verbsOnlyReviewLines.map(v => v.trim()))

  console.log('caiSet', caiSet)
  console.log('reviewSet', reviewSet)

  if (
    verbsOnlyReviewLines.length === 1 &&
    verbsOnlyReviewLines[0].toLowerCase().includes('no corrections')
  ) {
    return {
      verbsOnlyLinesResolved: [...verbsOnlyLines],
      verbsOnlyLinesResolutions: ['✅ No corrections found. Kept original verbsOnlyLines.']
    }
  }

  // Accept all reviewed verbs (Claude’s list)
  for (const verb of reviewSet) {
    resolved.push(verb)
    if (caiSet.has(verb)) {
      resolutions.push(`✅ Confirmed: "${verb}" was present in original.`)
    } else {
      resolutions.push(`➕ Added: "${verb}" was not in CAI list.`)
    }
  }

  // Optionally note which CAI verbs were dropped
  for (const verb of caiSet) {
    if (!reviewSet.has(verb)) {
      resolutions.push(`➖ Removed: "${verb}" not confirmed by reviewer.`)
    }
  }

  return {
    verbsOnlyLinesResolved: resolved,
    verbsOnlyLinesResolutions: resolutions
  }
}
