import React, { useState } from 'react'
// import React, { useMemo, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import {
  APP_HOME,
  ERROR_LABEL,
  // GEN_AI_STEP,
  LANGUAGE,
  MODULE_NAME
} from '../../../shared/types'
import type {
  // GetDialogReviewProps,
  // GetDialogReviewResult,
  // HandleDialogReviewProps,
  Language,
  UseMyself,
  // HandleNounsReviewProps,
  // GetNounsReviewProps,
  // GetNounsReviewResult,
  TestMode,
  Lesson,
} from '../../../shared/types'
import { getScenarioDetails } from '../Util'
import ScenarioSelector from '../ScenarioSelector'
import ParticipantToggle from '../ParticipantToggle'
import { resetErrors } from '../errorUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import handleModule from './PanelGenAIProComponents/handleModule/handleModule'
// import handleNouns from './PanelGenAIProComponents/handleNouns/handleNouns'
// import handleVerbs from './PanelGenAIProComponents/handleVerbs/handleVerbs'

const PanelGenAIPro: React.FC = () => {
  const {
    activeHome,
    handleDialogErrors,
    handleNounsErrors,
    handleVerbsErrors,
    setHandleDialogErrors,
    setHandleNounsErrors,
    setHandleVerbsErrors,
    setLesson,
    lesson
  } = useAppContext()

  const isActive = activeHome === APP_HOME.GEN_AI_PRO
  const translateX = isActive ? 'translate-x-0' : 'translate-x-full'

  const [useMyself, setUseMyself] = useState<UseMyself>(false)
  // const [, setStep] = useState<number>(0)
  const [showDialogPrompt, setShowDialogPrompt] = useState(false)
  const [showNounsPrompt, setShowNounsPrompt] = useState(false)
  const [showVerbsPrompt, setShowVerbsPrompt] = useState(false)
  const [showDialogReviewPrompt, setShowDialogReviewPrompt] = useState(false)
  const [showNounsReviewPrompt, setShowNounsReviewPrompt] = useState(false)
  const [showVerbsReviewPrompt, setShowVerbsReviewPrompt] = useState(false)

  const [language, ] = useState<Language>(LANGUAGE.SPANISH)
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

  const toggleShowVerbsReviewPrompt = () => {
    setShowVerbsReviewPrompt(prev => !prev)
  }
    
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
              <ScenarioSelector custom={false} />
            </div>
            <div className="mt1 mb3">
              <ParticipantToggle useMyself={useMyself} onClick={setUseMyself} />
            </div>
          </div>

          <div className="mv3">
            <button
              onClick={() => setTestMode(prev => !prev)}
              className={`w-30 pa3 br2 bn ${testMode ? 'bg-brand' : 'bg-black'} white pointer`}
            >
              <div className="pa5X flex items-center" >
                <div className="ph1 bg-redX"><FontAwesomeIcon icon={testMode ? faLock : faLockOpen} /></div>
                <div className="ml2">{testMode ? 'Disable' : 'Enable'} Test Mode</div>
              </div>
            </button>
          </div>

          <div className={`ba bw2 pa4 ${testMode ? 'bg-black' : 'bg-white'} b--black flex flex-column`}>
            <div>
              <button
                onClick={() => {
                  const {
                    scenarioLabel,
                    participantList
                  } = getScenarioDetails({scenario, language})

                  const updatedLesson: Lesson = {
                    ...lesson,

                    language,
                    scenarioLabel,
                    participantList
                  }

                  handleModule({
                    lesson: updatedLesson, // keeping it slightly more general
                    moduleName: MODULE_NAME.DIALOG,
                    setLesson,
                    testMode
                  })
                }}
                className="pa2 br2 bn mb4 bg-brand white pointer"
              >
                Get Dialog {testMode ? '(Test Mode)' : ''}
              </button>
            </div>

            <div>
              <button
                onClick={() =>
                  // handleDialogReview({
                  //   testMode,
                  //   language,
                  //   dialogLines: lesson.dialogLines,
                  //   dialogSignature: lesson.dialogSignature
                  // })

                  handleModule({
                    lesson, // keeping it slightly more general
                    moduleName: MODULE_NAME.DIALOG_REVIEW,
                    setLesson,
                    testMode
                  })
                }
                className="mv3X pa2 br2 bn bg-purple white pointer"
              >
                Review Dialog {testMode ? '(Test Mode)' : ''}
              </button>
            </div>
          </div>

          <div className={`ba bw2 mv3 pa4 ${testMode ? 'bg-black' : 'bg-white'} b--black flex flex-column`}>
            <div className="mv3">
              <button
                onClick={() =>
                  // handleNouns({
                  //   testMode,
                  //   lesson,
                  //   setLesson
                  // })

                  handleModule({
                    lesson, // keeping it slightly more general
                    moduleName: MODULE_NAME.NOUNS,
                    setLesson,
                    testMode
                  })
                }
                className="pa2 br2 bn bg-brand white pointer"
              >
                Get Nouns {testMode ? '(Test Mode)' : ''}
              </button>
            </div>

            <div>
              <button
                onClick={() =>
                  // handleNounsReview({
                  //   testMode,
                  //   language,
                  //   nounsArray: lesson.nounsArray,
                  //   dialogSignature: lesson.dialogSignature
                  // })

                  handleModule({
                    lesson, // keeping it slightly more general
                    moduleName: MODULE_NAME.NOUNS_REVIEW,
                    setLesson,
                    testMode
                  })

                }
                className="mv3 pa2 br2 bn bg-purple white pointer"
              >
                Review Nouns {testMode ? '(Test Mode)' : ''}
              </button>
            </div>
          </div>

          <div className={`ba bw2 pa4 ${testMode ? 'bg-black' : 'bg-white'} b--black flex flex-column`}>
            <div className="mv3">
              <button
                onClick={() =>
                  // handleVerbs({
                  //   testMode,
                  //   lesson,
                  //   setLesson
                  // })
                  handleModule({
                    lesson, // keeping it slightly more general
                    moduleName: MODULE_NAME.VERBS,
                    setLesson,
                    testMode
                  })
                }
                className="pa2 br2 bn bg-brand white pointer"
              >
                Get Verbs {testMode ? '(Test Mode)' : ''}
              </button>
            </div>

            <div>
              <button
                onClick={() =>
                  // handleNounsReview({
                  //   testMode,
                  //   language,
                  //   nounsArray: lesson.nounsArray,
                  //   dialogSignature: lesson.dialogSignature
                  // })

                  handleModule({
                    lesson, // keeping it slightly more general
                    moduleName: MODULE_NAME.VERBS_REVIEW,
                    setLesson,
                    testMode
                  })
                }
                className="mv3 pa2 br2 bn bg-purple white pointer"
              >
                Review Verbs {testMode ? '(Test Mode)' : ''}
              </button>
            </div>

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
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.dialog.prompt}</div>
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
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.nouns.prompt}</div>
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
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.verbs.prompt}</div>
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
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.dialogReview.prompt}</div>
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
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.nounsReview.prompt}</div>
              </div>
            </div>
          )}

          <div className="w-100">
            <button
              onClick={toggleShowVerbsReviewPrompt}
              className="mt3 pa2 br2 bn bg-brand white pointer"
            >
              {showVerbsReviewPrompt ? 'Hide Verbs Review Prompt' : 'Show Verbs Review Prompt'}
            </button>
          </div>

          {showVerbsReviewPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-white">
                <div className="mt4X b" style={{ whiteSpace: 'pre-wrap' }}>Verbs Review Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.verbsReview.prompt}</div>
              </div>
            </div>
          )}
          
          <div className="w-100 flex justify-center flex-column">
            <div>
              <div className="mt4 b">Dialog Array</div>
              <ul className="mt0 pt0 black">
                {lesson.dialog.lines.map((line, index) => (
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
                {lesson.nouns.lines.map((line, index) => (
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
                {lesson.verbs.lines.map((line, index) => (
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
