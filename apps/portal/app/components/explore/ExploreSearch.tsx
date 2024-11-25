import * as React from 'react'

import { ExploreSearchClaimInput } from './ExploreSearchClaimInput'
import { ExploreSearchForm } from './ExploreSearchForm/ExploreSearchForm'

export interface ExploreSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'user' | 'identity' | 'claim' | 'tag' | 'list'
}

const ExploreSearch: React.FC<ExploreSearchProps> = ({
  variant,
  ...props
}: ExploreSearchProps) => {
  return (
    <div
      className="w-2/3 flex flex-col items-center text-center max-md:w-full"
      {...props}
    >
      {['user', 'identity', 'tag', 'list'].includes(variant) && (
        <ExploreSearchForm searchParam={variant} />
      )}

      {variant === 'claim' && <ExploreSearchClaimInput />}
    </div>
  )
}

export { ExploreSearch }
