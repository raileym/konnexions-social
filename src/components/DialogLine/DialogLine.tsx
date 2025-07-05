import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTTS } from '@PanelGenAIProComponents/useTTS/useTTS'
import { useAppContext } from '@context/AppContext/AppContext'
import type { DialogLineProps } from '@cknTypes/types'
import { FormatSentence } from '../FormatSentence/FormatSentence'

export const DialogLine = ({
  debugLog,
  language,
  line,
  index,
  useCloudTTS,
  storeAudioOrLine,
  className = '',
  noSpeaker = true
}: DialogLineProps) => {
  const [gender, speaker, sentence] = line.split('|')

  const { cutoff, maxCount, setMaxCount } = useAppContext()

  const { speak } = useTTS({
    useCloudTTS,
    maxCount,
    setMaxCount,
    cutoff,
    store: storeAudioOrLine,
    language,
    debugLog
  })

  const handleSpeak = () => {
    speak({ text: sentence, speaker, gender, index })
  }

  return (
    <>
      {noSpeaker ? (
        <div className={`h2 items-center ph2 flex-autoX flex w-100 ${className}`}>
          <FormatSentence sentence={sentence} />
        </div>
      ) : (
        <div className={`h2 items-center ph2 flex-autoX flex w-100 ${className}`}>
          <strong>{speaker}</strong>: <FormatSentence sentence={sentence} />
        </div>
      )}
      <button
        onClick={handleSpeak}
        className="ml3 f6 br2 ph2 pv1 dib white bg-dark-blue hover:bg-blue no-outline"
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </>
  )
}

