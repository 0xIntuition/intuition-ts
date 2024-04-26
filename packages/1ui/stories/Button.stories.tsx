import React from 'react';
import { StoryObj, Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';

export default {
  title: 'Example/Button',
  component: Button,
} as Meta;

const Template: StoryObj = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Click me',
  onClick: () => alert('Button clicked'),
};
