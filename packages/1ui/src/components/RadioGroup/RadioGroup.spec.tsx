import React from 'react'

import { render } from '@testing-library/react'

import { RadioGroup, RadioGroupItem } from '.'
import { Label } from '..'

describe('RadioGroup', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
      </RadioGroup>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          aria-required="false"
          class="grid gap-4"
          dir="ltr"
          role="radiogroup"
          style="outline: none;"
          tabindex="0"
        >
          <div
            class="flex items-center space-x-2"
          >
            <button
              aria-checked="true"
              class="aspect-square h-5 w-5 rounded-full border border-solid border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              data-radix-collection-item=""
              data-state="checked"
              id="option-one"
              role="radio"
              tabindex="-1"
              type="button"
              value="option-one"
            >
              <span
                class="flex items-center justify-center"
                data-state="checked"
              >
                <span
                  class="h-3 w-3 block bg-current rounded-full"
                />
              </span>
            </button>
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="option-one"
            >
              Option One
            </label>
          </div>
          <div
            class="flex items-center space-x-2"
          >
            <button
              aria-checked="false"
              class="aspect-square h-5 w-5 rounded-full border border-solid border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              data-radix-collection-item=""
              data-state="unchecked"
              id="option-two"
              role="radio"
              tabindex="-1"
              type="button"
              value="option-two"
            />
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="option-two"
            >
              Option Two
            </label>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
