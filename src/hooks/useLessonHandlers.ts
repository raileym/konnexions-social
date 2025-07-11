import { useAppContext } from '@context/AppContext/AppContext'
import { MODULE_NAME, PIPELINE_TYPE, SCENARIO } from '@cknTypes/constants'
import { runPipelineCbClient } from '@PanelGenAIProComponents/runPipelineCbClient/runPipelineCbClient'
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview'
import { formatTranslationLinesForReview } from '@shared/formatTranslationLinesForReview'
import { defaultLesson, type CreateFlexLessonProps, type CreateLessonResult } from '@cknTypes/types'
import { useDebugLogger } from '@hooks/useDebugLogger'
import { getScenarioDetails } from '@components/getScenarioDetails/getScenarioDetails'
// import type { faFalse } from '@fortawesome/free-solid-svg-icons'

export const useLessonHandlers = () => {

  const debugLog = useDebugLogger()
  
  const {
    setLessons,
    setLesson,
    selectedLessonNumber,
    setLessonTimestamp,
    setLessonComplete,

    scenario,
    targetLanguage,
    sourceLanguage,
    lessonPrompt,
    lessonPromptStyle,
    useMyself,
    customParticipantList,
    lessonName,
    clientUUID
  } = useAppContext()

  const createFullLesson = async () => {
    setLessonComplete(false)

    const localLessonTimestamp = Date.now()
    setLessonTimestamp(localLessonTimestamp.toString())

    const initialLesson = {
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

    const newLesson = {
      ...initialLesson,
      number: selectedLessonNumber,
      timestamp: localLessonTimestamp.toString(),
      clientUUID
    }

    // 1. Insert base lesson
    const createLessonResult = await fetch('/.netlify/functions/create-lesson-cb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLesson)
    })

    if (!createLessonResult.ok) {
      console.error('Failed to create initial lesson')
      return
    }

    const result = (await createLessonResult.json()) as CreateLessonResult
    if (!result.success) {
      console.error('Failed to create initial lesson: success flag missing or false')
      return
    }

    const updatedInitialLesson = {
      ...newLesson,
      id: result.lessonId
    }

    debugLog('Initial lesson created successfully')

    // ********************************************
    // Dialog
    // ********************************************
    const dialogResult = await runPipelineCbClient({
      lesson: updatedInitialLesson,
      pipelineType: PIPELINE_TYPE.DIALOG
    })
    if (!dialogResult) return
    const { lesson: dialogLesson, durationMs: durationDialog } = dialogResult
    debugLog(`Dialog pipeline took ${durationDialog.toFixed(2)}ms`)

    // ********************************************
    // Translation
    // ********************************************
    const translationResult = await runPipelineCbClient({
      lesson: dialogLesson,
      pipelineType: PIPELINE_TYPE.TRANSLATION
    })
    if (!translationResult) return
    const { lesson: translationLesson, durationMs: durationTranslation } = translationResult
    debugLog(`Translation pipeline took ${durationTranslation.toFixed(2)}ms`)

    const linesTargetLanguage = formatDialogLinesForReview(translationLesson.dialogResolve.lines)
    const linesSourceLanguage = formatTranslationLinesForReview(translationLesson.translationResolve.lines)

    const updatedTranslationLesson = {
      ...translationLesson,
      translation: {
        ...translationLesson.translation,
        [translationLesson.targetLanguage]: linesTargetLanguage,
        [translationLesson.sourceLanguage]: linesSourceLanguage
      }
    }

    // ********************************************
    // Nouns
    // ********************************************
    const nounsResult = await runPipelineCbClient({
      lesson: updatedTranslationLesson,
      pipelineType: PIPELINE_TYPE.NOUNS
    })
    if (!nounsResult) return
    const { lesson: nounsLesson, durationMs: durationNouns } = nounsResult
    debugLog(`Nouns pipeline took ${durationNouns.toFixed(2)}ms`)

    // ********************************************
    // Verbs
    // ********************************************
    const verbsResult = await runPipelineCbClient({
      lesson: nounsLesson,
      pipelineType: PIPELINE_TYPE.VERBS
    })
    if (!verbsResult) return
    const { lesson: verbsLesson, durationMs: durationVerbs } = verbsResult
    debugLog(`Verbs pipeline took ${durationVerbs.toFixed(2)}ms`)

    const updatedVerbsLesson = {
      ...verbsLesson,
      isComplete: true
    }

    // Update lesson list
    setLessons((prev) => {
      debugLog('🔄 Updating lesson list...')
      debugLog('▶️ updatedVerbsLesson:', updatedVerbsLesson)
      const next = prev.map((lsn) =>
        lsn.number === selectedLessonNumber ? { ...updatedVerbsLesson, id: lsn.id, name: lsn.name } : lsn
      )
      debugLog('📦 New lessons array:', next)
      return next
    })

    setLessonComplete(true)
    setLesson(updatedVerbsLesson)
  }

  const createFlexLesson = async ({lesson}: CreateFlexLessonProps) => {
    setLessonComplete(false)

    const localLessonTimestamp = Date.now()
    setLessonTimestamp(localLessonTimestamp.toString())

    const initialLesson = {
      ...lesson,
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

    console.log('lessonName', lessonName)
    console.log('initialLesson', JSON.stringify(initialLesson, null, 2))

    const newLesson = {
      ...initialLesson,
      number: selectedLessonNumber,
      timestamp: localLessonTimestamp.toString(),
      clientUUID
    }

    // 1. Insert base lesson
    const createLessonResult = await fetch('/.netlify/functions/create-lesson-cb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLesson)
    })

    if (!createLessonResult.ok) {
      console.error('Failed to create initial lesson')
      return
    }

    const result = (await createLessonResult.json()) as CreateLessonResult
    if (!result.success) {
      console.error('Failed to create initial lesson: success flag missing or false')
      return
    }

    const updatedInitialLesson = {
      ...newLesson,
      id: result.lessonId
    }

    debugLog('Initial lesson created successfully')

    const dialogLesson = {
      ...updatedInitialLesson,
      [MODULE_NAME.DIALOG_DRAFT]: {
        ...updatedInitialLesson[MODULE_NAME.DIALOG_DRAFT],
        lines: lesson.formattedFlexLesson
      },
      [MODULE_NAME.DIALOG_REVIEW]: {
        ...updatedInitialLesson[MODULE_NAME.DIALOG_REVIEW],
        lines: lesson.formattedFlexLesson
      },
      [MODULE_NAME.DIALOG_RESOLVE]: {
        ...updatedInitialLesson[MODULE_NAME.DIALOG_RESOLVE],
        lines: lesson.formattedFlexLesson
      }
    }

    console.log('dialogLesson', dialogLesson)

    // ********************************************
    // Translation
    // ********************************************
    const translationResult = await runPipelineCbClient({
      lesson: dialogLesson,
      pipelineType: PIPELINE_TYPE.TRANSLATION
    })
    if (!translationResult) return
    const { lesson: translationLesson, durationMs: durationTranslation } = translationResult
    debugLog(`Translation pipeline took ${durationTranslation.toFixed(2)}ms`)

    const linesTargetLanguage = formatDialogLinesForReview(translationLesson.dialogResolve.lines)
    const linesSourceLanguage = formatTranslationLinesForReview(translationLesson.translationResolve.lines)

    const updatedTranslationLesson = {
      ...translationLesson,
      translation: {
        ...translationLesson.translation,
        [translationLesson.targetLanguage]: linesTargetLanguage,
        [translationLesson.sourceLanguage]: linesSourceLanguage
      },
      isComplete: true
    }

    // ********************************************
    // Update lesson list
    // ********************************************
    setLessons((prev) => {
      debugLog('🔄 Updating lesson list...')
      debugLog('▶️ updatedTranslationLesson:', updatedTranslationLesson)
      const next = prev.map((lsn) =>
        lsn.number === selectedLessonNumber ? { ...updatedTranslationLesson, id: lsn.id, name: lsn.name } : lsn
      )
      debugLog('📦 New lessons array:', next)
      return next
    })

    setLessonComplete(true)
    setLesson(updatedTranslationLesson)
    
  }

  return {
    createFullLesson,
    createFlexLesson
  }
}
