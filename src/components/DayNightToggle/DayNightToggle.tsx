import { TABINDEX_NEVER } from '@cknTypes/constants'
import { THEME_MODE } from '@cknTypes/theme'
import { useThemeContext } from '@context/ThemeContext/ThemeContext'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { MODE } from '@context/AppContext/constants'

type DayNightToggleProps = {
  className?: string
}

const DayNightToggle = ({className}: DayNightToggleProps) => {
  const { mode, setMode } = useThemeContext()

  const toggleMode = () => {
    setMode(mode === THEME_MODE.DAY ? THEME_MODE.NIGHT : THEME_MODE.DAY)
  }

  const isDay = mode === THEME_MODE.DAY

  return (
    <button onClick={toggleMode} className={`day-night-toggle secondary ma1X f2 w3 ph2 pv1 bg-transparent b--transparentX b--double bw3X focus:b--transparent ${className} `}>
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
  )
}

export default DayNightToggle
