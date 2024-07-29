import * as React from 'react'

import { IdentityPresenter } from '@0xintuition/api'

import { ExploreSearchClaimInput } from './ExploreSearchClaimInput'
import { ExploreSearchForm } from './ExploreSearchForm/ExploreSearchForm'

export interface ExploreSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'user' | 'identity' | 'claim' | 'tag' | 'list'
  identities?: IdentityPresenter[]
}

const ExploreSearch: React.FC<ExploreSearchProps> = ({
  variant,
  identities,
  ...props
}: ExploreSearchProps) => {
  return (
    <div className="w-2/3 flex flex-col items-center" {...props}>
      {['user', 'identity', 'tag', 'list'].includes(variant) && (
        <ExploreSearchForm searchParam={variant} />
      )}

      {variant === 'claim' && (
        <ExploreSearchClaimInput identities={identities} />
      )}
    </div>
  )
}

export { ExploreSearch }
