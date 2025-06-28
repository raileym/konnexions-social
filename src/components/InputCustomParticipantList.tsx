import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { SCENARIO } from '@cknTypes/constants'

const InputCustomParticipantList: React.FC = () => {
  const { scenario, customParticipantList, setCustomParticipantList } = useAppContext()
  const disabled = scenario !== SCENARIO.CUSTOM

  return (
    <div className="mb3" style={{ opacity: disabled ? 0.5 : 1 }}>
      <label className="db mb2 f5 b">Custom Participants</label>
      <input
        type="text"
        value={customParticipantList}
        onChange={(e) => setCustomParticipantList(e.target.value)}
        className="input-reset ba b--black-20 pa2 f4 w-100"
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
