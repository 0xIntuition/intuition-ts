import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '..';

const meta = {
  title: 'Atom/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['className', 'style', 'asChild'],
    },
  },
  argTypes: {
    children: { control: 'text' },
    variant: { control: 'select' },
    size: { control: 'select' },
    isLoading: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    children: 'Example Button',
  },
  render: (props) => <Button {...props} />,
};

export const Variants: Story = {
  parameters: {
    controls: {
      exclude: ['className', 'asChild', 'style', 'variant'],
    },
  },
  render: (props) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: '1fr',
        gap: '2rem',
      }}
    >
      <Button variant="default" {...props} children="Default" />
      <Button variant="secondary" {...props} children="Secondary" />
      <Button variant="outline" {...props} children="Outline" />
      <Button variant="ghost" {...props} children="Ghost" />
      <Button variant="link" {...props} children="Link" />
      <Button variant="destructive" {...props} children="Destructive" />
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Hello, there',
  },
  parameters: {
    controls: {
      exclude: ['className', 'asChild', 'style', 'size'],
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm" {...props} />
      <Button size="default" {...props} />
      <Button size="lg" {...props} />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: {
      exclude: ['className', 'children', 'asChild', 'style'],
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Button isLoading variant="default" {...props}>
        isLoading
      </Button>
      <Button disabled variant="default" {...props}>
        disabled
      </Button>
    </div>
  ),
};
