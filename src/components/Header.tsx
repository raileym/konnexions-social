import React, { useEffect } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { SCENARIO } from '@cknTypes/constants'
import { LANGUAGE_TITLE } from '@cknTypes/constants'
import { scenarioDescriptions } from '@cknTypes/types'

const Header: React.FC = () => {
  const {
    targetLanguage,
    scenario,
    customScenario,
    customParticipantList,
    setLessonPrompt,
    lessonPromptStyle
  } = useAppContext()

  const isCustom = scenario === SCENARIO.CUSTOM

  const scenarioLabel = isCustom
    ? customScenario?.trim()
      ? customScenario
      : 'a custom situation (to be described)'
    : scenarioDescriptions[scenario]

  const participantLabel = isCustom
    ? customParticipantList?.trim()
      ? ` This ${lessonPromptStyle} involves ${customParticipantList}.`
      : ` This ${lessonPromptStyle} involves participants to be described above.`
    : ''

  const prompt = `Create a(an) ${lessonPromptStyle} in ${LANGUAGE_TITLE[targetLanguage]} ${scenarioLabel}.${participantLabel}`

  useEffect(() => {
    setLessonPrompt(prompt)
  }, [prompt, setLessonPrompt])

  return (
    <div className="ba w-100 flex justify-center pt3X pb3">
      <div className="f3 pv3 pt0 mt0 w-80">
        <div className="f2 b mv3 tc">Lesson Prompt</div>
        <div className="f3">{prompt}</div>
      </div>
    </div>
  )
}

export default Header
