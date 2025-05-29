import { Handler } from '@netlify/functions'
import { validateGenAIResponse } from '../shared/errorUtils'
import { ERROR_LABEL, Language, Verbs } from '../shared/types'
import { generatePromptSet } from '../shared/generatePromptSet'
import { generateExample } from '../shared/generateExample'
import { fetchOpenAI } from '../shared/fetchLLM'

const handler: Handler = async (event) => {
  try {
    const { testMode, lesson } = JSON.parse(event.body ?? '{}')

    if (!lesson) {
      console.log('Missing the big one')
      return {
        statusCode: 400,
        body: 'Missing one required fields: lesson'
      }
    }

    if (!lesson.dialog || !lesson.language || !lesson.dialogSignature) {
      console.log('Missing the big three')
      return {
        statusCode: 400,
        body: 'Missing one or more required fields: language, dialog'
      }
    }

    const promptSet = generatePromptSet()
    const prompt = promptSet.getVerbsPrompt({lesson})

    let response: string

    if (testMode) {
      response = generateExample({
        language: lesson.language,
        context: 'verbs',
        options: { asString: true }
      })
    } else {
      response = await fetchOpenAI({ prompt })
    }

    const validatedResult = validateGenAIResponse<Verbs>({
      response,
      errorLabel: ERROR_LABEL.VERBS_ERROR,
      expectedFieldCount: 7,
      language: '' as Language
    })    

    return {
      statusCode: 200,
      body: JSON.stringify({
        lesson: {
          verbsPrompt: prompt,
          verbsArray: validatedResult.parsed,
          verbsSignature: lesson.dialogSignature,
          verbsSuccess: validatedResult.success,
          verbsErrors: validatedResult.errors
        }
      })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error generating verbs: ${(err as Error).message}`
    }
  }
}

export { handler }
