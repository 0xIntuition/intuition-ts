import { formatBalance } from '@lib/utils/misc'
import type { LoaderFunctionArgs } from '@remix-run/node'

import { createOGImage } from '../../.server/og'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { origin, searchParams } = new URL(request.url)

    const id = searchParams.get('id')
    const type = searchParams.get('type') as 'list' | 'identity' | 'claim'
    const data = searchParams.get('data')

    if (!id || !type || !data) {
      throw new Response('Missing required parameters', { status: 400 })
    }

    console.log('Processing request:', { id, type })

    let title,
      holders,
      tvl,
      holdersFor,
      holdersAgainst,
      tvlFor,
      tvlAgainst,
      itemCount

    if (type === 'list') {
      try {
        const parsedData = JSON.parse(data)
        title = parsedData.title
        holders = parsedData.holders
        tvl = +formatBalance(BigInt(parsedData.tvl ?? 0), 18)
        itemCount = parsedData?.itemCount

        console.log('Processed data:', { title, holders, tvl, itemCount })
      } catch (e) {
        console.error('Error parsing list data:', e)
        throw new Response('Invalid list data', { status: 400 })
      }
    }

    console.log('Generating OG image with:', { title, type, holders, tvl })
    const png = await createOGImage(
      title ?? 'Intuition Launchpad',
      type,
      origin,
      (holders ?? 0).toString(),
      tvl?.toString(),
      holdersFor,
      holdersAgainst,
      tvlFor,
      tvlAgainst,
      itemCount?.toString(),
    )

    return new Response(png, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    })
  } catch (error) {
    console.error('Error in create-og loader:', error)
    if (error instanceof Response) {
      throw error
    }
    throw new Response('Internal Server Error', { status: 500 })
  }
}
