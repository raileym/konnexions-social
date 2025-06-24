import type { Lesson, Module, RunPipelineProps } from '@cknTypes/types'
import { runModule } from '@PanelGenAIProComponents/runModule/runModule';

export const runPipeline = async ({
  lesson,
  scenarioData,
  testMode,
  doModule,
  reviewModule,
  resolveModule,
  resolve
}: RunPipelineProps): Promise<Lesson | null> => {
  // DO
  const lessonDone = await runModule({
    scenarioData,
    testMode,
    moduleName: doModule,
    lesson
  })
  if (!lessonDone) return null

  // REVIEW
  const lessonReviewed = await runModule({
    scenarioData,
    testMode,
    moduleName: reviewModule,
    lesson: lessonDone
  })
  if (!lessonReviewed) return null

  // RESOLVE
  const { linesResolved } = resolve({
    reviewLines: lessonReviewed[reviewModule].lines,
    lines: lessonDone[doModule].lines
  })

  // RESTATE
  // const prose = linesResolved?.join(' ') ?? ''
  return {
    ...lessonReviewed,
    [resolveModule]: {
      ...(lessonReviewed[resolveModule as keyof Lesson] as Module),
      lines: linesResolved
    } //,
    // prose
  }
}
