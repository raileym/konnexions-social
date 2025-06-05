export function formatDialogLinesForReview(lines: string[]): string[] {
  return lines.map((line, index) => {
    const parts = line.split('|')
    const spokenText = parts[2]?.trim() || ''
    return `${index + 1}. ${spokenText}`
  })
}
