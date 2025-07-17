import {
  COLOR_PALETTE,
  colorPaletteDetails,
  type ColorPalette,
  type ThemeMode
} from '@cknTypes/theme'
import React, { useEffect, useState } from 'react'
import { ThemeContext } from '@context/ThemeContext/ThemeContext'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ColorPalette>(COLOR_PALETTE.MIDNIGHT_SAND)
  const [mode, setMode] = useState<ThemeMode>('day')

  useEffect(() => {
    const palette = colorPaletteDetails[theme]
    const colors = mode === 'day' ? palette.colorsDay : palette.colorsNight
    const root = document.documentElement

    Object.entries(colors).forEach(([key, val]) => {
      root.style.setProperty(`--${key}`, val)
    })
  }, [theme, mode])

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Remove the useThemeContext hook from here