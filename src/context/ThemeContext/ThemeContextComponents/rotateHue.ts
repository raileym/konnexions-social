// Define a type for the RGB and HSV arrays for better clarity and type safety
type RGB = [number, number, number]
type HSV = [number, number, number]

export const rotateHue = (hexColor: string, rotation: number): string => {
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