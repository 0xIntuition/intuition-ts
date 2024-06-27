import { render } from '@testing-library/react'
import { Claim } from 'components/Claim'

import { ClaimStatus } from './components'

describe('ClaimStatus', () => {
  it('should render the MonetaryValue component', () => {
    const { asFragment } = render(
      <ClaimStatus claimsFor={10} claimsAgainst={5}>
        <Claim
          size="sm"
          subject={{
            variant: 'default',
            label: '0xintuition',
          }}
          predicate={{ label: 'is really' }}
          object={{ label: 'cool' }}
        />
      </ClaimStatus>,
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p
          class="text-primary text-lg font-normal"
        >
          0.345 ETH
        </p>
      </DocumentFragment>
    `)
  })
})
