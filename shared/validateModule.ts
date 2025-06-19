import {
  type AddErrorProps,
  type HandleLLMError,
  type RichParsedLine,
  type Module,
  type ValidateModuleProps,
  type Line
} from '@cknTypes/types'
import { lintJsonArrayStructure } from '@shared/lintJsonArrayStructure'

export const addError = ({
  errorLabel,
  setErrors,
  error
}: AddErrorProps) => {
  setErrors(prev => {
    const updated = [...prev, error]
    localStorage.setItem(errorLabel, JSON.stringify(updated))
    return updated
  })

  // cXnsole.log(`${error.message}: ${error.offendingData}`)
}

// export const looksLikeStringArray = /^\s*\[\s*"(?:[^"\\]|\\.)*"(?:\s*,\s*"(?:[^"\\]|\\.)*")*\s*\]\s*$/s

export const looksLikeStringArray = (str: string): boolean => {
  try {
    // const cleaned = str.replace(/,(\s*])/, '$1') // remove trailing comma
    const cleaned = str.replace(/,(\s*])/g, '$1')  // global match — all trailing commas
    const parsed = JSON.parse(cleaned)
    return Array.isArray(parsed) && parsed.every(item => typeof item === 'string')
  } catch {
    return false
  }
}

export const validateModule = ({
  response,
  fieldCount,
  errorLabel,
  moduleName
}: ValidateModuleProps): Partial<Module> & { status?: 'valid' | 'warning' | 'error' } => {
  const errors: HandleLLMError[] = []

  if (!response) {
    const error: HandleLLMError = {
      message: 'Response from ChatGPT AI is empty or undefined',
      detail: '',
      offendingData: JSON.stringify(response),
      errorLabel,
      timestamp: new Date().toISOString()
    }
    errors.push(error)
    return { success: false, lines: [], errors, sentinel: '', status: 'error' }
  }

  const warnings = lintJsonArrayStructure(response)

  warnings.forEach(warning => {
    errors.push({
      message: warning,
      detail: '',
      offendingData: response,
      errorLabel,
      timestamp: new Date().toISOString()
    })
  })

  let lines: string[]

  try {
    let parsed = JSON.parse(response)

    if (typeof parsed === 'string') {
      parsed = JSON.parse(parsed)
    }

    if (!Array.isArray(parsed) || !parsed.every(item => typeof item === 'string')) {
      throw new Error('Parsed response is not an array of strings')
    }

    lines = parsed
  } catch (err1) {
    errors.push({
      message: 'Initial JSON.parse attempt failed',
      detail: err1 instanceof Error ? err1.message : 'Unknown parse error',
      offendingData: typeof response === 'string' ? response : JSON.stringify(response),
      errorLabel,
      timestamp: new Date().toISOString()
    })

    try {
      const hasTrailingComma = /,(\s*])/.test(response)

      if (hasTrailingComma) {
        errors.push({
          message: 'Trailing comma detected and removed from JSON array',
          detail: 'Output included a trailing comma before the closing bracket',
          offendingData: response,
          errorLabel,
          timestamp: new Date().toISOString()
        })
      }

      const cleaned = response.replace(/,(\s*])/g, '$1')
      const fallbackParsed = JSON.parse(cleaned)

      if (
        Array.isArray(fallbackParsed) &&
        fallbackParsed.every(item => typeof item === 'string')
      ) {
        lines = fallbackParsed
      } else {
        throw new Error('Fallback parsed result is not a valid string array')
      }
    } catch (err2) {
      const error: HandleLLMError = {
        message: 'Failed to parse response as string array (even after fallback)',
        detail: (err2 instanceof Error ? err2.message : 'Unknown error'),
        offendingData: typeof response === 'string' ? response : JSON.stringify(response),
        errorLabel,
        timestamp: new Date().toISOString()
      }
      errors.push(error)
      return { success: false, lines: [], errors, sentinel: '', status: 'error' }
    }
  }

  if (
    lines.length === 1 &&
    lines[0].trim().toLowerCase() === 'no corrections needed'
  ) {
    return {
      success: true,
      lines: [],
      sentinel: 'No corrections needed',
      errors,
      status: errors.length > 0 ? 'warning' : 'valid'
    }
  }

  const structured = lines.map((original): RichParsedLine => {
    const fields = original.split('|')
    const reasons: string[] = []

    if (fields.length !== fieldCount) {
      reasons.push(`Expected ${fieldCount} fields, got ${fields.length}`)
    }

    if (fields.some(f => f.trim() === '')) {
      reasons.push('One or more fields is blank')
    }

    if (moduleName === 'dialog') {
      const [gender, speaker, utterance] = fields.map(f => f.trim())
      if (!['m', 'f'].includes(gender.toLowerCase())) {
        reasons.push(`Unrecognized gender tag: ${gender}`)
      }
      if (speaker.length === 0) {
        reasons.push('Speaker name is missing')
      }
      if (utterance.length < 2) {
        reasons.push('Utterance too short')
      }
    }

    if (moduleName === 'verbs') {
      const specialCases = ['gustar', 'encantar', 'faltar', 'interesar']
      const infinitive = fields[0].trim().toLowerCase()
      if (!specialCases.includes(infinitive) && fields[1].trim() === fields[2].trim()) {
        // reasons.push('Singular and plural forms are identical')
      }
    }

    if (moduleName === 'nouns') {
      const invariableNouns = ['lunes', 'análisis', 'paraguas', 'virus', 'tórax']
      const noun = fields[0].trim().toLowerCase()
      if (
        fields.length >= 3 &&
        fields[1].trim() === fields[2].trim() &&
        !invariableNouns.includes(noun)
      ) {
        reasons.push('Singular and plural noun forms are identical (and not in exception list)')
      }
    }

    return {
      original,
      fields,
      isValid: reasons.length === 0,
      reasons
    }
  })

  const invalid = structured.filter(s => !s.isValid)
  const valid = structured.filter(s => s.isValid).map(s => s.original as Line)

  if (invalid.length > 0) {
    const error: HandleLLMError = {
      message: 'Some entries failed validation checks',
      detail: invalid.map(s => `${s.original} ❌ ${s.reasons.join('; ')}`).join('\n'),
      offendingData: JSON.stringify(lines),
      errorLabel,
      timestamp: new Date().toISOString()
    }
    errors.push(error)
  }

  const hasBlockingErrors = invalid.length > 0
  const hasWarnings = errors.length > 0

  return {
    success: !hasBlockingErrors,
    lines: valid,
    errors,
    sentinel: '',
    status: hasBlockingErrors ? 'error' : hasWarnings ? 'warning' : 'valid'
  }
}
