import { Handler } from '@netlify/functions'
import { validateGenAIResponse } from '../shared/errorUtils'
import { DialogLine, ERROR_LABEL, LESSON_TITLE } from '../shared/types'
import { generatePromptSet } from '../shared/generatePromptSet'
import { generateSignature } from '../shared/generateSignature'
import { generateExample } from '../shared/generateExample'
import { fetchOpenAI } from '../shared/fetchLLM'
import { getPrompt } from '../shared/getPrompt'

const handler: Handler = async (event) => {
  try {
    const { testMode, lesson, lessonTitle } = JSON.parse(event.body ?? '{}')

    if (!lesson || !lessonTitle) {
      console.log('Missing the big two')
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

    const prompt = getPrompt({lessonTitle: LESSON_TITLE.DIALOG, lesson })

    let response: string

    if (testMode) {
      response = generateExample({
        language: lesson.language,
        lessonTitle: LESSON_TITLE.DIALOG,
        options: { asString: true }
      })
    } else {
      response = await fetchOpenAI({ prompt })
    }

    const validatedResult = validateGenAIResponse<DialogLine>({
      response,
      errorLabel: ERROR_LABEL.DIALOG_ERROR,
      expectedFieldCount: 2,
      language: lesson.language
    })

    const dialogProse = validatedResult.lines.join(' ')
    const dialogSignature = generateSignature(dialogProse)

    return {
      statusCode: 200,
      body: JSON.stringify({
        lesson: {
          dialog: {
            dialogSignature,
            dialogPrompt: prompt,
            dialogLines: validatedResult.lines,
            dialogErrors: validatedResult.errors,
            dialogSuccess: validatedResult.success
          },
          dialogProse,
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
