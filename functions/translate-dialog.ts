import { type Handler } from '@netlify/functions'

type TranslationResponse = {
  data: {
    translations: { translatedText: string }[]
  }
}

const handler: Handler = async (event) => {
  try {
    const { lines } = JSON.parse(event.body ?? '{}')

    if (!Array.isArray(lines) || lines.length === 0) {
      return {
        statusCode: 400,
        body: 'Missing or invalid "lines" array.'
      }
    }

    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      return {
        statusCode: 500,
        body: 'Missing Google API key.'
      }
    }

    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: lines,
          source: 'es',
          target: 'en',
          format: 'text'
        })
      }
    )

    if (!res.ok) {
      const error = await res.text()
      return {
        statusCode: res.status,
        body: `Google Translate API error: ${error}`
      }
    }

    const { data: translationData } = await res.json() as TranslationResponse
    const translations = translationData.translations.map(t => t.translatedText)

    return {
      statusCode: 200,
      body: JSON.stringify({ translations })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error translating: ${(err as Error).message}`
    }
  }
}

export { handler }
