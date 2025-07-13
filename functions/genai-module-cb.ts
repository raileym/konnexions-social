import { type Handler } from '@netlify/functions'
import { generateSignature } from '../shared/generateSignature.js'
import { fetchOpenAI } from '../shared/fetchLLM.js'
import { getPrompt_cb } from '../shared/getPrompt_cb.js'
import { validateModule } from '../shared/validateModule.js'
import { streamlineModule } from '../shared/streamlineModule.js'
import { getPaywall, upsertPaywall } from '../shared/paywall.js'
import {
  defaultPrompt,
  type ErrorLabel,
  type Lesson,
  type ModuleName,
  type Prompt
} from '../shared/cknTypes/types.js'
import { ERROR_LABEL, FIELD_COUNT, MODULE_NAME } from '../shared/cknTypes/constants.js'

const handler: Handler = async (event) => {
  let lesson: Lesson | undefined
  let moduleName: ModuleName | undefined
  let prompt: Prompt = defaultPrompt
  let response: string = ''
  let fieldCount: number = 0
  let errorLabel: ErrorLabel = 'default'

  try {
    ;({ lesson, moduleName } = JSON.parse(event.body ?? '{}'))

    if (!lesson || !moduleName) {
      return {
        statusCode: 400,
        body: 'Missing required fields: lesson or moduleName'
      }
    }

    // Optional: enforce paywall check before continuing
    const { success, data: paywall, error } = await getPaywall(lesson.clientUUID)
    if (!success || !paywall) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: error || 'Unable to retrieve paywall data' })
      }
    }

    // 👇 If your model calls are gated (e.g., by yellow count), enforce here
    if (paywall.paywall_package_green_remaining <= 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No green package credits remaining' })
      }
    }

    // Build prompt and generate response
    prompt = defaultPrompt
    fieldCount = FIELD_COUNT[moduleName]
    errorLabel = ERROR_LABEL[moduleName]

    ;({ prompt, fieldCount, errorLabel } = getPrompt_cb({
      moduleName,
      lesson,
      errors: []
    }))

    response = await fetchOpenAI({ lessonId: lesson.id, clientUUID: lesson.clientUUID, prompt })

    let validModule = validateModule({
      response,
      errorLabel,
      fieldCount,
      language: lesson.targetLanguage,
      moduleName
    })

    if (!validModule.success) {
      ;({ prompt, fieldCount, errorLabel } = getPrompt_cb({
        moduleName,
        lesson,
        errors: validModule.errors ?? []
      }))

      response = await fetchOpenAI({ lessonId: lesson.id, clientUUID: lesson.clientUUID, prompt })

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

    // ✅ Decrement green count on successful module generation
    if (paywall.paywall_package_green_remaining > 0) {
      await upsertPaywall(lesson.clientUUID, {
        ...paywall,
        paywall_package_green_remaining: paywall.paywall_package_green_remaining - 1
      })
    }

    // ✅ Decrement yellow package on success
    // await bumpPaywallPackageCounts({
    //   clientUUID: lesson.clientUUID,
    //   bumpGreenCount: 0,
    //   bumpYellowCount: -1
    // })

    return {
      statusCode: 200,
      body: JSON.stringify({
        [moduleName]: {
          ...streamlinedModule,
          prompt,
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
      response: typeof response === 'string' ? response.slice(0, 500) : 'unavailable',
      lessonSignature: lesson ? generateSignature(JSON.stringify(lesson).slice(0, 500)) : 'unavailable'
    })

    return {
      statusCode: 500,
      body: JSON.stringify({
        [MODULE_NAME.ERROR_MODULE]: {
          error: (err as Error).message,
          moduleName,
          debug: {
            prompt,
            fieldCount,
            errorLabel
          }
        }
      })
    }
  }
}

export { handler }
