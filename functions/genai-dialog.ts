import { Handler } from '@netlify/functions'
import { validateGenAIResponse } from '../shared/errorUtils'
import { Dialog, ERROR_LABEL } from '../shared/types'
import { generatePromptSet } from '../shared/generatePromptSet'
import { generateSignature } from '../shared/generateSignature'
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

    if (!lesson.language || !lesson.scenarioLabel || !lesson.participantList) {
      return {
        statusCode: 400,
        body: 'Lesson is missing required fields'
      }
    }

    const promptSet = generatePromptSet()
    const prompt = promptSet.getDialogPrompt({lesson})

    let response: string

    if (testMode) {
      response = generateExample({
        language: lesson.language,
        context: 'dialog',
        options: { asString: true }
      })
    } else {
      response = await fetchOpenAI({ prompt })
    }

    const validatedResult = validateGenAIResponse<Dialog>({
      response,
      errorLabel: ERROR_LABEL.DIALOG_ERROR,
      expectedFieldCount: 2,
      language: lesson.language
    })

    const dialog = validatedResult.parsed.join(' ')
    const dialogSignature = generateSignature(dialog)

    return {
      statusCode: 200,
      body: JSON.stringify({
        lesson: {
          dialog,
          dialogSignature,
          dialogPrompt: prompt,
          dialogArray: validatedResult.parsed,
          dialogErrors: validatedResult.errors,
          dialogSuccess: validatedResult.success
        }
      })
    }
  } catch (err) {
    console.log('Whoop! We have a problem here server-side.')
    return {
      statusCode: 500,
      body: `Error generating dialog: ${(err as Error).message}`
    }
  }
}

export { handler }
