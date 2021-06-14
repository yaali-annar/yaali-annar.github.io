import React, {
  FC,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

import { HSV } from './types'
import { decodeColors, encodeColors, generateRandomColor } from './utils'

type ColorsContextFields = {
  colors: HSV[]
  colorsString: string
  selectedIndex: number
  selectedColor: HSV
  setColorsString: (newColorsString: string) => void
  setColor: (newHsv: HSV) => void
  addColor: (newHsv: HSV) => void
  removeColor: (colorIndex: number) => void
  switchColor: (colorIndex1: number, colorIndex2: number) => void
  selectColor: (colorIndex: number) => void
}

type ColorProviderProps = {
  children: ReactElement
}

const ColorsContext = createContext<ColorsContextFields>({
  colors: [generateRandomColor()],
  colorsString: '',
  selectedIndex: 0,
  selectedColor: generateRandomColor(),
  setColorsString: (newColorsString) => console.log(newColorsString),
  setColor: (newColor) => console.log(newColor),
  addColor: (newColor) => console.log(newColor),
  removeColor: (colorIndex) => console.log(colorIndex),
  selectColor: (colorIndex) => console.log(colorIndex),
  switchColor: (colorIndex1, colorIndex2) =>
    console.log(colorIndex1, colorIndex2),
})

const { Provider } = ColorsContext

const ColorProvider: FC<ColorProviderProps> = ({
  children,
}: ColorProviderProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [colorsString, setColorsString] = useState('')

  const colors = decodeColors(colorsString || '')
  const selectedColor = colors[selectedIndex] || colors[0]

  const setColors = useCallback((newColors: HSV[]) => {
    const newColorsString = encodeColors(newColors)
    setColorsString(newColorsString)
  }, [])

  const setColor = useCallback(
    (newColor: HSV) => {
      const newColors = [...colors]
      newColors[selectedIndex] = newColor
      setColors(newColors)
    },
    [colors, selectedIndex, setColors],
  )

  const addColor = useCallback(
    (newColor) => setColors([...colors, newColor]),
    [colors, setColors],
  )

  const removeColor = useCallback(
    (colorIndex) => {
      if (colors.length <= 1) {
        return
      }

      if (selectedIndex >= colors.length - 1) {
        setSelectedIndex(selectedIndex - 1)
      }

      const newColors = [...colors]
      newColors.splice(colorIndex, 1)
      setColors(newColors)
    },
    [colors, setColors, selectedIndex],
  )

  const selectColor = useCallback(
    (colorIndex) => setSelectedIndex(colorIndex),
    [],
  )

  const switchColor = useCallback(
    (index1, index2) => {
      const newColors = [...colors]
      newColors[index1] = colors[index2]
      newColors[index2] = colors[index1]

      setColors(newColors)
    },
    [colors, setColors],
  )

  const value = {
    colors,
    colorsString,
    selectedColor,
    selectedIndex,
    addColor,
    removeColor,
    selectColor,
    setColor,
    setColorsString,
    switchColor,
  }

  return <Provider value={value}>{children} </Provider>
}

const useColors = (): ColorsContextFields => useContext(ColorsContext)

export { ColorProvider, useColors }
