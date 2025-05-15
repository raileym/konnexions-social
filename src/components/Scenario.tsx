// src/components/Scenario.tsx
import React from 'react'
import { useAppContext } from '../context/AppContext'
import { SCENARIO, type ScenarioValue } from '../cknTypes/types/types'

const Scenario: React.FC = () => {
  const { scenario, setScenario } = useAppContext()
  const scenarios: ScenarioValue[] = [
    SCENARIO.RESTAURANT,
    SCENARIO.HOTEL,
    SCENARIO.AIRPORT,
    SCENARIO.TAXI,
    SCENARIO.CUSTOM
  ]

  const updateScenario = (value: ScenarioValue) => {
    localStorage.setItem('scenario', value)
    setScenario(value)
  }
  
  return (
    <div className="mb3">
      <label className="db mt3 mb2 f4 tc b">Choose a scenario:</label>
      <div className="flex mb4 justify-center">
        {scenarios.map((s) => (
          <label key={s} className="mr3 flex items-center">
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
