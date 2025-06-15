import type { HandleDialogProps } from "../../../../../shared/cknTypes/types/types"
import getModule from "../getModule/getModule"
export const handleDialog = async ({
  testMode,
  lesson,
  setLesson,
  moduleName
}: HandleDialogProps) => {

  if (testMode) {
    // cXnsole.log(`lesson: ${JSON.stringify(lesson, null, 2)}`)
  }

  const response = await getModule({testMode, lesson, moduleName })

  if (response === null) {
    // cXnsole.log('Houston, we DO have a problems')
    return
  }

  if (!response.success) {
    // cXnsole.log('Houston, we have SOME problems')
    // cXnsole.log(response.errors)
  }

  setLesson(prev => {
    const updated = {
      ...prev,

      [moduleName]: {
        ...response
      }
    }
    return updated
  })
}

export default handleDialog