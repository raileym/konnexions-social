import {
  type HandleCreateLessonProps,
  type Lesson,
  type Module
} from '@cknTypes/types';
import {
  MODULE_NAME
} from '@cknTypes/constants'
import { getScenarioDetails } from '@components/Util';
import { resolveDialog } from '@PanelGenAIProComponents/resolveDialog/resolveDialog'
import { runModule } from '@PanelGenAIProComponents/runModule/runModule';
import { resolveNounsOnly } from '../resolveNounsOnly/resolveNounsOnly';
import { resolveVerbsOnly } from '../resolveVerbsOnly/resolveVerbsOnly';

export const handleCreateLesson = async ({
  scenarioData,
  scenario,
  language,
  lesson,
  setLessons,
  setLessonComplete,
  selectedLessonId,
  testMode
}: HandleCreateLessonProps) => {
  const { participantList } = getScenarioDetails({ scenario, language });

  const initialLesson_0 = {
    ...lesson,
    language,
    scenario,
    participantList,
  };

  //
  // Dialog
  //
  const dialogLesson_1 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.DIALOG, lesson: initialLesson_0})
  if (!dialogLesson_1) return

  // console.log('dialogLesson_1', dialogLesson_1)
  
  //
  // Dialog Review
  //
  const dialogReviewLesson_2 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.DIALOG_REVIEW, lesson: dialogLesson_1})
  if (!dialogReviewLesson_2) return

  // console.log('dialogReviewLesson', dialogReviewLesson_2)
  
  //
  // Dialog Resolve
  //
  const { dialogLinesResolved: dialogLinesResolved_3 } = resolveDialog({
    dialogReviewLines: dialogReviewLesson_2.dialog.lines, 
    dialogLines: dialogLesson_1.dialog.lines
  })

  // console.log('dialogLesson_1.dialog.lines', dialogLesson_1.dialog.lines)
  // console.log('dialogReviewLesson_2.dialog.lines', dialogReviewLesson_2.dialog.lines)
  // console.log('dialogLinesResolved_3', dialogLinesResolved_3)
  
  const prose = dialogLinesResolved_3?.join(' ') ?? ''
  const dialogLessonUpdated_4 = {
    ...dialogReviewLesson_2,
    [MODULE_NAME.DIALOG]: {
      ...(dialogReviewLesson_2[MODULE_NAME.DIALOG as keyof Lesson] as Module),
      lines: dialogLinesResolved_3
    },
    prose
  }
  
  //
  // Nouns Only
  //
  const nounsOnlyLesson_a5 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.NOUNS_ONLY, lesson: dialogLessonUpdated_4})
  if (!nounsOnlyLesson_a5) return
  // console.log('nounsOnlyLesson_a5', nounsOnlyLesson_a5.nounsOnly.lines)

  //
  // Nouns Only Review
  //
  const nounsOnlyReviewLesson_a6 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.NOUNS_ONLY_REVIEW, lesson: nounsOnlyLesson_a5})
  if (!nounsOnlyReviewLesson_a6) return
  // console.log('nounsOnlyReviewLesson_a6', nounsOnlyReviewLesson_a6.nounsOnly.lines)

  //
  // Nouns Resolve
  //
  const { nounsOnlyLinesResolved: nounsOnlyLinesResolved_a7 } = resolveNounsOnly({
    nounsOnlyReviewLines: nounsOnlyReviewLesson_a6.nounsOnlyReview.lines, 
    nounsOnlyLines: nounsOnlyLesson_a5.nounsOnly.lines
  })
  // console.log('nounsOnlyLinesResolved_a7', nounsOnlyLinesResolved_a7)

  const nounsLessonUpdated_a8 = {
    ...nounsOnlyReviewLesson_a6,
    [MODULE_NAME.NOUNS_ONLY]: {
      ...(nounsOnlyReviewLesson_a6[MODULE_NAME.NOUNS_ONLY as keyof Lesson] as Module),
      lines: nounsOnlyLinesResolved_a7
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
  const verbsOnlyLesson_9 = await runModule({scenarioData, testMode, moduleName: MODULE_NAME.VERBS_ONLY, lesson: nounsLessonUpdated_a8})
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

  setLessons((prev) => {
    console.log('🔄 Updating lesson list...');
    console.log('▶️ verbsOnlyLessonUpdated_12:', verbsOnlyLessonUpdated_12);
    const next = prev.map((lsn) => {
      if (lsn.id === selectedLessonId) {
        console.log(`✅ Match found: lesson.id = ${lsn.id}`);
        const updated = { ...verbsOnlyLessonUpdated_12, id: lsn.id, name: lsn.name };
        console.log('🆕 Updated lesson:', updated);
        return updated;
      }
      return lsn;
    });
    console.log('📦 New lessons array:', next);
    return next;
  });

  setLessonComplete(true);
};
