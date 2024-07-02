import { IdentityTag, IdentityTagSize } from 'components/IdentityTag'
import { Separator } from 'components/Separator'
import { IdentityType } from 'types'

export interface ClaimProps {
  size?: keyof typeof IdentityTagSize
  disabled?: boolean
  subject: {
    variant?: IdentityType
    label: string
    imgSrc?: string
  }
  predicate: {
    variant?: IdentityType
    label: string
    imgSrc?: string
  }
  object: {
    variant?: IdentityType
    label: string
    imgSrc?: string
  }
}

export const Claim = ({
  subject,
  predicate,
  object,
  disabled,
  size,
}: ClaimProps) => {
  const separatorWidth = size !== IdentityTagSize.default ? 'w-4' : 'w-2'
  return (
    <div className="flex items-center w-full max-w-full group">
      <IdentityTag
        variant={subject.variant}
        size={size}
        imgSrc={subject.imgSrc}
        disabled={disabled}
        className="group-hover:border-primary group-hover:bg-primary/20"
      >
        {subject.label}
      </IdentityTag>
      <Separator className={separatorWidth} />

      <IdentityTag
        variant={predicate.variant}
        size={size}
        imgSrc={predicate.imgSrc}
        disabled={disabled}
        className="group-hover:border-primary group-hover:bg-primary/20"
      >
        {predicate.label}
      </IdentityTag>
      <Separator className={separatorWidth} />

      <IdentityTag
        variant={object.variant}
        size={size}
        imgSrc={object.imgSrc}
        disabled={disabled}
        className="group-hover:border-primary group-hover:bg-primary/20"
      >
        {object.label}
      </IdentityTag>
    </div>
  )
}
