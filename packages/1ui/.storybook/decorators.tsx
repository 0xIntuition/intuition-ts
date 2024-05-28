/**
 * Storybook Theme Decorators
 *
 * This file contains the decorators we use for the UI Storybook instance.
 */
import React, { FC, useLayoutEffect } from 'react'

import { Decorator } from '@storybook/react'

/**
 * Makes sure the app theme changes by running an effect on the provided theme prop.
 * Once changed, the theme prop is applied to the <html> element using the data-theme attribute.
 * This is for internal usage only and it's used in the 'themeDecorator' function
 */
const ThemeChanger: FC<{ theme: string }> = ({ theme }) => {
  useLayoutEffect(() => {
    if (theme) {
      // @ts-ignore
      window.document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  return null
}

/**
 * A decorator function for Storybook that ensures the selected theme is
 * passed down to the ThemeChanger component
 */
export const themeDecorator: Decorator = (Story, context) => {
  const theme: string = context.parameters.theme || context.globals.theme
  return (
    <>
      <ThemeChanger theme={theme} />
      <Story />
    </>
  )
}
