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
    const { dialog, language } = JSON.parse(event.body ?? '{}')

    if (!dialog || !language) {
      console.log('Missing the big two')
      return {
        statusCode: 400,
        body: 'Missing one or more required fields: language, scenarioLabel, participant'
      }
    }

    console.log(`dialog: ${dialog}`)

    const promptSet = generatePromptSet()

    const dialogPrompt = promptSet.nounsPrompt({dialog})

    const alwaysTrue = true
    if (alwaysTrue) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          prompt,
          result: {
            success: true,
            parsed: [
              "masculino|restaurante|restaurantes|a, en, desde",
              "femenino|mesera|meseras|con, de, para",
              "masculino|grupo|grupos|en, con, para"
            ],
            errors: []
          }
        })
      }
    }

    const reply = JSON.stringify([
      "masculino|restaurante|restaurantes|a, en, desde",
      "femenino|mesera|meseras|con, de, para",
      "masculino|grupo|grupos|en, con, para"
    ])

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

    const result = validateGenAIResponse<Dialog>({
      response: reply,
      errorLabel: ERROR_LABEL.DIALOG_ERROR,
      expectedFieldCount: 2,
      language
      // prompt
    })    

    return {
      statusCode: 200,
      body: JSON.stringify({ prompt: dialogPrompt, result })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error generating dialog: ${(err as Error).message}`
    }
  }
}

export { handler }
