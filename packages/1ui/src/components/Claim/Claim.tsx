import { Identity, IdentitySize, IdentityVariant } from 'components/Identity'
import { Separator } from 'components/Separator'

export interface ClaimProps {
  size: keyof typeof IdentitySize
  disabled?: boolean
  subject: {
    variant?: keyof typeof IdentityVariant
    label: string
    imgSrc?: string
  }
  predicate: {
    variant?: keyof typeof IdentityVariant
    label: string
    imgSrc?: string
  }
  object: {
    variant?: keyof typeof IdentityVariant
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
      <Separator className="w-8" />

      <Identity
        variant={predicate.variant}
        size={size}
        imgSrc={predicate.imgSrc}
        disabled={disabled}
        className="group-hover:border-primary group-hover:bg-primary/20"
      >
        {predicate.label}
      </Identity>
      <Separator className="w-8" />

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
