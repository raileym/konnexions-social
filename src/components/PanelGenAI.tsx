import React from 'react'
import { useAppContext } from '../context/AppContext'
import { APP_PANEL } from '../cknTypes/types/types'
import Button from "./Button"
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { getCurrentWeek } from './Util'
import Scenario from './Scenario'

const PanelGenAI: React.FC = () => {
  const { activePanel } = useAppContext()
  const isActive = activePanel === APP_PANEL.GEN_AI
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  const {
    question,
    questionContext,
    setQuestion,
    setQuestionContext,
    openAiKey,
    setAnswer,
    openAiUsage,
    setOpenAiUsage,
    answer,
    scenario
  } = useAppContext()

  const incrementOpenAiUsage = () => {
    const week = getCurrentWeek()
    const key = `openAiUsageW${week}`
    const current = openAiUsage + 1
    localStorage.setItem(key, current.toString())
    setOpenAiUsage(current)
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

  return (
    <div className={`absolute z-1 top-0 pa4 left-0 w-100 h-100 bg-light-gray black transition-transform ${translateX}`}>
        <h2 className="f3 pa3 pb0 mt5 w-100 tc">GenAI Panel</h2>
        <div className="f3 baX pa3 pt0 mt0">Ask ChatGPT to express a custom dialog within a desired scenario, e.g., at the airport, in a restaurant, or in a taxi. Adjust the context below regarding your expected response.</div>

      <Scenario />
      
      { !openAiKey && (
          <div className="mt5">
            <div>*Set a <b>GenAI Key</b> to use a Generative AI technology</div>
            <div className="w-100 flex justify-center pa4">
              <div>
                <Button panel="keys" icon={faKey} title="API Keys" />
              </div>
            </div>
          </div>
      )}

      { openAiKey && (
        <>
          <label className="db mt3 mb2 f3 b">Ask ChatGPT - {scenario}</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            rows={8}
            placeholder="Ask a question..."
          />
          <button
            onClick={handleAskOpenAI}
            className="bg-dark-purple white pa2 br2 bn pointer db mb3 w-100"
          >
            Ask OpenAI
          </button>
        </>
      )}

      { openAiKey && (
        <>
          <label className="db mt5 mb2 f6">Set the context for ChatGPT</label>
          <textarea
            value={questionContext}
            onChange={(e) => setQuestionContext(e.target.value)}
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            rows={8}
            placeholder="Set the context for your questions ..."
          />
          <button
            onClick={handleAskOpenAI}
            className="bg-dark-purple white pa2 br2 bn pointer db mb3 w-100"
          >
            Set the context - OpenAI
          </button>
        </>
      )}

      <label className="db mb2 f6 gray">OpenAI Response</label>
      <div className="pa2 bg-near-white mb3" style={{ whiteSpace: 'pre-wrap' }}>{answer}</div>
    </div>
  )
}

export default PanelGenAI
