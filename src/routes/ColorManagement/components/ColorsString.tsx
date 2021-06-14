import React, { FC, useState } from 'react'
import { useColors } from '../context'

const ColorsString: FC = () => {
  const { colorsString, setColorsString } = useColors()
  useState(colorsString)

  return (
    <>
      <input
        value={colorsString}
        onChange={(event) => setColorsString(event.target.value)}
      />
    </>
  )
}

export default ColorsString
