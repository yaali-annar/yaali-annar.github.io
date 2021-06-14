import React, { FC, useEffect, useRef } from 'react'
import { useColors } from '../context'
import { canvasProps } from '../data'
import { renderSquare, renderSvPointer } from '../engine'

const Square: FC = () => {
  const squareRef = useRef<HTMLCanvasElement>(null)
  const svPointerRef = useRef<HTMLCanvasElement>(null)
  const { selectedColor } = useColors()

  const { h, s, v } = selectedColor

  useEffect(() => {
    const square = squareRef.current.getContext('2d')
    renderSquare(square, h)
  }, [h])

  useEffect(() => {
    const svPointer = svPointerRef.current.getContext('2d')
    renderSvPointer(svPointer, s, v)
  }, [s, v])

  return (
    <>
      <canvas ref={squareRef} {...canvasProps}></canvas>
      <canvas ref={svPointerRef} {...canvasProps}></canvas>
    </>
  )
}

export default Square
