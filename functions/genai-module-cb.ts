// File: functions/genai-module-cb.ts

import { type Handler } from '@netlify/functions'
import { generateSignature } from '@shared/generateSignature'
// import { generateExample } from '@shared/generateExample'
import { fetchOpenAI } from '@shared/fetchLLM'
import { getPrompt } from '@shared/getPrompt'
import { validateModule } from '@shared/validateModule'
import { streamlineModule } from '@shared/streamlineModule'
import {
  defaultErrorLabel,
  defaultFieldCount,
  // defaultModule,
  defaultPrompt,
  type ErrorLabel,
  type Lesson,
  type ModuleName,
  // type Module,
  type Prompt,
  type ScenarioData
} from '@cknTypes/types'

// const alwaysTrue = true

const handler: Handler = async (event) => {
  try {
    const { lesson, scenarioData, moduleName }: { scenarioData: ScenarioData, lesson: Lesson; moduleName: ModuleName } = JSON.parse(event.body ?? '{}')

    if (!lesson || !moduleName || !scenarioData) {
      return {
        statusCode: 400,
        body: 'Missing required fields: lesson, moduleName, or scenarioData'
      }
    }

    console.log('ONE')

    // if (alwaysTrue) {
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify({
    //       [moduleName]: {
    //         ...lesson[moduleName]
    //       }
    //     })
    //   }
    // }

    let prompt: Prompt = defaultPrompt
    let fieldCount: number = defaultFieldCount
    let errorLabel: ErrorLabel = defaultErrorLabel

    ;({ prompt, fieldCount, errorLabel } = getPrompt({
      moduleName,
      scenarioData, // scenarioData is omitted in cloud-based version
      lesson,
      errors: []
    }))

    console.log('TWO')
    
    // console.log('prompt', prompt)

    let response: string = await fetchOpenAI({ prompt })

    console.log('THREE')
    
    let validModule = validateModule({
      response,
      errorLabel,
      fieldCount,
      language: lesson.targetLanguage,
      moduleName
    })

    console.log('FOUR')
    
    // Retry if validation failed
    if (!validModule.success) {
      ;({ prompt, fieldCount, errorLabel } = getPrompt({
        moduleName,
        scenarioData,
        lesson,
        errors: validModule.errors ?? []
      }))

      console.log('FIVE')

      response = await fetchOpenAI({ prompt })

      console.log('SIX')

      validModule = validateModule({
        response,
        errorLabel,
        fieldCount,
        language: lesson.targetLanguage,
        moduleName
      })

      console.log('SEVEN')

    }

    console.log('EIGHT')

    const streamlinedModule = streamlineModule({ moduleName, module: validModule })

    console.log('NINE')

    const updatedLesson: Lesson = {
      ...lesson,
      [moduleName]: {
        ...streamlinedModule,
        prompt
      }
    }

    const prose = updatedLesson.dialog?.lines?.join(' ') ?? ''
    const signature = generateSignature(prose)

    console.log('TEN')

    return {
      statusCode: 200,
      body: JSON.stringify({
        [moduleName]: {
          ...streamlinedModule,
          prompt,
          signature,
          moduleProse: prose
        }
      })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error in genai-module-cb: ${(err as Error).message}`
    }
  }
}

export { handler }
