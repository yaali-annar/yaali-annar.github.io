import React, { FC, useEffect } from 'react'
import { Field, useFormikContext } from 'formik'
import TextArea from '@components/TextArea'

const SoundChangeForm: FC = () => {
  const { handleSubmit } = useFormikContext()

  useEffect(() => {
    handleSubmit()
  }, [handleSubmit])

  return (
    <div className="flex items-start">
      <div className="flex column items-start">
        <label>Rules</label>
        <TextArea allowTab rows={25} cols={30} name="rules" />
        <div className="mt8">
          <label>Null Marker: </label>
          <Field name="nullMarker" component="select">
            <option value="-">-</option>
            <option value="0">0</option>
          </Field>
        </div>
      </div>

      <div className="flex column items-start ml16">
        <label>Input</label>
        <Field component="textarea" rows={30} cols={30} name="input" />
        <button type="submit" className="mt8">
          Transform
        </button>
      </div>
    </div>
  )
}

export default SoundChangeForm
