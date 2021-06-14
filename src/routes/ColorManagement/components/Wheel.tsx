import React, { FC, useEffect, useRef } from 'react'
import { useColors } from '../context'
import { canvasProps } from '../data'
import { renderHuePointer, renderWheel } from '../engine'

const Wheel: FC = () => {
  const wheelRef = useRef<HTMLCanvasElement>(null)
  const huePointerRef = useRef<HTMLCanvasElement>(null)
  const { selectedColor } = useColors()

  const { h } = selectedColor

  useEffect(() => {
    const wheel = wheelRef.current.getContext('2d')
    renderWheel(wheel)
  }, [])

  useEffect(() => {
    const huePointer = huePointerRef.current.getContext('2d')
    renderHuePointer(huePointer, h)
  }, [h])

  return (
    <>
      <canvas ref={wheelRef} {...canvasProps}></canvas>
      <canvas ref={huePointerRef} {...canvasProps}></canvas>
    </>
  )
}

export default Wheel
