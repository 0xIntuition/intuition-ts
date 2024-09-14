import type { LoaderFunctionArgs } from '@remix-run/node'

import { createOGImage } from '../../.server/og'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { origin, searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? `Intuition`
  const holders = searchParams.get('holders') ?? 0
  const tvl = searchParams.get('tvl') ?? 0

  const png = await createOGImage(title, holders, tvl, origin)

  return new Response(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
