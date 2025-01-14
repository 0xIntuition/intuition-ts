import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'

import '@testing-library/jest-dom'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './Form'

interface TestFormValues {
  test: string
}

describe('Form', () => {
  const TestForm = () => {
    const form = useForm<TestFormValues>({
      defaultValues: {
        test: '',
      },
    })

    return (
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="test"
            rules={{ required: 'Field is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Field</FormLabel>
                <FormControl>
                  <input {...field} />
                </FormControl>
                <FormDescription>Test description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  }

  it('renders all form components correctly', () => {
    render(<TestForm />)

    expect(screen.getByText('Test Field')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('applies custom className to form components', () => {
    const { container } = render(
      <Form {...useForm()}>
        <FormItem className="item-class">
          <FormLabel className="label-class">Label</FormLabel>
          <FormControl className="control-class">
            <input />
          </FormControl>
          <FormDescription className="desc-class">Description</FormDescription>
          <FormMessage className="message-class">Error message</FormMessage>
        </FormItem>
      </Form>,
    )

    expect(container.querySelector('.item-class')).toBeInTheDocument()
    expect(container.querySelector('.label-class')).toBeInTheDocument()
    expect(container.querySelector('.control-class')).toBeInTheDocument()
    expect(container.querySelector('.desc-class')).toBeInTheDocument()
    expect(container.querySelector('.message-class')).toBeInTheDocument()
  })

  it('shows error message when form validation fails', async () => {
    const user = userEvent.setup()
    render(<TestForm />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'test')
    await user.clear(input)

    expect(await screen.findByText('Field is required')).toBeInTheDocument()
  })
})
