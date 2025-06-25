import type {
  ResolveProps,
  ResolveResult,
  Lines
} from '@cknTypes/types'
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview'

export const resolveDialog = ({
  reviewLines,
  draftLines
}: ResolveProps): ResolveResult => {
  const linesResolved: Lines = []
  const linesResolutions: Lines = []

  const formattedOriginalLines = formatDialogLinesForReview(draftLines)

  const isNoCorrections =
    reviewLines.length === 1 &&
    reviewLines[0].toLowerCase().includes('no corrections')

  if (isNoCorrections) {
    return {
      linesResolved: [...draftLines],
      linesResolutions: ['✅ No corrections found. Kept original draftLines.']
    }
  }

  // Build a Map<number, string> for review draftLines
  const reviewMap = new Map<number, string>()

  for (const entry of reviewLines) {
    const match = entry.match(/^(\d+)\.\s*(.+)$/)
    if (!match) {
      linesResolutions.push(`⚠️ Unrecognized format in review line: '${entry}'`)
      continue
    }

    const lineIndex = parseInt(match[1], 10) - 1 // zero-based index
    const updatedText = match[2].trim()
    if (!isNaN(lineIndex)) {
      reviewMap.set(lineIndex, updatedText)
    }
  }

  for (let i = 0; i < draftLines.length; i++) {
    const originalLine = draftLines[i]
    const parts = originalLine.split('|')
    if (parts.length < 3) {
      linesResolved.push(originalLine)
      linesResolutions.push(`⚠️ Malformed line (expected 3 parts): '${originalLine}'`)
      continue
    }

    const [gender, participant, sentence] = parts
    const formattedOriginal = formattedOriginalLines[i]?.replace(/^\d+\.\s*/, '') || ''
    const updatedSentence = reviewMap.get(i)

    if (!updatedSentence || updatedSentence === formattedOriginal) {
      linesResolved.push(originalLine)
      linesResolutions.push(`✅ No correction for line ${i + 1}: '${sentence.trim()}'`)
    } else {
      linesResolved.push(`${gender}|${participant}|${updatedSentence}`)
      linesResolutions.push(`✏️ Line ${i + 1} corrected: '${sentence.trim()}' → '${updatedSentence}'`)
    }
  }

  return {
    linesResolved,
    linesResolutions
  }
}
