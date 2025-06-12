import React, { useState } from 'react'
import { useAppContext } from '../../../../context/AppContext/AppContext'
import SelectorScenario from '../../../SelectorScenario'
import ParticipantToggle from '../../../ParticipantToggle'
// import { LANGUAGE, MODULE_NAME, VERB_FORMATS, type Language, type Lesson, type LessonComplete, type Module, type ModuleName, type TestMode, type UseMyself } from '../../../../../shared/types'
import {
  VERB_FORMATS,
  type LessonComplete,
  type TestMode,
  type UseMyself,
  scenarioDescriptions
} from '../../../../../shared/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { getArticle, getScenarioDetails } from '../../../Util'
// import handleModule from '../handleModule/handleModule'
// import { resolveDialog } from '../resolveDialog/resolveDialog'
// import { resolveNouns } from '../resolveNouns/resolveNouns'
// import { resolveVerbs } from '../resolveVerbs/resolveVerbs'
import { DialogList } from '../DialogList/DialogList'
// import { ExpandedVerbListWithPronouns } from '../ExpandedVerbListWithPronouns/ExpandedVerbListWithPronouns'
import { FlashcardModal } from '../FlashcardModal/FlashcardModal'
// import { DebugVerbLists } from '../DebugVerbLists/DebugVerbLists'
import { generateVerbLists } from '../generateVerbLists/generateVerbLists'
import CutoffToggle from '../../../CutoffToggle'
import ShowMaxCount from '../../../ShowMaxCount'
import SelectorLanguage from '../../../SelectorLanguage'
// import { resolveNounsOnly } from '../resolveNounsOnly/resolveNounsOnly'
// import { getPrompt } from '../../../../../shared/getPrompt'

const RightPanel: React.FC = () => {
  const [useMyself, setUseMyself] = useState<UseMyself>(false)
  const [lessonComplete, setLessonComplete] = useState<LessonComplete>(false)
  const [testMode, setTestMode] = useState<TestMode>(false)
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
    scenario,
    cutoff,
    scenarioData,
    language
    // generateTTSCount
  } = useAppContext()
  
  // const headline = <div className="f3">Create a custom dialog in <b>{language}</b> for a specific situation — at a restaurant, in a hotel, at the airport, or in a taxi.</div>
  const headline = <div className="f3">Create a custom dialog in <b>{language}</b> {scenarioDescriptions[scenario]}</div>

  // type RunModuleProps = {
  //   moduleName: ModuleName
  //   lesson: Lesson
  // }

  // const runModule = async ({moduleName, lesson}: RunModuleProps): Promise<Lesson | null> => {
  //   const result = await handleModule({ lesson, moduleName, testMode })
  //   if (!result) return null
  //   console.log(`runModule (${moduleName})`)
  //   return {
  //     ...lesson,
  //     [moduleName]: result      
  //   }
  // }

  const lesson = lessons.find(l => l.id === selectedLessonId)

  let content
  if (selectedLessonId != null && Array.isArray(lessons)) {
    if (!lesson) {
      content = <p>Lesson not found.</p>
    } else {

      const verbListsNoIndex = generateVerbLists(lesson, true)

      content = (
        <>
          <h2 className="f2 pa3 pb0 mt5 w-100 tc">{language}: Premium</h2>
          <div className="w-100 flex justify-center pt3 pb4">
            <div className="f3 pv3 pt0 mt0 w-80">{headline}</div>
          </div>

          <div className="flex flex-column items-center w-100">
            <div className="mt3 mb1">
              <SelectorLanguage />
            </div>
          </div>

          <div className="flex flex-column items-center w-100">
            <div className="mt3 mb1">
              <SelectorScenario custom={false} />
            </div>
            <div className="mt1 mb3">
              <ParticipantToggle useMyself={useMyself} onClick={setUseMyself} />
            </div>
          </div>

          <div className="pa3 mt3 ba bg-white w-100">
            <DialogList lines={(lesson?.dialog?.lines ?? []).slice(0, 3)} useCloudTTS={true} />
          </div>

          {/* <div className="f3 mv4 center">GenerateTTS: {generateTTSCount} invocations</div> */}

          <div className="flex flex-column items-center w-100">
            <div className={`f3 mt3 mb1 ${lessonComplete ? 'o-100' : 'o-20'}`}>
              Lesson Complete
            </div>
          </div>
          {/* 
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
          */}

          <div className={`ba bw2 mv3 pa4 ${testMode ? 'bg-black' : 'bg-white'} b--black flex flex-column`}>
            <div>
              <button
                onClick={async () => {
                  const {
                    participantList
                  } = getScenarioDetails({ scenario, language })

                  const initialLesson_0 = { 
                    ...lesson,
                    language,
                    scenario,
                    participantList
                  }

                  //
                  // Dialog
                  //
                  // const dialogLesson_1 = await runModule({moduleName: MODULE_NAME.DIALOG, lesson: initialLesson_0})
                  // if (!dialogLesson_1) return

                  //
                  // Dialog Review
                  //
                  // const dialogReviewLesson_2 = await runModule({moduleName: MODULE_NAME.DIALOG_REVIEW, lesson: dialogLesson_1})
                  // if (!dialogReviewLesson_2) return
                  
                  //
                  // Dialog Resolve
                  //
                  // const { dialogLinesResolved: dialogLinesResolved_3 } = resolveDialog({
                  //   dialogReviewLines: dialogReviewLesson_2.dialog.lines, 
                  //   dialogLines: dialogLesson_1.dialog.lines
                  // })
                  
                  // const prose = dialogLinesResolved_3?.join(' ') ?? ''
                  // const dialogLessonUpdated_4 = {
                  //   ...dialogReviewLesson_2,
                  //   [MODULE_NAME.DIALOG]: {
                  //     ...(dialogReviewLesson_2[MODULE_NAME.DIALOG as keyof Lesson] as Module),
                  //     lines: dialogLinesResolved_3
                  //   },
                  //   prose
                  // }
                  
                  //
                  // Nouns Only
                  //
                  // const nounsOnlyLesson_a5 = await runModule({moduleName: MODULE_NAME.NOUNS_ONLY, lesson: dialogLessonUpdated_4})
                  // if (!nounsOnlyLesson_a5) return
                  // console.log('nounsOnlyLesson_a5', nounsOnlyLesson_a5.nounsOnly.lines)

                  //
                  // Nouns Only Review
                  //
                  // const nounsOnlyReviewLesson_a6 = await runModule({moduleName: MODULE_NAME.NOUNS_ONLY_REVIEW, lesson: nounsOnlyLesson_a5})
                  // if (!nounsOnlyReviewLesson_a6) return
                  // console.log('nounsOnlyReviewLesson_a6', nounsOnlyReviewLesson_a6.nounsOnly.lines)

                  //
                  // Nouns Resolve
                  //
                  // const { nounsOnlyLinesResolved: nounsOnlyLinesResolved_a7 } = resolveNounsOnly({
                  //   nounsOnlyReviewLines: nounsOnlyReviewLesson_a6.nounsOnlyReview.lines, 
                  //   nounsOnlyLines: nounsOnlyLesson_a5.nounsOnly.lines
                  // })
                  // console.log('nounsOnlyLinesResolved_a7', nounsOnlyLinesResolved_a7)

                  // const nounsLessonUpdated_a8 = {
                  //   ...nounsOnlyReviewLesson_a6,
                  //   [MODULE_NAME.NOUNS_ONLY]: {
                  //     ...(nounsOnlyReviewLesson_a6[MODULE_NAME.NOUNS_ONLY as keyof Lesson] as Module),
                  //     lines: nounsOnlyLinesResolved_a7
                  //   }
                  // }

                  //
                  // Nouns
                  //
                  // // const nounsLesson_5 = await runModule({moduleName: MODULE_NAME.NOUNS, lesson: dialogLessonUpdated_4})
                  // const nounsLesson_5 = await runModule({moduleName: MODULE_NAME.NOUNS, lesson: nounsLessonUpdated_a8})
                  // if (!nounsLesson_5) return

                  //
                  // Nouns Review
                  //
                  // const nounsReviewLesson_6 = await runModule({moduleName: MODULE_NAME.NOUNS_REVIEW, lesson: nounsLesson_5})
                  // if (!nounsReviewLesson_6) return

                  //
                  // Nouns Resolve
                  //
                  // const { nounsLinesResolved: nounsLinesResolved_7 } = resolveNouns({
                  //   nounsReviewLines: nounsReviewLesson_6.nouns.lines, 
                  //   nounsLines: nounsLesson_5.nouns.lines
                  // })

                  // const nounsLessonUpdated_8 = {
                  //   ...nounsReviewLesson_6,
                  //   [MODULE_NAME.NOUNS]: {
                  //     ...(nounsReviewLesson_6[MODULE_NAME.NOUNS as keyof Lesson] as Module),
                  //     lines: nounsLinesResolved_7
                  //   }
                  // }

                  //
                  // Verbs
                  //
                  // const verbsLesson_9 = await runModule({moduleName: MODULE_NAME.VERBS, lesson: nounsLessonUpdated_8})
                  // if (!verbsLesson_9) return

                  //
                  // Verbs Review
                  //
                  // const verbsReviewLesson_10 = await runModule({moduleName: MODULE_NAME.VERBS_REVIEW, lesson: verbsLesson_9})
                  // if (!verbsReviewLesson_10) return

                  // const { verbsLinesResolved: verbsLinesResolved_11 } = resolveVerbs({
                  //   verbsReviewLines: verbsReviewLesson_10.verbs.lines, 
                  //   verbsLines: verbsLesson_9.verbs.lines
                  // })

                  // const verbsLessonUpdated_12 = {
                  //   ...verbsReviewLesson_10,
                  //   [MODULE_NAME.VERBS]: {
                  //     ...(verbsReviewLesson_10[MODULE_NAME.VERBS as keyof Lesson] as Module),
                  //     lines: verbsLinesResolved_11
                  //   }
                  // }

                  //
                  // Verbs Expanded and Verbs Expanded In-Complete (Sentences)
                  //
                  // const verbsLists_13 = generateVerbLists(verbsLessonUpdated_12)
                  
                  // const verbsExpandedLesson_15 = {
                  //   ...verbsLessonUpdated_12,

                  //   [MODULE_NAME.VERBS_EXPANDED_INCOMPLETE]: {
                  //     ...(verbsLessonUpdated_12[MODULE_NAME.VERBS_EXPANDED_INCOMPLETE as keyof Lesson] as Module),
                  //     lines: verbsLists_13.incomplete
                  //   }
                  // }

                  // const verbsExpandedCompleteLesson_16 = await runModule({moduleName: MODULE_NAME.VERBS_EXPANDED_COMPLETE, lesson: verbsExpandedLesson_15})
                  // if (!verbsExpandedCompleteLesson_16) return

                  //
                  // Verbs Expanded Triple
                  //
                  // const verbsLists_17 = generateVerbLists(verbsExpandedCompleteLesson_16)

                  // const verbsExpandedTripleLesson_18 = {
                  //   ...verbsExpandedCompleteLesson_16,

                  //   [MODULE_NAME.VERBS_EXPANDED_TRIPLE]: {
                  //     ...(verbsExpandedCompleteLesson_16[MODULE_NAME.VERBS_EXPANDED_TRIPLE as keyof Lesson] as Module),
                  //     lines: verbsLists_17.triple
                  //   }
                  // }

                  setLessons(prev => {
                    console.log('🔄 Updating lesson list...')
                    console.log('▶️ initialLesson_0:', initialLesson_0)
                    const next = prev.map(lsn => {
                      if (lsn.id === selectedLessonId) {
                        console.log(`✅ Match found: lesson.id = ${lsn.id}`)
                        const updated = { ...initialLesson_0, id: lsn.id, name: lsn.name }
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
                Create Lesson {testMode ? '(Test Mode)' : ''}
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

          { verbListsNoIndex && 
            Array.isArray(verbListsNoIndex[VERB_FORMATS.CONJUGATION]) && verbListsNoIndex[VERB_FORMATS.CONJUGATION].length > 0 &&
            Array.isArray(verbListsNoIndex[VERB_FORMATS.PRONOUN_AND_CONJUGATION]) && verbListsNoIndex[VERB_FORMATS.PRONOUN_AND_CONJUGATION].length > 0 &&
            Array.isArray(verbListsNoIndex[VERB_FORMATS.INCOMPLETE]) && verbListsNoIndex[VERB_FORMATS.INCOMPLETE].length > 0 &&
            Array.isArray(verbListsNoIndex[VERB_FORMATS.COMPLETE]) && verbListsNoIndex[VERB_FORMATS.COMPLETE].length > 0 && (
              <div className="flex justify-start w-100">
                <FlashcardModal
                  fronts={verbListsNoIndex[VERB_FORMATS.CONJUGATION]}
                  backs={verbListsNoIndex[VERB_FORMATS.PRONOUN_AND_CONJUGATION]}
                  useCloudTTS={true}
                  buttonClassName="mh2"
                  title=<div>Open Flashcard</div>
                />
                <FlashcardModal
                  fronts={verbListsNoIndex[VERB_FORMATS.INCOMPLETE]}
                  backs={verbListsNoIndex[VERB_FORMATS.COMPLETE]}
                  useCloudTTS={true}
                  buttonClassName="mh2"
                  title=<div>Open Flashcard</div>
                />
              </div>
            )
          }

          {/* <DebugVerbLists lesson={lesson} /> */}

          {/* <DialogList lines={(lesson?.dialog?.lines ?? []).slice(0, 3)} useCloudTTS={true} /> */}
          {/* <DialogList lines={lesson?.dialog?.lines ?? []} useCloudTTS={true} /> */}
          
          <div className="mt4 b">NounsConstraint</div>
          <ul className="mt0 pt0 black">
            {scenarioData?.nouns?.map((noun, index) => (
              // <li key={index}>{noun.noun_gender}|{noun.noun_gender}|{noun.noun_singular}|{noun.noun_plural}|{getArticle(noun.noun_gender)}</li>
              <li key={index}>{noun.noun_base}: {noun.noun_gender}|{noun.noun_singular}|{noun.noun_plural}</li>
            ))}
          </ul>

          <div className="mt4 b">VerbsConstraint</div>
          <ul className="mt0 pt0 black">
            {scenarioData?.verbs?.map((verb, index) => (
              <li key={index}>{verb.verb_infinitive}|{verb.verb_nosotros}</li>
            ))}
          </ul>

          <div className="mt4 b">NounsOnly</div>
          <ul className="mt0 pt0 black">
            {lesson.nounsOnly?.lines?.map((line, index) => (
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
    <div className={`w-70 vh-100 overflow-y-auto pa3 bg-light-gray ${cutoff ? 'bg-yellow' : ''}`} style={{ paddingTop: '7em' }}>
      {content}
    </div>
  )
}

export default RightPanel
