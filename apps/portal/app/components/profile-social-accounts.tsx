import { Button } from '@0xintuition/1ui'

// if the user has not linked any accounts, render the Link CTA version
// if the user has linked at least one account, render the Edit CTA version

interface ProfileSocialAccountProps {
  hasLinkedAccounts: boolean
  handleOpenEditSocialLinksModal: () => void
}

export function ProfileSocialAccounts({
  hasLinkedAccounts,
  handleOpenEditSocialLinksModal,
}: ProfileSocialAccountProps) {
  return hasLinkedAccounts ? (
    <EditSocialAccounts />
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

function EditSocialAccounts() {
  return (
    <div className="flex flex-col items-center gap-5">
      <p>
        Manage your linked social accounts to keep your profile updated and
        trustworthy.
      </p>
      <Button variant="secondary">Edit Social Accounts</Button>
    </div>
  )
}
