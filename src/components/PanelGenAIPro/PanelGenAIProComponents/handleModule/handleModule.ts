// import type { HandleModuleProps, Lesson, Module } from "../../../../../shared/cknTypes/types/types"
import type { HandleModuleProps, Module } from "../../../../../shared/cknTypes/types/types"
import getModule from "../getModule/getModule"

export const handleModule = async ({
  scenarioData,
  lesson,
  moduleName,
  testMode
}: HandleModuleProps): Promise<Module | null> => {

  if (testMode) {
    // console.log(`"${moduleName}": ${JSON.stringify(lesson[moduleName as keyof Lesson], null, 2)}`)
  }

  const module = await getModule({scenarioData, testMode, lesson, moduleName })

  if (module === null) {
    console.log(`Houston, we DO have a problems on ${moduleName}`)
    return null
  }

  if (!module.success) {
    console.log('Houston, we have SOME problems')
    console.log(module)
    return null
  }

  return module
}

export default handleModule