import { Fragment, useMemo } from 'react'
import type { PasscodeOptions } from '../types'
import { PasscodeProvider } from './Context'
import Field from './Field'

type PasscodeField = {
  name?: string
  id?: string
}

/**
 * Create a passcode input component with multiple fields
 * @param fields - The second color, in hexadecimal format
 * @param [defaultValue] - The default value to autofill the fields
 * @param [name] - The prefix for the name attribute of each field
 * @param [id] - The prefix for the id attribute of each field
 * @param [renderer] - Custom renderer for each field to give more control over the input appearance
 * @param [type] - The type of characters allowed in each field - options are `text`, `numeric`, and `alphanumeric`
 * @param [autoFocus] - Whether to autofocus the first field on mount
 * @param [autoTab] - Whether to automatically tab to the next field when the current field is filled
 * @param [required] - Whether each field is required
 * @return The passcode
 */
const Passcode = ({
  defaultValue,
  fields,
  name,
  id,
  renderer,
  type,
  autoFocus,
  autoTab,
  required,
  onUpdate
}: PasscodeOptions) => {
  const passcodeFields: PasscodeField[] = useMemo(() => {
    if (Array.isArray(fields)) {
      return fields
    }

    return [...Array(fields)].map((_, index) => ({
      name:
        typeof name !== 'undefined' ? `${name}[${index}]` : `code[${index}]`,
      id:
        typeof id !== 'undefined'
          ? `${id}-${index}`
          : `code-${index}`,
    }))
  }, [fields, name, id])

  const totalFields = passcodeFields.length

  return (
    <PasscodeProvider
      totalFields={totalFields}
      type={type}
      defaultValue={defaultValue}
      autoFocus={autoFocus}
      onUpdate={onUpdate}
    >
      {passcodeFields.map((field, index) => (
        <Fragment key={field.id}>
          <Field
            renderer={renderer}
            index={index}
            fieldType={type}
            autoTab={autoTab}
            required={required}
            {...field}
          />
        </Fragment>
      ))}
    </PasscodeProvider>
  )
}

export default Passcode
