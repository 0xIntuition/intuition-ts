import {
  Claim,
  ClaimPosition,
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
} from '@0xintuition/1ui'
import {
  ApiError,
  OpenAPI,
  SortColumn,
  SortDirection,
  UsersService,
} from '@0xintuition/api'

import { DataCreatedHeader } from '@components/profile/data-created-header'
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
    return logger('No user identity found')
  }

  if (!userIdentity.creator || typeof userIdentity.creator.id !== 'string') {
    logger('Invalid or missing creator ID')
    return
  }

  const userTotals = await fetchUserTotals(userIdentity.creator.id)

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  // const identitiesSearch = searchParams.get('identitiesSearch')
  const identitiesSortBy = searchParams.get('identitiesSortBy') ?? 'UserAssets'
  const identitiesDirection = searchParams.get('identitiesDirection') ?? 'desc'
  const identitiesPage = searchParams.get('identitiesPage')
    ? parseInt(searchParams.get('identitiesPage') as string)
    : 1
  const identitiesLimit = searchParams.get('limit') ?? '10'

  let identities
  try {
    identities = await UsersService.getUserIdentities({
      user: user.details.wallet.address,
      page: identitiesPage,
      limit: Number(identitiesLimit),
      offset: 0,
      sortBy: identitiesSortBy as SortColumn,
      direction: identitiesDirection as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      identities = undefined
      logger(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  console.log('identites', identities)

  const identitiesTotalPages = calculateTotalPages(
    identities?.total ?? 0,
    Number(identitiesLimit),
  )

  // const claimsSearch = searchParams.get('claimsSearch')
  const claimsSortBy = searchParams.get('claimsSortBy') ?? 'AssetsSum'
  const claimsDirection = searchParams.get('claimsDirection') ?? 'desc'
  const claimsPage = searchParams.get('claimsPage')
    ? parseInt(searchParams.get('claimsPage') as string)
    : 1
  const claimsLimit = searchParams.get('claimsLimit') ?? '10'

  let claims
  try {
    claims = await UsersService.getUserClaims({
      user: user.details.wallet.address,
      page: claimsPage,
      limit: Number(claimsLimit),
      offset: 0,
      sortBy: claimsSortBy as SortColumn,
      direction: claimsDirection as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      claims = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const claimsTotalPages = calculateTotalPages(
    claims?.total ?? 0,
    Number(claimsLimit),
  )

  return json({
    userIdentity,
    userTotals,
    identities: identities?.data,
    identitiesSortBy,
    identitiesDirection,
    identitiesPagination: {
      page: Number(identitiesPage),
      limit: Number(identitiesLimit),
      total: identities?.total,
      totalPages: identitiesTotalPages,
    },
    claims: claims?.data,
    claimsSortBy,
    claimsDirection,
    claimsPagination: {
      page: Number(claimsPage),
      limit: Number(claimsLimit),
      total: claims?.total,
      totalPages: claimsTotalPages,
    },
  })
}

export default function ProfileDataCreated() {
  const { identitiesPagination, claimsPagination } = useLiveLoader<
    typeof loader
  >(['attest'])
  return (
    <div className="flex-col justify-start items-start flex w-full">
      <div className="self-stretch justify-between items-center inline-flex mb-4">
        <div className="grow shrink basis-0 text-white text-xl font-medium leading-[30px]">
          Active Positions
        </div>
      </div>
      <Tabs defaultValue="identities" className="w-full">
        <TabsList>
          <TabsTrigger
            value="identities"
            label="Identities"
            totalCount={identitiesPagination.total}
          />
          <TabsTrigger
            value="claims"
            label="Claims"
            totalCount={claimsPagination.total}
          />
        </TabsList>
        <TabsContent value="identities" className="w-full">
          <PositionsOnIdentities />
        </TabsContent>
        <TabsContent value="claims">
          <PositionsOnClaims />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function PositionsOnIdentities() {
  const {
    userIdentity,
    userTotals,
    identitiesPagination: pagination,
    identities,
  } = useLiveLoader<typeof loader>(['attest'])
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
      identitiesSortBy: newSortBy,
      identitiesDirection: newDirection,
      identitiesPage: '1',
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value
    setSearchParams({
      ...Object.fromEntries(searchParams),
      identitiesSearch: newSearchValue,
      identitiesPage: '1',
    })
  }

  const onPageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      identitiesPage: newPage.toString(),
    })
  }

  return (
    <>
      <DataCreatedHeader userIdentity={userIdentity} userTotals={userTotals} />
      <div className="flex flex-row justify-between w-full mt-6">
        <Input
          className="w-[196px]"
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
          <SelectTrigger className="w-[200px] rounded-xl border border-primary-600 bg-primary-50/5 text-card-foreground transition-colors duration-150 hover:cursor-pointer hover:border-primary-400 hover:bg-primary-50/10 hover:text-primary-foreground">
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
        {identities?.map((identity) => (
          <div
            key={identity.id}
            className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <IdentityPosition
              variant={identity.is_user ? 'user' : 'non-user'}
              avatarSrc={identity.user?.image ?? identity.image ?? ''}
              name={identity.user?.display_name ?? identity.display_name ?? ''}
              walletAddress={
                identity.user?.wallet ?? identity.identity_id ?? ''
              }
              amount={+formatBalance(BigInt(identity.user_assets), 18, 4)}
              feesAccrued={
                identity.user_asset_delta
                  ? +formatBalance(
                      +identity.user_assets - +identity.user_asset_delta,
                      18,
                      5,
                    )
                  : 0
              }
              updatedAt={identity.updated_at}
            />
          </div>
        ))}
      </div>
      <Pagination className="flex w-full justify-between my-4">
        <PaginationSummary
          totalEntries={pagination.total ?? 0}
          label="positions"
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

export function PositionsOnClaims() {
  const {
    userIdentity,
    userTotals,
    claimsPagination: pagination,
    claims,
  } = useLiveLoader<typeof loader>(['attest'])
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
      claimsSortBy: newSortBy,
      claimsDirection: newDirection,
      claimsPage: '1',
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value
    setSearchParams({
      ...Object.fromEntries(searchParams),
      claimsSearch: newSearchValue,
      claimsPage: '1',
    })
  }

  const onPageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      claimsPage: newPage.toString(),
    })
  }

  return (
    <>
      <DataCreatedHeader userIdentity={userIdentity} userTotals={userTotals} />
      <div className="flex flex-row justify-between w-full mt-6">
        <Input
          className="w-[196px]"
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
          <SelectTrigger className="w-[200px] rounded-xl border border-primary-600 bg-primary-50/5 text-card-foreground transition-colors duration-150 hover:cursor-pointer hover:border-primary-400 hover:bg-primary-50/10 hover:text-primary-foreground">
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
        {claims?.map((claim) => (
          <div
            key={claim.claim_id}
            className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <ClaimPosition
              variant="claim"
              position={
                claim.user_assets_for > '0' ? 'claimFor' : 'claimAgainst'
              }
              claimsFor={claim.for_num_positions}
              claimsAgainst={claim.against_num_positions}
              amount={
                +formatBalance(
                  claim.user_assets_for > '0'
                    ? claim.user_assets_for
                    : claim.user_assets_against,
                  18,
                  5,
                )
              }
              feesAccrued={0}
            />
          </div>
        ))}
      </div>
      <Pagination className="flex w-full justify-between my-4">
        <PaginationSummary
          totalEntries={pagination.total ?? 0}
          label="positions"
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
