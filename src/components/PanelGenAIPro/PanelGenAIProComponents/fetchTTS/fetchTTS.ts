import type { FetchTTSProps, FetchTTSResult } from '@cknTypes/types'
import { cleanTextForTTS } from '@components/Util';

export async function fetchTTS({
  text,
  speaker,
  gender,
  maxCount,
  setMaxCount,
  cutoff,
  language //,
  // debugLog
}: FetchTTSProps): Promise<FetchTTSResult> {
  if (!text || cutoff || maxCount <= 0) return null

  setMaxCount(prev => prev-1)

  const processedText = cleanTextForTTS(text);

  // cXonsole.log('processed text', processedText)
  
  try {
    // cXonsole.log(`Pause before ask generate-tts-cache: ${text}`)
    // await new Promise(resolve => setTimeout(resolve, 2000)) // 200–400ms jitter
    
    const res = await fetch('/.netlify/functions/generate-tts-cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: processedText, speaker, gender, maxCount, cutoff, language })
    })
    
    // const { audioUrl } = await res.json()
    // const { audioUrl, cacheStatus } = await res.json()
    // debugLog(`TTS (${cacheStatus}): ${text}`)

    const { audioUrl, decremented } = await res.json()

    if (decremented) {
      refreshPaywall() // your client-side re-check function
    }


    return audioUrl ?? null
  } catch (err) {
    console.error('TTS fetch failed:', err)
    return null
  }
}
