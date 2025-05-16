import { useAppContext } from "../context/AppContext"
import { getCurrentWeek } from "./Util"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { APP_PANEL } from "../cknTypes/types/types"

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
    // setUseCloudTTS,
    switchPanel
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

  // const handleWelcomeLocalService = () => {
  //   const synth = window.speechSynthesis

  //   const speakText = () => {
  //     const voices = synth.getVoices()
  //     const spanishVoice = voices.find(v => v.lang.startsWith('es')) || voices[0]
  //     const utterance = new SpeechSynthesisUtterance("¡Buenos días! Bienvenido a Let's Connect!")
  //     utterance.voice = spanishVoice
  //     utterance.lang = spanishVoice.lang
  //     utterance.rate = 0.9
  //     synth.speak(utterance)
  //   }

  //   if (!synth.getVoices().length) {
  //     synth.onvoiceschanged = speakText
  //   } else {
  //     speakText()
  //   }
  // }

  // const handleWelcomeCloudService = () => {
  //   const synth = window.speechSynthesis

  //   const speakText = () => {
  //     const voices = synth.getVoices()
  //     const spanishVoice = voices.find(v => v.lang.startsWith('es')) || voices[0]
  //     const utterance = new SpeechSynthesisUtterance("¡Buenos noches! Adios! Bienvenido a Let's Connect!")
  //     utterance.voice = spanishVoice
  //     utterance.lang = spanishVoice.lang
  //     utterance.rate = 0.9
  //     synth.speak(utterance)
  //   }

  //   if (!synth.getVoices().length) {
  //     synth.onvoiceschanged = speakText
  //   } else {
  //     speakText()
  //   }
  // }

  // const handleWelcomeLocal = () => {
  //   const synth = window.speechSynthesis
  
  //   const speakText = () => {
  //     const voices = synth.getVoices()
  //     const spanishVoice = voices.find(v => v.lang.startsWith('es')) || voices[0]
  //     const utterance = new SpeechSynthesisUtterance("¡Hola! Usando voz integrada en el dispositivo.")
  //     utterance.voice = spanishVoice
  //     utterance.lang = spanishVoice.lang
  //     utterance.rate = 0.9
  //     synth.speak(utterance)
  //   }
  
  //   if (!synth.getVoices().length) {
  //     synth.onvoiceschanged = speakText
  //   } else {
  //     speakText()
  //   }
  // }
  
  // const handleWelcomeCloud = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           input: { ssml: `<speak>Hola. Usando servicio de voz en la nube.</speak>` },
  //           voice: { languageCode: 'es-US', name: 'es-US-Wavenet-B' },
  //           audioConfig: { audioEncoding: 'MP3', speakingRate: 0.9 },
  //         }),
  //       }
  //     )
  //     const data = await response.json()
  //     const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`)
  //     audio.play()
  //   } catch (err) {
  //     console.error('Cloud TTS welcome failed:', err)
  //   }
  // }
  
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

  const headline = (
    <div>
      <p className="pa0 ma0">
      Transform your Spanish text into high-quality speech using a cloud-based Text-to-Speech (TTS) service, or into standard quality speech using the built-in voice on your device.
      </p>
      <div className="flex justify-center w-100 mv4">
        <div
          className="db items-center tc ba pa1 w-20 f2 br3 pointer"
          style={{ width: '2em' }}
          onClick={() => switchPanel(APP_PANEL.KEYS)}
          role="button"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faKey} />
          <div className="f6 mt0 b">API Keys</div>
        </div>        
      </div>
    </div>
  )
  
  return (
    <div className="absolute z-0 pa4 bg-white top-0 left-0 w-100 h-100 overflow-y-auto">
      <div className="mb5">
        <h2 className="f3 pa3 pb0 mt5 w-100 tc">Text-To-Speech Panel</h2>
        <div className="f3 pv3 pt0 mt0">{headline}</div>

        <label className="o-100 db mt0 mb2 f3 b">Enter your Spanish text</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          rows={8}
          placeholder="Hola, mundo"
        />
        <div className="w-100 flex justify-center">
          <button
            onClick={handleGenerate}
            className="bg-brand white pa2 f4 br2 bn pointer db mb3 w-100"
          >
            Hear your Spanish text using a {useCloudTTS ? 'cloud-based voice' : 'local voice'}
          </button>
        </div>

        <hr className="mv4" />

        { (
          <>
            <div className="b f3 mb3">Generated Audio</div>
            <div className="mb3" style={{ minHeight: '3.5em' }}>
              {audioUrl && useCloudTTS ? (
                <>
                  <div className="flex items-center mv3 justify-center">
                    <FontAwesomeIcon icon={faLockOpen} />
                    <p className="ml2 pa0 ma0 f6">
                      This audio control is available only when cloud-based voice is selected.
                    </p>
                  </div>
                  <audio controls src={audioUrl} className="db w-100" />
                </>
              ) : useCloudTTS ? (
                <>
                  <div className="flex items-center mv3 justify-center">
                    <FontAwesomeIcon icon={faLock} />
                    <p className="ml2 pa0 ma0 f6">
                      This audio control is available only when audio file is present.
                    </p>
                  </div>
                  <audio controls src={undefined} className="db w-100" />
                </>
              ) : (
                <>
                  <div className="flex items-center mv3 justify-center">
                    <FontAwesomeIcon icon={faLock} />
                    <p className="ml2 pa0 ma0 f6">
                      This audio control is available only when cloud-based voice is selected.
                    </p>
                  </div>
                  <audio controls src="" className="o-50 db w-100 red" />
                </>
              )}
            </div>
          </>
        )}

        {cleanedText && (
          <>
            <hr className="mv4" />
            <div className="b f3">Clean text</div>
            <div className="pa2 bg-washed-blue mb3">{cleanedText}</div>
          </>
        )}
      </div>
    </div>
  )
}
