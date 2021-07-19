import React, { FC } from 'react'
import { Field } from 'formik'

const LetterFrequencyForm: FC = () => {
  return (
    <div>
      <Field component="textarea" rows={30} cols={30} name="input" />
      <br />
      <button type="submit">Calculate</button>
    </div>
  )
}

export default LetterFrequencyForm
