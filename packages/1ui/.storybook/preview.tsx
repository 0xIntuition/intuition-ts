import type { Preview } from '@storybook/react';
import { themeDecorator } from './decorators';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: '900',
      values: [
        { name: '950', value: 'hsl(var(--primary-950))' },
        { name: '900', value: 'hsl(var(--primary-900))' },
        { name: '50', value: 'hsl(var(--primary-50))' },
        { name: '100', value: 'hsl(var(--primary-100))' },
      ],
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'paintbrush',
      items: ['dark', 'light'].map((theme) => ({
        value: theme,
        title: `${theme} theme`,
      })), // we can make this more robust when we have more themes
      showName: true,
    },
  },
};

export const decorators = [themeDecorator];

export default preview;
