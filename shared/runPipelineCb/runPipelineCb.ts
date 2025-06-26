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

  console.log('runPipelineCb: pipelineConfig', pipelineConfig)
  console.log('runPipelineCb: incoming lesson', lesson)

  // DRAFT
  const moduleDraft = await getModule_cb({
    scenarioData,
    testMode: false,
    moduleName: pipelineConfig.draftModule,
    lesson
  })
  if (!moduleDraft) return null

  const lessonDraft = {
    ...lesson,
    [pipelineConfig.draftModule]: moduleDraft
  }

  console.log(`${pipelineConfig.pipelineType}: moduleDraft`, JSON.stringify(moduleDraft, null, 2))

  // REVIEW
  const moduleReviewed = await getModule_cb({
    lesson: lessonDraft,
    moduleName: pipelineConfig.reviewModule,
    testMode: false,
    scenarioData,
  })
  if (!moduleReviewed) return null

  console.log(`${pipelineConfig.pipelineType}: moduleReview`, JSON.stringify(moduleReviewed, null, 2))

  const lessonReviewed = {
    ...lessonDraft,
    [pipelineConfig.reviewModule]: moduleReviewed
  }

  // RESOLVE
  const { linesResolved, linesResolutions } = pipelineConfig.resolve({
    reviewLines: lessonReviewed[pipelineConfig.reviewModule].lines,
    draftLines: lessonReviewed[pipelineConfig.draftModule].lines
  })

  console.log(`${pipelineConfig.pipelineType}: linesResolved`, JSON.stringify(linesResolved, null, 2))
  console.log(`${pipelineConfig.pipelineType}: linesResolutions`, JSON.stringify(linesResolutions, null, 2))

  const lessonResolved = {
    ...lessonReviewed,
    [pipelineConfig.resolveModule]: {
      ...lessonReviewed[pipelineConfig.resolveModule],
      lines: linesResolved,
      linesResolutions: linesResolutions
    }
  }

  return lessonResolved
}
