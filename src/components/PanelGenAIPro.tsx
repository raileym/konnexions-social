import React from 'react'
import { useAppContext } from '../context/AppContext'
import { APP_HOME } from '../cknTypes/types/types'
// import Button from "./Button"
// import { faKey } from '@fortawesome/free-solid-svg-icons'
import { getCurrentWeek } from './Util'
import { getScenarioDetails } from './Util'
import Scenario from './Scenario'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLockOpen } from '@fortawesome/free-solid-svg-icons'
// import { usePanel } from '../hooks/usePanel'

const PanelGenAIPro: React.FC = () => {
  const { activeHome } = useAppContext()
  const isActive = activeHome === APP_HOME.GEN_AI_PRO
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'
  // const { switchPanel } = usePanel()
  
  const {
    question,
    // questionContext,
    setQuestion,
    // setQuestionContext,
    openAiKey,
    setAnswer,
    openAiUsage,
    setOpenAiUsage,
    answer,
    scenario,
    // activePanel
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

  const {scenarioLabel, scenarioParticipants} = getScenarioDetails(scenario)

  const extendedInstruction = `
1. nouns: For each noun in the dialog, extract the 4–5 word expression that contains it.
2. verbs: For each verb in the dialog, extract the 4–5 word expression that contains it.
3. verbConjugations: Choose four verbs. For each, return conjugated examples as follows:
  3a. VERB. PRONOUN VERB. PRONOUN VERB DIRECT_OBJECT.
  3b. Let 1PP = 1st Person Plural, 1PS = 1st Person Singular, 3PS = 3rd Person Singular, 3PP = 3rd Person Plural, 2PS = 2nd Person Singular.
  3c. Present these in order: 1PP, 1PS, 3PS, 3PP, 2PS. (Skip 2PP, used only in Spain.)
4. nounUsage: Choose six nouns. For each, provide gendered examples:
  4a. Masculine: NOUN. EL NOUN. DEL NOUN.
  4b. Feminine: NOUN. LA NOUN. DE LA NOUN.
  4c. Use a different preposition in the last example to vary usage.
`

const fullPrompt = `
Follow these instructions one-by-one in a multi-part response.
Format the response as JSON with keys: dialog, nouns, verbs, verbConjugations, nounUsage.

dialog: I am ${scenarioLabel}. Please create a dialog between me and two other people,
randomly chosen from
${scenarioParticipants}.
Use no more than six sentences for beginning language instruction.
${extendedInstruction}
`

  const headline = 'Ask ChatGPT to create a custom dialog based on a specific situation — at a restaurant, in a hotel, at the airport, or one you describe yourself.'

  return (
    <div className={`gen-ai-pro-panel z-2 absolute top-0 left-0 w-100 h-100 bg-light-gray transition-transform ${translateX}`}>
      <div className="h-100 w-100 overflow-y-auto">
        <div className="pa4 mw7 w-100 black center mb5">
          <h2 className="f3 pa3 pb0 mt5 w-100 tc">GenAI Pro Panel</h2>
          <div className="f3 pv3 pt0 mt0">{headline}</div>

          <Scenario custom={false} />

          {/* 
            { !openAiKey && (
                <div className="mt5">
                  <div>*Set a <b>GenAI Key</b> to use a Generative AI technology</div>
                  <div className="w-100 flex justify-center pa4">
                    <div>
                      <Button isActive={activePanel == "keys"} switchFn={switchPanel} panel="keys" icon={faKey} title="API Keys" />
                    </div>
                  </div>
                </div>
            )}
          */}

            { openAiKey && (
              <>
                <hr />
                <label className="o-100 db mt0 mb2 f3 b">Ask ChatGPT</label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="o-100 input-reset ba b--black-20 pa2 mb2 db w-100"
                  rows={8}
                  placeholder="Ask a question..."
                />
                <button
                  onClick={handleAskOpenAI}
                  className="o-100 bg-brand white pa2 br2 bn pointer db mb3 w-100"
                >
                  Ask OpenAI
                </button>
              </>
            )}

          {/*
            {openAiKey && scenario !== 'custom' && (
              <>
                <div className="silver h4">{fullPrompt}</div>
                <hr />
                <div className="flex items-center mv3">
                  <FontAwesomeIcon icon={faLock} />
                  <p className="ml2 pa0 ma0">
                    This field is available when Custom Scenario is selected.
                  </p>
                </div>
                <div className="relative">
                    <label className="o-20 db mt0 mb2 f3 b">Ask ChatGPT</label>
                    <textarea
                      value={questionContext}
                      onChange={(e) => setQuestionContext(e.target.value)}
                      className="o-50 bg-white input-reset ba b--black-20 pa2 mb2 db w-100"
                      rows={8}
                      placeholder="Ask a question..."
                      disabled
                    />
                    <button
                      onClick={handleAskOpenAI}
                      className="o-30 bg-brand white pa2 br2 bn db mb3 w-100"
                      disabled
                    >
                      Ask OpenAI
                    </button>
                  </div>
              </>
            )}

            */}

            <label className="db mb2 f6 gray">OpenAI Response</label>
            <div className="pa2 bg-near-white mb3" style={{ whiteSpace: 'pre-wrap' }}>{answer}</div>

          {openAiKey && scenario !== 'custom' && (
            <>
              <div className="silver h4X pre">{fullPrompt}</div>
            </>
          )}

          </div>
      </div>
    </div>
  )
}

export default PanelGenAIPro
