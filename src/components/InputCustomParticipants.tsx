import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'
import { SCENARIO } from '@cknTypes/constants'

const InputCustomParticipants: React.FC = () => {
  const { scenario, customParticipants, setCustomParticipants } = useAppContext()
  const disabled = scenario !== SCENARIO.CUSTOM

  return (
    <div className="mb3" style={{ opacity: disabled ? 0.5 : 1 }}>
      <label className="db mb2 f5 b">Participants:</label>
      <input
        type="text"
        value={customParticipants}
        onChange={(e) => setCustomParticipants(e.target.value)}
        className="input-reset ba b--black-20 pa2 f4 w-100"
        placeholder="myself, the waiter"
        disabled={disabled}
        style={{
          color: customParticipants ? 'black' : 'blue'
        }}        
      />
    </div>
  )
}

export default InputCustomParticipants
