import {
  fetcher,
  GetAtomDocument,
  GetAtomQuery,
  GetAtomQueryVariables,
  GetTripleDocument,
  GetTripleQuery,
  GetTripleQueryVariables,
} from '@0xintuition/graphql'

import { formatBalance } from '@lib/utils/misc'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { Triple } from 'app/types/triple'

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
    const tripleResult = await fetcher<GetTripleQuery, GetTripleQueryVariables>(
      GetTripleDocument,
      {
        tripleId: id,
      },
    )()

    if (!tripleResult) {
      throw new Response('Claim not found', { status: 404 })
    }

    const triple = tripleResult?.triple as Triple

    title = triple?.object?.label
    holders = triple?.object?.vault?.allPositions?.aggregate?.count
    tvl =
      +formatBalance(BigInt(triple?.object?.vault?.total_shares ?? 0), 18) *
      +formatBalance(
        BigInt(triple?.object?.vault?.current_share_price ?? 0),
        18,
      )

    if (type === 'claim') {
      const tripleResult = await fetcher<
        GetTripleQuery,
        GetTripleQueryVariables
      >(GetTripleDocument, {
        tripleId: id,
      })()

      if (!tripleResult.triple) {
        throw new Response('Claim not found', { status: 404 })
      }

      const triple = tripleResult?.triple as Triple

      const stringifiedClaim = `${triple.subject?.label} - ${triple.predicate?.label} - ${triple.object?.label}`
      title = stringifiedClaim ?? 'Intuition Explorer'
      holdersFor = triple.vault?.allPositions?.aggregate?.count
      holdersAgainst = triple.counter_vault?.allPositions?.aggregate?.count
      tvlFor =
        +formatBalance(BigInt(triple?.vault?.total_shares ?? 0), 18) *
        +formatBalance(BigInt(triple?.vault?.current_share_price ?? 0), 18)
      tvlAgainst =
        +formatBalance(BigInt(triple.counter_vault?.total_shares ?? 0), 18) *
        +formatBalance(
          BigInt(triple.counter_vault?.current_share_price ?? 0),
          18,
        )
    }
  } else if (type === 'identity') {
    const atomResult = await fetcher<GetAtomQuery, GetAtomQueryVariables>(
      GetAtomDocument,
      {
        id,
      },
    )()

    if (!atomResult.atom) {
      throw new Response('Atom not found', { status: 404 })
    }

    const atom = atomResult?.atom

    title = atom.label ?? 'Intuition Explorer'
    holders = atom.vault?.positions_aggregate?.aggregate?.count
    tvl =
      +formatBalance(BigInt(atom.vault?.total_shares ?? 0), 18) *
      +formatBalance(BigInt(atom.vault?.current_share_price ?? 0), 18)
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
