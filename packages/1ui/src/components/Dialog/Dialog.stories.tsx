import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '..'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
}

export default meta

type Story = StoryObj<typeof Dialog>

export const BasicUsage: Story = {
  args: {},
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger>
        <Button size="lg">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}
