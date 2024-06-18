import { IdentityPresenter } from '@0xintuition/api'

import { ClaimID } from './claim-id'
import { ClaimTitle } from './claim-title'

interface ClaimDisplayProps {
  claim_id: string
  subject: IdentityPresenter
  predicate: IdentityPresenter
  object: IdentityPresenter
}

export function ClaimDisplay({
  claim_id,
  subject,
  predicate,
  object,
}: ClaimDisplayProps) {
  return (
    <div className="flex flex-col justify-center gap-1">
      <ClaimTitle
        subject={subject}
        predicate={predicate}
        object={object}
        icon={false}
      />
      <ClaimID claim_id={claim_id} />
    </div>
  )
}
