import { FIELD_COUNT, MODULE_NAME } from '@cknTypes/constants'
import type {
  ResolveProps,
  ResolveResult,
  Lines
} from '@cknTypes/types'

export const resolveTranslation = ({
  reviewLines,
  draftLines
}: ResolveProps): ResolveResult => {
  const linesResolved: Lines = []
  const linesResolutions: Lines = []

  const isNoCorrections =
    reviewLines.length === 1 &&
    reviewLines[0].toLowerCase().includes('no corrections')

  if (isNoCorrections) {
    return {
      linesResolved: [...draftLines],
      linesResolutions: ['✅ No corrections found. Kept original draftLines.']
    }
  }

  // Parse review lines into Map<index, updatedSentence>
  const reviewMap = new Map<number, string>()
  for (const entry of reviewLines) {
    const match = entry.match(/^(\d+)\.\s*(.+)$/)
    if (!match) {
      linesResolutions.push(`⚠️ Unrecognized format in review line: '${entry}'`)
      continue
    }
    const lineIndex = parseInt(match[1], 10) - 1 // zero-based index
    const updatedText = match[2].trim()
    reviewMap.set(lineIndex, updatedText)
  }

  draftLines.forEach((original, index) => {
    const parts = original.split('|')

    if (parts.length !== FIELD_COUNT[MODULE_NAME.TRANSLATION_DRAFT]) {
      linesResolved.push(original)
      linesResolutions.push(`⚠️ Malformed line: kept as-is -> '${original}'`)
      return
    }

    const [originalSentence] = parts
    if (!reviewMap.has(index)) {
      linesResolved.push(original)
      linesResolutions.push(`✅ No review line for ${index + 1}: kept original`)
      return
    }

    const updatedSentence = reviewMap.get(index)!
    if (updatedSentence === originalSentence.trim()) {
      linesResolved.push(original)
      linesResolutions.push(`🔁 Line ${index + 1} unchanged: '${originalSentence.trim()}'`)
    } else {
      linesResolved.push(updatedSentence)
      linesResolutions.push(`✏️ Line ${index + 1} corrected: '${originalSentence.trim()}' → '${updatedSentence}'`)
    }
  })

  return {
    linesResolved,
    linesResolutions
  }
}
