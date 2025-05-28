import React, { useState } from 'react'
// import React, { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import {
  APP_HOME,
  ERROR_LABEL,
  GEN_AI_STEP
} from '../../shared/types'
import type {
  GetDialogProps,
  GetDialogResult,
  GetDialogReviewProps,
  GetDialogReviewResult,
  GetNounsProps,
  GetNounsResult,
  GetVerbsProps,
  GetVerbsResult,
  HandleDialogProps,
  HandleNounsProps,
  HandleDialogReviewProps,
  HandleVerbsProps,
  Language,
  UseMyself,
  HandleNounsReviewProps,
  GetNounsReviewProps,
  GetNounsReviewResult,
  TestMode,
} from '../../shared/types'
import { getScenarioDetails } from './Util'
import Scenario from './Scenario'
import ParticipantToggle from './ParticipantToggle'
import { resetErrors } from './errorUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

const PanelGenAIPro: React.FC = () => {
  const {
    activeHome,
    handleDialogErrors,
    handleNounsErrors,
    handleVerbsErrors,
    setHandleDialogErrors,
    setHandleNounsErrors,
    setHandleVerbsErrors,
    setStepResult,
    stepResult
  } = useAppContext()

  const isActive = activeHome === APP_HOME.GEN_AI_PRO
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  const [useMyself, setUseMyself] = useState<UseMyself>(false)
  const [, setStep] = useState<number>(0)
  const [showDialogPrompt, setShowDialogPrompt] = useState(false)
  const [showNounsPrompt, setShowNounsPrompt] = useState(false)
  const [showVerbsPrompt, setShowVerbsPrompt] = useState(false)
  const [showDialogReviewPrompt, setShowDialogReviewPrompt] = useState(false)
  const [showNounsReviewPrompt, setShowNounsReviewPrompt] = useState(false)
  const [language, ] = useState<Language>('Spanish')
  const [testMode, setTestMode] = useState<TestMode>(true)

  const toggleShowDialogPrompt = () => {
    setShowDialogPrompt(prev => !prev)
  }
    
  const toggleShowNounsPrompt = () => {
    setShowNounsPrompt(prev => !prev)
  }

  const toggleShowVerbsPrompt = () => {
    setShowVerbsPrompt(prev => !prev)
  }

  const toggleShowDialogReviewPrompt = () => {
    setShowDialogReviewPrompt(prev => !prev)
  }

  const toggleShowNounsReviewPrompt = () => {
    setShowNounsReviewPrompt(prev => !prev)
  }

  const getDialog = async ({
    testMode,
    language,
    scenarioLabel,
    scenarioParticipantList
  }: GetDialogProps): Promise<GetDialogResult | null> => {
    // cXonsole.log(scenarioParticipantList)
    try {
      const res = await fetch('/.netlify/functions/genai-dialog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testMode,
          language,
          scenarioLabel,
          scenarioParticipantList
        })
      })
  
      if (!res.ok) {
        console.error('Function error:', res.status)
        return null
      }
  
      const data = await res.json()
      return data as GetDialogResult
    } catch (err) {
      console.error('Network error:', err)
      return null
    }
  }  

  const getNounsReview = async ({
    testMode,
    language,
    nounsArray,
    dialogSignature
  }: GetNounsReviewProps): Promise<GetNounsReviewResult | null> => {

    console.log(`getNounsReview: language: ${language}`)
    console.log(`getNounsReview: nounsArray: ${JSON.stringify(nounsArray, null, 2)}`)
    console.log(`getNounsReview: dialogSignature: ${dialogSignature}`)

    try {
      const res = await fetch('/.netlify/functions/genai-nouns-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testMode,
          language,
          nounsArray,
          dialogSignature
        })
      })
  
      if (!res.ok) {
        console.error('Function error:', res.status)
        return null
      }
  
      const data = await res.json()
      return data as GetNounsReviewResult
    } catch (err) {
      console.error('Network error:', err)
      return null
    }
  }
  
  const getDialogReview = async ({
    testMode,
    language,
    dialogArray,
    dialogSignature
  }: GetDialogReviewProps): Promise<GetDialogReviewResult | null> => {

    console.log(`getDialogReview: language: ${language}`)
    console.log(`getDialogReview: dialogArray: ${JSON.stringify(dialogArray, null, 2)}`)
    console.log(`getDialogReview: dialogSignature: ${dialogSignature}`)

    try {
      const res = await fetch('/.netlify/functions/genai-dialog-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testMode,
          language,
          dialogArray,
          dialogSignature
        })
      })
  
      if (!res.ok) {
        console.error('Function error:', res.status)
        return null
      }
  
      const data = await res.json()
      return data as GetDialogReviewResult
    } catch (err) {
      console.error('Network error:', err)
      return null
    }
  }

  const getNouns = async ({
    testMode,
    language,
    dialog,
    dialogSignature
  }: GetNounsProps): Promise<GetNounsResult | null> => {

    console.log(`getNouns: language: ${language}`)
    console.log(`getNouns: dialog: ${dialog}`)
    console.log(`getNouns: dialogSignature: ${dialogSignature}`)

    try {
      const res = await fetch('/.netlify/functions/genai-nouns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testMode,
          language,
          dialog,
          dialogSignature
        })
      })
  
      if (!res.ok) {
        console.error('Function error:', res.status)
        return null
      }
  
      const data = await res.json()
      return data as GetNounsResult
    } catch (err) {
      console.error('Network error:', err)
      return null
    }
  }  
  
  const getVerbs = async ({
    testMode,
    language,
    dialog,
    dialogSignature
  }: GetVerbsProps): Promise<GetVerbsResult | null> => {

    console.log(`getVerbs: language: ${language}`)
    console.log(`getVerbs: dialog: ${dialog}`)
    console.log(`getVerbs: dialogSignature: ${dialogSignature}`)

    try {
      const res = await fetch('/.netlify/functions/genai-verbs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testMode,
          language,
          dialog,
          dialogSignature
        })
      })
  
      if (!res.ok) {
        console.error('Function error:', res.status)
        return null
      }
  
      const data = await res.json()
      return data as GetVerbsResult
    } catch (err) {
      console.error('Network error:', err)
      return null
    }
  }  
  
  // const fetchFromOpenAI = async (prompt: string): Promise<string | null> => {
  //   if (!openAiKey) return null
  
  //   try {
  //     const res = await fetch('https://api.openai.com/v1/chat/completions', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${openAiKey}`,
  //       },
  //       body: JSON.stringify({
  //         model: 'gpt-3.5-turbo',
  //         messages: [{ role: 'user', content: prompt }],
  //       }),
  //     })
  
  //     const data = await res.json()
  //     const reply = data.choices?.[0]?.message?.content || ''
  //     return reply
  //   } catch (err) {
  //     console.error('OpenAI error:', err)
  //     return null
  //   }
  // }

  const handleDialog = async ({
    testMode,
    language, 
    scenarioLabel,
    scenarioParticipantList
  }: HandleDialogProps) => {

    if (testMode) {
      console.log(`language: ${language}`)
      console.log(`scenarioLabel: ${scenarioLabel}`)
      console.log(`scenarioParticipantList: ${scenarioParticipantList}`)
    }

    const response = await getDialog({testMode, language, scenarioLabel, scenarioParticipantList})

    if (response === null) {
      console.log('Houston, we DO have a problems')
      return
    }

    if (!response.dialogResult.success) {
      console.log('Houston, we have SOME problems')
      console.log(response.dialogResult.errors)
    }

    setStepResult(prev => {
      const updated = {
        ...prev,
        dialog: response.dialog,
        dialogSignature: response.dialogSignature,
        dialogArray: response.dialogResult.parsed,
        dialogErrors: response.dialogResult.errors ?? [],
        dialogPrompt: response.dialogPrompt
      }
      // localStorage.setItem('stepResult', JSON.stringify(updated))
      return updated
    })
    

    setStep(GEN_AI_STEP.DIALOG_REVIEW)
  }
  
  const handleDialogReview = async ({
    testMode,
    language,
    dialogArray,
    dialogSignature
  }: HandleDialogReviewProps) => {

    if (testMode) {
      console.log(`language: ${language}`)
      console.log(`dialogSignature: ${dialogSignature}`)
      console.log(JSON.stringify(dialogArray, null, 2))
      return
    }

    const response = await getDialogReview({testMode, language, dialogArray, dialogSignature})

    if (response === null) {
      console.log('Houston, we DO have a problems')
      return
    }

    if (!response.dialogReviewResult.success) {
      console.log('Houston, we have SOME problems')
      console.log(response.dialogReviewResult.errors)
    }

    setStepResult(prev => {
      const updated = {
        ...prev,
        dialogReviewArray: response.dialogReviewResult.parsed,
        dialogReviewErrors: response.dialogReviewResult.errors ?? [],
        dialogReviewPrompt: response.dialogReviewPrompt,
        dialogReviewSignature: response.dialogReviewSignature,
        dialogReviewSentinel: response.dialogReviewResult.sentinel ?? ''
      }
      return updated
    })
    
    setStep(GEN_AI_STEP.NOUNS_REVIEW)

  }
  
  const handleNounsReview = async ({
    testMode,
    language,
    nounsArray,
    dialogSignature
  }: HandleNounsReviewProps) => {

    if (testMode) {
      console.log(`language: ${language}`)
      console.log(`dialogSignature: ${dialogSignature}`)
      console.log(JSON.stringify(nounsArray, null, 2))
      return
    }

    const response = await getNounsReview({testMode, language, nounsArray, dialogSignature})

    if (response === null) {
      console.log('Houston, we DO have a problems')
      return
    }

    if (!response.nounsReviewResult.success) {
      console.log('Houston, we have SOME problems')
      console.log(response.nounsReviewResult.errors)
    }

    setStepResult(prev => {
      const updated = {
        ...prev,
        nounsReviewArray: response.nounsReviewResult.parsed,
        nounsReviewErrors: response.nounsReviewResult.errors ?? [],
        nounsReviewPrompt: response.nounsReviewPrompt,
        nounsReviewSignature: response.nounsReviewSignature,
        nounsReviewSentinel: response.nounsReviewResult.sentinel ?? ''
      }
      return updated
    })
    
    setStep(GEN_AI_STEP.NOUNS_REVIEW)

  }
  
  const handleNouns = async ({
    testMode,
    language,
    dialog,
    dialogSignature
  }: HandleNounsProps) => {
    
    if (testMode) {
      console.log(`language: ${language}`)
      console.log(`dialog: ${dialog}`)
      console.log(`dialogSignature: ${dialogSignature}`)

      return
    }

    const response = await getNouns({testMode, language, dialog, dialogSignature})

    if (response === null) {
      console.log('Houston, we DO have a problems')
      return
    }

    if (!response.nounsResult.success) {
      console.log('Houston, we have SOME problems')
      console.log(response.nounsResult.errors)
    }

    setStepResult(prev => {
      const updated = {
        ...prev,
        nounsArray: response.nounsResult.parsed,
        nounsErrors: response.nounsResult.errors ?? [],
        nounsPrompt: response.nounsPrompt,
        nounsSignature: response.nounsSignature
      }
      return updated
    })
    
    setStep(GEN_AI_STEP.NOUNS_REVIEW)
  }

  const handleVerbs = async ({
    testMode,
    language,
    dialog,
    dialogSignature
  }: HandleVerbsProps) => {
    console.log(prompt)

    if ( testMode ) {
      console.log(`language: ${language}`)
      console.log(`dialog: ${dialog}`)
      console.log(`dialogSignature: ${dialogSignature}`)

      return
    }

    const response = await getVerbs({testMode, language, dialog, dialogSignature})

    if (response === null) {
      console.log('Houston, we DO have a problems')
      return
    }

    console.log(response.verbsResult)

    if (!response.verbsResult.success) {
      console.log('Houston, we have SOME problems')
      console.log(response.verbsResult.errors)
    }

    console.log(response.verbsPrompt)
    console.log(JSON.stringify(response, null, 2))

    setStepResult(prev => {
      const updated = {
        ...prev,
        verbsArray: response.verbsResult.parsed,
        verbsErrors: response.verbsResult.errors ?? [],
        verbsPrompt: response.verbsPrompt,
        verbsSignature: response.verbsSignature
      }
      return updated
    })
    
    setStep(GEN_AI_STEP.VERBS_REVIEW)

  }

  // const chooseParticipants = ({participants, n, useMyself}: ChooseParticipantsProps): string => {
  //   if (!participants || participants.length === 0 || n <= 0) return ''
  
  //   const count = useMyself ? n - 1 : n
  //   const shuffled = [...participants].sort(() => Math.random() - 0.5)
  //   const selected = shuffled.slice(0, Math.min(count, participants.length))
  
  //   if (useMyself) selected.unshift('myself')
  
  //   if (selected.length === 1) return selected[0]
  //   if (selected.length === 2) return `${selected[0]} and ${selected[1]}`
  
  //   const last = selected.pop()
  //   return `${selected.join(', ')}, and ${last}`
  // }  
    
  const {
    scenario
  } = useAppContext()

  const headline = 'Ask ChatGPT to create a custom dialog based on a specific situation — at a restaurant, in a hotel, at the airport, or one you describe yourself.'

  return (
    <div className={`gen-ai-pro-panel z-2 absolute top-0 left-0 w-100 h-100 bg-light-gray transition-transform ${translateX}`}>
      <div className="h-100 w-100 overflow-y-auto">
        <div className="pa4 mw7 w-100 black center mb5">
          <h2 className="f3 pa3 pb0 mt5 w-100 tc">Spanish: Premium</h2>
          <div className="f3 pv3 pt0 mt0">{headline}</div>

          <div className="flex flex-column items-center justify-centerX w-100 items-startX flex-wrapX">
            <div className="mt3 mb1">
              <Scenario custom={false} />
            </div>
            <div className="mt1 mb3">
              <ParticipantToggle useMyself={useMyself} onClick={setUseMyself} />
            </div>
          </div>

          <div className="mv3">
            <button
              onClick={() => setTestMode(prev => !prev)}
              className={`w-30 pa3 br2 bn ${testMode ? 'bg-red' : 'bg-black'} white pointer`}
            >
              <div className="pa5X flex items-center" >
                <div className="ph1 bg-redX"><FontAwesomeIcon icon={testMode ? faLock : faLockOpen} /></div>
                <div className="ml2">{testMode ? 'Disable' : 'Enable'} Test Mode</div>
              </div>
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                const {
                  scenarioLabel,
                  scenarioParticipantList
                } = getScenarioDetails({scenario, language})

                handleDialog({
                  testMode,
                  language, 
                  scenarioLabel,
                  scenarioParticipantList
                })
              }}
              className="pa2 br2 bn bg-brand white pointer"
            >
              Run Dialog Step {testMode ? '(Test Mode)' : ''}
            </button>
          </div>

          <div>
            <button
              onClick={() =>
                handleDialogReview({
                  testMode,
                  language,
                  dialogArray: stepResult.dialogArray,
                  dialogSignature: stepResult.dialogSignature
                })
              }
              className="mv3 pa2 br2 bn bg-purple white pointer"
            >
              Review Dialog  {testMode ? '(Test Mode)' : ''}
            </button>
          </div>

          <div>
            <button
              onClick={() =>
                handleNounsReview({
                  testMode,
                  language,
                  nounsArray: stepResult.nounsArray,
                  dialogSignature: stepResult.dialogSignature
                })
              }
              className="mv3 pa2 br2 bn bg-purple white pointer"
            >
              Review Nouns {testMode ? '(Test Mode)' : ''}
            </button>
          </div>

          <div className="mv3">
            <button
              onClick={() =>
                handleNouns({
                  testMode,
                  language,
                  dialog: stepResult.dialog,
                  dialogSignature: stepResult.dialogSignature
                })
              }
              className="pa2 br2 bn bg-brand white pointer"
            >
              Run Nouns Step {testMode ? '(Test Mode)' : ''}
            </button>
          </div>

          <div className="mv3">
            <button
              onClick={() =>
                handleVerbs({
                  testMode,
                  language,
                  dialog: stepResult.dialog,
                  dialogSignature: stepResult.dialogSignature
                })
              }
              className="pa2 br2 bn bg-brand white pointer"
            >
              Run Verbs Step {testMode ? '(Test Mode)' : ''}
            </button>
          </div>

          <div className="mv3">
            <button
              onClick={() => {
                resetErrors(ERROR_LABEL.DIALOG_ERROR, setHandleDialogErrors)
                resetErrors(ERROR_LABEL.NOUNS_ERROR, setHandleNounsErrors)
                resetErrors(ERROR_LABEL.VERBS_ERROR, setHandleVerbsErrors)
              }}
              className="pa2 br2 bn bg-brand white pointer"
            >
              Reset Errors {testMode ? '(Test Mode)' : ''}
            </button>
          </div>

          <div className="w-100">
            <button
              onClick={toggleShowDialogPrompt}
              className="pa2 br2 bn bg-brand white pointer"
            >
              {showDialogPrompt ? 'Hide Dialog Prompt' : 'Show Dialog Prompt'}
            </button>
          </div>

          {showDialogPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-white">
                <div className="mt4X b" style={{ whiteSpace: 'pre-wrap' }}>Dialog Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{stepResult.dialogPrompt}</div>
              </div>
            </div>
          )}

          <div className="w-100">
            <button
              onClick={toggleShowNounsPrompt}
              className="mt3 pa2 br2 bn bg-brand white pointer"
            >
              {showNounsPrompt ? 'Hide Nouns Prompt' : 'Show Nouns Prompt'}
            </button>
          </div>

          {showNounsPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-white">
                <div className="mt4X b" style={{ whiteSpace: 'pre-wrap' }}>Nouns Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{stepResult.nounsPrompt}</div>
              </div>
            </div>
          )}
          
          <div className="w-100">
            <button
              onClick={toggleShowVerbsPrompt}
              className="mt3 pa2 br2 bn bg-brand white pointer"
            >
              {showVerbsPrompt ? 'Hide Verbs Prompt' : 'Show Verbs Prompt'}
            </button>
          </div>

          {showVerbsPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-white">
                <div className="mt4X b" style={{ whiteSpace: 'pre-wrap' }}>Verbs Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{stepResult.verbsPrompt}</div>
              </div>
            </div>
          )}
          
          <div className="w-100">
            <button
              onClick={toggleShowDialogReviewPrompt}
              className="mt3 pa2 br2 bn bg-brand white pointer"
            >
              {showDialogReviewPrompt ? 'Hide Dialog Review Prompt' : 'Show Dialog Review Prompt'}
            </button>
          </div>

          {showDialogReviewPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-white">
                <div className="mt4X b" style={{ whiteSpace: 'pre-wrap' }}>Dialog Review Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{stepResult.dialogReviewPrompt}</div>
              </div>
            </div>
          )}

          <div className="w-100">
            <button
              onClick={toggleShowNounsReviewPrompt}
              className="mt3 pa2 br2 bn bg-brand white pointer"
            >
              {showNounsReviewPrompt ? 'Hide Nouns Review Prompt' : 'Show Nouns Review Prompt'}
            </button>
          </div>

          {showNounsReviewPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-white">
                <div className="mt4X b" style={{ whiteSpace: 'pre-wrap' }}>Nouns Review Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{stepResult.nounsReviewPrompt}</div>
              </div>
            </div>
          )}

          <div className="w-100 flex justify-center flex-column">
            <div>
              <div className="mt4 b">Dialog Array</div>
              <ul className="mt0 pt0 black">
                {stepResult.dialogArray.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
              {handleDialogErrors.length > 0 && (
                <div className="mt3 red">
                  <div className="b">Dialog Errors</div>
                  <ul className="f6">
                    {handleDialogErrors.map((err, index) => (
                      <li key={index}>
                        <div className="mb2">
                          <div><b>❌ {err.message}</b></div>
                          <pre className="ml2 gray">{err.detail}</pre>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt4 b">Nouns Array</div>
              <ul className="mt0 pt0 black">
                {stepResult.nounsArray.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
             
              {handleNounsErrors.length > 0 && (
                <div className="mt3 red">
                  <div className="b">Noun Errors</div>
                  <ul className="f6">
                    {handleNounsErrors.map((err, index) => (
                      <li key={index}>
                        <div className="mb2">
                          <div><b>❌ {err.message}</b></div>
                          <pre className="ml2 gray">{err.detail}</pre>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt4 b">Verbs</div>
              <ul className="mt0 pt0 black">
                {stepResult.verbsArray.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
              {handleVerbsErrors.length > 0 && (
                <div className="mt3 red">
                  <div className="b">Verb Errors</div>
                  <ul className="f6">
                    {handleVerbsErrors.map((err, index) => (
                      <li key={index}>
                        <div className="mb2">
                          <div><b>❌ {err.message}</b></div>
                          <pre className="ml2 gray">{err.detail}</pre>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelGenAIPro
