// shared/runPipelineCb.ts

import type {
  Lesson,
  // Module,
  // ScenarioData,
  RunPipelineCbProps,
  // ResolveFunction
} from '@cknTypes/types'

import { getModule_cb } from '@shared/getModule_cb/getModule_cb'
// import { resolveNouns } from '@shared/resolveNouns_cb/resolveNouns_cb'
// import { resolveVerbs } from '@shared/resolveVerbs_cb/resolveVerbs_cb'

export const runPipelineCb = async ({
  lesson,
  scenarioData,
  pipelineConfig
}: RunPipelineCbProps): Promise<Lesson | null> => {
  // DO
  const moduleDone = await getModule_cb({
    scenarioData,
    testMode: false,
    moduleName: pipelineConfig.doModule,
    lesson
  })
  if (!moduleDone) return null

  const lessonDone = {
    ...lesson,
    [pipelineConfig.doModule]: moduleDone
  }

  console.log('moduleDone', JSON.stringify(moduleDone, null, 2))

  // REVIEW
  const moduleReviewed = await getModule_cb({
    lesson: lessonDone,
    moduleName: pipelineConfig.reviewModule,
    testMode: false,
    scenarioData,
  })
  if (!moduleReviewed) return null

  const lessonReviewed = {
    ...lessonDone,
    [pipelineConfig.reviewModule]: moduleReviewed
  }

  // RESOLVE
  const { linesResolved, linesResolutions } = pipelineConfig.resolve({
    reviewLines: lessonReviewed[pipelineConfig.reviewModule].lines,
    lines: lessonReviewed[pipelineConfig.doModule].lines
  })

  const lessonResolved = {
    ...lessonReviewed,
    [pipelineConfig.resolveModule]: {
      ...lessonReviewed[pipelineConfig.resolveModule],
      lines: linesResolved,
      linesResolutions: linesResolutions
    }
  }

  return lessonResolved

  // // RESTATE
  // return {
  //   ...lessonReviewed,
  //   [pipelineConfig.resolveModule]: {
  //     ...lessonReviewed[pipelineConfig.resolveModule],
  //     lines: resolved.linesResolved
  //   },
  //   [pipelineConfig.reviewModule]: lessonReviewed,
  //   [pipelineConfig.resolveModule]: {
  //     ...lessonReviewed,
  //     lines: resolved.linesResolved
  //   }
  // }
}
