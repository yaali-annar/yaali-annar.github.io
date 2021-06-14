import React, { FC } from 'react'

import { useColors } from '../context'
import { generateRandomColor } from '../utils'
import ColorRow from './ColorRow'

const ColorTable: FC = () => {
  const { colors, addColor } = useColors()

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Hue</td>
            <td>Saturation</td>
            <td>Value</td>
            <td>Hex</td>
            <td>Color</td>
            <td>
              <button onClick={() => addColor(generateRandomColor())}>+</button>
            </td>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, colorIndex) => (
            <>
              <ColorRow key={colorIndex} {...{ color, colorIndex }} />
            </>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ColorTable
