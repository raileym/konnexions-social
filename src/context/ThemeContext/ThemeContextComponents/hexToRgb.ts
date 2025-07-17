export const hexToRgb = (hex: string): string => {
  // Remove the hash at the beginning if it's there
  hex = hex.replace(/^#/, '')

  // Parse the red, green, and blue values
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // Return the RGB string
  return `rgb(${r}, ${g}, ${b})`
}

