import { Handler } from '@netlify/functions'
import { validateGenAIResponse } from '../shared/errorUtils'
import { ERROR_LABEL, Nouns } from '../shared/types'
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
    const { dialog, language, dialogSignature } = JSON.parse(event.body ?? '{}')

    if (!dialog || !language || !dialogSignature) {
      console.log('Missing the big three')
      console.log(`language: ${language}`)
      console.log(`dialog: ${dialog}`)
      console.log(`dialogSignature: ${dialogSignature}`)

      return {
        statusCode: 400,
        body: 'Missing one or more required fields: language, dialog'
      }
    }

    console.log(`language: ${language}`)
    console.log(`dialog: ${dialog}`)
    console.log(`dialogSignature: ${dialogSignature}`)

    const promptSet = generatePromptSet()

    const nounsPrompt = promptSet.getNounsPrompt({language, dialog})

    // const alwaysTrue = true
    // if (alwaysTrue) {
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify({
    //       prompt: nounsPrompt,
    //       result: {
    //         success: true,
    //         parsed: [
    //           "masculino|restaurante|restaurantes|a, en, desde",
    //           "femenino|mesera|meseras|con, de, para",
    //           "masculino|grupo|grupos|en, con, para"
    //         ],
    //         errors: []
    //       }
    //     })
    //   }
    // }

    // const reply = JSON.stringify([
    //   "masculino|restaurante|restaurantes|a, en, desde",
    //   "femenino|mesera|meseras|con, de, para",
    //   "masculino|grupo|grupos|en, con, para"
    // ])

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: nounsPrompt }]
      })
    })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || ''

    const nounsResult = validateGenAIResponse<Nouns>({
      response: reply,
      errorLabel: ERROR_LABEL.NOUNS_ERROR,
      expectedFieldCount: 4,
      language
      // prompt
    })    

    // In short, I am carrying along the signature
    // for the dialog, lining up this response
    // about nouns with the incoming dialog.
    const nounsSignature = dialogSignature

    return {
      statusCode: 200,
      body: JSON.stringify({ nounsPrompt, nounsResult, nounsSignature })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error generating dialog: ${(err as Error).message}`
    }
  }
}

export { handler }
