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
      tabIndex={-1}
      aria-disabled={false}
      className="day-night-toggle fixed top-0 right-0 z-9999 pa1 bg-redX baX b--background br3 flex items-center"
      style={{ right: '5%', top: '12rem', fontFamily: 'monospace' }}
    >
<button onClick={toggleMode} className={`f3   ph2 pv1 b--blackX bg-light-grayX focus:b--red focus:bg-tertiaryX focus:whiteX bw2 ${!isDay ? 'bg-white' : 'bg-black'}`}>
        {!isDay ? <FontAwesomeIcon className="yellow ma1 bg-white" icon={faSun} /> : <FontAwesomeIcon className="white ma1 bg-black" icon={faMoon} />}
      </button>
    </div>
  )
}

export default DayNightToggle
