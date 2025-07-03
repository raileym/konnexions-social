import {
  type CreateLessonResult,
  type HandleFlexLessonProps,
} from '@cknTypes/types';
import {
  PIPELINE_TYPE
} from '@cknTypes/constants'
import { runPipelineCbClient } from '@PanelGenAIProComponents/runPipelineCbClient/runPipelineCbClient';
import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview';
import { formatTranslationLinesForReview } from '@shared/formatTranslationLinesForReview';

export const handleFlexLesson = async ({
  setLessons,
  setLessonComplete,
  selectedLessonNumber,
  debugLog,
  setLessonTimestamp,
  initialLesson,
  clientEmail,
  clientUUID,
  setClientUUID
}: HandleFlexLessonProps) => {

  setLessonComplete(false);

  // 0. Get the clientUUID based on clientEmail
  const alwaysTrue = true
  let localClientUUID = clientUUID

  if (localClientUUID === '' || alwaysTrue) {
    const clientUUIDRes = await fetch('/.netlify/functions/get-client-uuid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientEmail })
    })
  
    if (!clientUUIDRes.ok) {
      console.error('Failed to get clientUUID')
      return
    }
  
    const clientUUIDData = await clientUUIDRes.json()
    localClientUUID = clientUUIDData.clientUUID

    setClientUUID(localClientUUID)
  
    if (!localClientUUID) {
      console.error('clientUUID missing in response')
      return
    }
  }

  const localLessonTimestamp = Date.now()
  setLessonTimestamp(localLessonTimestamp.toString())

  // Now you can optionally include clientUUID in your updatedInitialLesson or wherever needed
  const newLesson = {
    ...initialLesson,
    // id, Unknown as yet ... will come back with a value
    number: selectedLessonNumber,
    timestamp: localLessonTimestamp.toString(),
    uuid: localClientUUID
  }

  // 1. Insert the base lesson
  const createLessonResult = await fetch('/.netlify/functions/create-lesson-cb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newLesson) // no dialog or modules yet
  })

  if (!createLessonResult.ok) {
    console.error('Failed to create initial lesson')
    return
  }

  const result = await createLessonResult.json() as CreateLessonResult
  if (!result.success) {
    console.error('Failed to create initial lesson: success flag missing or false')
    return
  }

  const updatedInitialLesson = {
    ...newLesson,
    id: result.lessonId
  }

  console.log('Initial lesson created successfully')


  // ********************************************
  // Drive for the Dialog
  // ********************************************

  const dialogResult = await runPipelineCbClient({
    lesson: updatedInitialLesson,
    pipelineType: PIPELINE_TYPE.DIALOG //,
  })
  if (!dialogResult) return
  const { lesson: dialogLesson, durationMs: durationDialog } = dialogResult
  console.log(`Dialog pipeline took ${durationDialog.toFixed(2)}ms`)


  // ********************************************
  // Drive for the Translation
  // ********************************************

  const translationResult = await runPipelineCbClient({
    lesson: dialogLesson,
    pipelineType: PIPELINE_TYPE.TRANSLATION
  })
  if (!translationResult) return
  const { lesson: translationLesson, durationMs: durationTranslation } = translationResult
  console.log(`Translation pipeline took ${durationTranslation.toFixed(2)}ms`)

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
  // Drive for the Nouns
  // ********************************************

  const nounsResult = await runPipelineCbClient({
    lesson: updatedTranslationLesson,
    pipelineType: PIPELINE_TYPE.NOUNS
  })
  if (!nounsResult) return
  const { lesson: nounsLesson, durationMs: durationNouns } = nounsResult
  console.log(`Nouns pipeline took ${durationNouns.toFixed(2)}ms`)

  // ********************************************
  // Drive for the Verbs
  // ********************************************

  const verbsResult = await runPipelineCbClient({
    lesson: nounsLesson,
    pipelineType: PIPELINE_TYPE.VERBS
  })
  if (!verbsResult) return
  const { lesson: verbsLesson, durationMs: durationVerbs } = verbsResult
  console.log(`Verbs pipeline took ${durationVerbs.toFixed(2)}ms`)

  // ********************************************
  // We made it this far. Store our final lesson.
  // ********************************************

  setLessons((prev) => {
    debugLog('🔄 Updating lesson list...');
    debugLog('▶️ verbsLesson:', verbsLesson);
    const next = prev.map((lsn) => {
      if (lsn.number === selectedLessonNumber) {
        debugLog(`✅ Match found: lesson.id = ${lsn.id}`);
        const updated = { ...verbsLesson, id: lsn.id, name: lsn.name };
        debugLog('🆕 Updated lesson:', updated);
        return updated;
      }
      return lsn;
    });
    debugLog('📦 New lessons array:', next);
    return next;
  });

  // setLessonTimestamp(Date.now())
  setLessonComplete(true);

  // ***********************************************************************************
  // Dialog Translate To English
  // ***********************************************************************************
  //
  // const originalLines = (dialogLessonUpdated_4)?.dialog?.lines ?? []

  // // Step 1: Separate speaker and dialog fields
  // const speakerFrom = originalLines.map(line => line.split('|')[1] ?? '')
  // const dialogFrom = originalLines.map(line => line.split('|')[2] ?? '')

  // let speakerTo: string[] = []
  // let dialogTo: string[] = []

  // try {
  //   speakerTo = await runTranslation({lines: speakerFrom, source: dialogLessonUpdated_4.targetLanguage, target: dialogLessonUpdated_4.sourceLanguage}) as string[]
  //   dialogTo = await runTranslation({lines: dialogFrom, source: dialogLessonUpdated_4.targetLanguage, target: dialogLessonUpdated_4.sourceLanguage}) as string[]
  // } catch (err) {
  //   console.error('❌ Translation error', err)
  // }

  // // Step 2: Reconstruct full translated lines
  // const translatedLines = originalLines.map((line, idx) => {
  //   const gender = line.split('|')[0] ?? 'x'
  //   const speaker = speakerTo[idx] ?? '???'
  //   const dialog = dialogTo[idx] ?? '???'
  //   return `${gender}|${speaker}|${dialog}`
  // })

  // const dialogLessonUpdated_4translation = {
  //   ...dialogLessonUpdated_4,
  //   translation: {
  //     ...dialogLessonUpdated_4.translation,
  //     [dialogLessonUpdated_4.targetLanguage]: originalLines,  // typically lesson.dialog.lines
  //     [dialogLessonUpdated_4.sourceLanguage]: translatedLines   // result from runTranslation
  //   }
  // }

  // debugLog('dialogLessonUpdated_4translation', dialogLessonUpdated_4translation)

  //
  // Verbs Expanded and Verbs Expanded In-Complete (Sentences)
  //
  // const verbsLists_13 = generateVerbLists(verbsLessonUpdated_12)
  // const verbsLists_13 = generateVerbLists(verbsMissingLessonUpdated_c16)
  
  // const verbsExpandedLesson_15 = {
  //   ...verbsMissingLessonUpdated_c16,

  //   [MODULE_NAME.VERBS_EXPANDED_INCOMPLETE]: {
  //     ...(verbsMissingLessonUpdated_c16[MODULE_NAME.VERBS_EXPANDED_INCOMPLETE as keyof Lesson] as Module),
  //     lines: verbsLists_13.incomplete
  //   }
  // }

  // const verbsExpandedCompleteLesson_16 = await runModule({testMode, moduleName: MODULE_NAME.VERBS_EXPANDED_COMPLETE, lesson: verbsExpandedLesson_15})
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

};
