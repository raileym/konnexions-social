import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL, SCENARIO } from '@cknTypes/constants'
import { usePanelBase } from '@hooks/usePanelBase'

const SelectorParticipantRole = () => {
  const {
    useMyself,
    setUseMyself,
    lessonPromptStyle,
    scenario
  } = useAppContext()

  const isDisabled = scenario === SCENARIO.CUSTOM
  const labelClass = isDisabled ? 'o-50' : '' // o-50 = 50% opacity in Tachyons

  const { tabIndex, ariaDisabled, ariaHidden, isOpen, isMounted } = usePanelBase({panelName: ACTIVE_PANEL.SELECTOR_PARTICIPANT_ROLE})

  return (
    <div className={`selector-participant-role mb3 on-background ${isOpen ? 'panel-visible' : 'panel-hiddenX'} ${!isMounted ? 'dnX' : ''}`}>
      <label className="db mb2 f5 b">My role</label>
      <div className={`flex flex-column mh3 ${labelClass}`}>
        <label className="mb1 flex items-center">
          <input
            tabIndex={tabIndex}
            aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
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
            tabIndex={tabIndex}
            aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
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
