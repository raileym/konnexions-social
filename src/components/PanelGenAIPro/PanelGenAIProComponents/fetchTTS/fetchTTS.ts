// shared/tts/fetchTTS.ts
export async function fetchTTS({
  text,
  gender = 'M',
  maxCount,
  cutoff
}: {
  text: string
  gender?: string
  maxCount: number
  cutoff: boolean
}): Promise<string | null> {
  if (!text || cutoff || maxCount <= 0) return null

  try {
    console.log(`Pause before ask generate-tts-cache: ${text}`)
    await new Promise(resolve => setTimeout(resolve, 2000)) // 200–400ms jitter
    console.log(`Now ask ask generate-tts-cache: ${text}`)

    const res = await fetch('/.netlify/functions/generate-tts-cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, gender, maxCount, cutoff })
    })

    const { audioUrl } = await res.json()
    return audioUrl ?? null
  } catch (err) {
    console.error('TTS fetch failed:', err)
    return null
  }
}
