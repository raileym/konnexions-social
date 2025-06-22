import type { FetchTTSProps, FetchTTSResult } from '@cknTypes/types'

export async function fetchTTS({
  text,
  speaker,
  gender,
  maxCount,
  setMaxCount,
  cutoff,
  language,
  debugLog
}: FetchTTSProps): Promise<FetchTTSResult> {
  if (!text || cutoff || maxCount <= 0) return null

  setMaxCount(prev => prev-1)

  try {
    // cXonsole.log(`Pause before ask generate-tts-cache: ${text}`)
    // await new Promise(resolve => setTimeout(resolve, 2000)) // 200–400ms jitter
    
    const res = await fetch('/.netlify/functions/generate-tts-cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, speaker, gender, maxCount, cutoff, language })
    })
    
    const { audioUrl, cacheStatus } = await res.json()
    debugLog(`TTS (${cacheStatus}): ${text}`)

    return audioUrl ?? null
  } catch (err) {
    console.error('TTS fetch failed:', err)
    return null
  }
}
