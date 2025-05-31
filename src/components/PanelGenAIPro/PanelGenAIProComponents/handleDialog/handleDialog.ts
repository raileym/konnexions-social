import type { HandleDialogProps } from "../../../../../shared/types"
import getModule from "../getModule/getModule"
export const handleDialog = async ({
  testMode,
  lesson,
  setLesson,
  moduleName
}: HandleDialogProps) => {

  if (testMode) {
    console.log(`lesson: ${JSON.stringify(lesson, null, 2)}`)
  }

  const response = await getModule({testMode, lesson, moduleName })

  if (response === null) {
    console.log('Houston, we DO have a problems')
    return
  }

  if (!response.success) {
    console.log('Houston, we have SOME problems')
    console.log(response.errors)
  }

  setLesson(prev => {
    const updated = {
      ...prev,

      // language: lesson.language,
      // scenarioLabel: lesson.scenarioLabel,
      // participantList: lesson.participantList,

      [moduleName]: {
        ...response
      }
    }
    return updated
  })
}

export default handleDialog