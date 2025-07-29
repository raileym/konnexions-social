import { TABINDEX_NEVER } from '@cknTypes/constants'
import { THEME_MODE } from '@cknTypes/theme'
import { useThemeContext } from '@context/ThemeContext/ThemeContext'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { MODE } from '@context/AppContext/constants'

const DayNightToggle = () => {
  const { mode, setMode } = useThemeContext()

  const toggleMode = () => {
    setMode(mode === THEME_MODE.DAY ? THEME_MODE.NIGHT : THEME_MODE.DAY)
  }

  const isDay = mode === THEME_MODE.DAY

  return (
    <div
      tabIndex={TABINDEX_NEVER}
      aria-disabled={false}
      className="day-night-toggle pa1 bw1 br3 flex items-center"
      style={{ right: '12rem', top: '8rem', fontFamily: 'monospace' }}
    >
      <button onClick={toggleMode} className={'secondary ma1 f2 w3 ph2 pv1 bg-transparent b--transparent b--double bw3 focus:b--transparent'}>
        {!isDay ? 
          <>
            <FontAwesomeIcon className="w2X" icon={faSun} /> 
            <div className={'f6 mt1 tc secondary'}>Day</div>        
          </>
          : 
          <>
            <FontAwesomeIcon className="w2X" icon={faMoon} />
            <div className={'f6 mt1 tc secondary'}>Night</div>        
          </>
        }
      </button>
    </div>
  )
}

export default DayNightToggle
