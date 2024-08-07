import { render } from '@testing-library/react'

import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('should render appropriate element', () => {
    const { asFragment } = render(<Checkbox />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          aria-checked="false"
          class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          data-state="unchecked"
          role="checkbox"
          type="button"
          value="on"
        />
      </DocumentFragment>
    `)
  })
})
