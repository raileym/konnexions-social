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

const handler: Handler = async (event) => {
  try {
    const { lesson, scenarioData, moduleName }: { scenarioData: ScenarioData, lesson: Lesson; moduleName: ModuleName } = JSON.parse(event.body ?? '{}')

    if (!lesson || !moduleName || !scenarioData) {
      return {
        statusCode: 400,
        body: 'Missing required fields: lesson, moduleName, or scenarioData'
      }
    }

    let prompt: Prompt = defaultPrompt
    let fieldCount: number = defaultFieldCount
    let errorLabel: ErrorLabel = defaultErrorLabel

    ;({ prompt, fieldCount, errorLabel } = getPrompt({
      moduleName,
      scenarioData, // scenarioData is omitted in cloud-based version
      lesson,
      errors: []
    }))

    let response: string = await fetchOpenAI({ prompt })

    let validModule = validateModule({
      response,
      errorLabel,
      fieldCount,
      language: lesson.targetLanguage,
      moduleName
    })

    // Retry if validation failed
    if (!validModule.success) {
      ;({ prompt, fieldCount, errorLabel } = getPrompt({
        moduleName,
        scenarioData,
        lesson,
        errors: validModule.errors ?? []
      }))

      response = await fetchOpenAI({ prompt })

      validModule = validateModule({
        response,
        errorLabel,
        fieldCount,
        language: lesson.targetLanguage,
        moduleName
      })
    }

    const streamlinedModule = streamlineModule({ moduleName, module: validModule })

    const updatedLesson: Lesson = {
      ...lesson,
      [moduleName]: {
        ...streamlinedModule,
        prompt
      }
    }

    const prose = updatedLesson.dialog?.lines?.join(' ') ?? ''
    const signature = generateSignature(prose)

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
