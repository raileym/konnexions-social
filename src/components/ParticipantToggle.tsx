import { type FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'

type Props = {
  useMyself: boolean
  onClick: (next: boolean) => void
}

const ParticipantToggle: FC<Props> = ({ useMyself, onClick }) => {
  const icon = useMyself ? faToggleOn : faToggleOff
  const label = useMyself
    ? 'I am a participant in the conversation'
    : 'I am <b>not</b> a participant in the conversation'

  return (
    <div className="ml4">
      <button
        onClick={() => onClick(!useMyself)}
        className="flex items-center gap-2 bg-transparent bn pointer f5"
      >
        <FontAwesomeIcon icon={icon} className="f4" />
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </button>
    </div>
  )
}

export default ParticipantToggle
