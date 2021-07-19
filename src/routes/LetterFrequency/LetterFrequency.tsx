import React, { FC, useState } from 'react'
import { Formik, Form } from 'formik'

import LetterFrequencyForm from './LetterFrequencyForm'
import { countFrequency } from './engine'

const initialValues = {
  input: '',
}

const LetterFrequency: FC = () => {
  const [frequencyList, setFrequencyList] = useState('')
  const onSubmit = (values) => {
    const { input } = values
    const output = countFrequency(input)
    console.log({ output })
    setFrequencyList(
      output
        .sort((a, b) => b.frequency - a.frequency)
        .map(({ grapheme, frequency }) => `${grapheme}\t${frequency}`)
        .join('\n'),
    )
  }
  return (
    <div className="flex items-start">
      <Formik {...{ initialValues, onSubmit }}>
        <Form>
          <LetterFrequencyForm />
        </Form>
      </Formik>

      <div className="ml16">
        <textarea rows={30} cols={30} value={frequencyList} />
      </div>
    </div>
  )
}

export default LetterFrequency
