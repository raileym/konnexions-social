import React, { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext'
import ScenarioSelector from '../../../ScenarioSelector'
import ParticipantToggle from '../../../ParticipantToggle'
import { LANGUAGE, MODULE_NAME, type Language, type Lesson, type LessonComplete, type Module, type ModuleName, type TestMode, type UseMyself } from '../../../../../shared/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { getScenarioDetails } from '../../../Util'
import handleModule from '../handleModule/handleModule'
import { resolveDialog } from '../resolveDialog/resolveDialog'
import { resolveNouns } from '../resolveNouns/resolveNouns'
import { resolveVerbs } from '../resolveVerbs/resolveVerbs'

const RightPane: React.FC = () => {
  const [useMyself, setUseMyself] = useState<UseMyself>(false)
  const [lessonComplete, setLessonComplete] = useState<LessonComplete>(false)
  const [testMode, setTestMode] = useState<TestMode>(false)
  const [language, ] = useState<Language>(LANGUAGE.SPANISH)
  const [showDialogPrompt, setShowDialogPrompt] = useState(false)
  const [showNounsPrompt, setShowNounsPrompt] = useState(false)
  const [showVerbsPrompt, setShowVerbsPrompt] = useState(false)
  const [showDialogReviewPrompt, setShowDialogReviewPrompt] = useState(false)
  const [showNounsReviewPrompt, setShowNounsReviewPrompt] = useState(false)
  const [showVerbsReviewPrompt, setShowVerbsReviewPrompt] = useState(false)

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
    lessons,
    setLessons,
    selectedLessonId,
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
    <div className="w-80 vh-100 overflow-y-auto pa3 bg-light-gray">
      {selectedLessonId != null ? (
        (() => {
          const lesson = lessons.find(l => l.id === selectedLessonId)

          if (!lesson) return <p>Lesson not found.</p>

          return (
            <>
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
                      
                      // const alwaysTrue = true
                      // if (alwaysTrue) {
                      //   console.log(JSON.stringify(dialogLesson, null, 2))
                      //   console.log(JSON.stringify(dialogReviewLesson, null, 2))
                      //   console.log(JSON.stringify(dialogLessonUpdated, null, 2))
                      //   return
                      // }

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

                      // setLesson(verbsLessonUpdated)
                      setLessons(prev =>
                        prev.map(lsn =>
                          lsn.id === selectedLessonId ? { ...verbsLessonUpdated, id: lsn.id, name: lsn.name } : lsn
                        )
                      )

                      setLessonComplete(true)
                    }}
                    className="pa2 br2 bn bg-brand white pointer"
                  >
                    Master Button {testMode ? '(Test Mode)' : ''}
                  </button>

                </div>
              </div>

              { testMode && (
                <div className="w-100">
                  <button
                    onClick={toggleShowDialogPrompt}
                    className="pa2 br2 bn bg-brand white pointer"
                  >
                    {showDialogPrompt ? 'Hide Dialog Prompt' : 'Show Dialog Prompt'}
                  </button>
                </div>

              )}

              {testMode && showDialogPrompt && (
                <div className="w-100 flex justify-center flex-column">
                  <div className="mt4 ba pa3 bg-white">
                    <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Dialog Prompt</div>
                    <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.dialog.prompt}</div>
                  </div>
                </div>
              )}


              { testMode && (
                <div className="w-100">
                  <button
                    onClick={toggleShowNounsPrompt}
                    className="mt3 pa2 br2 bn bg-brand white pointer"
                  >
                    {showNounsPrompt ? 'Hide Nouns Prompt' : 'Show Nouns Prompt'}
                  </button>
                </div>
              )}

              {testMode && showNounsPrompt && (
                <div className="w-100 flex justify-center flex-column">
                  <div className="mt4 ba pa3 bg-white">
                    <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Nouns Prompt</div>
                    <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.nouns.prompt}</div>
                  </div>
                </div>
              )}
              
              { testMode && (
                <div className="w-100">
                  <button
                    onClick={toggleShowVerbsPrompt}
                    className="mt3 pa2 br2 bn bg-brand white pointer"
                  >
                    {showVerbsPrompt ? 'Hide Verbs Prompt' : 'Show Verbs Prompt'}
                  </button>
                </div>
              )}

              {testMode && showVerbsPrompt && (
                <div className="w-100 flex justify-center flex-column">
                  <div className="mt4 ba pa3 bg-white">
                    <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Verbs Prompt</div>
                    <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.verbs.prompt}</div>
                  </div>
                </div>
              )}
              
              { testMode && (
                <div className="w-100">
                  <button
                    onClick={toggleShowDialogReviewPrompt}
                    className="mt3 pa2 br2 bn bg-brand white pointer"
                  >
                    {showDialogReviewPrompt ? 'Hide Dialog Review Prompt' : 'Show Dialog Review Prompt'}
                  </button>
                </div>
              )}

              {testMode && showDialogReviewPrompt && (
                <div className="w-100 flex justify-center flex-column">
                  <div className="mt4 ba pa3 bg-white">
                    <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Dialog Review Prompt</div>
                    <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.dialogReview.prompt}</div>
                  </div>
                </div>
              )}

              { testMode && (
                <div className="w-100">
                  <button
                    onClick={toggleShowNounsReviewPrompt}
                    className="mt3 pa2 br2 bn bg-brand white pointer"
                  >
                    {showNounsReviewPrompt ? 'Hide Nouns Review Prompt' : 'Show Nouns Review Prompt'}
                  </button>
                </div>
              )}

              {testMode && showNounsReviewPrompt && (
                <div className="w-100 flex justify-center flex-column">
                  <div className="mt4 ba pa3 bg-white">
                    <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Nouns Review Prompt</div>
                    <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.nounsReview.prompt}</div>
                  </div>
                </div>
              )}

              { testMode && (
                <div className="w-100">
                  <button
                    onClick={toggleShowVerbsReviewPrompt}
                    className="mt3 pa2 br2 bn bg-brand white pointer"
                  >
                    {showVerbsReviewPrompt ? 'Hide Verbs Review Prompt' : 'Show Verbs Review Prompt'}
                  </button>
                </div>
              )}

              {testMode && showVerbsReviewPrompt && (
                <div className="w-100 flex justify-center flex-column">
                  <div className="mt4 ba pa3 bg-white">
                    <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Verbs Review Prompt</div>
                    <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.verbsReview.prompt}</div>
                  </div>
                </div>
              )}

              <div className="mt4 b">Dialog</div>
              <ul className="mt0 pt0 black">
                {lesson?.dialog?.lines?.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>

              <div className="mt4 b">Nouns</div>
              <ul className="mt0 pt0 black">
                {lesson.nouns.lines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            
              <div className="mt4 b">Verbs</div>
              <ul className="mt0 pt0 black">
                {lesson.verbs.lines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>

              <h2>{lesson.name}</h2>
              <p>{lesson.description}</p>

              <ul className="mt0 pt0 black">
                {lesson.dialog?.lines?.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </>
          )
        })()
      ) : (
        <p>Select a lesson to view details.</p>
      )}
    </div>
  )
}

export default RightPane
