import type { Lines } from '../shared/cknTypes/types.js'

export function formatDialogLinesForReview(lines: Lines): Lines {
  return lines.map((line, index) => {
    const parts = line.split('|')
    const spokenText = parts[2]?.trim() || ''
    return `${index + 1}. ${spokenText}`
  })
}
