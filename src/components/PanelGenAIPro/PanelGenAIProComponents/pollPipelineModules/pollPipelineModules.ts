import type { Lesson, PollPipelineModulesProps } from '@cknTypes/types'
import { pollModuleByLessonAndName } from '@PanelGenAIProComponents/pollModuleByLessonAndName/pollModuleByLessonAndName'

export const pollPipelineModules = async ({lesson, pipelineConfig}: PollPipelineModulesProps): Promise<Lesson | null> => {
  const updatedLesson = { ...lesson }

  // Poll for draft module
  const draftModule = await pollModuleByLessonAndName({lessonId: lesson.id, moduleName: pipelineConfig.draftModule})
  if (!draftModule) throw new Error(`Timeout waiting for draft module: ${pipelineConfig.draftModule}`)
  updatedLesson[pipelineConfig.draftModule] = draftModule

  // Poll for review module
  const reviewModule = await pollModuleByLessonAndName({lessonId: lesson.id, moduleName: pipelineConfig.reviewModule})
  if (!reviewModule) throw new Error(`Timeout waiting for review module: ${pipelineConfig.reviewModule}`)
  updatedLesson[pipelineConfig.reviewModule] = reviewModule

  // Poll for resolve module
  const resolveModule = await pollModuleByLessonAndName({lessonId: lesson.id, moduleName: pipelineConfig.resolveModule})
  if (!resolveModule) throw new Error(`Timeout waiting for resolve module: ${pipelineConfig.resolveModule}`)
  updatedLesson[pipelineConfig.resolveModule] = resolveModule

  return updatedLesson
}
