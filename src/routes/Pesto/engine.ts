import { PestoComponent, SelectedPestoComponent } from './type'

const calculateCombinations = (components: PestoComponent[]): number =>
  components.reduce<number>(
    (previousCombination: number, { options, mandatory }) =>
      previousCombination * (options.length + (mandatory ? 0 : 1)),
    1,
  )

const translateNumberToCombination = (
  components: PestoComponent[],
  number: number,
): SelectedPestoComponent[] => {
  const result: SelectedPestoComponent[] = []

  let lastNumber = number
  components.forEach(({ name, options: rawOptions, mandatory }) => {
    const options = [...rawOptions]
    if (!mandatory) {
      options.push('None')
    }
    const optionsLength = options.length
    const optionIndex = lastNumber % optionsLength
    result.push({ name, option: options[optionIndex] })

    lastNumber = (lastNumber - optionIndex) / optionsLength
  })
  return result
}

export { calculateCombinations, translateNumberToCombination }
