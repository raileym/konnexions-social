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
  noSpeaker = true,
  translation
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

  className = ''
  return (
    <div className={'flex flex-column w-100'}>
      <div className={`baX bg-greenX flex items-center justify-between w-100 ${className}`}>
        <div className="ph2 flex-auto">
          {noSpeaker ? (
            <FormatSentence sentence={sentence} />
          ) : (
            <>
              <strong>{speaker}</strong>: <FormatSentence sentence={sentence} />
            </>
          )}
        </div>
        <button
          onClick={handleSpeak}
          className="ml3 f6 br2 ph2 pv1 dib white bg-dark-blue hover:bg-blue no-outline"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
      {translation && (
        <div className="baX pl3 f5 brand ml2 mt1">
          {translation}
        </div>
      )}
    </div>
  )
}

