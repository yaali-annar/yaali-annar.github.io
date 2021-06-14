import React, { FC, useRef, useState } from 'react'
import { useColors } from '../context'
import {
  CANVAS_DIMENSION,
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

const CursorHandler: FC = () => {
  const [mouseIsDown, setMouseIsDown] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const { selectedColor, setColor } = useColors()

  const handleMouseMove = (event) => {
    if (!mouseIsDown) {
      return
    }
    const coordinate = getCursorPosition(cursorRef.current, event)
    const [x, y] = coordinate
    if (cursorIsInSquare(coordinate)) {
      let s = ((x - SQUARE_INSET) / squareSize) * 360
      let v = ((y - SQUARE_INSET) / squareSize) * 360
      s = Math.round(s)
      v = Math.round(v)

      const newColor = { ...selectedColor, s, v }
      setColor(newColor)
    }

    if (cursorIsInWheel(coordinate)) {
      let h = getAngle(coordinate)
      h = Math.round(h)

      const newColor = { ...selectedColor, h }
      setColor(newColor)
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
