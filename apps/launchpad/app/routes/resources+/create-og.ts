import { formatBalance } from '@lib/utils/misc'
import type { LoaderFunctionArgs } from '@remix-run/node'

import { createOGImage } from '../../.server/og'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { origin, searchParams } = new URL(request.url)

    const id = searchParams.get('id')
    const type = searchParams.get('type') as
      | 'list'
      | 'identity'
      | 'claim'
      | 'question'
      | 'epoch'
      | 'epochs'
    const data = searchParams.get('data')

    if (!type || !data) {
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

    try {
      const parsedData = JSON.parse(data)
      title = parsedData.title
      holders = parsedData.holders
      tvl = parsedData.tvl
        ? +formatBalance(BigInt(parsedData.tvl), 18)
        : undefined
      itemCount = parsedData?.itemCount

      console.log('Processed data:', { title, holders, tvl, itemCount })
    } catch (e) {
      console.error('Error parsing data:', e)
      throw new Response('Invalid data', { status: 400 })
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
        'Cache-Control': 'public, max-age=31536000',
        'ngrok-skip-browser-warning': '1',
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
