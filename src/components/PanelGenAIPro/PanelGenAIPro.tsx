import React, { useState } from 'react'
// import React, { useMemo, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import {
  APP_HOME,
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
  ModuleName,
  Module,
  LessonComplete,
} from '../../../shared/types'
import { getScenarioDetails } from '../Util'
import ScenarioSelector from '../ScenarioSelector'
import ParticipantToggle from '../ParticipantToggle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import handleModule from './PanelGenAIProComponents/handleModule/handleModule'
import { resolveDialog } from './PanelGenAIProComponents/resolveDialog/resolveDialog'
import { resolveNouns } from './PanelGenAIProComponents/resolveNouns/resolveNouns'
import { resolveVerbs } from './PanelGenAIProComponents/resolveVerbs/resolveVerbs'
// import handleNouns from './PanelGenAIProComponents/handleNouns/handleNouns'
// import handleVerbs from './PanelGenAIProComponents/handleVerbs/handleVerbs'
const PanelGenAIPro: React.FC = () => {
  const {
    activeHome,
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
  const [lessonComplete, setLessonComplete] = useState<LessonComplete>(false)
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

  type RunModuleProps = {
    moduleName: ModuleName
    lesson: Lesson
  }

  const runModule = async ({moduleName, lesson}: RunModuleProps): Promise<Lesson | null> => {
    const result = await handleModule({ lesson, moduleName, testMode })
    if (!result) return null
    console.log(`runModule (${moduleName})`)
    return {
      ...lesson,
      [moduleName]: result      
    }
  }

  return (
    <div className={`gen-ai-pro-panel z-2 absolute top-0 left-0 w-100 h-100 bg-light-gray transition-transform ${translateX}`}>
      <div className="h-100 w-100 overflow-y-auto">
        <div className="pa4 mw7 w-100 black center mb5">
          <h2 className="f3 pa3 pb0 mt5 w-100 tc">Spanish: Premium</h2>
          <div className="f3 pv3 pt0 mt0">{headline}</div>

          <div className="flex flex-column items-center w-100">
            <div className="mt3 mb1">
              <ScenarioSelector custom={false} />
            </div>
            <div className="mt1 mb3">
              <ParticipantToggle useMyself={useMyself} onClick={setUseMyself} />
            </div>
          </div>

          <div className="flex flex-column items-center w-100">
            <div className={`f3 mt3 mb1 ${lessonComplete ? 'o-100' : 'o-20'}`}>
              Lesson Complete
            </div>
          </div>

          <div className="mv3">
            <button
              onClick={() => setTestMode(prev => !prev)}
              className={`w-30 pa3 br2 bn ${testMode ? 'bg-brand' : 'bg-black'} white pointer`}
            >
              <div className="flex items-center" >
                <div className="ph1 bg-redX"><FontAwesomeIcon icon={testMode ? faLock : faLockOpen} /></div>
                <div className="ml2">{testMode ? 'Disable' : 'Enable'} Test Mode</div>
              </div>
            </button>
          </div>

          <div className={`ba bw2 mv3 pa4 ${testMode ? 'bg-black' : 'bg-white'} b--black flex flex-column`}>
            <div>
              <button
                onClick={async () => {
                  const {
                    scenarioLabel,
                    participantList
                  } = getScenarioDetails({ scenario, language })

                  const initialLesson = { 
                    ...lesson,
                    language,
                    scenarioLabel,
                    participantList
                  }

                  const dialogLesson = await runModule({moduleName: MODULE_NAME.DIALOG, lesson: initialLesson})
                  if (!dialogLesson) return

                  const dialogReviewLesson = await runModule({moduleName: MODULE_NAME.DIALOG_REVIEW, lesson: dialogLesson})
                  if (!dialogReviewLesson) return

                  const { dialogLinesResolved } = resolveDialog({
                    dialogReviewLines: dialogReviewLesson.dialog.lines, 
                    dialogLines: dialogLesson.dialog.lines
                  })
                  
                  const prose = dialogLinesResolved?.join(' ') ?? ''
                  const dialogLessonUpdated = {
                    ...dialogReviewLesson,
                    [MODULE_NAME.DIALOG]: {
                      ...(dialogReviewLesson[MODULE_NAME.DIALOG as keyof Lesson] as Module),
                      lines: dialogLinesResolved
                    },
                    prose
                  }
                  
                  const nounsLesson = await runModule({moduleName: MODULE_NAME.NOUNS, lesson: dialogLessonUpdated})
                  if (!nounsLesson) return

                  const nounsReviewLesson = await runModule({moduleName: MODULE_NAME.NOUNS_REVIEW, lesson: nounsLesson})
                  if (!nounsReviewLesson) return

                  const { nounsLinesResolved } = resolveNouns({
                    nounsReviewLines: nounsReviewLesson.nouns.lines, 
                    nounsLines: nounsLesson.nouns.lines
                  })

                  const nounsLessonUpdated = {
                    ...nounsLesson,
                    [MODULE_NAME.NOUNS]: {
                      ...(nounsLesson[MODULE_NAME.NOUNS as keyof Lesson] as Module),
                      lines: nounsLinesResolved
                    }
                  }

                  const verbsLesson = await runModule({moduleName: MODULE_NAME.VERBS, lesson: nounsLessonUpdated})
                  if (!verbsLesson) return

                  const verbsReviewLesson = await runModule({moduleName: MODULE_NAME.VERBS_REVIEW, lesson: verbsLesson})
                  if (!verbsReviewLesson) return

                  const { verbsLinesResolved } = resolveVerbs({
                    verbsReviewLines: verbsReviewLesson.verbs.lines, 
                    verbsLines: verbsLesson.verbs.lines
                  })

                  const verbsLessonUpdated = {
                    ...verbsLesson,
                    [MODULE_NAME.VERBS]: {
                      ...(verbsLesson[MODULE_NAME.VERBS as keyof Lesson] as Module),
                      lines: verbsLinesResolved
                    }
                  }

                  setLesson(verbsLessonUpdated)

                  setLessonComplete(true)
                }}
                className="pa2 br2 bn bg-brand white pointer"
              >
                Master Button {testMode ? '(Test Mode)' : ''}
              </button>

            </div>
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
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Dialog Prompt</div>
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
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Nouns Prompt</div>
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
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Verbs Prompt</div>
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
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Dialog Review Prompt</div>
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
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Nouns Review Prompt</div>
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
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Verbs Review Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.verbsReview.prompt}</div>
              </div>
            </div>
          )}
          
          <div className="w-100 flex justify-center flex-column">
            <div>
              <div className="mt4 b">Dialog</div>
              <ul className="mt0 pt0 black">
                {lesson?.dialog?.lines?.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
              {lesson?.dialog?.errors?.length > 0 && (
                <div className="mt3 red">
                  <div className="b">Dialog Errors</div>
                  <ul className="f6">
                    {lesson?.dialog?.errors?.map((err, index) => (
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
              {/*
              {lesson?.dialog?.signature === lesson?.dialogReview?.signature && lesson?.dialogReview?.lines?.length > 0 && (
                <div className="mt3 red">
                  <div className="b">Dialog Review</div>
                  <ul className="f6">
                    {lesson?.dialogReview?.lines?.map((line, index) => {

                      return (
                        <li key={index}>
                          <div className="mb2">
                            <div><b>⚠️ {line}</b></div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              */}
              <div className="mt4 b">Nouns</div>
              <ul className="mt0 pt0 black">
                {lesson.nouns.lines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
             
              {lesson?.nouns?.errors?.length > 0 && (
                <div className="mt3 red">
                  <div className="b">Noun Errors</div>
                  <ul className="f6">
                    {lesson?.nouns?.errors?.map((err, index) => (
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
              {lesson?.nouns?.signature === lesson?.nounsReview?.signature && lesson?.nounsReview?.lines?.length > 0 && (
                <div className="mt3 red">
                  <div className="b">Nouns Review</div>
                  <ul className="f6">
                    {lesson?.nounsReview?.lines?.map((line, index) => {
                      // const [first, second] = lines.split('|')

                      return (
                        <li key={index}>
                          <div className="mb2">
                            <div><b>⚠️ {line}</b></div>
                            {/* <div><b>⚠️ {first}</b></div> */}
                            {/* <div><b>ℹ️ {second}</b></div> */}
                            {/* <div><b>✅ {second}</b></div> */}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              <div className="mt4 b">Verbs</div>
              <ul className="mt0 pt0 black">
                {lesson.verbs.lines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
              {lesson?.verbs?.errors?.length > 0 && (
                <div className="mt3 red">
                  <div className="b">Verb Errors</div>
                  <ul className="f6">
                    {lesson?.verbs?.errors?.map((err, index) => (
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
              {lesson?.verbs?.signature === lesson?.verbsReview?.signature && lesson?.verbsReview?.lines?.length > 0 && (
                <div className="mt3 red">
                  <div className="b">Verbs Review</div>
                  <ul className="f6">
                    {lesson?.nounsReview?.lines?.map((line, index) => {
                      // const [first, second] = lines.split('|')

                      return (
                        <li key={index}>
                          <div className="mb2">
                            <div><b>⚠️ {line}</b></div>
                            {/* <div><b>⚠️ {first}</b></div> */}
                            {/* <div><b>ℹ️ {second}</b></div> */}
                            {/* <div><b>✅ {second}</b></div> */}
                          </div>
                        </li>
                      )
                    })}
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
