import { type FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from '@context/AppContext/AppContext'

const ShowMaxCount: FC = () => {
  const {
    maxCount,
    setMaxCount
  } = useAppContext()

  const handleIncrease = () => {
    setMaxCount(prev => prev+20)
  }

  const handleDecrease = () => {
    setMaxCount(prev => prev-10)
  }

  return (
    <div className="flex flex-row justify-center items-center">
      <button
        onClick={() => handleIncrease()}
        className="flex items-center gap-2X bg-transparent br4 bnX pointer f5 ph0 mh0 mv2"
      >
        <FontAwesomeIcon icon={faPlus} className="f3 mh2 ph0" />
      </button>
      <div
        className="b ml3X tc black f5 baX"
        style={{
          width: 100,
          fontFamily: 'monospace',
          // textAlign: 'left',
          whiteSpace: 'nowrap'
        }}
      >
        Max: {maxCount}
      </div>
      <button
        onClick={() => handleDecrease()}
        className="flex items-center gap-2X bg-transparent br4 bnX pointer f5 ph0 mh0 mv2"
      >
        <FontAwesomeIcon icon={faMinus} className="f3 mh2 ph0" />
      </button>
    </div>
  )
}

export default ShowMaxCount
