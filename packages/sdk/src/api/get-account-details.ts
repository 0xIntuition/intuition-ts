import {
  fetcher,
  GetAccountDocument,
  type GetAccountQuery,
  type GetAccountQueryVariables,
} from '@0xintuition/graphql'

export async function getAccountDetails(address: string) {
  try {
    const data = await fetcher<GetAccountQuery, GetAccountQueryVariables>(
      GetAccountDocument,
      {
        address,
      },
    )()

    if (data?.account) {
      return data.account
    }

    return null
  } catch (error) {
    console.error('Error fetching account:', error)
    return null
  }
}
