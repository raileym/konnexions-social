import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { SCENARIO } from '@cknTypes/constants'
import { LANGUAGE_TITLE } from '@cknTypes/constants'
import { scenarioDescriptions } from '@cknTypes/types'

const Header: React.FC = () => {
  const {
    contentStyle,
    targetLanguage,
    scenario,
    customScenario,
    customParticipants
  } = useAppContext()

  const isCustom = scenario === SCENARIO.CUSTOM

  const scenarioLabel = isCustom
    ? customScenario?.trim()
      ? customScenario
      : 'a custom situation (to be described)'
    : scenarioDescriptions[scenario]

  const participantLabel = isCustom
    ? customParticipants?.trim()
      ? ` This ${contentStyle} involves ${customParticipants}.`
      : ` This ${contentStyle} involves participants to be described above.`
    : ''

  return (
    <div className="ba w-100 flex justify-center pt3X pb3">
      <div className="f3 pv3 pt0 mt0 w-80">
        <div className="f2 b mv3 tc">Lesson Prompt</div>
        <div className="f3">
          Create a <b>{contentStyle}</b> in <b>{LANGUAGE_TITLE[targetLanguage]}</b>{' '}
          {scenarioLabel}.{participantLabel}
        </div>
      </div>
    </div>
  )
}

export default Header
