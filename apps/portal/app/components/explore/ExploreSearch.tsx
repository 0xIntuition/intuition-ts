import * as React from 'react'

import { IdentityPresenter } from '@0xintuition/api'

import { ExploreSearchClaimInput } from './ExploreSearchClaimInput'
import { ExploreSearchInput } from './ExploreSearchInput'

export interface ExploreSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'user' | 'identity' | 'claim' | 'tag'
  identities?: IdentityPresenter[]
}

const ExploreSearch = ({
  variant,
  identities,
  ...props
}: ExploreSearchProps) => {
  return (
    <div className="min-w-96 flex flex-col items-center" {...props}>
      {['user', 'identity', 'tag'].includes(variant) && (
        // TODO: Alexander to adds the Tags component with ComboBox here ENG-2574
        <ExploreSearchInput searchParam={variant} />
      )}

      {variant === 'claim' && (
        <ExploreSearchClaimInput identities={identities} />
      )}
    </div>
  )
}

export { ExploreSearch }
