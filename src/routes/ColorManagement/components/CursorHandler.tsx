import React, { FC, useRef, useState } from 'react'
import {
  CANVAS_DIMENSION,
  SharedProps,
  SQUARE_INSET,
  WHEEL_INNER_RADIUS,
  WHEEL_OUTER_RADIUS,
} from '../data'
import { getAngle, getCursorPosition, getDistance } from '../engine'

const cursorIsInSquare = (coordinate: number[]) => {
  const [x, y] = coordinate
  return (
    x > SQUARE_INSET &&
    x < CANVAS_DIMENSION - SQUARE_INSET &&
    y > SQUARE_INSET &&
    y < CANVAS_DIMENSION - SQUARE_INSET
  )
}

const cursorIsInWheel = (coordinate: number[]) => {
  const distance = getDistance(coordinate)
  return distance < WHEEL_OUTER_RADIUS && distance > WHEEL_INNER_RADIUS
}

const squareSize = CANVAS_DIMENSION - SQUARE_INSET * 2

const CursorHandler: FC<SharedProps> = ({ hsv, setHsv }: SharedProps) => {
  const [mouseIsDown, setMouseIsDown] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event) => {
    if (!mouseIsDown) {
      return
    }
    const coordinate = getCursorPosition(cursorRef.current, event)
    const [x, y] = coordinate
    if (cursorIsInSquare(coordinate)) {
      const s = ((x - SQUARE_INSET) / squareSize) * 360
      const v = ((y - SQUARE_INSET) / squareSize) * 360
      const newHsv = [...hsv]
      newHsv[1] = Math.round(s)
      newHsv[2] = Math.round(v)
      setHsv(newHsv)
    }

    if (cursorIsInWheel(coordinate)) {
      const newHsv = [...hsv]
      const h = getAngle(coordinate)
      newHsv[0] = Math.round(h)
      setHsv(newHsv)
    }
  }

  return (
    <div
      ref={cursorRef}
      onMouseDown={() => setMouseIsDown(true)}
      onMouseUp={() => setMouseIsDown(false)}
      onMouseMove={handleMouseMove}
    ></div>
  )
}

export default CursorHandler
