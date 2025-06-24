// shared/runPipelineCb.ts

import type {
  Lesson,
  // Module,
  // ScenarioData,
  RunPipelineCbProps,
  // ResolveFunction
} from '@cknTypes/types'

import { getModuleCb } from '@shared/getModule_cb/getModule_cb'
// import { resolveNouns } from '@shared/resolveNouns_cb/resolveNouns_cb'
// import { resolveVerbs } from '@shared/resolveVerbs_cb/resolveVerbs_cb'

export const runPipelineCb = async ({
  lesson,
  pipelineConfig
}: RunPipelineCbProps): Promise<Lesson | null> => {
  // DO
  const lessonDone = await getModuleCb({
    lesson,
    moduleName: pipelineConfig.doModule,
    testMode: false
  })
  if (!lessonDone) return null

  // REVIEW
  const lessonReviewed = await getModuleCb({
    lesson: {
      ...lesson,
      [pipelineConfig.doModule]: lessonDone
    },
    moduleName: pipelineConfig.reviewModule,
    testMode: false
  })
  if (!lessonReviewed) return null

  // RESOLVE
  const resolved = pipelineConfig.resolve({
    reviewLines: lessonReviewed.lines,
    lines: lessonDone.lines
  })

  // RESTATE
  return {
    ...lesson,
    [pipelineConfig.doModule]: {
      ...lessonDone,
      lines: resolved.linesResolved
    },
    [pipelineConfig.reviewModule]: lessonReviewed,
    [pipelineConfig.resolveModule]: {
      ...lessonReviewed,
      lines: resolved.linesResolved
    }
  }
}
