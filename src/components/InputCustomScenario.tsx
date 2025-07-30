import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL, SCENARIO } from '@cknTypes/constants'
import { usePanelBase } from '@hooks/usePanelBase'

const InputCustomScenario  = () => {
  const { scenario, customScenario, setCustomScenario } = useAppContext()
  const disabled = scenario !== SCENARIO.CUSTOM

  const { tabIndex, ariaDisabled, ariaHidden } = usePanelBase({panelName: ACTIVE_PANEL.INPUT_CUSTOM_SCENARIO})
  
  return (
    <div className="mb3 on-background" style={{ opacity: disabled ? 0.5 : 1 }}>
      <label className="db mb2 f5 b">Custom Scenario</label>
      <input
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
        type="text"
        value={customScenario}
        onChange={(e) => setCustomScenario(e.target.value)}
        className={`input-reset ba bg-on-background b--background-20 pa2 f4 w-100 ${customScenario ? 'black' : 'green'}`}
        placeholder="Sitting at an outdoor café in Paris ordering a coffee"
        disabled={disabled}
      />
    </div>
  )
}

export default InputCustomScenario
