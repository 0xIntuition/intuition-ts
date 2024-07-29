import { Suspense } from 'react'

import { ErrorStateCard } from '@0xintuition/1ui'
import { ActivityPresenter } from '@0xintuition/api'

import { ActivityList } from '@components/list/activity'
import { RevalidateButton } from '@components/revalidate-button'
import { ActivitySkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getActivity } from '@lib/services/activity'
import { invariant } from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Await } from '@remix-run/react'
import { requireUser, requireUserWallet } from '@server/auth'
import { NO_WALLET_ERROR } from 'consts'
import { PaginationType } from 'types/pagination'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const user = await requireUser(request)
  invariant(user, 'User not found')
  invariant(user.wallet?.address, 'User wallet not found')
  const userWallet = user.wallet?.address

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  return defer({
    activity: getActivity({
      searchParams,
      fromAddress: userWallet,
    }),
  })
}

export default function PersonalActivityFeed() {
  const { activity } = useLiveLoader<typeof loader>(['attest', 'create'])

  return (
    <div className="mx-8 flex flex-col items-center gap-6">
      <Suspense fallback={<ActivitySkeleton />}>
        <Await
          resolve={Promise.all([activity])}
          errorElement={
            <ErrorStateCard>
              <RevalidateButton />
            </ErrorStateCard>
          }
        >
          {([resolvedActivity]) => (
            <ActivityList
              activities={resolvedActivity.activity as ActivityPresenter[]}
              pagination={resolvedActivity.pagination as PaginationType}
            />
          )}
        </Await>
      </Suspense>
    </div>
  )
}
