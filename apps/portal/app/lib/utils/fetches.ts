import {
  ApiError,
  CancelablePromise,
  GetIdentityByIdResponse,
  GetUserTotalsResponse,
  IdentitiesService,
  UsersService,
} from '@0xintuition/api'

import logger from './logger'

export async function fetchUserIdentity(
  wallet: string,
): Promise<GetIdentityByIdResponse | undefined> {
  try {
    const result = await IdentitiesService.getIdentityById({ id: wallet })
    return new CancelablePromise<GetIdentityByIdResponse | undefined>(
      (resolve) => resolve(result),
    )
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return undefined
    } else {
      throw error
    }
  }
}

export async function fetchUserTotals(creatorId: string) {
  try {
    const result = await UsersService.getUserTotals({ id: creatorId })
    return new CancelablePromise<GetUserTotalsResponse | undefined>((resolve) =>
      resolve(result),
    )
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return undefined
    } else {
      throw error
    }
  }
}
