import {
  CANVAS_DIMENSION,
  SQUARE_INSET,
  WHEEL_INNER_RADIUS,
  WHEEL_OUTER_RADIUS,
} from './data'
import { rybToRgb, setPixel } from '@routes/ColorManagement/utils'

const getOffset = (coordinate: number[]): number[] => {
  const [x, y] = coordinate
  return [x - CANVAS_DIMENSION / 2, y - CANVAS_DIMENSION / 2]
}

const getDistance = (coordinate: number[]): number => {
  const [x, y] = getOffset(coordinate)
  const squareDistance = x ** 2 + y ** 2
  return squareDistance ** 0.5
}
const getAngle = (coordinate: number[]): number => {
  const [x, y] = getOffset(coordinate)
  const angleRad = Math.atan2(y, x) + Math.PI
  return (angleRad * 360) / Math.PI / 2
}

const getCursorPosition = (
  canvas: HTMLDivElement,
  event: MouseEvent,
): number[] => {
  const rect = canvas.getBoundingClientRect()
  return [event.clientX - rect.left, event.clientY - rect.top]
}

const renderHuePointer = (
  slider: CanvasRenderingContext2D,
  hue: number,
): void => {
  const angle = (((hue % 360) - 180) / 180) * Math.PI
  const distanceFromPole = CANVAS_DIMENSION * 0.445
  const offset = CANVAS_DIMENSION / 2

  const x = Math.cos(angle) * distanceFromPole + offset
  const y = Math.sin(angle) * distanceFromPole + offset

  const radius = 15
  slider.clearRect(0, 0, CANVAS_DIMENSION, CANVAS_DIMENSION)
  slider.lineWidth = 3
  slider.beginPath()
  slider.arc(x, y, radius, 0, Math.PI * 2)
  slider.stroke()
}

const renderSvPointer = (
  slider: CanvasRenderingContext2D,
  saturation: number,
  value: number,
): void => {
  const squareSize = CANVAS_DIMENSION - SQUARE_INSET * 2
  const x = (saturation / 360) * squareSize + SQUARE_INSET
  const y = (value / 360) * squareSize + SQUARE_INSET

  const radius = 15
  slider.clearRect(0, 0, CANVAS_DIMENSION, CANVAS_DIMENSION)
  slider.lineWidth = 3
  slider.strokeStyle = value < 180 ? 'white' : 'black'
  slider.beginPath()
  slider.arc(x, y, radius, 0, Math.PI * 2)
  slider.stroke()
}

const renderSquare = (
  square: CanvasRenderingContext2D,
  angle: number,
): void => {
  const pixels: Uint8ClampedArray = new Uint8ClampedArray(
    CANVAS_DIMENSION * CANVAS_DIMENSION * 4,
  )
  const squareSize = CANVAS_DIMENSION - SQUARE_INSET * 2

  for (let x = 0; x < squareSize; x++) {
    for (let y = 0; y < squareSize; y++) {
      const h = rybToRgb(angle)
      const s = (x / squareSize) * 360
      const v = (y / squareSize) * 360

      const coordinate = { x: x + SQUARE_INSET, y: y + SQUARE_INSET }
      const color = { h, s, v }

      setPixel(pixels, CANVAS_DIMENSION, coordinate, color)
    }
  }

  const imageData = new ImageData(pixels, CANVAS_DIMENSION, CANVAS_DIMENSION)
  square.putImageData(imageData, 0, 0)
}

const renderWheel = (wheel: CanvasRenderingContext2D): void => {
  const pixels: Uint8ClampedArray = new Uint8ClampedArray(
    CANVAS_DIMENSION * CANVAS_DIMENSION * 4,
  )

  for (let x = 0; x < CANVAS_DIMENSION; x++) {
    for (let y = 0; y < CANVAS_DIMENSION; y++) {
      const distance = getDistance([x, y])
      if (distance > WHEEL_OUTER_RADIUS || distance < WHEEL_INNER_RADIUS) {
        continue
      }

      const angleDeg = getAngle([x, y])
      const h = rybToRgb(angleDeg)

      const coordinate = { x, y }
      const color = { h, s: 360, v: 360 }

      setPixel(pixels, CANVAS_DIMENSION, coordinate, color)
    }
  }

  const imageData = new ImageData(pixels, CANVAS_DIMENSION, CANVAS_DIMENSION)
  wheel.putImageData(imageData, 0, 0)
}

export {
  getDistance,
  getAngle,
  getCursorPosition,
  rybToRgb,
  renderWheel,
  renderSquare,
  renderHuePointer,
  renderSvPointer,
}
