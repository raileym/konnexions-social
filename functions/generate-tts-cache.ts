import { type Handler } from '@netlify/functions'
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

      console.log('Issue No 1, Cut-off engaged.')

      return {
        statusCode: 400, 
        body: JSON.stringify({ 
          error: 'Cut-off engaged.'
        })
      }
    }

    if (maxCount <= 0) {

      console.log('Issue No 2, maxCount exceeded.')

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

    const { data: cachedData, error: lookupError } = await supabase
      .rpc('ckn_lookup_tts_cache', { arg_tts_cache_signature: signature })

    const { data: existingFile, error: fileError } = await supabase
      .storage
      .from(bucketName)
      .list('', { search: filePath })

    const isCacheMetaHit = (cachedData?.length ?? 0) > 0
    const isAudioFileHit = (existingFile?.length ?? 0) > 0

    if (!lookupError) {
      if (!isCacheMetaHit) {
        console.warn(`🔍 No metadata row found in ckn_tts_cache for: ${text} (${signature})`)
      }
    } else {
      console.error('🧨 Supabase RPC error from ckn_lookup_tts_cache:', lookupError)
    }

    if (fileError) {
      console.error('🧨 Supabase Storage error:', fileError)
    } else if (!isAudioFileHit) {
      console.warn(`🔍 No audio file found in bucket for: ${filePath}`)
    }

    if (!lookupError && isCacheMetaHit && isAudioFileHit) {

      console.log(`Cache HIT (${maxCount}): ${text}`)

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
    // await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 200)) // 200–400ms jitter

    console.log(`Cache STORE: ${text}`)

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
    // await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 200)) // 200–400ms jitter

    console.log(`Supabase cache STORE META: ${text}`)

    // 4. Insert metadata
    await supabase.rpc('ckn_insert_tts_cache', {
      arg_tts_cache_signature: signature,
      arg_tts_cache_text: normalized,
      arg_tts_cache_voice: voice,
      arg_tts_cache_language: languageCode
    })

    const { error: insertError } = await supabase.rpc('ckn_insert_tts_cache', {
      arg_tts_cache_signature: signature,
      arg_tts_cache_text: normalized,
      arg_tts_cache_voice: voice,
      arg_tts_cache_language: languageCode
    })

    if (insertError) {
      console.log(`Issue No 5: Insert failed for ${text}: ${insertError.message}`)
    } else {
      console.log(`Supabase cache INSERT META success: ${text}`)
    }

    // 5. Return MP3 URL
    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)
    console.log(`Cache MISS: ${text}`)

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
