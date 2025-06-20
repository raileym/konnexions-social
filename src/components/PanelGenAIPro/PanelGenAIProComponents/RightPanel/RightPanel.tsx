/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import SelectorScenario from '../../../SelectorScenario'
import { getPrompt } from '@shared/getPrompt'
import ParticipantToggle from '../../../ParticipantToggle'
// import { LANGUAGE, MODULE_NAME, VERB_FORMATS, type Language, type Lesson, type LessonComplete, type Module, type ModuleName, type TestMode, type UseMyself } from '@cknTypes/types'
import {
  type LessonComplete,
  type TestMode,
  type UseMyself,
  scenarioDescriptions,
  defaultLesson
} from '@cknTypes/types'
import {
  VERB_FORMATS,
  SCENARIO,
  MODULE_NAME
} from '@cknTypes/constants'
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
import { handleCreateLesson } from '@PanelGenAIProComponents/handleCreateLesson/handleCreateLesson'
import PromptToggle from '../PromptToggle/PromptToggle'
import Hr from '@components/Hr'
import LessonElementToggle from '../LessonElementToggle/LessonElementToggle'
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
  
// export type ScenarioData = {
//   nounsChooseN: NounDetails[]
//   nouns: NounDetails[]
//   verbs: VerbDetails[]
//   nounBySingular: Map<string, NounDetails>
//   nounByPlural: Map<string, NounDetails>
//   singularNounList: string[]
//   verbByInfinitive: Map<string, VerbDetails>
// }

  // console.log(JSON.stringify(scenarioData.nouns), null, 2)

  // const headline = <div className="f3">Create a custom dialog in <b>{language}</b> for a specific situation — at a restaurant, in a hotel, at the airport, or in a taxi.</div>
  const headline = <div className="f3">Create a custom dialog in <b>{language}</b> {scenarioDescriptions[scenario]}</div>

  const lesson = lessons.find(l => l.id === selectedLessonId)
  
  const fakeLesson = {
      ...defaultLesson,
      scenario,
      language,
      participantList: getScenarioDetails({ scenario, language }).participantList
  }
  
  let content
  if (selectedLessonId != null && Array.isArray(lessons)) {
    if (!lesson) {
      content = <p>Lesson not found.</p>
    } else {
      // console.log('lesson', lesson)
      // console.log('prompt', prompt)

      const verbListsNoIndex = generateVerbLists(lesson, true)






  
      // const extractedNouns = lesson.nounsOnly.lines.map(n => n.trim().toLowerCase())

      // const allowedForms = new Set<string>()
      // scenarioData.nouns.forEach(noun => {
      //   allowedForms.add(noun.noun_singular.toLowerCase())
      //   allowedForms.add(noun.noun_plural.toLowerCase())
      // })

      // const unmatchedNouns = extractedNouns.filter(n => !allowedForms.has(n))

      // console.log('🚫 Nouns in lesson but not in scenarioData:', unmatchedNouns)

      // const extractedVerbs = lesson.verbsOnly.lines.map(v => v.trim().toLowerCase())

      // const allowedVerbs = new Set<string>()
      // scenarioData.verbs.forEach(verb => {
      //   allowedVerbs.add(verb.verb_infinitive.toLowerCase())
      // })

      // const unmatchedVerbs = extractedVerbs.filter(v => !allowedVerbs.has(v))

      // console.log('🚫 Verbs in lesson but not in scenarioData:', unmatchedVerbs)




      content = (
        <>
          <h2 className="f2 pa3 pb0 mt5 w-100 tc">{language}: Premium</h2>
          <div className="w-100 flex justify-center pt3 pb4">
            <div className="f3 pv3 pt0 mt0 w-80">{headline}</div>
          </div>

          <div className={'mt3 mb4 flex justify-center'}>
            <div>
              <button
                className={`f3 pa3 br4 bn ${testMode ? 'bg-black white' : 'bg-brand white'} pointer`}
                onClick={() => handleCreateLesson({
                  scenarioData,
                  scenario,
                  language,
                  lesson,
                  setLessons,
                  setLessonComplete,
                  selectedLessonId,
                  testMode
                })}
              >
                Create Lesson {testMode ? '(Test Mode)' : ''}
              </button>
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
            <div className="mt1 mb3">
              <ParticipantToggle useMyself={useMyself} onClick={setUseMyself} />
            </div>
          </div>

          <div className="pa3 mt3 ba bg-white w-100">
            <DialogList lines={(lesson?.dialog?.lines ?? [])} useCloudTTS={true} />
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

          <PromptToggle className='bg-yellow black' title={'Proposed Dialog Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.DIALOG, scenarioData, lesson: fakeLesson, errors: [] }).prompt} />
          <PromptToggle title={'Actual Dialog Prompt'} prompt={lesson.dialog.prompt} />

          <PromptToggle className='bg-yellow black' title={'Proposed Dialog Review Prompt'} prompt={getPrompt({ moduleName: MODULE_NAME.DIALOG_REVIEW, scenarioData, lesson, errors: [] }).prompt} />
          <PromptToggle title={'Actual Dialog Review Prompt'} prompt={lesson.dialogReview.prompt} />

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

          <LessonElementToggle title={'Nouns'} content={lesson.nouns.lines} testMode={testMode} />

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

          <Hr />
          
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
            {scenarioData?.nouns
              ?.slice()
              .sort((a, b) => a.noun_base.localeCompare(b.noun_base))
              .map((noun, index) => (
                <li key={index}>
                  {noun.noun_base}: {noun.noun_gender}|{noun.noun_singular}|{noun.noun_plural}
                </li>
              ))}
          </ul>

          <div className="mt4 b">VerbsConstraint</div>
          <ul className="mt0 pt0 black">
            {scenarioData?.verbs
              ?.slice()
              .sort((a, b) => a.verb_infinitive.localeCompare(b.verb_infinitive))
              .map((verb, index) => (
                <li key={index}>
                  {verb.verb_infinitive}|{verb.verb_nosotros}
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
