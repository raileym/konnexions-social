import { Handler } from '@netlify/functions'
import { validateGenAIResponse } from '../shared/errorUtils'
import { ERROR_LABEL, Nouns } from '../shared/types'
import { generatePromptSet } from '../shared/generatePromptSet'
import { generateExample } from '../shared/generateExample'
import { fetchOpenAI } from '../shared/fetchLLM'

const handler: Handler = async (event) => {
  try {
    const { testMode, dialog, language, dialogSignature } = JSON.parse(event.body ?? '{}')

    if (!dialog || !language || !dialogSignature) {
      console.log('Missing the big three')
      return {
        statusCode: 400,
        body: 'Missing one or more required fields: language, dialog'
      }
    }

    const promptSet = generatePromptSet()
    const prompt = promptSet.getNounsPrompt({language, dialog})


    let response: string

    if (testMode) {
      response = generateExample({language, context: 'nouns', options: { asString: true }
      })
    } else {
      response = await fetchOpenAI({ prompt })
    }

    const validatedResult = validateGenAIResponse<Nouns>({
      response,
      errorLabel: ERROR_LABEL.NOUNS_ERROR,
      expectedFieldCount: 4,
      language
    })    

    const nounsSignature = dialogSignature

    return {
      statusCode: 200,
      body: JSON.stringify({
        nounsPrompt: prompt,
        nounsResult: validatedResult,
        nounsSignature
      })
    }
  } catch (err) {
    console.log('Whoop! We have a problem here server-side.')
    return {
      statusCode: 500,
      body: `Error generating nouns: ${(err as Error).message}`
    }
  }
}

export { handler }
