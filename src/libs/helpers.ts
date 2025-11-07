import type { PasscodeType } from '../types'

export const hasValidCharacters = (
  value: string,
  type?: PasscodeType,
): boolean => {
  switch (type) {
    case 'numeric':
      return /^[0-9]$/.test(value)
    case 'text':
      return /^[a-z]$/i.test(value)
    case 'alphanumeric':
      return /^[a-z0-9]$/i.test(value)
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
      return value.replace(/[^a-z]/gi, '')
    case 'alphanumeric':
      return value.replace(/[^a-z0-9]/gi, '')
    default:
      return value
  }
}
