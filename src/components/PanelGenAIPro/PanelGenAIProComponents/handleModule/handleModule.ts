import type { HandleDialogProps } from "../../../../../shared/types"
import getModule from "../getModule/getModule"

export const handleModule = async ({
  lesson,
  moduleName,
  setLesson,
  testMode
}: HandleDialogProps) => {

  if (testMode) {
    console.log(`lesson: ${JSON.stringify(lesson, null, 2)}`)
    console.log(`moduleName: ${moduleName}`)
  }

  const response = await getModule({testMode, lesson, moduleName })

  if (response === null) {
    console.log('Houston, we DO have a problems')
    return
  }

  if (!response. .lesson.dialogSuccess) {
    console.log('Houston, we have SOME problems')
    console.log(response.lesson.dialogErrors)
  }

  setLesson(prev => {
    const updated = {
      ...prev,

      language: lesson.language,
      scenarioLabel: lesson.scenarioLabel,
      participantList: lesson.participantList,

      ...response.lesson
    }
    return updated
  })
}

export default handleModule