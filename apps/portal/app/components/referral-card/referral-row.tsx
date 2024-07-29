import React from 'react'

import { Button, Icon, IconName, Identity, IdentityTag } from '@0xintuition/1ui'

import { CopyComponent } from '@components/copy'

interface ReferralRowProps {
  code: string
  isActivated: boolean
  identity?: {
    id: string
    name: string
    avatarUrl: string
  }
}

export const ReferralRow: React.FC<ReferralRowProps> = ({
  code,
  isActivated,
  identity,
}) => {
  return (
    <div className="flex justify-between items-center">
      <CopyComponent text={code} disabled={isActivated} />
      {isActivated && identity ? (
        <IdentityTag
          variant={Identity.user}
          imgSrc={identity.avatarUrl}
          name={identity.name}
        />
      ) : (
        <Button
          variant="secondary"
          onClick={() => navigator.clipboard.writeText(code)}
          disabled={isActivated}
          className="gap-2"
        >
          <Icon name={IconName.chainLink} className="fill-white h-4 w-4" /> Copy
          Code
        </Button>
      )}
    </div>
  )
}
