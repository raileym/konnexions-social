// netlify/functions/genai-module-cb.ts
import { type Handler } from '@netlify/functions'
import { generateSignature } from '../shared/generateSignature.js'
import { getModuleContent } from '../shared/getModuleContent.js'
import { MODULE_NAME } from '../shared/cknTypes/constants.js'
import type { Lesson, ModuleName } from '../shared/cknTypes/types.js'

const handler: Handler = async (event) => {
  let lesson: Lesson | undefined
  let moduleName: ModuleName | undefined

  try {
    ;({ lesson, moduleName } = JSON.parse(event.body ?? '{}'))

    if (!lesson || !moduleName) {
      return {
        statusCode: 400,
        body: 'Missing required fields: lesson or moduleName'
      }
    }

    const module = await getModuleContent(lesson, moduleName)
    if (!module) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Unable to generate module content' })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        [moduleName]: module
      })
    }
  } catch (err) {
    console.error('Error in genai-module-cb handler:', err)
    console.error('Captured debug values:', {
      moduleName,
      lessonSignature: lesson ? generateSignature(JSON.stringify(lesson).slice(0, 500)) : 'unavailable'
    })

    return {
      statusCode: 500,
      body: JSON.stringify({
        [MODULE_NAME.ERROR_MODULE]: {
          error: (err as Error).message,
          moduleName
        }
      })
    }
  }
}

export { handler }
