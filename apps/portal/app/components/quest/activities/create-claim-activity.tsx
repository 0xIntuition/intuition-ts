import React from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
} from '@0xintuition/1ui'
import { ClaimPresenter, QuestStatus } from '@0xintuition/api'

import ActivityContainer from '../activity-container'
import { ClaimWithHoverable } from '../detail/claim-with-hoverable'

export interface CreateClaimActivityProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: QuestStatus
  claim?: ClaimPresenter | null
  handleClick: () => void
  isLoading?: boolean
  isDisabled?: boolean
}

export default function CreateClaimActivity({
  status,
  claim,
  handleClick,
  isLoading = false,
  isDisabled = false,
  ...props
}: CreateClaimActivityProps) {
  return (
    <ActivityContainer status={status} {...props} className="pb-5">
      {claim && claim.subject && claim.predicate && claim.object ? (
        <div className="flex flex-col gap-5 rounded-md p-5">
          <ClaimWithHoverable
            subject={claim.subject}
            predicate={claim.predicate}
            object={claim.object}
          />
        </div>
      ) : (
        <Button
          variant={ButtonVariant.secondary}
          size={ButtonSize.lg}
          onClick={handleClick}
          isLoading={isLoading}
          disabled={isDisabled}
        >
          {!isLoading ? <Icon name={IconName.claim} /> : null}
          Create Claim
        </Button>
      )}
    </ActivityContainer>
  )
}
