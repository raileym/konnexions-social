import type { Language, VerbsLines } from '@cknTypes/types'
import { generateConjugatedLines } from '../generateConjugatedLines/generatedConjugatedLines'
import { VERB_FORMATS } from '@cknTypes/constants'
// import { generateConjugatedLines } from '../generateConjugatedList/generatedConjugatedList'

type ConjugationListProps = {
  language: Language
  verbsLines: VerbsLines
}

export function ExpandedVerbListWithPronouns({ language, verbsLines }: ConjugationListProps) {
  const lines = generateConjugatedLines({ verbsLines, language, returnFormat: VERB_FORMATS.COMPLETE })

  return (
    <ul>
      {lines.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  )
}

export default ExpandedVerbListWithPronouns
