import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const voiceMap = {
  M: 'es-US-Wavenet-B',
  F: 'es-US-Wavenet-A'
}

const bucketName = 'tts-cache'

const handler: Handler = async (event) => {
  try {
    const { text, gender = 'M', languageCode = 'es-US', maxCount = 1, cutoff = false } = JSON.parse(event.body || '{}')

    if (cutoff) {

      console.log(`Issue No 1, Cut-off engaged.`)

      return {
        statusCode: 400, 
        body: JSON.stringify({ 
          error: 'Cut-off engaged.'
        })
      }
    }

    if (maxCount <= 0) {

      console.log(`Issue No 2, maxCount exceeded.`)

      return {
        statusCode: 401, 
        body: JSON.stringify({ 
          error: 'maxCount exceeded'
        })
      }
    }

    if (!text) {

      console.log(`Issue No 3 with generate-tts-cache: ${text}, ${gender}, ${languageCode}`)

      return {
        statusCode: 402, 
        body: JSON.stringify({ 
          error: 'Missing text'
        })
      }
    }

    const normalized = text.trim().toLowerCase()
    const signature = crypto.createHash('sha256').update(normalized).digest('hex')
    const voice = voiceMap[gender] || voiceMap.M
    const filePath = `${signature}.mp3`

    // 0. Introduce a short randomized delay to spread load
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200)) // 200–400ms jitter

    // 1. Try cache hit
    const { data: cachedData, error: lookupError } = await supabase
      .rpc('ckn_lookup_tts_cache', { arg_tts_cache_signature: signature })

    const { data: existingFile } = await supabase
      .storage
      .from(bucketName)
      .list('', { search: filePath })

    if (!lookupError && cachedData && existingFile?.length) {
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          audioUrl: data?.publicUrl,
          cacheStatus: 'hit'
        })
      }
    }

    // 2. Call Google TTS
    const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TTS_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { ssml: `<speak>${text}</speak>` },
        voice: { languageCode, name: voice },
        audioConfig: { audioEncoding: 'MP3', speakingRate: 0.9 }
      })
    })

    if (!res.ok) {
      const error = await res.text()
      console.log(`Issue No 2 with generate-tts-cache: ${error}`)

      return { 
        statusCode: res.status, 
        body: JSON.stringify({
          error: `TTS API error: ${error}`
        })
      }
    }

    const { audioContent } = await res.json()
    const audioBuffer = Buffer.from(audioContent, 'base64')

    // 2+. Introduce a short randomized delay to spread load
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 200)) // 200–400ms jitter

    // 3. Upload MP3 to Supabase
    const { error: uploadError } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: true
      })

    if (uploadError) {
      console.log(`Issue No 3 with generate-tts-cache: ${uploadError.message}`)

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: `Storage error: ${uploadError.message}`
        })
      }
    }

    // 3+. Introduce a short randomized delay to spread load
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 200)) // 200–400ms jitter

    // 4. Insert metadata
    await supabase.rpc('ckn_insert_tts_cache', {
      arg_tts_cache_signature: signature,
      arg_tts_cache_text: normalized,
      arg_tts_cache_voice: voice,
      arg_tts_cache_language: languageCode
    })

    // 5. Return MP3 URL
    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)
    console.log(`Cache HIT with generate-tts-cache: ${data?.publicUrl}`)

    return {
      statusCode: 200,
      body: JSON.stringify({
        audioUrl: data?.publicUrl,
        cacheStatus: 'miss'
      })
    }

  } catch (err) {
      console.log(`Issue No 4 with generate-tts-cache: ${err instanceof Error ? err.message : 'Unknown error'}`)

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: `TTS Server error: ${err instanceof Error ? err.message : 'Unknown error'}`
        })
      }
  }
}

export { handler }
