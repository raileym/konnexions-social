import React from 'react'
import { useAppContext } from '@context/AppContext/AppContext'

const SelectorParticipantRole: React.FC = () => {
  const {
    useMyself,
    setUseMyself
  } = useAppContext()

  return (
    <div className="mb3">
      <label className="db mb2 f5 b">Your Role:</label>
      <div className="flex flex-column mh3">
        <label className="mb1 flex items-center">
          <input
            type="radio"
            name="participant-role"
            value="yes"
            checked={useMyself}
            onChange={() => setUseMyself(true)}
            className="mr2"
          />
          I am a participant in the conversation
        </label>
        <label className="mb1 flex items-center">
          <input
            type="radio"
            name="participant-role"
            value="no"
            checked={!useMyself}
            onChange={() => setUseMyself(false)}
            className="mr2"
          />
          I am not a participant in the conversation
        </label>
      </div>
    </div>
  )
}

export default SelectorParticipantRole
