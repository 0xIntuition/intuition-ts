import {
  client,
  GET_ATOMS_QUERY,
  GetAtomsQuery,
  Order_By,
} from '@0xintuition/graphql'

import { useQuery } from '@tanstack/react-query'

const DEFAULT_LIMIT = 50

export type AtomSortKey = 'Name' | 'Most Recent' | 'Most Popular'
export type AtomTypeKey = 'ALL' | 'Thing' | 'Account'

const orderBy = (atomsSortKey: AtomSortKey) => ({
  ...(atomsSortKey === 'Name' && { label: Order_By.Asc }),
  ...(atomsSortKey === 'Most Recent' && {
    blockTimestamp: Order_By.Desc,
  }),
  ...(atomsSortKey === 'Most Popular' && {
    vault: { totalShares: Order_By.Desc },
  }),
})

const where = (type: AtomTypeKey, filterString?: string) => ({
  _and: {
    ...(type !== 'ALL' && { type: { _eq: type } }),
    ...(filterString && {
      _or: [{ label: { _ilike: `%${filterString}%` } }],
    }),
  },
})

export const useAtoms = ({
  token,
  atomsSortKey = 'Most Popular',
  type = 'ALL',
  filterString,
}: {
  token: string
  atomsSortKey?: AtomSortKey
  type?: AtomTypeKey
  filterString?: string
}) => {
  if (!token) return null

  const { status, error, data, isLoading, isSuccess, isError } = useQuery<
    GetAtomsQuery,
    Error
  >({
    queryKey: [token, { atomsSortKey, type, filterString }],
    queryFn: () =>
      client({ token }).request(GET_ATOMS_QUERY, {
        orderBy: orderBy(atomsSortKey),
        limit: DEFAULT_LIMIT,
        offset: 0,
        where: where(type, filterString),
      }),
  })

  return {
    status,
    error,
    isSuccess,
    data,
    isLoading,
    isError,
  }
}
