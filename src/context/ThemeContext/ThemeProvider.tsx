import {
  COLOR_PALETTE,
  colorPaletteDetails,
  THEME_MODE,
  type ColorPalette,
  type ThemeMode
} from '@cknTypes/theme'
import { useEffect } from 'react'
import { ThemeContext } from '@context/ThemeContext/ThemeContext'
import { usePersistentState } from '@hooks/usePersistentState'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = usePersistentState<ColorPalette>('theme', COLOR_PALETTE.MIDNIGHT_SAND)
  const [mode, setMode] = usePersistentState<ThemeMode>('mode', THEME_MODE.DAY)

  useEffect(() => {
    const palette = colorPaletteDetails[theme]
    const colors = mode === 'day' ? palette.colorsDay : palette.colorsNight
    const root = document.documentElement

    // cXnsole.log('day', palette.colorsDay)
    // cXnsole.log('night', palette.colorsNight)

    Object.entries(colors).forEach(([key, val]) => {
      root.style.setProperty(`--kx-${key}`, val)
      // cXnsole.log(`--kx-${key}: ${val}`)
    })
  }, [theme, mode])

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Remove the useThemeContext hook from here