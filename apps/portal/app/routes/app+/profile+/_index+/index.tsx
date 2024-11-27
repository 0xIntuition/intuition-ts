import { QuestHeaderCard, Text } from '@0xintuition/1ui'
import {
  ClaimSortColumn,
  ClaimsService,
  QuestNarrative,
  SortDirection,
} from '@0xintuition/api'
import {
  fetcher,
  GetAccountDocument,
  GetAccountQuery,
  GetAccountQueryVariables,
  GetAtomsCountDocument,
  GetAtomsCountQuery,
  GetAtomsCountQueryVariables,
  GetPositionsCountByTypeDocument,
  GetPositionsCountByTypeQuery,
  GetPositionsCountByTypeQueryVariables,
  GetPositionsCountDocument,
  GetPositionsCountQuery,
  GetPositionsCountQueryVariables,
  GetTriplesCountDocument,
  GetTriplesCountQuery,
  GetTriplesCountQueryVariables,
  useGetAccountQuery,
  useGetAtomsCountQuery,
  useGetPositionsCountByTypeQuery,
  useGetPositionsCountQuery,
  useGetTriplesCountQuery,
} from '@0xintuition/graphql'

import { ErrorPage } from '@components/error-page'
import { ListClaimsList } from '@components/list/list-claims'
import { OverviewAboutHeader } from '@components/profile/overview-about-header'
import { OverviewCreatedHeader } from '@components/profile/overview-created-header'
import { OverviewStakingHeader } from '@components/profile/overview-staking-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaimsAboutIdentity } from '@lib/services/claims'
import { getIdentityOrPending } from '@lib/services/identities'
import { getUserSavedLists } from '@lib/services/lists'
import { getPositionsOnIdentity } from '@lib/services/positions'
import { getUserIdentities } from '@lib/services/users'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useNavigate, useRouteLoaderData } from '@remix-run/react'
import { ProfileLoaderData } from '@routes/app+/profile+/_index+/_layout'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { getQuestsProgress } from '@server/quest'
import { QueryClient } from '@tanstack/react-query'
import {
  NO_USER_IDENTITY_ERROR,
  NO_WALLET_ERROR,
  PATHS,
  STANDARD_QUEST_SET,
} from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)
  const queryAddress = userWallet.toLowerCase()

  const { identity: userIdentity, isPending } = await getIdentityOrPending(
    request,
    userWallet,
  )

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const listSearchParams = new URLSearchParams()
  listSearchParams.set('sortsBy', ClaimSortColumn.ASSETS_SUM)
  listSearchParams.set('direction', SortDirection.DESC)
  listSearchParams.set('limit', '6')
  logger('wallet', userWallet.toLowerCase())

  const queryClient = new QueryClient()

  const triplesCountWhere = {
    _or: [
      {
        subjectId: {
          _eq: 14,
        },
      },
      {
        predicateId: {
          _eq: 14,
        },
      },
      {
        objectId: {
          _eq: 14,
        },
      },
    ],
  }

  const positionsCountWhere = {
    vaultId: {
      _eq: 14,
    },
  }

  const createdTriplesWhere = {
    creator: {
      id: {
        _eq: queryAddress,
      },
    },
  }

  const createdAtomsWhere = {
    creator: {
      id: {
        _eq: queryAddress,
      },
    },
  }

  const atomPositionsWhere = {
    account: {
      id: {
        _eq: queryAddress,
      },
    },
    vault: {
      tripleId: {
        _is_null: true,
      },
    },
  }

  const triplePositionsWhere = {
    account: {
      id: {
        _eq: queryAddress,
      },
    },
    vault: {
      atomId: {
        _is_null: true,
      },
    },
  }

  const accountResult = await fetcher<
    GetAccountQuery,
    GetAccountQueryVariables
  >(GetAccountDocument, { address: queryAddress })()

  if (!accountResult) {
    throw new Error('No account data found for address')
  }

  if (!accountResult.account?.atomId) {
    throw new Error('No atom ID found for account')
  }

  await queryClient.prefetchQuery({
    queryKey: ['get-account', { address: queryAddress }],
    queryFn: () => accountResult,
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-triples-count', { where: triplesCountWhere }],
    queryFn: () =>
      fetcher<GetTriplesCountQuery, GetTriplesCountQueryVariables>(
        GetTriplesCountDocument,
        { where: triplesCountWhere },
      )(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-positions-count', { where: positionsCountWhere }],
    queryFn: () =>
      fetcher<GetPositionsCountQuery, GetPositionsCountQueryVariables>(
        GetPositionsCountDocument,
        { where: positionsCountWhere },
      )(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-created-triples', { where: createdTriplesWhere }],
    queryFn: () =>
      fetcher<GetTriplesCountQuery, GetTriplesCountQueryVariables>(
        GetTriplesCountDocument,
        { where: createdTriplesWhere },
      )(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-created-atoms', { where: createdAtomsWhere }],
    queryFn: () =>
      fetcher<GetAtomsCountQuery, GetAtomsCountQueryVariables>(
        GetAtomsCountDocument,
        { where: createdAtomsWhere },
      )(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-atom-positions', { where: atomPositionsWhere }],
    queryFn: () =>
      fetcher<
        GetPositionsCountByTypeQuery,
        GetPositionsCountByTypeQueryVariables
      >(GetPositionsCountByTypeDocument, { where: atomPositionsWhere })(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['get-triple-positions', { where: triplePositionsWhere }],
    queryFn: () =>
      fetcher<
        GetPositionsCountByTypeQuery,
        GetPositionsCountByTypeQueryVariables
      >(GetPositionsCountByTypeDocument, { where: triplePositionsWhere })(),
  })

  return json({
    queryAddress,
    initialParams: {
      triplesCountWhere,
      positionsCountWhere,
      createdTriplesWhere,
      createdAtomsWhere,
      atomPositionsWhere,
      triplePositionsWhere,
    },
    ...(!isPending &&
      !!userIdentity && {
        questsProgress: await getQuestsProgress({
          request,
          options: {
            narrative: QuestNarrative.STANDARD,
          },
        }),
        positions: await getPositionsOnIdentity({
          request,
          identityId: userIdentity.id,
          searchParams,
        }),
        activeIdentities: await getUserIdentities({
          request,
          userWallet: userWallet.toLowerCase(),
          searchParams,
        }),
        claims: await getClaimsAboutIdentity({
          request,
          identityId: userIdentity.id,
          searchParams,
        }),
        claimsSummary: await fetchWrapper(request, {
          method: ClaimsService.claimSummary,
          args: {
            identity: userIdentity.id,
          },
        }),
        savedListClaims: await getUserSavedLists({
          request,
          userWallet,
          searchParams: listSearchParams,
        }),
      }),
  })
}

export default function UserProfileOverview() {
  const {
    questsProgress,
    activeIdentities,
    claims,
    positions,
    claimsSummary,
    savedListClaims,
    initialParams,
    queryAddress,
  } = useLiveLoader<typeof loader>(['attest', 'create'])
  const { userIdentity, userTotals, isPending } =
    useRouteLoaderData<ProfileLoaderData>(
      'routes/app+/profile+/_index+/_layout',
    ) ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  const navigate = useNavigate()

  const {
    triplesCountWhere,
    positionsCountWhere,
    createdTriplesWhere,
    createdAtomsWhere,
    atomPositionsWhere,
    triplePositionsWhere,
  } = initialParams

  const {
    data: accountResult,
    isLoading: isLoadingAccount,
    isError: isErrorAccount,
    error: errorAccount,
  } = useGetAccountQuery(
    { address: queryAddress },
    { queryKey: ['get-account', { address: queryAddress }] },
  )

  const {
    data: triplesCountResult,
    isLoading: isLoadingTriplesCount,
    isError: isErrorTriplesCount,
    error: errorTriplesCount,
  } = useGetTriplesCountQuery(
    { where: triplesCountWhere },
    { queryKey: ['get-triples-count', { where: triplesCountWhere }] },
  )

  const {
    data: positionsCountResult,
    isLoading: isLoadingPositionsCount,
    isError: isErrorPositionsCount,
    error: errorPositionsCount,
  } = useGetPositionsCountQuery(
    { where: positionsCountWhere },
    { queryKey: ['get-positions-count', { where: positionsCountWhere }] },
  )

  const {
    data: createdTriplesResult,
    isLoading: isLoadingCreatedTriples,
    isError: isErrorCreatedTriples,
    error: errorCreatedTriples,
  } = useGetTriplesCountQuery(
    { where: createdTriplesWhere },
    { queryKey: ['get-created-triples', { where: createdTriplesWhere }] },
  )

  const {
    data: createdAtomsResult,
    isLoading: isLoadingCreatedAtoms,
    isError: isErrorCreatedAtoms,
    error: errorCreatedAtoms,
  } = useGetAtomsCountQuery(
    { where: createdAtomsWhere },
    { queryKey: ['get-created-atoms', { where: createdAtomsWhere }] },
  )

  const {
    data: atomPositionsResult,
    isLoading: isLoadingAtomPositions,
    isError: isErrorAtomPositions,
    error: errorAtomPositions,
  } = useGetPositionsCountByTypeQuery(
    {
      where: atomPositionsWhere,
    },
    {
      queryKey: ['get-atom-positions', { where: atomPositionsWhere }],
    },
  )

  const atomPositionsCount =
    atomPositionsResult?.positions_aggregate?.total?.count

  const {
    data: triplePositionsResult,
    isLoading: isLoadingTriplePositions,
    isError: isErrorTriplePositions,
    error: errorTriplePositions,
  } = useGetPositionsCountByTypeQuery(
    { where: triplePositionsWhere },
    { queryKey: ['get-triple-positions', { where: triplePositionsWhere }] },
  )

  // Log all query results
  logger('Account Result:', accountResult)
  logger('Triples Count Result:', triplesCountResult)
  logger('Positions Count Result:', positionsCountResult)
  logger('Created Triples Result:', createdTriplesResult)
  logger('Created Atoms Result:', createdAtomsResult)
  logger('Atom Positions Result:', atomPositionsResult)
  logger('Triple Positions Result:', triplePositionsResult)

  return (
    <div className="flex flex-col gap-12">
      {!isPending && !!questsProgress && (
        <QuestHeaderCard
          title={STANDARD_QUEST_SET.title ?? ''}
          subtitle={STANDARD_QUEST_SET.description ?? ''}
          numberOfCompletedQuests={questsProgress.numCompletedQuests}
          totalNumberOfQuests={questsProgress.numQuests}
          onButtonClick={() => navigate(STANDARD_QUEST_SET.navigatePath)}
        />
      )}

      <div className="flex flex-col gap-4">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground"
        >
          About
        </Text>
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <OverviewAboutHeader
            variant="claims"
            userIdentity={userIdentity}
            totalClaims={claims?.pagination?.totalEntries}
            totalStake={+formatBalance(claimsSummary?.assets_sum ?? 0, 18)}
            link={`${PATHS.PROFILE}/data-about`}
          />
          <OverviewAboutHeader
            variant="positions"
            userIdentity={userIdentity}
            totalPositions={positions?.pagination.totalEntries}
            totalStake={+formatBalance(userIdentity.assets_sum, 18)}
            link={`${PATHS.PROFILE}/data-about`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground"
        >
          User Stats
        </Text>
        <div className="flex flex-col items-center gap-6">
          <OverviewStakingHeader
            totalClaims={userTotals?.total_positions_on_claims ?? 0}
            totalIdentities={activeIdentities?.pagination.totalEntries ?? 0}
            totalStake={
              +formatBalance(userTotals?.total_position_value ?? '0', 18)
            }
            link={`${PATHS.PROFILE}/data-created`}
          />
          <div className="flex flex-row w-full items-center gap-6 max-md:flex-col">
            <OverviewCreatedHeader
              variant="identities"
              totalCreated={userTotals?.total_identities ?? 0}
              link={`${PATHS.PROFILE}/data-created`}
            />
            <OverviewCreatedHeader
              variant="claims"
              totalCreated={userTotals?.total_claims ?? 0}
              link={`${PATHS.PROFILE}/data-created`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground"
        >
          Top Lists
        </Text>
        <ListClaimsList
          listClaims={savedListClaims?.savedListClaims ?? []}
          enableSort={false}
          enableSearch={false}
        />
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="profile/index" />
}
