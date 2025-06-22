import {
  type HandleCreateLessonProps,
  type Lesson,
  type Module
} from '@cknTypes/types';
import {
  MODULE_NAME
} from '@cknTypes/constants'
import { getScenarioDetails } from '@components/getScenarioDetails/getScenarioDetails';
import { resolveDialog } from '@PanelGenAIProComponents/resolveDialog/resolveDialog'
import { runModule } from '@PanelGenAIProComponents/runModule/runModule';
import { resolveNounsOnly } from '@PanelGenAIProComponents/resolveNounsOnly/resolveNounsOnly';
import { resolveVerbsOnly } from '@PanelGenAIProComponents/resolveVerbsOnly/resolveVerbsOnly';
import { resolveNounsMissing } from '@PanelGenAIProComponents/resolveNounsMissing/resolveNounsMissing';
import { resolveVerbsMissing } from '@PanelGenAIProComponents/resolveVerbsMissing/resolveVerbsMissing';
import { pushMissingToDB } from '@PanelGenAIProComponents/pushMissingToDB/pushMissingToDB';
import { runTranslation } from '@PanelGenAIProComponents/runTranslation/runTranslation';
import { generateVerbLists } from '../generateVerbLists/generateVerbLists';

export const handleCreateLesson = async ({
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
}: HandleCreateLessonProps) => {
  const { participantList } = getScenarioDetails({ useMyself, scenario, language: targetLanguage });

  setLessonComplete(false);

  const initialLesson_0 = {
    ...lesson,
    targetLanguage,
    sourceLanguage,
    scenario,
    participantList,
  };

  //
  // Dialog
  //
  const dialogLesson_1 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.DIALOG, lesson: initialLesson_0})
  if (!dialogLesson_1) return

  // cXonsole.log('dialogLesson_1', dialogLesson_1)
  
  //
  // Dialog Review
  //
  const dialogReviewLesson_2 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.DIALOG_REVIEW, lesson: dialogLesson_1})
  if (!dialogReviewLesson_2) return

  // cXonsole.log('dialogReviewLesson', dialogReviewLesson_2)
  
  //
  // Dialog Resolve
  //
  const { dialogLinesResolved: dialogLinesResolved_3 } = resolveDialog({
    dialogReviewLines: dialogReviewLesson_2.dialog.lines, 
    dialogLines: dialogLesson_1.dialog.lines
  })

  // cXonsole.log('dialogLesson_1.dialog.lines', dialogLesson_1.dialog.lines)
  // cXonsole.log('dialogReviewLesson_2.dialog.lines', dialogReviewLesson_2.dialog.lines)
  // cXonsole.log('dialogLinesResolved_3', dialogLinesResolved_3)
  
  const prose = dialogLinesResolved_3?.join(' ') ?? ''
  const dialogLessonUpdated_4 = {
    ...dialogReviewLesson_2,
    [MODULE_NAME.DIALOG]: {
      ...(dialogReviewLesson_2[MODULE_NAME.DIALOG as keyof Lesson] as Module),
      lines: dialogLinesResolved_3
    },
    prose
  }





  const originalLines = dialogLessonUpdated_4?.dialog?.lines ?? []

  // Step 1: Separate speaker and dialog fields
  const speakerFrom = originalLines.map(line => line.split('|')[1] ?? '')
  const dialogFrom = originalLines.map(line => line.split('|')[2] ?? '')

  let speakerTo: string[] = []
  let dialogTo: string[] = []

  try {
    speakerTo = await runTranslation({lines: speakerFrom, source: dialogLessonUpdated_4.targetLanguage, target: dialogLessonUpdated_4.sourceLanguage}) as string[]
    dialogTo = await runTranslation({lines: dialogFrom, source: dialogLessonUpdated_4.targetLanguage, target: dialogLessonUpdated_4.sourceLanguage}) as string[]
  } catch (err) {
    console.error('❌ Translation error', err)
  }

  // Step 2: Reconstruct full translated lines
  const translatedLines = originalLines.map((line, idx) => {
    const gender = line.split('|')[0] ?? 'x'
    const speaker = speakerTo[idx] ?? '???'
    const dialog = dialogTo[idx] ?? '???'
    return `${gender}|${speaker}|${dialog}`
  })

  const dialogLessonUpdated_4translation = {
    ...dialogLessonUpdated_4,
    translation: {
      ...dialogLessonUpdated_4.translation,
      [dialogLessonUpdated_4.targetLanguage]: originalLines,  // typically lesson.dialog.lines
      [dialogLessonUpdated_4.sourceLanguage]: translatedLines   // result from runTranslation
    }
  }

  
  // const dialogLinesOnly = dialogLessonUpdated_4.dialog.lines.map((line: string) => {
  //   const parts = line.split('|')
  //   return parts[2] // the third field: actual dialog text
  // })

  // cXonsole.log(dialogLinesOnly)





  debugLog('dialogLessonUpdated_4translation', dialogLessonUpdated_4translation)

  //
  // Nouns Only
  //
  const nounsOnlyLesson_a5 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.NOUNS_ONLY, lesson: dialogLessonUpdated_4translation})
  if (!nounsOnlyLesson_a5) return

  //
  // Nouns Only Review
  //
  const nounsOnlyReviewLesson_a6 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.NOUNS_ONLY_REVIEW, lesson: nounsOnlyLesson_a5})
  if (!nounsOnlyReviewLesson_a6) return

  //
  // Nouns Only Resolve
  //
  const { nounsOnlyLinesResolved: nounsOnlyLinesResolved_a7 } = resolveNounsOnly({
    nounsOnlyReviewLines: nounsOnlyReviewLesson_a6.nounsOnlyReview.lines, 
    nounsOnlyLines: nounsOnlyLesson_a5.nounsOnly.lines
  })

  const nounsOnlyLessonUpdated_a8 = {
    ...nounsOnlyReviewLesson_a6,
    [MODULE_NAME.NOUNS_ONLY]: {
      ...(nounsOnlyReviewLesson_a6[MODULE_NAME.NOUNS_ONLY as keyof Lesson] as Module),
      lines: nounsOnlyLinesResolved_a7
    }
  }




  const extractedNouns = nounsOnlyLessonUpdated_a8.nounsOnly.lines.map(n => n.trim().toLowerCase())

  const allowedNounForms = new Set<string>()
  scenarioData.nouns.forEach(noun => {
    allowedNounForms.add(noun.noun_singular.toLowerCase())
    allowedNounForms.add(noun.noun_plural.toLowerCase())
  })

  const unmatchedNouns = extractedNouns.filter(n => !allowedNounForms.has(n))

  const nounsOnlyMissingLessonUpdated_a8 = {
    ...nounsOnlyLessonUpdated_a8,
    [MODULE_NAME.NOUNS_ONLY_MISSING]: {
      ...(nounsOnlyLessonUpdated_a8[MODULE_NAME.NOUNS_ONLY_MISSING as keyof Lesson] as Module),
      lines: unmatchedNouns
    }
  }

  let nounsMissingLesson_b5: Lesson | null

  if (unmatchedNouns.length === 0) {
    nounsMissingLesson_b5 = nounsOnlyMissingLessonUpdated_a8
  } else {
    nounsMissingLesson_b5 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.NOUNS_MISSING, lesson: nounsOnlyMissingLessonUpdated_a8})
    }
  if (!nounsMissingLesson_b5) return

  //
  // Nouns Missing Review
  //
  const nounsMissingReviewLesson_b6 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.NOUNS_MISSING_REVIEW, lesson: nounsMissingLesson_b5})
  if (!nounsMissingReviewLesson_b6) return

  //
  // Nouns Missing Resolve
  //
  const { nounsMissingLinesResolved: nounsMissingLinesResolved_b7 } = resolveNounsMissing({
    nounsMissingReviewLines: nounsMissingReviewLesson_b6.nounsMissingReview.lines, 
    nounsMissingLines: nounsMissingLesson_b5.nounsMissing.lines
  })

  const nounsMissingLessonUpdated_b8 = {
    ...nounsMissingReviewLesson_b6,
    [MODULE_NAME.NOUNS_MISSING]: {
      ...(nounsMissingReviewLesson_b6[MODULE_NAME.NOUNS_MISSING as keyof Lesson] as Module),
      lines: nounsMissingLinesResolved_b7
    }
  }

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
  const verbsOnlyLesson_9 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.VERBS_ONLY, lesson: nounsMissingLessonUpdated_b8})
  if (!verbsOnlyLesson_9) return

  //
  // Verbs Review
  //
  const verbsOnlyReviewLesson_10 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.VERBS_ONLY_REVIEW, lesson: verbsOnlyLesson_9})
  if (!verbsOnlyReviewLesson_10) return

  const { verbsOnlyLinesResolved: verbsOnlyLinesResolved_11 } = resolveVerbsOnly({
    verbsOnlyReviewLines: verbsOnlyReviewLesson_10.verbsOnlyReview.lines, 
    verbsOnlyLines: verbsOnlyLesson_9.verbsOnly.lines
  })

  const verbsOnlyLessonUpdated_12 = {
    ...verbsOnlyReviewLesson_10,
    [MODULE_NAME.VERBS_ONLY]: {
      ...(verbsOnlyReviewLesson_10[MODULE_NAME.VERBS_ONLY as keyof Lesson] as Module),
      lines: verbsOnlyLinesResolved_11
    }
  }





  const extractedVerbs = verbsOnlyLessonUpdated_12.verbsOnly.lines.map(n => n.trim().toLowerCase())

  const allowedVerbForms = new Set<string>()
  scenarioData.verbs.forEach(verb => {
    allowedVerbForms.add(verb.verb_el_ella_usted.toLowerCase())
    allowedVerbForms.add(verb.verb_ellos_ellas_ustedes.toLowerCase())
    allowedVerbForms.add(verb.verb_infinitive.toLowerCase())
    allowedVerbForms.add(verb.verb_nosotros.toLowerCase())
    allowedVerbForms.add(verb.verb_tu.toLowerCase())
    allowedVerbForms.add(verb.verb_vosotros.toLowerCase())
    allowedVerbForms.add(verb.verb_yo.toLowerCase())
  })

  const unmatchedVerbs = extractedVerbs.filter(n => !allowedVerbForms.has(n))

  const verbsOnlyMissingLessonUpdated_b12 = {
    ...verbsOnlyLessonUpdated_12,
    [MODULE_NAME.VERBS_ONLY_MISSING]: {
      ...(verbsOnlyLessonUpdated_12[MODULE_NAME.VERBS_ONLY_MISSING as keyof Lesson] as Module),
      lines: unmatchedVerbs
    }
  }

  let verbsMissingLesson_b13: Lesson | null

  if (unmatchedVerbs.length === 0) {
    verbsMissingLesson_b13 = verbsOnlyMissingLessonUpdated_b12
  } else {
    verbsMissingLesson_b13 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.VERBS_MISSING, lesson: verbsOnlyMissingLessonUpdated_b12})
    }
  if (!verbsMissingLesson_b13) return

  //
  // Verbs Missing Review
  //
  const verbsMissingReviewLesson_b14 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.VERBS_MISSING_REVIEW, lesson: verbsMissingLesson_b13})
  if (!verbsMissingReviewLesson_b14) return

  //
  // Verbs Missing Resolve
  //
  const { verbsMissingLinesResolved: verbsMissingLinesResolved_b15 } = resolveVerbsMissing({
    verbsMissingReviewLines: verbsMissingReviewLesson_b14?.verbsMissingReview?.lines ?? [], 
    verbsMissingLines: verbsMissingLesson_b13?.verbsMissing?.lines ?? []
  })

  const verbsMissingLessonUpdated_b16 = {
    ...verbsMissingReviewLesson_b14,
    [MODULE_NAME.VERBS_MISSING]: {
      ...(verbsMissingReviewLesson_b14[MODULE_NAME.VERBS_MISSING as keyof Lesson] as Module),
      lines: verbsMissingLinesResolved_b15
    }
  }


  try {
    await pushMissingToDB(verbsMissingLessonUpdated_b16)
    debugLog('✅ Successfully inserted missing nouns and verbs into the database.')
  } catch (err) {
    console.error('❌ Error inserting missing nouns/verbs into DB:', (err as Error).message)
  }




  //
  // Verbs Expanded and Verbs Expanded In-Complete (Sentences)
  //
  // const verbsLists_13 = generateVerbLists(verbsLessonUpdated_12)
  const verbsLists_13 = generateVerbLists(verbsMissingLessonUpdated_b16)
  
  const verbsExpandedLesson_15 = {
    ...verbsMissingLessonUpdated_b16,

    [MODULE_NAME.VERBS_EXPANDED_INCOMPLETE]: {
      ...(verbsMissingLessonUpdated_b16[MODULE_NAME.VERBS_EXPANDED_INCOMPLETE as keyof Lesson] as Module),
      lines: verbsLists_13.incomplete
    }
  }

  const verbsExpandedCompleteLesson_16 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.VERBS_EXPANDED_COMPLETE, lesson: verbsExpandedLesson_15})
  if (!verbsExpandedCompleteLesson_16) return

  //
  // Verbs Expanded Triple
  //
  const verbsLists_17 = generateVerbLists(verbsExpandedCompleteLesson_16)

  const verbsExpandedTripleLesson_18 = {
    ...verbsExpandedCompleteLesson_16,

    [MODULE_NAME.VERBS_EXPANDED_TRIPLE]: {
      ...(verbsExpandedCompleteLesson_16[MODULE_NAME.VERBS_EXPANDED_TRIPLE as keyof Lesson] as Module),
      lines: verbsLists_17.triple
    }
  }


  setLessons((prev) => {
    debugLog('🔄 Updating lesson list...');
    debugLog('▶️ verbsExpandedTripleLesson_18:', verbsExpandedTripleLesson_18);
    const next = prev.map((lsn) => {
      if (lsn.id === selectedLessonId) {
        debugLog(`✅ Match found: lesson.id = ${lsn.id}`);
        const updated = { ...verbsExpandedTripleLesson_18, id: lsn.id, name: lsn.name };
        debugLog('🆕 Updated lesson:', updated);
        return updated;
      }
      return lsn;
    });
    debugLog('📦 New lessons array:', next);
    return next;
  });

  setLessonComplete(true);
};
