import React, { useState } from 'react'
// import React, { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import {
  APP_HOME,
  ERROR_LABEL,
  GEN_AI_STEP
} from '../../shared/types'
import type {
  DialogArray,
  // ChooseParticipantsProps,
  // Dialog,
  // GenAIValidationResult,
  GetDialogResult,
  GetNounsResult,
  HandleDialogProps,
  HandleNounsProps,
  HandleVerbsProps,
  Language,
  // Nouns,
  // Participant,
  ParticipantList,
  ScenarioLabel,
  UseMyself,
  // Verbs
} from '../../shared/types'
// import Button from "./Button"
// import { faKey } from '@fortawesome/free-solid-svg-icons'
// import { getCurrentWeek } from './Util'
import { getScenarioDetails } from './Util'
import Scenario from './Scenario'
import ParticipantToggle from './ParticipantToggle'
import { resetErrors } from './errorUtils'
import { generatePromptSet } from '../../shared/generatePromptSet'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLockOpen } from '@fortawesome/free-solid-svg-icons'
// import { usePanel } from '../hooks/usePanel'

const PanelGenAIPro: React.FC = () => {
  const {
    // setNounsKeep,
    // setVerbsKeep,
    activeHome,
    handleDialogErrors,
    handleNounsErrors,
    handleVerbsErrors,
    setHandleDialogErrors,
    setHandleNounsErrors,
    setHandleVerbsErrors,
    setStepResult,
    stepResult,
    
    // dialogPrompt, setDialogPrompt,
    // nounsPrompt, setNounsPrompt,

    // dialogArray, setDialogArray,
    // nounsArray, setNounsArray
  } = useAppContext()

  const isActive = activeHome === APP_HOME.GEN_AI_PRO
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'
  // const { switchPanel } = usePanel()

  const [useMyself, setUseMyself] = useState<UseMyself>(false)
  // const [stepResult, setStepResult] = useState<StepResult>(defaultStepResult)
  const [, setStep] = useState<number>(0)
  // const [step, setStep] = useState<number>(0)
  const [showDialogPrompt, setShowDialogPrompt] = useState(false)
  const [showNounsPrompt, setShowNounsPrompt] = useState(false)
  const [language, ] = useState<Language>('Spanish')
  const [ testMode, setTestMode] = useState<boolean>(true)

  const toggleShowDialogPrompt = () => {
    setShowDialogPrompt(prev => !prev)
  }
    
  const toggleShowNounsPrompt = () => {
    setShowNounsPrompt(prev => !prev)
  }
    
  const getDialog = async (
    language: Language,
    scenarioLabel: ScenarioLabel,
    scenarioParticipantList: ParticipantList
  ): Promise<GetDialogResult | null> => {
    // cXonsole.log(scenarioParticipantList)
    try {
      const res = await fetch('/.netlify/functions/genai-dialog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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

  const getNouns = async (
    language: Language,
    dialogArray: DialogArray
  ): Promise<GetNounsResult | null> => {
    const dialog = dialogArray.join(' ')

    console.log(dialog)

    try {
      const res = await fetch('/.netlify/functions/genai-nouns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          dialog
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
    language, 
    scenarioLabel,
    scenarioParticipantList
  }: HandleDialogProps) => {

    const alwaysTrue = true
    if (alwaysTrue && testMode) {
      return
    }

    const response = await getDialog(language, scenarioLabel, scenarioParticipantList)

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
  
  const reviewDialog = async ({
    language, 
    scenarioLabel,
    scenarioParticipantList
  }: HandleDialogProps) => {
    // cXonsole.log(prompt)

    const alwaysTrue = true
    if (alwaysTrue && testMode) {
      return
    }

    const alwaysTrue2 = true
    if (alwaysTrue2) {
      return
    }

    console.log(language)
    console.log(scenarioLabel)
    console.log(scenarioParticipantList)

    // const response = await fetchFromOpenAI(prompt)

    // const result = validateGenAIResponse<Dialog>({
    //   response,
    //   errorLabel: ERROR_LABEL.DIALOG_ERROR,
    //   setErrors: setHandleDialogErrors,
    //   expectedFieldCount: 2,
    //   language: ''
    // })    

    // console.log(result)

    // if (!result.success) {
    //   console.log('Houston, we have a problem', result.error.message)
    //   console.log(result.error)
    //   return
    // }

    // setStepResult(prev => {
    //   const updated = { ...prev, dialog: result.parsed }
    //   localStorage.setItem('stepResult', JSON.stringify(updated))
    //   return updated
    // })

    // setStep(nextStep)
  }
  
  const handleNouns = async ({
    language,
    dialogArray
  }: HandleNounsProps) => {
    console.log(`language: ${language}`)
    console.log(dialogArray)

    const alwaysTrue = true
    if (alwaysTrue && testMode) {
      return
    }

    const response = await getNouns(language, dialogArray)

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
      localStorage.setItem('stepResult', JSON.stringify(updated))
      return updated
    })
    
    setStep(GEN_AI_STEP.NOUNS_REVIEW)
  }

  const handleVerbs = async ({
    prompt,
    nextStep,
    setStepResult
  }: HandleVerbsProps) => {
    console.log(prompt)

    const alwaysTrue = true
    if ( alwaysTrue && testMode ) {
      return
    }

    const alwaysTrue2 = true
    if (alwaysTrue2) {
      return
    }

    console.log(nextStep)
    console.log(setStepResult)

    // const response = await fetchFromOpenAI(prompt)

    // const result = validateGenAIResponse<Verbs>({
    //   response,
    //   errorLabel: ERROR_LABEL.VERBS_ERROR,
    //   setErrors: setHandleVerbsErrors,
    //   expectedFieldCount: 7,
    //   language: ''
    // })
    
    // console.log(result)

    // if (!result.success) {
    //   console.log('Houston, we have a problem', result.error.message)
    //   console.log(result.error)
    //   return
    // }
    
    // const stringified = JSON.stringify(result.parsed)
    // setVerbsKeep(stringified)
    // localStorage.setItem('verbsKeep', stringified)

    // setStepResult(prev => {
    //   const updated = { ...prev, verbs: result.parsed }
    //   localStorage.setItem('stepResult', JSON.stringify(updated))
    //   return updated
    // })

    // setStep(nextStep)
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

  const {scenarioLabel, scenarioParticipantList} = getScenarioDetails({scenario, language})

  // const participant = chooseParticipants({participants: scenarioParticipants, n: 2, useMyself: false})

  const promptSet = generatePromptSet()

  // const dialogPrompt = promptSet.dialogPrompt({language, scenarioLabel, participant})
  // const dialogReviewPrompt = promptSet.dialogReviewPrompt({language, dialog: stepResult.dialog.join(' ')})
  // const nounsPrompt = promptSet.nounsPrompt({dialog: stepResult.dialog.join(' ')})
  const verbsPrompt = promptSet.getVerbsPrompt({dialog: stepResult.dialog})

  const headline = 'Ask ChatGPT to create a custom dialog based on a specific situation — at a restaurant, in a hotel, at the airport, or one you describe yourself.'

  console.log(stepResult)

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
            {testMode && (
              <button
                onClick={() => setTestMode(false)}
                className="w-20 pa2 br2 bn bg-green white pointer"
              >
                Disable Test Mode
              </button>
            )}
            {!testMode && (
              <button
                onClick={() => setTestMode(true)}
                className="w-20 pa2 br2 bn bg-brand white pointer"
              >
                Enable Test Mode
              </button>
            )}

          </div>

          <div>
            <button
              onClick={() =>
                handleDialog({
                  language, 
                  scenarioLabel,
                  scenarioParticipantList
                })
              }
              className="pa2 br2 bn bg-brand white pointer"
            >
              Run Dialog Step
            </button>
          </div>

          <div>
            <button
              onClick={() =>
                reviewDialog({
                  language, 
                  scenarioLabel,
                  scenarioParticipantList              
                })
              }
              className="mv3 pa2 br2 bn bg-purple white pointer"
            >
              Review Dialog Step
            </button>
          </div>

          <div className="mv3">
            <button
              onClick={() =>
                handleNouns({
                  language,
                  dialogArray: stepResult.dialogArray
                  // prompt: nounsPrompt,
                  // nextStep: GEN_AI_STEP.VERBS,
                  // setStepResult
                })
              }
              className="pa2 br2 bn bg-brand white pointer"
            >
              Run Nouns Step
            </button>
          </div>

          <div className="mv3">
            <button
              onClick={() =>
                handleVerbs({
                  prompt: verbsPrompt,
                  nextStep: GEN_AI_STEP.VERB_CONJUGATIONS,
                  setStepResult
                })
              }
              className="pa2 br2 bn bg-brand white pointer"
            >
              Run Verbs Step
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
              Reset Errors
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
              <div>Wait for Verbs Array</div>
              {/*
              <ul className="mt0 pt0 black">
                {stepResult.verbsArray.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
              */}
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
