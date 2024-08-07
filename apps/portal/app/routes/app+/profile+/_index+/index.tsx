import { QuestHeaderCard } from '@0xintuition/1ui'
import { ClaimsService } from '@0xintuition/api'

import OverviewAboutHeader from '@components/profile/overview-about-header'
import OverviewCreatedHeader from '@components/profile/overview-created-header'
import OverviewStakingHeader from '@components/profile/overview-staking-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getClaimsAboutIdentity } from '@lib/services/claims'
import { getPositionsOnIdentity } from '@lib/services/positions'
import { formatBalance, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useNavigate, useRouteLoaderData } from '@remix-run/react'
import { ProfileLoaderData } from '@routes/app+/profile+/_index+/_layout'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { NO_USER_IDENTITY_ERROR, NO_WALLET_ERROR, PATHS } from 'consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userWallet = await requireUserWallet(request)
  invariant(userWallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const mockUserQuestsData = {
    currentQuest: {
      title: 'Primitive Island',
      subtitle: 'Continue your journey',
    },
    questsCompleted: 1,
    totalQuests: 10,
  }

  return json({
    userQuests: mockUserQuestsData,
    positions: await getPositionsOnIdentity({
      request,
      identityId: userWallet,
      searchParams,
    }),
    claims: await getClaimsAboutIdentity({
      request,
      identityId: userWallet,
      searchParams,
    }),
    claimsSummary: await fetchWrapper(request, {
      method: ClaimsService.claimSummary,
      args: {
        identity: userWallet,
      },
    }),
  })
}

export default function ProfileOverview() {
  const { userQuests, claims, positions, claimsSummary } = useLiveLoader<
    typeof loader
  >(['attest', 'create'])
  const { userIdentity, userTotals } =
    useRouteLoaderData<ProfileLoaderData>(
      'routes/app+/profile+/_index+/_layout',
    ) ?? {}
  invariant(userIdentity, NO_USER_IDENTITY_ERROR)

  const navigate = useNavigate()

  console.log('userTotals', userTotals)

  return (
    <div className="flex flex-col gap-6">
      <QuestHeaderCard
        title={userQuests.currentQuest.title}
        subtitle={userQuests.currentQuest.subtitle}
        numberOfCompletedQuests={userQuests.questsCompleted}
        totalNumberOfQuests={userQuests.totalQuests}
        onButtonClick={() => navigate(PATHS.QUEST)}
      />
      <h2 className="font-medium text-xl text-secondary-foreground">About</h2>
      <div className="flex flex-row items-center gap-6">
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
      <h2 className="font-medium text-xl text-secondary-foreground">
        User Stats
      </h2>
      <OverviewStakingHeader
        totalClaims={userTotals?.total_positions_on_claims ?? 0}
        totalIdentities={userTotals?.total_positions_on_identities ?? 0}
        totalStake={+formatBalance(userTotals?.total_position_value ?? '0', 18)}
        link={`${PATHS.PROFILE}/data-created`}
      />
      <div className="flex flex-row items-center gap-6">
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
  )
}
