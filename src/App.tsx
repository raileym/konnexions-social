// src/App.tsx
import React, { useState, useEffect } from 'react'

const App: React.FC = () => {
  const [useCloudTTS, setUseCloudTTS] = useState(true)
  const [inputText, setInputText] = useState('')
  const [cleanedText, setCleanedText] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [maskKey, setMaskKey] = useState(false)

  const [openAiKey, setOpenAiKey] = useState('')
  const [maskOpenAiKey, setMaskOpenAiKey] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [openAiUsage, setOpenAiUsage] = useState(0)
  const [ttsCharUsage, setTtsCharUsage] = useState(0)

  const [openAiBudget, setOpenAiBudget] = useState(1)
  const [openAiAvgTokens, setOpenAiAvgTokens] = useState(200)
  const [ttsBudget, setTtsBudget] = useState(1)
  const [ttsAvgChars, setTtsAvgChars] = useState(80)

  const getCurrentWeek = () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const diff = (now.getTime() - start.getTime()) / 86400000
    return Math.floor((diff + start.getDay() + 1) / 7)
  }

  const loadUsage = () => {
    const week = getCurrentWeek()
    const openAiStored = localStorage.getItem(`openAiUsageW${week}`)
    setOpenAiUsage(openAiStored ? parseInt(openAiStored, 10) : 0)

    const ttsStored = localStorage.getItem(`ttsCharUsageW${week}`)
    setTtsCharUsage(ttsStored ? parseInt(ttsStored, 10) : 0)
  }

  const incrementOpenAiUsage = () => {
    const week = getCurrentWeek()
    const key = `openAiUsageW${week}`
    const current = openAiUsage + 1
    localStorage.setItem(key, current.toString())
    setOpenAiUsage(current)
  }

  const incrementTtsCharUsage = (chars: number) => {
    const week = getCurrentWeek()
    const key = `ttsCharUsageW${week}`
    const current = ttsCharUsage + chars
    localStorage.setItem(key, current.toString())
    setTtsCharUsage(current)
  }

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

    const storedOpenAiKey = localStorage.getItem('openAiKey')
    if (storedOpenAiKey) {
      setOpenAiKey(storedOpenAiKey)
      setMaskOpenAiKey(true)
    }

    loadUsage()
  }, [])

  const cleanText = (text: string) => {
    return text.trim().replace(/[¡¿]/g, '')
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

  const handleAskOpenAI = async () => {
    if (!openAiKey || !question) return

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: question }],
        }),
      })

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || ''
      setAnswer(reply)
      incrementOpenAiUsage()
    } catch (err) {
      console.error('Failed to call OpenAI:', err)
    }
  }

  const ttsWeeklyLimit = Math.floor((ttsBudget / 16) * 1_000_000 / ttsAvgChars)
  const openAiWeeklyLimit = Math.floor((openAiBudget / 0.0035) / openAiAvgTokens / 12 * 52)

  return (
    <main className="pa4 sans-serif bg-light-gray min-vh-100">
      <section className="mw6 center bg-white pa3 br3 shadow-5">
        <label className="db mb2 f6">TTS Budget ($/month)</label>
        <input
          type="number"
          value={ttsBudget}
          onChange={(e) => setTtsBudget(parseFloat(e.target.value))}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
        />
        <label className="db mb2 f6">Avg chars per TTS</label>
        <input
          type="number"
          value={ttsAvgChars}
          onChange={(e) => setTtsAvgChars(parseInt(e.target.value))}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
        />
        <small className="db mb3 gray">{ttsWeeklyLimit - Math.floor(ttsCharUsage / ttsAvgChars)} TTS transforms remaining this week</small>

        <label className="db mb2 f6">OpenAI Budget ($/month)</label>
        <input
          type="number"
          value={openAiBudget}
          onChange={(e) => setOpenAiBudget(parseFloat(e.target.value))}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
        />
        <label className="db mb2 f6">Avg tokens per Q</label>
        <input
          type="number"
          value={openAiAvgTokens}
          onChange={(e) => setOpenAiAvgTokens(parseInt(e.target.value))}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
        />
        <small className="db mb4 gray">{openAiWeeklyLimit - openAiUsage} OpenAI questions remaining this week</small>
        {/* ...rest of UI omitted for brevity */}
      </section>
    </main>
  )
}

export default App
