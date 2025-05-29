import type { HandleNounsProps } from "../../../../../shared/types"
import getNouns from "../getNouns/getNouns"

export const handleNouns = async ({
  testMode,
  lesson,
  setLesson
}: HandleNounsProps) => {
  
  if (testMode) {
      console.log(`lesson: ${JSON.stringify(lesson, null, 2)}`)
  }

  const response = await getNouns({testMode, lesson})

  if (response === null) {
    console.log('Houston, we DO have a problems')
    return
  }

  if (!response.lesson.nounsSuccess) {
    console.log('Houston, we have SOME problems')
    console.log(response.lesson.nounsErrors)
  }

  setLesson(prev => {
    const updated = {
      ...prev,
      ...lesson
    }
    return updated
  })
}

export default handleNouns
