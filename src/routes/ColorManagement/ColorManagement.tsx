import React, { FC, useState, ChangeEventHandler } from 'react'
import { rybStyle } from './style'

import Wheel from './components/Wheel'
import Square from './components/Square'
import CursorHandler from './components/CursorHandler'

const RYB: FC = () => {
  const [hsv, setHsv] = useState([0, 360, 360])
  const [h, s, v] = hsv

  const updateHsv =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      let value = +event.target.value
      if (value > 360) {
        value = 360
      }
      if (value < 0) {
        value = 0
      }
      const newHsv = [...hsv]
      newHsv[index] = value
      setHsv(newHsv)
    }

  return (
    <div className={rybStyle}>
      <h1>RYB Wheel</h1>
      <div className="flex items-start">
        <div className="wrapper">
          <Wheel {...{ hsv, setHsv }} />
          <Square {...{ hsv, setHsv }} />
          <CursorHandler {...{ hsv, setHsv }} />
        </div>
        <div>
          <p>
            H: <input value={h} type="text" onChange={updateHsv(0)} />
          </p>
          <p>
            S: <input value={s} type="text" onChange={updateHsv(1)} />
          </p>
          <p>
            V: <input value={v} type="text" onChange={updateHsv(2)} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default RYB
