import type { Lines } from "../../../../shared/types"

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

  // Build a lookup map for review corrections
  const reviewMap = new Map<string, string>()
  for (const entry of dialogReviewLines) {
    const [original, updated] = entry.split('|')
    if (original && updated) {
      reviewMap.set(original.trim(), updated.trim())
    }
  }

  for (const line of dialogLines) {
    const [speaker, sentence] = line.split('|')
    const trimmedSentence = sentence?.trim() ?? ''

    if (!speaker || !trimmedSentence) {
      dialogLinesResolved.push(line)
      dialogLinesResolutions.push(`⚠️ Malformed line: kept as-is -> "${line}"`)
      continue
    }

    const reviewed = reviewMap.get(trimmedSentence)

    if (!reviewed) {
      dialogLinesResolved.push(line)
      dialogLinesResolutions.push(`✅ No correction for: "${trimmedSentence}"`)
    } else if (reviewed === trimmedSentence) {
      dialogLinesResolved.push(line)
      dialogLinesResolutions.push(`🔁 Same in review: kept original -> "${trimmedSentence}"`)
    } else {
      dialogLinesResolved.push(`${speaker}|${reviewed}`)
      dialogLinesResolutions.push(`✏️ Corrected: "${trimmedSentence}" → "${reviewed}"`)
    }
  }

  return {
    dialogLinesResolved,
    dialogLinesResolutions
  }
}
