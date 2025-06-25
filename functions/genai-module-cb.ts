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
  try {
    const { lesson, scenarioData, moduleName }: { scenarioData: ScenarioData, lesson: Lesson; moduleName: ModuleName } = JSON.parse(event.body ?? '{}')

    if (!lesson || !moduleName || !scenarioData) {
      return {
        statusCode: 400,
        body: 'Missing required fields: lesson, moduleName, or scenarioData'
      }
    }

    let prompt: Prompt = defaultPrompt
    let fieldCount: number = FIELD_COUNT[moduleName]
    let errorLabel: ErrorLabel = ERROR_LABEL[moduleName]

    ;({ prompt, fieldCount, errorLabel } = getPrompt_cb({
      moduleName,
      scenarioData,
      lesson,
      errors: []
    }))

    console.log(`genai-module-cb|${moduleName}: Prompt`, prompt)
    console.log(`genai-module-cb|${moduleName}: fieldCount`, fieldCount)
    console.log(`genai-module-cb|${moduleName}: errorLabel`, errorLabel)

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
      ;({ prompt, fieldCount, errorLabel } = getPrompt_cb({
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

    const prose = updatedLesson[MODULE_NAME.DIALOG_DRAFT]?.lines?.join(' ') ?? ''
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
