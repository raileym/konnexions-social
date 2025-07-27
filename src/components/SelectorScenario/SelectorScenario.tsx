import { useMemo } from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { type Scenario, type SelectorScenarioProps } from '@cknTypes/types'
import { SCENARIO } from '@cknTypes/constants'

const SelectorScenario = ({ tabIndex, ariaDisabled, custom }: SelectorScenarioProps) => {
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

  // const scenarioDescriptions = useMemo<Record<Scenario, string>>(() => ({
  //   restaurant: 'at a restaurant',
  //   hotel: 'at the hotel check-in desk',
  //   airport: 'at the airport check-in counter',
  //   taxi: 'in a taxi',
  //   custom: customScenario ?? 'a custom situation'
  // }), [])

  return (
    <div className="mb3 on-background">
      <label className="db mb2 f5 b">Scenario</label>
      <div className="flex flex-wrap flex-column">
        {scenarios.map((s) => (
          <label key={s} className="mh3 mb2 flex items-center">
            <input
              tabIndex={tabIndex}
              aria-disabled={ariaDisabled}
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
