import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTTS } from '../useTTS/useTTS'
import { useAppContext } from '@context/AppContext/AppContext'
import type { Language } from '@cknTypes/types'

type DialogLineProps = {
  line: string
  index: number
  useCloudTTS: boolean
  storeAudioOrLine: (index: number, value: string) => void
  className?: string
  language: Language
}

export function DialogLine({ language, line, index, useCloudTTS, storeAudioOrLine, className='' }: DialogLineProps) {
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
    setMaxCount,
    language
  })

  // console.log('useCloudTTS', useCloudTTS, index, line)

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
