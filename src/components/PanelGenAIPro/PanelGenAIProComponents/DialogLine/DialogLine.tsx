import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTTS } from '../useTTS/useTTS'

type DialogLineProps = {
  line: string
  index: number
  useCloudTTS: boolean
  storeAudioOrLine: (index: number, value: string) => void
}

export function DialogLine({ line, index, useCloudTTS, storeAudioOrLine }: DialogLineProps) {
  const [gender, speaker, sentence] = line.split('|')

  const { speak, audioUrl } = useTTS({
    text: sentence,
    gender,
    index,
    useCloudTTS,
    store: storeAudioOrLine
  })

  return (
    <li className="mb2 flex items-center">
      <div className="flex-auto">
        <strong>{speaker}</strong>: {sentence}
      </div>
      <button
        onClick={speak}
        disabled={useCloudTTS && !audioUrl}
        className="ml3 f6 link dim br2 ph2 pv1 dib white bg-dark-blue"
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </li>
  )
}
