import type { HandleDialogProps } from "../../../../../shared/types"
import getDialog from "../getDialog/getDialog"

export const handleDialog = async ({
  testMode,
  lesson,
  setLesson
}: HandleDialogProps) => {

  if (testMode) {
    console.log(`lesson: ${JSON.stringify(lesson, null, 2)}`)
  }

  const response = await getDialog({testMode, lesson})

  if (response === null) {
    console.log('Houston, we DO have a problems')
    return
  }

  if (!response.lesson.dialogSuccess) {
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

export default handleDialog