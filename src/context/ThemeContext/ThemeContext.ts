import type { ThemeContextProps } from '@cknTypes/theme'
import { createContext, useContext } from 'react'

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}