import { IdentityPresenter } from '@0xintuition/api'

import { ClaimIdentity } from './claim-identity'
import ClaimIcon from './svg/claim-icon'

interface ClaimTitleProps {
  subject: IdentityPresenter
  predicate: IdentityPresenter
  object: IdentityPresenter
  icon?: boolean
}

export function ClaimTitle({
  subject,
  predicate,
  object,
  icon,
}: ClaimTitleProps) {
  return (
    <div className="flex flex-row items-center">
      <ClaimIdentity
        image={subject.image!}
        display_name={subject.display_name}
        isUser={subject.is_user}
      />
      <div className="flex h-[1px] w-[3px] flex-row items-center gap-1 bg-border" />
      <ClaimIdentity
        image={predicate.image!}
        display_name={predicate.display_name}
        isUser={predicate.is_user}
      />
      <div className="flex h-[1px] w-[3px] flex-row items-center gap-1 bg-border" />
      <ClaimIdentity
        image={object.image!}
        display_name={object.display_name}
        isUser={object.is_user}
      />
      {icon && <ClaimIcon className="mt-0.5 h-5 w-5 text-primary-700" />}
    </div>
  )
}
