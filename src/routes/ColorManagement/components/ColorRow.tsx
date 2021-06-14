import React, { FC, ChangeEventHandler, useEffect, useState } from 'react'

import { cx } from '@emotion/css'

import { useColors } from '../context'
import { HSV } from '../types'
import {
  hexToRgb,
  hsvToRgb,
  rgbToHex,
  rgbToHsv,
  rgbToRyb,
  rybToRgb,
} from '../utils'

type HSVComponent = 'h' | 's' | 'v'

type ColorRowProps = {
  color: HSV
  colorIndex: number
}

const hsvComponents: HSVComponent[] = ['h', 's', 'v']

const ColorRow: FC<ColorRowProps> = ({ color, colorIndex }: ColorRowProps) => {
  const {
    colors,
    setColor,
    selectColor,
    selectedIndex,
    removeColor,
    switchColor,
  } = useColors()
  const [hex, setHex] = useState('000000')

  useEffect(() => {
    const { h } = color
    const rgbAngle = rybToRgb(h)
    const rgb = hsvToRgb({ ...color, h: rgbAngle })
    setHex(rgbToHex(rgb))
  }, [color])

  const updateHex = (event) => {
    let newHex = event.target.value
    newHex = newHex.toUpperCase().replace(/[^\dA-F]/, '')
    setHex(newHex)

    if (newHex.length !== 6) {
      return
    }

    const rgb = hexToRgb(newHex)
    const hsv = rgbToHsv(rgb)
    const { h } = hsv
    const rybAngle = rgbToRyb(h)

    setColor({ ...hsv, h: Math.round(rybAngle) })
  }

  const updateHsv =
    (component: HSVComponent): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      let value = +event.target.value
      if (value > 360) {
        value = 360
      }
      if (value < 0) {
        value = 0
      }
      setColor({ ...color, [component]: value })
    }

  const onClick = () => selectColor(colorIndex)

  const className = cx({ selected: selectedIndex === colorIndex })

  return (
    <tr {...{ className }}>
      {hsvComponents.map((hsvComponent, componentIndex) => (
        <td key={componentIndex}>
          <input
            value={color[hsvComponent]}
            type="text"
            onClick={onClick}
            onChange={updateHsv(hsvComponent)}
          />
        </td>
      ))}
      <td>
        <input value={hex} onClick={onClick} onChange={updateHex} type="text" />
      </td>
      <td>
        <div
          className="color-box"
          onClick={onClick}
          style={{ backgroundColor: `#${hex}` }}
        />
      </td>
      <td>
        <div className="flex">
          {colors.length > 1 && (
            <button onClick={() => removeColor(colorIndex)}>x</button>
          )}
          <div className="flex column">
            {colorIndex > 0 && (
              <button onClick={() => switchColor(colorIndex, colorIndex - 1)}>
                ^
              </button>
            )}
            {colorIndex < colors.length - 1 && (
              <button onClick={() => switchColor(colorIndex, colorIndex + 1)}>
                v
              </button>
            )}
          </div>
        </div>
      </td>
    </tr>
  )
}

export default ColorRow
