import React, { useState } from 'react'

import {
  Button,
  ButtonVariant,
  cn,
  Copy,
  Icon,
  IconName,
  Identity,
  IdentityTag,
} from '@0xintuition/1ui'
import { UserPresenter } from '@0xintuition/api'

import { useCopy } from '@lib/hooks/useCopy'

interface ReferralRowProps {
  code: string
  redeemed: boolean
  redeemer?: UserPresenter | null
}

export const ReferralRow: React.FC<ReferralRowProps> = ({
  code,
  redeemed,
  redeemer,
}) => {
  const [copied, setCopied] = useState(false)
  const { copy } = useCopy()

  const handleCopy = () => {
    if (!redeemed) {
      setCopied(true)
      copy(code)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-row gap-1">
        {code} <Copy text={code} />
      </div>
      {redeemed && redeemer ? (
        <IdentityTag
          variant={Identity.user}
          imgSrc={redeemer.image}
          name={redeemer.display_name ?? redeemer.wallet}
        />
      ) : (
        <Button
          variant={ButtonVariant.secondary}
          onClick={handleCopy}
          disabled={redeemed}
          className="gap-2"
        >
          <Icon
            name={copied ? IconName.checkmark : IconName.chainLink}
            className={cn(`h-4 w-4`, copied && 'text-success')}
          />
          Copy Code
        </Button>
      )}
    </div>
  )
}
