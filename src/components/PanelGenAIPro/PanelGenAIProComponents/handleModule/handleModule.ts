import type { HandleModuleProps, Lesson } from "../../../../../shared/types"
import getModule from "../getModule/getModule"

export const handleModule = async ({
  lesson,
  moduleName,
  setLesson,
  testMode
}: HandleModuleProps) => {

  if (testMode) {
    console.log(`"${moduleName}": ${JSON.stringify(lesson[moduleName as keyof Lesson], null, 2)}`)
    return
  }

  const module = await getModule({testMode, lesson, moduleName })

  if (module === null) {
    console.log('Houston, we DO have a problems')
    return
  }

  if (!module.success) {
    console.log('Houston, we have SOME problems')
    console.log(module)
  }

  // setLesson(prev => {
  //   const updatedLesson = {
  //     ...prev,

  //     [moduleName]: {
  //       ...module
  //     }
  //   }

  setLesson(() => {
    const updatedLesson = {
      ...lesson, // use the fresher `lesson` passed into handleModule
      [moduleName]: {
        ...module
      }
    }

    console.log(`Handle ${moduleName} (participantList): ${updatedLesson.participantList}`)
    console.log(`Handle ${moduleName} (scenarioLabel): ${updatedLesson.scenarioLabel}`)
    console.log(`Handle ${moduleName} (language): ${updatedLesson.language}`)

    return updatedLesson
  })
}

export default handleModule