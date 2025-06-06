import {
  type VerbsLines,
  LANGUAGE,
  type Language,
  pronounsUpperCase
} from "../../../../../shared/types"

type GenerateConjugatedLinesProps = {
  verbsLines: VerbsLines
  inCompleteOnly?: boolean
  language: Language
  noIndex?: boolean
}

export function generateConjugatedLines({
  verbsLines,
  inCompleteOnly = true,
  language,
  noIndex = false
}: GenerateConjugatedLinesProps): string[] {
  const output: string[] = []
  let lineIndex = 1

  for (const line of verbsLines) {
    const parts = line.split('|')
    const conjugations = parts.slice(1)

    conjugations.forEach((conj, idx) => {
      // Skip vosotros/vosotras in Latin American Spanish
      if (language === LANGUAGE.SPANISH && idx === 4) return

      const pronounSet = pronounsUpperCase[idx]
      const conjUC = conj.charAt(0).toUpperCase() + conj.slice(1)

      pronounSet.forEach(pronoun => {
        const capitalizedLine = inCompleteOnly
          ? `${lineIndex}. ${pronoun} ${conj} ...`
          : `${lineIndex}. ${conjUC}. ${pronoun} ${conj}.`
        output.push(capitalizedLine)
        lineIndex++
      })
    })
  }

  return output
}

