import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTTS } from '../useTTS/useTTS'
import { useAppContext } from '../../../../context/AppContext'

type DialogLineProps = {
  line: string
  index: number
  useCloudTTS: boolean
  storeAudioOrLine: (index: number, value: string) => void
}

export function DialogLine({ line, index, useCloudTTS, storeAudioOrLine }: DialogLineProps) {
  const [gender, speaker, sentence] = line.split('|')

  const { cutoff, maxCount, setMaxCount } = useAppContext()
  
  const handleSpeak = () => {
    console.log('handleSpeak')
    speak()
  }

  const { speak } = useTTS({
    text: sentence,
    gender,
    index,
    useCloudTTS,
    store: storeAudioOrLine,
    cutoff,
    maxCount,
    setMaxCount
  })

  // console.log('useCloudTTS', useCloudTTS, index, line)

  return (
    <li className="mb2 flex items-center">
      <div className="flex-auto">
        <strong>{speaker}</strong>: {sentence}
      </div>
      <button
        onClick={handleSpeak}
        // onClick={speak}
        className="ml3 f6 link dim br2 ph2 pv1 dib white bg-dark-blue"
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </li>
  )
}
