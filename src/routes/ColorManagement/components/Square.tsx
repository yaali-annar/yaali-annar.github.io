import React, { FC, useEffect, useRef } from 'react'
import { SharedProps, canvasProps } from '../data'
import { renderSquare, renderSvSlider } from '../engine'

const Square: FC<SharedProps> = ({ hsv }: SharedProps) => {
  const squareRef = useRef<HTMLCanvasElement>(null)
  const svSliderRef = useRef<HTMLCanvasElement>(null)

  const [h, s, v] = hsv

  useEffect(() => {
    const square = squareRef.current.getContext('2d')
    renderSquare(square, h)
  }, [h])

  useEffect(() => {
    const svSlider = svSliderRef.current.getContext('2d')
    renderSvSlider(svSlider, s, v)
  }, [s, v])

  return (
    <>
      <canvas ref={squareRef} {...canvasProps}></canvas>
      <canvas ref={svSliderRef} {...canvasProps}></canvas>
    </>
  )
}

export default Square
