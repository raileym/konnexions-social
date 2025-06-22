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
    ? 'I am a participant in the conversation'
    : 'I am <b>not</b> a participant in the conversation'

  return (
    <div className="ml4">
      <button
        onClick={() => setUseMyself(prev => !prev)}
        className="flex items-center gap-2 bg-transparent bn pointer f5"
      >
        <FontAwesomeIcon icon={icon} className="f2 mh3" />
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </button>
    </div>
  )
}

export default ParticipantToggle
