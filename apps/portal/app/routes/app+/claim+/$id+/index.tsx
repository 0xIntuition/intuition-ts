import { Suspense, useEffect, useState } from 'react'

import {
  Claim,
  Identity,
  Tabs,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'
import { ClaimsService, IdentityPresenter, VaultType } from '@0xintuition/api'

import { ErrorPage } from '@components/error-page'
import { PositionsOnClaim } from '@components/list/positions-on-claim'
import { PaginatedListSkeleton, TabsSkeleton } from '@components/skeleton'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { getPositionsOnClaim } from '@lib/services/positions'
import {
  getAtomDescription,
  getAtomImage,
  getAtomIpfsLink,
  getAtomLabel,
  getAtomLink,
  invariant,
} from '@lib/utils/misc'
import { defer, LoaderFunctionArgs } from '@remix-run/node'
import {
  Await,
  useNavigation,
  useRouteLoaderData,
  useSearchParams,
} from '@remix-run/react'
import { ClaimDetailsLoaderData } from '@routes/app+/claim+/$id'
import { fetchWrapper } from '@server/api'
import { requireUserWallet } from '@server/auth'
import { NO_CLAIM_ERROR, NO_PARAM_ID_ERROR, NO_WALLET_ERROR } from 'app/consts'
import { PaginationType } from 'app/types/pagination'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)
  const wallet = await requireUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  return defer({
    positionsData: getPositionsOnClaim({
      request,
      claimId: id,
      searchParams,
    }),
    claim: fetchWrapper(request, {
      method: ClaimsService.getClaimById,
      args: { id },
    }),
  })
}

export default function ClaimOverview() {
  const { positionsData } = useLiveLoader<typeof loader>(['attest', 'create'])
  const { claim } =
    useRouteLoaderData<ClaimDetailsLoaderData>('routes/app+/claim+/$id') ?? {}
  invariant(claim, NO_CLAIM_ERROR)

  const [searchParams, setSearchParams] = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)

  const { state } = useNavigation()

  function handleTabChange(value: VaultType | null) {
    const newParams = new URLSearchParams(searchParams)
    if (value === null) {
      newParams.delete('positionDirection')
    } else {
      newParams.set('positionDirection', value)
    }
    newParams.delete('positionsSearch')
    newParams.set('page', '1')
    setSearchParams(newParams)
    setIsNavigating(true)
  }

  useEffect(() => {
    if (state === 'idle') {
      setIsNavigating(false)
    }
  }, [state])

  return (
    <div className="flex-col justify-start items-start flex w-full gap-6">
      <div className="flex-row hidden md:flex">
        <Claim
          size="xl"
          maxIdentityLength={60}
          subject={{
            variant: claim.subject?.is_user ? Identity.user : Identity.nonUser,
            label: getAtomLabel(claim.subject as IdentityPresenter),
            imgSrc: getAtomImage(claim.subject as IdentityPresenter),
            id: claim.subject?.identity_id,
            description: getAtomDescription(claim.subject as IdentityPresenter),
            ipfsLink: getAtomIpfsLink(claim.subject as IdentityPresenter),
            link: getAtomLink(claim.subject as IdentityPresenter),
          }}
          predicate={{
            variant: claim.predicate?.is_user
              ? Identity.user
              : Identity.nonUser,
            label: getAtomLabel(claim.predicate as IdentityPresenter),
            imgSrc: getAtomImage(claim.predicate as IdentityPresenter),
            id: claim.predicate?.identity_id,
            description: getAtomDescription(
              claim.predicate as IdentityPresenter,
            ),
            ipfsLink: getAtomIpfsLink(claim.predicate as IdentityPresenter),
            link: getAtomLink(claim.predicate as IdentityPresenter),
          }}
          object={{
            variant: claim.object?.is_user ? Identity.user : Identity.nonUser,
            label: getAtomLabel(claim.object as IdentityPresenter),
            imgSrc: getAtomImage(claim.object as IdentityPresenter),
            id: claim.object?.identity_id,
            description: getAtomDescription(claim.object as IdentityPresenter),
            ipfsLink: getAtomIpfsLink(claim.object as IdentityPresenter),
            link: getAtomLink(claim.object as IdentityPresenter),
          }}
        />
      </div>
      <div className="self-stretch justify-between items-center inline-flex mt-6">
        <Text
          variant="headline"
          weight="medium"
          className="text-secondary-foreground w-full"
        >
          Positions on this Claim
        </Text>
      </div>
      <Tabs defaultValue="all">
        <Suspense fallback={<TabsSkeleton numOfTabs={3} />}>
          <Await resolve={positionsData}>
            <TabsList>
              <TabsTrigger
                value="all"
                label="All"
                totalCount={claim.num_positions}
                onClick={(e) => {
                  e.preventDefault()
                  handleTabChange(null)
                }}
              />
              <TabsTrigger
                value="for"
                label="For"
                totalCount={claim.for_num_positions}
                onClick={(e) => {
                  e.preventDefault()
                  handleTabChange('for')
                }}
              />
              <TabsTrigger
                value="against"
                label="Against"
                totalCount={claim.against_num_positions}
                onClick={(e) => {
                  e.preventDefault()
                  handleTabChange('against')
                }}
              />
            </TabsList>
          </Await>
        </Suspense>
      </Tabs>
      <Suspense fallback={<PaginatedListSkeleton />}>
        {isNavigating ? (
          <PaginatedListSkeleton />
        ) : (
          <Await resolve={positionsData}>
            {(resolvedPositionsData) => (
              <PositionsOnClaim
                positions={resolvedPositionsData.data}
                pagination={resolvedPositionsData.pagination as PaginationType}
              />
            )}
          </Await>
        )}
      </Suspense>
    </div>
  )
}

export function ErrorBoundary() {
  return <ErrorPage routeName="claim/$id/index" />
}
