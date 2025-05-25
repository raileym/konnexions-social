import { Handler } from '@netlify/functions'
import { validateGenAIResponse } from '../shared/errorUtils'
import { Dialog, ERROR_LABEL } from '../shared/types'
import { generatePromptSet } from '../shared/generatePromptSet'

const handler: Handler = async (event) => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      body: 'Missing OpenAI API key in environment'
    }
  }

  try {
    const { language, scenarioLabel, scenarioParticipantList } = JSON.parse(event.body ?? '{}')

    if (!language || !scenarioLabel || !scenarioParticipantList) {
      console.log('Missing the big three')
      console.log(`language: ${language}`)
      console.log(`scenarioLabel: ${scenarioLabel}`)
      console.log(`scenarioParticipantList: ${scenarioParticipantList}`)
      
      return {
        statusCode: 400,
        body: 'Missing one or more required fields: language, scenarioLabel, participant'
      }
    }

    console.log(`language: ${language}`)
    console.log(`scenarioLabel: ${scenarioLabel}`)
    console.log(`scenarioParticipantList: ${scenarioParticipantList}`)

    const promptSet = generatePromptSet()

    const dialogPrompt = promptSet.dialogPrompt({language, scenarioLabel, scenarioParticipantList})

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

    const replies = [
      [
        "Anfitriona| ¡Bienvenidos a nuestro restaurante! ¿Cuántos son en su grupo?",
        "Mesera| Aquí están los menús. ¿Les traigo algo de beber para comenzar?",
        "Comensal| Quisiera el filete, por favor."
      ],
      [
        "Mesera| Buenas tardes, ¿qué desea tomar?",
        "Comensal| Una limonada, por favor.",
        "Mesera| En seguida."
      ],
      [
        "Mesera| ¿Desea ver el menú del día?",
        "Comensal| Sí, por favor.",
        "Mesera| Tenemos sopa de verduras y pollo al horno."
      ]
    ]

    const randomIndex = Math.floor(Math.random() * replies.length)
    const reply = JSON.stringify(replies[randomIndex])

    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${apiKey}`,
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-3.5-turbo',
    //     messages: [{ role: 'user', content: dialogPrompt }]
    //   })
    // })

    // const data = await response.json()
    // const reply = data.choices?.[0]?.message?.content || ''

    console.log('Before validation')
    console.log(reply)

    const result = validateGenAIResponse<Dialog>({
      response: reply,
      errorLabel: ERROR_LABEL.DIALOG_ERROR,
      expectedFieldCount: 2,
      language
      // prompt
    })    

    console.log('After validation')
    console.log(reply)

    return {
      statusCode: 200,
      body: JSON.stringify({ prompt: dialogPrompt, result })
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
