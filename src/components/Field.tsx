import { type JSX, useEffect, useRef } from 'react'
import { hasValidCharacters, removeInvalidCharacters } from '../libs/helpers'
import type { FieldOptions, FieldProps, PasscodeType } from '../types'
import { usePasscode } from './Context'

type Props = FieldProps &
  FieldOptions & {
    index: number
    fieldType?: PasscodeType
  }

const patternsByType: Record<PasscodeType, string> = {
  alphanumeric: '[a-zA-Z0-9]',
  numeric: '[0-9]',
  text: '[a-zA-Z]',
}

const Field = ({
  index,
  renderer: Renderer,
  type,
  required,
  fieldType,
  autoTab,
  ...props
}: Props): JSX.Element => {
  const fieldRef = useRef<HTMLInputElement>(null)

  const {
    passcode,
    focusedIndex,
    updatePasscode,
    updatePasscodeByIndex,
    setFieldFocus,
  } = usePasscode()

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event

    const isUsingSpecialKeys = event.ctrlKey || event.metaKey || event.altKey
    const isPasting = key === 'v' && isUsingSpecialKeys

    if (isPasting) {
      return
    }

    const isDeleting = key === 'Backspace' || key === 'Delete'
    const isTabbing = key === 'Tab'

    if (!isTabbing && (isDeleting || (fieldType && !isUsingSpecialKeys && !hasValidCharacters(key, fieldType)))) {
      event.preventDefault()
    }

    if (!isDeleting) {
      return
    }

    const value = passcode[index] ?? ''

    if (autoTab !== false && value === '') {
      const newFocusedIndex = Math.max(0, index - 1)
      setFieldFocus(newFocusedIndex)
    }

    if (value !== '') {
      updatePasscodeByIndex(index, '')
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event

    updatePasscodeByIndex(index, value)

    if (autoTab !== false && value !== '') {
      const newFocusedIndex = index + 1
      setFieldFocus(newFocusedIndex)
    }
  }

  const onBlur = () => {
    setFieldFocus(-1)
  }

  const onFocus = () => {
    setFieldFocus(index)
  }

  const onPasteCapture = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const pastedValue = event.clipboardData.getData('text').replace(/\s/g, '')

    if (!fieldType || hasValidCharacters(pastedValue, fieldType)) {
      updatePasscode(pastedValue)
      return
    }

    const updatedPastedValue = removeInvalidCharacters(pastedValue, fieldType)

    updatePasscode(updatedPastedValue)
  }

  useEffect(() => {
    if (fieldRef.current && focusedIndex === index) {
      fieldRef.current?.focus()
    }
  }, [focusedIndex, index])

  const pattern = fieldType ? patternsByType[fieldType] : undefined

  const mergedProps: FieldProps = {
    // default input props
    type: type ?? 'text',
    'aria-label': `Passcode field ${index + 1}`,

    // controlled input props
    ref: fieldRef,
    value: passcode[index] || '',
    required: required ?? true,
    maxLength: 1,
    autoCapitalize: 'off',
    autoCorrect: 'off',
    autoComplete: 'one-time-code',
    spellCheck: false,
    pattern,
    onChange,
    onBlur,
    onKeyDown,
    onFocus,
    onPasteCapture,

    // anything else can be overridden by the input props
    ...props,
  }

  if (Renderer) {
    return (
      <Renderer
        {...mergedProps}
        index={index}
      />
    )
  }

  return (
    <input
      {...mergedProps}
      ref={fieldRef}
    />
  )
}

export default Field
