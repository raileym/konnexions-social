type RunModuleProps = {
  scenarioData: ScenarioData
  testMode: TestMode
  moduleName: ModuleName
  lesson: Lesson
}

export const runModule = async ({scenarioData, testMode, moduleName, lesson}: RunModuleProps): Promise<Lesson | null> => {
  const result = await handleModule({ scenarioData, lesson, moduleName, testMode })
  if (!result) return null
  console.log(`runModule (${moduleName})`)
  return {
    ...lesson,
    [moduleName]: result      
  }
}

