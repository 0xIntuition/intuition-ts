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
          class="grid bg-primary/5 theme-border rounded-lg w-full"
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
                class="aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5 w-5"
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
                    class="block bg-current rounded-full h-3 w-3"
                  />
                </span>
              </button>
            </div>
            <span
              class="w-full h-px block in-out-gradient"
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
                class="aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5 w-5"
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
              class="w-full h-px block in-out-gradient"
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
                class="aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-5 w-5"
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
  it('should render appropriate element', () => {
    const radioGroupData = [
      { id: 'minimum', value: 'Minimum' },
      { id: 'default', value: 'Default' },
      { id: 'strong', value: 'Strong' },
    ]

    const { asFragment } = render(
      <RadioGroup variant="simple" defaultValue={radioGroupData[0].id}>
        {radioGroupData.map((item, index) => (
          <div key={index}>
            <RadioGroupItemContainer variant="simple">
              <RadioGroupItem size="small" value={item.id} id={item.id} />
              <RadioGroupItemLabel htmlFor={item.id} value={item.value} />
            </RadioGroupItemContainer>
          </div>
        ))}
      </RadioGroup>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          aria-required="false"
          class="flex gap-4"
          dir="ltr"
          role="radiogroup"
          style="outline: none;"
          tabindex="0"
        >
          <div>
            <div
              class="flex gap-2"
            >
              <button
                aria-checked="true"
                class="aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-4 w-4"
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
                    class="block bg-current rounded-full h-2 w-2"
                  />
                </span>
              </button>
              <label
                class="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                for="minimum"
              >
                Minimum
              </label>
            </div>
          </div>
          <div>
            <div
              class="flex gap-2"
            >
              <button
                aria-checked="false"
                class="aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-4 w-4"
                data-radix-collection-item=""
                data-state="unchecked"
                id="default"
                role="radio"
                tabindex="-1"
                type="button"
                value="default"
              />
              <label
                class="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                for="default"
              >
                Default
              </label>
            </div>
          </div>
          <div>
            <div
              class="flex gap-2"
            >
              <button
                aria-checked="false"
                class="aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-4 w-4"
                data-radix-collection-item=""
                data-state="unchecked"
                id="strong"
                role="radio"
                tabindex="-1"
                type="button"
                value="strong"
              />
              <label
                class="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                for="strong"
              >
                Strong
              </label>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})
