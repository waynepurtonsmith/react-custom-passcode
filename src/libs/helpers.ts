import type { PasscodeType } from './types'

export const hasValidCharacters = (
  value: string,
  type?: PasscodeType,
): boolean => {
  switch (type) {
    case 'numeric':
      return /^[0-9]$/.test(value)
    case 'text':
      return /^[a-zA-Z]$/.test(value)
    case 'alphanumeric':
      return /^[a-zA-Z0-9]$/.test(value)
    default:
      return true
  }
}

export const removeInvalidCharacters = (
  value: string,
  type?: PasscodeType,
): string => {
  switch (type) {
    case 'numeric':
      return value.replace(/[^0-9]/g, '')
    case 'text':
      return value.replace(/[^a-zA-Z]/g, '')
    case 'alphanumeric':
      return value.replace(/[^a-zA-Z0-9]/g, '')
    default:
      return value
  }
}
