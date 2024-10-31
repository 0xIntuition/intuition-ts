import React from 'react'

import {
  Button,
  ButtonVariant,
  cn,
  CurrencyType,
  Icon,
  IconName,
  Identity,
  IdentityTag,
  IdentityTagSize,
  IdentityType,
  TagWithValueProps,
  Text,
  TextVariant,
} from '@0xintuition/1ui'
import { IdentityPresenter } from '@0xintuition/api'

import { stakeModalAtom } from '@lib/state/store'
import { Link } from '@remix-run/react'
import { VaultDetailsType } from 'app/types'
import { useAtom } from 'jotai'

export interface IdentityRowProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: IdentityType
  amount: number
  currency?: CurrencyType
  name: string
  description: string
  id: string
  claimLink?: string
  avatarSrc: string
  link: string
  ipfsLink: string
  numPositions: number
  tags?: TagWithValueProps[]
  identity: IdentityPresenter
  vaultId: string
  vaultDetails: VaultDetailsType
}

const IdentityRow = ({
  variant = Identity.user,
  amount,
  currency,
  name,
  avatarSrc,
  link,
  numPositions,
  children,
  className,
  identity,
}: IdentityRowProps) => {
  const [stakeModalActive, setStakeModalActive] = useAtom(stakeModalAtom)

  const content = (
    <div
      className={cn(
        `w-full flex justify-between items-center max-sm:flex-col max-sm:gap-3 p-4`,
        className,
      )}
    >
      <div className="flex items-center">
        <Link to={link}>
          <IdentityTag
            variant={variant}
            imgSrc={avatarSrc}
            size={IdentityTagSize.md}
          >
            {name}
          </IdentityTag>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          <Text variant={TextVariant.caption} className="text-primary/70">
            TVL
          </Text>
          <Text variant={TextVariant.caption}>
            {amount} {currency}
          </Text>
        </div>
        <Button
          variant={ButtonVariant.ghost}
          className="bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/60 py-0.5 px-2.5 gap-1.5 h-9"
          onClick={() =>
            setStakeModalActive((prevState) => ({
              ...prevState,
              mode: 'deposit',
              modalType: 'identity',
              isOpen: true,
              identity,
              vaultId: stakeModalActive.vaultId,
            }))
          }
        >
          <Icon name={IconName.arrowUp} className="h-4 w-4" />{' '}
          <Text variant={TextVariant.caption}>{numPositions}</Text>
        </Button>
        <Button variant={ButtonVariant.text} className="px-0 py-1">
          <Icon name={IconName.context} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="w-full">
      {content}
      {children}
    </div>
  )
}

export { IdentityRow }
