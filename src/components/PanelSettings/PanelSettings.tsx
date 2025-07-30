import { useThemeContext } from '@context/ThemeContext/ThemeContext'
import { usePanelBase } from '@hooks/usePanelBase'
import { ACTIVE_PANEL } from '@cknTypes/constants'

const SETTINGS_PANEL_WIDTH_PERCENT = 'w-40'
const SETTINGS_PANEL_TRANSLATE_X = 'translate-x-60'

const PanelSettings = () => {

  const { theme, setTheme } = useThemeContext()

  const { ref, firstFocusButtonRef, tabIndex, ariaDisabled, ariaHidden, translateX } = usePanelBase({
    panelName: ACTIVE_PANEL.SETTINGS,
    translateXOpen: SETTINGS_PANEL_TRANSLATE_X,
    translateXClose: 'translate-x-full'
  })

  const headline = (
    <div className="flex flex-column">
      <div className="pa0 ma0">
        Set your preferences here in regards to whether you are using a local Text-To-Speech (TTS)
        service or a cloud-based TTS service. Also, you may set your cost metrics here to help you
        understand rate of usage and potential costs for using cloud-based services, e.g., Google TTS
        Service or OpenAI's GenAI Service.
      </div>

      <div className="f2 b">{theme}</div>
      <button
        ref={firstFocusButtonRef}
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
        className="mv3"
        onClick={() => {
          setTheme('Midnight Sand')
        }}
      >
        Select MIDNIGHT SAND
      </button>
      <button
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
        className="mv3"
        onClick={() => {
          setTheme('Dunkin')
        }}
      >
        Select DUNKIN
      </button>
      <button
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
        className="mv3"
        onClick={() => {
          setTheme('McDonalds')
        }}
      >
        Select MCDONALDS
      </button>
      <button
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
        className="mv3"
        onClick={() => {
          setTheme('Starbucks')
        }}
      >
        Select STARBUCKS
      </button>
      <button
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
        className="mv3"
        onClick={() => {
          setTheme('Ocean View')
        }}
      >
        Select Theme OCEAN VIEW
      </button>
    </div>
  )

  return (
    <div
      ref={ref}
      className={`panel-right-short panel-settings pt5 bl b--moon-gray bw1 z-2 absolute top-0 left-10 w-90 h-100 bg-light-gray transition-transform ${translateX}`}
    >
      <div
        tabIndex={tabIndex}
        aria-disabled={ariaDisabled}
        aria-hidden={ariaHidden}
        className="six h-100 w-100 overflow-y-auto"
      >
        <div className={`pa4 ${SETTINGS_PANEL_WIDTH_PERCENT} mb5`}>
          <div className="f3 tc pt5 b background w-100X">Settings Panel</div>
          <h2 className="f5 pa3 mt5">{headline}</h2>
          <p className="pl3">
            This panel slides in and out correctly based on context.
          </p>
          <div style={{ height: '100em' }} className="bg-blue" />
        </div>
      </div>
    </div>
  )
}

export default PanelSettings
