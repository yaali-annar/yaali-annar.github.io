type Frequency = {
  grapheme: string
  frequency: number
}

const countFrequency = (input: string): Frequency[] => {
  console.log({ input })
  const dictionary = input
    .split('')
    .reduce<Record<string, number>>((accumulator, grapheme) => {
      const lastFrequency = accumulator[grapheme] || 0
      return { ...accumulator, [grapheme]: lastFrequency + 1 }
    }, {})

  return Object.entries(dictionary).map(([grapheme, frequency]) => ({
    grapheme,
    frequency,
  }))
}

export { countFrequency }
