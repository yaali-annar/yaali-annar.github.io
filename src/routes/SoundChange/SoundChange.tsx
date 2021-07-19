import React, { FC, useState } from 'react'
import { Formik, Form } from 'formik'
import { Helmet } from 'react-helmet-async'

import SoundChangeForm from './SoundChangeForm'
import { applyRules, compileRules } from './engine'
import { initialValues } from './data'
import { countFrequency } from '@routes/LetterFrequency/engine'

const SoundChange: FC = () => {
  const [result, setResult] = useState('')
  const [frequencyList, setFrequencyList] = useState('')

  const onSubmit = (values) => {
    const { rules, input, nullMarker } = values
    const compiledRules = compileRules(rules, nullMarker)

    console.log({ compiledRules })

    const output = input
      .split(/[\r\n]+/)
      .map((line) =>
        line
          .split(/\t/)
          .map((word) => applyRules(word, compiledRules))
          .join('\t'),
      )
      .join('\n')
    setResult(output)

    const newFrequency = countFrequency(output)
    setFrequencyList(
      newFrequency
        .sort((a, b) => b.frequency - a.frequency)
        .map(({ grapheme, frequency }) => `${grapheme}\t${frequency}`)
        .join('\n'),
    )
  }

  return (
    <div className="flex items-start">
      <Helmet>
        <title>Sound Change</title>
      </Helmet>
      <Formik {...{ initialValues, onSubmit }}>
        <Form>
          <SoundChangeForm />
        </Form>
      </Formik>

      <div className="ml16 flex column">
        <label>Output</label>
        <textarea rows={30} cols={30} value={result} />
      </div>

      <div className="ml16 flex column">
        <label>Frequency</label>
        <textarea rows={30} cols={30} value={frequencyList} />
      </div>
    </div>
  )
}

export default SoundChange
