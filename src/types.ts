export type FieldOptions = {
  /**
   * Whether to automatically tab to the next field when the current field is filled
   * or to the previous field when deleting from an empty field.
   */
  autoTab?: boolean

  /**
   * Whether each field is required.
   */
  required?: boolean

  /**
   * Custom renderer for each field to give more control over the input appearance.
   *
   * You can pass in a React component that receives all standard input props
   * along with an additional `index` prop indicating the field's position.
   *
   * Example:
   * ```tsx
   * const CustomInput = ({ index, ...inputProps }: FieldPropsWithIndex) => {
   *   return (
   *     <div className="custom-class">
   *       <input
   *         {...inputProps }
   *         type="tel"
   *       />
   *     </div>
   *   )
   * }
   *
   * <Passcode
   *   fields={4}
   *   renderer={CustomInput} // render with custom component
   * />
   * ```
   *
   */
  renderer?: FieldRenderer
}

export type PasscodeProviderOptions = {
  /**
   * The type of characters allowed in each field.
   *
   * Options are:
   * - `text`: only alphabetic characters (a-z, A-Z)
   * - `numeric`: only numeric characters (0-9)
   * - `alphanumeric`: both alphabetic and numeric characters (a-z, A-Z, 0-9)
   */
  type?: PasscodeType

  /**
   * Default value to autofill the fields.
   */
  defaultValue?: string
  /**
   * Whether to autofocus the first field on mount.
   */
  autoFocus?: boolean

  /**
   * Callback fired whenever the passcode is updated.
   *
   * Receives the current passcode as a string and the index of the field that was updated (if applicable).
   */
  onUpdate?: (code: string, index?: number) => void
}

export type PasscodeOptions = FieldOptions &
  PasscodeProviderOptions & {
    /**
     * Pass a number to automatically build the fields, or pass an array of
     * field configurations consisting in this format.
     * ```
     * [
     *   {
     *     // optional
     *     name: 'user_passcode', // appends [index] automatically, e.g. user_passcode[0], user_passcode[1]
     *
     *     // also optional
     *     id: 'passcode' // optional id, same as name regarding index appending, e.g. passcode-0, passcode-1
     *   }
     * ]
     * ```
     */
    fields: Field[] | number

    /**
     * Prefix for the name attribute of each field.
     *
     * Each field's name will be constructed as `<name>[<index>]`, e.g. `code[0]`, `code[1]`
     */
    name?: string

    /**
     * Prefix for the ID attribute of each field.
     *
     * Each field's ID will be constructed as `<id>-<index>`, e.g. `field-0`, `field-1`
     */
    id?: string
  }

export type Field = {
  name?: string
  id?: string
}

export type PasscodeType = 'text' | 'numeric' | 'alphanumeric'

export type FieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type FieldPropsWithIndex = FieldProps & { index: number }

export type FieldRenderer = React.ComponentType<FieldProps & { index: number }>
