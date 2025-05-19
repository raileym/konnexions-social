import React, { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { APP_HOME, type Participants, type UseMyself } from '../cknTypes/types/types'
// import Button from "./Button"
// import { faKey } from '@fortawesome/free-solid-svg-icons'
import { getCurrentWeek } from './Util'
import { getScenarioDetails } from './Util'
import Scenario from './Scenario'
import ParticipantToggle from './ParticipantToggle'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLockOpen } from '@fortawesome/free-solid-svg-icons'
// import { usePanel } from '../hooks/usePanel'

const PanelGenAIPro: React.FC = () => {
  const { activeHome } = useAppContext()
  const isActive = activeHome === APP_HOME.GEN_AI_PRO
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'
  // const { switchPanel } = usePanel()

  const [showAskChatGPT, setShowAskChatGPT] = useState(true)
  const [showFullPrompt, setShowFullPrompt] = useState(true)
  const [showQuestionKeep, setShowQuestionKeep] = useState(false)
  const [showAnswerKeep, setShowAnswerKeep] = useState(false)
  const [useMyself, setUseMyself] = useState<UseMyself>(false)
  
  const toggleAskChatGPT = () => {
    setShowAskChatGPT(prev => !prev)
  }
    
  const toggleFullPrompt = () => {
    setShowFullPrompt(prev => !prev)
  }
    
  const toggleQuestionKeep = () => {
    setShowQuestionKeep(prev => !prev)
  }
    
  const toggleAnswerKeep = () => {
    setShowAnswerKeep(prev => !prev)
  }

  type ChooseParticipantsProps = {
    participants: Participants
    n: number
    useMyself: UseMyself
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
    answerKeep,
    setAnswerKeep,
    questionKeep,
    setQuestionKeep
    // activePanel
  } = useAppContext()

  const incrementOpenAiUsage = () => {
    const week = getCurrentWeek()
    const key = `openAiUsageW${week}`
    const current = openAiUsage + 1
    localStorage.setItem(key, current.toString())
    setOpenAiUsage(current)
  }

  type ParsedAnswer = {
    dialog: string[] // array of simple utterance strings
  
    nouns: Record<string, string> // noun → matching phrase
  
    verbs: Record<string, string> // verb → matching phrase
  
    verbConjugations: {
      [verb: string]: {
        nosotros: string
        yo: string
        'él/ella': string
        'ellos/ellas': string
        tú: string
      }
    }
  
    nounUsage: {
      [noun: string]: {
        masculine: string
        feminine: string
        preposition: string
      }
    }
  }
  
  // const parsedAnswer = null
  const parsedAnswer = useMemo(() => {
    try {
      return JSON.parse(answerKeep) // as ParsedAnswer
    } catch (err) {
      // console.error('Error parsing JSON:', err)
      console.log('TRULLY A PROBLEM: Error parsing JSON:', err)
      console.log(answerKeep)
      return null
    }
  }, [answerKeep])
  
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

      setQuestionKeep(question)
      localStorage.setItem('questionKeep', question)
      
      setAnswerKeep(reply)
      localStorage.setItem('answerKeep', reply)
      console.log(reply)

      incrementOpenAiUsage()
    } catch (err) {
      console.error('Failed to call OpenAI:', err)
    }
  }
  

  const {scenarioLabel, scenarioParticipants, scenarioParticipantsUpgrade} = getScenarioDetails(scenario)

  const extendedInstruction = `
3. nouns: For each noun in the dialog, extract the 4–5 word expression that contains it.
4. verbs: For each verb in the dialog, extract the 4–5 word expression that contains it.
5. verbConjugations: Choose four verbs. For each, return conjugated examples as follows:
  5a. VERB. PRONOUN VERB. PRONOUN VERB DIRECT_OBJECT.
  5b. Let 1PP = 1st Person Plural, 1PS = 1st Person Singular, 3PS = 3rd Person Singular,
      3PP = 3rd Person Plural, 2PS = 2nd Person Singular.
  5c. Present these in order: 1PP, 1PS, 3PS, 3PP, 2PS. (Skip 2PP, used only in Spain.)
6. nounUsage: Choose six nouns. For each, provide gendered examples:
  6a. Masculine: NOUN. EL NOUN. DEL NOUN.
  6b. Feminine: NOUN. LA NOUN. DE LA NOUN.
  6c. Use a different preposition in the last example to vary usage. Use common, idiomatic
      prepositions that match how the noun would be used in real conversation.
  6d. Please ensure correct grammatical gender and accurate noun meaning when
      providing masculine and feminine forms.
  6e. In part 4c above, use common, idiomatic prepositions that match how the noun
      would be used in real conversation.
`

  const exampleForm = `
{
  "scenario": "restaurant",
  "dialog": [
    "Host: Welcome to our restaurant! How many in your party?",
    "Waiter: Here are the menus. Can I start you off with some drinks?",
    "Female diner: I'll have the salad, please."
  ],
  "nouns": ["restaurante", "anfitrión"],
  "verbs": ["crear un diálogo", "elegir al azar"],
  "verbConjugations": {
    "crear": {
      "1PP": "Nosotros creamos.",
      "1PS": "Yo creo.",
      "3PS": "Él/ella crea.",
      "3PP": "Ellos/ellas crean.",
      "2PS": "Tú creas."
    }
  },
  "nounUsage": {
    "restaurante": {
      "Masculine": "El restaurante.",
      "Feminine": "La mesa del restaurante.",
      "FeminineDifferentPrep": "De la cocina al restaurante."
    }
  }
}
`

  const participants = chooseParticipants({participants: scenarioParticipantsUpgrade, n: 4, useMyself: false})

  const nounsPrompt = `
Create a list of nouns from the dialog below
`

  const dialogPrompt = `
Create a dialog appropriate for a beginning language
instruction, where the dialog takes place ${scenarioLabel}
between ${participants}. Use between 6 to 8 sentences
for this dialog.

Express your response using well-formed JSON only, with no trailing commas,
no single quotes (use double quotes only), no Markdown wrappers, no comments,
no explanatory text or prose or partial JSON blocks, and no headings or
titles. The output must be a single valid JSON object or array, starting
with { or [ and ending with } or ]. Do not prepend phrases like “Here is
your JSON:”. Assume the consumer is a machine expecting strict JSON compliance.

Note, a dialog response is an array of strings that take the form,

"Participant: Line from the dialog"

A complete example follows: 

[
  "Hostess: Welcome to our restaurant! How many in your party?",
  "Waitress: Here are the menus. Can I start you off with some drinks?",
  "Male diner: I'll have the steak, please."
]
`

const fullPrompt = <div>
  <div className="b f3">Nouns Prompt</div>
  <div>{nounsPrompt}</div>
  <hr style={{height: "4px"}}className="bn bg-black-20 h1X mv4"/>
  <div className="b f3">Dialog Prompt</div>
  <div>{dialogPrompt}</div>
  <hr style={{height: "4px"}}className="bn bg-black-20 h1X mv4"/>
</div>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fullPromptX = `

  ${dialogPrompt}
Follow these instructions one-by-one in a multi-part response.
We begin with the scenario stated explicitly, e.g., in a restaurant.
Next, we have the dialog, which serves as the basis for the
remaining questions 3-6. For the dialog, use no more than 
six sentences as appropriate for a beginning language instruction. 

1. scenario: ${scenarioLabel}
2. dialog: I am ${scenarioLabel}. Please create a dialog between me and two other people,
randomly chosen from ${scenarioParticipants}. ${extendedInstruction}
Format the response as JSON with keys: scenario, dialog, nouns, verbs,
verbConjugations, nounUsage. Retain the keys in English, otherwise
express your verbal responses in Spanish. This is content for
a beginner's Spanish lesson.
Please form your response according to the unit counts described above,
i.e., (2) dialog: 6 sentences, (3) nouns: every noun, (4) verbs: every
verb, (5) verbConjugations: choose 4 verbs, and (6) nounUsage: choose
six nouns.
And, please form your response using a well-formed JSON format. No dangling 
commas. Object properties take the form { "name": "value" }. Arrays
take the form [ "one", "two", "three" ].
As illustration, use the following example to illustrate format only, not 
unit counts.
${exampleForm}
`

  const headline = 'Ask ChatGPT to create a custom dialog based on a specific situation — at a restaurant, in a hotel, at the airport, or one you describe yourself.'

  return (
    <div className={`gen-ai-pro-panel z-2 absolute top-0 left-0 w-100 h-100 bg-light-gray transition-transform ${translateX}`}>
      <div className="h-100 w-100 overflow-y-auto">
        <div className="pa4 mw7 w-100 black center mb5">
          <h2 className="f3 pa3 pb0 mt5 w-100 tc">Spanish: Premium</h2>
          <div className="f3 pv3 pt0 mt0">{headline}</div>

          <div className="flex items-start flex-wrap">
            <Scenario custom={false} />
            <ParticipantToggle useMyself={useMyself} onClick={setUseMyself} />
          </div>

          {/* <Scenario custom={false} />
          <>
            <ParticipantToggle useMyself={useMyself} onClick={setUseMyself} />
            <p>Selected: {useMyself ? 'Includes myself' : 'Excludes myself'}</p>
          </>           */}

          <div className="w-100">
            {openAiKey && (
              <button
              onClick={toggleAskChatGPT}
              className="mb3 pa2 br5 bn bg-light-blue dark-gray pointer"
              >
                {showAskChatGPT ? 'Hide Ask ChatGPT' : 'Show Ask ChatGPT'}
              </button>
            )}
          </div>

          <div className="w-100">
            { openAiKey && showAskChatGPT && (
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
                  Create Spanish Lesson
                </button>

                <label className="db mb2 f6 gray">OpenAI Response</label>
                <div className="pa2 bg-near-white mb3" style={{ whiteSpace: 'pre-wrap' }}>{answer}</div>
              </>
            )}
          </div>

          {/* <div className="b f2">Hello, world</div> */}
          
          <div className="w-100">
            {openAiKey && (
              <button
                onClick={toggleFullPrompt}
                className="mb3 pa2 br5 bn bg-light-blue dark-gray pointer"
              >
                {showFullPrompt ? 'Hide Full Prompt' : 'Show Full Prompt'}
              </button>
            )}

            {openAiKey && showFullPrompt && (
              <div className="silver h4X pre">{fullPrompt}</div>
            )}
          </div>

          <hr />

          <div className="w-100">
            {openAiKey && (
                <button
                  onClick={toggleQuestionKeep}
                  className="mb3 pa2 br5 bn bg-light-blue dark-gray pointer"
                >
                  {showQuestionKeep ? 'Hide QuestionKeep' : 'Show QuestionKeep'}
                </button>
              )}

            {openAiKey && showQuestionKeep && (
              <>
                <div className="ba bg-white black pa4 pre">{questionKeep}</div>
              </>
            )}
          </div>

          <div className="w-100">
            {openAiKey && (
                <button
                  onClick={toggleAnswerKeep}
                  className="mb3 pa2 br5 bn bg-light-blue dark-gray pointer"
                >
                  {showAnswerKeep ? 'Hide AnswerKeep' : 'Show AnswerKeep'}
                </button>
              )}

            {openAiKey && showAnswerKeep && (
              <>
                <div className="mv5">Example JSON Format = {exampleForm}</div>
                <div className="ba bg-white red pa4 mt4">
                  <pre>
{parsedAnswer}
                  </pre>
                  {/* <pre>
                    {(() => {
                      try {
                        const parsed = JSON.parse(answerKeep)
                        return JSON.stringify(parsed, null, 2)
                      } catch (err: unknown) {
                          if (err instanceof Error) {
                            console.error('Failed to call OpenAI:', err.message)
                          } else {
                            console.error('Unexpected error', err)
                          }
                        }
                    })()}
                  </pre> */}
                </div>
              </>
            )}
          </div>

          <div>{answerKeep}</div>

          {/* {parsedAnswer && (
            <>
              <div>
                <h3>Dialog Preview</h3>
                <ul>
                  {(parsedAnswer as ParsedAnswer).dialog?.map((line: string | { speaker: string, message?: string, utterance?: string, response?: string }, index: number) => (
                    <li key={index}>
                      {typeof line === 'string' ? line : `${line.speaker}: ${line.message ?? line.utterance} ${line.response ?? ''}`}
                    </li>
                  ))}
                </ul>
              </div>            

              <div>
                <h3>Nouns Preview</h3>
                <div className="ba">
                  {Object.entries((parsedAnswer as ParsedAnswer).nouns).map(([noun, expression]) => (
                    <div key={noun} className="flex flex-row bb b--black-10">
                      <div className="pa3 w-30 b">{noun}</div>
                      <div className="pa3 w-70">{expression}</div>
                    </div>
                  ))}
                </div>

              </div>            

            </>
          )} */}

        </div>
      </div>
    </div>
  )
}

export default PanelGenAIPro
