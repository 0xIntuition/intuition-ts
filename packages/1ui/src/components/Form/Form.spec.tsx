import React from 'react'

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
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

const TestForm = () => {
  const form = useForm<TestFormValues>({
    defaultValues: {
      test: '',
    },
    mode: 'all',
  })

  const onSubmit = (data: TestFormValues) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <button type="submit">Submit</button>
      </form>
    </Form>
  )
}

const TestFormWithCustomClasses = () => {
  const form = useForm()

  return (
    <Form {...form}>
      <FormItem className="item-class">
        <FormLabel className="label-class">Label</FormLabel>
        <FormControl className="control-class">
          <input />
        </FormControl>
        <FormDescription className="desc-class">Description</FormDescription>
        <FormMessage className="message-class">Error message</FormMessage>
      </FormItem>
    </Form>
  )
}

describe('Form', () => {
  it('renders all form components correctly', () => {
    render(<TestForm />)

    expect(screen.getByText('Test Field')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('applies custom className to form components', () => {
    const { container } = render(<TestFormWithCustomClasses />)

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
    const submitButton = screen.getByRole('button', { name: /submit/i })

    // Type and clear to trigger validation
    await user.type(input, 'test')
    await user.clear(input)
    await user.click(submitButton)

    expect(await screen.findByText('Field is required')).toBeInTheDocument()
  })
})
