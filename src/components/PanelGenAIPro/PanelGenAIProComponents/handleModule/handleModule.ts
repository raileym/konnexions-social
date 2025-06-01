import type { HandleModuleProps, Lesson, Module } from "../../../../../shared/types"
import getModule from "../getModule/getModule"

export const handleModule = async ({
  lesson,
  moduleName,
  testMode
}: HandleModuleProps): Promise<Module | null> => {

  if (testMode) {
    console.log(`"${moduleName}": ${JSON.stringify(lesson[moduleName as keyof Lesson], null, 2)}`)
  }

  const module = await getModule({testMode, lesson, moduleName })

  if (module === null) {
    console.log('Houston, we DO have a problems')
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