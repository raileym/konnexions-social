import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { SCENARIO, SCREEN } from '@cknTypes/constants'

const SelectorParticipantRole: React.FC = () => {
  const {
    useMyself,
    setUseMyself,
    lessonPromptStyle,
    scenario,
    screenState
  } = useAppContext()

  const isDisabled = scenario === SCENARIO.CUSTOM
  const labelClass = isDisabled ? 'o-50' : '' // o-50 = 50% opacity in Tachyons

  return (
    <div className="mb3">
      <label className="db mb2 f5 b">My role</label>
      <div className={`flex flex-column mh3 ${labelClass}`}>
        <label className="mb1 flex items-center">
          <input
            tabIndex={screenState[SCREEN.CREATE] ? 0 : -1}
            aria-hidden={!screenState[SCREEN.CREATE]}
            type="radio"
            name="participant-role"
            value="yes"
            checked={useMyself}
            onChange={() => setUseMyself(true)}
            className="mr2"
            disabled={isDisabled}
          />
          in the {lessonPromptStyle}
        </label>
        <label className="mb1 flex items-center">
          <input
            tabIndex={screenState[SCREEN.CREATE] ? 0 : -1}
            aria-hidden={!screenState[SCREEN.CREATE]}
            type="radio"
            name="participant-role"
            value="no"
            checked={!useMyself}
            onChange={() => setUseMyself(false)}
            className="mr2"
            disabled={isDisabled}
          />
          NOT in the {lessonPromptStyle}
        </label>
      </div>
    </div>
  )
}

export default SelectorParticipantRole
