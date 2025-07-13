// shared/getModuleContent.ts
import { fetchOpenAI } from './fetchLLM.js'
import { getPrompt_cb } from './getPrompt_cb.js'
import { validateModule } from './validateModule.js'
import { streamlineModule } from './streamlineModule.js'
import { getPaywall, upsertPaywall } from './paywall.js'
import {
  defaultPrompt,
  type ErrorLabel,
  type Lesson,
  type ModuleName,
  type Prompt,
  type Module,
  defaultModule
} from './cknTypes/types.js'
import { ERROR_LABEL, FIELD_COUNT, MODULE_NAME } from './cknTypes/constants.js'

export const getModuleContent = async (
  lesson: Lesson,
  moduleName: ModuleName
): Promise<Module | null> => {
  let prompt: Prompt = defaultPrompt
  let response: string = ''
  let fieldCount: number = FIELD_COUNT[moduleName]
  let errorLabel: ErrorLabel = ERROR_LABEL[moduleName]

  const { success, data: paywall, error } = await getPaywall(lesson.clientUUID)
  if (!success || !paywall) {
    console.error('[getModuleContent] Paywall fetch failed:', error)
    return null
  }

  console.log('getModuleContent - Paywall', paywall)

  if (paywall.paywall_package_green_remaining <= 0) {
    console.error('[getModuleContent] No green package credits remaining')
    return null
  }

  ;({ prompt, fieldCount, errorLabel } = getPrompt_cb({
    moduleName,
    lesson,
    errors: []
  }))

  response = await fetchOpenAI({
    lessonId: lesson.id,
    clientUUID: lesson.clientUUID,
    prompt
  })

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

    response = await fetchOpenAI({
      lessonId: lesson.id,
      clientUUID: lesson.clientUUID,
      prompt
    })

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

  // This part is tricky. Yes, I am create a lesson above
  // driven by my using [moduleName], but the kicker is that
  // I don't know what moduleName is involved. Obviously,
  // I can check for the same, and maybe I should. My problem
  // is that I don't know whether the MODULE_NAME.DIALOG_DRAFT
  // is historical content (from a previous ask) or in the
  // immediate, i.e., what I am asking about now. I will say
  // that by my creating a new lesson and THEN extracting
  // the prose, then I just performed some coding magic that
  // always (and I mean always) gives me the right answer as
  // to the value of prose.

  const prose = updatedLesson[MODULE_NAME.DIALOG_DRAFT]?.lines?.join(' ') ?? ''

  if (paywall.paywall_package_green_remaining > 0) {
    console.log('getModuleContent - upsertPaywall')

    const { success, error } = await upsertPaywall(lesson.clientUUID, {
      ...paywall,
      paywall_package_green_remaining: paywall.paywall_package_green_remaining - 1
    })
    if (!success) {
      console.error('[getModuleContent] upsertPaywall failed:', error)
      return null
    }

  }

  return {
      ...defaultModule,
      ...streamlinedModule,
      prompt,
      moduleProse: prose
  }
}
