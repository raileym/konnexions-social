import { Handler } from '@netlify/functions'
import { validateGenAIResponse } from '../shared/errorUtils'
import { Dialog, ERROR_LABEL } from '../shared/types'
import { generatePromptSet } from '../shared/generatePromptSet'
import { generateSignature } from '../shared/generateSignature'
import { generateExample } from '../shared/generateExample'
import { fetchOpenAI } from '../shared/fetchLLM'

const handler: Handler = async (event) => {
  try {
    const { testMode, language, scenarioLabel, participantList } = JSON.parse(event.body ?? '{}')

    if (!language || !scenarioLabel || !participantList) {
      console.log('Missing the big three')
      return {
        statusCode: 400,
        body: 'Missing one or more required fields: language, scenarioLabel, participant'
      }
    }

    const promptSet = generatePromptSet()
    const prompt = promptSet.getDialogPrompt({language, scenarioLabel, participantList})

    let response: string

    if (testMode) {
      response = generateExample({language, context: 'dialog', options: { asString: true }
      })
    } else {
      response = await fetchOpenAI({ prompt })
    }

    const validatedResult = validateGenAIResponse<Dialog>({
      response,
      errorLabel: ERROR_LABEL.DIALOG_ERROR,
      expectedFieldCount: 2,
      language
    })

    const dialog = validatedResult.parsed.join(' ')
    const dialogSignature = generateSignature(dialog)

    return {
      statusCode: 200,
      body: JSON.stringify({
        dialogPrompt: prompt,
        dialog,
        dialogSignature,
        dialogResult: validatedResult
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
