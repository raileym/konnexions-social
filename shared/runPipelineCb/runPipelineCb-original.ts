import { createClient } from '@supabase/supabase-js'
import type {
  Lesson,
  RunPipelineCbProps
} from '../cknTypes/types.js'
import getModule_cb from '../getModule_cb/getModule_cb.js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const runPipelineCb = async ({
  lesson,
  pipelineConfig
}: RunPipelineCbProps): Promise<Lesson | null> => {

  // *************************************************************************************
  // DRAFT
  // *************************************************************************************

  const draftStart = performance.now()
  const moduleDraft = await getModule_cb({
    testMode: false,
    moduleName: pipelineConfig.draftModule,
    lesson
  })
  if (!moduleDraft) return null
  const draftDuration = performance.now() - draftStart

  // Include duration in module content
  const draftContentWithDuration = {
    ...moduleDraft,
    moduleDurationMs: draftDuration
  }

  const { error: draftError } = await supabase.rpc('ckn_upsert_module', {
    arg_lesson_id: lesson.id,
    arg_module_name: pipelineConfig.draftModule,
    arg_module_content: draftContentWithDuration
  })
  if (draftError) {
    console.error('Failed to upsert draft module:', draftError)
    return null
  }

  const lessonDraft = {
    ...lesson,
    [pipelineConfig.draftModule]: draftContentWithDuration
  }

  // *************************************************************************************
  // REVIEW
  // *************************************************************************************
  
  const reviewStart = performance.now()
  const moduleReviewed = await getModule_cb({
    lesson: lessonDraft,
    moduleName: pipelineConfig.reviewModule,
    testMode: false
  })
  if (!moduleReviewed) return null
  const reviewDuration = performance.now() - reviewStart

  const reviewContentWithDuration = {
    ...moduleReviewed,
    moduleDurationMs: reviewDuration
  }

  const { error: reviewError } = await supabase.rpc('ckn_upsert_module', {
    arg_lesson_id: lesson.id,
    arg_module_name: pipelineConfig.reviewModule,
    arg_module_content: reviewContentWithDuration
  })
  if (reviewError) {
    console.error('Failed to upsert review module:', reviewError)
    return null
  }

  const lessonReviewed = {
    ...lessonDraft,
    [pipelineConfig.reviewModule]: reviewContentWithDuration
  }

  // *************************************************************************************
  // RESOLVE
  // *************************************************************************************
  
  const resolveStart = performance.now()
  const { linesResolved, linesResolutions } = pipelineConfig.resolve({
    reviewLines: lessonReviewed[pipelineConfig.reviewModule].lines,
    draftLines: lessonReviewed[pipelineConfig.draftModule].lines
  })
  const resolveDuration = performance.now() - resolveStart

  const resolvedModule = {
    ...lessonReviewed[pipelineConfig.resolveModule],
    lines: linesResolved,
    linesResolutions: linesResolutions,
    moduleDurationMs: resolveDuration
  }

  const { error: resolveError } = await supabase.rpc('ckn_upsert_module', {
    arg_lesson_id: lesson.id,
    arg_module_name: pipelineConfig.resolveModule,
    arg_module_content: resolvedModule
  })
  if (resolveError) {
    console.error('Failed to upsert resolve module:', resolveError)
    return null
  }

  const lessonResolved = {
    ...lessonReviewed,
    [pipelineConfig.resolveModule]: resolvedModule
  }

  return lessonResolved
}
