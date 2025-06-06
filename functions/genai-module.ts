import { Handler } from '@netlify/functions'
import { generateSignature } from '../shared/generateSignature'
import { generateExample } from '../shared/generateExample'
import { fetchOpenAI } from '../shared/fetchLLM'
import { getPrompt } from '../shared/getPrompt'
import { validateModule } from '../shared/validateModule'
import { defaultErrorLabel, defaultFieldCount, defaultModule, defaultPrompt, ErrorLabel, Lesson, Module, Prompt } from '../shared/types'
import { streamlineModule } from '../shared/streamlineModule'

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
      console.log('Missing one or more of the smaller three')
      // console.log(`language: ${lesson.language}`)
      // console.log(`scenarioLabel: ${lesson.scenarioLabel}`)
      // console.log(`participantList: ${lesson.participantList}`)
      console.log('lesson', JSON.stringify(lesson, null, 2))
      return {
        statusCode: 401,
        body: 'Lesson is missing required fields'
      }
    }

    let prompt: Prompt = defaultPrompt
    let fieldCount: number = defaultFieldCount
    let errorLabel: ErrorLabel = defaultErrorLabel

    ;({ prompt, fieldCount, errorLabel } = getPrompt({moduleName, lesson, errors: [] }))

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

    let validModule: Partial<Module> = defaultModule

    validModule = validateModule({
      response,
      errorLabel,
      fieldCount,
      language: lesson.language,
      moduleName
    })

    if (!validModule.success) {

      ;({ prompt, fieldCount, errorLabel } = getPrompt({moduleName, lesson, errors: validModule.errors ?? []}))

      if (testMode) {
        response = generateExample({
          language: lesson.language,
          moduleName,
          options: { asString: true }
        })
      } else {
        response = await fetchOpenAI({ prompt })
      }

      validModule = validateModule({
        response,
        errorLabel,
        fieldCount,
        language: lesson.language,
        moduleName
      })
    }

    if (!validModule.success) {
      console.log('validModule', JSON.stringify(validModule, null, 2))
    }

    const streamlinedModule = streamlineModule({moduleName, module: validModule})

    // console.log('streamlinedModule', JSON.stringify(streamlinedModule.lines))

    // First, I add my validModule to the incoming Lesson. Our goal is not
    // only add the validModule, but also add the Dialog's validModule, if
    // we happen to be dealing with that module here. Following this
    // assignment, we create prose for the dialog and (most important) 
    // the signature for this prose. All modules proceed similarly. This
    // logic applies to all modules (Yay! Including the dialog module).

    const updatedLesson: Lesson = {
      ...lesson,
      [moduleName]: {
        ...streamlinedModule,
        prompt
      }      
    }

    if (!validModule.success) {
      console.log('updatedLesson', JSON.stringify(updatedLesson, null, 2))
    }

    // We capture the signature, but don't bother
    // with the prose. Post handleModule in the vacinity
    // of the nouns logic is where we assign prose.

    const prose = updatedLesson.dialog.lines.join(' ')
    const signature = generateSignature(prose)

    console.log(`${moduleName}: ${signature}`)

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
    console.log('Whoop! We have a problem here server-side.')
    return {
      statusCode: 500,
      body: `Error generating dialog: ${(err as Error).message}`
    }
  }
}

export { handler }
