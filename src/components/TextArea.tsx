import React, { FC, useRef } from 'react'
import { useField } from 'formik'

type TextAreaProps = {
  rows: number
  cols: number
  allowTab: boolean
  name: string
}

const defaultTextArea = { selectionStart: 0, selectionEnd: 0, value: '' }

const TextArea: FC<TextAreaProps> = ({
  allowTab,
  name,
  rows,
  cols,
}: TextAreaProps) => {
  const ref = useRef()
  const [field] = useField({ name })

  const onKeyDown = (event) => {
    if (!allowTab || event.key !== 'Tab') {
      return
    }
    event.preventDefault()

    const textArea = ref.current || defaultTextArea
    const start = textArea.selectionStart
    const end = textArea.selectionEnd

    const value = textArea.value
    const newValue = value.substring(0, start) + '\t' + value.substring(end)

    textArea.value = newValue
    textArea.selectionStart = start + 1
    textArea.selectionEnd = start + 1
  }

  const props = { rows, cols }

  return <textarea onKeyDown={onKeyDown} {...field} {...props} ref={ref} />
}

export default TextArea
