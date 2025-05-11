// src/App.tsx
import React, { useState } from 'react'

const App: React.FC = () => {
  const [inputText, setInputText] = useState('')
  const [cleanedText, setCleanedText] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')

  const cleanText = (text: string) => {
    return text.trim().replace(/[\u00A1\u00BF]/g, '')
  }

  const handleGenerate = async () => {
    const cleaned = cleanText(inputText)
    setCleanedText(cleaned)

    try {
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: { ssml: `<speak>${cleaned}</speak>` },
            voice: {
              languageCode: 'es-US',
              name: 'es-US-Wavenet-B',
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: 0.9,
            },
          }),
        }
      )

      const data = await response.json()
      setAudioUrl(`data:audio/mp3;base64,${data.audioContent}`)
    } catch (error) {
      console.error('Error generating speech:', error)
    }
  }

  return (
    <main className="pa4 sans-serif bg-light-gray min-vh-100">
      <section className="mw6 center bg-white pa3 br3 shadow-5">
        <h1 className="f2 dark-gray mb3">Hello, world</h1>

        <label className="db mb2 f6">Google API Key</label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          className="input-reset ba b--black-20 pa2 mb3 db w-100"
        />

        <label className="db mb2 f6">Spanish Input</label>
        <textarea
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter Spanish text..."
          className="input-reset ba b--black-20 pa2 mb3 db w-100"
        />

        <button
          onClick={handleGenerate}
          className="bg-dark-blue white pa2 br2 pointer db w-100 tc mb3"
        >
          Clean and Speak
        </button>

        {cleanedText && (
          <div className="mv3">
            <p className="f6 silver mb1">Cleaned Text</p>
            <p>{cleanedText}</p>
          </div>
        )}

        {audioUrl && (
          <div className="mt3">
            <audio controls src={audioUrl} className="w-100" />
          </div>
        )}
      </section>
    </main>
  )
}

export default App
