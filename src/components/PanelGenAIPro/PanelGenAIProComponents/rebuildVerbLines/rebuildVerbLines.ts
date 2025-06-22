import type { 
  Lines,
  RebuildVerbLinesProps
} from '@cknTypes/types'

export const rebuildVerbLines = ({
  verbsOnly,
  verbsMissing,
  verbByInfinitive
}: RebuildVerbLinesProps): Lines => {
  const lines: Lines = []

  // Create a quick lookup from verbsMissing for already existing lines
  const missingMap = new Map<string, string>()
  for (const line of verbsMissing) {
    const [, infinitive] = line.split('|')
    if (infinitive) {
      missingMap.set(infinitive, line)
    }
  }

  for (const infinitive of verbsOnly) {
    const existing = missingMap.get(infinitive)
    if (existing) {
      lines.push(existing)
      continue
    }

    const v = verbByInfinitive.get(infinitive)
    if (v) {
      lines.push(
        [
          v.verb_base,
          v.verb_infinitive,
          v.verb_yo,
          v.verb_tu,
          v.verb_el_ella_usted,
          v.verb_nosotros,
          v.verb_vosotros,
          v.verb_ellos_ellas_ustedes
        ].join('|')
      )
    }
  }

  return lines
}
