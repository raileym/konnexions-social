import React, { useState } from 'react'
// import React, { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { APP_HOME, ERROR_LABEL, GEN_AI_STEP, type ChooseParticipantsProps, type Dialog, type DialogPrompt, type DialogPromptProps, type GeneratePromptSet, type HandleDialogProps, type JsonQualification, type Language, type Nouns, type NounsPrompt, type NounsPromptProps, type PromptSet, type UseMyself, type Verbs } from '../cknTypes/types/types'
// import Button from "./Button"
// import { faKey } from '@fortawesome/free-solid-svg-icons'
// import { getCurrentWeek } from './Util'
import { getScenarioDetails } from './Util'
import Scenario from './Scenario'
import ParticipantToggle from './ParticipantToggle'
import { validateGenAIResponse } from './errorUtils'
import { generatePromptSet } from './generatePromptSet'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLockOpen } from '@fortawesome/free-solid-svg-icons'
// import { usePanel } from '../hooks/usePanel'

const PanelGenAIPro: React.FC = () => {
  const {
    activeHome,
    setDialogKeep,
    setHandleDialogErrors,
    setHandleNounsErrors,
    setHandleVerbsErrors,
    setNounsKeep,
    setStepResult,
    stepResult,
    setVerbsKeep
  } = useAppContext()

  const isActive = activeHome === APP_HOME.GEN_AI_PRO
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'
  // const { switchPanel } = usePanel()

  const [useMyself, setUseMyself] = useState<UseMyself>(false)
  // const [stepResult, setStepResult] = useState<StepResult>(defaultStepResult)
  const [, setStep] = useState<number>(0)
  // const [step, setStep] = useState<number>(0)
  const [showStepResult, setShowStepResult] = useState(true)
  const [language, ] = useState<Language>('Spanish')

  const toggleStepResult = () => {
    setShowStepResult(prev => !prev)
  }
    
  const fetchFromOpenAI = async (prompt: string): Promise<string | null> => {
    if (!openAiKey) return null
  
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        }),
      })
  
      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || ''
      return reply
    } catch (err) {
      console.error('OpenAI error:', err)
      return null
    }
  }

  const handleDialog = async ({
    prompt,
    nextStep,
    setStepResult
  }: HandleDialogProps) => {
    console.log(prompt)

    // const alwaysTrue = true
    // if (alwaysTrue) {
    //   return
    // }

    const response = await fetchFromOpenAI(prompt)

    const result = validateGenAIResponse<Dialog>({
      response,
      errorLabel: ERROR_LABEL.DIALOG_ERROR,
      setErrors: setHandleDialogErrors,
      expectedFieldCount: 2
    })

    console.log(result)

    if (!result.success) {
      console.log('Houston, we have a problem', result.error.message)
      console.log(result.error)
      return
    }

    const stringified = JSON.stringify(result.parsed)
    setDialogKeep(stringified)
    localStorage.setItem('dialogKeep', stringified)

    setStepResult(prev => {
      const updated = { ...prev, dialog: result.parsed }
      localStorage.setItem('stepResult', JSON.stringify(updated))
      return updated
    })

    setStep(nextStep)
  }
  
  const handleNouns = async ({
    prompt,
    nextStep,
    setStepResult
  }: HandleDialogProps) => {
    console.log(prompt)

    // const alwaysTrue = true
    // if (alwaysTrue) {
    //   return
    // }

    const response = await fetchFromOpenAI(prompt)

    const result = validateGenAIResponse<Nouns>({
      response,
      errorLabel: ERROR_LABEL.NOUNS_ERROR,
      setErrors: setHandleNounsErrors,
      expectedFieldCount: 9
    })

    console.log(result)

    if (!result.success) {
      console.log('Houston, we have a problem', result.error.message)
      console.log(result.error)
      return
    }
    
    const stringified = JSON.stringify(result.parsed)
    setNounsKeep(stringified)
    localStorage.setItem('nounsKeep', stringified)

    setStepResult(prev => {
      const updated = { ...prev, nouns: result.parsed }
      localStorage.setItem('stepResult', JSON.stringify(updated))
      return updated
    })

    setStep(nextStep)
  }

  const handleVerbs = async ({
    prompt,
    nextStep,
    setStepResult
  }: HandleDialogProps) => {
    console.log(prompt)

    // const alwaysTrue = true
    // if ( alwaysTrue ) {
    //   return
    // }

    const response = await fetchFromOpenAI(prompt)

    const result = validateGenAIResponse<Verbs>({
      response,
      errorLabel: ERROR_LABEL.VERBS_ERROR,
      setErrors: setHandleVerbsErrors,
      expectedFieldCount: 9
    })

    console.log(result)

    if (!result.success) {
      console.log('Houston, we have a problem', result.error.message)
      console.log(result.error)
      return
    }
    
    const stringified = JSON.stringify(result.parsed)
    setVerbsKeep(stringified)
    localStorage.setItem('verbsKeep', stringified)

    setStepResult(prev => {
      const updated = { ...prev, verbs: result.parsed }
      localStorage.setItem('stepResult', JSON.stringify(updated))
      return updated
    })

    setStep(nextStep)
  }

  const chooseParticipants = ({participants, n, useMyself}: ChooseParticipantsProps): string => {
    if (!participants || participants.length === 0 || n <= 0) return ''
  
    const count = useMyself ? n - 1 : n
    const shuffled = [...participants].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, Math.min(count, participants.length))
  
    if (useMyself) selected.unshift('myself')
  
    if (selected.length === 1) return selected[0]
    if (selected.length === 2) return `${selected[0]} and ${selected[1]}`
  
    const last = selected.pop()
    return `${selected.join(', ')}, and ${last}`
  }  
    
  const {
    openAiKey,
    scenario
  } = useAppContext()

  const {scenarioLabel, scenarioParticipants} = getScenarioDetails(scenario)

  const participant = chooseParticipants({participants: scenarioParticipants, n: 2, useMyself: false})

  const promptSet = generatePromptSet()

  const dialogPrompt = promptSet.dialogPrompt({language, scenarioLabel, participant})
  const nounsPrompt = promptSet.nounsPrompt({dialog: stepResult.dialog.join(' ')})
  const verbsPrompt = promptSet.verbsPrompt({dialog: stepResult.dialog.join(' ')})

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

          <div>
            <button
              onClick={() =>
                handleDialog({
                  prompt: dialogPrompt,
                  nextStep: GEN_AI_STEP.NOUNS,
                  setStepResult
                })
              }
              className="pa2 br2 bn bg-brand white pointer"
            >
              Run Dialog Step
            </button>
          </div>

          <div className="mv3">
            <button
              onClick={() =>
                handleNouns({
                  prompt: nounsPrompt,
                  nextStep: GEN_AI_STEP.VERBS,
                  setStepResult
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

          <div className="w-100">
            {openAiKey && (
              <button
                onClick={toggleStepResult}
                className="pa2 br2 bn bg-brand white pointer"
              >
                {showStepResult ? 'Hide Full Prompt' : 'Show Full Prompt'}
              </button>
            )}

            {openAiKey && showStepResult && (
              <div className="w-100 flex justify-center">
                <div>
                  <div className="mt4 b">Dialog</div>
                  <ul className="mt0 pt0 black">
                    {stepResult.dialog.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                  <div className="mt4 b">Nouns</div>
                  <ul className="mt0 pt0 black">
                    {stepResult.nouns.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                  <div className="mt4 b">Verbs</div>
                  <ul className="mt0 pt0 black">
                    {stepResult.verbs.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelGenAIPro
