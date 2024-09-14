import { ClaimsService } from '@0xintuition/api'

import { getClaimOrPending } from '@lib/services/claims'
import { getIdentityOrPending } from '@lib/services/identities'
import { formatBalance } from '@lib/utils/misc'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { fetchWrapper } from '@server/api'

import { createOGImage } from '../../.server/og'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { origin, searchParams } = new URL(request.url)

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

    if (type === 'claim') {
      const { claim, isPending } = await getClaimOrPending(request, id)

      if (!claim) {
        throw new Response('Not Found', { status: 404 })
      }

      const stringifiedClaim = `${claim.subject?.display_name} - ${claim.predicate?.display_name} - ${claim.object?.display_name}`
      title = stringifiedClaim ?? 'Intuition Explorer'
      holdersFor = isPending ? 'Pending' : claim.for_num_positions
      holdersAgainst = isPending ? 'Pending' : claim.against_num_positions
      tvlFor = isPending
        ? 'Pending'
        : +formatBalance(BigInt(claim.for_assets_sum ?? 0), 18)
      tvlAgainst = isPending
        ? 'Pending'
        : +formatBalance(BigInt(claim.against_assets_sum ?? 0), 18)
    }
  } else if (type === 'identity') {
    const { identity, isPending } = await getIdentityOrPending(request, id)

    if (!identity) {
      throw new Response('Not Found', { status: 404 })
    }

    title = identity.display_name ?? 'Intuition Explorer'
    holders = isPending ? 'Pending' : identity.num_positions
    tvl = isPending
      ? 'Pending'
      : +formatBalance(BigInt(identity.assets_sum), 18)
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
