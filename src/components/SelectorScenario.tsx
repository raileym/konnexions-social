import React from 'react'
import { useAppContext } from '../context/AppContext/AppContext'
import { SCENARIO, type Scenario } from '../../shared/cknTypes/types/types'

type SelectorScenarioProps = {
  custom: boolean
}

const SelectorScenario: React.FC<SelectorScenarioProps> = ({ custom }) => {
  const {
    scenario,
    setScenario
  } = useAppContext()

  const scenarios: Scenario[] = [
    SCENARIO.RESTAURANT,
    SCENARIO.HOTEL,
    SCENARIO.AIRPORT,
    SCENARIO.TAXI,
    ...(custom ? [SCENARIO.CUSTOM] : [])
  ]

  return (
    <>
      <div className="mb3">
        <label className="db mb2 f5 b">Choose a scenario:</label>
        <div className="flex flex-wrap">
          {scenarios.map((s) => (
            <label key={s} className="mr3 mb2 flex items-center">
              <input
                type="radio"
                name={`scenario-${Math.random().toString(36).slice(2)}`}
                // name="scenario"
                value={s}
                checked={scenario === s}
                onChange={() => setScenario(s)}
                className="mr1"
              />
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </>
  )
}

export default SelectorScenario
