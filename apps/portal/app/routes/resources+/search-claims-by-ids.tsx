import { ClaimPresenter, ClaimsService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'app/consts'

export interface ClaimLoaderData {
  claims: ClaimPresenter[]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const subjectQuery = url.searchParams.get('subject') || ''
  const predicateQuery = url.searchParams.get('predicate') || ''
  const objectQuery = url.searchParams.get('object') || ''

  logger('[search-claims-by-ids] queries:', {
    subjectQuery,
    predicateQuery,
    objectQuery,
  })

  const result: ClaimPresenter[] = []
  await ClaimsService.searchClaims({
    subject: subjectQuery,
    predicate: predicateQuery,
    object: objectQuery,
  })
    .then((response) => {
      if (
        response &&
        typeof response === 'object' &&
        Array.isArray(response.data)
      ) {
        result.push(...response.data)
      } else {
        logger('[search-claims-by-ids] Unexpected response format:', response)
      }
    })
    .catch((error) => {
      logger('[search-claims-by-ids] Error:', error)
    })

  logger('[search-claims-by-ids] claimResponse:', result)
  return json(result)
}
