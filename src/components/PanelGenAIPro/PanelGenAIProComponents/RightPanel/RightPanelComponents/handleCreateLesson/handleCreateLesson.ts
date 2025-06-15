import type {
  Language,
  Scenario,
  Lesson,
  SetLessonComplete,
  SetLessons,
  SelectedLessonId
} from "../../../../../../../shared/types";
import { getScenarioDetails } from "../../../../../Util";

export type HandleCreateLessonProps = {
  scenario: Scenario
  language: Language
  lesson: Lesson
  setLessonComplete: SetLessonComplete
  setLessons: SetLessons
  selectedLessonId: SelectedLessonId
}

export const handleCreateLesson = async ({
  scenario,
  language,
  lesson,
  setLessons,
  setLessonComplete,
  selectedLessonId
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
  // const dialogLesson_1 = await runModule({moduleName: MODULE_NAME.DIALOG, lesson: initialLesson_0})
  // if (!dialogLesson_1) return

  //
  // Dialog Review
  //
  // const dialogReviewLesson_2 = await runModule({moduleName: MODULE_NAME.DIALOG_REVIEW, lesson: dialogLesson_1})
  // if (!dialogReviewLesson_2) return
  
  //
  // Dialog Resolve
  //
  // const { dialogLinesResolved: dialogLinesResolved_3 } = resolveDialog({
  //   dialogReviewLines: dialogReviewLesson_2.dialog.lines, 
  //   dialogLines: dialogLesson_1.dialog.lines
  // })
  
  // const prose = dialogLinesResolved_3?.join(' ') ?? ''
  // const dialogLessonUpdated_4 = {
  //   ...dialogReviewLesson_2,
  //   [MODULE_NAME.DIALOG]: {
  //     ...(dialogReviewLesson_2[MODULE_NAME.DIALOG as keyof Lesson] as Module),
  //     lines: dialogLinesResolved_3
  //   },
  //   prose
  // }
  
  //
  // Nouns Only
  //
  // const nounsOnlyLesson_a5 = await runModule({moduleName: MODULE_NAME.NOUNS_ONLY, lesson: dialogLessonUpdated_4})
  // if (!nounsOnlyLesson_a5) return
  // console.log('nounsOnlyLesson_a5', nounsOnlyLesson_a5.nounsOnly.lines)

  //
  // Nouns Only Review
  //
  // const nounsOnlyReviewLesson_a6 = await runModule({moduleName: MODULE_NAME.NOUNS_ONLY_REVIEW, lesson: nounsOnlyLesson_a5})
  // if (!nounsOnlyReviewLesson_a6) return
  // console.log('nounsOnlyReviewLesson_a6', nounsOnlyReviewLesson_a6.nounsOnly.lines)

  //
  // Nouns Resolve
  //
  // const { nounsOnlyLinesResolved: nounsOnlyLinesResolved_a7 } = resolveNounsOnly({
  //   nounsOnlyReviewLines: nounsOnlyReviewLesson_a6.nounsOnlyReview.lines, 
  //   nounsOnlyLines: nounsOnlyLesson_a5.nounsOnly.lines
  // })
  // console.log('nounsOnlyLinesResolved_a7', nounsOnlyLinesResolved_a7)

  // const nounsLessonUpdated_a8 = {
  //   ...nounsOnlyReviewLesson_a6,
  //   [MODULE_NAME.NOUNS_ONLY]: {
  //     ...(nounsOnlyReviewLesson_a6[MODULE_NAME.NOUNS_ONLY as keyof Lesson] as Module),
  //     lines: nounsOnlyLinesResolved_a7
  //   }
  // }

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
  // const verbsLesson_9 = await runModule({moduleName: MODULE_NAME.VERBS, lesson: nounsLessonUpdated_8})
  // if (!verbsLesson_9) return

  //
  // Verbs Review
  //
  // const verbsReviewLesson_10 = await runModule({moduleName: MODULE_NAME.VERBS_REVIEW, lesson: verbsLesson_9})
  // if (!verbsReviewLesson_10) return

  // const { verbsLinesResolved: verbsLinesResolved_11 } = resolveVerbs({
  //   verbsReviewLines: verbsReviewLesson_10.verbs.lines, 
  //   verbsLines: verbsLesson_9.verbs.lines
  // })

  // const verbsLessonUpdated_12 = {
  //   ...verbsReviewLesson_10,
  //   [MODULE_NAME.VERBS]: {
  //     ...(verbsReviewLesson_10[MODULE_NAME.VERBS as keyof Lesson] as Module),
  //     lines: verbsLinesResolved_11
  //   }
  // }

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
    console.log('▶️ initialLesson_0:', initialLesson_0);
    const next = prev.map((lsn) => {
      if (lsn.id === selectedLessonId) {
        console.log(`✅ Match found: lesson.id = ${lsn.id}`);
        const updated = { ...initialLesson_0, id: lsn.id, name: lsn.name };
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
