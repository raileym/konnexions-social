export const COLOR_PALETTE = {
  AETNA: 'Aetna',
  CANDY_SHOP: 'Candy Shop',
  CKN: 'CKN',
  DENNYS: 'Dennys',
  DUNKIN: 'Dunkin',
  EARLY_EVENING: 'Early Evening',
  MCDONALDS: 'McDonalds',
  MIAMI_BEACH: 'Miami Beach',
  MIDNIGHT_SAND: 'Midnight Sand',
  OCEAN_VIEW: 'Ocean View',
  SPRING_MEADOW: 'Spring Meadow',
  STARBUCKS: 'Starbucks',
  UCF: 'UCF'
} as const

export const MIDNIGHT_SAND = {
  primary: '#a6d729',
  secondary: '#dd73e8',
  tertiary: '#e1462c',
  backgroundNight: '#000000',
  backgroundDay: '#fefefe'
} as const


export const BASIC_COLORS: ColorsType = {
  white: 'white',
  black: 'black',
  red: 'red',
  muted: 'silver',
  green: 'green',
  blue: 'blue',
  cyan: 'cyan',
  yellow: 'yellow',
  // silver: 'silver',
  pink: '#FF69B4',
  purple: '#BB44F0',
  near_black: '#111',
  dark_gray: '#333',
  mid_gray: '#555',
  gray: '#777',
  silver: '#999',
  light_silver: '#AAA',
  moon_gray: '#CCC',
  light_gray: '#EEE',
  orange: '#FF7900',
  transparent: 'transparent',
  aetna: 'rgba(105, 41, 133, 1)',
  logo_blue: 'rgba(64, 154, 247, 1)',
  logo_white: MIDNIGHT_SAND.backgroundDay,
  dunkin: '#DA1884',
  UCF: 'black' //,
  // UCFFACULTY: 'black'
}

export const THEME_MODE = 
{
  DAY: 'day',
  NIGHT: 'night'
} as const

export type Theme = ColorPalette

export type SetTheme = React.Dispatch<React.SetStateAction<Theme>>

export type ColorPalette = (typeof COLOR_PALETTE)[keyof typeof COLOR_PALETTE]

export type ThemeContextProps = {
  theme: ColorPalette
  mode: ThemeMode
  setTheme: SetTheme
  setMode: (mode: ThemeMode) => void
}

export type CreatePaletteProps = {
  primary: string
  secondary: string
  tertiary: string
  backgroundDay: string
  backgroundNight: string
}

export type CreatePSTProps = {
  background: string
  onBackground: string
  primary: string
  secondary: string
  tertiary: string
}

export type CreatePSTResult = {
  background: string
  onBackground: string
  primary: string
  onPrimary: string
  primaryContainer: string
  onPrimaryContainer: string
  secondary: string
  onSecondary: string
  secondaryContainer: string
  onSecondaryContainer: string
  tertiary: string
  onTertiary: string
  tertiaryContainer: string
  onTertiaryContainer: string
}

export type CreatePaletteResult = {
  colorsDay: CreatePSTResult
  colorsNight: CreatePSTResult
}

export type CreatePalette = (props: CreatePaletteProps) => CreatePaletteResult // { colorsDay: createPSTResult, colorsNight: createPSTResult }

export type ColorPaletteDetails = Record<ColorPalette, CreatePaletteResult>

export type ColorsType = Record<string, string>

export type ThemeModeValue = (typeof THEME_MODE)[keyof typeof THEME_MODE]
export type ThemeModeKey = keyof typeof THEME_MODE
export type ThemeMode = ThemeModeValue

const hexToRgb = (hex: string): string => {
  // Remove the hash at the beginning if it's there
  hex = hex.replace(/^#/, '')

  // Parse the red, green, and blue values
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // Return the RGB string
  return `rgb(${r}, ${g}, ${b})`
}

const createPST = ({
  background: backgroundHEX,
  onBackground: onBackgroundHEX,
  primary: primaryHEX,
  secondary: secondaryHEX,
  tertiary: tertiaryHEX
}: CreatePSTProps): CreatePSTResult => {
  const background = hexToRgb(backgroundHEX)
  const onBackground = hexToRgb(onBackgroundHEX)
  const primary = hexToRgb(primaryHEX)
  const secondary = hexToRgb(secondaryHEX)
  const tertiary = hexToRgb(tertiaryHEX)

  return {
    background,
    onBackground,

    primary,
    onPrimary: background,
    primaryContainer: primary,
    onPrimaryContainer: background,

    secondary,
    onSecondary: background,
    secondaryContainer: secondary,
    onSecondaryContainer: background,

    tertiary,
    onTertiary: background,
    tertiaryContainer: tertiary,
    onTertiaryContainer: background
  }
}

const createPalette: CreatePalette = ({ primary, secondary, tertiary, backgroundDay, backgroundNight }) => {
  const colorsDay = createPST({ primary, secondary, tertiary, background: backgroundDay, onBackground:backgroundNight })
  const colorsNight = createPST({ primary, secondary, tertiary, background: backgroundNight, onBackground: backgroundDay })

  return {
    colorsDay,
    colorsNight
  }
}

type RGB = [number, number, number]
type HSV = [number, number, number]

const rotateHue = (hexColor: string, rotation: number): string => {
  // Helper function to convert a hex color to RGB
  function hexToRgb (hex: string): RGB {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return [r, g, b]
  }

  // Helper function to convert RGB to HSV
  function rgbToHsv (r: number, g: number, b: number): HSV {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b); const min = Math.min(r, g, b)
    let h: number = 0
    const v = max
    const d = max - min
    const s = max === 0 ? 0 : d / max
    if (max === min) {
      h = 0 // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    return [h, s, v]
  }

  // Helper function to convert HSV to RGB
  function hsvToRgb (h: number, s: number, v: number): RGB {
    let r: number = 0
    let g: number = 0
    let b: number = 0
    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)
    switch (i % 6) {
      case 0:
        r = v
        g = t
        b = p
        break
      case 1:
        r = q
        g = v
        b = p
        break
      case 2:
        r = p
        g = v
        b = t
        break
      case 3:
        r = p
        g = q
        b = v
        break
      case 4:
        r = t
        g = p
        b = v
        break
      case 5:
        r = v
        g = p
        b = q
        break
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  }

  // Helper function to convert RGB to hex
  function rgbToHex (r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  // Convert hex to RGB, then RGB to HSV
  const rgb: RGB = hexToRgb(hexColor)
  const hsv: HSV = rgbToHsv(...rgb)
  // Rotate the hue, ensure it wraps around the color circle
  hsv[0] = (hsv[0] * 360 + rotation) % 360
  hsv[0] /= 360
  // Convert back to RGB, then RGB to hex
  const newRgb: RGB = hsvToRgb(...hsv)
  return rgbToHex(...newRgb)
}

export const colorPaletteDetails: ColorPaletteDetails = {
  // Custom
  [COLOR_PALETTE.MIDNIGHT_SAND]: createPalette({
    primary: MIDNIGHT_SAND.primary,
    secondary: MIDNIGHT_SAND.secondary,
    tertiary: MIDNIGHT_SAND.tertiary,
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: MIDNIGHT_SAND.backgroundNight
  }),
  [COLOR_PALETTE.SPRING_MEADOW]: createPalette({
    primary: rotateHue(MIDNIGHT_SAND.primary, 60),
    secondary: rotateHue(MIDNIGHT_SAND.secondary, 60),
    tertiary: rotateHue(MIDNIGHT_SAND.tertiary, 60),
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: MIDNIGHT_SAND.backgroundNight
  }),
  [COLOR_PALETTE.MIAMI_BEACH]: createPalette({
    primary: rotateHue(MIDNIGHT_SAND.primary, 100),
    secondary: rotateHue(MIDNIGHT_SAND.secondary, 100),
    tertiary: rotateHue(MIDNIGHT_SAND.tertiary, 100),
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: MIDNIGHT_SAND.backgroundNight
  }),
  [COLOR_PALETTE.OCEAN_VIEW]: createPalette({
    primary: rotateHue(MIDNIGHT_SAND.primary, 120),
    secondary: rotateHue(MIDNIGHT_SAND.secondary, 120),
    tertiary: rotateHue(MIDNIGHT_SAND.tertiary, 120),
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: MIDNIGHT_SAND.backgroundNight
  }),
  [COLOR_PALETTE.EARLY_EVENING]: createPalette({
    primary: rotateHue(MIDNIGHT_SAND.primary, 180),
    secondary: rotateHue(MIDNIGHT_SAND.secondary, 180),
    tertiary: rotateHue(MIDNIGHT_SAND.tertiary, 180),
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: MIDNIGHT_SAND.backgroundNight
  }),
  [COLOR_PALETTE.CANDY_SHOP]: createPalette({
    primary: rotateHue(MIDNIGHT_SAND.primary, 240),
    secondary: rotateHue(MIDNIGHT_SAND.secondary, 240),
    tertiary: rotateHue(MIDNIGHT_SAND.tertiary, 240),
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: MIDNIGHT_SAND.backgroundNight
  }),

  // Branded

  // AETNA
  // Purple, Cyan, Magenta
  //
  // 7d3f98 - Purple
  // 00bce4 - Cyan
  // 00a78e - Muted green
  // 7ac143 - Light green
  // f47721 - Orange
  // d20962 - Magenta
  [COLOR_PALETTE.AETNA]: createPalette({
    primary: '#7d3f98',
    secondary: '#00bce4',
    tertiary: '#d20962',
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: '#121529'
  }),

  // DUNKIN'
  // Orange, Brown, Magenta
  //
  // FF671F - Orange
  // DA1884 - Magenta
  // 653819 - Brown
  [COLOR_PALETTE.DUNKIN]: createPalette({
    primary: '#FF671F',
    secondary: '#653819',
    tertiary: '#DA1884',
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: '#121529'
  }),

  // UCF'
  // Black, Gold
  //
  // BA9B37 - Gold
  // 000000 - Black
  // FFFFFF - White
  // [ColorPalette.UCF]: createPalette({ primary: '#000000', secondary: '#BA9B37', tertiary: '#FFFFFF', backgroundDay: BASIC_COLORS.light_silver as string, backgroundNight: BASIC_COLORS.blue as string }),
  [COLOR_PALETTE.UCF]: createPalette({
    primary: '#000000',
    secondary: '#BA9B37',
    tertiary: '#AAAAAA',
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: '#121529'
  }),
  // [ColorPalette.UCFFACULTY]: createPalette({ primary: '#000000', secondary: '#BA9B37', tertiary: '#AAAAAA', backgroundDay: MIDNIGHT_SAND.backgroundDay, backgroundNight: '#121529' }),
  // [ColorPalette.UCFSTAFF]: createPalette({ primary: '#000000', secondary: '#BA9B37', tertiary: '#AAAAAA', backgroundDay: MIDNIGHT_SAND.backgroundDay, backgroundNight: '#121529' }),
  // [ColorPalette.UCF]: createPalette({ primary: '#00704A', secondary: '#27251F', tertiary: '#27251F', backgroundDay: MIDNIGHT_SAND.backgroundDay, backgroundNight: '#121529' }),

  // STARBUCKS
  // Orange, Brown, Magenta
  //
  // 00704A - Green
  // 27251F - Black
  // 27251F - Black
  [COLOR_PALETTE.STARBUCKS]: createPalette({
    primary: '#00704A',
    secondary: '#27251F',
    tertiary: '#27251F',
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: '#121529'
  }),

  // MCDONALDS ... START HERE
  // Orange, Brown, Magenta
  //
  // bd0017 - Red
  // ffc836 - Yellow
  // 264f36 - Green
  [COLOR_PALETTE.MCDONALDS]: createPalette({
    primary: '#bd0017',
    secondary: '#ffc836',
    tertiary: '#264f36',
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: '#121529'
  }),

  // DENNYS ... START HERE
  // Orange, Brown, Magenta
  //
  // EE3338 - Red
  // FFDE24 - Yellow
  // FEC02D - Dark-Yellow
  [COLOR_PALETTE.DENNYS]: createPalette({
    primary: '#EE3338',
    secondary: '#FFDE24',
    tertiary: '#FEC02D',
    backgroundDay: '#ffffff',
    backgroundNight: '#121529'
  }),

  [COLOR_PALETTE.CKN]: createPalette({
    primary: MIDNIGHT_SAND.primary,
    secondary: MIDNIGHT_SAND.secondary,
    tertiary: MIDNIGHT_SAND.tertiary,
    backgroundDay: MIDNIGHT_SAND.backgroundDay,
    backgroundNight: MIDNIGHT_SAND.backgroundNight
  })
}
