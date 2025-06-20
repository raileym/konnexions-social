export function formatNounLinesForReview(lines: string[]): string[] {
  return lines.map((line, index) => {
    return `${index + 1}. ${line}`
  })
}
