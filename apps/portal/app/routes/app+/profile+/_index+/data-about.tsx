import {
  Claim,
  ClaimRow,
  IdentityPosition,
  IdentityTag,
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
} from '@0xintuition/1ui'
import {
  ApiError,
  ClaimSortColumn,
  ClaimsService,
  IdentityPositionsService,
  OpenAPI,
  PositionSortColumn,
  SortDirection,
} from '@0xintuition/api'

import DataAboutHeader from '@components/profile/data-about-header'
import { useLiveLoader } from '@lib/hooks/useLiveLoader'
import { fetchUserIdentity } from '@lib/utils/fetches'
import logger from '@lib/utils/logger'
import {
  calculateTotalPages,
  formatBalance,
  getAuthHeaders,
} from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'
import { formatUnits } from 'viem'

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

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const positionsSearch = searchParams.get('positionsSearch')
  const positionsSortBy = searchParams.get('positionsSortBy') ?? 'Assets'
  const positionsDirection = searchParams.get('positionsDirection') ?? 'desc'
  const positionsPage = searchParams.get('positionsPage')
    ? parseInt(searchParams.get('positionsPage') as string)
    : 1
  const positionsLimit = searchParams.get('positionsLimit') ?? '10'

  // const positions = await fetchPositionsByIdentity(
  //   user.details.wallet.address,
  //   page,
  //   Number(limit),
  //   sortBy as PositionSortColumn,
  //   direction as SortDirection,
  // )

  // const claims = await fetchClaimsByIdentity(
  //   user.details.wallet.address,
  //   page,
  //   Number(limit),
  //   sortBy as ClaimSortColumn,
  //   direction as SortDirection,
  // )

  let positions
  try {
    positions = await IdentityPositionsService.getIdentityPositions({
      id: user.details.wallet.address,
      page: positionsPage,
      limit: Number(positionsLimit),
      offset: 0,
      sortBy: positionsSortBy as PositionSortColumn,
      direction: positionsDirection as SortDirection,
      creator: positionsSearch,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      positions = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const positionsTotalPages = calculateTotalPages(
    positions?.total ?? 0,
    Number(positionsLimit),
  )

  const claimsSearch = searchParams.get('claimsSearch')
  const claimsSortBy = searchParams.get('claimsSortBy') ?? 'AssetsSum'
  const claimsDirection = searchParams.get('claimsDirection') ?? 'desc'
  const claimsPage = searchParams.get('claimsPage')
    ? parseInt(searchParams.get('claimsPage') as string)
    : 1
  const claimsLimit = searchParams.get('claimsLimit') ?? '10'

  let claims
  try {
    claims = await ClaimsService.searchClaims({
      identity: userIdentity?.id,
      page: claimsPage,
      limit: Number(claimsLimit),
      offset: 0,
      sortBy: claimsSortBy as ClaimSortColumn,
      direction: claimsDirection as SortDirection,
      displayName: claimsSearch,
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
    positions: positions?.data,
    positionsSortBy,
    positionsDirection,
    positionsPagination: {
      page: Number(positionsPage),
      limit: Number(positionsLimit),
      total: positions?.total,
      totalPages: positionsTotalPages,
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

export default function ProfileDataAbout() {
  // const initialData = useLiveLoader<typeof loader>(['attest'])
  return (
    <div className="flex-col justify-start items-start flex w-full">
      {/* <ClaimsOnIdentity initialData={initialData as InitialIdentityData} />
      <PositionsOnIdentity initialData={initialData as InitialIdentityData} /> */}
      <ClaimsOnIdentity />
      <PositionsOnIdentity />
    </div>
  )
}

export function PositionsOnIdentity() {
  const {
    userIdentity,
    positions,
    positionsPagination: pagination,
  } = useLiveLoader<typeof loader>(['attest'])
  const [searchParams, setSearchParams] = useSearchParams()

  const options = [
    { value: 'Total ETH', sortBy: 'Assets' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  const handleSortChange = (
    newSortBy: PositionSortColumn,
    newDirection: SortDirection,
  ) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      positionsSortBy: newSortBy,
      positionsDirection: newDirection,
      positionsPage: '1',
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value
    setSearchParams({
      ...Object.fromEntries(searchParams),
      positionsSearch: newSearchValue,
      positionsPage: '1',
    })
  }

  const onPageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      positionsPage: newPage.toString(),
    })
  }

  return (
    <>
      <div className="h-[184px] flex-col justify-start items-start gap-3 flex w-full">
        <div className="self-stretch justify-between items-center inline-flex">
          <div className="grow shrink basis-0 text-white text-xl font-medium leading-[30px]">
            Positions on this Identity
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <div className="grow shrink basis-0 self-stretch p-6 bg-black rounded-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch justify-start items-start gap-5 inline-flex">
              <div className="justify-start items-center gap-1.5 flex">
                <div className="text-white/60 text-sm font-normal leading-tight">
                  Positions staked on
                </div>
                <IdentityTag
                  imgSrc={userIdentity?.user?.image ?? userIdentity?.image}
                  variant={userIdentity?.user ? 'user' : 'non-user'}
                >
                  <span className="min-w-20 text-ellipsis">
                    {userIdentity?.user?.display_name ??
                      userIdentity?.display_name}
                  </span>
                </IdentityTag>
              </div>
            </div>
            <div className="self-stretch justify-between items-start inline-flex">
              <div className="flex-col justify-start items-end inline-flex">
                <div className="self-stretch text-white/60 text-xs font-normal leading-[18px]">
                  Total stake
                </div>
                <div className="self-stretch text-white text-xl font-medium leading-[30px]">
                  {formatBalance(userIdentity?.assets_sum ?? '0', 18, 4)} ETH
                </div>
              </div>
              <div className="flex-col justify-start items-end inline-flex">
                <div className="self-stretch text-right text-white/60 text-xs font-normal leading-[18px]">
                  Positions
                </div>
                <div className="self-stretch text-right text-white text-xl font-medium leading-[30px]">
                  {userIdentity?.num_positions}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full mt-6">
        <Input className="w-[196px]" onChange={handleSearchChange} />
        <Select
          onValueChange={(value) => {
            const selectedOption = options.find(
              (option) => option.value.toLowerCase() === value,
            )
            if (selectedOption) {
              handleSortChange(
                selectedOption.sortBy as PositionSortColumn,
                'desc',
              )
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
        {positions?.map((position) => (
          <div
            key={position.id}
            className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex`}
          >
            <IdentityPosition
              variant="user"
              avatarSrc={position.user?.image ?? ''}
              name={position.user?.display_name ?? ''}
              walletAddress={position.user?.wallet ?? ''}
              amount={+formatBalance(BigInt(position.assets), 18, 4)}
              feesAccrued={Number(
                formatUnits(BigInt(+position.assets - +position.value), 18),
              )}
              updatedAt={position.updated_at}
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

export function ClaimsOnIdentity() {
  const {
    userIdentity,
    claims,
    claimsPagination: pagination,
  } = useLiveLoader<typeof loader>(['attest'])
  const [searchParams, setSearchParams] = useSearchParams()

  const options = [
    { value: 'Total ETH', sortBy: 'AssetsSum' },
    { value: 'ETH For', sortBy: 'ForAssetsSum' },
    { value: 'ETH Against', sortBy: 'AgainstAssetsSum' },
    { value: 'Total Positions', sortBy: 'NumPositions' },
    { value: 'Positions For', sortBy: 'ForNumPositions' },
    { value: 'Positions Against', sortBy: 'AgainstNumPositions' },
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Created At', sortBy: 'CreatedAt' },
  ]

  const handleSortChange = (
    newSortBy: ClaimSortColumn,
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
      <DataAboutHeader
        title="Claims on this Identity"
        userIdentity={userIdentity}
        totalClaims={pagination?.total}
        totalStake={16.25} // TODO: Where does this come from? -- Vital: This should be the total amount of ETH across all of the claims. It's hardcoded for now.
      />
      <div className="flex flex-row justify-between w-full mt-6">
        <Input
          className="w-[196px]"
          onChange={handleSearchChange}
          startAdornment="magnifying-glass"
        />
        <Select
          onValueChange={(value) => {
            const selectedOption = options.find(
              (option) => option.value.toLowerCase() === value,
            )
            if (selectedOption) {
              handleSortChange(selectedOption.sortBy as ClaimSortColumn, 'desc')
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
            className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start gap-5 inline-flex`}
          >
            <ClaimRow
              claimsFor={claim.for_num_positions}
              claimsAgainst={claim.against_num_positions}
              amount={+formatBalance(claim.assets_sum, 18, 4)}
            >
              <Claim
                subject={{
                  variant: claim.subject?.is_user ? 'user' : 'non-user',
                  label:
                    claim.subject?.user?.display_name ??
                    claim.subject?.display_name ??
                    claim.subject?.identity_id ??
                    '',
                  imgSrc: claim.subject?.image ?? '',
                }}
                predicate={{
                  variant: claim.predicate?.is_user ? 'user' : 'non-user',
                  label:
                    claim.predicate?.user?.display_name ??
                    claim.predicate?.display_name ??
                    claim.predicate?.identity_id ??
                    '',
                  imgSrc: claim.predicate?.image ?? '',
                }}
                object={{
                  variant: claim.object?.is_user ? 'user' : 'non-user',
                  label:
                    claim.object?.user?.display_name ??
                    claim.object?.display_name ??
                    claim.object?.identity_id ??
                    '',
                  imgSrc: claim.object?.image ?? '',
                }}
              />
            </ClaimRow>
          </div>
        ))}
      </div>
      <Pagination className="flex w-full justify-between my-4">
        <PaginationSummary
          totalEntries={pagination.total ?? 0}
          label="claims"
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
