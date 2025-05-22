import type { AddErrorProps, GenAIValidationResult, HandleLLMError, ValidateGenAIResponseProps } from "../cknTypes/types/types"

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
  
    return {
      success: false,
      error
    }
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
  
    return {
      success: false,
      error
    }
  }

  if (!Array.isArray(parsed)) {
    const error: HandleLLMError = {
      message: 'Parsed response is not an array',
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

  if (!parsed.every(line => typeof line === 'string')) {
    const error: HandleLLMError = {
      message: 'One or more items in the parsed array is not a string',
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
