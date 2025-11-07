# React Custom Passcode

Fully flexible and customisable passcode fields for one-time passcodes.

## Installation

```sh
npm install react-custom-passcode
```

## Usage

To start off with an example of a basic passcode component that renders 4 separate character passcode fields:

```tsx
import { Passcode } from 'react-custom-passcode'

const PasscodeScreen = () => {
  return (
    <Passcode fields={4} />
  )
}
```

## Documentation

The available props are outlined below:

| Prop | Usage | Description
|--|--|--|
| `fields` | `number` or array: `[{ name: string, id: string }]` | Required |
| `defaultValue` | `string` | Autofills the passcode fields |
| `name` | `string` | Prefix with custom name, `[<index>]` will be appended, e.g. `field[0]`
| `id` | `string` | Similar behaviour as `name`, but for the `id` attribute. Appends `-<index>`, e.g. `field-0`
| `renderer` | JSX component | [See below usage on custom styling](#custom-styling)
| `type` | `text`, `numeric`, `alphanumeric` | Restricts the type of characters to be inserted in the fields
| `autoFocus` | `boolean` | Defaults to `false`. If set to `true`, then the first field will be auto-focused.
| `autoTab` | `boolean` | Defaults to `true`. Automatically tabs to the next field when the previous one was filled.
| `required` | `boolean` | Defaults to `true`. Sets the field `required` attribute.
| `onUpdate` | `Function` | Custom callback function. [See below usage on the callback](#passcode-update-callback)

### Custom styling

Since the fields on basic level, come unstyled and are just returned with pure input fields, you may want to introduce some custom wrapping of elements and styling. You can do that by passing a custom `renderer` prop. Example:

```tsx
const CustomInput = ({ index, ...inputProps }: FieldPropsWithIndex) => {
  return (
    <div class="field-wrapper">
      <div className="field-wrapper-inner">
        {/* you should spread in the props that are controlled by the package to avoid losing functionality */}
        <input {...inputProps} className="passcode-field" />
      </div>
    </div>
  )
}

const PasscodeScreen = () => {
  return (
    <Passcode fields={4} renderer={CustomInput} />
  )
}
```

### Passcode update callback

Whenever the passcode fields are updated, or if a paste occurred. The `onUpdate` callback will be invoked with these arguments:

- `code` - `string` - The current passcode as it is
- `index` - `number` or `undefined` - The index of the field that was updated. This will be `undefined` when a paste was done.

Example:

```tsx
const PasscodeScreen = () => {
  return (
    <Passcode fields={4} onUpdate={(code, index) => {
      console.log('Current passcode', code)
    }} />
  )
}
```

### Custom event handlers

The passcode fields have their `onChange`, `onBlur` and `onPasteCapture` handled by the library, if you need to pass in custom event handlers, you can pass in your own handlers. If you do not invoke the original handlers, then you will lose the controlled functionality. Example:

```tsx
const CustomInput = ({ index, ...inputProps }: FieldPropsWithIndex) => {
  return (
    <input {...inputProps} onChange={event => {
      // your own handling
      console.log('onChange was fired')
     
      // Invoke the original onChange handler
      inputProps.onChange(event)
    }} />
  )
}

const PasscodeScreen = () => {
  return (
    <Passcode fields={4} renderer={CustomInput} />
  )
}
```