import * as React from 'react'

import { type VariantProps } from 'class-variance-authority'
import { Identity, identityVariants } from 'components/Identity'
import { Separator } from 'components/Separator'

interface ClaimElement {
  label: string
  variant?: VariantProps<typeof identityVariants>
}

export interface ClaimProps {
  subject: ClaimElement
  predicate: ClaimElement
  object: ClaimElement
}

const Claim = ({ subject, predicate, object, ...props }: ClaimProps) => {
  const elements = [subject, predicate, object]

  return (
    <div className="flex space-between items-center group">
      {elements.map((element, index) => (
        <React.Fragment key={index}>
          <Identity
            {...element.variant}
            {...props}
            className="group-hover:border-primary group-hover:bg-primary/20"
          >
            {element.label}
          </Identity>
          {index < elements.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  )
}

export { Claim }
