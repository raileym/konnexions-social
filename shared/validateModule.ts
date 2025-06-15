import {
  type AddErrorProps,
  type HandleLLMError,
  type RichParsedLine,
  type Module,
  type ValidateModuleProps,
  type Lines,
  type Line,
  LANGUAGE
} from './cknTypes/types/types'

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

export const looksLikeStringArray = /^\s*\[\s*"(?:[^"\\]|\\.)*"(?:\s*,\s*"(?:[^"\\]|\\.)*")*\s*\]\s*$/s

export const validateModule = ({
  response,
  fieldCount,
  errorLabel,
  language,
  moduleName
}: ValidateModuleProps): Partial<Module> => {
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
    return { success: false, lines: [], errors, sentinel: '' }
  }

  if (!looksLikeStringArray.test(response)) {
    const error: HandleLLMError = {
      message: 'Response from ChatGPT AI does not match expected JSON array format',
      detail: '',
      offendingData: JSON.stringify(response),
      errorLabel,
      timestamp: new Date().toISOString()
    }
    errors.push(error)
    return { success: false, lines: [], errors, sentinel: '' }
  }

  let lines: string[]
  try {
    lines = JSON.parse(response) as Lines
  } catch (err: unknown) {
    const error: HandleLLMError = {
      message: 'Failed to parse response as JSON',
      detail: err instanceof Error ? err.message : 'Unknown JSON parse error',
      offendingData: JSON.stringify(response),
      errorLabel,
      timestamp: new Date().toISOString()
    }
    errors.push(error)
    return { success: false, lines: [], errors, sentinel: '' }
  }

  if (!Array.isArray(lines)) {
    const error: HandleLLMError = {
      message: 'Parsed response is not an array',
      detail: '',
      offendingData: JSON.stringify(lines),
      errorLabel,
      timestamp: new Date().toISOString()
    }
    errors.push(error)
    return { success: false, lines: [], errors, sentinel: '' }
  }

  if (!lines.every(line => typeof line === 'string')) {
    const error: HandleLLMError = {
      message: 'One or more items in the lines array is not a string',
      detail: '',
      offendingData: JSON.stringify(lines),
      errorLabel,
      timestamp: new Date().toISOString()
    }
    errors.push(error)
    return { success: false, lines: [], errors, sentinel: '' }
  }

  if (
    lines.length === 1 &&
    lines[0].trim().toLowerCase() === 'no corrections needed'
  ) {
    return {
      success: true,
      lines: [],
      sentinel: 'No corrections needed'
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

    const alwaysFalse = false
    if (moduleName === 'nouns' && language === LANGUAGE.SPANISH && fields.length >= 5 && alwaysFalse) {
      const gender = fields[0].trim().toLowerCase()
      const articleSing = fields[3].trim().toLowerCase()
      const articlePlur = fields[4].trim().toLowerCase()

      const mascArticles = ['el', 'los']
      const femArticles = ['la', 'las']

      if (gender === 'masculino') {
        if (!mascArticles.includes(articleSing)) {
          reasons.push(`Masculine noun with unexpected singular article: ${articleSing}`)
        }
        if (!mascArticles.includes(articlePlur)) {
          reasons.push(`Masculine noun with unexpected plural article: ${articlePlur}`)
        }
      } else if (gender === 'femenino') {
        if (!femArticles.includes(articleSing)) {
          reasons.push(`Feminine noun with unexpected singular article: ${articleSing}`)
        }
        if (!femArticles.includes(articlePlur)) {
          reasons.push(`Feminine noun with unexpected plural article: ${articlePlur}`)
        }
      }
    }

    if (moduleName === 'nouns' && language === LANGUAGE.SPANISH && fields.length >= 7 && alwaysFalse) {
      const preSing1 = fields[5].trim().toLowerCase()
      const preSing2 = fields[6].trim().toLowerCase()

      const validPrepositions = ["a", "con", "de", "desde", "en", "entre", "hacia", "hasta", "para", "por", "sin", "sobre"]

      if (!validPrepositions.some(p => preSing1.startsWith(p + ' '))) {
        reasons.push(`Singular prep phrase 1 missing valid preposition: ${preSing1}`)
      }

      if (!validPrepositions.some(p => preSing2.startsWith(p + ' '))) {
        reasons.push(`Singular prep phrase 2 missing valid preposition: ${preSing2}`)
      }
    }

    if (moduleName === 'nouns' && language === LANGUAGE.SPANISH && fields.length >= 9 && alwaysFalse) {
      const prePlur1 = fields[7].trim().toLowerCase()
      const prePlur2 = fields[8].trim().toLowerCase()

      const validPrepositions = ["a", "con", "de", "desde", "en", "entre", "hacia", "hasta", "para", "por", "sin", "sobre"]

      if (!validPrepositions.some(p => prePlur1.startsWith(p + ' '))) {
        reasons.push(`Plural prep phrase 1 missing valid preposition: ${prePlur1}`)
      }

      if (!validPrepositions.some(p => prePlur2.startsWith(p + ' '))) {
        reasons.push(`Plural prep phrase 2 missing valid preposition: ${prePlur2}`)
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

  return {
    success: errors.length === 0,
    lines: valid,
    errors,
    sentinel: ''
  }
} 
