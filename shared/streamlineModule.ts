import { type Module, MODULE_NAME } from '@cknTypes/types/types'

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
    const fields = line.split('|')

    if (fields.length !== 3) {
      expandedLines.push(line) // Preserve malformed lines
      continue
    }

    const [gender, speaker, dialog] = fields

    // Match sentences ending in ., ?, or ! — preserving ¡¿
    const sentenceRegex = /[^.!?¡¿]+[.!?]+/g
    const matches = dialog.match(sentenceRegex)

    if (!matches) {
      expandedLines.push(line) // No sentence breaks found
      continue
    }

    for (const sentence of matches) {
      const trimmed = sentence.trim()
      if (trimmed.length > 0) {
        expandedLines.push(`${gender}|${speaker}|${trimmed}`)
      }
    }
  }

  return {
    ...module,
    lines: expandedLines
  }
}
