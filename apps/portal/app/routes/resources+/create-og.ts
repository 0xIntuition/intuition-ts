import logger from '@lib/utils/logger'
import type { LoaderFunctionArgs } from '@remix-run/node'

import { createOGImage } from '../../.server/og'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { origin, searchParams } = new URL(request.url)
  logger('searchParams', searchParams)
  const title = searchParams.get('title') ?? 'Intuition'
  const type =
    (searchParams.get('type') as 'list' | 'identity' | 'claim') ?? 'list'
  const holders = searchParams.get('holders') ?? undefined
  const tvl = searchParams.get('tvl') ?? undefined
  const holdersFor = Number(searchParams.get('holdersFor')) || undefined
  const holdersAgainst = Number(searchParams.get('holdersAgainst')) || undefined
  const tvlFor = searchParams.get('tvlFor') ?? undefined
  const tvlAgainst = searchParams.get('tvlAgainst') ?? undefined

  const png = await createOGImage(
    title,
    type,
    origin,
    holders,
    tvl,
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
