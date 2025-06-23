import type { Lines, RebuildVerbLinesProps, VerbDetails } from '@cknTypes/types'

export const rebuildVerbLines = ({
  verbsOnly,
  verbsMissing,
  scenarioData
}: RebuildVerbLinesProps): Lines => {
  const lines: Lines = []

  // Map from verbInfinitive to full line in verbsMissing
  const missingMap = new Map<string, string>()
  for (const line of verbsMissing) {
    const parts = line.split('|')
    const infinitive = parts[1]
    if (infinitive) missingMap.set(infinitive, line)
  }

  const searchMaps = [
    scenarioData.verbByInfinitive,
    scenarioData.verbBy1stPersonSingular,
    scenarioData.verbBy2ndPersonSingular,
    scenarioData.verbBy3rdPersonSingular,
    scenarioData.verbBy1stPersonPlural,
    scenarioData.verbBy2ndPersonPlural,
    scenarioData.verbBy3rdPersonPlural
  ]

  const seen = new Set<string>()

  for (const verbForm of verbsOnly) {
    if (seen.has(verbForm)) continue

    // Try scenarioData first
    let details: VerbDetails | undefined
    for (const map of searchMaps) {
      details = map.get(verbForm)
      if (details) break
    }

    if (details) {
      const existing = missingMap.get(details.verb_infinitive)
      if (existing) {
        lines.push(existing)
      } else {
        lines.push(
          [
            details.verb_base,
            details.verb_infinitive,
            details.verb_yo,
            details.verb_tu,
            details.verb_el_ella_usted,
            details.verb_nosotros,
            details.verb_vosotros,
            details.verb_ellos_ellas_ustedes
          ].join('|')
        )
      }
      seen.add(details.verb_infinitive)
      continue
    }

    // Fallback: try matching against any conjugation in verbsMissing
    for (const line of verbsMissing) {
      const parts = line.split('|')
      const [, infinitive, ...conjugations] = parts
      if (conjugations.includes(verbForm)) {
        lines.push(line)
        seen.add(infinitive)
        break
      }
    }
  }

  return lines
}
