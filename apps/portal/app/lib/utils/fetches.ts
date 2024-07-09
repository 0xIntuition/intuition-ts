import {
  ApiError,
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
    return await IdentitiesService.getIdentityById({ id: wallet })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return undefined
    } else {
      throw error
    }
  }
}

export async function fetchUserTotals(
  creatorId: string,
): Promise<GetUserTotalsResponse | undefined> {
  try {
    return await UsersService.getUserTotals({ id: creatorId })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      return undefined
    } else {
      throw error
    }
  }
}
