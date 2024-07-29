import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
import type { Preview } from '@storybook/react'

import { themeDecorator } from './decorators'
import DocumentationTemplate from './templates/DocumentationTemplate.mdx'

import '../src/styles/globals.css'
import './global.css'

import { palette } from '../src'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'dark', value: palette.black.base },
        { name: 'light', value: palette.white.base },
      ],
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Documentation', 'Styles', 'Components'],
      },
    },
    docs: {
      page: DocumentationTemplate,
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },
  },
}

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
}

export const decorators = [themeDecorator]

export default preview
