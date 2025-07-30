import { useAppContext } from '@context/AppContext/AppContext'
import { ACTIVE_PANEL, SCENARIO } from '@cknTypes/constants'
import { usePanelBase } from '@hooks/usePanelBase'

const InputCustomParticipantList = () => {
  const { scenario, customParticipantList, setCustomParticipantList } = useAppContext()
  const disabled = scenario !== SCENARIO.CUSTOM

  const { tabIndex, ariaDisabled, ariaHidden } = usePanelBase({panelName: ACTIVE_PANEL.INPUT_CUSTOM_PARTICIPANT_LIST})
  
  return (
    <div className="mb3 on-background" style={{ opacity: disabled ? 0.5 : 1 }}>
      <label className="db mb2 f5 b">Custom Participants</label>
      <input
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
        type="text"
        value={customParticipantList}
        onChange={(e) => setCustomParticipantList(e.target.value)}
        className="input-reset ba bg-on-background b--background-20 pa2 f4 w-100"
        placeholder="myself, the waiter"
        disabled={disabled}
        style={{
          color: customParticipantList ? 'black' : 'blue'
        }}        
      />
    </div>
  )
}

export default InputCustomParticipantList
