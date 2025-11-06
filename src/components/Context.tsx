import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react'
import { removeInvalidCharacters } from '../libs/helpers'
import type { PasscodeProviderOptions } from '../types'

type Props = PropsWithChildren<PasscodeProviderOptions> & { totalFields: number }

type ContextProps = {
  passcode: string[]
  focusedIndex: number
  setFieldFocus: (index: number) => void
  updatePasscode: (code: string) => void
  updatePasscodeByIndex: (index: number, value: string) => void
}

type Context = PropsWithChildren<ContextProps>

export const PasscodeContext = createContext<Context | undefined>(undefined)

export const PasscodeProvider = ({
  totalFields,
  type,
  defaultValue,
  autoFocus,
  children,
  onUpdate,
}: Props) => {
  const codeValue: string[] =
    typeof defaultValue === 'string'
      ? removeInvalidCharacters(defaultValue, type).slice(0, totalFields).split('')
      : []

  const [currentPasscode, setCurrentPasscode] = useState<string[]>(codeValue)
  const [currentFocusedIndex, setCurrentFocusedIndex] = useState<number>(
    autoFocus && !currentPasscode?.[0]?.length ? 0 : -1,
  )

  const setFieldFocus: ContextProps['setFieldFocus'] = (index) => {
    setCurrentFocusedIndex(index)
  }

  const updatePasscode: ContextProps['updatePasscode'] = (code) => {
    const passcode = code.slice(0, totalFields)
    const codeParts = passcode.split('')

    setCurrentPasscode(codeParts)
    onUpdate?.(passcode)
  }

  const updatePasscodeByIndex: ContextProps['updatePasscodeByIndex'] = (
    index,
    value,
  ) => {
    const newCode = [...currentPasscode]
    newCode[index] = value

    setCurrentPasscode(newCode)
    onUpdate?.(newCode.join(''), index)
  }

  const providerValue: ContextProps = {
    passcode: currentPasscode,
    focusedIndex: currentFocusedIndex,
    setFieldFocus,
    updatePasscode,
    updatePasscodeByIndex,
  }

  return (
    <PasscodeContext.Provider value={providerValue}>
      {children}
    </PasscodeContext.Provider>
  )
}

export const usePasscode = () => {
  const context = useContext(PasscodeContext)

  if (!context) {
    throw new Error('usePasscode must be used within a PasscodeProvider')
  }

  return context
}
