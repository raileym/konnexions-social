import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { SCENARIO, SCREEN } from '@cknTypes/constants'

const InputCustomScenario: React.FC = () => {
  const { scenario, customScenario, setCustomScenario, screenState } = useAppContext()
  const disabled = scenario !== SCENARIO.CUSTOM

  return (
    <div className="mb3" style={{ opacity: disabled ? 0.5 : 1 }}>
      <label className="db mb2 f5 b">Custom Scenario</label>
      <input
        tabIndex={screenState[SCREEN.GEN_AI_PRO] ? 0 : -1}
        aria-disabled={!screenState[SCREEN.GEN_AI_PRO]}
        type="text"
        value={customScenario}
        onChange={(e) => setCustomScenario(e.target.value)}
        className={`input-reset ba b--background-20 pa2 f4 w-100 ${customScenario ? 'black' : 'green'}`}
        placeholder="Sitting at an outdoor café in Paris ordering a coffee"
        disabled={disabled}
      />
    </div>
  )
}

export default InputCustomScenario
