import type { Lines, RebuildNounLinesProps } from '@cknTypes/types'

export const rebuildNounLines = ({
  nounsOnly,
  nounsMissing,
  nounBySingular
}: RebuildNounLinesProps): Lines => {
  const lines: Lines = []

  // Index existing lines by singular noun
  const missingMap = new Map<string, string>()
  for (const line of nounsMissing) {
    const [, singular] = line.split('|')
    if (singular) {
      missingMap.set(singular, line)
    }
  }

  for (const singular of nounsOnly) {
    const existing = missingMap.get(singular)
    if (existing) {
      lines.push(existing)
      continue
    }

    const n = nounBySingular.get(singular)
    if (n) {
      lines.push(
        [n.noun_base, n.noun_singular, n.noun_plural, n.noun_gender].join('|')
      )
    }
  }

  return lines
}
