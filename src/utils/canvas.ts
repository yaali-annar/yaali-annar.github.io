const setPixel = (
  pixels: Uint8ClampedArray,
  imageWidth: number,
  coordinate: number[],
  color: number[],
): void => {
  const [x, y] = coordinate
  const [r, g, b, a = 255] = color
  const index = (y * imageWidth + x) * 4
  pixels[index] = r
  pixels[index + 1] = g
  pixels[index + 2] = b
  pixels[index + 3] = a
}

export { setPixel }
