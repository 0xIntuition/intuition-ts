import {
  ApiError,
  IdentitiesService,
  IdentityPresenter,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { fetchWrapper } from '@server/api'

export async function getIdentityOrPending(
  request: Request,
  id: string,
): Promise<{ identity?: IdentityPresenter | null; isPending: boolean }> {
  try {
    const identity = await fetchWrapper(request, {
      method: IdentitiesService.getIdentityById,
      args: { id },
    })
    return { identity, isPending: false }
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      try {
        logger('IDENTITY IS 404')
        const pendingIdentity = (await fetchWrapper(request, {
          method: IdentitiesService.getPendingIdentity,
          args: { identifier: id },
        })) as unknown as IdentityPresenter // we're handling the missing identity properties via not rendering anything that relies on any missing properties. otherwise we'd need to set defaults which i'm wary of
        logger(`IDENTITY ${id} IS PENDING`)
        return { identity: pendingIdentity, isPending: true }
      } catch (pendingError) {
        logger('catching pendingError')
        return { identity: null, isPending: false }
      }
    }
    throw error
  }
}
