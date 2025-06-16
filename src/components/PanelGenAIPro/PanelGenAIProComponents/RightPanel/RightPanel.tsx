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
  scenarioDescriptions
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
import { handleCreateLesson } from './RightPanelComponents/handleCreateLesson/handleCreateLesson'
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

  const lesson = lessons.find(l => l.id === selectedLessonId)

  
  let content
  if (selectedLessonId != null && Array.isArray(lessons)) {
    if (!lesson) {
      content = <p>Lesson not found.</p>
    } else {
      const { prompt: dialogPrompt } = getPrompt({moduleName: MODULE_NAME.DIALOG, scenarioData, lesson, errors: [] })
      const { prompt: dialogReviewPrompt } = getPrompt({moduleName: MODULE_NAME.DIALOG_REVIEW, scenarioData, lesson, errors: [] })

      // console.log('lesson', lesson)
      // console.log('prompt', prompt)

      const verbListsNoIndex = generateVerbLists(lesson, true)

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

          <div className="w-100 mv3">
            <button
              onClick={() => setShowDialogPrompt(prev => !prev)}
              className="pa2 br3 bg-brand black pointer b--black"
            >
              {showDialogPrompt ? 'Hide Dialog Prompt' : 'Show Dialog Prompt'}
            </button>
            <button
              onClick={() => setShowDialogReviewPrompt(prev => !prev)}
              className="ml3 pa2 br3 bg-brand black pointer b--black"
            >
              {showDialogReviewPrompt ? 'Hide Dialog Review Prompt' : 'Show Dialog Review Prompt'}
            </button>
          </div>

          {showDialogPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mv4 ba pa3 bg-white">
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Dialog Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{dialogPrompt}</div>
              </div>
            </div>
          )}

          {showDialogReviewPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mv4 ba pa3 bg-white">
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Dialog Review Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{dialogReviewPrompt}</div>
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
          

          {/*
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
          */}


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
