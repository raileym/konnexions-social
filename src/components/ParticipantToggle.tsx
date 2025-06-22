import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import type { SetUseMyself, UseMyself } from '@cknTypes/types'

type ParticipantToggleProps = {
  useMyself: UseMyself
  setUseMyself: SetUseMyself
}
const ParticipantToggle = ({useMyself, setUseMyself}: ParticipantToggleProps) => {
  const icon = useMyself ? faToggleOn : faToggleOff
  const label = useMyself
    ? <div>I am a participant in the conversation</div>
    : <div>I am <b>not</b> a participant in the conversation</div>

  return (
    <div className="w-100 flex justify-center">
      <div className="baX br2 ph3 pv2 flex items-center gap-3">
        <button
          onClick={() => setUseMyself(prev => !prev)}
          className="bg-transparent bn pointer f5 flex items-center"
        >
          <FontAwesomeIcon icon={icon} className="f2 mr2" />
        </button>
        <div className="baX f5" style={{ width: '19rem', textAlign: 'left' }}>
          {label}
        </div>
      </div>
    </div>
  )
}

export default ParticipantToggle
