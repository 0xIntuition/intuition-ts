import React from 'react'

import { render } from '@testing-library/react'

import {
  RadioGroup,
  RadioGroupDivider,
  RadioGroupItem,
  RadioGroupItemContainer,
  RadioGroupItemLabel,
} from '.'

describe('RadioGroup', () => {
  it('should render appropriate element', () => {
    const radioGroupData = [
      { id: 'minimum', value: 'Minimum', subValue: '+0.001 ETH' },
      { id: 'default', value: 'Default', subValue: '+0.01 ETH' },
      { id: 'strong', value: 'Strong', subValue: '+0.05 ETH' },
    ]

    const numberOfRadioGroupItems = radioGroupData.length
    const { asFragment } = render(
      <RadioGroup defaultValue={radioGroupData[0].id}>
        {radioGroupData.map((item, index) => (
          <div key={index}>
            <RadioGroupItemContainer>
              <RadioGroupItemLabel
                htmlFor={item.id}
                value={item.value}
                subValue={item.subValue}
              />
              <RadioGroupItem value={item.id} id={item.id} />
            </RadioGroupItemContainer>
            {index + 1 < numberOfRadioGroupItems && <RadioGroupDivider />}
          </div>
        ))}
      </RadioGroup>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          aria-required="false"
          class="grid bg-primary/5 border border-border/10 rounded-lg w-full"
          dir="ltr"
          role="radiogroup"
          style="outline: none;"
          tabindex="0"
        >
          <div>
            <div
              class="px-5 py-4 flex justify-between items-center w-full gap-10"
            >
              <label
                class="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                for="minimum"
              >
                Minimum
                <span
                  class="text-sm text-foreground/30"
                >
                  +0.001 ETH
                </span>
              </label>
              <button
                aria-checked="true"
                class="aspect-square h-5 w-5 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                data-radix-collection-item=""
                data-state="checked"
                id="minimum"
                role="radio"
                tabindex="-1"
                type="button"
                value="minimum"
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
            </div>
            <span
              class="w-full h-px block bg-gradient-to-r from-border/5 from-10% via-border/20 via-50% to-border/5 to-90%"
            />
          </div>
          <div>
            <div
              class="px-5 py-4 flex justify-between items-center w-full gap-10"
            >
              <label
                class="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                for="default"
              >
                Default
                <span
                  class="text-sm text-foreground/30"
                >
                  +0.01 ETH
                </span>
              </label>
              <button
                aria-checked="false"
                class="aspect-square h-5 w-5 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                data-radix-collection-item=""
                data-state="unchecked"
                id="default"
                role="radio"
                tabindex="-1"
                type="button"
                value="default"
              />
            </div>
            <span
              class="w-full h-px block bg-gradient-to-r from-border/5 from-10% via-border/20 via-50% to-border/5 to-90%"
            />
          </div>
          <div>
            <div
              class="px-5 py-4 flex justify-between items-center w-full gap-10"
            >
              <label
                class="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                for="strong"
              >
                Strong
                <span
                  class="text-sm text-foreground/30"
                >
                  +0.05 ETH
                </span>
              </label>
              <button
                aria-checked="false"
                class="aspect-square h-5 w-5 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                data-radix-collection-item=""
                data-state="unchecked"
                id="strong"
                role="radio"
                tabindex="-1"
                type="button"
                value="strong"
              />
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
