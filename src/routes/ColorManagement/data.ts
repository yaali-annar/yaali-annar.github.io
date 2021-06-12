const CANVAS_DIMENSION = 400
const SQUARE_INSET = CANVAS_DIMENSION * 0.22

const canvasProps = {
  width: CANVAS_DIMENSION,
  height: CANVAS_DIMENSION,
}

const WHEEL_OUTER_RADIUS = CANVAS_DIMENSION * 0.49
const WHEEL_INNER_RADIUS = CANVAS_DIMENSION * 0.4

type SharedProps = {
  hsv?: number[]
  setHsv?: (newHsv: number[]) => void
}

export {
  CANVAS_DIMENSION,
  SQUARE_INSET,
  WHEEL_INNER_RADIUS,
  WHEEL_OUTER_RADIUS,
  SharedProps,
  canvasProps,
}
