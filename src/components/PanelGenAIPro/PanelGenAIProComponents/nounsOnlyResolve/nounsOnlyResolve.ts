import type { Lines, ResolveProps, ResolveResult } from '@cknTypes/types'

export const nounsOnlyResolve = ({
  reviewLines,
  lines
}: ResolveProps): ResolveResult => {
  const linesResolved: Lines = []
  const linesResolutions: Lines = []

  const caiSet = new Set(lines.map(n => n.trim()))
  const reviewSet = new Set(reviewLines.map(n => n.trim()))

  console.log('caiSet', caiSet)
  console.log('reviewSet', reviewSet)

  if (
    reviewLines.length === 1 &&
    reviewLines[0].toLowerCase().includes('no corrections')
  ) {
    return {
      linesResolved: [...lines],
      linesResolutions: ['✅ No corrections found. Kept original lines.']
    }
  }

  // Accept all reviewed nouns (Claude’s list)
  for (const noun of reviewSet) {
    linesResolved.push(noun)
    if (caiSet.has(noun)) {
      linesResolutions.push(`✅ Confirmed: "${noun}" was present in original.`)
    } else {
      linesResolutions.push(`➕ Added: "${noun}" was not in CAI list.`)
    }
  }

  // Optionally note which CAI nouns were dropped
  for (const noun of caiSet) {
    if (!reviewSet.has(noun)) {
      linesResolutions.push(`➖ Removed: "${noun}" not confirmed by reviewer.`)
    }
  }

  return {
    linesResolved: linesResolved,
    linesResolutions: linesResolutions
  }
}
