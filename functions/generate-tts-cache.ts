import { GENDER } from '../shared/cknTypes/constants.js'
import { type Handler } from '@netlify/functions'
import { getVoiceForSpeaker } from '../shared/getVoiceForSpeaker.js'
import { getPaywall } from '../shared/supabase/paywall.js'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const GOOGLE_LANGUAGE_MAP: Record<string, string> = {
  es: 'es-US',
  en: 'en-US',
  fr: 'fr-FR',
  it: 'it-IT'
}

const bucketName = 'tts-cache'

const handler: Handler = async (event) => {
  try {
    const { text, speaker, gender = GENDER.M, language = 'es', clientUUID, cutoff = false } = JSON.parse(event.body || '{}')

    if (cutoff) {
      return {
        statusCode: 400, 
        body: JSON.stringify({ error: 'Cut-off engaged.' })
      }
    }

    if (!text) {
      return {
        statusCode: 402, 
        body: JSON.stringify({ error: 'Missing text' })
      }
    }

    if (!clientUUID) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing clientUUID' })
      }
    }

    const { success, data: paywall, error: paywallError } = await getPaywall(clientUUID)

    if (!success || !paywall) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: paywallError || 'Unable to retrieve paywall data' })
      }
    }

    const languageCode = GOOGLE_LANGUAGE_MAP[language] || 'es-US'
    const voice = getVoiceForSpeaker({speaker, language, gender})
    const normalized = `${voice}:${text.trim().toLowerCase()}`
    const signature = crypto.createHash('sha256').update(normalized).digest('hex')
    const filePath = `${signature}.mp3`

    const { data: cachedData, error: lookupError } = await supabase
      .rpc('ckn_lookup_tts_cache', { arg_tts_cache_signature: signature })

    const { data: existingFile, error: fileError } = await supabase
      .storage
      .from(bucketName)
      .list('', { search: filePath })

    const isCacheMetaHit = (cachedData?.length ?? 0) > 0
    const isAudioFileHit = (existingFile?.length ?? 0) > 0

    if (!lookupError && isCacheMetaHit && isAudioFileHit) {
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          audioUrl: data?.publicUrl,
          cacheStatus: 'hit',
          decremented: false
        })
      }
    }

    if (paywall.paywall_package_yellow_remaining <= 0) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'No yellow package credits remaining' })
      }
    }

    const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_API_KEY}`, {
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
      return { 
        statusCode: res.status, 
        body: JSON.stringify({ error: `TTS API error: ${error}` })
      }
    }

    const { audioContent } = await res.json() as { audioContent: string }
    const audioBuffer = Buffer.from(audioContent, 'base64')

    const { error: uploadError } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: true
      })

    if (uploadError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Storage error: ${uploadError.message}` })
      }
    }

    await supabase.rpc('ckn_insert_tts_cache', {
      arg_tts_cache_signature: signature,
      arg_tts_cache_text: normalized,
      arg_tts_cache_voice: voice,
      arg_tts_cache_language: language
    })

    await supabase.rpc('ckn_bump_paywall_package_counts', {
      arg_client_uuid: clientUUID,
      arg_bump_green_count: 0,
      arg_bump_yellow_count: -1
    })

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)

    return {
      statusCode: 200,
      body: JSON.stringify({
        audioUrl: data?.publicUrl,
        cacheStatus: 'miss',
        decremented: true
      })
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `TTS Server error: ${err instanceof Error ? err.message : 'Unknown error'}`
      })
    }
  }
}

export { handler }
