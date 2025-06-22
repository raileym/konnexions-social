import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTTS } from '@PanelGenAIProComponents/useTTS/useTTS'
import { useAppContext } from '@context/AppContext/AppContext'
import type { DialogLineProps } from '@cknTypes/types'

export function DialogLine({ debugLog, language, line, index, useCloudTTS, storeAudioOrLine, className='' }: DialogLineProps) {
  const [gender, speaker, sentence] = line.split('|')

  const { cutoff, maxCount, setMaxCount } = useAppContext()
  
  const handleSpeak = () => {
    console.log('handleSpeak')
    speak({ text: sentence, speaker, gender, index })
  }

  const { speak } = useTTS({
    useCloudTTS,
    maxCount,
    setMaxCount,
    cutoff,
    store: storeAudioOrLine,
    language,
    debugLog
  })

// const { speak } = useTTS({
  //   text: sentence,
  //   speaker,
  //   gender,
  //   index,
  //   useCloudTTS,
  //   store: storeAudioOrLine,
  //   cutoff,
  //   maxCount,
  //   setMaxCount,
  //   language
  // })

  // cXonsole.log('useCloudTTS', useCloudTTS, index, line)

  return (
    <>
      <div className={`ph3 flex-auto ${className}`}>
        <strong>{speaker}</strong>: {sentence}
      </div>
      <button
        onClick={handleSpeak}
        // onClick={speak}
        className="ml3 f6 br2 ph2 pv1 dib white bg-dark-blue hover:bg-blue no-outline"
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </>
  )
}
