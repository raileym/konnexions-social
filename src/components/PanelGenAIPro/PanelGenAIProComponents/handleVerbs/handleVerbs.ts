import type {
  HandleVerbsProps
} from "../../../../../shared/types"
import getVerbs from "../getVerbs/getVerbs"

export const handleVerbs = async ({
  testMode,
  lesson,
  setLesson
}: HandleVerbsProps) => {
  console.log(prompt)

  if ( testMode ) {
    console.log(`lesson: ${JSON.stringify(lesson, null, 2)}`)
  }

  const response = await getVerbs({testMode, lesson})

  if (response === null) {
    console.log('Houston, we DO have a problems')
    return
  }

  if (!response.verbsResult.success) {
    console.log('Houston, we have SOME problems')
    console.log(response.verbsResult.errors)
  }

  setLesson(prev => {
    const updated = {
      ...prev,

      verbsArray: response.verbsResult.parsed,
      verbsErrors: response.verbsResult.errors ?? [],
      verbsPrompt: response.verbsPrompt,
      verbsSignature: response.verbsSignature
    }
    return updated
  })
}

export default handleVerbs
