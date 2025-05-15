import React, { useState } from 'react'

const PanelGenAI: React.FC = () => {
  const [scenario, setScenario] = useState('restaurant')

  return (
    <div className="absolute z-1 pa4 bg-white top-0 left-0 w-100 h-100 overflow-auto">
      <h2 className="f3 mt5">Generative AI Panel</h2>

      <div className="mb3">
        <label className="db mb2 f6">Choose a scenario:</label>
        <div className="flex items-center">
          <label className="mr3 flex items-center">
            <input
              type="radio"
              name="scenario"
              value="restaurant"
              checked={scenario === 'restaurant'}
              onChange={(e) => setScenario(e.target.value)}
              className="mr1"
            />
            Restaurant
          </label>
          <label className="mr3 flex items-center">
            <input
              type="radio"
              name="scenario"
              value="hotel"
              checked={scenario === 'hotel'}
              onChange={(e) => setScenario(e.target.value)}
              className="mr1"
            />
            Hotel
          </label>
          <label className="mr3 flex items-center">
            <input
              type="radio"
              name="scenario"
              value="airport"
              checked={scenario === 'airport'}
              onChange={(e) => setScenario(e.target.value)}
              className="mr1"
            />
            Airport
          </label>
          <label className="mr3 flex items-center">
            <input
              type="radio"
              name="scenario"
              value="taxi"
              checked={scenario === 'taxi'}
              onChange={(e) => setScenario(e.target.value)}
              className="mr1"
            />
            Taxi
          </label>
        </div>
      </div>

      <div className="pa3 bg-washed-yellow dark-gray br2">
        <strong>Selected scenario:</strong> {scenario}
      </div>
    </div>
  )
}

export default PanelGenAI
