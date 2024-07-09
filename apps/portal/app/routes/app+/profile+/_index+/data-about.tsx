import { useEffect, useState } from 'react'

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
  ClaimPresenter,
  ClaimSortColumn,
  ClaimsService,
  OpenAPI,
  PositionPresenter,
  PositionSortColumn,
  PositionsService,
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
import { useFetcher, useSearchParams } from '@remix-run/react'
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

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  // const search = searchParams.get('search')
  const sortBy = searchParams.get('sortBy') ?? 'UpdatedAt'
  const direction = searchParams.get('direction') ?? 'asc'
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1
  const limit = searchParams.get('limit') ?? '10'

  let positions
  try {
    positions = await PositionsService.searchPositions({
      identity: user.details.wallet.address,
      paging: {
        page: page,
        limit: Number(limit),
        offset: 0,
      },
      sort: {
        sortBy: sortBy as PositionSortColumn,
        direction: direction as SortDirection,
      },
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      positions = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  let claims
  try {
    claims = await ClaimsService.searchClaims({
      identity: userIdentity?.id,
      page: page,
      limit: Number(limit),
      offset: 0,
      sortBy: sortBy as ClaimSortColumn,
      direction: direction as SortDirection,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      claims = undefined
      console.log(`${error.name} - ${error.status}: ${error.message}`)
    } else {
      throw error
    }
  }

  const totalPages = calculateTotalPages(positions?.total ?? 0, Number(limit))

  return json({
    userIdentity,
    positions,
    claims,
    sortBy,
    direction,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: positions?.total,
      totalPages,
    },
  })
}

export default function ProfileDataAbout() {
  return (
    <div className="flex-col justify-start items-start flex w-full">
      <ClaimsOnIdentity />
      <PositionsOnIdentity />
    </div>
  )
}

export function PositionsOnIdentity() {
  const initialData = useLiveLoader<typeof loader>(['attest'])
  const { userIdentity, pagination } = initialData
  const fetcher = useFetcher<typeof loader>()
  const [positions, setPositions] = useState<PositionPresenter[]>(
    initialData.positions?.data ?? [],
  )
  const [searchParams, setSearchParams] = useSearchParams()

  console.log('fetcher.data', fetcher.data)
  useEffect(() => {
    if (fetcher.data) {
      setPositions(fetcher.data.positions?.data as PositionPresenter[])
    }
  }, [fetcher.data])

  useEffect(() => {
    setPositions(initialData.positions?.data as PositionPresenter[])
  }, [initialData.positions])

  const options = [
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Total ETH', sortBy: 'Assets' },
  ]

  const handleSortChange = (
    newSortBy: PositionSortColumn,
    newDirection: SortDirection,
  ) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sortBy: newSortBy,
      direction: newDirection,
      page: '1',
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value
    setSearchParams({
      ...Object.fromEntries(searchParams),
      search: newSearchValue,
      page: '1',
    })
  }

  const onPageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage.toString(),
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
              handleSortChange(selectedOption.sortBy, 'desc')
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
              avatarSrc={position.user?.image}
              name={position.user?.display_name}
              walletAddress={position.user?.wallet}
              amount={formatBalance(BigInt(position.assets), 18, 4)}
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
  const initialData = useLiveLoader<typeof loader>(['attest'])
  const { userIdentity, pagination } = initialData
  const fetcher = useFetcher<typeof loader>()
  const [claims, setClaims] = useState<ClaimPresenter[]>(
    initialData.claims?.data ?? [],
  )
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (fetcher.data) {
      setClaims(fetcher.data.claims?.data as ClaimPresenter[])
    }
  }, [fetcher.data])

  useEffect(() => {
    setClaims(initialData.claims?.data as ClaimPresenter[])
  }, [initialData.positions])

  const options = [
    { value: 'Updated At', sortBy: 'UpdatedAt' },
    { value: 'Total ETH', sortBy: 'AssetsSum' },
  ]

  const handleSortChange = (
    newSortBy: ClaimSortColumn,
    newDirection: SortDirection,
  ) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sortBy: newSortBy,
      direction: newDirection,
      page: '1',
    })
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value
    setSearchParams({
      ...Object.fromEntries(searchParams),
      search: newSearchValue,
      page: '1',
    })
  }

  const onPageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage.toString(),
    })
  }

  return (
    <>
      <DataAboutHeader
        title="Claims on this Identity"
        userIdentity={userIdentity}
        totalClaims={initialData.claims?.total}
        totalStake={16.25} // TODO: Where does this come from?
      />
      <div className="flex flex-row justify-between w-full mt-6">
        <Input className="w-[196px]" onChange={handleSearchChange} />
        <Select
          onValueChange={(value) => {
            const selectedOption = options.find(
              (option) => option.value.toLowerCase() === value,
            )
            if (selectedOption) {
              handleSortChange(selectedOption.sortBy, 'desc')
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
            className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start  gap-5 inline-flex`}
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
                    claim.subject?.identity_id,
                  imgSrc: claim.subject?.image,
                }}
                predicate={{
                  variant: claim.predicate?.is_user ? 'user' : 'non-user',
                  label:
                    claim.predicate?.user?.display_name ??
                    claim.predicate?.display_name ??
                    claim.predicate?.identity_id,
                  imgSrc: claim.predicate?.image,
                }}
                object={{
                  variant: claim.object?.is_user ? 'user' : 'non-user',
                  label:
                    claim.object?.user?.display_name ??
                    claim.object?.display_name ??
                    claim.object?.identity_id,
                  imgSrc: claim.object?.image,
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
