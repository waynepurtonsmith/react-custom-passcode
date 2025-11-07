import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Passcode from '../src/components/Passcode'
import type { FieldPropsWithIndex } from '../src/types'

describe('Passcode', () => {
  afterEach(() => {
    vi.clearAllMocks
  })

  describe('rendering', () => {
    it('render with the defaults and matches the snapshot', () => {
      const { container } = render(<Passcode fields={4} />)
      expect(container).toMatchSnapshot()
    })

    it('render with the custom fields and matches the snapshot', () => {
      const { container } = render(
        <Passcode
          fields={[
            {
              name: 'first-name',
              id: 'first-id',
            },
            {
              name: 'second-name',
              id: 'second-id',
            },
          ]}
        />,
      )

      expect(container).toMatchSnapshot()
    })

    it('render with the other options and matches the snapshot', () => {
      const { container } = render(
        <Passcode
          fields={4}
          defaultValue="1234"
          type="alphanumeric"
        />,
      )

      expect(container).toMatchSnapshot()
    })

    it('renders with the custom renderer and matches the snapshot', () => {
      const CustomField = ({ index, ...props }: FieldPropsWithIndex) => (
        <div className="passcode-input-wrapper">
          <div className="input-inner-wrapper">
            <input
              {...props}
              type="tel"
              name={`secret-passcode-${index}`}
              id={`input-passcode-${index}`}
              className="passcode-field"
              data-testid="custom-field"
            />
          </div>
        </div>
      )

      const { container } = render(
        <Passcode
          fields={4}
          renderer={CustomField}
          type="numeric"
        />,
      )

      expect(container).toMatchSnapshot()
    })
  })

  describe('interactions', () => {
    it('should handle the typing of the passcode correctly', async () => {
      const onUpdate = vi.fn()

      render(
        <Passcode
          fields={4}
          onUpdate={onUpdate}
        />,
      )

      const user = userEvent.setup()
      const fields = screen.queryAllByRole('textbox')

      // @ts-expect-error: field exists
      fields[0].focus()

      expect(fields[0]).toHaveFocus()
      expect(onUpdate).not.toHaveBeenCalled()

      await user.keyboard('5')

      expect(fields[0]).toHaveValue('5')
      expect(fields[1]).toHaveFocus()
      expect(onUpdate).toHaveBeenNthCalledWith(1, '5', 0)

      await user.keyboard('3')

      expect(fields[1]).toHaveValue('3')
      expect(fields[2]).toHaveFocus()
      expect(onUpdate).toHaveBeenNthCalledWith(2, '53', 1)

      await user.keyboard('1')

      expect(fields[2]).toHaveValue('1')
      expect(fields[3]).toHaveFocus()
      expect(onUpdate).toHaveBeenNthCalledWith(3, '531', 2)

      await user.keyboard('0')

      expect(fields[3]).toHaveValue('0')
      expect(onUpdate).toHaveBeenNthCalledWith(4, '5310', 3)
      expect(onUpdate).toHaveBeenCalledTimes(4)
    })

    it('should handle pasting the passcode correctly into a restricted type field; stripping invalid characters from inserting', async () => {
      const onUpdate = vi.fn()

      render(
        <Passcode
          fields={4}
          type="numeric"
          onUpdate={onUpdate}
        />,
      )

      const user = userEvent.setup()
      const fields = screen.queryAllByRole('textbox')

      // @ts-expect-error: field exists
      fields[0].focus()

      expect(fields[0]).toHaveFocus()
      expect(onUpdate).not.toHaveBeenCalled()

      await user.paste('your passcode: 7291 - paste this into your field')

      await waitFor(() => {
        expect(fields[0]).toHaveValue('7')
        expect(fields[1]).toHaveValue('2')
        expect(fields[2]).toHaveValue('9')
        expect(fields[3]).toHaveValue('1')
        expect(onUpdate).toHaveBeenCalledOnce()
        expect(onUpdate).toHaveBeenCalledWith('7291')
      })
    })

    it('should handle deleting the passcode correctly', async () => {
      const onUpdate = vi.fn()

      render(
        <Passcode
          fields={4}
          defaultValue="4567"
          onUpdate={onUpdate}
        />,
      )

      const user = userEvent.setup()
      const fields = screen.queryAllByRole('textbox')

      // @ts-expect-error: field exists
      fields[3].focus()

      expect(fields[3]).toHaveFocus()
      expect(onUpdate).not.toHaveBeenCalled()

      await user.keyboard('{Backspace}')
      expect(fields[3]).toHaveValue('')
      expect(onUpdate).toHaveBeenNthCalledWith(1, '456', 3)

      await user.keyboard('{Backspace}')
      expect(fields[2]).toHaveFocus()

      await user.keyboard('{Backspace}')
      expect(onUpdate).toHaveBeenNthCalledWith(2, '45', 2)
      expect(fields[2]).toHaveValue('')

      await user.keyboard('{Backspace}')
      expect(fields[1]).toHaveFocus()

      await user.keyboard('{Backspace}')
      expect(onUpdate).toHaveBeenNthCalledWith(3, '4', 1)
      expect(fields[1]).toHaveValue('')

      await user.keyboard('{Backspace}')
      expect(fields[0]).toHaveFocus()

      await user.keyboard('{Backspace}')
      expect(onUpdate).toHaveBeenNthCalledWith(4, '', 0)
      expect(fields[0]).toHaveValue('')

      expect(onUpdate).toHaveBeenCalledTimes(4)
    })
  })
})
