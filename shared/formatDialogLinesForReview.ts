import type { Lines } from '../shared/cknTypes/types.js'
import { cleanTextForTTS } from '../shared/cleanTextForTranslation.js'

export function formatDialogLinesForReview(lines: Lines): Lines {
  return lines.map((line, index) => {
    const parts = line.split('|')
    const spokenText = parts[2]?.trim() || ''
    const cleaned = cleanTextForTTS(spokenText)
    return `${index + 1}. ${cleaned}`
  })
}
