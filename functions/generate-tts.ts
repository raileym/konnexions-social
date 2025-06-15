import { type Handler } from '@netlify/functions'

const handler: Handler = async (event) => {
  try {
    const { text, gender = 'M', languageCode = 'es-US' } = JSON.parse(event.body || '{}')

    if (!text) {
      return { statusCode: 400, body: 'Missing text' }
    }

    const voiceMap = {
      M: 'es-US-Wavenet-B',
      F: 'es-US-Wavenet-A'
    }

    const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TTS_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { ssml: `<speak>${text}</speak>` },
        voice: {
          languageCode,
          name: voiceMap[gender] || voiceMap.M
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 0.9
        }
      })
    })

    if (!res.ok) {
      const error = await res.text()
      return { statusCode: res.status, body: `TTS API error: ${error}` }
    }

    const { audioContent } = await res.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ audioContent })
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: `TTS Server error: ${err instanceof Error ? err.message : 'Unknown error'}`
    }
  }
}

export { handler }
