const fetchAudio = async (text: string, gender: 'M' | 'F') => {
  const response = await fetch('/.netlify/functions/generate-tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, gender })
  })

  const data = await response.json()
  return `data:audio/mp3;base64,${data.audioContent}`
}

export default fetchAudio