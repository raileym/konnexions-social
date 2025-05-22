import type {
  AddErrorProps,
  GenAIValidationResult,
  HandleLLMError,
  ValidateGenAIResponseProps,
  RichParsedLine
} from "../cknTypes/types/types"

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

  console.log(`${error.message}: ${error.offendingData}`)
}

export const looksLikeStringArray = /^\s*\[\s*"(?:[^"\\]|\\.)*"(?:\s*,\s*"(?:[^"\\]|\\.)*")*\s*\]\s*$/s

export const validateGenAIResponse = <T extends string>({
  response,
  errorLabel,
  setErrors,
  expectedFieldCount
}: ValidateGenAIResponseProps): GenAIValidationResult<T> => {

  if (!response) {
    const error: HandleLLMError = {
      message: 'Response from ChatGPT AI is empty or undefined',
      detail: '',
      offendingData: JSON.stringify(response),
      timestamp: new Date().toISOString()
    }
    addError({ errorLabel, setErrors, error })
    return { success: false, error }    
  }

  if (!looksLikeStringArray.test(response)) {
    const error: HandleLLMError = {
      message: 'Response from ChatGPT AI does not match expected JSON array format',
      detail: '',
      offendingData: JSON.stringify(response),
      timestamp: new Date().toISOString()
    }
    addError({ errorLabel, setErrors, error })
    return { success: false, error }
  }

  let parsed: string[]
  try {
    parsed = JSON.parse(response) as T[]
  } catch (err: unknown) {
    const error: HandleLLMError = {
      message: 'Failed to parse response as JSON',
      detail: err instanceof Error ? err.message : 'Unknown JSON parse error',
      offendingData: JSON.stringify(response),
      timestamp: new Date().toISOString()
    }
    addError({ errorLabel, setErrors, error })
    return { success: false, error }
  }

  if (!Array.isArray(parsed)) {
    const error: HandleLLMError = {
      message: 'Parsed response is not an array',
      detail: '',
      offendingData: JSON.stringify(parsed),
      timestamp: new Date().toISOString()
    }
    addError({ errorLabel, setErrors, error })
    return { success: false, error }
  }

  if (!parsed.every(line => typeof line === 'string')) {
    const error: HandleLLMError = {
      message: 'One or more items in the parsed array is not a string',
      detail: '',
      offendingData: JSON.stringify(parsed),
      timestamp: new Date().toISOString()
    }
    addError({ errorLabel, setErrors, error })
    return { success: false, error }
  }

  const structured = parsed.map((original): RichParsedLine => {
    const fields = original.split('|')
    const reasons: string[] = []

    if (fields.length !== expectedFieldCount) {
      reasons.push(`Expected ${expectedFieldCount} fields, got ${fields.length}`)
    }

    if (fields.some(f => f.trim() === '')) {
      reasons.push('One or more fields is blank')
    }

    return {
      original,
      fields,
      isValid: reasons.length === 0,
      reasons
    }
  })

  const invalid = structured.filter(s => !s.isValid)
  const valid = structured.filter(s => s.isValid).map(s => s.original as T)

  if (invalid.length > 0) {
    const error: HandleLLMError = {
      message: 'Some entries failed basic field count validation',
      detail: invalid.map(s => `${s.original} ❌ ${s.reasons.join('; ')}`).join('\n'),
      offendingData: JSON.stringify(parsed),
      timestamp: new Date().toISOString()
    }
    addError({ errorLabel, setErrors, error })
  }
  
  if (!parsed.every(line => line.split('|').length === expectedFieldCount)) {
    const error: HandleLLMError = {
      message: `One or more items does not have ${expectedFieldCount} vertical-bar-separated fields`,
      detail: '',
      offendingData: JSON.stringify(parsed),
      timestamp: new Date().toISOString()
    }
  
    addError({ errorLabel, setErrors, error })
  
    return {
      success: false,
      error
    }
  }  

  return {
    success: true,
    parsed: parsed as T[]
  }
}
