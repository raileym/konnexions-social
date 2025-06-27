import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { SCENARIO } from '@cknTypes/constants'

const InputCustomScenario: React.FC = () => {
  const { scenario, customScenario, setCustomScenario } = useAppContext()
  const disabled = scenario !== SCENARIO.CUSTOM

  return (
    <div className="mb3" style={{ opacity: disabled ? 0.5 : 1 }}>
      <label className="db mb2 f5 b">Scenario description:</label>
      <input
        type="text"
        value={customScenario}
        onChange={(e) => setCustomScenario(e.target.value)}
        className="input-reset ba b--black-20 pa2 f4 w-100"
        placeholder="Sitting at an outdoor café in Paris ordering a coffee"
        disabled={disabled}
      />
    </div>
  )
}

export default InputCustomScenario
