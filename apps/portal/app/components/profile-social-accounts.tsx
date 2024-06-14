import { Button } from '@0xintuition/1ui'

import { VerifiedLinkBadges } from '@client/privy-verified-links'
import logger from '@lib/utils/logger'
import { SessionUser } from 'types/user'

// if the user has not linked any accounts, render the Link CTA version
// if the user has linked at least one account, render the Edit CTA version

interface ProfileSocialAccountProps {
  privyUser: SessionUser
  hasLinkedAccounts: boolean
  handleOpenEditSocialLinksModal: () => void
}
// export function PrivyVerifiedLinks({ privyUser }: { privyUser: SessionUser }) {
export function ProfileSocialAccounts({
  privyUser,
  hasLinkedAccounts,
  handleOpenEditSocialLinksModal,
}: ProfileSocialAccountProps) {
  return hasLinkedAccounts ? (
    <EditSocialAccounts
      privyUser={privyUser}
      handleOpenEditSocialLinksModal={handleOpenEditSocialLinksModal}
    />
  ) : (
    <LinkSocialAccounts
      handleOpenEditSocialLinksModal={handleOpenEditSocialLinksModal}
    />
  )
}

function LinkSocialAccounts({
  handleOpenEditSocialLinksModal,
}: {
  handleOpenEditSocialLinksModal: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-5 border border-solid border-white/10 px-5 py-6 text-center max-w-xl rounded-lg bg-black/60">
      <p className="font-medium text-sm text-white/50">
        Strengthen your profile&apos;s credibility by linking your social
        accounts. This enhances trustworthiness. Verified accounts offer
        additional authenticity.
      </p>
      <Button variant="secondary" onClick={handleOpenEditSocialLinksModal}>
        Link Social Accounts
      </Button>
    </div>
  )
}

function EditSocialAccounts({
  privyUser,
  handleOpenEditSocialLinksModal,
}: {
  privyUser: SessionUser
  handleOpenEditSocialLinksModal: () => void
}) {
  logger('privyUser in social accounts', privyUser.details)
  return (
    <div className="flex flex-col w-full gap-5 mt-5">
      <VerifiedLinkBadges privyUser={privyUser} />
      <Button
        variant="secondary"
        className="text-center justify-center w-full"
        onClick={handleOpenEditSocialLinksModal}
      >
        Edit Social Links
      </Button>
    </div>
  )
}
