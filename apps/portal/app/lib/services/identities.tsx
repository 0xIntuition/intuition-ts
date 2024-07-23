import { IdentitiesService } from '@0xintuition/api'

import { fetchWrapper } from '@lib/utils/misc'

export async function getUserIdentity({ userWallet }: { userWallet: string }) {
  const userIdentity = await fetchWrapper({
    method: IdentitiesService.getIdentityById,
    args: { id: userWallet },
  })

  return userIdentity
}
