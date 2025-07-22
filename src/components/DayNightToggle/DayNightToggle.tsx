import { THEME_MODE } from '@cknTypes/theme'
import { useThemeContext } from '@context/ThemeContext/ThemeContext'
// import { MODE } from '@context/AppContext/constants'

const DayNightToggle = () => {
  const { mode, setMode } = useThemeContext()

  const toggleMode = () => {
    setMode(mode === THEME_MODE.DAY ? THEME_MODE.NIGHT : THEME_MODE.DAY)
  }

  return (
    <div
      tabIndex={-1}
      aria-disabled={false}
      className="day-night-toggle fixed top-0 right-0 z-9999 pa2 bg-on-background ba b--background br3 flex items-center"
      style={{ right: '5%', top: '11rem', fontFamily: 'monospace' }}
    >
      <button onClick={toggleMode} className="f6 ph2 pv1 bg-light-gray focus:b--red bw3">
        {mode === THEME_MODE.DAY ? '🌞 Day' : '🌜 Night'}
      </button>
    </div>
  )
}

export default DayNightToggle
