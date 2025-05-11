// src/App.tsx
import React, { useState, useEffect } from 'react'

const App: React.FC = () => {
  const [useCloudTTS, setUseCloudTTS] = useState(true)
  const [inputText, setInputText] = useState('')
  const [cleanedText, setCleanedText] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [maskKey, setMaskKey] = useState(false)

  useEffect(() => {
    const handleVoiceLoad = () => {
      const voices = window.speechSynthesis.getVoices()
      console.log('[Chrome] Voices loaded:', voices.map(v => v.lang + ' - ' + v.name))
    }

    window.speechSynthesis.onvoiceschanged = handleVoiceLoad
    handleVoiceLoad()
    const storedKey = localStorage.getItem('gcpTTSKey')
    if (storedKey) {
      setApiKey(storedKey)
      setMaskKey(true)
    }
  }, [])

  const cleanText = (text: string) => {
    return text.trim().replace(/[¡¿]/g, '')
  }

  const handleKeyChange = (value: string) => {
    setApiKey(value)
    setMaskKey(false)
  }

  const handleKeyBlur = () => {
    if (apiKey) {
      localStorage.setItem('gcpTTSKey', apiKey)
      setMaskKey(true)
    }
  }

  const handleClearKey = () => {
    localStorage.removeItem('gcpTTSKey')
    setApiKey('')
    setMaskKey(false)
  }

  const handleGenerate = async () => {
    const cleaned = cleanText(inputText)
    setCleanedText(cleaned)

    if (!useCloudTTS || !apiKey) {
      const synth = window.speechSynthesis
      const voices = synth.getVoices()

      const speakText = () => {
        const updatedVoices = synth.getVoices()
        const spanishVoice = updatedVoices.find(v => v.lang.startsWith('es')) || updatedVoices[0]
        const utterance = new SpeechSynthesisUtterance(cleaned)
        utterance.voice = spanishVoice
        utterance.lang = spanishVoice.lang
        utterance.rate = 0.9
        synth.speak(utterance)
      }

      if (!voices.length) {
        synth.onvoiceschanged = speakText
        return
      }

      speakText()
      return
    }

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
        {apiKey && useCloudTTS
          ? <div className="mb3 light-green">🎧 Enhanced voice mode active</div>
          : <div className="mb3 orange">🗣️ Using your browser’s built-in voice</div>
        }
        <label className="db mb2 f6">
          <input
            type="checkbox"
            checked={useCloudTTS}
            onChange={(e) => setUseCloudTTS(e.target.checked)}
            className="mr2"
          />
          Use enhanced voice if available
        </label>
        <h1 className="f2 dark-gray mb3">Let's connect!</h1>

        <label className="db mb2 f6">Google API Key</label>
        <input
          type={maskKey ? 'password' : 'text'}
          value={apiKey}
          onChange={(e) => handleKeyChange(e.target.value)}
          onBlur={handleKeyBlur}
          placeholder="Enter your API key"
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
        />
        <button
          onClick={handleClearKey}
          className="bg-light-red white pa2 br2 pointer db w-100 tc mb3"
        >
          Clear API Key
        </button>

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
        <button
          onClick={() => {
            const synth = window.speechSynthesis

            const speakNow = () => {
              const voices = synth.getVoices()
              const spanishVoice = voices.find(v => v.lang.startsWith('es')) || voices.find(v => v.lang.startsWith('en')) || voices[0]
              const utterance = new SpeechSynthesisUtterance("¡Buenos días! Bienvenido a 'Let's Connect!'")
              utterance.voice = spanishVoice
              utterance.lang = spanishVoice.lang
              utterance.rate = 0.9
              synth.speak(utterance)
            }

            if (synth.getVoices().length > 0) {
              speakNow()
            } else {
              synth.onvoiceschanged = speakNow
            }
          }}
          className="bg-green white pa2 br2 pointer db w-100 tc mt3"
        >
          Welcome (Local TTS)
        </button>
      </section>
    </main>
  )
}

export default App
