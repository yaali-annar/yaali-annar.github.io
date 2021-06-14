import React, { FC } from 'react'
import { ColorProvider } from './context'

import { rybStyle } from './style'
import Wheel from './components/Wheel'
import Square from './components/Square'
import CursorHandler from './components/CursorHandler'
import ColorTable from './components/ColorTable'
import ColorsString from './components/ColorsString'

const RYB: FC = () => (
  <ColorProvider>
    <div className={rybStyle}>
      <h1 className="mb32 text-center">Color Management</h1>
      <div className="flex items-start justify-center">
        <div>
          <div className="wrapper">
            <Wheel />
            <Square />
            <CursorHandler />
          </div>
          <p className="mt16">This color wheel uses RYB spectrum.</p>
          <ul>
            <li>Red at 0</li>
            <li>Yellow at 120</li>
            <li>Blue at 240</li>
          </ul>
        </div>
        <div className="ml16">
          <ColorsString />
          <ColorTable />
          <p className="mt16">
            Both Saturation and Value ranges from 0 to 360.
          </p>
        </div>
      </div>
    </div>
  </ColorProvider>
)

export default RYB
