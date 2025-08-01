import { useState } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import SelectorScenario from '@components/SelectorScenario/SelectorScenario'
import { getPrompt_cb } from '@shared/getPrompt_cb'
import {
  type TestMode,
  defaultLesson,
} from '@cknTypes/types'
import {
  // VERB_FORMATS,
  // SCENARIO,
  MODULE_NAME,
  LANGUAGE_TITLE,
  SCENARIO,
  ACTIVE_PANEL,
  TABINDEX_NEVER
} from '@cknTypes/constants'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { getScenarioDetails } from '@components/getScenarioDetails/getScenarioDetails'
import { DialogList } from '@components/DialogList/DialogList'
// import { ExpandedVerbListWithPronouns } from '../ExpandedVerbListWithPronouns/ExpandedVerbListWithPronouns'
// import { FlashcardModal } from '@PanelGenAIProComponents/FlashcardModal/FlashcardModal'
// import { DebugVerbLists } from '../DebugVerbLists/DebugVerbLists'
// import { generateVerbLists } from '@PanelGenAIProComponents/generateVerbLists/generateVerbLists'
// import CutoffToggle from '../../../CutoffToggle'
// import ShowMaxCount from '../../../ShowMaxCount'
import SelectorLanguage from '@components/SelectorLanguage'
import PromptToggle from '@PanelGenAIProComponents/PromptToggle/PromptToggle'
// import Hr from '@components/Hr'
import LessonElementToggle from '@PanelGenAIProComponents/LessonElementToggle/LessonElementToggle'
// import { LessonStatus } from '@PanelGenAIProComponents/LessonStatus/LessonStatus'
// import { useDebugLogger } from '@hooks/useDebugLogger'
import SelectorLessonPromptStyle from '@components/SelectorLessonPromptStyle'
import SelectorParticipantRole from '@components/SelectorParticipantRole'
import InputCustomScenario from '@components/InputCustomScenario'
import InputCustomParticipantList from '@components/InputCustomParticipantList'
import Header from '@components/Header/Header'
import { capitalize } from '@components/Util'
import { useLessonHandlers } from '@hooks/useLessonHandlers'
import { TextareaFlexLesson } from '@components/TextareaFlexLesson/TextareaFlexLesson'
import { formatFlexLesson } from '@components/formatFlexLesson/formatFlexLesson'
import { FormatSentence } from '@components/FormatSentence/FormatSentence'
import { usePanelManager } from '@context/PanelManagerContext/PanelManagerContext'
import { usePanelBase } from '@hooks/usePanelBase'

const PanelGenAIProComponents = () => {
  // const [lessonComplete, setLessonComplete] = useState<LessonComplete>(true)
  const [testMode,] = useState<TestMode>(false)
  // const [showDialogDraftPrompt, setShowDialogDraftPrompt] = useState(false)
  const [showNounsPrompt, setShowNounsPrompt] = useState(false)
  const [showVerbsPrompt, setShowVerbsPrompt] = useState(false)
  const [showDialogReviewPrompt, setShowDialogReviewPrompt] = useState(false)
  const [showNounsReviewPrompt, setShowNounsReviewPrompt] = useState(false)
  const [showVerbsReviewPrompt, setShowVerbsReviewPrompt] = useState(false)

  const { focusPanel, openPanel } = usePanelManager()

  const { tabIndex, ariaDisabled, ariaHidden, isOpen, isMounted } = usePanelBase({
    panelName: ACTIVE_PANEL.GEN_AI_PRO_COMPONENTS,
    translateXOpen: 'translate-x-0',
    translateXClose: 'translate-x-full',
    callback: {
      onOpen: () => {
        openPanel(ACTIVE_PANEL.INPUT_CUSTOM_PARTICIPANT_LIST)
      },
      onFocus: () => {
        focusPanel(ACTIVE_PANEL.INPUT_CUSTOM_PARTICIPANT_LIST)
      }
    }
  })
  
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
    createFullLesson,
    createFlexLesson
  } = useLessonHandlers()

  const {
    customSeed,
    cutoff,
    debugMode,
    lessons,
    scenario,
    selectedLessonNumber,
    setCustomSeed,
    // setDebugMode,
    // setLessonTimestamp,
    // setLessons,
    sourceLanguage,
    targetLanguage,
    useMyself,
    lessonPrompt,
    lessonPromptStyle,
    customParticipantList,
    customScenario,
    flexLesson,
    formattedFlexLesson,
    lessonComplete,
  } = useAppContext()
  
  // debugLog('clientUUID', clientUUID)
  // debugLog('clientSignature', clientSignature)
  // debugLog('clientMeter', clientMeter)

  const lesson = lessons.find(l => l.number === selectedLessonNumber)
  
  // cXonsole.log('Right Panel: Scenario', scenario, SCENARIO.CUSTOM, customParticipantList)

  const fakeLesson = {
      ...defaultLesson,
      scenario,
      targetLanguage,
      sourceLanguage,
      lessonPrompt,
      lessonPromptStyle,
      participantList: scenario === SCENARIO.CUSTOM ? customParticipantList : getScenarioDetails({ 
        useMyself,
        scenario,
        language: targetLanguage
      }).participantList
  }

  // const initialLesson = {
  //     ...defaultLesson,
  //     scenario,
  //     targetLanguage,
  //     sourceLanguage,
  //     lessonPrompt,
  //     lessonPromptStyle,
  //     participantList: scenario === SCENARIO.CUSTOM ? customParticipantList : getScenarioDetails({ 
  //       useMyself,
  //       scenario,
  //       language: targetLanguage
  //     }).participantList
  // }
  
  const alwaysFalse = false

  let content
  if (selectedLessonNumber != null && Array.isArray(lessons)) {
    if (!lesson) {
      content = <p>Lesson not found.</p>
    } else {
      // cXonsole.log('current lesson', JSON.stringify(lesson, null, 2))

      content = (
        <>
          {/*
          <div className="mv3X flex justify-center">
            <button
              tabIndex={tabIndex}
              inert={!isOpen}
              aria-disabled={ariaDisabled}
              aria-hidden={ariaHidden}
              onClick={() => setDebugMode(prev => !prev)}
              className={`w-30 pa3 br2 bn ${debugMode ? 'bg-brand' : 'bg-background'} on-background pointer`}
            >
              <div className="flex items-center" >
                <div className="ph1 bg-redX"><FontAwesomeIcon icon={debugMode ? faLock : faLockOpen} /></div>
                <div className="ml2">{debugMode ? 'Disable' : 'Enable'} Debug Mode</div>
              </div>
            </button>
          </div>
          */}
         
          {/*
          <div className="mv3X flex justify-center">
            <button
              onClick={() => setTestMode(prev => !prev)}
              className={`w-30 pa3 br2 bn ${testMode ? 'bg-brand' : 'bg-background'} on-background pointer`}
            >
              <div className="flex items-center" >
                <div className="ph1 bg-redX"><FontAwesomeIcon icon={testMode ? faLock : faLockOpen} /></div>
                <div className="ml2">{testMode ? 'Disable' : 'Enable'} Test Mode</div>
              </div>
            </button>
          </div>
          */}
         
          <div className="mv4 flex flex-row justify-center">
            <SelectorLanguage />
          </div>

          <h2 className="flex flex-column f2 pa3 pb0X mt4X w-100 items-center tc on-background">
            <div>{LANGUAGE_TITLE[targetLanguage]}: Premium</div>
            <div className="w-100 f2">Lesson {selectedLessonNumber}</div>
          </h2>


          <TextareaFlexLesson title={'Flex Lesson'}/>
          
          <div className={'mt3 mb4 flex justify-center'}>
            <div>
              <button
                tabIndex={tabIndex}
                inert={!isOpen}
                aria-disabled={ariaDisabled}
                aria-hidden={ariaHidden}
                className={'f3 pa3 br4 bn bg-secondary on-secondary pointer'}
                onClick={() => {
                  const formattedFlexLesson = formatFlexLesson({flexLesson})
                  const updatedLesson = {
                    ...lesson,
                    formattedFlexLesson
                  }
                  createFlexLesson({lesson: updatedLesson})
                }}
              >
                Create Flex Lesson
              </button>
            </div>
          </div>
          
          <div className="pa3 mt3 mb5 ba bg-on-background background w-100">
            <div className='tc f3 w-100 mt4X b'>Formatted Lesson</div>
            <ul className="mt0 pt0 background list pl0">
              {(formattedFlexLesson ?? []).map((line, index) => {
                const [, , sentence] = line.split('|')  // destructure to get the third part
                return (
                  <li key={index} className="bg-white black Xbackground">
                    <FormatSentence sentence={sentence} />
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex flex-row">
            <SelectorLessonPromptStyle />
            <SelectorScenario custom={true} />
            <SelectorParticipantRole />
          </div>

          <div>
            <InputCustomScenario />
            <InputCustomParticipantList />
          </div>
          
          {/*
          <div className="ba w-100 flex justify-center pt3X pb3">
            <div className="f3 pv3 pt0 mt0 w-80">
              <div className="f3">Create a <b>{lessonPromptStyle}</b> in <b>{LANGUAGE_TITLE[targetLanguage]}</b> {scenarioDescriptions[scenario]}.</div>
            </div>
          </div>
          */}

          <Header />

          <div className={'mt3 mb4 flex justify-center'}>
            <div>
              <button
                tabIndex={tabIndex}
                inert={!isOpen}
                aria-disabled={ariaDisabled}
                aria-hidden={ariaHidden}
                className={`f3 pa3 br4 bnX ${debugMode ? 'bg-background white' : 'bg-brand white'} pointer`}
                onClick={() => {
                  createFullLesson()
                }}
              >
                Create Lesson
              </button>
            </div>
          </div>

          <div className="flex flex-column items-center w-100">
            <div className={`w-100 f3 mt3X mb3 ${lessonComplete ? 'o-100' : 'o-60'}`}>
              {/* <LessonStatus isLoading={!lessonComplete} /> */}
              {/* <LessonStatus /> */}
              {/* <LessonStatus isLoading={!lessonComplete} /> */}
            </div>
          </div>

          <label className="db mb2 f5 b on-background">Seed or Prompt Description (optional):</label>
          <textarea
            tabIndex={tabIndex}
            inert={!isOpen}
            aria-disabled={ariaDisabled}
            aria-hidden={ariaHidden}
            value={customSeed}
            onChange={(e) => setCustomSeed(e.target.value)}
            className="w-100 ba b--gray br2 pa2"
            rows={10}
          />

          {!ariaDisabled && 
            <div className="pa3 mt3 ba bg-on-background w-100">
              <DialogList
                language={lesson.targetLanguage}
                translations={(lesson?.translationResolve?.lines ?? [])}
                lines={(lesson?.dialogResolve?.lines ?? [])}
                useCloudTTS={true}
              />
            </div>
          }

          <div className="pa3 mt3 ba bg-on-background w-100">
            <div className='tc f3 w-100 mt4X b'>{capitalize(lessonPromptStyle)} {customScenario}</div>
            <ul className="mt0 pt0 background list pl0">
              {(lesson?.translationResolve.lines ?? [])
                .map((line, index) => (
                  <li key={index} className="background">
                    <FormatSentence sentence={line} />
                  </li>
                ))}
              </ul>            
          </div>

          {/*
          <div className="pa3 mt3 ba bg-on-background w-100">
            <DialogList language={lesson.targetLanguage} lines={(lesson?.translation[lesson.targetLanguage] ?? [])} useCloudTTS={true} />
          </div>

          <div className="pa3 mt3 ba bg-on-background w-100">
            <DialogList language={lesson.sourceLanguage} lines={(lesson?.translation[lesson.sourceLanguage]  ?? [])} useCloudTTS={true} />
          </div>
          */}
         

          {/* 
          <div className="f3 mv4 center">GenerateTTS: {generateTTSCount} invocations</div>
          */}

          <PromptToggle className='bg-yellow background' title={'Proposed Dialog Draft Prompt'} prompt={getPrompt_cb({ moduleName: MODULE_NAME.DIALOG_DRAFT, lesson: fakeLesson, errors: [] }).prompt} />
          <PromptToggle className='bg-on-background' title={'Actual Dialog Draft Prompt'} prompt={lesson[MODULE_NAME.DIALOG_DRAFT].prompt} />

          <PromptToggle className='bg-yellow background' title={'Proposed Dialog Review Prompt'} prompt={getPrompt_cb({ moduleName: MODULE_NAME.DIALOG_REVIEW, lesson: fakeLesson, errors: [] }).prompt} />
          <PromptToggle className='bg-on-background' title={'Actual Dialog Review Prompt'} prompt={lesson.dialogReview.prompt} />

          {/*
          <PromptToggle className='bg-yellow background' title={'Proposed Translation Draft Prompt'} prompt={getPrompt_cb({ moduleName: MODULE_NAME.TRANSLATION_DRAFT, lesson, errors: [] }).prompt} />
          <PromptToggle title={'Actual Translation Draft Prompt'} prompt={lesson[MODULE_NAME.TRANSLATION_DRAFT].prompt} />

          <PromptToggle className='bg-yellow background' title={'Proposed Translation Review Prompt'} prompt={getPrompt_cb({ moduleName: MODULE_NAME.TRANSLATION_REVIEW, lesson, errors: [] }).prompt} />
          <PromptToggle title={'Actual Translation Review Prompt'} prompt={lesson[MODULE_NAME.TRANSLATION_REVIEW].prompt} />
          */}

          {
            debugMode && alwaysFalse && (
              <>
                <PromptToggle className='bg-yellow background' title={'Proposed Dialog Draft Prompt'} prompt={getPrompt_cb({ moduleName: MODULE_NAME.DIALOG_DRAFT, lesson: fakeLesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Dialog Draft Prompt'} prompt={lesson[MODULE_NAME.DIALOG_DRAFT].prompt} />

                <PromptToggle className='bg-yellow background' title={'Proposed Dialog Review Prompt'} prompt={getPrompt_cb({ moduleName: MODULE_NAME.DIALOG_REVIEW, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Dialog Review Prompt'} prompt={lesson.dialogReview.prompt} />

                <PromptToggle className='bg-yellow background' title={'Proposed Nouns Draft Prompt'} prompt={getPrompt_cb({ moduleName: MODULE_NAME.NOUNS_DRAFT, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Nouns Draft Prompt'} prompt={lesson[MODULE_NAME.NOUNS_DRAFT].prompt} />

                <PromptToggle className='bg-yellow background' title={'Proposed Nouns Review Prompt'} prompt={getPrompt_cb({ moduleName: MODULE_NAME.NOUNS_REVIEW, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Nouns Review Prompt'} prompt={lesson.nounsReview.prompt} />

                <PromptToggle className='bg-yellow background' title={'Proposed Verbs Draft Prompt'} prompt={getPrompt_cb({ moduleName: MODULE_NAME.VERBS_DRAFT, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Verbs Draft Prompt'} prompt={lesson[MODULE_NAME.VERBS_DRAFT].prompt} />

                <PromptToggle className='bg-yellow background' title={'Proposed Verbs Review Prompt'} prompt={getPrompt_cb({ moduleName: MODULE_NAME.VERBS_REVIEW, lesson, errors: [] }).prompt} />
                <PromptToggle title={'Actual Verbs Review Prompt'} prompt={lesson.verbsReview.prompt} />

                {/*
                <div className="mt4 b">NounsOnly</div>
                <ul className="mt0 pt0 background">
                  {lesson.nounsOnly?.lines
                    ?.slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                </ul>

                <div className="mt4 b">VerbsOnly</div>
                <ul className="mt0 pt0 background">
                  {lesson.verbsOnly?.lines
                    ?.slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                </ul>

                <div className="mt4 b">NounsMissing</div>
                <ul className="mt0 pt0 background">
                  {lesson.nounsMissing?.lines
                    ?.slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                </ul>

                <div className="mt4 b">VerbsMissing</div>
                <ul className="mt0 pt0 background">
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

          {
            alwaysFalse && (
              <LessonElementToggle title={'Nouns'} content={lesson[MODULE_NAME.NOUNS_DRAFT].lines} testMode={testMode} />
            )
          }

          { testMode && alwaysFalse && (
            <div className="w-100">
              <button
                onClick={toggleShowNounsPrompt}
                className="mt3 pa2 br2 bn bg-brand on-background pointer"
              >
                {showNounsPrompt ? 'Hide Nouns Prompt' : 'Show Nouns Prompt'}
              </button>
            </div>
          )}

          {testMode && alwaysFalse && showNounsPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-on-background">
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Nouns Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson[MODULE_NAME.NOUNS_DRAFT].prompt}</div>
              </div>
            </div>
          )}
          
          { testMode && alwaysFalse && (
            <div className="w-100">
              <button
                onClick={toggleShowVerbsPrompt}
                className="mt3 pa2 br2 bn bg-brand on-background pointer"
              >
                {showVerbsPrompt ? 'Hide Verbs Prompt' : 'Show Verbs Prompt'}
              </button>
            </div>
          )}

          {testMode && alwaysFalse && showVerbsPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-on-background">
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Verbs Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson[MODULE_NAME.VERBS_DRAFT].prompt}</div>
              </div>
            </div>
          )}
          
          { testMode && alwaysFalse && (
            <div className="w-100">
              <button
                onClick={toggleShowDialogReviewPrompt}
                className="mt3 pa2 br2 bn bg-brand on-background pointer"
              >
                {showDialogReviewPrompt ? 'Hide Dialog Review Prompt' : 'Show Dialog Review Prompt'}
              </button>
            </div>
          )}

          {testMode && alwaysFalse && showDialogReviewPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-on-background">
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Dialog Review Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.dialogReview.prompt}</div>
              </div>
            </div>
          )}

          { testMode && alwaysFalse && (
            <div className="w-100">
              <button
                onClick={toggleShowNounsReviewPrompt}
                className="mt3 pa2 br2 bn bg-brand on-background pointer"
              >
                {showNounsReviewPrompt ? 'Hide Nouns Review Prompt' : 'Show Nouns Review Prompt'}
              </button>
            </div>
          )}

          {testMode && alwaysFalse && showNounsReviewPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-on-background">
                <div className="b" style={{ whiteSpace: 'pre-wrap' }}>Nouns Review Prompt</div>
                <div className="db" style={{ whiteSpace: 'pre-wrap' }}>{lesson.nounsReview.prompt}</div>
              </div>
            </div>
          )}

          { testMode && alwaysFalse && (
            <div className="w-100">
              <button
                onClick={toggleShowVerbsReviewPrompt}
                className="mt3 pa2 br2 bn bg-brand on-background pointer"
              >
                {showVerbsReviewPrompt ? 'Hide Verbs Review Prompt' : 'Show Verbs Review Prompt'}
              </button>
            </div>
          )}

          {testMode && alwaysFalse && showVerbsReviewPrompt && (
            <div className="w-100 flex justify-center flex-column">
              <div className="mt4 ba pa3 bg-on-background">
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
          <ul className="mt0 pt0 background">
            {lesson.nouns.lines.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        
          <div className="mt4 b">Verbs</div>
          <ul className="mt0 pt0 background">
            {lesson.verbs.lines.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          */}

          {/*
          <h2>{lesson.name}</h2>
          <p>{lesson.description}</p>

          <ul className="mt0 pt0 background">
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

  // useEffect(() => {
  //   debugLog('lesson', lesson)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[lesson])

  return (
    <div inert={!isOpen} tabIndex={TABINDEX_NEVER} aria-disabled={false} className={`panel-gen-ai-pro-components b--greenX bw1X w-100 vh-100 pb6 overflow-y-auto pa3 bg-light-grayX bg-background ${cutoff ? 'bg-yellow' : ''} ${isOpen ? 'panel-visible' : 'panel-hiddenX'} ${!isMounted ? 'dnX' : ''}`} style={{ paddingTop: '7em' }}>
      {content}
    </div>
  )
}

export default PanelGenAIProComponents
