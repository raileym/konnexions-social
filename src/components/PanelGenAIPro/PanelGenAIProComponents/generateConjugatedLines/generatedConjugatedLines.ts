import {
  type VerbsLines,
  type Language,
  pronounsUpperCase,
  type Lines,
  type VerbFormats
} from "@cknTypes/types"
import {
  LANGUAGE
} from '@cknTypes/constants'

type GenerateConjugatedLinesProps = {
  verbsLines: VerbsLines
  language: Language
  returnFormat: VerbFormats
  noIndex?: boolean
  noPeriod?: boolean
  noCap?: boolean
}

export function generateConjugatedLines({
  verbsLines,
  language,
  returnFormat,
  noIndex = false,
  noPeriod = false,
  noCap = false
}: GenerateConjugatedLinesProps): Lines {
  const output: Lines = []
  let lineIndex = 1

  for (const line of verbsLines) {
    const parts = line.split('|')
    const infinitive = parts[0]
    const conjugations = parts.slice(1)

    conjugations.forEach((conj, idx) => {
      // Skip vosotros/vosotras in Latin American Spanish
      if (language === LANGUAGE.SPANISH && idx === 4) return

      const pronounSet = pronounsUpperCase[idx]
      const conjUC = conj.charAt(0).toUpperCase() + conj.slice(1)
      const infinitiveUC = infinitive.charAt(0).toUpperCase() + infinitive.slice(1)

      pronounSet.forEach(pronoun => {
        let line: string

        switch (returnFormat) {
          case "infinitive":
            line = infinitiveUC
            break
          case "conjugation":
            line = noCap ? conj : conjUC
            break
          case "pronoun":
            line = pronoun
            break
          case "incomplete":
            line = `${pronoun} ${conj} ...`
            break
          case "complete":
            // Placeholders since actual complete lines come from CAI
            line = `${pronoun} ${conj} ___`
            break
          case "triple":
            line = `${conjUC}. ${pronoun} ${conj}. ${pronoun} ${conj} ___`
            break
          default:
            line = `${pronoun} ${conj}`
        }

        if (!noIndex) line = `${lineIndex++}. ${line}`
        output.push(`${line}${noPeriod ? '' : '.'}`)
      })
    })
  }

  return output
}
