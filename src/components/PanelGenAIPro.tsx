import React, { useState } from 'react'
// import React, { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { APP_HOME, GEN_AI_STEP, type ChooseParticipantsProps, type DialogPrompt, type DialogPromptProps, type GeneratePromptSet, type HandleDialogProps, type JsonQualification, type Language, type NounsPrompt, type NounsPromptProps, type PromptSet, type UseMyself } from '../cknTypes/types/types'
// import Button from "./Button"
// import { faKey } from '@fortawesome/free-solid-svg-icons'
// import { getCurrentWeek } from './Util'
import { getScenarioDetails } from './Util'
import Scenario from './Scenario'
import ParticipantToggle from './ParticipantToggle'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLockOpen } from '@fortawesome/free-solid-svg-icons'
// import { usePanel } from '../hooks/usePanel'

const PanelGenAIPro: React.FC = () => {
  const {
    setDialogKeep,
    setStepResult,
    stepResult,
    activeHome,
    setNounsKeep
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
  
  const generatePromptSet: GeneratePromptSet = (jsonQualification: JsonQualification): PromptSet => {
    const nounsPrompt: NounsPrompt = ({dialog}: NounsPromptProps) => `
REQUEST: Extract the nouns from the dialog below:

DIALOG: ${dialog}
${jsonQualification}
Each string in the array must take the form:

    "gender:noun(singular):noun(plural):article(singular):article(plural):use (singular) with a preposition:use (singular) with a preposition:use (plural) with a preposition:use (plural) with a preposition"

where you may use the following prepositions when forming phrases,

    a, con, de, desde, en, entre, hacia, hasta, para, por, sin, sobre.

These prepositions are common in beginner Spanish and should be used to form natural, grammatically correct expressions.

A complete example follows:

    [
      "masculino:restaurante:restaurantes:el:los:en el restaurante:desde el restaurante:en los restaurantes:desde los restaurantes",
      "femenino:paella:paellas:la:las:con la paella:para la paella:con las paellas:para las paellas",
      "masculino:camarero:camareros:el:los:con el camarero:para el camarero:con los camareros:para los camareros"
    ]
`

    const dialogPrompt: DialogPrompt = ({language, scenarioLabel, participant}: DialogPromptProps) => `
Create a dialog in ${language} appropriate for a beginning language
instruction, where the dialog takes place ${scenarioLabel}
between ${participant}.
Use between 6 to 8 sentences for this dialog.

${jsonQualification}

Note, a dialog response is an array of strings that take the form,

"Participant: Line from the dialog"

A complete example follows: 

[
  "Hostess: Welcome to our restaurant! How many in your party?",
  "Waitress: Here are the menus. Can I start you off with some drinks?",
  "Male diner: I'll have the steak, please."
]
`

    return {
      dialogPrompt,
      nounsPrompt
    }
  }

//   const jsonQualification = `
// RESPONSE: Express your response using well-formed JSON only, with no trailing
// commas, no single quotes (use double quotes only), no Markdown wrappers, no
// comments, no explanatory text or prose or partial JSON blocks, and no headings
// or titles. The output must be a single valid JSON object or array, starting
// with { or [ and ending with } or ]. Do not prepend phrases like “Here is
// your JSON:”. Assume the consumer is a machine expecting strict JSON compliance.
// `

const jsonQualification = `
RESPONSE: Express your response using well-formed JSON only, with no trailing
commas, no single quotes (use double quotes only), no Markdown wrappers, no
comments, no explanatory text or prose or partial JSON blocks, and no headings
or titles. The output must be a single valid JSON array, starting
with [ and ending with ]. Do not prepend phrases like “Here is
your JSON:”. Assume the consumer is a machine expecting strict JSON compliance.
`

const looksLikeStringArray = /^\s*\[\s*"(?:[^"\\]|\\.)*"(?:\s*,\s*"(?:[^"\\]|\\.)*")*\s*\]\s*$/s

const handleDialog = async ({
  prompt,
  nextStep,
  setStepResult
}: HandleDialogProps) => {
  console.log(prompt)

  const alwaysTrue = true
  if (alwaysTrue) {
    return
  }

  const response = await fetchFromOpenAI(prompt)

  if (!response || !looksLikeStringArray.test(response)) {
    console.log('Response from ChatGPT AI is not well-formed')
    return
  }

  let parsed: string[]
  try {
    parsed = JSON.parse(response)
  } catch (err) {
    console.error('Failed to parse response as JSON:', err)
    return
  }

  if (!Array.isArray(parsed) || !parsed.every(line => typeof line === 'string')) {
    console.error('Parsed result is not a string[]')
    return
  }
  
  const stringified = JSON.stringify(parsed)
  setDialogKeep(stringified)
  localStorage.setItem('dialogKeep', stringified)

  setStepResult(prev => {
    const updated = { ...prev, dialog: parsed }
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

    const alwaysTrue = true
    if (alwaysTrue) {
      return
    }

    const response = await fetchFromOpenAI(prompt)

    if (!response || !looksLikeStringArray.test(response)) {
      console.log('Response from ChatGPT AI is not well-formed')
      return
    }
  
    let parsed: string[]
    try {
      parsed = JSON.parse(response)
    } catch (err) {
      console.error('Failed to parse response as JSON:', err)
      return
    }

    if (!Array.isArray(parsed)) {
      console.error('Parsed response is not an array')
      return
    }
    
    if (!parsed.every(line => typeof line === 'string')) {
      console.error('One or more items in the parsed array is not a string')
      return
    }
    
    if (!parsed.every(line => line.split(':').length === 9)) {
      console.error('One or more items in the parsed array does not have 9 colon-separated fields')
      return
    }    
    
    const stringified = JSON.stringify(parsed)
    setNounsKeep(stringified)
    localStorage.setItem('nounsKeep', stringified)

    setStepResult(prev => {
      const updated = { ...prev, nouns: parsed }
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

  const promptSet = generatePromptSet(jsonQualification)

  const dialogPrompt = promptSet.dialogPrompt({language, scenarioLabel, participant})
  const nounsPrompt = promptSet.nounsPrompt({dialog: stepResult.dialog.join(' ')})

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
