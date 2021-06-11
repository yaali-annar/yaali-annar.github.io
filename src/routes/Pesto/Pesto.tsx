import React, { FC, useState, useMemo } from 'react'
import { defaultComponents } from './data'
import { calculateCombinations, translateNumberToCombination } from './engine'
import { SelectedPestoComponent } from './type'

const Pesto: FC<Record<string, never>> = () => {
  const [components, setComponents] = useState(defaultComponents)
  const [skip, setSkip] = useState(13757)

  const [newOption, setNewOption] = useState('')
  const [temporarySkip, setTemporarySkip] = useState(13757)
  const [additionIndex, setAdditionIndex] = useState(-1)

  const changeMandatory = (componentIndex: number) => {
    const newComponents = [...components]
    newComponents[componentIndex].mandatory =
      !newComponents[componentIndex].mandatory
    setComponents(newComponents)
  }

  const numberOfCombinations = useMemo(
    () => calculateCombinations(components),
    [components],
  )

  const addOption = () => {
    const newComponents = [...components]
    newComponents[additionIndex].options.push(newOption)
    setComponents(newComponents)
    setNewOption('')
    setAdditionIndex(-1)
  }

  const selectedCombinations: SelectedPestoComponent[][] = useMemo(() => {
    const output: SelectedPestoComponent[][] = []
    for (let counter = 0; counter < 100; counter++) {
      const number = (counter * skip) % numberOfCombinations
      output.push(translateNumberToCombination(components, number))
    }
    return output
  }, [components, numberOfCombinations, skip])

  const [firstCombo] = selectedCombinations
  const headerTexts = firstCombo.map(({ name }) => name)

  return (
    <div>
      <h1>Pesto Scheduler</h1>

      <div className="flex items-start">
        <div>
          <h2 className="mb16">Components</h2>
          <p>Total Combinations: {calculateCombinations(components)}</p>
          {components.map(({ name, mandatory, options }, componentIndex) => (
            <>
              <h3>
                {name}{' '}
                {additionIndex !== componentIndex && (
                  <a
                    onClick={() => {
                      setNewOption('')
                      setAdditionIndex(componentIndex)
                    }}
                  >
                    +
                  </a>
                )}
              </h3>
              <p>
                Mandatory:{' '}
                <input
                  type="checkbox"
                  checked={mandatory}
                  onChange={() => changeMandatory(componentIndex)}
                ></input>{' '}
              </p>
              <ul>
                {options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
                {additionIndex === componentIndex && (
                  <li>
                    <input
                      type="text"
                      value={newOption}
                      onChange={(event) => setNewOption(event.target.value)}
                    />
                    <p>
                      <button onClick={addOption}>Add</button>{' '}
                      <button
                        onClick={() => {
                          setNewOption('')
                          setAdditionIndex(-1)
                        }}
                      >
                        Cancel
                      </button>
                    </p>
                  </li>
                )}
              </ul>
            </>
          ))}
        </div>
        <div className="ml32">
          <h2 className="mb16">Schedule</h2>
          <p>
            Skip Number:{' '}
            <input
              value={temporarySkip}
              onChange={(event) => setTemporarySkip(+event.target.value)}
            ></input>
            <button onClick={() => setSkip(temporarySkip)}>Apply</button>
          </p>
          <p>
            For skip number, use a primary number near to 85% of the number of
            total combinations ({Math.round(numberOfCombinations * 0.85)})
          </p>
          <table className="mt16">
            <thead>
              <tr>
                <td>
                  <b>Week</b>
                </td>
                {headerTexts.map((headerText, index) => (
                  <td key={index} className="p4">
                    <b>{headerText}</b>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedCombinations.map((combination, combinationIndex) => (
                <tr key={combinationIndex}>
                  <td>{combinationIndex + 1} </td>
                  {headerTexts.map((headerText, componentIndex) => {
                    const component = combination.find(
                      ({ name }) => name === headerText,
                    )
                    return (
                      <td key={componentIndex} className="p4">
                        {component.option}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Pesto
