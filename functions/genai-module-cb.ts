// File: functions/genai-module-cb.ts

import { type Handler } from '@netlify/functions'
import { generateSignature } from '@shared/generateSignature'
import { fetchOpenAI } from '@shared/fetchLLM'
import { getPrompt_cb } from '@shared/getPrompt_cb'
import { validateModule } from '@shared/validateModule'
import { streamlineModule } from '@shared/streamlineModule'
import {
  defaultPrompt,
  type ErrorLabel,
  type Lesson,
  type ModuleName,
  type Prompt,
  type ScenarioData
} from '@cknTypes/types'
import { ERROR_LABEL, FIELD_COUNT, MODULE_NAME } from '@cknTypes/constants'

const handler: Handler = async (event) => {
  let lesson: Lesson | undefined
  let moduleName: ModuleName | undefined
  let scenarioData: ScenarioData | undefined
  let prompt: Prompt = defaultPrompt
  let response: string = ''
  let fieldCount: number = 0
  let errorLabel: ErrorLabel = 'default'

  try {
    ;({ lesson, scenarioData, moduleName } = JSON.parse(event.body ?? '{}'))

    if (!lesson || !moduleName || !scenarioData) {
      return {
        statusCode: 400,
        body: 'Missing required fields: lesson, moduleName, or scenarioData'
      }
    }

    prompt = defaultPrompt
    fieldCount = FIELD_COUNT[moduleName]
    errorLabel = ERROR_LABEL[moduleName]

    ;({ prompt, fieldCount, errorLabel } = getPrompt_cb({
      moduleName,
      scenarioData,
      lesson,
      errors: []
    }))

    response = await fetchOpenAI({ prompt })
    
    console.log(`genai-module-cb|${moduleName}: lesson`, lesson)
    console.log(`genai-module-cb|${moduleName}: moduleName`, moduleName)
    console.log(`genai-module-cb|${moduleName}: Prompt`, prompt)
    console.log(`genai-module-cb|${moduleName}: fieldCount`, fieldCount)
    console.log(`genai-module-cb|${moduleName}: errorLabel`, errorLabel)
    console.log(`genai-module-cb|${moduleName}: response`, response)

    let validModule = validateModule({
      response,
      errorLabel,
      fieldCount,
      language: lesson.targetLanguage,
      moduleName
    })

    console.log('server-side', 'ONE')

    // Retry if validation failed
    if (!validModule.success) {
      ;({ prompt, fieldCount, errorLabel } = getPrompt_cb({
        moduleName,
        scenarioData,
        lesson,
        errors: validModule.errors ?? []
      }))

      response = await fetchOpenAI({ prompt })

      console.log('server-side', 'TWO')

      validModule = validateModule({
        response,
        errorLabel,
        fieldCount,
        language: lesson.targetLanguage,
        moduleName
      })
    }

    console.log('server-side', 'THREE')

    const streamlinedModule = streamlineModule({ moduleName, module: validModule })

    console.log('server-side', 'FOUR')

    const updatedLesson: Lesson = {
      ...lesson,
      [moduleName]: {
        ...streamlinedModule,
        prompt
      }
    }

    const prose = updatedLesson[MODULE_NAME.DIALOG_DRAFT]?.lines?.join(' ') ?? ''
    // const signature = generateSignature(prose)

    return {
      statusCode: 200,
      body: JSON.stringify({
        [moduleName]: {
          ...streamlinedModule,
          prompt,
          // signature,
          moduleProse: prose
        }
      })
    }
  } catch (err) {

console.error('Error in genai-module-cb handler:', err)
  console.error('Captured debug values:', {
    moduleName,
    prompt,
    fieldCount,
    errorLabel,
    response: typeof response === 'string' ? response.slice(0, 500) : 'unavailable', // avoid printing long blobs
    lessonSignature: lesson ? generateSignature(JSON.stringify(lesson).slice(0, 500)) : 'unavailable'
  })

  return {
    statusCode: 500,
    body: JSON.stringify({
      [MODULE_NAME.ERROR_MODULE] : {
          error: (err as Error).message,
          moduleName,
          debug: {
            prompt,
            fieldCount,
            errorLabel
            // You could add more here if needed
          }
        }
      })
    }
  // }    
  //   return {
  //     statusCode: 500,      
  //     body: `Error in genai-module-cb: ${(err as Error).message}`
  //   }
  }
}

export { handler }
