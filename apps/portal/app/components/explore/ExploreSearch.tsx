import * as React from 'react'

import { IdentityPresenter } from '@0xintuition/api'

import { ExploreSearchForm } from './ExploreSearchForm/ExploreSearchForm'

export interface ExploreSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'user' | 'identity' | 'claim' | 'tag'
  identities?: IdentityPresenter[]
}

const ExploreSearch: React.FC<ExploreSearchProps> = ({
  variant,
  identities,
  ...props
}: ExploreSearchProps) => {
  return (
    <div className="min-w-96 flex flex-col items-center" {...props}>
      {['user', 'identity', 'tag'].includes(variant) && (
        <ExploreSearchForm searchParam={variant} />
      )}

      {variant === 'claim' && (
        <ExploreSearchClaimInput identities={identities} />
      )}
    </div>
  )
}

export { ExploreSearch }
