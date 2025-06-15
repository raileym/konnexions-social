import type { Language, VerbsLines } from "../../../../../shared/cknTypes/types/types"
import { generateConjugatedLines } from "../generateConjugatedList/generatedConjugatedList"

type ConjugationListProps = {
  language: Language
  verbsLines: VerbsLines
}

export function ExpandedVerbListWithPronouns({ language, verbsLines }: ConjugationListProps) {
  const lines = generateConjugatedLines({ verbsLines, inCompleteOnly: false, language })

  return (
    <ul>
      {lines.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  )
}

export default ExpandedVerbListWithPronouns
