import * as React from 'react'

import { ExploreSearchClaimInput } from './ExploreSearchClaimInput'
import { ExploreSearchInput } from './ExploreSearchInput'

export interface ExploreSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'user' | 'identity' | 'claim' | 'tag'
}

const ExploreSearch = ({ variant, ...props }: ExploreSearchProps) => {
  return (
    <div className="min-w-96 flex flex-col items-center" {...props}>
      {['user', 'identity', 'tag'].includes(variant) && (
        // TODO: Alexander to adds the Tags component with ComboBox here ENG-2574
        <ExploreSearchInput searchParam={variant} />
      )}

      {variant === 'claim' && <ExploreSearchClaimInput />}
    </div>
  )
}

export { ExploreSearch }
