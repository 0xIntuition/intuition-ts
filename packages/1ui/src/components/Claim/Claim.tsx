import {
  Identity,
  IdentitySize,
  IdentityVariantType,
} from 'components/Identity'
import { Separator } from 'components/Separator'

export interface ClaimProps {
  size: keyof typeof IdentitySize
  disabled?: boolean
  subject: {
    variant?: IdentityVariantType
    label: string
    imgSrc?: string
  }
  predicate: {
    variant?: IdentityVariantType
    label: string
    imgSrc?: string
  }
  object: {
    variant?: IdentityVariantType
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
  const separatorWidth = size === IdentitySize.sm ? 'w-2' : 'w-8'
  return (
    <div className="flex items-center w-full max-w-full group">
      <Identity
        variant={subject.variant}
        size={size}
        imgSrc={subject.imgSrc}
        disabled={disabled}
        className="group-hover:border-primary group-hover:bg-primary/20"
      >
        {subject.label}
      </Identity>
      <Separator className={separatorWidth} />

      <Identity
        variant={predicate.variant}
        size={size}
        imgSrc={predicate.imgSrc}
        disabled={disabled}
        className="group-hover:border-primary group-hover:bg-primary/20"
      >
        {predicate.label}
      </Identity>
      <Separator className={separatorWidth} />

      <Identity
        variant={object.variant}
        size={size}
        imgSrc={object.imgSrc}
        disabled={disabled}
        className="group-hover:border-primary group-hover:bg-primary/20"
      >
        {object.label}
      </Identity>
    </div>
  )
}
