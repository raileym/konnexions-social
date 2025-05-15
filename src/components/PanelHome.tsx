import { useAppContext } from "../context/AppContext"
import { getCurrentWeek } from "./Util"

export default function PanelHome() {
  const {
    inputText,
    setInputText,
    cleanedText,
    audioUrl,
    setAudioUrl,
    setCleanedText,
    useCloudTTS,
    apiKey,
    ttsCharUsage,
    setTtsCharUsage,
    setUseCloudTTS,
  } = useAppContext()

  const incrementTtsCharUsage = (chars: number) => {
    const week = getCurrentWeek()
    const key = `ttsCharUsageW${week}`
    const current = ttsCharUsage + chars
    localStorage.setItem(key, current.toString())
    setTtsCharUsage(current)
  }

  const cleanText = (text: string) => {
    return text.trim().replace(/[¡¿]/g, '')
  }

  const handleWelcome = () => {
    const synth = window.speechSynthesis

    const speakText = () => {
      const voices = synth.getVoices()
      const spanishVoice = voices.find(v => v.lang.startsWith('es')) || voices[0]
      const utterance = new SpeechSynthesisUtterance("¡Buenos días! Bienvenido a Let's Connect!")
      utterance.voice = spanishVoice
      utterance.lang = spanishVoice.lang
      utterance.rate = 0.9
      synth.speak(utterance)
    }

    if (!synth.getVoices().length) {
      synth.onvoiceschanged = speakText
    } else {
      speakText()
    }
  }

  const handleGenerate = async () => {
    const cleaned = cleanText(inputText)
    setCleanedText(cleaned)

    if (!useCloudTTS || !apiKey) {
      const synth = window.speechSynthesis
      const speakText = () => {
        const updatedVoices = synth.getVoices()
        const spanishVoice = updatedVoices.find(v => v.lang.startsWith('es')) || updatedVoices[0]
        const utterance = new SpeechSynthesisUtterance(cleaned)
        utterance.voice = spanishVoice
        utterance.lang = spanishVoice.lang
        utterance.rate = 0.9
        synth.speak(utterance)
      }

      if (!synth.getVoices().length) {
        synth.onvoiceschanged = speakText
        return
      }

      speakText()
      incrementTtsCharUsage(cleaned.length)
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
      incrementTtsCharUsage(cleaned.length)
    } catch (error) {
      console.error('Error generating speech:', error)
    }
  }

  return (
    <div className="absolute z-0 pa4 bg-white top-0 left-0 w-100 h-100 overflow-y-auto">
      <div className="mb5">
        <h2 className="f3 pa3 mt5">Home</h2>

        <label className="db mb2 f6">Enter Spanish text</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          rows={8}
          placeholder="Hola, mundo"
        />
        <button
          onClick={handleGenerate}
          className="bg-blue white pa2 br2 bn pointer db mb3 w-100"
        >
          Clean it
        </button>

        {cleanedText && <div className="pa2 bg-washed-blue mb3">{cleanedText}</div>}
        {audioUrl && (
          <audio controls src={audioUrl} className="db w-100 mb3" />
        )}

        <button
          onClick={() => {
            if (useCloudTTS) {
              setUseCloudTTS(false)
            } else {
              handleWelcome()
            }
          }}
          className={`white pa2 br2 bn pointer db w-100 ${useCloudTTS ? 'bg-green' : 'bg-dark-gray'}`}
        >
          {useCloudTTS ? 'Switch to Local TTS' : 'Play Welcome (Local TTS)'}
        </button>
        <div className="bg-blue white f2 tc mt4 h5">
          Hello, world
        </div>
      </div>
    </div>
  )
}
