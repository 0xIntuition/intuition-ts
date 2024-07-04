import { useEffect, useRef, useState } from 'react'

import {
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
  IdentitiesService,
  OpenAPI,
  PositionPresenter,
  PositionSortColumn,
  PositionsService,
  SortDirection,
} from '@0xintuition/api'

import logger from '@lib/utils/logger'
import {
  calculateTotalPages,
  formatBalance,
  getAuthHeaders,
} from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'
import { formatUnits } from 'viem'

export async function loader({ context, request }: LoaderFunctionArgs) {
  OpenAPI.BASE = 'https://dev.api.intuition.systems'
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>

  const session = context.get(SessionContext)
  const user = session.get('user')
  console.log('accessToken', accessToken)

  if (!user?.details?.wallet?.address) {
    return console.log('No user found in session')
  }

  let userIdentity
  try {
    userIdentity = await IdentitiesService.getIdentityById({
      id: user.details.wallet.address,
    })
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      userIdentity = undefined
      logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
    } else {
      throw error
    }
  }

  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const positionsSortBy: PositionSortColumn =
    (searchParams.get('sortBy') as PositionSortColumn) ?? 'createdAt'
  const positionsDirection: SortDirection =
    (searchParams.get('direction') as SortDirection) ?? 'desc'
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
        sortBy: positionsSortBy,
        direction: positionsDirection,
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

  const totalPages = calculateTotalPages(positions?.total ?? 0, Number(limit))

  console.log('positions', positions)
  return json({
    userIdentity,
    positions,
    positionsSortBy,
    positionsDirection,
    positionsPagination: {
      page: Number(page),
      limit: Number(limit),
      total: positions?.total,
      totalPages,
    },
  })
}

export default function ProfileDataAbout() {
  return (
    <div className="flex-col justify-start items-start gap-6 flex w-full">
      <PositionsOnIdentity />
    </div>
  )
}

export function PositionsOnIdentity() {
  const initialData = useLoaderData<typeof loader>()
  const { userIdentity } = initialData
  const fetcher = useFetcher<typeof loader>()
  const page = useRef(1)
  const [positions, setPositions] = useState<PositionPresenter[]>(
    initialData.positions?.data ?? [],
  )
  const [sortBy, setSortBy] = useState(initialData.positionsSortBy)
  const [direction, setDirection] = useState(initialData.positionsDirection)

  useEffect(() => {
    if (fetcher.data) {
      setPositions(fetcher.data.positions.data as PositionPresenter[])
    }
  }, [fetcher.data])

  const options = [
    { value: 'Updated At', sortBy: 'updated_at' },
    { value: 'Total Conviction', sortBy: 'conviction' },
    { value: 'Total ETH', sortBy: 'assets' },
  ]

  const handleSortChange = (
    newSortBy: string,
    newDirection?: 'asc' | 'desc',
  ) => {
    if (newDirection) {
      setDirection(newDirection)
    } else if (sortBy !== newSortBy) {
      setDirection('desc')
    }
    setSortBy(newSortBy)
    fetcher.load(
      `?index&page=${page.current}&sortBy=${newSortBy}&direction=${newDirection || direction}`,
    )
  }

  const onPageChange = (newPage: number) => {
    const params = `?index&page=${newPage}&sortBy=${sortBy}&direction=${direction}`
    fetcher.load(params)
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
      <div className="flex flex-row justify-between w-full">
        <Input className="w-[196px]" />
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
      {positions?.map((position) => (
        <div
          key={position.id}
          className={`grow shrink basis-0 self-stretch p-6 bg-black first:rounded-t-xl last:rounded-b-xl border border-neutral-300/20 flex-col justify-start items-start gap-5 inline-flex ${positions.length === 1 && 'rounded-xl'}`}
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
      <Pagination className="flex w-full justify-between">
        <PaginationSummary
          totalEntries={initialData.positionsPagination.total ?? 0}
          label="positions"
        />
        <div className="flex">
          <PaginationRowSelection defaultValue="10" />
          <PaginationPageCounter
            currentPage={initialData.positionsPagination.page ?? 0}
            totalPages={initialData.positionsPagination.totalPages ?? 0}
          />
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst
                href="#"
                onClick={() => onPageChange(1)}
                disabled={initialData.positionsPagination.page === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  onPageChange(initialData.positionsPagination.page - 1)
                }
                disabled={
                  initialData.positionsPagination.page === 1 ||
                  initialData.positionsPagination.page === undefined
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  onPageChange(initialData.positionsPagination.page + 1)
                }
                disabled={
                  initialData.positionsPagination.page ===
                  initialData.positionsPagination.totalPages
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                href="#"
                onClick={() =>
                  onPageChange(initialData.positionsPagination.totalPages)
                }
                disabled={
                  initialData.positionsPagination.page ===
                  initialData.positionsPagination.totalPages
                }
              />
            </PaginationItem>
          </PaginationContent>
        </div>
      </Pagination>
    </>
  )
}
