import { COLOR_PALETTE, colorPaletteDetails } from '@cknTypes/theme'
import { BASIC_COLORS, type ColorPalette, type ColorsType } from '@cknTypes/theme'

type SelectColors = (colorPalette: ColorPalette) => ColorsType

type useColorsResult = Record<string, SelectColors>

export type GenericPaperTheme<MeasuredType, ColorsType> = {
  roundness: MeasuredType
  colors: ColorsType
}

export const colorPalettes = Object.keys(colorPaletteDetails)

export const useColors = (): useColorsResult => {
  const selectColorsDay: SelectColors = colorPalette => {
    if (!colorPalettes.includes(colorPalette)) {
      return { ...BASIC_COLORS, ...colorPaletteDetails[COLOR_PALETTE.MIDNIGHT_SAND].colorsDay }
    }
    return { ...BASIC_COLORS, ...colorPaletteDetails[colorPalette].colorsDay }
  }

  const selectColorsNight: SelectColors = colorPalette => {
    if (!colorPalettes.includes(colorPalette)) {
      return { ...BASIC_COLORS, ...colorPaletteDetails[COLOR_PALETTE.MIDNIGHT_SAND].colorsNight }
    }
    return { ...BASIC_COLORS, ...colorPaletteDetails[colorPalette].colorsNight }
  }

  return {
    selectColorsNight,
    selectColorsDay
  }
}
