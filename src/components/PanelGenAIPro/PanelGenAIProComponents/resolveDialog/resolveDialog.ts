import type { Lines } from "../../../../../shared/cknTypes/types/types"

type ResolveDialogResult = {
  dialogLinesResolved: Lines
  dialogLinesResolutions: Lines
}

type ResolveDialogProps = {
  dialogReviewLines: Lines,
  dialogLines: Lines
}

export function resolveDialog({
  dialogReviewLines,
  dialogLines
}: ResolveDialogProps): ResolveDialogResult {
  const dialogLinesResolved: string[] = []
  const dialogLinesResolutions: string[] = []

  const isNoCorrections =
    dialogReviewLines.length === 1 &&
    dialogReviewLines[0].toLowerCase().includes('no corrections')

  if (isNoCorrections) {
    return {
      dialogLinesResolved: [...dialogLines],
      dialogLinesResolutions: ['✅ No corrections found. Kept original dialogLines.']
    }
  }

  // Build a Map<number, string> for review lines
  const reviewMap = new Map<number, string>()

  for (const entry of dialogReviewLines) {
    const match = entry.match(/^(\d+)\.\s*(.+)$/)
    if (!match) {
      dialogLinesResolutions.push(`⚠️ Unrecognized format in review line: "${entry}"`)
      continue
    }

    const lineIndex = parseInt(match[1], 10) - 1 // zero-based index
    const updatedText = match[2].trim()
    if (!isNaN(lineIndex)) {
      reviewMap.set(lineIndex, updatedText)
    }
  }

  for (let i = 0; i < dialogLines.length; i++) {
    const originalLine = dialogLines[i]
    const parts = originalLine.split('|')
    if (parts.length < 3) {
      dialogLinesResolved.push(originalLine)
      dialogLinesResolutions.push(`⚠️ Malformed line (expected 3 parts): "${originalLine}"`)
      continue
    }

    const [gender, participant, sentence] = parts
    const updatedSentence = reviewMap.get(i)

    if (!updatedSentence) {
      dialogLinesResolved.push(originalLine)
      dialogLinesResolutions.push(`✅ No correction for line ${i + 1}: "${sentence.trim()}"`)
    } else {
      dialogLinesResolved.push(`${gender}|${participant}|${updatedSentence}`)
      dialogLinesResolutions.push(`✏️ Line ${i + 1} corrected: "${sentence.trim()}" → "${updatedSentence}"`)
    }
  }

  return {
    dialogLinesResolved,
    dialogLinesResolutions
  }
}

