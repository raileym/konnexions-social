import { Handler } from '@netlify/functions'
import { generateSignature } from '../shared/generateSignature'
import { generateExample } from '../shared/generateExample'
import { fetchOpenAI } from '../shared/fetchLLM'
import { getPrompt } from '../shared/getPrompt'
import { validateModule } from '../shared/validateModule'

const handler: Handler = async (event) => {
  try {
    const { testMode, lesson, moduleName } = JSON.parse(event.body ?? '{}')

    if (!lesson || !moduleName) {
      console.log('Missing the big two')
      return {
        statusCode: 400,
        body: 'Missing a required field: lesson or moduleName'
      }
    }

    if (!lesson.language || !lesson.scenarioLabel || !lesson.participantList) {
      return {
        statusCode: 400,
        body: 'Lesson is missing required fields'
      }
    }

    const { prompt, fieldCount, errorLabel } = getPrompt({moduleName, lesson })

    let response: string

    if (testMode) {
      response = generateExample({
        language: lesson.language,
        moduleName,
        options: { asString: true }
      })
    } else {
      response = await fetchOpenAI({ prompt })
    }

    const validModule = validateModule({
      response,
      errorLabel,
      fieldCount,
      lesson
    })

    const prose = validModule.lines?.join(' ') ?? ''
    const signature = generateSignature(prose)
    const updatedLesson = {
      [moduleName]: {
        ...validModule,
        prompt,
        signature,
      },
      prose
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        lesson: {
          ...updatedLesson
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
