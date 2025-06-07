import { type FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from '../context/AppContext'

const ShowMaxCount: FC = () => {
  const {
    maxCount,
    setMaxCount
  } = useAppContext()

  const handleIncrease = () => {
    setMaxCount(prev => prev+1)
  }

  const handleDecrease = () => {
    setMaxCount(prev => prev-1)
  }

  return (
    <div className="ml4 bg-whiteX">
      <div className="flex flex-row justify-start items-center">
        <button
          onClick={() => handleIncrease()}
          className="flex items-center gap-2X bg-transparent br4 bnX pointer f5 ph0 mh0"
        >
          <FontAwesomeIcon icon={faPlus} className="f3 mh2 ph0" />
        </button>
        <div
          className="b ml3 black f5 baX"
          style={{
            width: 130,
            fontFamily: 'monospace',
            textAlign: 'left',
            whiteSpace: 'nowrap'
          }}
        >
          MaxCount: {maxCount}
        </div>
        <button
          onClick={() => handleDecrease()}
          className="flex items-center gap-2X bg-transparent br4 bnX pointer f5 ph0 mh0"
        >
          <FontAwesomeIcon icon={faMinus} className="f3 mh2 ph0" />
        </button>
      </div>
      </div>
  )
}

export default ShowMaxCount
