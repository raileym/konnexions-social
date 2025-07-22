import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { SCENARIO, SCREEN } from '@cknTypes/constants'

const InputCustomParticipantList: React.FC = () => {
  const { scenario, customParticipantList, setCustomParticipantList, screenState } = useAppContext()
  const disabled = scenario !== SCENARIO.CUSTOM

  return (
    <div className="mb3" style={{ opacity: disabled ? 0.5 : 1 }}>
      <label className="db mb2 f5 b">Custom Participants</label>
      <input
        tabIndex={screenState[SCREEN.GEN_AI_PRO] ? 0 : -1}
        aria-disabled={!screenState[SCREEN.GEN_AI_PRO]}
        type="text"
        value={customParticipantList}
        onChange={(e) => setCustomParticipantList(e.target.value)}
        className="input-reset ba b--background-20 pa2 f4 w-100"
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
