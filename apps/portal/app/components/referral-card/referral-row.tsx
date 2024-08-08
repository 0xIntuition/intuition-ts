import React, { useState } from 'react'

import {
  Button,
  ButtonVariant,
  cn,
  Copy,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  IconName,
  Identity,
  IdentityTag,
  ProfileCard,
  Trunctacular,
} from '@0xintuition/1ui'
import { UserPresenter } from '@0xintuition/api'

import { useCopy } from '@lib/hooks/useCopy'
import { Link } from '@remix-run/react'
import { BLOCK_EXPLORER_URL, PATHS } from 'consts'

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
      {redeemer ? (
        <HoverCard>
          <HoverCardTrigger>
            <IdentityTag variant={Identity.user} imgSrc={redeemer.image}>
              <Trunctacular
                value={redeemer.display_name ?? redeemer.wallet}
                disableTooltip
              />
            </IdentityTag>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <ProfileCard
              variant={Identity.user}
              avatarSrc={redeemer?.image ?? ''}
              name={redeemer?.display_name ?? redeemer.wallet}
              id={redeemer.wallet}
              bio={redeemer.description ?? ''}
              ipfsLink={`${BLOCK_EXPLORER_URL}/address/${redeemer.wallet}`}
            />
            <Link to={`${PATHS.PROFILE}/${redeemer.wallet}`} prefetch="intent">
              <Button variant={ButtonVariant.secondary} className="w-full">
                View Identity
              </Button>
            </Link>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Button
          variant={ButtonVariant.secondary}
          onClick={handleCopy}
          disabled={redeemer !== null && redeemer !== undefined}
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
