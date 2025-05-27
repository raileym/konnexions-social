import { Handler } from '@netlify/functions'
import { validateGenAIResponse } from '../shared/errorUtils'
import { ERROR_LABEL, Language, NounsReview } from '../shared/types'
import { generatePromptSet } from '../shared/generatePromptSet'
import { generateExample } from '../shared/generateExample'

const handler: Handler = async (event) => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      body: 'Missing OpenAI API key in environment'
    }
  }

  try {
    const { nounsArray, language, dialogSignature } = JSON.parse(event.body ?? '{}')

    if (!nounsArray || !language || !dialogSignature) {
      console.log('Missing the big three')
      console.log(`language: ${language}`)
      console.log(`nounsArray: ${JSON.stringify(nounsArray, null, 2)}`)
      console.log(`dialogSignature: ${dialogSignature}`)

      return {
        statusCode: 400,
        body: 'Missing one or more required fields: language, nouns'
      }
    }

    console.log(`language: ${language}`)
    console.log(`nounsArray: ${JSON.stringify(nounsArray, null, 2)}`)
    console.log(`dialogSignature: ${dialogSignature}`)

    const promptSet = generatePromptSet()

    const nounsReviewPrompt = promptSet.getNounsReviewPrompt({language, nounsArray})

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

    // const reply = generateExample({language, context: 'nounsReview', options: { asString: true }  })
    // const reply = JSON.stringify([ "No corrections needed" ], null, 2)
    
    // const reply = JSON.stringify([
    //   "Buenas tardes. ¿Qué desea tomar?|Buenas tardes, ¿qué le gustaría tomar?",
    //   "Una limonada, por favor.|Me gustaría una limonada, por favor.",
    //   "En seguida.|En un momento le traigo su bebida."
    // ])

    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${apiKey}`,
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-3.5-turbo',
    //     messages: [{ role: 'user', content: nounsPrompt }]
    //   })
    // })

    // const data = await response.json()
    // const reply = data.choices?.[0]?.message?.content || ''

    const claudeKey = process.env.CLAUDE_API_KEY

    if (!claudeKey) {
      return {
        statusCode: 500,
        body: 'Missing Claude API key in environment'
      }
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': claudeKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [{ role: 'user', content: nounsReviewPrompt }]
      })
    })

    const data = await response.json()
    const reply = data.content?.[0]?.text?.trim() || ''

    console.log("***********************************************")
    console.log(nounsReviewPrompt)
    console.log("***********************************************")
    console.log(JSON.stringify(reply, null, 2))
    console.log("***********************************************")

    const nounsReviewResult = validateGenAIResponse<NounsReview>({
      response: reply,
      errorLabel: ERROR_LABEL.NOUNS_REVIEW_ERROR,
      expectedFieldCount: 4,
      language: '' as Language
    })    

    // In short, I am carrying along the signature
    // for the nouns, lining up this response
    // about nouns with the incoming nouns.
    const nounsReviewSignature = dialogSignature

    console.log(JSON.stringify(nounsReviewResult, null, 2))

    return {
      statusCode: 200,
      body: JSON.stringify({ nounsReviewPrompt, nounsReviewResult, nounsReviewSignature })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error generating nouns: ${(err as Error).message}`
    }
  }
}

export { handler }
