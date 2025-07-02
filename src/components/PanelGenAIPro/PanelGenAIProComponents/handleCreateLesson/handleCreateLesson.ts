import {
  type CreateLessonResult,
  // defaultLesson,
  type HandleCreateLessonProps,
  // type Lesson,
  // type Module
} from '@cknTypes/types';
import {
  PIPELINE_TYPE
  // SCENARIO
} from '@cknTypes/constants'
// import { getScenarioDetails } from '@components/getScenarioDetails/getScenarioDetails';
// import { dialogResolve } from '@PanelGenAIProComponents/dialogResolve/dialogResolve'
// import { runModule } from '@PanelGenAIProComponents/runModule/runModule';
// import { resolveVerbsOnly } from '@PanelGenAIProComponents/resolveVerbsOnly/resolveVerbsOnly';
// import { nounsMissingResolve } from '@PanelGenAIProComponents/nounsMissingResolve/nounsMissingResolve';
// import { resolveVerbsMissing } from '@PanelGenAIProComponents/resolveVerbsMissing/resolveVerbsMissing';
// import { pushMissingToDB } from '@PanelGenAIProComponents/pushMissingToDB/pushMissingToDB';
// import { runTranslation } from '@PanelGenAIProComponents/runTranslation/runTranslation';
// import { generateVerbLists } from '../generateVerbLists/generateVerbLists';
// import { rebuildVerbLines } from '@PanelGenAIProComponents/rebuildVerbLines/rebuildVerbLines'
// import { rebuildNounLines } from '@PanelGenAIProComponents/rebuildNounLines/rebuildNounLines';
// import { runPipeline } from '@PanelGenAIProComponents/runPipeline/runPipeline';
// import { nounsOnlyResolve } from '@PanelGenAIProComponents/nounsOnlyResolve/nounsOnlyResolve';
// import { resolveNouns } from '@PanelGenAIProComponents/resolveNouns/resolveNouns';
import { runPipelineCbClient } from '@PanelGenAIProComponents/runPipelineCbClient/runPipelineCbClient';
// import { formatDialogLinesForReview } from '@shared/formatDialogLinesForReview';
// import { formatTranslationLinesForReview } from '@shared/formatTranslationLinesForReview';

export const handleCreateLesson = async ({
  // scenario,
  // targetLanguage,
  // sourceLanguage,
  // lesson,
  setLessons,
  setLessonComplete,
  selectedLessonNumber,
  // useMyself,
  // testMode,
  debugLog,
  setLessonTimestamp,
  initialLesson,
  clientEmail,
  clientUUID,
  setClientUUID
  // clientSignature,
  // clientMeter
}: HandleCreateLessonProps) => {
  // const { participantList } = scenario === SCENARIO.CUSTOM ? customParticipantList : getScenarioDetails({
  //   useMyself,
  //   scenario,
  //   language: targetLanguage
  // });

  // debugLog('clientUUID', clientUUID)
  // debugLog('clientSignature', clientSignature)
  // debugLog('clientMeter', clientMeter)

  setLessonComplete(false);

  // const initialLesson_0 = {
  //   ...defaultLesson,
  //   scenario,
  //   targetLanguage,
  //   sourceLanguage,
  //   lessonPrompt,
  //   lessonPromptStyle,
  //   participantList,
  // };

  // return {
  //   lesson: data.lesson,
  //   durationMs: data.durationMs
  // }

  // console.log('initialLesson', initialLesson)

  // const updatedInitialLesson = {
  //   ...initialLesson,
  //   signature: 'x0123456789'
  // }
  
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

  const dialogResult = await runPipelineCbClient({
    lesson: updatedInitialLesson,
    pipelineType: PIPELINE_TYPE.DIALOG //,
  })
  if (!dialogResult) return
  const { lesson: dialogLesson, durationMs: durationDialog } = dialogResult
  console.log(`Dialog pipeline took ${durationDialog.toFixed(2)}ms`)

  // const translationResult = await runPipelineCbClient({
  //   lesson: dialogLesson,
  //   pipelineType: PIPELINE_TYPE.TRANSLATION
  // })
  // if (!translationResult) return
  // const { lesson: translationLesson, durationMs: durationTranslation } = translationResult
  // console.log(`Translation pipeline took ${durationTranslation.toFixed(2)}ms`)
  // const linesTargetLanguage = formatDialogLinesForReview(translationLesson.dialogResolve.lines)
  // const linesSourceLanguage = formatTranslationLinesForReview(translationLesson.translationResolve.lines)
  // const updatedTranslationLesson = {
  //   ...translationLesson,
  //   translation: {
  //     ...translationLesson.translation,
  //     [translationLesson.targetLanguage]: linesTargetLanguage,
  //     [translationLesson.sourceLanguage]: linesSourceLanguage
  //   }
  // }

  // const nounsResult = await runPipelineCbClient({
  //   lesson: updatedTranslationLesson,
  //   pipelineType: PIPELINE_TYPE.NOUNS
  // })
  // if (!nounsResult) return
  // const { lesson: nounsLesson, durationMs: durationNouns } = nounsResult
  // console.log(`Nouns pipeline took ${durationNouns.toFixed(2)}ms`)

  // const verbsResult = await runPipelineCbClient({
  //   lesson: nounsLesson,
  //   pipelineType: PIPELINE_TYPE.VERBS
  // })
  // if (!verbsResult) return
  // const { lesson: verbsLesson, durationMs: durationVerbs } = verbsResult
  // console.log(`Verbs pipeline took ${durationVerbs.toFixed(2)}ms`)


  setLessons((prev) => {
    debugLog('🔄 Updating lesson list...');
    debugLog('▶️ dialogLesson:', dialogLesson);
    const next = prev.map((lsn) => {
      if (lsn.number === selectedLessonNumber) {
        debugLog(`✅ Match found: lesson.id = ${lsn.id}`);
        const updated = { ...dialogLesson, id: lsn.id, name: lsn.name };
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
