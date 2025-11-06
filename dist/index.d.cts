import { JSX } from "react";
import * as react_jsx_runtime0 from "react/jsx-runtime";

//#region src/types.d.ts
type FieldOptions = {
  /**
   * Whether to automatically tab to the next field when the current field is filled
   * or to the previous field when deleting from an empty field.
   */
  autoTab?: boolean;
  /**
   * Whether each field is required.
   */
  required?: boolean;
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
  renderer?: FieldRenderer;
};
type PasscodeProviderOptions = {
  /**
   * The type of characters allowed in each field.
   *
   * Options are:
   * - `text`: only alphabetic characters (a-z, A-Z)
   * - `numeric`: only numeric characters (0-9)
   * - `alphanumeric`: both alphabetic and numeric characters (a-z, A-Z, 0-9)
   */
  type?: PasscodeType;
  /**
   * Default value to autofill the fields.
   */
  defaultValue?: string;
  /**
   * Whether to autofocus the first field on mount.
   */
  autoFocus?: boolean;
  /**
   * Callback fired whenever the passcode is updated.
   *
   * Receives the current passcode as a string and the index of the field that was updated (if applicable).
   */
  onUpdate?: (code: string, index?: number) => void;
};
type PasscodeOptions = FieldOptions & PasscodeProviderOptions & {
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
  fields: Field$1[] | number;
  /**
   * Prefix for the name attribute of each field.
   *
   * Each field's name will be constructed as `<name>[<index>]`, e.g. `code[0]`, `code[1]`
   */
  name?: string;
  /**
   * Prefix for the ID attribute of each field.
   *
   * Each field's ID will be constructed as `<id>-<index>`, e.g. `field-0`, `field-1`
   */
  id?: string;
};
type Field$1 = {
  name?: string;
  id?: string;
};
type PasscodeType = 'text' | 'numeric' | 'alphanumeric';
type FieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type FieldRenderer = React.ComponentType<FieldProps & {
  index: number;
}>;
//#endregion
//#region src/components/Field.d.ts
type Props = FieldProps & FieldOptions & {
  index: number;
  fieldType?: PasscodeType;
};
declare const Field: ({
  index,
  renderer: Renderer,
  type,
  required,
  fieldType,
  autoTab,
  ...props
}: Props) => JSX.Element;
//#endregion
//#region src/components/Passcode.d.ts
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
declare const Passcode: ({
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
}: PasscodeOptions) => react_jsx_runtime0.JSX.Element;
//#endregion
export { Field, Passcode };