import type {
  HandleVerbsProps
} from "@cknTypes/types"
import getVerbs from "../getVerbs/getVerbs"

export const handleVerbs = async ({
  testMode,
  lesson,
  setLesson
}: HandleVerbsProps) => {
  // cXnsole.log(prompt)

  if ( testMode ) {
    // cXnsole.log(`lesson: ${JSON.stringify(lesson, null, 2)}`)
  }

  const response = await getVerbs({testMode, lesson})

  if (response === null) {
    // cXnsole.log('Houston, we DO have a problems')
    return
  }

  if (!response.verbsResult.success) {
    // cXnsole.log('Houston, we have SOME problems')
    // cXnsole.log(response.verbsResult.errors)
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
