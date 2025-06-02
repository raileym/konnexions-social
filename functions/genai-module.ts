import { Handler } from '@netlify/functions'
import { generateSignature } from '../shared/generateSignature'
import { generateExample } from '../shared/generateExample'
import { fetchOpenAI } from '../shared/fetchLLM'
import { getPrompt } from '../shared/getPrompt'
import { validateModule } from '../shared/validateModule'
import { Lesson } from '../shared/types'
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
      console.log(`language: ${lesson.language}`)
      console.log(`scenarioLabel: ${lesson.scenarioLabel}`)
      console.log(`participantList: ${lesson.participantList}`)
      return {
        statusCode: 401,
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
      language: lesson.language
    })

    console.log('validModule', JSON.stringify(validModule.lines))

    const streamlinedModule = streamlineModule({moduleName, module: validModule})

    console.log('streamlinedModule', JSON.stringify(streamlinedModule.lines))

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

    console.log('updatedLesson', JSON.stringify(updatedLesson, null, 2))

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
