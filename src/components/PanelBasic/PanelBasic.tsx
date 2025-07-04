import React, { useEffect, useState } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import SelectorScenario from '@components/SelectorScenario'
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
  SCENARIO
} from '@cknTypes/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
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
import { LessonStatus } from '@PanelGenAIProComponents/LessonStatus/LessonStatus'
import { useDebugLogger } from '@hooks/useDebugLogger'
import SelectorLessonPromptStyle from '@components/SelectorLessonPromptStyle'
import SelectorParticipantRole from '@components/SelectorParticipantRole'
import InputCustomScenario from '@components/InputCustomScenario'
import InputCustomParticipantList from '@components/InputCustomParticipantList'
import Header from '@components/Header'
import { capitalize } from '@components/Util'
import { useLessonHandlers } from '@hooks/useLessonHandlers'
import { TextareaFlexLesson } from '@components/TextareaFlexLesson/TextareaFlexLesson'
import { formatFlexLesson } from '@PanelGenAIProComponents/formatFlexLesson/formatFlexLesson'
import { FormatSentence } from '@components/FormatSentence/FormatSentence'
import { FormattedFlexLesson } from '@components/FormattedFlexLesson/FormattedFlexLesson'

const RightPanel: React.FC = () => {
  // const [lessonComplete, setLessonComplete] = useState<LessonComplete>(true)
  const [testMode,] = useState<TestMode>(false)
  // const [showDialogDraftPrompt, setShowDialogDraftPrompt] = useState(false)
  const [showNounsPrompt, setShowNounsPrompt] = useState(false)
  const [showVerbsPrompt, setShowVerbsPrompt] = useState(false)
  const [showDialogReviewPrompt, setShowDialogReviewPrompt] = useState(false)
  const [showNounsReviewPrompt, setShowNounsReviewPrompt] = useState(false)
  const [showVerbsReviewPrompt, setShowVerbsReviewPrompt] = useState(false)

  const debugLog = useDebugLogger()

  // const toggleShowDialogDraftPrompt = () => {
  //   (prev => !prev)
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
    setDebugMode,
    // setLessonTimestamp,
    // setLessons,
    sourceLanguage,
    targetLanguage,
    useMyself,
    lessonPrompt,
    lessonPromptStyle,
    customParticipantList,
    customScenario,
    // clientMeter,
    // clientSignature,
    // clientUUID,
    // clientEmail,
    // setClientUUID,
    flexLesson,
    formattedFlexLesson,
    
    lessonComplete //,
    // setLessonComplete
  } = useAppContext()
  
  // debugLog('clientUUID', clientUUID)
  // debugLog('clientSignature', clientSignature)
  // debugLog('clientMeter', clientMeter)

  const lesson = lessons.find(l => l.number === selectedLessonNumber)
  
  // console.log('Right Panel: Scenario', scenario, SCENARIO.CUSTOM, customParticipantList)

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

  const textareaFlexLessonTitle = 'Transform your Spanish text into high-quality speech using a cloud-based Text-to-Speech (TTS) service, or into standard quality speech using the built-in voice on your device.'


  let content
  if (selectedLessonNumber != null && Array.isArray(lessons)) {
    if (!lesson) {
      content = <p>Lesson not found.</p>
    } else {
      // console.log('current lesson', JSON.stringify(lesson, null, 2))

      content = (
        <>
          <h2 className="baX f2 pa3 pb0X mt4X w-100 items-center tc">
            <div>
              {LANGUAGE_TITLE[targetLanguage]}: Basic
            </div>
          <div className="w-100 black f2">Lesson {selectedLessonNumber}</div>
          </h2>

          <TextareaFlexLesson title={textareaFlexLessonTitle}/>

          <FormattedFlexLesson title={'Review your lesson before creating the corresponding translation and MP3 audio file.'}/>
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
    <div className={'baX bw1 b--moon-gray bl gen-ai-pro-panel z-0 absolute top-0 left-10 w-90 h-100 bg-light-greenX flex flex-rowX transition-transform translate-x-0'}>

      <div className={`baX b--greenX bw1X w-100 vh-100 pb6 overflow-y-auto pa3 bg-light-gray ${cutoff ? 'bg-yellow' : ''}`} style={{ paddingTop: '7em' }}>
      {content}
      </div>
    </div>
  )
}

export default RightPanel
