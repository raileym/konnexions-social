import { type Module, MODULE_NAME } from '../shared/types'

export function streamlineModule({
  moduleName,
  module
}: {
  moduleName: string
  module: Partial<Module>
}): Partial<Module> {
  if (moduleName !== MODULE_NAME.DIALOG) return module
  if (module.lines === undefined) return module

  const expandedLines: string[] = []

  for (const line of module.lines) {
    const [speaker, dialog] = line.split('|')

    if (!speaker || !dialog) {
      expandedLines.push(line)
      continue
    }

    // Match sentences ending in ., ?, or ! followed by space or end of string
    const sentenceRegex = /[^.!?¡¿]+[.!?]+/g
    const matches = dialog.match(sentenceRegex)

    if (!matches) {
      expandedLines.push(line) // Fallback: no sentence break detected
      continue
    }

    for (const sentence of matches) {
      const trimmed = sentence.trim()
      if (trimmed.length > 0) {
        expandedLines.push(`${speaker}|${trimmed}`)
      }
    }
  }

  return {
    ...module,
    lines: expandedLines
  }
}
