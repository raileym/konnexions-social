import React from 'react'
import { useAppContext } from '../context/AppContext'
import { APP_PANEL } from '../cknTypes/types/types'

const PanelSettings: React.FC = () => {
  const {
    activePanel,
    ttsBudget,
    setTtsBudget,
    ttsAvgChars,
    setTtsAvgChars,
    ttsCharUsage,
    openAiBudget,
    setOpenAiBudget,
    openAiAvgTokens,
    setOpenAiAvgTokens,
    openAiUsage,
    apiKey,
    useCloudTTS,
    setUseCloudTTS
  } = useAppContext()
  const isActive = activePanel === APP_PANEL.SETTINGS
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  const ttsWeeklyLimit = Math.floor((ttsBudget / 16) * 1_000_000 / ttsAvgChars)
  const openAiWeeklyLimit = Math.floor((openAiBudget / 0.0035 / 4.33) * (1000 / openAiAvgTokens))

  const handleWelcomeLocal = () => {
    const synth = window.speechSynthesis
  
    const speakText = () => {
      const voices = synth.getVoices()
      const spanishVoice = voices.find(v => v.lang.startsWith('es')) || voices[0]
      const utterance = new SpeechSynthesisUtterance("¡Hola! Usando voz integrada en el dispositivo.")
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
  
  const handleWelcomeCloud = async () => {
    try {
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { ssml: `<speak>Hola. Usando servicio de voz en la nube.</speak>` },
            voice: { languageCode: 'es-US', name: 'es-US-Wavenet-B' },
            audioConfig: { audioEncoding: 'MP3', speakingRate: 0.9 },
          }),
        }
      )
      const data = await response.json()
      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`)
      audio.play()
    } catch (err) {
      console.error('Cloud TTS welcome failed:', err)
    }
  }

  const headline = (
    <div>
      <p className="pa0 ma0">
      Set your preferences here in regards to whether you are using a local Text-To-Speech (TTS) service or a cloud-based TTS service. Also, you may set your cost metrics here to help you understand rate of usage and potential costs for using cloud-based services, e.g., Google TTS Service or OpenAI's GenAI Service.
      </p>
    </div>
  )

  return (
    <div className={`absolute z-1 pa4 top-0 left-0 w-100 h-100 bg-light-gray black transition-transform ${translateX}`}>
      <h2 className="f3 pa3 pb0 mt5 w-100 tc">Settings Panel</h2>
      <div className="f3 baX pa3X pv3 pt0 mt0">{headline}</div>

      <div className="f3 baX pv3X pt4 pb4 pv3X b pt0 mt0">Choose local or cloud-based TTS services</div>
      <div className="w-100 flex justify-center">
          <button
            onClick={() => {
              if (!apiKey) {
                handleWelcomeLocal()
                return
              }

              if (useCloudTTS) {
                setUseCloudTTS(false)
                localStorage.setItem('useCloudTTS', 'false')
                handleWelcomeLocal()
              } else {
                setUseCloudTTS(true)
                localStorage.setItem('useCloudTTS', 'true')
                handleWelcomeCloud()
              }
            }}
            className={`shadow-black-mediumX bg-blueX white pa3 mt2 f4 br-pill bn pointer db mb3 w-60 ${!apiKey ? 'bg-dark-gray' : useCloudTTS ? 'bg-green' : 'bg-brand'}`}
          >
            {!apiKey
              ? 'Play Welcome (Local TTS)'
              : useCloudTTS
                ? 'Switch to a standard-quality built-in voice'
                : 'Switch to a higher-quality cloud voice'}
          </button>
      </div>

      <hr className="mv4"/>

      <div className="f3 baX pv3X pt3 pb4 pv3X b pt0 mt0">Set your metrics for cloud-based services</div>
      <label className="b db mb2 f6">TTS Budget ($/month)</label>
      <input
        type="number"
        value={ttsBudget}
        onChange={(e) => setTtsBudget(parseFloat(e.target.value))}
        className="input-reset ba b--black-20 pa2 mb2 db w-100"
      />
      <label className="b db mb2 f6">Avg chars per TTS</label>
      <input
        type="number"
        value={ttsAvgChars}
        onChange={(e) => setTtsAvgChars(parseInt(e.target.value))}
        className="input-reset ba b--black-20 pa2 mb2 db w-100"
      />
      <div className="tc b db mv4 black f4 flex justify-center">
        <div className="flex flex-row items-center">
          <div className="ba w3 mr3 bw2">
            {ttsWeeklyLimit - Math.floor(ttsCharUsage / ttsAvgChars)}
          </div>
          <div>
            TTS transforms remaining this week
          </div>
        </div>
      </div>

      <label className="b db mb2 f6">OpenAI Budget ($/month)</label>
      <input
        type="number"
        value={openAiBudget}
        onChange={(e) => setOpenAiBudget(parseFloat(e.target.value))}
        className="input-reset ba b--black-20 pa2 mb2 db w-100"
      />
      <label className="b db mb2 f6">Avg tokens per Q</label>
      <input
        type="number"
        value={openAiAvgTokens}
        onChange={(e) => setOpenAiAvgTokens(parseInt(e.target.value))}
        className="input-reset ba b--black-20 pa2 mb2 db w-100"
      />

      <div className="tc b db mv4 black f4 flex justify-center">
        <div className="flex flex-row items-center">
          <div className="ba w3 mr3 bw2">
          {openAiWeeklyLimit - openAiUsage} 
          </div>
          <div>
            OpenAI questions remaining this week
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelSettings
