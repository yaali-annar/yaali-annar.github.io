import React, { FC, useEffect, useRef } from 'react'
import { SharedProps, canvasProps } from '../data'
import { renderHueSlider, renderWheel } from '../engine'

const Wheel: FC<SharedProps> = ({ hsv }: SharedProps) => {
  const wheelRef = useRef<HTMLCanvasElement>(null)
  const hueSliderRef = useRef<HTMLCanvasElement>(null)

  const [h] = hsv

  useEffect(() => {
    const wheel = wheelRef.current.getContext('2d')
    renderWheel(wheel)
  }, [])

  useEffect(() => {
    const hueSlider = hueSliderRef.current.getContext('2d')
    renderHueSlider(hueSlider, h)
  }, [h])

  return (
    <>
      <canvas ref={wheelRef} {...canvasProps}></canvas>
      <canvas ref={hueSliderRef} {...canvasProps}></canvas>
    </>
  )
}

export default Wheel
