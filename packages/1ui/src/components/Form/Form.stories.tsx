import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../Button'
import { Input } from '../Input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './Form'

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
}

export default meta

type Story = StoryObj<typeof Form>

// Create a schema for form validation
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

// Example story showing a complete form implementation
export const BasicUsage: Story = {
  render: () => {
    // We need to use a function component here to use hooks
    function FormDemo() {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: '',
          email: '',
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }

      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[400px]"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <div className="min-h-[20px]">
                    {fieldState.error ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <div className="min-h-[20px]">
                    {fieldState.error ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        We'll never share your email with anyone else.
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
    }

    return <FormDemo />
  },
}

// Example showing form validation errors
export const WithValidationErrors: Story = {
  render: () => {
    function FormWithErrors() {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: '',
          email: 'invalid-email',
        },
      })

      return (
        <Form {...form}>
          <form className="space-y-6 w-[400px]">
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <div className="min-h-[20px]">
                    {fieldState.error ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <div className="min-h-[20px]">
                    {fieldState.error ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        We'll never share your email with anyone else.
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
    }

    return <FormWithErrors />
  },
}
