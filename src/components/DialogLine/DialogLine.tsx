import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTTS } from '@PanelGenAIProComponents/useTTS/useTTS'
import { useAppContext } from '@context/AppContext/AppContext'
import type { DialogLineProps } from '@cknTypes/types'
import { FormatSentence } from '../FormatSentence/FormatSentence'
import { ACTIVE_PANEL, SCREEN } from '@cknTypes/constants'
import { usePanelBase } from '@hooks/usePanelBase'

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

  const { cutoff } = useAppContext()

  const { speak } = useTTS({
    useCloudTTS,
    cutoff,
    store: storeAudioOrLine,
    language,
    debugLog
  })

  const handleSpeak = () => {
    speak({ text: sentence, speaker, gender, index })
  }

  const { tabIndex, ariaDisabled, ariaHidden } = usePanelBase({panelName: ACTIVE_PANEL.DIALOG_LINE})
  
  className = ''
  return (
    <div className={'dialog-line flex flex-column w-100'}>
      <div className={`bg-greenX flex items-center justify-between w-100 ${className}`}>
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
          tabIndex={0}
          aria-disabled={ariaDisabled}        
          onClick={handleSpeak}
          className="ml3 f6 br2 ph2 pv1 dib on-background bg-secondary hover:bg-blue no-outline bg-redX"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
      {translation && (
        <div className="pl3 f5 brand ml2 mt1">
          {translation}
        </div>
      )}
    </div>
  )
}

