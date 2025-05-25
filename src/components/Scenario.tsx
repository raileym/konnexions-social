import React from 'react'
import { useAppContext } from '../context/AppContext'
import { SCENARIO, type ScenarioValue } from '../../shared/types'

type ScenarioProps = {
  custom: boolean
}

const Scenario: React.FC<ScenarioProps> = ({ custom }) => {
  const { scenario, setScenario } = useAppContext()

  const scenarios: ScenarioValue[] = [
    SCENARIO.RESTAURANT,
    SCENARIO.HOTEL,
    SCENARIO.AIRPORT,
    SCENARIO.TAXI,
    ...(custom ? [SCENARIO.CUSTOM] : [])
  ]

  const updateScenario = (value: ScenarioValue) => {
    localStorage.setItem('scenario', value)
    setScenario(value)
  }

  return (
    <div className="mb3">
      <label className="db mb2 f5 b">Choose a scenario:</label>
      <div className="flex flex-wrap">
        {scenarios.map((s) => (
          <label key={s} className="mr3 mb2 flex items-center">
            <input
              type="radio"
              name="scenario"
              value={s}
              checked={scenario === s}
              onChange={() => updateScenario(s)}
              className="mr1"
            />
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </label>
        ))}
      </div>
    </div>
  )
}

export default Scenario
