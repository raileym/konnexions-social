import React, { useEffect, useState } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import SelectorScenario from '@components/SelectorScenario'
import { getPrompt } from '@shared/getPrompt'
import ParticipantToggle from '@components/ParticipantToggle'
// import { LANGUAGE, MODULE_NAME, VERB_FORMATS, type Language, type Lesson, type LessonComplete, type Module, type ModuleName, type TestMode, type UseMyself } from '@cknTypes/types'
import {
  type LessonComplete,
  type TestMode,
  scenarioDescriptions,
  defaultLesson,
  type UseMyself,
} from '@cknTypes/types'
import {
  // VERB_FORMATS,
  // SCENARIO,
  MODULE_NAME,
  LANGUAGE_TITLE
} from '@cknTypes/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { getScenarioDetails } from '@components/getScenarioDetails/getScenarioDetails'
// import handleModule from '../handleModule/handleModule'
// import { dialogResolve } from '../dialogResolve/dialogResolve'
// import { resolveNouns } from '../resolveNouns/resolveNouns'
// import { resolveVerbs } from '../resolveVerbs/resolveVerbs'
import { DialogList } from '../DialogList/DialogList'
// import { ExpandedVerbListWithPronouns } from '../ExpandedVerbListWithPronouns/ExpandedVerbListWithPronouns'
// import { FlashcardModal } from '@PanelGenAIProComponents/FlashcardModal/FlashcardModal'
// import { DebugVerbLists } from '../DebugVerbLists/DebugVerbLists'
// import { generateVerbLists } from '@PanelGenAIProComponents/generateVerbLists/generateVerbLists'
// import CutoffToggle from '../../../CutoffToggle'
// import ShowMaxCount from '../../../ShowMaxCount'
import SelectorLanguage from '../../../SelectorLanguage'
import { handleCreateLesson } from '@PanelGenAIProComponents/handleCreateLesson/handleCreateLesson'
import PromptToggle from '@PanelGenAIProComponents/PromptToggle/PromptToggle'
import Hr from '@components/Hr'
import LessonElementToggle from '@PanelGenAIProComponents/LessonElementToggle/LessonElementToggle'
import { LessonStatus } from '@PanelGenAIProComponents/LessonStatus/LessonStatus'
import { useDebugLogger } from '@hooks/useDebugLogger'
// import { rebuildVerbLines } from '@PanelGenAIProComponents/rebuildVerbLines/rebuildVerbLines'
// import { rebuildNounLines } from '@PanelGenAIProComponents/rebuildNounLines/rebuildNounLines'
// import { resolveNounsOnly } from '../resolveNounsOnly/resolveNounsOnly'
// import { getPrompt } from '../../../../../shared/getPrompt'

const RightPanel: React.FC = () => {
  const [lessonComplete, setLessonComplete] = useState<LessonComplete>(true)
  const [testMode,] = useState<TestMode>(false)
  // const [showDialogPrompt, setShowDialogPrompt] = useState(false)
  const [useMyself, setUseMyself] = useState<UseMyself>(true)
  const [showNounsPrompt, setShowNounsPrompt] = useState(false)
  const [showVerbsPrompt, setShowVerbsPrompt] = useState(false)
  const [showDialogReviewPrompt, setShowDialogReviewPrompt] = useState(false)
  const [showNounsReviewPrompt, setShowNounsReviewPrompt] = useState(false)
  const [showVerbsReviewPrompt, setShowVerbsReviewPrompt] = useState(false)

  const debugLog = useDebugLogger()

  // const toggleShowDialogPrompt = () => {
  //   setShowDialogPrompt(prev => !prev)
  // }
    
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
    targetLanguage,
    sourceLanguage,
    debugMode,
    setDebugMode
  } = useAppContext()
  
// export type ScenarioData = {
//   nounsChooseN: NounDetails[]
//   nouns: NounDetails[]
//   verbs: VerbDetails[]
//   nounBySingular: Map<string, NounDetails>
//   nounByPlural: Map<string, NounDetails>
//   singularNounList: string[]
//   verbByInfinitive: Map<string, VerbDetails>
// }

  // cXonsole.log(JSON.stringify(scenarioData.nouns), null, 2)

  // const headline = <div className="f3">Create a custom dialog in <b>{LANGUAGE_TITLE[language]}</b> for a specific situation — at a restaurant, in a hotel, at the airport, or in a taxi.</div>
  const headline = <div className="f3">Create a custom dialog in <b>{LANGUAGE_TITLE[targetLanguage]}</b> {scenarioDescriptions[scenario]}</div>

  const lesson = lessons.find(l => l.id === selectedLessonId)
  
  const fakeLesson = {
      ...defaultLesson,
      scenario,
      targetLanguage,
      sourceLanguage,
      participantList: getScenarioDetails({ useMyself, scenario, language: targetLanguage }).participantList
  }
  
  const alwaysFalse = false

  let content
  if (selectedLessonId != null && Array.isArray(lessons)) {
    if (!lesson) {
      content = <p>Lesson not found.</p>
    } else {
      // cXonsole.log('lesson', lesson)
      // cXonsole.log('prompt', prompt)
      
      // cXonsole.log('lesson', JSON.stringify(lesson, null, 2))

      // const verbListsNoIndex = generateVerbLists(lesson, true)


      // debugLog('lesson', lesson)
      // debugLog('verbListsNoIndex', verbListsNoIndex)

      // const mergedVerbLines = rebuildVerbLines({
      //   verbsOnly: lesson.verbsOnly.lines,
      //   verbsMissing: lesson.verbsMissing.lines,
      //   verbByInfinitive: scenarioData.verbByInfinitive
      // })

      // const mergedNounLines = rebuildNounLines({
      //   nounsOnly: lesson.nounsOnly.lines,
      //   nounsMissing: lesson.nounsMissing.lines,
      //   nounBySingular: scenarioData.nounBySingular
      // })

      // console.log('mergedVerbLines', mergedVerbLines)
      // console.log('mergedNounLines', mergedNounLines)

      // const extractedNouns = lesson.nounsOnly.lines.map(n => n.trim().toLowerCase())

      // const allowedForms = new Set<string>()
      // scenarioData.nouns.forEach(noun => {
      //   allowedForms.add(noun.noun_singular.toLowerCase())
      //   allowedForms.add(noun.noun_plural.toLowerCase())
      // })

      // const unmatchedNouns = extractedNouns.filter(n => !allowedForms.has(n))

      // cXonsole.log('🚫 Nouns in lesson but not in scenarioData:', unmatchedNouns)

      // const extractedVerbs = lesson.verbsOnly.lines.map(v => v.trim().toLowerCase())

      // const allowedVerbs = new Set<string>()
      // scenarioData.verbs.forEach(verb => {
      //   allowedVerbs.add(verb.verb_infinitive.toLowerCase())
      // })

      // const unmatchedVerbs = extractedVerbs.filter(v => !allowedVerbs.has(v))

      // cXonsole.log('🚫 Verbs in lesson but not in scenarioData:', unmatchedVerbs)




      content = (
        <>
          <div className="mv3X flex baX justify-center">
            <button
              onClick={() => setDebugMode(prev => !prev)}
              className={`w-30 pa3 br2 bn ${debugMode ? 'bg-brand' : 'bg-black'} white pointer`}
            >
              <div className="flex items-center" >
                <div className="ph1 bg-redX"><FontAwesomeIcon icon={debugMode ? faLock : faLockOpen} /></div>
                <div className="ml2">{debugMode ? 'Disable' : 'Enable'} Debug Mode</div>
              </div>
            </button>
          </div>
         
          {/* <div className="mv3X flex baX justify-center">
            <button
              onClick={() => setTestMode(prev => !prev)}
              className={`w-30 pa3 br2 bn ${testMode ? 'bg-brand' : 'bg-black'} white pointer`}
            >
              <div className="flex items-center" >
                <div className="ph1 bg-redX"><FontAwesomeIcon icon={testMode ? faLock : faLockOpen} /></div>
                <div className="ml2">{testMode ? 'Disable' : 'Enable'} Test Mode</div>
              </div>
            </button>
          </div> */}
         
          <h2 className="f2 pa3 pb0 mt4 w-100 tc">{LANGUAGE_TITLE[targetLanguage]}: Premium</h2>
          <div className="w-100 flex justify-center pt3 pb4">
            <div className="f3 pv3 pt0 mt0 w-80">{headline}</div>
          </div>

          <div className={'mt3 mb4 flex justify-center'}>
            <div>
              <button
                className={`f3 pa3 br4 bn ${debugMode ? 'bg-black white' : 'bg-brand white'} pointer`}
                onClick={() => {
                  handleCreateLesson({
                    scenarioData,
                    scenario,
                    targetLanguage,
                    sourceLanguage,
                    lesson,
                    setLessons,
                    setLessonComplete,
                    selectedLessonId,
                    useMyself,
                    testMode,
                    debugLog
                  })
                }}
              >
                Create Lesson {debugMode ? '(Debug Mode)' : ''}
              </button>
            </div>
          </div>

          <div className="flex flex-column items-center w-100">
            <div className={`w-100 f3 mt3X mb3 ${lessonComplete ? 'o-100' : 'o-60'}`}>
              {/* <LessonStatus isLoading={!lessonComplete} /> */}
              <LessonStatus isLoading={!lessonComplete} />
              {/* <LessonStatus isLoading={!lessonComplete} /> */}
            </div>
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
            <ParticipantToggle useMyself={useMyself} setUseMyself={setUseMyself} />
          </div>

          <div className="pa3 mt3 ba bg-white w-100">
            <DialogList language={lesson.targetLanguage} lines={(lesson?.dialogResolve?.lines ?? [])} useCloudTTS={true} />
          </div>

          {/*
          <div className="pa3 mt3 ba bg-white w-100">
            <DialogList language={lesson.targetLanguage} lines={(lesson?.translation[lesson.targetLanguage] ?? [])} useCloudTTS={true} />
          </div>

          <div className="pa3 mt3 ba bg-white w-100">
            <DialogList language={lesson.sourceLanguage} lines={(lesson?.translation[lesson.sourceLanguage]  ?? [])} useCloudTTS={true} />
          </div>
          */}

          {/* <div className="f3 mv4 center">GenerateTTS: {generateTTSCount} invocations</div> */}

          {
            debugMode && (
              <>
                <PromptToggle className='bg-yellow black' title={'Proposed Dialog Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.DIALOG, scenarioData, lesson: fakeLesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Dialog Prompt'} prompt={lesson.dialog.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Dialog Review Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.DIALOG_REVIEW, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Dialog Review Prompt'} prompt={lesson.dialogReview.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Nouns Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.NOUNS, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Nouns Prompt'} prompt={lesson.nouns.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Nouns Review Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.NOUNS_REVIEW, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Nouns Review Prompt'} prompt={lesson.nounsReview.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Verbs Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.VERBS, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Verbs Prompt'} prompt={lesson.verbs.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Verbs Review Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.VERBS_REVIEW, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Verbs Review Prompt'} prompt={lesson.verbsReview.prompt} />

                {/*
                <PromptToggle className='bg-yellow black' title={'Proposed Nouns Only Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.NOUNS_ONLY, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Nouns Only Prompt'} prompt={lesson.nounsOnly.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Nouns Only Review Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.NOUNS_ONLY_REVIEW, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Nouns Only Review Prompt'} prompt={lesson.nounsOnlyReview.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Verbs Only Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.VERBS_ONLY, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Verbs Only Prompt'} prompt={lesson.verbsOnly.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Verbs Only Review Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.VERBS_ONLY_REVIEW, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Verbs Review Prompt'} prompt={lesson.verbsOnlyReview.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Nouns Missing Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.NOUNS_MISSING, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Nouns Missing Prompt'} prompt={lesson?.nounsMissing.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Nouns Missing Review Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.NOUNS_MISSING_REVIEW, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Nouns Missing Review Prompt'} prompt={lesson?.nounsMissingReview?.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Verbs Missing Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.VERBS_MISSING, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Verbs Missing Prompt'} prompt={lesson?.verbsMissing?.prompt} />

                <PromptToggle className='bg-yellow black' title={'Proposed Verbs Missing Review Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.VERBS_MISSING_REVIEW, scenarioData, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Verbs Missing Review Prompt'} prompt={lesson?.verbsMissingReview?.prompt} />
                */}

                {/*
                <div className="mt4 b">NounsConstraint ({scenarioData?.nouns?.length ?? 0})</div>
                <ul className="mt0 pt0 black">
                  {scenarioData?.nouns
                    ?.slice()
                    .sort((a, b) => a.noun_base.localeCompare(b.noun_base))
                    .map((noun, index) => (
                      <li key={index} className={`${noun.curated ? 'black' : 'red'}`}>
                        {noun.noun_base}: {noun.noun_gender}|{noun.noun_singular}|{noun.noun_plural}
                      </li>
                    ))}
                </ul>

                <div className="mt4 b">VerbsConstraint  ({scenarioData?.verbs?.length ?? 0})</div>
                <ul className="mt0 pt0 black">
                  {scenarioData?.verbs
                    ?.slice()
                    .sort((a, b) => a.verb_infinitive.localeCompare(b.verb_infinitive))
                    .map((verb, index) => (
                      <li key={index} className={`${verb.curated ? 'black' : 'red'}`}>
                        {verb.verb_base}|{verb.verb_infinitive}|{verb.verb_nosotros}
                      </li>
                    ))}
                </ul>

                <div className="mt4 b">NounsOnly</div>
                <ul className="mt0 pt0 black">
                  {lesson.nounsOnly?.lines
                    ?.slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                </ul>

                <div className="mt4 b">VerbsOnly</div>
                <ul className="mt0 pt0 black">
                  {lesson.verbsOnly?.lines
                    ?.slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                </ul>

                <div className="mt4 b">NounsMissing</div>
                <ul className="mt0 pt0 black">
                  {lesson.nounsMissing?.lines
                    ?.slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                </ul>

                <div className="mt4 b">VerbsMissing</div>
                <ul className="mt0 pt0 black">
                  {lesson.verbsMissing?.lines
                    ?.slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                </ul>

                <Hr />
                */}
              </>
            )
          }

          <LessonElementToggle title={'Nouns'} content={lesson.nouns.lines} testMode={testMode} />

          { testMode && alwaysFalse && (
            <div className="w-100">
              <button
                onClick={toggleShowNounsPrompt}
                className="mt3 pa2 br2 bn bg-brand white pointer"
              >
                {showNounsPrompt ? 'Hide Nouns Prompt' : 'Show Nouns Prompt'}
              </button>
            </div>
          )}

          {testMode && alwaysFalse && showNounsPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-white">
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Nouns Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.nouns.prompt}</div>
              </div>
            </div>
          )}
          
          { testMode && alwaysFalse && (
            <div className="w-100">
              <button
                onClick={toggleShowVerbsPrompt}
                className="mt3 pa2 br2 bn bg-brand white pointer"
              >
                {showVerbsPrompt ? 'Hide Verbs Prompt' : 'Show Verbs Prompt'}
              </button>
            </div>
          )}

          {testMode && alwaysFalse && showVerbsPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-white">
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Verbs Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.verbs.prompt}</div>
              </div>
            </div>
          )}
          
          { testMode && alwaysFalse && (
            <div className="w-100">
              <button
                onClick={toggleShowDialogReviewPrompt}
                className="mt3 pa2 br2 bn bg-brand white pointer"
              >
                {showDialogReviewPrompt ? 'Hide Dialog Review Prompt' : 'Show Dialog Review Prompt'}
              </button>
            </div>
          )}

          {testMode && alwaysFalse && showDialogReviewPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-white">
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Dialog Review Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.dialogReview.prompt}</div>
              </div>
            </div>
          )}

          { testMode && alwaysFalse && (
            <div className="w-100">
              <button
                onClick={toggleShowNounsReviewPrompt}
                className="mt3 pa2 br2 bn bg-brand white pointer"
              >
                {showNounsReviewPrompt ? 'Hide Nouns Review Prompt' : 'Show Nouns Review Prompt'}
              </button>
            </div>
          )}

          {testMode && alwaysFalse && showNounsReviewPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-white">
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Nouns Review Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.nounsReview.prompt}</div>
              </div>
            </div>
          )}

          { testMode && alwaysFalse && (
            <div className="w-100">
              <button
                onClick={toggleShowVerbsReviewPrompt}
                className="mt3 pa2 br2 bn bg-brand white pointer"
              >
                {showVerbsReviewPrompt ? 'Hide Verbs Review Prompt' : 'Show Verbs Review Prompt'}
              </button>
            </div>
          )}

          {testMode && alwaysFalse && showVerbsReviewPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-white">
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Verbs Review Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.verbsReview.prompt}</div>
              </div>
            </div>
          )}

          {/*
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
                  buttonClassName="mr2"
                  title=<div>Open Flashcard</div>
                  debugLog={debugLog}
                />
                <FlashcardModal
                  fronts={verbListsNoIndex[VERB_FORMATS.INCOMPLETE]}
                  backs={verbListsNoIndex[VERB_FORMATS.COMPLETE]}
                  useCloudTTS={true}
                  buttonClassName="mh2"
                  title=<div>Open Flashcard</div>
                  debugLog={debugLog}
                />
              </div>
            )
          }
          */}

          {/* <DebugVerbLists lesson={lesson} /> */}

          {/* <DialogList lines={(lesson?.dialog?.lines ?? []).slice(0, 3)} useCloudTTS={true} /> */}
          {/* <DialogList lines={lesson?.dialog?.lines ?? []} useCloudTTS={true} /> */}
          
          {/* 
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
          */}

          {/*
          <h2>{lesson.name}</h2>
          <p>{lesson.description}</p>

          <ul className="mt0 pt0 black">
            {lesson.dialog?.lines?.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          */}
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

  useEffect(() => {
    debugLog('lesson', lesson)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[lesson])

  return (
    <div className={`w-70 vh-100 pb6 overflow-y-auto pa3 bg-light-gray ${cutoff ? 'bg-yellow' : ''}`} style={{ paddingTop: '7em' }}>
      {content}
    </div>
  )
}

export default RightPanel
