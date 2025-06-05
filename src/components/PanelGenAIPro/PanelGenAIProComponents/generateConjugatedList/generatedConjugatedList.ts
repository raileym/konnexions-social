import {
  pronouns,
  type VerbsLines,
  LANGUAGE,
  type Language
} from "../../../../../shared/types"

type GenerateConjugatedLinesProps = {
  verbsLines: VerbsLines
  inCompleteOnly?: boolean
  language: Language
}

export function generateConjugatedLines({
  verbsLines,
  inCompleteOnly = true,
  language
}: GenerateConjugatedLinesProps): string[] {
  const output: string[] = []
  let lineIndex = 1

  for (const line of verbsLines) {
    const parts = line.split('|')
    const conjugations = parts.slice(1)

    conjugations.forEach((conj, idx) => {
      // Skip vosotros/vosotras (index 4) in Latin American Spanish
      if (language === LANGUAGE.SPANISH && idx === 4) return

      const pronoun = pronouns[idx]
      if (inCompleteOnly) {
        output.push(`${lineIndex++}. ${pronoun} ${conj} ...`)
      } else {
        output.push(`${lineIndex++}. ${conj}. ${pronoun} ${conj}. `)
      }
    })
  }

  return output
}
