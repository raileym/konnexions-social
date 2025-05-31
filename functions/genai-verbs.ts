import { Handler } from '@netlify/functions'
import { validateGenAIResponse } from '../shared/errorUtils'
import { Verbs } from '../shared/types'
import { generateExample } from '../shared/generateExample'
import { fetchOpenAI } from '../shared/fetchLLM'
import { getPrompt } from '../shared/getPrompt'

const handler: Handler = async (event) => {
  try {
    const { testMode, lesson, lessonTitle } = JSON.parse(event.body ?? '{}')

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

    const { prompt, fieldCount, errorLabel } = getPrompt({lessonTitle, lesson })

    let response: string

    if (testMode) {
      response = generateExample({
        lesson,
        lessonTitle,
        options: { asString: true }
      })
    } else {
      response = await fetchOpenAI({ prompt })
    }

    const validatedResult = validateGenAIResponse<Verbs>({
      response,
      errorLabel,
      fieldCount,
      lesson
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
