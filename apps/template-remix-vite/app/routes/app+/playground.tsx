import {
  useGetAccountQuery,
  useGetAtomsQuery,
  useGetTriplesQuery,
} from '@0xintuition/graphql'

import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@tanstack/react-query'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const address = url.searchParams.get('address')

  if (!address) {
    console.error('No address provided')
  }

  return json({ address })
}

export default function Playground() {
  const { address } = useLoaderData<typeof loader>()

  const { data: atomsData } = useGetAtomsQuery(
    {},
    {
      queryKey: ['get-atoms-query'],
    },
  )
  const atoms = atomsData?.atoms

  // First query to get all triples
  const {
    data: triplesData,
    isLoading: isLoadingTriples,
    error: triplesError,
  } = useGetTriplesQuery(
    {},
    {
      queryKey: ['get-triples-query'],
    },
  )

  // Second query to get account positions with specific address
  const {
    data: accountData,
    isLoading: isLoadingAccount,
    error: accountError,
  } = useGetAccountQuery(
    {
      address: address!,
    },
    {
      queryKey: ['get-account-query'],
      enabled: !!triplesData,
    },
  )

  // Combine the data to match triples with user positions
  const combinedData = useQuery({
    queryKey: ['triples-with-positions', triplesData, accountData],
    enabled: !!triplesData && !!accountData,
    queryFn: () => {
      const triples = triplesData?.triples || []
      const userAccount = accountData?.account

      // Map and sort triples
      const triplesWithPositions = triples
        .map((triple) => {
          const position = userAccount?.positions_aggregate.nodes.find(
            (pos) => pos.vault?.triple?.id === triple.id,
          )

          return {
            ...triple,
            userPosition: position
              ? {
                  shares: position.shares,
                  totalShares: position.vault?.totalShares,
                  currentSharePrice: position.vault?.currentSharePrice,
                }
              : null,
          }
        })
        .sort((a, b) => {
          // Sort triples with positions to the top
          if (a.userPosition && !b.userPosition) {
            return -1
          }
          if (!a.userPosition && b.userPosition) {
            return 1
          }
          // If both have positions, sort by shares
          if (a.userPosition && b.userPosition) {
            return Number(b.userPosition.shares) - Number(a.userPosition.shares)
          }
          return 0
        })

      return triplesWithPositions
    },
  })

  // Loading states
  if (isLoadingTriples || isLoadingAccount || combinedData.isLoading) {
    return <div className="p-4">Loading data...</div>
  }

  // Error states
  if (triplesError) {
    return (
      <div className="p-4 text-red-500">
        Error loading triples: {(triplesError as Error).message}
      </div>
    )
  }

  if (accountError) {
    return (
      <div className="p-4 text-red-500">
        Error loading account: {(accountError as Error).message}
      </div>
    )
  }

  if (combinedData.error) {
    return (
      <div className="p-4 text-red-500">
        Error processing data: {(combinedData.error as Error).message}
      </div>
    )
  }

  // Count triples with positions
  const triplesWithPositionsCount =
    combinedData.data?.filter((triple) => triple.userPosition).length || 0

  console.log('Account positions:', accountData?.account?.positions_aggregate)
  console.log('All triples:', triplesData?.triples)

  return (
    <div className="p-4">
      {/* Account Info Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Current Account</h2>
        {accountData?.account && (
          <div className="p-4 rounded">
            <p>ID: {accountData.account.id}</p>
            <p>Label: {accountData.account.label}</p>
            <p>
              Total Positions:{' '}
              {accountData.account.positions_aggregate.nodes.length}
            </p>
          </div>
        )}
      </div>

      {/* Triples with Positions Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Triples with Positions
          <span className="text-sm font-normal ml-2">
            ({triplesWithPositionsCount} positions found)
          </span>
        </h2>
        <div className="grid gap-4">
          {combinedData.data?.map((triple) => (
            <div key={triple.id} className="p-4 border rounded">
              {/* Triple Info */}
              <div className="mb-4">
                <h3 className="font-bold">{triple.label}</h3>
                <div className="text-sm text-green-100">
                  <p>Subject: {triple.subject?.label}</p>
                  <p>Predicate: {triple.predicate?.label}</p>
                  <p>Object: {triple.object?.label}</p>
                </div>
              </div>

              {/* Position Info */}
              {triple.userPosition ? (
                <div className="bg-green-50 p-2 rounded">
                  <p className="font-semibold text-green-900">Your Position:</p>
                  <div className="text-green-900">
                    <p>Shares: {triple.userPosition.shares}</p>
                    <p>Total Shares: {triple.userPosition.totalShares}</p>
                    <p>Share Price: {triple.userPosition.currentSharePrice}</p>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  No position on this triple
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Debug Info */}
      <div className="mt-8 p-4 rounded">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(
            {
              atomsCount: atoms?.length,
              triplesCount: triplesData?.triples.length,
              accountPositions:
                accountData?.account?.positions_aggregate.nodes.length,
              combinedCount: combinedData.data?.length,
              triplesWithPositions: triplesWithPositionsCount,
            },
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  )
}
