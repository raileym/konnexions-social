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
import { DialogList } from '../DialogList/DialogList'
// import { ExpandedVerbListWithPronouns } from '../ExpandedVerbListWithPronouns/ExpandedVerbListWithPronouns'
import { generateConjugatedLines } from '../generateConjugatedList/generatedConjugatedList'
// import { getPrompt } from '../../../../../shared/getPrompt'

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
    scenario //,
    // generateTTSCount
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

  const lesson = lessons.find(l => l.id === selectedLessonId)

  let content
  if (selectedLessonId != null && Array.isArray(lessons)) {
    if (!lesson) {
      content = <p>Lesson not found.</p>
    } else {
      content = (
        <>
          <h2 className="f3 pa3 pb0 mt5 w-100 tc">Spanish: Premium</h2>
          <div className="f3 pv3 pt0 mt0">{headline}</div>

          {/* <div className="f3 mv4 center">GenerateTTS: {generateTTSCount} invocations</div> */}

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

                  //
                  // Dialog
                  //
                  const dialogLesson = await runModule({moduleName: MODULE_NAME.DIALOG, lesson: initialLesson})
                  if (!dialogLesson) return

                  //
                  // Dialog Review
                  //
                  const dialogReviewLesson = await runModule({moduleName: MODULE_NAME.DIALOG_REVIEW, lesson: dialogLesson})
                  if (!dialogReviewLesson) return
                  
                  //
                  // Dialog Resolve
                  //
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
                  
                  //
                  // Nouns
                  //
                  const nounsLesson = await runModule({moduleName: MODULE_NAME.NOUNS, lesson: dialogLessonUpdated})
                  if (!nounsLesson) return

                  //
                  // Nouns Review
                  //
                  const nounsReviewLesson = await runModule({moduleName: MODULE_NAME.NOUNS_REVIEW, lesson: nounsLesson})
                  if (!nounsReviewLesson) return

                  //
                  // Nouns Resolve
                  //
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

                  //
                  // Verbs
                  //
                  const verbsLesson = await runModule({moduleName: MODULE_NAME.VERBS, lesson: nounsLessonUpdated})
                  if (!verbsLesson) return

                  //
                  // Verbs Review
                  //
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

                  //
                  // Verbs Expanded
                  //
                  // const verbsExpanded = generateConjugatedLines({verbsLines: verbsLessonUpdated.verbs.lines, inCompleteOnly: true} )
                  const verbsExpanded= generateConjugatedLines({inCompleteOnly: false, language: lesson.language, verbsLines: verbsLessonUpdated.verbs.lines})
                  const verbsExpandedInComplete= generateConjugatedLines({inCompleteOnly: true, language: lesson.language, verbsLines: verbsLessonUpdated.verbs.lines})
                  
                  console.log('verbsExpanded', verbsExpanded)

                  const verbsExpandedLesson = {
                    ...verbsLessonUpdated,

                    [MODULE_NAME.VERBS_EXPANDED]: {
                      ...(verbsLessonUpdated[MODULE_NAME.VERBS_EXPANDED as keyof Lesson] as Module),
                      lines: verbsExpanded
                    },

                    [MODULE_NAME.VERBS_EXPANDED_INCOMPLETE]: {
                      ...(verbsLessonUpdated[MODULE_NAME.VERBS_EXPANDED_INCOMPLETE as keyof Lesson] as Module),
                      lines: verbsExpandedInComplete
                    }
                  }

                  const verbsExpandedCompleteLesson = await runModule({moduleName: MODULE_NAME.VERBS_EXPANDED_COMPLETE, lesson: verbsExpandedLesson})
                  if (!verbsExpandedCompleteLesson) return

                  setLessons(prev => {
                    console.log('🔄 Updating lesson list...')
                    console.log('▶️ verbsExpandedCompleteLesson:', verbsExpandedCompleteLesson)
                    const next = prev.map(lsn => {
                      if (lsn.id === selectedLessonId) {
                        console.log(`✅ Match found: lesson.id = ${lsn.id}`)
                        const updated = { ...verbsExpandedCompleteLesson, id: lsn.id, name: lsn.name }
                        console.log('🆕 Updated lesson:', updated)
                        return updated
                      }
                      return lsn
                    })
                    console.log('📦 New lessons array:', next)
                    return next
                  })

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

          <DialogList lines={lesson?.dialog?.lines ?? []} />

          {(() => {
            if (!Array.isArray(lesson?.verbs?.lines)) {
              return <></>
            }

            // const exampleLines= generateConjugatedLines({language: lesson.language, verbsLines: lesson.verbs.lines, inCompleteOnly: false})

            const exampleListJSX = 
              <>
                <h3 className="mt4 mb2">[DEBUG] Expanded Verb Lines</h3>
                <ul className="debug-list">
                  {Array.isArray(lesson?.verbsExpanded?.lines) && lesson.verbsExpanded.lines.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
                <h3 className="mt4 mb2">[DEBUG] In-Complete sentences</h3>
                <ul className="debug-list">
                  {Array.isArray(lesson?.verbsExpandedInComplete?.lines) && lesson.verbsExpandedInComplete.lines.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
                <h3 className="mt4 mb2">[DEBUG] Complete sentences</h3>
                <ul className="debug-list">
                  {Array.isArray(lesson?.verbsExpandedComplete?.lines) && lesson.verbsExpandedComplete.lines.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </>
            
            return exampleListJSX
          })()}
          {/* {Array.isArray(lesson?.verbs?.lines) && (
            <>
              <h3 className="mt4 mb2">[DEBUG] Expanded Verb Lines</h3>
              <ul className="debug-list">
                {generateConjugatedLines({language: lesson.language, verbsLines: lesson.verbs.lines}).map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </>
          )} */}

          
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
    }
  } else {
    content = (
      <>
        <p>No lessons loaded.</p>
        <p>Select a lesson to view details.</p>
      </>
    )
  }

  return (
    <div className="w-80 vh-100 overflow-y-auto pa3 bg-light-gray" style={{ paddingTop: '7em' }}>
      {content}
    </div>
  )
}

export default RightPane
