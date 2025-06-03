import type { Handler } from '@netlify/functions'

const GOOGLE_TTS_ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize'

export const handler: Handler = async (event) => {
  const GOOGLE_TTS_KEY = process.env.GOOGLE_TTS_KEY
  if (!GOOGLE_TTS_KEY) {
    return {
      statusCode: 500,
      body: 'Missing GOOGLE_TTS_KEY in environment'
    }
  }

  const { lines } = JSON.parse(event.body || '{}')
  if (!Array.isArray(lines)) {
    return {
      statusCode: 400,
      body: 'Missing or invalid lines array'
    }
  }

  const results = await Promise.all(
    lines.map(async (line: string, index: number) => {
      const [gender, speaker, text] = line.split('|')
      const voiceName = gender === 'F' ? 'es-US-Wavenet-A' : 'es-US-Wavenet-B'

      const body = {
        input: { ssml: `<speak>${text}</speak>` },
        voice: {
          languageCode: 'es-US',
          name: voiceName
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 0.9
        }
      }

      const res = await fetch(`${GOOGLE_TTS_ENDPOINT}?key=${GOOGLE_TTS_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        const errorText = await res.text()
        return { error: true, line, reason: errorText }
      }

      const { audioContent } = await res.json()
      return {
        id: index,
        speaker,
        gender,
        audioBase64: audioContent
      }
    })
  )

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, results })
  }
}
