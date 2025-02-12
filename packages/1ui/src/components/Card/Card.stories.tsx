import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with form fields would go here</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card>
      <CardContent className="pt-6">
        <p>A simple card with only content.</p>
      </CardContent>
    </Card>
  ),
}

export const CustomStyles: Story = {
  render: () => (
    <Card className="w-[380px] bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>Custom Styled Card</CardTitle>
        <CardDescription className="text-primary-foreground/80">
          This card has custom background and text colors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content with inherited colors</p>
      </CardContent>
    </Card>
  ),
}
