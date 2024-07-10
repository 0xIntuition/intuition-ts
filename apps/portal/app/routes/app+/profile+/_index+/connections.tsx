import { ReactNode } from 'react'

import {
  IdentityPosition,
  Input,
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPageCounter,
  PaginationPrevious,
  PaginationRowSelection,
  PaginationSummary,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@0xintuition/1ui'
import {
  ApiError,
  ClaimPresenter,
  ClaimsService,
  IdentitiesService,
  OpenAPI,
  SortColumn,
  SortDirection,
} from '@0xintuition/api'

import {
  ConnectionsHeader,
  ConnectionsHeaderVariants,
  ConnectionsHeaderVariantType,
} from '@components/profile/connections-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { fetchUserIdentity, fetchUserTotals } from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import {
  calculateTotalPages,
  formatBalance,
  getAuthHeaders,
} from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'

export async function loader({ context, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  const user = session.get('user')

  if (!user?.details?.wallet?.address) {
    return logger('No user found in session')
  }

  const userIdentity = await fetchUserIdentity(user.details.wallet.address)

  if (!userIdentity) {
    return redirect('/create')
  }

  if (!userIdentity.creator || typeof userIdentity.creator.id !== 'string') {
    return logger('Invalid or missing creator ID')
  }

  const userTotals = await fetchUserTotals(userIdentity.creator.id)

  if (!userIdentity.follow_claim_id) {
    return logger('No follow claim ID')
  }

  const followClaim = await ClaimsService.getClaimById({
    id: userIdentity.follow_claim_id,
  })

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  // const followersSearch = searchParams.get('followersSearch')
  const followersSortBy = searchParams.get('followersSortBy') ?? 'UserAssets'
  const followersDirection = searchParams.get('followersDirection') ?? 'desc'
  const followersPage = searchParams.get('followersPage')
    ? parseInt(searchParams.get('followersPage') as string)
    : 1
  const followersLimit = searchParams.get('limit') ?? '10'

  let followers
  try {
    followers = await IdentitiesService.getIdentityFollowers({
      id: userIdentity.id,
      page: followersPage,
      limit: Number(followersLimit),
      offset: 0,
      sortBy: followersSortBy as SortColumn,
      direction: followersDirection as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      followers = undefined
      logger(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const followersTotalPages = calculateTotalPages(
    followers?.total ?? 0,
    Number(followersLimit),
  )

  // const followingSearch = searchParams.get('followingSearch')
  const followingSortBy = searchParams.get('followingSortBy') ?? 'UserAssets'
  const followingDirection = searchParams.get('followingDirection') ?? 'desc'
  const followingPage = searchParams.get('followingPage')
    ? parseInt(searchParams.get('followingPage') as string)
    : 1
  const followingLimit = searchParams.get('limit') ?? '10'

  let following
  try {
    following = await IdentitiesService.getIdentityFollowed({
      id: userIdentity.id,
      page: followingPage,
      limit: Number(followingLimit),
      offset: 0,
      sortBy: followingSortBy as SortColumn,
      direction: followingDirection as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      following = undefined
      logger(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const followingTotalPages = calculateTotalPages(
    following?.total ?? 0,
    Number(followingLimit),
  )

  return json({
    userIdentity,
    userTotals,
    followClaim,
    followers: followers?.data,
    followersSortBy,
    followersDirection,
    followersPagination: {
      page: Number(followersPage),
      limit: Number(followersLimit),
      total: followers?.total,
      totalPages: followersTotalPages,
    },
    following: following?.data,
    followingSortBy,
    followingDirection,
    followingPagination: {
      page: Number(followingPage),
      limit: Number(followingLimit),
      total: following?.total,
      totalPages: followingTotalPages,
    },
  })
}

const TabContent = ({
  value,
  claim,
  variant,
  children,
}: {
  value: string
  claim: ClaimPresenter
  variant: ConnectionsHeaderVariantType
  children?: ReactNode
}) => {
  if (!claim.subject || !claim.predicate || !claim.object) {
    return null
  }
  return (
    <TabsContent value={value}>
      <ConnectionsHeader
        variant={variant}
        subject={claim.subject}
        predicate={claim.predicate}
        object={variant === 'followers' ? claim.object : '?'}
        total={'3.5467'}
      />
      {children}
    </TabsContent>
  )
}

export default function ProfileConnections() {
  const { followClaim, followersPagination, followingPagination } =
    useLiveLoader<typeof loader>(['attest'])
  return (
    <div className="flex flex-col items-center w-full mt-10">
      <Text
        variant="headline"
        weight="medium"
        className="theme-secondary-foreground w-full mb-3"
      >
        Connections
      </Text>

      <div className="w-full">
        <Tabs defaultValue={ConnectionsHeaderVariants.followers}>
          <TabsList>
            {/* TODO: Where does total count come from? */}
            <TabsTrigger
              value={ConnectionsHeaderVariants.followers}
              label="Followers"
              totalCount={followersPagination.total ?? 0}
            />
            <TabsTrigger
              value={ConnectionsHeaderVariants.following}
              label="Following"
              totalCount={followingPagination.total ?? 0}
            />
          </TabsList>
          <TabContent
            value={ConnectionsHeaderVariants.followers}
            claim={followClaim}
            variant={ConnectionsHeaderVariants.followers}
          >
            <FollowersOnIdentity />
          </TabContent>
          <TabContent
            value={ConnectionsHeaderVariants.following}
            claim={followClaim}
            variant={ConnectionsHeaderVariants.following}
          >
            <FollowingOnIdentity />
          </TabContent>
        </Tabs>
      </div>
    </div>
  )
}

export function FollowersOnIdentity() {
  const { followersPagination: pagination, followers } = useLiveLoader<
    typeof loader
  >(['attest'])
  const [searchParams, setSearchParams] = useSearchParams()

  const options = [
    { value: 'Position Amount', sortBy: 'UserAssets' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  const handleSortChange = (
    newSortBy: SortColumn,
    newDirection: SortDirection,
  ) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      followersSortBy: newSortBy,
      followersDirection: newDirection,
      followersPage: '1',
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value
    setSearchParams({
      ...Object.fromEntries(searchParams),
      followersSearch: newSearchValue,
      followersPage: '1',
    })
  }

  const onPageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      followersPage: newPage.toString(),
    })
  }

  return (
    <>
      <div className="flex flex-row justify-between w-full mt-6">
        <Input
          className="w-48"
          onChange={handleSearchChange}
          placeholder="Search"
          startAdornment="magnifying-glass"
        />
        <Select
          onValueChange={(value) => {
            const selectedOption = options.find(
              (option) => option.value.toLowerCase() === value,
            )
            if (selectedOption) {
              handleSortChange(selectedOption.sortBy as SortColumn, 'desc')
            }
          }}
        >
          <SelectTrigger className="w-50 rounded-xl border border-primary-600 bg-primary-50/5 text-card-foreground transition-colors duration-150 hover:cursor-pointer hover:border-primary-400 hover:bg-primary-50/10 hover:text-primary-foreground">
            <SelectValue placeholder={`Sort by`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value.toLowerCase()}
                value={option.value.toLowerCase()}
              >
                {option.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-6 flex flex-col w-full">
        {followers?.map((follower) => (
          <div
            key={follower.id}
            className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <IdentityPosition
              variant={follower.is_user ? 'user' : 'non-user'}
              avatarSrc={follower.user?.image ?? follower.image ?? ''}
              name={follower.user?.display_name ?? follower.display_name ?? ''}
              walletAddress={
                follower.user?.wallet ?? follower.identity_id ?? ''
              }
              amount={+formatBalance(BigInt(follower.user_assets), 18, 4)}
              feesAccrued={
                follower.user_asset_delta
                  ? +formatBalance(
                      +follower.user_assets - +follower.user_asset_delta,
                      18,
                      5,
                    )
                  : 0
              }
              updatedAt={follower.updated_at}
            />
          </div>
        ))}
      </div>
      <Pagination className="flex w-full justify-between my-4">
        <PaginationSummary
          totalEntries={pagination.total ?? 0}
          label="followers"
        />
        <div className="flex">
          <PaginationRowSelection defaultValue="10" />
          <PaginationPageCounter
            currentPage={pagination.page ?? 0}
            totalPages={pagination.totalPages ?? 0}
          />
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst
                href="#"
                onClick={() => onPageChange(1)}
                disabled={pagination.page === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={
                  pagination.page === 1 || pagination.page === undefined
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                href="#"
                onClick={() => onPageChange(pagination.totalPages)}
                disabled={pagination.page === pagination.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </div>
      </Pagination>
    </>
  )
}

export function FollowingOnIdentity() {
  const { followingPagination: pagination, following } = useLiveLoader<
    typeof loader
  >(['attest'])
  const [searchParams, setSearchParams] = useSearchParams()

  const options = [
    { value: 'Position Amount', sortBy: 'UserAssets' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  const handleSortChange = (
    newSortBy: SortColumn,
    newDirection: SortDirection,
  ) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      followersSortBy: newSortBy,
      followersDirection: newDirection,
      followersPage: '1',
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value
    setSearchParams({
      ...Object.fromEntries(searchParams),
      followersSearch: newSearchValue,
      followersPage: '1',
    })
  }

  const onPageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      followersPage: newPage.toString(),
    })
  }

  return (
    <>
      <div className="flex flex-row justify-between w-full mt-6">
        <Input
          className="w-48"
          onChange={handleSearchChange}
          placeholder="Search"
          startAdornment="magnifying-glass"
        />
        <Select
          onValueChange={(value) => {
            const selectedOption = options.find(
              (option) => option.value.toLowerCase() === value,
            )
            if (selectedOption) {
              handleSortChange(selectedOption.sortBy as SortColumn, 'desc')
            }
          }}
        >
          <SelectTrigger className="w-50 rounded-xl border border-primary-600 bg-primary-50/5 text-card-foreground transition-colors duration-150 hover:cursor-pointer hover:border-primary-400 hover:bg-primary-50/10 hover:text-primary-foreground">
            <SelectValue placeholder={`Sort by`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value.toLowerCase()}
                value={option.value.toLowerCase()}
              >
                {option.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-6 flex flex-col w-full">
        {following?.map((follower) => (
          <div
            key={follower.id}
            className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <IdentityPosition
              variant={follower.is_user ? 'user' : 'non-user'}
              avatarSrc={follower.user?.image ?? follower.image ?? ''}
              name={follower.user?.display_name ?? follower.display_name ?? ''}
              walletAddress={
                follower.user?.wallet ?? follower.identity_id ?? ''
              }
              amount={+formatBalance(BigInt(follower.user_assets), 18, 4)}
              feesAccrued={
                follower.user_asset_delta
                  ? +formatBalance(
                      +follower.user_assets - +follower.user_asset_delta,
                      18,
                      5,
                    )
                  : 0
              }
              updatedAt={follower.updated_at}
            />
          </div>
        ))}
      </div>
      <Pagination className="flex w-full justify-between my-4">
        <PaginationSummary
          totalEntries={pagination.total ?? 0}
          label="following"
        />
        <div className="flex">
          <PaginationRowSelection defaultValue="10" />
          <PaginationPageCounter
            currentPage={pagination.page ?? 0}
            totalPages={pagination.totalPages ?? 0}
          />
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst
                href="#"
                onClick={() => onPageChange(1)}
                disabled={pagination.page === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={
                  pagination.page === 1 || pagination.page === undefined
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                href="#"
                onClick={() => onPageChange(pagination.totalPages)}
                disabled={pagination.page === pagination.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </div>
      </Pagination>
    </>
  )
}
