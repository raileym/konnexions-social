export function lintJsonArrayStructure(input: string): string[] {
  const warnings: string[] = []

  // Trim to catch structural issues at edges
  const trimmed = input.trim()

  // Check for trailing comma
  if (/,(\s*])/.test(trimmed)) {
    warnings.push('⚠️ Trailing comma detected before closing bracket.')
  }

  // Check for use of single quotes
  if (/'/.test(trimmed) && !/"[^"]+"/.test(trimmed)) {
    warnings.push('⚠️ Single quotes detected — use double quotes for JSON strings.')
  }

  // Check for Markdown-style wrappers
  if (/```json/.test(trimmed) || /```/.test(trimmed)) {
    warnings.push('⚠️ Markdown code block markers (```json or ```) detected — remove for strict JSON.')
  }

  // Check for partial JSON (missing brackets)
  if (!trimmed.startsWith('[')) {
    warnings.push('⚠️ JSON array must start with "[".')
  }

  if (!trimmed.endsWith(']')) {
    warnings.push('⚠️ JSON array must end with "]".')
  }

  // Check for headings, prose, or preambles
  if (/^[A-Za-z\s]+:/.test(trimmed.split('\n')[0])) {
    warnings.push('⚠️ Heading or label detected before JSON — remove prose or introductory phrases.')
  }

  return warnings
}