import React from 'react'
import { render } from '@testing-library/react'
import { Text } from './Text'

describe('Text', () => {
  it('should render appropriate element and classes when given no props', () => {
    const { asFragment } = render(<Text>Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <p
        class="text-primary text-[0.875rem] font-normal"
      >
        Text
      </p>
    </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for variant `heading1`', () => {
    const { asFragment } = render(<Text variant="heading1">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <h1
          class="text-primary text-[3.75rem] font-normal"
        >
          Text
        </h1>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for variant `heading2`', () => {
    const { asFragment } = render(<Text variant="heading2">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <h2
          class="text-primary text-[3.125rem] font-normal"
        >
          Text
        </h2>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for variant `heading3`', () => {
    const { asFragment } = render(<Text variant="heading3">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <h3
          class="text-primary text-[2.5rem] font-normal"
        >
          Text
        </h3>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for variant `heading4`', () => {
    const { asFragment } = render(<Text variant="heading4">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <h4
          class="text-primary text-[1.875rem] font-normal"
        >
          Text
        </h4>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for variant `heading5`', () => {
    const { asFragment } = render(<Text variant="heading5">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <h5
          class="text-primary text-[1.5rem] font-normal"
        >
          Text
        </h5>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for variant `headline`', () => {
    const { asFragment } = render(<Text variant="headline">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <h6
          class="text-primary text-[1.25rem] font-normal"
        >
          Text
        </h6>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for variant `bodyLarge`', () => {
    const { asFragment } = render(<Text variant="bodyLarge">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <h7
          class="text-primary text-[1rem] font-normal"
        >
          Text
        </h7>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for variant `body`', () => {
    const { asFragment } = render(<Text variant="body">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-primary text-[0.875rem] font-normal"
        >
          Text
        </p>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for variant `caption`', () => {
    const { asFragment } = render(<Text variant="caption">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-primary text-[0.75rem] font-normal"
        >
          Text
        </p>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for variant `footnote`', () => {
    const { asFragment } = render(<Text variant="footnote">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-primary text-[0.75rem] font-normal"
        >
          Text
        </p>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for variant `small`', () => {
    const { asFragment } = render(<Text variant="small">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-primary text-[0.625rem] font-normal"
        >
          Text
        </p>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for weight `semibold`', () => {
    const { asFragment } = render(<Text weight="semibold">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-primary text-[0.875rem] font-semibold"
        >
          Text
        </p>
      </DocumentFragment>
    `)
  })

  it('should render appropriate element and classes for weight `bold`', () => {
    const { asFragment } = render(<Text weight="bold">Text</Text>)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-primary text-[0.875rem] font-bold"
        >
          Text
        </p>
      </DocumentFragment>
    `)
  })
})
