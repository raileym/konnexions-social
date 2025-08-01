import { useMemo } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { type Scenario, type SelectorScenarioProps } from '@cknTypes/types'
import { ACTIVE_PANEL, SCENARIO } from '@cknTypes/constants'
import { usePanelBase } from '@hooks/usePanelBase'

const SelectorScenario = ({ custom }: SelectorScenarioProps) => {
  const {
    scenario,
    setScenario //,
    // customScenario
  } = useAppContext()

  const scenarios = useMemo<Scenario[]>(() => {
    return [
      ...(custom ? [SCENARIO.CUSTOM] : []),
      SCENARIO.RESTAURANT,
      SCENARIO.HOTEL,
      SCENARIO.AIRPORT,
      SCENARIO.TAXI
    ]
  }, [custom])

  const { tabIndex, ariaDisabled, ariaHidden, isOpen, isMounted } = usePanelBase({panelName: ACTIVE_PANEL.SELECTOR_SCENARIO})

  return (
    <div className={`selector-scenario mb3 on-background ${isOpen ? 'panel-visible' : 'panel-hiddenX'} ${!isMounted ? 'dnX' : ''}`}>
      <label className="db mb2 f5 b">Scenario</label>
      <div className="flex flex-wrap flex-column">
        {scenarios.map((s) => (
          <label key={s} className="mh3 mb2 flex items-center">
            <input
              tabIndex={tabIndex}
              inert={!isOpen}
              aria-disabled={ariaDisabled}
              aria-hidden={ariaHidden}
              type="radio"
              name="scenario"
              value={s}
              checked={scenario === s}
              onChange={() => {
                setScenario(s)
              }}
              className="mr1"
            />
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </label>
        ))}
      </div>
    </div>
  )
}

export default SelectorScenario
