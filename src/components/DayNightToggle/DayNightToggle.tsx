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
      className="day-night-toggle fixed top-0 right-0 z-9999 pa1 bg-white ba bw1 b--backgroundX br3 flex items-center bg-on-background background b--background"
      style={{ right: '2rem', top: '7rem', fontFamily: 'monospace' }}
    >
<button onClick={toggleMode} className={`f3 ph2 pv1 b--blackX b--solid bw1 bg-light-grayX focus:b--red focus:bg-tertiaryX focus:whiteX bw2X ${!isDay ? 'bg-black b-black' : 'bg-whiteX b-black'}`}>
        {!isDay ? <FontAwesomeIcon className="yellowX ma1 bg-blackX" icon={faSun} /> : <FontAwesomeIcon className="ma1 bg-greenX blackX" icon={faMoon} />}
      </button>
    </div>
  )
}

export default DayNightToggle
