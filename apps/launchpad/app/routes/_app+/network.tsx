import { useMemo } from 'react'

import {
  AggregatedMetrics,
  PageHeader,
  Text,
  TextVariant,
  TextWeight,
} from '@0xintuition/1ui'
import {
  fetcher,
  GetEventsDocument,
  GetEventsQuery,
  GetEventsQueryVariables,
  GetStatsDocument,
  GetStatsQuery,
  GetStatsQueryVariables,
  GetTriplesDocument,
  GetTriplesQuery,
  GetTriplesQueryVariables,
  useGetEventsQuery,
  useGetStatsQuery,
  useGetTriplesQuery,
} from '@0xintuition/graphql'

import ActivityFeed from '@components/activity-feed'
import ChapterProgress from '@components/chapter-progress'
import { ErrorPage } from '@components/error-page'
import KnowledgeGraph from '@components/knowledge-graph/knowledge-graph'
import logger from '@lib/utils/logger'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { ClientOnly } from 'remix-utils/client-only'
import { formatUnits } from 'viem'

import {
  Atom,
  AtomValue,
  AtomVault,
  Creator,
  KnowledgeGraphData,
} from '../../types/knowledge-graph'

// Helper functions to transform types
const transformAtomValue = (
  value: GetTriplesQuery['triples'][0]['subject']['value'],
): AtomValue | undefined => {
  if (!value) {
    return undefined
  }
  return {
    person: value.person
      ? {
          name: value.person.name || '',
          image: value.person.image || undefined,
          description: value.person.description || undefined,
          url: value.person.url || undefined,
        }
      : undefined,
    thing: value.thing
      ? {
          name: value.thing.name || '',
          image: value.thing.image || undefined,
          description: value.thing.description || undefined,
          url: value.thing.url || undefined,
        }
      : undefined,
    organization: value.organization
      ? {
          name: value.organization.name || '',
          image: value.organization.image || undefined,
          description: value.organization.description || undefined,
          url: value.organization.url || undefined,
        }
      : undefined,
  }
}

const transformCreator = (
  creator: GetTriplesQuery['triples'][0]['creator'],
): Creator => {
  if (!creator) {
    return {
      id: 'unknown',
      label: 'Unknown',
    }
  }
  return {
    id: creator.id,
    label: creator.label,
    image: creator.image || undefined,
  }
}

const transformVault = (
  vault: GetTriplesQuery['triples'][0]['vault'],
): AtomVault => {
  const defaultVault: AtomVault = {
    total_shares: '0',
    current_share_price: '0',
    position_count: 0,
    positions: [],
    positions_aggregate: {
      aggregate: {
        count: 0,
        sum: {
          shares: '0',
        },
      },
    },
  }

  if (!vault) {
    return defaultVault
  }

  return {
    total_shares: vault.total_shares || '0',
    current_share_price: vault.current_share_price || '0',
    position_count: vault.allPositions?.aggregate?.count || 0,
    positions:
      vault.positions?.map((pos) => {
        if (!pos?.account) {
          return {
            id: 'unknown',
            account: {
              id: 'unknown',
              label: 'Unknown',
            },
            shares: '0',
          }
        }
        return {
          id: pos.id,
          account: {
            id: pos.account.id,
            label: pos.account.label,
          },
          shares: pos.shares,
        }
      }) || [],
    positions_aggregate: {
      aggregate: {
        count: vault.allPositions?.aggregate?.count || 0,
        sum: {
          shares: vault.allPositions?.aggregate?.sum?.shares || '0',
        },
      },
    },
  }
}

// Function to transform backend data into KnowledgeGraphData format
const transformTriplesData = (
  triples: GetTriplesQuery['triples'],
): KnowledgeGraphData => {
  // Create a map to store unique atoms
  const atomsMap = new Map<string, Atom>()

  // Helper function to calculate stake based on position counts
  const calculateStake = (
    vault: GetTriplesQuery['triples'][0]['vault'] | null | undefined,
  ) => {
    if (!vault) {
      return 0
    }
    return (vault.allPositions?.aggregate?.count || 0) * 10
  }

  // Process each triple to extract unique atoms and calculate their stakes
  triples.forEach((triple) => {
    const { subject, predicate, object, vault, counter_vault } = triple

    // Add subject if not already in map
    if (!atomsMap.has(subject.id)) {
      atomsMap.set(subject.id, {
        id: subject.id,
        vault_id: triple.vault_id,
        label: subject.label || 'Unknown',
        type: subject.type || 'Thing',
        image: subject.image || undefined,
        emoji: subject.emoji || undefined,
        data: subject.data || undefined,
        value: transformAtomValue(subject.value),
        creator: transformCreator(subject.creator),
        stake: calculateStake(vault) + calculateStake(counter_vault),
      })
    } else {
      // Update stake if atom already exists
      const existingAtom = atomsMap.get(subject.id)!
      existingAtom.stake +=
        calculateStake(vault) + calculateStake(counter_vault)
    }

    // Add predicate if not already in map
    if (!atomsMap.has(predicate.id)) {
      atomsMap.set(predicate.id, {
        id: predicate.id,
        vault_id: triple.vault_id,
        label: predicate.label || 'Unknown',
        type: predicate.type || 'Thing',
        image: predicate.image || undefined,
        emoji: predicate.emoji || undefined,
        data: predicate.data || undefined,
        value: transformAtomValue(predicate.value),
        creator: transformCreator(predicate.creator),
        stake: calculateStake(vault) + calculateStake(counter_vault),
      })
    } else {
      const existingAtom = atomsMap.get(predicate.id)!
      existingAtom.stake +=
        calculateStake(vault) + calculateStake(counter_vault)
    }

    // Add object if not already in map
    if (!atomsMap.has(object.id)) {
      atomsMap.set(object.id, {
        id: object.id,
        vault_id: triple.vault_id,
        label: object.label || 'Unknown',
        type: object.type || 'Thing',
        image: object.image || undefined,
        emoji: object.emoji || undefined,
        data: subject.data || undefined,
        value: transformAtomValue(object.value),
        creator: transformCreator(object.creator),
        stake: calculateStake(vault) + calculateStake(counter_vault),
      })
    } else {
      const existingAtom = atomsMap.get(object.id)!
      existingAtom.stake +=
        calculateStake(vault) + calculateStake(counter_vault)
    }
  })

  // Get all predicate atoms
  const predicateAtoms = Array.from(atomsMap.values()).filter(
    (atom) => atom.type === 'Thing',
  )

  // Transform triples into the expected format
  const transformedTriples = triples.map((triple) => {
    const { vault, counter_vault } = triple
    return {
      id: triple.id,
      subject_id: triple.subject_id,
      predicate_id: triple.predicate_id,
      object_id: triple.object_id,
      vault_id: triple.vault_id,
      counter_vault_id: triple.counter_vault_id,
      subject: atomsMap.get(triple.subject_id)!,
      predicate: atomsMap.get(triple.predicate_id)!,
      object: atomsMap.get(triple.object_id)!,
      vault: transformVault(vault),
      counter_vault: transformVault(counter_vault),
      creator: transformCreator(triple.creator),
      block_timestamp: triple.block_timestamp || '',
      transaction_hash: triple.transaction_hash || '',
      stake: calculateStake(vault) + calculateStake(counter_vault),
    }
  })

  return {
    atoms: Array.from(atomsMap.values()),
    predicates: predicateAtoms,
    triples: transformedTriples,
    stakers: [], // We'll need to add staker data when available
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  logger('request', request)

  const url = new URL(request.url)
  const activityLimit = parseInt(url.searchParams.get('activityLimit') || '10')
  const activityOffset = parseInt(url.searchParams.get('activityOffset') || '0')

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-stats'],
    queryFn: () =>
      fetcher<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, {}),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-events-global', { activityLimit, activityOffset }],
    queryFn: () =>
      fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, {
        limit: activityLimit,
        offset: activityOffset,
        addresses: [],
        orderBy: [{ block_timestamp: 'desc' }],
        where: {
          type: {
            _neq: 'FeesTransfered',
          },
        },
      }),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-triples'],
    queryFn: () =>
      fetcher<GetTriplesQuery, GetTriplesQueryVariables>(GetTriplesDocument, {
        orderBy: [{ vault: { total_shares: 'desc' } }],
        limit: 10000,
        offset: 0,
        where: {
          vault: {
            total_shares: {
              _gt: 0,
            },
          },
        },
      }),
  })

  return {
    dehydratedState: dehydrate(queryClient),
    initialParams: {
      activityLimit,
      activityOffset,
    },
  }
}

export function ErrorBoundary() {
  return <ErrorPage routeName="network" />
}

export default function Network() {
  const { initialParams } = useLoaderData<typeof loader>()
  const [searchParams] = useSearchParams()

  const activityLimit = parseInt(
    searchParams.get('activityLimit') || String(initialParams.activityLimit),
  )
  const activityOffset = parseInt(
    searchParams.get('activityOffset') || String(initialParams.activityOffset),
  )

  const { data: systemStats } = useGetStatsQuery(
    {},
    {
      queryKey: ['get-stats'],
    },
  )

  const { data: eventsData } = useGetEventsQuery(
    {
      limit: activityLimit,
      offset: activityOffset,
      addresses: [],
      orderBy: [{ block_timestamp: 'desc' }],
      where: {
        type: {
          _neq: 'FeesTransfered',
        },
      },
    },
    {
      queryKey: [
        'get-events-global',
        {
          limit: activityLimit,
          offset: activityOffset,
          where: {
            type: {
              _neq: 'FeesTransfered',
            },
          },
        },
      ],
    },
  )

  const { data: triplesData } = useGetTriplesQuery(
    {
      orderBy: [{ vault: { total_shares: 'desc' } }],
      limit: 100,
      offset: 0,
      where: {
        vault: {
          total_shares: {
            _gt: 0,
          },
        },
      },
    },
    {
      queryKey: ['get-triples'],
    },
  )

  const stats = systemStats?.stats[0]
  const graphData = useMemo(() => {
    if (!triplesData?.triples) {
      return {
        atoms: [],
        predicates: [],
        triples: [],
        stakers: [],
      }
    }
    return transformTriplesData(triplesData.triples)
  }, [triplesData])

  return (
    <>
      <PageHeader title="Network" lastUpdated={'3s'} />
      <ChapterProgress
        currentChapter={'Chapter I: Genesis'}
        nextChapter={'Chapter II: Population'}
        totalStages={7}
        currentStage={1}
        endTime={new Date(Date.now() + 172800000)}
      />
      <div className="flex flex-col rounded-xl overflow-hidden">
        <div className="relative w-full h-[400px] bg-gradient-to-b from-[#060504] to-[#101010]">
          <ClientOnly>
            {() => (
              <KnowledgeGraph data={graphData} className="w-full h-full" />
            )}
          </ClientOnly>
        </div>
        <div className="py-4 bg-gradient-to-b from-[#060504] to-[#101010]">
          <AggregatedMetrics
            metrics={[
              {
                label: 'TVL',
                value: +formatUnits(stats?.contract_balance ?? 0, 18),
                suffix: 'ETH',
                precision: 2,
              },
              { label: 'Atoms', value: stats?.total_atoms ?? 0 },
              { label: 'Triples', value: stats?.total_triples ?? 0 },
              {
                label: 'Signals',
                value: stats?.total_signals ?? 0,
                hideOnMobile: true,
              },
              { label: 'Users', value: stats?.total_accounts ?? 0 },
            ]}
            className="[&>div]:after:hidden sm:[&>div]:after:block"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Text variant={TextVariant.headline} weight={TextWeight.medium}>
          Data Stream
        </Text>
        <ActivityFeed
          activities={{
            events: eventsData?.events || [],
            total: {
              aggregate: { count: eventsData?.total.aggregate?.count || 0 },
            },
          }}
        />
      </div>
    </>
  )
}
