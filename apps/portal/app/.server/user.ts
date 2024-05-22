import { getAuthHeaders } from '@lib/utils/misc'
import logger from '@lib/utils/logger'
import type { APIResponse } from '@types/query'
import { UserIdResponseSchema, type UserIdResponse } from '@types/user'

export async function getUserByWallet({
  wallet,
  accessToken,
}: {
  wallet: string
  accessToken: string
}): Promise<APIResponse<UserIdResponse>> {
  try {
    const apiUrl = process.env.API_URL
    if (!apiUrl) {
      throw new Error('API_URL is not defined')
    }
    logger('getUserByWallet called')

    const headers = getAuthHeaders(accessToken !== null ? accessToken : '')

    const getUserByWalletAddressResponse = await fetch(
      `${process.env.API_URL}/users/wallet/${wallet}`,
      {
        method: 'GET',
        headers: headers,
      },
    )

    if (!getUserByWalletAddressResponse.ok) {
      throw new Error(`Error retrieving user API key.`)
    }

    const userIdResponseData = await getUserByWalletAddressResponse.json()

    const validatedData = UserIdResponseSchema.safeParse(userIdResponseData)

    if (!validatedData.success) {
      throw new Error(
        `Error validating the user id response: ${validatedData.error}`,
      )
    }

    return { success: true, data: validatedData.data }
  } catch (error) {
    logger(
      `Error in getUserbyWallet: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
