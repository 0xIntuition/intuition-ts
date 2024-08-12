import { QuestHeaderCard, Text } from '@0xintuition/1ui'
import {
  ApiError,
  ClaimSortColumn,
  ClaimsService,
  IdentitiesService,
  QuestNarrative,
  SortDirection,
} from '@0xintuition/api'

import { ListClaimsList } from '@components/list/list-claims'
import { OverviewAboutHeader } from '@components/profile/overview-about-header'
import { OverviewCreatedHeader } from '@components/profile/overview-created-header'
import { OverviewStakingHeader } from '@components/profile/overview-staking-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaimsAboutIdentity } from '@lib/services/claims'
import { getUserSavedLists } from '@lib/services/lists'
import { getPositionsOnIdentity } from '@lib/services/positions'
import logger from '@lib/utils/logger'
import { formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useNavigate, useRouteLoaderData } from '@remix-run/react'
import { ProfileLoaderData } from '@routes/app+/profile+/_index+/_layout'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { getQuestsProgress } from '@server/quest'
import { NO_USER_IDENTITY_ERROR, NO_WALLET_ERROR, PATHS } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  let userIdentity
  try {
    userIdentity = await fetchWrapper(request, {
      method: IdentitiesService.getIdentityById,
      args: { id: userWallet },
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw redirect('/invite')
    }
    logger('Error fetching userIdentity', error)
    throw error
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const listSearchParams = new URLSearchParams()
  listSearchParams.set('sortBy', ClaimSortColumn.ASSETS_SUM)
  listSearchParams.set('direction', SortDirection.DESC)
  listSearchParams.set('limit', '6')

  return json({
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
  })
}

export default function UserProfileOverview() {
  const { questsProgress, claims, positions, claimsSummary, savedListClaims } =
    useLiveLoader<typeof loader>(['attest', 'create'])
  const { userIdentity, userTotals } =
    useRouteLoaderData<ProfileLoaderData>(
      'routes/app+/profile+/_index+/_layout',
    ) ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  const navigate = useNavigate()

  const currentQuest = questsProgress.numCompletedQuests

  return (
    <div className="flex flex-col gap-6">
      <QuestHeaderCard
        title={questsProgress.quests[currentQuest].title ?? ''}
        subtitle={questsProgress.quests[currentQuest].description ?? ''}
        numberOfCompletedQuests={questsProgress.numCompletedQuests}
        totalNumberOfQuests={questsProgress.numQuests}
        onButtonClick={() => navigate(PATHS.QUEST)}
      />

      <Text
        variant="headline"
        weight="medium"
        className="text-secondary-foreground"
      >
        About
      </Text>
      <div className="flex flex-row items-center gap-6 max-lg:flex-col">
        <OverviewAboutHeader
          variant="claims"
          userIdentity={userIdentity}
          totalClaims={claims.pagination?.totalEntries}
          totalStake={+formatBalance(claimsSummary?.assets_sum ?? 0, 18, 4)}
          link={`${PATHS.PROFILE}/data-about`}
        />
        <OverviewAboutHeader
          variant="positions"
          userIdentity={userIdentity}
          totalPositions={positions.pagination.totalEntries}
          totalStake={+formatBalance(userIdentity.assets_sum, 18, 4)}
          link={`${PATHS.PROFILE}/data-about`}
        />
      </div>
      <Text
        variant="headline"
        weight="medium"
        className="text-secondary-foreground"
      >
        User Stats
      </Text>
      <OverviewStakingHeader
        totalClaims={userTotals?.total_positions_on_claims ?? 0}
        totalIdentities={userTotals?.total_positions_on_identities ?? 0}
        totalStake={+formatBalance(userTotals?.total_position_value ?? '0', 18)}
        link={`${PATHS.PROFILE}/data-created`}
      />
      <div className="flex flex-row items-center gap-6 max-md:flex-col">
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
      <Text
        variant="headline"
        weight="medium"
        className="text-secondary-foreground"
      >
        Top Lists
      </Text>
      <ListClaimsList
        listClaims={savedListClaims.savedListClaims}
        enableSort={false}
        enableSearch={false}
        columns={3}
      />
    </div>
  )
}
