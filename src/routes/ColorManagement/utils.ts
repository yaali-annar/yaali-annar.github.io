import { Coordinate, HSV, RGB } from '@routes/ColorManagement/types'

const generateRandomColor = (): HSV => ({
  h: Math.floor(Math.random() * 360),
  s: Math.floor(Math.random() * 360),
  v: Math.floor(Math.random() * 360),
})

const encodeColors = (colors: HSV[]): string =>
  colors
    .map(({ h, s, v }) => (h * 361 ** 2 + s * 361 + v).toString(36))
    .join('-')

const decodeColor = (colorString: string): HSV => {
  let colorInteger = Number.parseInt(colorString, 36)
  const v = colorInteger % 361
  colorInteger = (colorInteger - v) / 361
  const s = colorInteger % 361
  const h = (colorInteger - s) / 361
  return { h, s, v }
}

const decodeColors = (input: string): HSV[] => {
  const colors =
    input
      ?.split(/[^a-z0-9]+/)
      .filter((colorString) => !!colorString)
      .map(decodeColor) || []

  if (!colors.length) {
    return [generateRandomColor(), generateRandomColor(), generateRandomColor()]
  }

  return colors
}

const decToHex = (value: number): string => {
  const roundedDec = Math.round(value)
  if (roundedDec > 255) {
    return 'FF'
  }

  return roundedDec.toString(16).padStart(2, '0').toUpperCase()
}

const rgbToHex = ({ r, g, b }: RGB): string =>
  `${decToHex(r)}${decToHex(g)}${decToHex(b)}`

const hexToRgb = (hex: string): RGB => {
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)
  return { r, g, b }
}

const hsvToRgb = ({ h: intH, s: intS, v: intV }: HSV): RGB => {
  let h = (intH % 360) / 360
  const s = intS / 360
  let v = intV / 360

  let rgb = []

  v *= 256

  if (s == 0) {
    rgb = [v, v, v]
  }

  h *= 6

  const f = h - Math.floor(h)

  const p = Math.floor(v * (1 - s))
  const q = Math.floor(v * (1 - s * f))
  const t = Math.floor(v * (1 - s * (1 - f)))

  if (h < 1) {
    rgb = [v, t, p]
  } else if (h < 2) {
    rgb = [q, v, p]
  } else if (h < 3) {
    rgb = [p, v, t]
  } else if (h < 4) {
    rgb = [p, q, v]
  } else if (h < 5) {
    rgb = [t, p, v]
  } else {
    rgb = [v, p, q]
  }

  const [r, g, b] = rgb
  return { r, g, b }
}

const rgbToHsv = (rgb: RGB): HSV => {
  const { r, g, b } = rgb

  let mMax = Math.max(r, g, b)
  const mMin = Math.min(r, g, b)

  let c = mMax - mMin
  let hue
  switch (mMax) {
    case 0:
      hue = 0
    case r:
      hue = ((g - b) / c) % 6
      break
    case g:
      hue = (b - r) / c + 2
      break
    case b:
      hue = (r - g) / c + 4
      break
  }
  hue *= 60

  c /= 255
  mMax /= 255

  const h = Math.round((hue + 360) % 360)
  const s = Math.round((c / mMax) * 360)
  const v = Math.round(mMax * 360)

  return { h, s, v }
}

const rybToRgb = (x: number): number => {
  x = ((x + 120) % 360) - 180
  x /= 60
  x = -(x ** 5) / 120 + x ** 3 * (5 / 24) + x * (4 / 5)
  x *= 30
  x = (x + 390) % 360
  return x
}

const rgbToRyb = (rgbAngle: number): number => {
  let rybAngleCandidate = rgbAngle
  for (let counter = 0; counter < 12; counter++) {
    const calculatedRgbAngle = rybToRgb(rybAngleCandidate)
    rybAngleCandidate += rgbAngle - calculatedRgbAngle
  }
  return rybAngleCandidate
}

const setPixel = (
  pixels: Uint8ClampedArray,
  imageWidth: number,
  coordinate: Coordinate,
  color: HSV,
): void => {
  const { x, y } = coordinate
  const { r, g, b } = hsvToRgb(color)
  const index = (y * imageWidth + x) * 4
  pixels[index] = r
  pixels[index + 1] = g
  pixels[index + 2] = b
  pixels[index + 3] = 255
}

export {
  encodeColors,
  decodeColors,
  generateRandomColor,
  setPixel,
  hexToRgb,
  hsvToRgb,
  rgbToRyb,
  rgbToHsv,
  rybToRgb,
  rgbToHex,
}
