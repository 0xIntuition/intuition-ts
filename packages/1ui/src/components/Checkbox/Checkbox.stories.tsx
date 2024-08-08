import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
  render: (args) => <Checkbox {...args} />,
}

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
}

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}

export const WithLabel: Story = {
  args: {
    checked: false,
    disabled: false,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}
