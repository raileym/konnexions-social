import { type FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from '@context/AppContext/AppContext'

const CutoffToggle: FC = () => {
  const {
    cutoff,
    setCutoff
  } = useAppContext()

  const onClick = () => {
    setCutoff(prev => !prev)
  }

  const icon = cutoff ? faToggleOn : faToggleOff

  return (
    <div className="ml4 mb2X flex flex-row justify-center center items-center">
      <button
        onClick={() => onClick()}
        className="flex items-center gap-2 bg-transparent bn pointer f5"
      >
        <FontAwesomeIcon icon={icon} className="f2 mr3X" />
      </button>
      <div
        className="b mh3 black f5"
        style={{
          width: 130,
          fontFamily: 'monospace',
          textAlign: 'left',
          whiteSpace: 'nowrap'
        }}
      >
        Cutoff
      </div>
    </div>
  )
}

export default CutoffToggle
