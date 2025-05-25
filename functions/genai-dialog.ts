import { Handler } from '@netlify/functions'
import { validateGenAIResponse } from '../shared/errorUtils'
import { Dialog, ERROR_LABEL } from '../shared/types'

const handler: Handler = async (event) => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      body: 'Missing OpenAI API key in environment'
    }
  }

  try {
    const { language, scenarioLabel, scenarioParticipant } = JSON.parse(event.body ?? '{}')

    if (!language || !scenarioLabel || !scenarioParticipant) {
      console.log('Missing the big three')
      return {
        statusCode: 400,
        body: 'Missing one or more required fields: language, scenarioLabel, participant'
      }
    }

    console.log(`language: ${language}`)
    console.log(`scenarioLabel: ${scenarioLabel}`)
    console.log(`scenarioParticipant: ${scenarioParticipant}`)

    const prompt = `Create a dialog in ${language} appropriate for a beginning language
instruction, where the dialog takes place ${scenarioLabel}
between participants, ${scenarioParticipant}.
Use between 6 to 8 sentences for this dialog.

RESPONSE: Express your response using well-formed JSON only, with no trailing
commas, no single quotes (use double quotes only), no Markdown wrappers, no
comments, no explanatory text or prose or partial JSON blocks, and no headings
or titles. The output must be a single valid JSON array, starting
with [ and ending with ]. Do not prepend phrases like \u201cHere is your JSON:\u201d.
Assume the consumer is a machine expecting strict JSON compliance.

Note, a dialog response is an array of strings that take the form,

    "Participant| Line from the dialog"

where the vertical bar "|" delineates the two fields.`

    // const alwaysTrue = true
    // if (alwaysTrue) {
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify({
    //       prompt,
    //       result: {
    //         success: true,
    //         parsed: [
    //           "Anfitriona| ¡Bienvenidos a nuestro restaurante! ¿Cuántos son en su grupo?",
    //           "Mesera| Aquí están los menús. ¿Les traigo algo de beber para comenzar?",
    //           "Comensal| Quisiera el filete, por favor."
    //         ],
    //         errors:[]
    //       }
    //     })
    //   }            
    // }

    // const reply = JSON.stringify(
    //   [
    //     "Anfitriona| ¡Bienvenidos a nuestro restaurante! ¿Cuántos son en su grupo?",
    //     "Mesera| Aquí están los menús. ¿Les traigo algo de beber para comenzar?",
    //     "Comensal| Quisiera el filete, por favor."
    //   ]
    // )

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || ''

    const result = validateGenAIResponse<Dialog>({
      response: reply,
      errorLabel: ERROR_LABEL.DIALOG_ERROR,
      expectedFieldCount: 2,
      language
      // prompt
    })    

    return {
      statusCode: 200,
      body: JSON.stringify({ prompt, result })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error generating dialog: ${(err as Error).message}`
    }
  }
}

export { handler }
