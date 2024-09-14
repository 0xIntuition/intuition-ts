import { ClaimsService } from '@0xintuition/api'

import logger from '@lib/utils/logger'
import { formatBalance } from '@lib/utils/misc'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { fetchWrapper } from '@server/api'

import { createOGImage } from '../../.server/og'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { origin, searchParams } = new URL(request.url)
  logger('searchParams', searchParams)
  // const id = searchParams.get('id')
  // const title = searchParams.get('title') ?? 'Intuition'
  // const type =
  //   (searchParams.get('type') as 'list' | 'identity' | 'claim') ?? 'list'
  // const holders = searchParams.get('holders') ?? undefined
  // const tvl = searchParams.get('tvl') ?? undefined
  // const holdersFor = Number(searchParams.get('holdersFor')) || undefined
  // const holdersAgainst = Number(searchParams.get('holdersAgainst')) || undefined
  // const tvlFor = searchParams.get('tvlFor') ?? undefined
  // const tvlAgainst = searchParams.get('tvlAgainst') ?? undefined

  const id = searchParams.get('id')
  const type = searchParams.get('type') as 'list' | 'identity' | 'claim'
  if (!id || !type) {
    throw new Response('Missing required parameters', { status: 400 })
  }

  let title, holders, tvl, holdersFor, holdersAgainst, tvlFor, tvlAgainst

  if (type === 'list' || type === 'claim') {
    const claim = await fetchWrapper(request, {
      method: ClaimsService.getClaimById,
      args: { id },
    })

    if (!claim) {
      throw new Response('Claim not found', { status: 404 })
    }

    title = claim.object?.display_name
    holders = claim.object?.tag_count
    tvl = +formatBalance(BigInt(claim.object?.assets_sum ?? 0), 18)

    // if (type === 'claim') {
    //   holdersFor = claim.holdersFor
    //   holdersAgainst = claim.holdersAgainst
    //   tvlFor = claim.tvlFor?.toString()
    //   tvlAgainst = claim.tvlAgainst?.toString()
    // }
  } else if (type === 'identity') {
    // Fetch identity data if needed
    // const identity = await fetchWrapper(request, {
    //   method: IdentityService.getIdentityById,
    //   args: { id },
    // })
    // Set title and other relevant fields
  }

  const png = await createOGImage(
    title ?? 'Intuition Explorer',
    type,
    origin,
    (holders ?? 0).toString(),
    tvl?.toString(),
    holdersFor,
    holdersAgainst,
    tvlFor,
    tvlAgainst,
  )

  return new Response(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
